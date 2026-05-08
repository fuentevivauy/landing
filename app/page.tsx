'use client';

import { useEffect, useLayoutEffect } from 'react';
import { ScrollExpandHero } from '@/components/ui/ScrollExpandHero';
import { Philosophy } from '@/components/sections/Philosophy';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {
    // useLayoutEffect corre sincrónicamente ANTES del primer paint de React.
    // Si hay scroll guardado (usuario volvió de un producto), ocultar la
    // página entera antes de pintar, para que nunca se vea en posición incorrecta.
    useLayoutEffect(() => {
        if (sessionStorage.getItem('catalog_scroll_y')) {
            document.documentElement.style.opacity = '0';
        }
    }, []);

    // Fallback: si después de 2s sigue oculta (algo falló), mostrarla igual.
    useEffect(() => {
        const timeout = setTimeout(() => {
            document.documentElement.style.opacity = '';
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    // Exponer función para que ProductGallery revele la página tras restaurar scroll.
    useEffect(() => {
        (window as unknown as Record<string, unknown>).__revealPage = () => {
            document.documentElement.style.opacity = '';
        };
        return () => {
            delete (window as unknown as Record<string, unknown>).__revealPage;
        };
    }, []);

    return (
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
    );
}
