'use client';

import {
    useRef,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';

interface ScrollExpandHeroProps {
    videoSrc?: string;
    bgImageSrc?: string;
    children?: ReactNode;
}

export function ScrollExpandHero({
    videoSrc = "https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/hero/hero-video.mp4",
    bgImageSrc = "/images/hero-fountain-new.jpg",
    children,
}: ScrollExpandHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // useScroll tracking for the height of the hero section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Animation transformations
    // Desktop animations
    const mediaWidth = useTransform(smoothProgress, [0, 0.4], ["320px", "100vw"]);
    const mediaHeight = useTransform(smoothProgress, [0, 0.4], ["450px", "100vh"]);
    const mediaBorderRadius = useTransform(smoothProgress, [0, 0.35], ["24px", "0px"]);
    
    const textTranslateLeft = useTransform(smoothProgress, [0, 0.4], ["0px", "-250px"]);
    const textTranslateRight = useTransform(smoothProgress, [0, 0.4], ["0px", "250px"]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
    const videoOverlayOpacity = useTransform(smoothProgress, [0, 0.4], [0.6, 0.2]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    if (!isMounted) return null;

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Sticky Container for the Hero Animation - Height determines how much "scroll" it takes to expand */}
            <div className="h-[200vh] md:h-[250vh] relative w-full bg-black">
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    
                    {/* Background Layer (Static fallback) */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={bgImageSrc || "/images/hero-fountain-new.jpg"}
                            alt="Fondo decorativo"
                            fill
                            className="object-cover grayscale opacity-20 blur-sm"
                            priority
                        />
                    </div>

                    {/* The Media (Video/Image) that expands - In Mobile it stays full screen */}
                    <motion.div
                        className="relative z-10 overflow-hidden flex items-center justify-center shadow-2xl"
                        style={{
                            width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vw' : mediaWidth,
                            height: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vh' : mediaHeight,
                            borderRadius: typeof window !== 'undefined' && window.innerWidth < 768 ? '0px' : mediaBorderRadius,
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            poster={bgImageSrc}
                        />
                        
                        {/* Overlay to darken slightly for text readability */}
                        <motion.div 
                            className="absolute inset-0 bg-black/40 z-10"
                            style={{ opacity: videoOverlayOpacity }}
                        />

                        {/* Mute toggle - Always visible on scroll in desktop, hidden in mobile if static */}
                        <motion.button
                            onClick={toggleMute}
                            className="absolute bottom-10 right-10 z-30 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg hidden md:flex"
                            style={{ opacity: useTransform(smoothProgress, [0.35, 0.45], [0, 1]) }}
                        >
                            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                        </motion.button>
                    </motion.div>

                    {/* Titles - Layered on top */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
                        
                        {/* Main Title Container */}
                        <div className="relative flex flex-col items-center justify-center">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10">
                                <motion.span 
                                    className="font-serif text-6xl md:text-9xl font-bold text-white italic drop-shadow-2xl"
                                    style={{ x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : textTranslateLeft, opacity: heroOpacity }}
                                >
                                    Fuente
                                </motion.span>
                                <motion.span 
                                    className="font-cormorant text-7xl md:text-[12rem] font-light text-sage-green drop-shadow-2xl -mt-4 md:mt-0"
                                    style={{ x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : textTranslateRight, opacity: heroOpacity }}
                                >
                                    Viva
                                </motion.span>
                            </div>
                            
                            <motion.p 
                                className="text-white/90 text-sm md:text-2xl font-light tracking-[0.2em] uppercase mt-4 md:mt-8 text-center max-w-[280px] md:max-w-none"
                                style={{ opacity: heroOpacity }}
                            >
                                Naturaleza en Movimiento
                            </motion.p>
                        </div>

                        {/* Scroll Indicator */}
                        <motion.div 
                            className="absolute bottom-10 flex flex-col items-center gap-2"
                            style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
                        >
                            <span className="text-white/50 text-[10px] md:text-xs tracking-widest uppercase">Desliza para explorar</span>
                            <ChevronDown className="text-white/30 animate-bounce" size={24} />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content following the hero */}
            <div className="relative z-30 bg-off-white">
                {children}
            </div>
        </div>
    );
}
