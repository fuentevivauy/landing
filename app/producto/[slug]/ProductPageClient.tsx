'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Check, Package } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { getWhatsAppLink } from '@/lib/data/products';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/supabase/analytics';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

function getVimeoId(url: string) {
    if (!url) return null;
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
    const match = url.match(regExp);
    return match ? match[3] : null;
}

interface ProductPageClientProps {
    product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
    const { settings } = useSiteSettings();
    const [imageError, setImageError] = useState(false);

    // Track ViewContent al montar la página (Pixel + CAPI + Supabase)
    useEffect(() => {
        trackEvent('view', product.id, {
            name: product.name,
            category: product.category,
            source: 'product_page',
        });
    }, [product.id, product.name, product.category]);

    const whatsAppLink = getWhatsAppLink(product, settings?.whatsapp_number);

    const handleWhatsAppTrack = () => {
        trackEvent('whatsapp_click', product.id, {
            name: product.name,
            category: product.category,
            source: 'product_page',
        });
    };

    const vimeoId = product.videoUrl ? getVimeoId(product.videoUrl) : null;

    return (
        <div className="min-h-screen bg-off-white">
            {/* Top bar con back link */}
            <div className="sticky top-0 z-30 bg-off-white/85 backdrop-blur-md border-b border-stone-gray/10">
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                    <Link
                        href="/#catalogo"
                        className="inline-flex items-center gap-2 text-slate-blue hover:text-slate-blue/70 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al catálogo
                    </Link>
                    <Link
                        href="/"
                        className="font-serif text-lg font-bold text-slate-blue"
                    >
                        Fuente Viva
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
                    {/* Imagen + video — orden configurable */}
                    <div>
                        {product.showDetailImage !== false && (
                            <div className="relative aspect-square bg-stone-gray/10 rounded-3xl overflow-hidden">
                                <Image
                                    src={
                                        imageError
                                            ? 'https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/hero/hero-fountain-new.jpg'
                                            : product.images.carousel || product.images.gallery[0] || product.images.thumbnail
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-contain p-6"
                                    sizes="(max-width: 1024px) 100vw, 600px"
                                    quality={95}
                                    priority
                                    onError={() => setImageError(true)}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-2 text-sm font-medium bg-slate-blue text-off-white rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                        )}

                        {vimeoId && (
                            <div className={`${product.showDetailImage !== false ? 'mt-6' : ''} w-full aspect-[9/16] max-w-md mx-auto bg-black rounded-3xl overflow-hidden relative`}>
                                <iframe
                                    src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&background=1&muted=1`}
                                    className="absolute top-0 left-0 w-full h-full"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                                {product.showDetailImage === false && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-4 py-2 text-sm font-medium bg-slate-blue text-off-white rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Detalle */}
                    <div className="flex flex-col">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-serif text-3xl md:text-5xl font-bold text-slate-blue mb-3"
                        >
                            {product.name}
                        </motion.h1>

                        <p className="text-stone-gray text-base md:text-lg mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="mb-8">
                            <span className="text-4xl font-bold text-slate-blue">
                                {product.priceFormatted}
                            </span>
                            <span className="text-stone-gray ml-2">UYU</span>
                        </div>

                        {/* Specs */}
                        <div className="mb-8">
                            <h2 className="font-semibold text-slate-blue mb-3 flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Características Técnicas
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries({
                                    Peso: product.specs.weight,
                                    Altura: product.specs.height,
                                    Dimensiones: product.specs.dimensions,
                                    Niveles: product.specs.levels,
                                    Motor: product.specs.motor,
                                    Material: product.specs.material,
                                    'Carga máxima': product.specs.maxLoad,
                                    Diámetro: product.specs.diameter || product.specs.diameter_main,
                                    'Medidas Mesa': product.specs.table_dim,
                                    'Medida Banco': product.specs.bench_dim,
                                    Ancho: product.specs.width,
                                    Base: product.specs.base,
                                    Color: product.specs.color,
                                })
                                    .filter(([, v]) => v !== undefined && v !== null && v !== '')
                                    .map(([k, v]) => (
                                        <div key={k} className="bg-white rounded-lg p-3 border border-stone-gray/10">
                                            <span className="text-xs text-stone-gray block">{k}</span>
                                            <span className="font-medium text-slate-blue">{String(v)}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Beneficios */}
                        {product.benefits.length > 0 && (
                            <div className="mb-8">
                                <h2 className="font-semibold text-slate-blue mb-3">Beneficios</h2>
                                <ul className="space-y-2">
                                    {product.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-2 text-stone-gray">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-auto space-y-4">
                            {!product.inStock && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                                    <p className="font-medium">⏳ Fabricación bajo pedido</p>
                                    <p className="text-sm">Tiempo de entrega: 10 días hábiles</p>
                                </div>
                            )}

                            <a
                                href={whatsAppLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleWhatsAppTrack}
                                className="block w-full"
                            >
                                <Button
                                    size="lg"
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Consultar por WhatsApp
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <WhatsAppButton />
        </div>
    );
}
