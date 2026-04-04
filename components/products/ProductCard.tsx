'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/lib/types/product';
import { cn } from '@/lib/utils';

import { trackEvent } from '@/lib/supabase/analytics';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
    index?: number;
}

export function ProductCard({ product, onClick, index = 0 }: ProductCardProps) {
    const handleCardClick = async () => {
        // Track the click before opening the modal
        await trackEvent('click', product.id, {
            name: product.name,
            category: product.category,
            source: 'product_card'
        });
        onClick();
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer"
            onClick={handleCardClick}
            layoutId={`product-card-${product.id}`}
        >
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-stone-gray/10">
                    <Image
                        src={product.images.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-medium bg-slate-blue/90 text-off-white rounded-full backdrop-blur-sm">
                            {product.category}
                        </span>
                    </div>

                    {/* Out of Stock Badge */}
                    {!product.inStock && (
                        <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 text-xs font-medium bg-red-500/90 text-white rounded-full backdrop-blur-sm">
                                Sin stock
                            </span>
                        </div>
                    )}

                    {/* Featured Badge */}
                    {product.featured && product.inStock && (
                        <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 text-xs font-medium bg-amber-500/90 text-white rounded-full backdrop-blur-sm">
                                Destacado
                            </span>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-blue/0 group-hover:bg-slate-blue/20 transition-colors duration-300 flex items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="px-4 py-2 bg-off-white text-slate-blue font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            Ver detalles
                        </motion.span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-slate-blue mb-1 group-hover:text-slate-blue/80 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-stone-gray text-sm line-clamp-2 mb-3">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-slate-blue">
                            {product.priceFormatted}
                        </span>
                        <span className="text-xs text-stone-gray">
                            {product.specs.weight}
                        </span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
