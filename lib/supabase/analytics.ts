import { createClient } from './client';
import { AnalyticsEventType } from '../types/admin';
import { trackCapiEvent } from '@/app/actions/analytics';

/**
 * Registra un evento de analítica en Supabase y lo envía a Meta (Pixel + CAPI).
 * El mismo eventId se comparte entre Pixel y CAPI para que Meta pueda deduplicar
 * y no contar el mismo evento dos veces.
 */
export async function trackEvent(
    eventType: AnalyticsEventType,
    productId: string | null = null,
    metadata: Record<string, unknown> = {}
) {
    try {
        const supabase = createClient();

        // eventId único compartido entre Pixel y CAPI → deduplicación en Meta
        const eventId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);

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

        // --- META PIXEL (navegador) ---
        if (typeof window !== 'undefined' && (window as any).fbq) {
            try {
                const fbq = (window as any).fbq;
                const pixelOptions = { eventID: eventId };

                if (eventType === 'page_view') {
                    // PageView con eventId compartido con CAPI → Meta deduplica correctamente
                    fbq('track', 'PageView', {}, pixelOptions);
                } else if (eventType === 'view') {
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

        // --- META CAPI (server side) — evita pérdida por AdBlockers ---
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
