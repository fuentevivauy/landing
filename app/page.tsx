'use client';

import { ScrollExpandHero } from '@/components/ui/ScrollExpandHero';
import { Philosophy } from '@/components/sections/Philosophy';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {
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
