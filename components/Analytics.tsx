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
