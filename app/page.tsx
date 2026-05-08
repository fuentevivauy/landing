'use client';

import { useEffect, useState } from 'react';
import { ScrollExpandHero } from '@/components/ui/ScrollExpandHero';
import { Philosophy } from '@/components/sections/Philosophy';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {
    // Si hay un scroll guardado (volviendo de un producto), ocultar la página
    // hasta que ProductGallery restaure la posición exacta.
    const [pageReady, setPageReady] = useState(() => {
        if (typeof window !== 'undefined') {
            return !sessionStorage.getItem('catalog_scroll_y');
        }
        return true;
    });

    // Fallback: si después de 2s la página sigue oculta, mostrarla igual
    useEffect(() => {
        if (!pageReady) {
            const timeout = setTimeout(() => setPageReady(true), 2000);
            return () => clearTimeout(timeout);
        }
    }, [pageReady]);

    // Exponer setter para que ProductGallery pueda revelarnos
    useEffect(() => {
        (window as unknown as Record<string, unknown>).__revealPage = () => setPageReady(true);
        return () => {
            delete (window as unknown as Record<string, unknown>).__revealPage;
        };
    }, []);

    return (
        <div style={!pageReady ? { opacity: 0 } : undefined}>
            <ScrollExpandHero
                videoSrc="https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/hero/hero-video.mp4"
                bgImageSrc="/images/hero-fountain-new.jpg"
                posterSrc="/images/hero-fountain-new.jpg"
            >
                <Philosophy />
                <ProductGallery />
                <FAQ />
                <FinalCTA />
                <Footer />
                <WhatsAppButton />
            </ScrollExpandHero>
        </div>
    );
}
