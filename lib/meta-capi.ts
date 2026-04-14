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
    em?: string[]; // email hashed
    ph?: string[]; // phone hashed
  };
  customData?: Record<string, any>;
  eventId?: string;
}

/**
 * Envía un evento a la API de Conversiones de Meta (CAPI).
 */
export async function sendMetaCapiEvent(data: MetaEventData) {
  if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
    return { success: false, error: 'Missing configuration' };
  }

  const unixTimestamp = Math.floor(Date.now() / 1000);

  const eventPayload = {
    data: [
      {
        event_name: data.eventName,
        event_time: unixTimestamp,
        action_source: 'website',
        event_source_url: data.eventSourceUrl,
        event_id: data.eventId,
        user_data: {
          client_ip_address: data.userData.clientIpAddress,
          client_user_agent: data.userData.clientUserAgent,
          fbc: data.userData.fbc,
          fbp: data.userData.fbp,
          em: data.userData.em,
          ph: data.userData.ph,
        },
        custom_data: data.customData,
      },
    ],
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

/**
 * Genera un hash SHA256 para los datos del usuario (requerido por Meta).
 */
export function hashData(data: string) {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}
