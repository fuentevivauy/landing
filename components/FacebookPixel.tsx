'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import * as fbq from '@/lib/fpixel';

export default function FacebookPixel() {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Cuando inicializamos fbq no enviamos PageView directamente si queremos 
    // manejarlo en el componente local, pero generalmente la librería de Píxel
    // envía un init que puedes seguir de un fbq('track', 'PageView').
    
    // Almacenar el hecho de que se cargó
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && !pathname.startsWith('/admin')) {
      fbq.pageview();
    }
  }, [pathname, loaded]);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbq.FB_PIXEL_ID}');
          `,
        }}
      />
    </>
  );
}
