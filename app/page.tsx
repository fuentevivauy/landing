'use client';

import { useState } from 'react';
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

  return (
    <ScrollExpandHero
      videoSrc="https://res.cloudinary.com/dj1wscyom/video/upload/v1768915137/IMG_3426_ixgfyl.mov"
      bgImageSrc="/images/hero-fountain-new.jpg"
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
