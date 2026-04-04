import { createClient } from './client';
import { AnalyticsEventType } from '../types/admin';

/**
 * Registra un evento de analítica en Supabase.
 * @param eventType - El tipo de evento ('view', 'click', 'whatsapp_click', 'page_view')
 * @param productId - ID opcional del producto asociado
 * @param metadata - Datos adicionales opcionales
 */
export async function trackEvent(
    eventType: AnalyticsEventType,
    productId: string | null = null,
    metadata: Record<string, unknown> = {}
) {
    try {
        const supabase = createClient();
        
        // Incluir información del navegador/cliente en el metadata
        const eventMetadata = {
            url: typeof window !== 'undefined' ? window.location.href : '',
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            screenSize: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
            timestamp: new Date().toISOString(),
            ...metadata
        };

        console.log(`[Analytics] Sending event: ${eventType}, productId: ${productId}`);

        const result = await supabase
            .from('analytics_events')
            .insert({
                product_id: productId,
                event_type: eventType,
                metadata: eventMetadata
            });

        if (result.error) {
            console.error(`[Analytics] ERROR inserting '${eventType}':`, result.error.message, result.error.details, result.error.hint);
        } else {
            console.log(`[Analytics] SUCCESS: '${eventType}' event recorded`);
        }

        return result;
    } catch (err) {
        console.error('[Analytics] Unexpected error:', err);
        return { error: err };
    }
}
