'use server';

import { sendMetaCapiEvent } from '@/lib/meta-capi';
import { headers, cookies } from 'next/headers';

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
  const headersList = await headers();
  const cookiesList = await cookies();
  const userAgent = headersList.get('user-agent') || 'unknown';
  
  // Priorizar IP capturada en el cliente (via cookie) para mejor matching (IPv6)
  // Si no existe, caer en el header x-forwarded-for
  const clientIpCookie = cookiesList.get('_client_ip')?.value;
  const ip = clientIpCookie || headersList.get('x-forwarded-for') || '127.0.0.1';

  const fbp = cookiesList.get('_fbp')?.value;
  let fbc = cookiesList.get('_fbc')?.value;

  // Si no hay cookie _fbc, intentar extraer el fbclid de la URL (común en el primer aterrizaje)
  // para no perder el tracking del primer PageView
  if (!fbc && sourceUrl) {
    try {
      const url = new URL(sourceUrl);
      const fbclid = url.searchParams.get('fbclid');
      if (fbclid) {
        // Formato estándar de fbc: fb.1.[timestamp].[fbclid]
        fbc = `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`;
      }
    } catch (e) {
      // Ignorar si la URL es inválida
    }
  }

  // Mapear eventos internos a los nombres estándar/custom de Meta
  // Debe coincidir exactamente con lo que envía el Pixel del navegador
  let metaEventName = eventName;
  if (eventName === 'page_view') metaEventName = 'PageView';
  if (eventName === 'view') metaEventName = 'ViewContent';
  if (eventName === 'whatsapp_click') metaEventName = 'Lead';
  if (eventName === 'click') metaEventName = 'GenericClick'; // mismo nombre que trackCustom en Pixel

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
      fbc,
      fbp,
    },
    customData,
    eventId
  });
}
