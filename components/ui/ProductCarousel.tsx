'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types/product';
import { getImages } from '@/lib/data/products';

// ===== Hooks =====
const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement | null>,
    onOutsideClick: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            onOutsideClick();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, onOutsideClick]);
};

// ===== Components =====
interface CarouselProps {
    items: React.ReactElement<{
        product: Product;
        index: number;
        layout?: boolean;
        onCardClose: () => void;
    }>[];
    initialScroll?: number;
}

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const handleScrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384;
            const gap = isMobile() ? 4 : 8;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            });
        }
    };

    const isMobile = () => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth < 768;
    };

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    return (
        <div className="relative w-full">
            <div
                className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-8 px-4 md:px-0"
                ref={carouselRef}
                onScroll={checkScrollability}
            >
                <div
                    className={cn(
                        'absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l from-off-white to-transparent pointer-events-none'
                    )}
                />
                <div
                    className={cn(
                        'flex flex-row justify-start md:justify-center gap-6',
                        'px-4 md:px-0',
                        'max-w-7xl mx-auto'
                    )}
                >
                    {items.map((item, index) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.1 * index,
                                        ease: 'easeOut',
                                    },
                                }}
                                key={`card-${index}`}
                                className="flex-shrink-0"
                            >
                                {React.cloneElement(item, {
                                    onCardClose: () => {
                                        return handleCardClose(index);
                                    },
                                })}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 px-4 md:px-0">
                <button
                    className="relative z-40 h-12 w-12 rounded-full bg-slate-blue hover:bg-slate-blue/80 flex items-center justify-center disabled:opacity-50 transition-colors duration-200"
                    onClick={handleScrollLeft}
                    disabled={!canScrollLeft}
                    aria-label="Scroll left"
                >
                    <ArrowLeft className="h-6 w-6 text-off-white" />
                </button>
                <button
                    className="relative z-40 h-12 w-12 rounded-full bg-slate-blue hover:bg-slate-blue/80 flex items-center justify-center disabled:opacity-50 transition-colors duration-200"
                    onClick={handleScrollRight}
                    disabled={!canScrollRight}
                    aria-label="Scroll right"
                >
                    <ArrowRight className="h-6 w-6 text-off-white" />
                </button>
            </div>
        </div>
    );
};

interface ProductCardProps {
    product: Product;
    index: number;
    layout?: boolean;
    onCardClose?: () => void;
}

