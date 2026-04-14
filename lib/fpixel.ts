export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1566846497752642';

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const event = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

export const customEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, options);
  }
};

// Extender el objeto Window para incluir fbq (Facebook Pixel)
declare global {
  interface Window {
    fbq: any;
  }
}
