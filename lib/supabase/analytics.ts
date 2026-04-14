import { createClient } from './client';
import { AnalyticsEventType } from '../types/admin';
import { trackCapiEvent } from '@/app/actions/analytics';

/**
 * Registra un evento de analítica en Supabase y lo envía a Meta (Pixel + CAPI).
 */
export async function trackEvent(
    eventType: AnalyticsEventType,
    productId: string | null = null,
    metadata: Record<string, unknown> = {}
) {
    try {
        const supabase = createClient();

        // Generar un eventId único para de-duplicación entre Pixel y CAPI
        const eventId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

        // Incluir información del navegador/cliente en el metadata
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

        // --- ENVIAR DATOS A META PIXEL (Frontend) ---
        if (typeof window !== 'undefined' && (window as any).fbq) {
            try {
                const fbq = (window as any).fbq;
                const pixelOptions = { eventID: eventId };

                if (eventType === 'view') {
                    fbq('track', 'ViewContent', {
                        content_name: metadata.name || 'Product',
                        content_category: metadata.category || 'General',
                        content_ids: productId ? [productId] : [],
                        content_type: 'product',
                    }, pixelOptions);
                } else if (eventType === 'whatsapp_click') {
                    fbq('track', 'Lead', {
                        content_name: metadata.name || 'WhatsApp Contact',
                        content_category: metadata.category || 'Contact',
                    }, pixelOptions);
                } else if (eventType === 'click') {
                    fbq('trackCustom', 'GenericClick', {
                        content_name: metadata.source || 'Button',
                    }, pixelOptions);
                }
            } catch {
                // Pixel errors are non-critical
            }
        }

        // --- ENVIAR DATOS A META CAPI (Server Side) ---
        // Esto ayuda a evitar la pérdida de eventos por AdBlockers
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

        return result;
    } catch (err) {
        return { error: err };
    }
}
