'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/supabase/analytics';
import { ScrollExpandHero } from '@/components/ui/ScrollExpandHero';
import { Philosophy } from '@/components/sections/Philosophy';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { ProductModal } from '@/components/products/ProductModal';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Product } from '@/lib/types/product';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    trackEvent('page_view');
  }, []);

  return (
    <ScrollExpandHero
      videoSrc="https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/hero/hero-video.mp4"
      bgImageSrc="/images/hero-bg.jpg"
      posterSrc="/images/hero-fountain-new.jpg"
    >
      <Philosophy />
      <ProductGallery onProductClick={setSelectedProduct} />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </ScrollExpandHero>
  );
}
