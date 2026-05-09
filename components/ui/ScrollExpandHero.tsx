'use client';

import {
    useRef,
    ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollExpandHeroProps {
    videoSrc?: string;
    bgImageSrc?: string;
    posterSrc?: string;
    children?: ReactNode;
}

export function ScrollExpandHero({
    videoSrc = "https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/hero/hero-video.mp4",
    bgImageSrc = "/images/hero-bg.jpg",
    posterSrc = "/images/hero-fountain-new.jpg",
    children,
}: ScrollExpandHeroProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Un solo árbol DOM: CSS media queries para responsive (no JS).
    // Elimina el salto de hydration (SSR desktop → client mobile).
    // 100svh = viewport sin barra de dirección, sin cálculo JS.
    // overflow-x:clip en desktop para sticky, sin efecto negativo en mobile.
    return (
        <div style={{ overflowX: 'clip' }}>
            {/* ====== MOBILE HERO (visible < md) ====== */}
            <section className="md:hidden relative w-full overflow-hidden h-[100svh]">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 z-10" />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
                    <div className="flex flex-col items-center justify-center mb-8">
                        <span className="font-serif text-7xl font-bold text-white italic drop-shadow-2xl">
                            Fuente
                        </span>
                        <span className="font-cormorant text-8xl font-bold text-sage-green drop-shadow-2xl -mt-4">
                            Viva
                        </span>
                    </div>

                    <p className="text-white text-center text-sm tracking-[0.2em] font-medium uppercase max-w-[280px] drop-shadow-lg mb-12">
                        Fuentes artesanales para jardines y exteriores
                    </p>

                    <div className="absolute bottom-10 flex flex-col items-center gap-1.5">
                        <p className="text-white text-xs tracking-[0.2em] font-medium uppercase drop-shadow-lg text-center leading-relaxed">
                            DESLIZÁ PARA VER <br />
                            <span className="text-sage-green font-bold">MODELOS Y PRECIOS</span>
                        </p>
                        <ChevronDown className="text-white animate-bounce icon-shine drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] mt-1" size={28} />
                    </div>
                </div>
            </section>

            {/* ====== DESKTOP HERO (visible >= md) ====== */}
            <div className="hidden md:block sticky top-0 z-0 h-[100svh] overflow-hidden">
                <Image
                    src={bgImageSrc || posterSrc}
                    alt="Fuente Viva Hero"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-serif text-8xl md:text-9xl font-bold text-white italic drop-shadow-2xl"
                        >
                            Fuente
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-cormorant text-9xl md:text-[11rem] font-bold text-sage-green drop-shadow-2xl -mt-8"
                        >
                            Viva
                        </motion.span>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-white text-lg md:text-xl tracking-[0.3em] font-medium uppercase drop-shadow-lg mb-16"
                    >
                        Fuentes artesanales para jardines y exteriores
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="absolute bottom-12 flex flex-col items-center gap-2"
                    >
                        <p className="text-white text-sm md:text-base tracking-[0.2em] font-medium uppercase drop-shadow-lg text-center leading-relaxed">
                            DESLIZÁ PARA VER <br />
                            <span className="text-sage-green font-bold">MODELOS Y PRECIOS</span>
                        </p>
                        <ChevronDown className="text-white animate-bounce icon-shine drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mt-2" size={32} />
                    </motion.div>
                </div>
            </div>

            {/* ====== CONTENIDO (una sola vez, ambos layouts) ====== */}
            <div
                className="relative z-10 bg-off-white md:rounded-t-[2rem] md:shadow-[0_-24px_60px_rgba(0,0,0,0.35)] md:-mt-8"
            >
                {children}
            </div>
        </div>
    );
}
