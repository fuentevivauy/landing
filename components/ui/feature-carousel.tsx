import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types/product';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- TYPES ---
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    items: { product: Product; index: number }[];
    onCenterClick: (product: Product, index: number) => void;
}

// --- CAROUSEL CARD COMPONENT ---
const CarouselCard = ({
    item,
    isCenter,
    onClick,
}: {
    item: { product: Product; index: number };
    isCenter: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group cursor-pointer"
            onClick={onClick}
        >
            <Image
                src={item.product.images.thumbnail}
                alt={item.product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 80vw, 400px"
                quality={90}
                priority={item.index < 5}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

            {/* Text Content (Always visible on Center, faded on sides) */}
            <div className={cn(
                "absolute bottom-0 left-0 w-full p-6 text-left transition-opacity duration-300 z-10",
                isCenter ? "opacity-100" : "opacity-0"
            )}>
                <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-2">
                    {item.product.category}
                </p>
                <h3 className="text-white text-2xl font-serif font-medium leading-tight mb-2">
                    {item.product.name}
                </h3>
                <p className="text-white/60 text-sm">Click para ver más</p>
            </div>
        </div>
    );
};

// --- FEATURE CAROUSEL COMPONENT ---
export const FeatureCarousel = React.forwardRef<HTMLDivElement, CarouselProps>(
    ({ items, className, onCenterClick, ...props }, ref) => {
        const [currentIndex, setCurrentIndex] = React.useState(Math.floor(items.length / 2));
        const [isMobileView, setIsMobileView] = React.useState(false);

        React.useEffect(() => {
            const checkMobile = () => setIsMobileView(window.innerWidth < 768);
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }, []);

        const handleNext = React.useCallback(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, [items.length]);

        const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'relative w-full flex flex-col items-center justify-center p-4 overflow-hidden',
                    className
                )}
                {...props}
            >
                {/* Main Showcase Section */}
                <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
                    {/* Carousel Wrapper */}
                    <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
                        {items.map((item, index) => {
                            const offset = index - currentIndex;
                            const total = items.length;

                            let pos = (offset + total) % total;
                            if (pos > Math.floor(total / 2)) {
                                pos = pos - total;
                            }

                            const isCenter = pos === 0;
                            const isAdjacent = Math.abs(pos) === 1;

                            return (
                                <motion.div
                                    key={item.product.id}
                                    layoutId={isCenter ? `product-card-${item.product.id}` : undefined}
                                    className={cn(
                                        'absolute w-64 h-96 md:w-80 md:h-[450px]',
                                        'flex items-center justify-center',
                                        isCenter ? 'cursor-pointer' : 'cursor-default'
                                    )}
                                    drag={isMobileView && isCenter ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(_, info) => {
                                        if (isMobileView && isCenter) {
                                            const threshold = 50;
                                            if (info.offset.x < -threshold) {
                                                handleNext();
                                            } else if (info.offset.x > threshold) {
                                                handlePrev();
                                            }
                                        }
                                    }}
                                    animate={{
                                        transform: `
                                            translateX(${pos * (isMobileView ? 65 : 75)}%) 
                                            scale(${isCenter ? 1 : isAdjacent ? 0.8 : 0.6})
                                            rotateY(${pos * -20}deg)
                                            translateZ(${isCenter ? 0 : -100}px)
                                        `,
                                        opacity: Math.abs(pos) > 2 ? 0 : (isCenter ? 1 : 0.7),
                                    }}
                                    transition={{
                                        layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    style={{
                                        zIndex: isCenter ? 50 : 40 - Math.abs(pos),
                                        filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                                        pointerEvents: isCenter ? 'auto' : 'none',
                                    }}
                                >
                                    <CarouselCard
                                        item={item}
                                        isCenter={isCenter}
                                        onClick={() => {
                                            if (isCenter) {
                                                onCenterClick(item.product, index);
                                            } else {
                                                setCurrentIndex(index);
                                            }
                                        }}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons - Hidden on Mobile */}
                    <button
                        className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-blue/80 hover:bg-slate-blue text-white backdrop-blur-sm z-50 transition-all shadow-lg hidden md:flex"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-blue/80 hover:bg-slate-blue text-white backdrop-blur-sm z-50 transition-all shadow-lg hidden md:flex"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            </div>
        );
    }
);

FeatureCarousel.displayName = 'FeatureCarousel';
