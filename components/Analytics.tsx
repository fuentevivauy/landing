'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/supabase/analytics';

/**
 * Componente que rastrea las vistas de páginas en la aplicación.
 * Se encarga de enviar un evento 'page_view' cada vez que la URL cambia.
 */
export function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Capturar la IP del cliente lo antes posible y guardarla en una cookie
        // Meta recomienda priorizar IPv6 para mejorar la calidad de coincidencia (EMQ)
        const captureClientIp = async () => {
            try {
                // Si ya tenemos la cookie, no volver a preguntar para ahorrar peticiones
                if (document.cookie.includes('_client_ip=')) return;

                const response = await fetch('https://api64.ipify.org?format=json');
                const data = await response.json();
                
                if (data.ip) {
                    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString(); // 30 días
                    document.cookie = `_client_ip=${data.ip}; expires=${expires}; path=/; SameSite=Lax`;
                }
            } catch (err) {
                // Silently fail if IP service is down
            }
        };

        captureClientIp();
    }, []);

    useEffect(() => {
        // No registrar visitas a las páginas de administración
        if (pathname.startsWith('/admin')) return;

        // Pequeño retraso para asegurar que la página se cargó completamente
        const timer = setTimeout(() => {
            trackEvent('page_view', null, {
                path: pathname,
                params: searchParams.toString(),
                title: typeof document !== 'undefined' ? document.title : ''
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return null; // Este componente no renderiza nada visualmente
}
