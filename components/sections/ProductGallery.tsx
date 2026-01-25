import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductCategory, PRODUCT_CATEGORIES } from '@/lib/types/product';
import { products, getImages } from '@/lib/data/products';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { FeatureCarousel } from '@/components/ui/feature-carousel';
import { X, Info } from 'lucide-react';
import Image from 'next/image';

type FilterOption = 'Todos' | ProductCategory;
type PriceFilter = 'Todos' | 'Hasta $10.000' | '$10.000 - $20.000' | 'Más de $20.000';

interface ProductGalleryProps {
    onProductClick: (product: Product) => void;
}

export function ProductGallery({ onProductClick }: ProductGalleryProps) {
    const [activeCategory, setActiveCategory] = useState<FilterOption>('Todos');
    const [activePrice, setActivePrice] = useState<PriceFilter>('Todos');
    const [hasInteracted, setHasInteracted] = useState(false);

    const categoryOptions: FilterOption[] = ['Todos', ...PRODUCT_CATEGORIES];
    const priceOptions: PriceFilter[] = ['Todos', 'Hasta $10.000', '$10.000 - $20.000', 'Más de $20.000'];

    const filteredProducts = useMemo(() => {
        const isFiltered = activeCategory !== 'Todos' || activePrice !== 'Todos';

        const filtered = products.filter((p) => {
            if (activeCategory !== 'Todos' && p.category !== activeCategory) return false;
            if (activePrice === 'Todos') return true;
            if (!p.price) return false;
            if (activePrice === 'Hasta $10.000') return p.price <= 10000;
            if (activePrice === '$10.000 - $20.000') return p.price > 10000 && p.price <= 20000;
            if (activePrice === 'Más de $20.000') return p.price > 20000;
            return true;
        });

        if (isFiltered) {
            return [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
        }

        return filtered;
    }, [activeCategory, activePrice]);

    return (
        <section id="catalogo" className="py-20 bg-off-white overflow-hidden relative">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-blue mb-4">
                        Nuestro Catálogo
                    </h2>
                    <p className="text-stone-gray text-lg max-w-2xl mx-auto">
                        Descubre nuestra colección de fuentes, bebederos y estatuas artesanales.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8"
                >
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categoryOptions.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveCategory(filter)}
                                className={cn(
                                    'px-4 py-1.5 rounded-full font-medium text-sm transition-all duration-300',
                                    activeCategory === filter
                                        ? 'bg-slate-blue text-off-white shadow-md'
                                        : 'bg-white text-stone-gray hover:bg-slate-blue/5 border border-stone-gray/10'
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:block w-px h-8 bg-stone-gray/20" />

                    {/* Price Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {priceOptions.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActivePrice(filter)}
                                className={cn(
                                    'px-4 py-1.5 rounded-full font-medium text-sm transition-all duration-300',
                                    activePrice === filter
                                        ? 'bg-emerald-700 text-white shadow-md'
                                        : 'bg-white text-stone-gray hover:bg-emerald-700/5 border border-stone-gray/10'
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Swipe Indicator - Mobile Only */}
                <AnimatePresence>
                    {!hasInteracted && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex md:hidden justify-center mb-10"
                        >
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-emerald-600/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg border border-white/20 flex items-center gap-3"
                            >
                                <span className="text-white font-medium text-sm">
                                    Desliza para ver más
                                </span>
                                <motion.div
                                    animate={{ x: [-5, 5, -5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="text-white/80"
                                >
                                    →
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3D Carousel */}
                <div className="w-full">
                    {filteredProducts.length > 0 ? (
                        <FeatureCarousel
                            items={useMemo(() => filteredProducts.map((product, index) => ({ product, index })), [filteredProducts])}
                            onCenterClick={useCallback((product) => onProductClick(product), [onProductClick])}
                            onInteraction={() => setHasInteracted(true)}
                        />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 text-stone-gray"
                        >
                            <p className="text-xl">No se encontraron productos con estos filtros.</p>
                            <button
                                onClick={() => { setActiveCategory('Todos'); setActivePrice('Todos'); }}
                                className="mt-4 text-slate-blue underline hover:text-slate-blue/80"
                            >
                                Limpiar filtros
                            </button>
                        </motion.div>
                    )}
                </div>
            </Container>
        </section>
    );
}
