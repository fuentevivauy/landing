import { createClient } from './client';
import { AnalyticsEventType } from '../types/admin';
import { trackCapiEvent } from '@/app/actions/analytics';

/**
 * Registra un evento de analítica en Supabase y lo envía a Meta (Pixel + CAPI).
 * El mismo eventId se comparte entre Pixel y CAPI para que Meta pueda deduplicar
 * y no contar el mismo evento dos veces.
 *
 * IMPORTANTE: El Pixel y CAPI se disparan INDEPENDIENTEMENTE de Supabase,
 * para que un fallo en la base de datos no impida el tracking de Meta.
 */
export async function trackEvent(
    eventType: AnalyticsEventType,
    productId: string | null = null,
    metadata: Record<string, unknown> = {}
) {
    // eventId único compartido entre Pixel y CAPI → deduplicación en Meta
    const eventId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

    // --- 1. META PIXEL (navegador) — con reintentos en caso de que fbq no cargue a tiempo ---
    if (typeof window !== 'undefined') {
        let attempts = 0;
        const maxAttempts = 50; // Hasta 5 segundos (50 * 100ms) esperando a que fbq cargue

        const tryFirePixel = () => {
            if ((window as any).fbq) {
                try {
                    const fbq = (window as any).fbq;
                    const pixelOptions = { eventID: eventId };

                    if (eventType === 'page_view') {
                        fbq('track', 'PageView', {}, pixelOptions);
                    } else if (eventType === 'view') {
                        fbq('track', 'ViewContent', {
                            content_name: metadata.name || 'Product',
                            content_category: metadata.category || 'General',
                            content_ids: productId ? [productId] : [],
                            content_type: 'product',
                        }, pixelOptions);
                    } else if (eventType === 'whatsapp_click') {
                        fbq('track', 'Contact', {
                            content_name: metadata.name || 'WhatsApp Contact',
                            content_category: metadata.category || 'Contact',
                        }, pixelOptions);
                    } else if (eventType === 'click') {
                        fbq('trackCustom', 'GenericClick', {
                            content_name: metadata.source || 'Button',
                        }, pixelOptions);
                    }
                } catch {
                    // Ignorar errores del Pixel
                }
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(tryFirePixel, 100);
            }
        };

        tryFirePixel();
    }

    // --- 2. META CAPI (server side) — evita pérdida por AdBlockers ---
    if (typeof window !== 'undefined') {
        trackCapiEvent({
            eventName: eventType,
            sourceUrl: window.location.href,
            productId,
            metadata,
            eventId
        }).catch(() => {
            // CAPI errors are non-critical
        });
    }

    // --- 3. SUPABASE (analítica interna) — no bloquea el tracking de Meta ---
    try {
        const supabase = createClient();

        const eventMetadata = {
            url: typeof window !== 'undefined' ? window.location.href : '',
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            screenSize: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
            timestamp: new Date().toISOString(),
            eventId,
            ...metadata
        };

        const result = await supabase
            .from('analytics_events')
            .insert({
                product_id: productId,
                event_type: eventType,
                metadata: eventMetadata
            });

        return result;
    } catch (err) {
        return { error: err };
    }
}