export const ProductCarouselCard = ({
    product,
    index,
    layout = false,
    onCardClose = () => { },
}: ProductCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleExpand = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(true);
    };
    const handleCollapse = () => {
        setIsExpanded(false);
        setIsImageZoomed(false);
        onCardClose();
    };
    const [isImageZoomed, setIsImageZoomed] = useState(false);
    const [canZoom, setCanZoom] = useState(false);

    useEffect(() => {
        if (isExpanded) {
            setIsImageZoomed(false);
            setCanZoom(false);
            const timer = setTimeout(() => setCanZoom(true), 800);
            return () => clearTimeout(timer);
        } else {
            setCanZoom(false);
            setIsImageZoomed(false);
        }
    }, [isExpanded]);

    const lastTap = useRef<number>(0);

    const handleImageInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();

        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            // Success: Double tap detected
            if (canZoom && !isImageZoomed) {
                setIsImageZoomed(true);
            }
        }

        lastTap.current = now;
    };

    const handleImageZoomClose = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsImageZoomed(false);
        // Reset canZoom to require another delay before next zoom
        setCanZoom(false);
        setTimeout(() => setCanZoom(true), 500);
    };

    // Helper to format price
    const formatPrice = (price: number | null) => {
        if (!price) return 'Consultar';
        return new Intl.NumberFormat('es-UY', {
            style: 'currency',
            currency: 'UYU',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const images = getImages(product.slug);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCollapse();
            }
        };

        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, [isExpanded]);

    useOutsideClick(containerRef, handleCollapse);

    return (
        <>
            <AnimatePresence>
                {isExpanded && (
                    <div className="fixed inset-0 h-screen w-screen z-[100] flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-black/60 backdrop-blur-sm fixed inset-0"
                            onClick={handleCollapse}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${product.id}` : undefined}
                            className="bg-off-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-3xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row m-4"
                        >
                            <button
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-colors"
                                onClick={handleCollapse}
                            >
                                <X className="h-6 w-6 text-slate-blue" />
                            </button>

                            {/* Expanded Content */}
                            <div
                                className={cn(
                                    "w-full md:w-1/2 h-1/3 md:h-full relative shrink-0 transition-all duration-500",
                                    canZoom ? "cursor-zoom-in" : "cursor-wait pointer-events-none opacity-80"
                                )}
                                onClick={(e) => {
                                    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                                        e.stopPropagation();
                                        canZoom && setIsImageZoomed(true);
                                    } else {
                                        handleImageInteraction(e);
                                    }
                                }}
                                onTouchEnd={(e) => {
                                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                                        handleImageInteraction(e);
                                    }
                                }}
                            >
                                <Image
                                    src={images.thumbnail}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="object-center"
                                />
                                {/* Double click hint overlay - Only on mobile */}
                                {canZoom && !isImageZoomed && (
                                    <div className="absolute inset-x-0 bottom-4 flex justify-center px-4 pointer-events-none md:hidden">
                                        <div className="bg-black/40 backdrop-blur-md text-white text-xs py-2 px-4 rounded-full border border-white/20 animate-pulse">
                                            Doble click para ampliar
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Image Zoom Overlay */}
                            <AnimatePresence>
                                {isImageZoomed && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                                        onClick={handleImageZoomClose}
                                    >
                                        <Image
                                            src={images.gallery[0]}
                                            alt={product.name}
                                            layout="responsive"
                                            width={800}
                                            height={600}
                                            objectFit="contain"
                                            className="max-h-[90vh] max-w-[90vw]"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col text-left">
                                <motion.p
                                    layoutId={layout ? `category-${product.id}` : undefined}
                                    className="text-stone-gray text-sm md:text-base font-medium uppercase tracking-wider mb-2"
                                >
                                    {product.category}
                                </motion.p>
                                <motion.h2
                                    layoutId={layout ? `title-${product.id}` : undefined}
                                    className="text-3xl md:text-4xl font-serif font-bold text-slate-blue mb-4"
                                >
                                    {product.name}
                                </motion.h2>

                                <div className="text-2xl font-bold text-slate-blue/80 mb-8 border-b border-gray-200 pb-4">
                                    {formatPrice(product.price)}
                                </div>

                                <div className="space-y-8 flex-grow">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                            <Info className="w-5 h-5" /> Descripción
                                        </h3>
                                        <p className="text-stone-gray leading-relaxed text-lg">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Specs Grid */}
                                    <div className="bg-white/50 p-6 rounded-2xl">
                                        <h3 className="font-semibold text-lg mb-4">Especificaciones</h3>
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                            {product.specs.dimensions && (
                                                <div>
                                                    <span className="block text-sm text-stone-gray/70 mb-1">Dimensiones</span>
                                                    <span className="font-medium text-slate-blue">{product.specs.dimensions}</span>
                                                </div>
                                            )}
                                            {product.specs.height && (
                                                <div>
                                                    <span className="block text-sm text-stone-gray/70 mb-1">Altura</span>
                                                    <span className="font-medium text-slate-blue">{product.specs.height}</span>
                                                </div>
                                            )}
                                            {product.specs.width && (
                                                <div>
                                                    <span className="block text-sm text-stone-gray/70 mb-1">Ancho</span>
                                                    <span className="font-medium text-slate-blue">{product.specs.width}</span>
                                                </div>
                                            )}
                                            {product.specs.weight && (
                                                <div>
                                                    <span className="block text-sm text-stone-gray/70 mb-1">Peso</span>
                                                    <span className="font-medium text-slate-blue">{product.specs.weight}</span>
                                                </div>
                                            )}
                                            {product.specs.material && (
                                                <div>
                                                    <span className="block text-sm text-stone-gray/70 mb-1">Material</span>
                                                    <span className="font-medium text-slate-blue">{product.specs.material}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* WhatsApp CTA */}
                                    <a
                                        href={`https://wa.me/59894713998?text=Hola,%20me%20interesa%20la%20${product.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl mt-4"
                                    >
                                        Consultar por WhatsApp
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div >
                )}
            </AnimatePresence >

            <motion.button
                layoutId={layout ? `card-${product.id}` : undefined}
                onClick={handleExpand}
                className="group relative"
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3, ease: 'easeOut' },
                }}
            >
                <div
                    className={cn(
                        "rounded-3xl h-[450px] md:h-[550px] w-72 md:w-80 overflow-hidden relative shadow-lg transition-shadow duration-300 group-hover:shadow-xl",
                        "bg-gray-100" // Fallback color
                    )}
                >
                    {/* Full Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={images.thumbnail}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    </div>

                    {/* Content Logic: Name only visible, expands on click */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <motion.p
                            layoutId={layout ? `category-${product.id}` : undefined}
                            className="text-white/80 text-xs font-medium uppercase tracking-wider mb-2"
                        >
                            {product.category}
                        </motion.p>
                        <motion.h3
                            layoutId={layout ? `title-${product.id}` : undefined}
                            className="text-white text-2xl font-serif font-medium leading-tight"
                        >
                            {product.name}
                        </motion.h3>

                        <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                            <span className="text-white/90 text-sm mt-3 inline-block font-medium">
                                Ver detalles →
                            </span>
                        </div>
                    </div>
                </div>
            </motion.button>
        </>
    );
};
