'use client';

import {
    useRef,
    useState,
    ReactNode,
    useEffect,
} from 'react';
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
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isMounted) return null;

    // === MOBILE VERSION ===
    if (isMobile) {
        return (
            <div className="overflow-x-hidden">
                {/* Mobile Hero: full-screen video */}
                <section className="relative w-full h-[100dvh] overflow-hidden">
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
                    <div className="absolute inset-0 bg-black/30 z-10" />

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
                        <div className="flex flex-col items-center justify-center mb-8">
                            <span className="font-serif text-7xl font-bold text-white italic drop-shadow-2xl">
                                Fuente
                            </span>
                            <span className="font-cormorant text-8xl font-light text-sage-green drop-shadow-2xl -mt-4">
                                Viva
                            </span>
                        </div>

                        <p className="text-white text-center text-sm md:text-base tracking-[0.2em] font-medium uppercase max-w-[280px] drop-shadow-lg mb-12">
                            Fuentes artesanales para jardines y exteriores
                        </p>

                        <div className="absolute bottom-10 flex flex-col items-center gap-2">
                            <p className="text-white font-medium text-sm drop-shadow-lg">
                                Desliza para ver <span className="text-sage-green font-bold">modelos y precios</span>
                            </p>
                            <ChevronDown className="text-white animate-bounce drop-shadow-lg" size={24} />
                        </div>
                    </div>
                </section>

                <div className="relative z-30 bg-off-white">
                    {children}
                </div>
            </div>
        );
    }

    // === DESKTOP VERSION: sticky hero with content sliding over ===
    // NOTE: must use overflow-x:clip (not hidden) — hidden creates a scroll container that breaks position:sticky
    return (
        <div style={{ overflowX: 'clip' }}>
            {/* Sticky hero — stays in place while content scrolls over it */}
            <div className="sticky top-0 z-0 h-[100dvh] overflow-hidden">
                <img
                    src={bgImageSrc || posterSrc}
                    alt="Fuente Viva Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />

                {/* Hero content */}
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
                            className="font-cormorant text-9xl md:text-[11rem] font-light text-sage-green drop-shadow-2xl -mt-8"
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
                        className="absolute bottom-12 flex flex-col items-center gap-3"
                    >
                        <p className="text-white font-medium text-lg drop-shadow-lg">
                            Desliza para ver <span className="text-sage-green font-bold">modelos y precios</span>
                        </p>
                        <ChevronDown className="text-white animate-bounce drop-shadow-lg" size={32} />
                    </motion.div>
                </div>
            </div>

            {/* Content slides over the hero — the rounded top + shadow creates depth */}
            <div
                className="relative z-10 bg-off-white"
                style={{
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '2rem',
                    boxShadow: '0 -24px 60px rgba(0,0,0,0.35)',
                    marginTop: '-2rem',
                }}
            >
                {children}
            </div>
        </div>
    );
}
