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
        
        // Incluir información del navegador/cliente en el metadata si no existe
        const eventMetadata = {
            url: typeof window !== 'undefined' ? window.location.href : '',
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            screenSize: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
            ...metadata
        };

        const { error } = await supabase
            .from('analytics_events')
            .insert({
                product_id: productId,
                event_type: eventType,
                metadata: eventMetadata
            });

        if (error) {
            console.error('Error tracking event:', error.message);
        }
    } catch (err) {
        console.error('Unexpected error tracking event:', err);
    }
}
