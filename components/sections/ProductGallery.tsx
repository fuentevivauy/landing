'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductCategory, PRODUCT_CATEGORIES } from '@/lib/types/product';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { ProductCard } from '@/components/products/ProductCard';
import { Search, Filter, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

type FilterOption = 'Todos' | ProductCategory;
type PriceFilter = 'Todos' | 'Hasta $10.000' | '$10.000 - $20.000' | 'Más de $20.000';

interface ProductGalleryProps {
    onProductClick: (product: Product) => void;
}

const ITEMS_PER_PAGE = 6;

export function ProductGallery({ onProductClick }: ProductGalleryProps) {
    const supabase = createClient();
    const [dbProducts, setDbProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const gridRef = useRef<HTMLDivElement>(null);

    const categoryOptions: FilterOption[] = ['Todos', ...PRODUCT_CATEGORIES];
    const priceOptions: PriceFilter[] = ['Todos', 'Hasta $10.000', '$10.000 - $20.000', 'Más de $20.000'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('display_order', { ascending: true })
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (data) {
                    const formatted: Product[] = data.map((dbProd: any) => ({
                        id: dbProd.id,
                        slug: dbProd.slug,
                        name: dbProd.name,
                        category: dbProd.category as ProductCategory,
                        price: dbProd.price,
                        priceFormatted: dbProd.price ? `$${dbProd.price.toLocaleString('es-UY')}` : dbProd.price_formatted,
                        description: dbProd.description,
                        benefits: dbProd.benefits || [],
                        specs: dbProd.specs || {},
                        images: {
                            thumbnail: dbProd.image_thumbnail || '/images/hero-fountain-new.jpg',
                            carousel: dbProd.image_carousel || dbProd.image_thumbnail || '/images/hero-fountain-new.jpg',
                            gallery: (dbProd.image_gallery?.length > 0) ? dbProd.image_gallery : [dbProd.image_thumbnail || '/images/hero-fountain-new.jpg'],
                        },
                        inStock: dbProd.in_stock,
                        featured: dbProd.featured,
                        display_order: dbProd.display_order,
                        videoUrl: dbProd.video_url,
                    }));
                    setDbProducts(formatted);
                }
            } catch {
                // Products failed to load
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = dbProducts;

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const displayedProducts = filteredProducts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

    const scrollToCatalog = () => {
        if (!gridRef.current) return;
        const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
        scrollToCatalog();
    };


    return (
        <section id="catalogo" className="py-4 md:py-8 bg-off-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-gray/10 to-transparent" />

            <Container>
                {/* Header Section */}
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-blue mb-2">
                            Nuestro Catálogo
                        </h2>
                        <div className="w-16 h-1 bg-sage-green mx-auto mb-3 rounded-full" />
                        <p className="text-stone-gray text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            Fuentes, bebederos y estatuas artesanales para realizar tus espacios con elegancia y serenidad.
                        </p>
                    </motion.div>
                </div>


                {/* Instruction Banner — simplified */}
                <div className="flex justify-center mb-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-sage-green/5 border border-sage-green/20 px-3 md:px-5 py-1.5 md:py-2 rounded-xl flex items-center gap-2 shadow-sm"
                    >
                        <Search className="text-sage-green/60" size={14} />
                        <p className="text-slate-blue/80 font-medium text-[11px] md:text-sm whitespace-nowrap">
                            Tocá cualquier modelo para ver <span className="text-sage-green font-semibold">medidas y detalles</span>
                        </p>
                    </motion.div>
                </div>

                {/* Product Grid */}
                <div ref={gridRef} className="min-h-[400px] relative">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32 text-stone-gray">
                            <Loader2 className="w-12 h-12 text-slate-blue animate-spin mb-4" />
                            <p className="text-lg font-medium">Cargando nuestro catálogo...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32 bg-white/30 rounded-3xl border-2 border-dashed border-stone-gray/20"
                        >
                            <p className="text-2xl text-stone-gray mb-6">No se encontraron productos en el catálogo.</p>
                            <button
                                onClick={() => { setCurrentPage(1); }}
                                className="bg-slate-blue text-white px-8 py-3 rounded-full font-bold hover:bg-slate-blue/90 transition-all"
                            >
                                Volver al inicio
                            </button>
                        </motion.div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`page-${safePage}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10"
                            >
                                {displayedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={onProductClick}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-14">
                        {/* Prev */}
                        <button
                            onClick={() => goToPage(Math.max(1, safePage - 1))}
                            disabled={safePage === 1}
                            className={cn(
                                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border',
                                safePage === 1
                                    ? 'border-stone-gray/20 text-stone-gray/30 cursor-not-allowed'
                                    : 'border-slate-blue text-slate-blue hover:bg-slate-blue hover:text-white'
                            )}
                            aria-label="Página anterior"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={cn(
                                    'w-10 h-10 rounded-full font-bold text-base transition-all duration-200 border',
                                    page === safePage
                                        ? 'bg-slate-blue text-white border-slate-blue shadow-md scale-110'
                                        : 'border-stone-gray/20 text-stone-gray hover:border-slate-blue hover:text-slate-blue'
                                )}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
                            disabled={safePage === totalPages}
                            className={cn(
                                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border',
                                safePage === totalPages
                                    ? 'border-stone-gray/20 text-stone-gray/30 cursor-not-allowed'
                                    : 'border-slate-blue text-slate-blue hover:bg-slate-blue hover:text-white'
                            )}
                            aria-label="Página siguiente"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </Container>
        </section>
    );
}
