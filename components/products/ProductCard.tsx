'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Play } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { trackEvent } from '@/lib/supabase/analytics';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { WhatsAppIcon } from '@/components/WhatsAppButton';

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    const { settings } = useSiteSettings();
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const whatsappLink = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
        `Hola! Me interesa la ${product.name}. ¿Me podrías dar más información?`
    )}`;

    const handleConsultar = (e: React.MouseEvent) => {
        e.stopPropagation();
        trackEvent('whatsapp_click', product.id, {
            name: product.name,
            source: 'product_card'
        });
        window.open(whatsappLink, '_blank');
    };

    const handleCardClick = () => {
        trackEvent('click', product.id, {
            name: product.name,
            source: 'product_card_image'
        });
        onClick(product);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked if not muted or other browser policies
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.5 }}
            className="group cursor-pointer flex flex-col h-full"
            onClick={handleCardClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-gray/5 border border-stone-gray/10 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-blue/20">
                {/* Main Image */}
                {!imageError ? (
                    <Image
                        src={product.images.thumbnail || '/images/hero-fountain-new.jpg'}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ${isHovered && product.videoUrl ? 'opacity-0 scale-110' : 'opacity-100 group-hover:scale-110'}`}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-300">
                        <ImageIcon size={48} strokeWidth={1} />
                        <span className="text-xs mt-2 uppercase tracking-widest font-bold">Sin Imagen</span>
                    </div>
                )}

                {/* Video Preview */}
                {product.videoUrl && (
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-10"
                            >
                                <video
                                    ref={videoRef}
                                    src={product.videoUrl}
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {/* Stock Badge */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                        <span className="bg-white/90 text-slate-blue px-2 py-1 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm">
                            Bajo Pedido
                        </span>
                    </div>
                )}

                {/* Video Icon Indicator */}
                {product.videoUrl && !isHovered && (
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg backdrop-blur-sm z-20 animate-pulse-glow">
                        <Play className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3 md:p-6 flex flex-col items-start text-left flex-1">
                <h3 className="font-serif text-sm md:text-2xl font-bold text-slate-blue mb-0.5 md:mb-1 leading-tight group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-stone-gray/70 text-xs md:text-sm mb-2 md:mb-4 font-medium">
                    {product.specs.levels ? `${product.specs.levels} niv.` : product.category}
                </p>

                <div className="w-full flex items-center justify-between mt-auto gap-2">
                    <span className="text-base md:text-2xl font-bold text-slate-blue leading-none">
                        {product.priceFormatted}
                    </span>

                    <button
                        onClick={handleConsultar}
                        className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white w-9 h-9 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full md:text-sm md:font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                        aria-label="Consultar por WhatsApp"
                    >
                        <WhatsAppIcon className="w-4 h-4 md:w-[18px] md:h-[18px] text-white flex-shrink-0" />
                        <span className="hidden md:inline font-bold text-sm">Consultar</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
