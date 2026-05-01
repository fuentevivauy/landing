import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { X, MessageCircle, Check, Package } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { getWhatsAppLink } from '@/lib/data/products';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/supabase/analytics';
import { useSiteSettings } from '@/hooks/useSiteSettings';


interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [canZoom, setCanZoom] = useState(false);
    const [imageError, setImageError] = useState(false);
    const { settings } = useSiteSettings();

    // Scroll lock mejorado - bloquea scroll del body cuando el modal está abierto
    useEffect(() => {
        if (product) {
            // Track de vista
            trackEvent('view', product.id, { name: product.name, category: product.category });

            // Guardar el estilo original
            const originalStyle = window.getComputedStyle(document.body).overflow;

            // Bloquear scroll
            document.body.style.overflow = 'hidden';

            // Atributo para que otros componentes sepan que hay un modal abierto
            document.body.setAttribute('data-modal-open', 'true');

            // Delay para permitir el zoom, evitando clicks accidentales al abrir
            const timer = setTimeout(() => {
                setCanZoom(true);
            }, 1500);

            return () => {
                // Restaurar scroll
                document.body.style.overflow = originalStyle;
                document.body.removeAttribute('data-modal-open');
                setCanZoom(false);
                clearTimeout(timer);
            };
        }
    }, [product]);

    const lastTap = useRef<number>(0);

    if (!product) return null;

    const handleImageInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();

        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            // Success: Double tap detected
            if (canZoom && !isZoomed) {
                setIsZoomed(true);
            }
        }

        lastTap.current = now;
    };

    const whatsAppLink = getWhatsAppLink(product, settings?.whatsapp_number);

    const handleWhatsAppTrack = () => {
        // Track de consulta por WhatsApp (non-blocking)
        trackEvent('whatsapp_click', product.id, { name: product.name, category: product.category, source: 'product_modal' });
    };

    return (
        <AnimatePresence>
            {product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-slate-blue/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        layoutId={`product-card-${product.id}`}
                        className="fixed inset-4 md:inset-10 lg:inset-20 md:min-h-[600px] z-50 bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                        transition={{
                            layout: { duration: 0.4, ease: "easeInOut" }
                        }}
                    >
                        {/* Mobile Layout - Flex vertical con scroll */}
                        <div className="md:hidden h-full overflow-y-auto overscroll-contain">
                            {/* Image Section Mobile - altura fija */}
                            <div
                                className={cn(
                                    "relative h-[70vh] bg-stone-gray/10",
                                )}>
                                <Image
                                     src={imageError ? 'https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/hero/hero-fountain-new.jpg' : (product.images.carousel || product.images.gallery[0] || product.images.thumbnail)}
                                     alt={product.name}
                                     fill
                                     className="object-contain p-4"
                                     sizes="(max-width: 768px) 100vw, 800px"
                                     quality={90}
                                     priority
                                     onError={() => setImageError(true)}
                                 />
                                {/* Double click hint overlay */}
                                {canZoom && !isZoomed && (
                                    <div className="hidden md:flex absolute inset-x-0 bottom-4 justify-center px-4 pointer-events-none">
                                        <div className="bg-black/40 backdrop-blur-md text-white text-xs py-2 px-4 rounded-full border border-white/20 animate-pulse z-20">
                                            Doble click para ampliar
                                        </div>
                                    </div>
                                )}
                                {/* Close Button Mobile */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg z-10"
                                >
                                    <X className="w-6 h-6 text-slate-blue" />
                                </button>
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-2 text-sm font-medium bg-slate-blue text-off-white rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                            {/* Content Section Mobile */}
                            <div className="p-6 flex flex-col">
                                {/* Close Button para desktop - en el contenido */}
                                <button
                                    onClick={onClose}
                                    className="hidden md:flex absolute top-4 right-4 p-2 bg-stone-gray/10 backdrop-blur-sm rounded-full hover:bg-stone-gray/20 transition-colors z-10"
                                >
                                    <X className="w-6 h-6 text-slate-blue" />
                                </button>
                                {/* Header */}
                                <div className="mb-6">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="font-serif text-3xl md:text-4xl font-bold text-slate-blue mb-2"
                                    >
                                        {product.name}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-stone-gray text-lg"
                                    >
                                        {product.description}
                                    </motion.p>
                                </div>

                                {/* Price */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-6"
                                >
                                    <span className="text-4xl font-bold text-slate-blue">
                                        {product.priceFormatted}
                                    </span>
                                    <span className="text-stone-gray ml-2">UYU</span>
                                </motion.div>

                                {/* Specs */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mb-6"
                                >
                                    <h3 className="font-semibold text-slate-blue mb-3 flex items-center gap-2">
                                        <Package className="w-5 h-5" />
                                        Características Técnicas
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {product.specs.weight && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Peso</span>
                                                <span className="font-medium text-slate-blue">{product.specs.weight}</span>
                                            </div>
                                        )}
                                        {product.specs.height && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Altura</span>
                                                <span className="font-medium text-slate-blue">{product.specs.height}</span>
                                            </div>
                                        )}
                                        {product.specs.dimensions && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Dimensiones</span>
                                                <span className="font-medium text-slate-blue">{product.specs.dimensions}</span>
                                            </div>
                                        )}
                                        {(product.specs.levels !== undefined && product.specs.levels !== null) && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Niveles</span>
                                                <span className="font-medium text-slate-blue">{product.specs.levels}</span>
                                            </div>
                                        )}
                                        {product.specs.motor && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Motor</span>
                                                <span className="font-medium text-slate-blue">{product.specs.motor}</span>
                                            </div>
                                        )}
                                        {product.specs.material && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Material</span>
                                                <span className="font-medium text-slate-blue">{product.specs.material}</span>
                                            </div>
                                        )}
                                        {product.specs.maxLoad && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Carga máxima</span>
                                                <span className="font-medium text-slate-blue">{product.specs.maxLoad}</span>
                                            </div>
                                        )}
                                        {(product.specs.diameter || product.specs.diameter_main) && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Diámetro</span>
                                                <span className="font-medium text-slate-blue">
                                                    {product.specs.diameter || product.specs.diameter_main}
                                                </span>
                                            </div>
                                        )}
                                        {product.specs.table_dim && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Medidas Mesa</span>
                                                <span className="font-medium text-slate-blue">{product.specs.table_dim}</span>
                                            </div>
                                        )}
                                        {product.specs.bench_dim && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Medida Banco</span>
                                                <span className="font-medium text-slate-blue">{product.specs.bench_dim}</span>
                                            </div>
                                        )}
                                        {product.specs.width && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Ancho</span>
                                                <span className="font-medium text-slate-blue">{product.specs.width}</span>
                                            </div>
                                        )}
                                        {product.specs.base && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Base</span>
                                                <span className="font-medium text-slate-blue">{product.specs.base}</span>
                                            </div>
                                        )}
                                        {product.specs.color && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Color</span>
                                                <span className="font-medium text-slate-blue">{product.specs.color}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                                {/* Benefits */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mb-8 flex-1"
                                >
                                    <h3 className="font-semibold text-slate-blue mb-3">Beneficios</h3>
                                    <ul className="space-y-2">
                                        {product.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-2 text-stone-gray">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Stock Status & CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-4"
                                >
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
                                </motion.div>
                            </div>
                        </div>

                        {/* Desktop Layout - 2 columnas Grid */}
                        <div className="hidden md:grid md:grid-cols-2 flex-1 h-full w-full relative">
                            {/* Image Section Desktop */}
                            <div
                                className={cn(
                                    "relative h-full bg-stone-gray/10",
                                    canZoom ? "cursor-zoom-in" : ""
                                )}
                                onClick={(e) => {
                                    // Mobile logic only
                                    if (window.innerWidth < 768) {
                                        handleImageInteraction(e);
                                    }
                                }}
                                onDoubleClick={(e) => {
                                    // Desktop logic only
                                    e.stopPropagation();
                                    if (window.innerWidth >= 768 && canZoom && !isZoomed) {
                                        setIsZoomed(true);
                                    }
                                }}
                            >
                                <Image
                                     src={imageError ? 'https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/hero/hero-fountain-new.jpg' : (product.images.carousel || product.images.gallery[0] || product.images.thumbnail)}
                                     alt={product.name}
                                     fill
                                     className="object-contain p-8"
                                     sizes="(max-width: 1024px) 50vw, 800px"
                                     quality={95}
                                     priority
                                     onError={() => setImageError(true)}
                                 />
                                {/* Double click hint overlay Desktop */}
                                {canZoom && !isZoomed && (
                                    <div className="hidden md:flex absolute inset-x-0 bottom-4 justify-center px-4 pointer-events-none">
                                        <div className="bg-black/40 backdrop-blur-md text-white text-xs py-2 px-4 rounded-full border border-white/20 animate-pulse z-20">
                                            Doble click para ampliar
                                        </div>
                                    </div>
                                )}
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="px-4 py-2 text-sm font-medium bg-slate-blue text-off-white rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section Desktop */}
                            <div className="p-10 flex flex-col overflow-y-auto bg-white h-full max-h-full overscroll-contain">
                                {/* Close Button Desktop */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-stone-gray/10 rounded-full hover:bg-stone-gray/20 transition-colors z-10"
                                >
                                    <X className="w-6 h-6 text-slate-blue" />
                                </button>

                                {/* Header */}
                                <div className="mb-6">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="font-serif text-4xl font-bold text-slate-blue mb-2"
                                    >
                                        {product.name}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-stone-gray text-lg"
                                    >
                                        {product.description}
                                    </motion.p>
                                </div>

                                {/* Price */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-6"
                                >
                                    <span className="text-4xl font-bold text-slate-blue">
                                        {product.priceFormatted}
                                    </span>
                                    <span className="text-stone-gray ml-2">UYU</span>
                                </motion.div>

                                {/* Specs */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mb-6"
                                >
                                    <h3 className="font-semibold text-slate-blue mb-3 flex items-center gap-2">
                                        <Package className="w-5 h-5" />
                                        Características Técnicas
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {product.specs.weight && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Peso</span>
                                                <span className="font-medium text-slate-blue">{product.specs.weight}</span>
                                            </div>
                                        )}
                                        {product.specs.height && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Altura</span>
                                                <span className="font-medium text-slate-blue">{product.specs.height}</span>
                                            </div>
                                        )}
                                        {product.specs.dimensions && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Ancho</span>
                                                <span className="font-medium text-slate-blue">{product.specs.dimensions}</span>
                                            </div>
                                        )}
                                        {product.specs.levels && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Niveles</span>
                                                <span className="font-medium text-slate-blue">{product.specs.levels}</span>
                                            </div>
                                        )}
                                        {product.specs.motor && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Motor</span>
                                                <span className="font-medium text-slate-blue">{product.specs.motor}</span>
                                            </div>
                                        )}
                                        {product.specs.material && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Material</span>
                                                <span className="font-medium text-slate-blue">{product.specs.material}</span>
                                            </div>
                                        )}
                                        {(product.specs.diameter || product.specs.diameter_main) && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Diámetro</span>
                                                <span className="font-medium text-slate-blue">
                                                    {product.specs.diameter || product.specs.diameter_main}
                                                </span>
                                            </div>
                                        )}
                                        {product.specs.maxLoad && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Carga máxima</span>
                                                <span className="font-medium text-slate-blue">{product.specs.maxLoad}</span>
                                            </div>
                                        )}
                                        {product.specs.table_dim && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Medidas Mesa</span>
                                                <span className="font-medium text-slate-blue">{product.specs.table_dim}</span>
                                            </div>
                                        )}
                                        {product.specs.bench_dim && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Medida Banco</span>
                                                <span className="font-medium text-slate-blue">{product.specs.bench_dim}</span>
                                            </div>
                                        )}
                                        {product.specs.width && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Ancho</span>
                                                <span className="font-medium text-slate-blue">{product.specs.width}</span>
                                            </div>
                                        )}
                                        {product.specs.base && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Base</span>
                                                <span className="font-medium text-slate-blue">{product.specs.base}</span>
                                            </div>
                                        )}
                                        {product.specs.color && (
                                            <div className="bg-off-white rounded-lg p-3">
                                                <span className="text-xs text-stone-gray block">Color</span>
                                                <span className="font-medium text-slate-blue">{product.specs.color}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Benefits */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mb-8 flex-1"
                                >
                                    <h3 className="font-semibold text-slate-blue mb-3">Beneficios</h3>
                                    <ul className="space-y-2">
                                        {product.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-2 text-stone-gray">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Stock Status & CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-4"
                                >
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
                                            className="w-full bg-green-500 hover:bg-green-600 text-white"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            Consultar por WhatsApp
                                        </Button>
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Fullscreen Zoom Overlay */}
                    <AnimatePresence>
                        {isZoomed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-10"
                                onClick={() => setIsZoomed(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="relative w-full h-full flex items-center justify-center"
                                >
                                    <Image
                                        src={product.images.carousel || product.images.gallery[0] || product.images.thumbnail}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                        sizes="100vw"
                                        quality={100}
                                        priority
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsZoomed(false);
                                        }}
                                        className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20"
                                    >
                                        <X className="w-8 h-8" />
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )
            }
        </AnimatePresence>
    );
}

