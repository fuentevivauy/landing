import { Suspense } from 'react';
import { ScrollExpandHero } from '@/components/ui/ScrollExpandHero';
import { Philosophy } from '@/components/sections/Philosophy';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PUBLIC_ASSETS } from '@/lib/assets';

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-off-white" />}>
            <ScrollExpandHero
                videoSrc={PUBLIC_ASSETS.heroVideo}
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
        </Suspense>
    );
}
