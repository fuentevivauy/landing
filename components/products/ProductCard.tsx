'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4 }}
            className="group h-full flex flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-gray/5 cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Image — square on mobile, portrait on desktop */}
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
                <Image
                    src={product.images.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                />
                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-white/90 text-slate-blue px-2 py-1 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm">
                            Bajo Pedido
                        </span>
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

                <div className="w-full flex items-center justify-between mt-auto">
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
