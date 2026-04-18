'use server';

import crypto from 'crypto';

const FB_PIXEL_ID = process.env.FB_PIXEL_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

interface MetaEventData {
  eventName: string;
  eventSourceUrl: string;
  userData: {
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbc?: string;
    fbp?: string;
    em?: string[]; // email SHA256 hashed
    ph?: string[]; // phone SHA256 hashed
  };
  customData?: Record<string, any>;
  eventId?: string;
}

/**
 * Genera un hash SHA256 para datos de usuario (requerido por Meta para em/ph).
 */
export async function hashData(data: string): Promise<string> {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

/**
 * Envía un evento a la API de Conversiones de Meta (CAPI).
 */
export async function sendMetaCapiEvent(data: MetaEventData) {
  if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
    return { success: false, error: 'Missing configuration' };
  }

  const unixTimestamp = Math.floor(Date.now() / 1000);

  // Construir user_data omitiendo campos undefined para no ensuciar el payload
  const userData: Record<string, any> = {};
  if (data.userData.clientIpAddress) userData.client_ip_address = data.userData.clientIpAddress;
  if (data.userData.clientUserAgent) userData.client_user_agent = data.userData.clientUserAgent;
  if (data.userData.fbc) userData.fbc = data.userData.fbc;
  if (data.userData.fbp) userData.fbp = data.userData.fbp;
  if (data.userData.em?.length) userData.em = data.userData.em;
  if (data.userData.ph?.length) userData.ph = data.userData.ph;

  const eventPayload = {
    data: [
      {
        event_name: data.eventName,
        event_time: unixTimestamp,
        action_source: 'website',
        event_source_url: data.eventSourceUrl,
        event_id: data.eventId,
        user_data: userData,
        ...(data.customData && Object.keys(data.customData).length > 0 && {
          custom_data: data.customData,
        }),
      },
    ],
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v21.0/${FB_PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...eventPayload,
        access_token: FB_ACCESS_TOKEN,
      }),
    });

    const result = await response.json();

    if (result.error) {
      return { success: false, error: result.error };
    }

    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
}
