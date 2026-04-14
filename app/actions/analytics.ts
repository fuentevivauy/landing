'use server';

import { sendMetaCapiEvent } from '@/lib/meta-capi';
import { headers } from 'next/headers';

interface TrackEventParams {
  eventName: string;
  sourceUrl: string;
  productId?: string | null;
  metadata?: Record<string, any>;
  eventId?: string;
}

export async function trackCapiEvent({
  eventName,
  sourceUrl,
  productId,
  metadata,
  eventId
}: TrackEventParams) {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || 'unknown';
  const ip = headersList.get('x-forwarded-for') || '127.0.0.1';

  // Mapear el nombre del evento de la web a los estándar de Meta
  let metaEventName = eventName;
  if (eventName === 'view') metaEventName = 'ViewContent';
  if (eventName === 'whatsapp_click') metaEventName = 'Lead';
  if (eventName === 'page_view') metaEventName = 'PageView';

  // Custom Data
  const customData: Record<string, any> = { ...metadata };
  if (productId) {
    customData.content_ids = [productId];
    customData.content_type = 'product';
  }

  return await sendMetaCapiEvent({
    eventName: metaEventName,
    eventSourceUrl: sourceUrl,
    userData: {
      clientIpAddress: ip.split(',')[0].trim(),
      clientUserAgent: userAgent,
    },
    customData,
    eventId
  });
}
