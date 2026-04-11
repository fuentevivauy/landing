'use client';

import {
    useRef,
    useState,
    ReactNode,
    useEffect,
    useCallback,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
    const [touchStartY, setTouchStartY] = useState(0);

    // Check mobile on mount and resize
    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll-jacking logic — ONLY for desktop
    useEffect(() => {
        if (!isMounted || isMobile) return;

        const handleWheel = (e: WheelEvent) => {
            if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                setShowContent(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();
                const scrollDelta = e.deltaY * 0.0009;
                const newProgress = Math.min(
                    Math.max(scrollProgress + scrollDelta, 0),
                    1
                );
                setScrollProgress(newProgress);

                if (newProgress >= 1) {
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                } else if (newProgress < 0.75) {
                    setShowContent(false);
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            setTouchStartY(e.touches[0].clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!touchStartY) return;

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;

            if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                setShowContent(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();
                const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
                const scrollDelta = deltaY * scrollFactor;
                const newProgress = Math.min(
                    Math.max(scrollProgress + scrollDelta, 0),
                    1
                );
                setScrollProgress(newProgress);

                if (newProgress >= 1) {
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                } else if (newProgress < 0.75) {
                    setShowContent(false);
                }

                setTouchStartY(touchY);
            }
        };

        const handleTouchEnd = () => {
            setTouchStartY(0);
        };

        const handleScroll = () => {
            if (!mediaFullyExpanded) {
                window.scrollTo(0, 0);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMounted, isMobile, scrollProgress, mediaFullyExpanded, touchStartY]);

    const toggleMute = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    }, []);

    if (!isMounted) return null;

    // Desktop: scroll-expand effect dimensions
    const mediaWidth = 300 + scrollProgress * 1250;
    const mediaHeight = 400 + scrollProgress * 400;
    const textTranslateX = scrollProgress * 150;

    // === MOBILE VERSION ===
    if (isMobile) {
        return (
            <div ref={sectionRef} className="overflow-x-hidden">
                {/* Mobile Hero: full-screen video, no scroll-jacking */}
                <section className="relative w-full h-[100dvh] overflow-hidden">
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
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10" />

                    {/* Title */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-serif text-6xl font-bold text-white italic drop-shadow-2xl">
                                Fuente
                            </span>
                            <span className="font-cormorant text-7xl font-light text-sage-green drop-shadow-2xl -mt-2">
                                Viva
                            </span>
                            <p className="text-white/90 text-sm font-light tracking-[0.2em] uppercase mt-4 text-center max-w-[280px]">
                                Naturaleza en Movimiento
                            </p>
                        </div>

                        {/* Scroll indicator */}
                        <div className="absolute bottom-10 flex flex-col items-center gap-2">
                            <span className="text-white/50 text-[10px] tracking-widest uppercase">Desliza para explorar</span>
                            <ChevronDown className="text-white/30 animate-bounce" size={24} />
                        </div>
                    </div>

                    {/* Mute button */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-10 right-5 z-30 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </section>

                {/* Content */}
                <div className="relative z-30 bg-off-white">
                    {children}
                </div>
            </div>
        );
    }

    // === DESKTOP VERSION: Scroll-expand effect ===
    return (
        <div ref={sectionRef} className="overflow-x-hidden">
            <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
                <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

                    {/* Background image (grayscale, fades out as scroll progresses) */}
                    <motion.div
                        className="absolute inset-0 z-0 h-full"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 - scrollProgress }}
                        transition={{ duration: 0.1 }}
                    >
                        <Image
                            src={bgImageSrc}
                            alt="Fondo decorativo"
                            fill
                            sizes="100vw"
                            quality={100}
                            className="object-cover grayscale"
                            style={{ objectPosition: 'center' }}
                            priority
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>

                    <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
                        <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

                            {/* === THE EXPANDING VIDEO CARD === */}
                            <div 
                                className="absolute inset-0 z-0"
                                style={{ 
                                    filter: `drop-shadow(0px 0px 30px rgba(0, 0, 0, ${0.5 * (1 - scrollProgress)}))`
                                }}
                            >
                                <div
                                    className="absolute z-0 top-0 left-0 w-full h-full overflow-hidden"
                                    style={{
                                        clipPath: `inset(calc((50dvh - 200px) * ${1 - scrollProgress}) calc((50vw - 150px) * ${1 - scrollProgress}) round ${24 * (1 - scrollProgress)}px)`,
                                        transform: 'translateZ(0)', // Force GPU acceleration
                                        willChange: 'clip-path'
                                    }}
                                >
                                    <div className="relative w-full h-full pointer-events-none bg-slate-900">
                                        <video
                                            ref={videoRef}
                                            src={videoSrc}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="auto"
                                            className="w-full h-full object-cover"
                                            controls={false}
                                            poster={bgImageSrc}
                                        />
                                        {/* Overlay that fades as video expands */}
                                        <motion.div
                                            className="absolute inset-0 bg-black/30"
                                            initial={{ opacity: 0.7 }}
                                            animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Scroll-to-expand hint (below the video card) */}
                            <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none pointer-events-none">
                                <p
                                    className="text-white/60 font-medium text-sm text-center"
                                    style={{
                                        transform: `translateX(${textTranslateX}vw)`,
                                        opacity: 1 - scrollProgress * 2,
                                    }}
                                >
                                    Desliza para explorar
                                </p>
                            </div>

                            {/* === TITLE TEXT (splits apart on scroll) === */}
                            <div className="flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col mix-blend-normal">
                                <motion.span
                                    className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white italic drop-shadow-2xl transition-none"
                                    style={{
                                        transform: `translateX(-${textTranslateX}vw)`,
                                    }}
                                >
                                    Fuente
                                </motion.span>
                                <motion.span
                                    className="font-cormorant text-7xl md:text-9xl lg:text-[11rem] font-light text-sage-green drop-shadow-2xl transition-none -mt-4"
                                    style={{
                                        transform: `translateX(${textTranslateX}vw)`,
                                    }}
                                >
                                    Viva
                                </motion.span>
                            </div>

                            {/* Subtitle */}
                            <motion.p
                                className="text-white/80 text-lg md:text-2xl font-light tracking-[0.2em] uppercase mt-6 text-center relative z-10"
                                style={{ opacity: 1 - scrollProgress * 2 }}
                            >
                                Naturaleza en Movimiento
                            </motion.p>

                            {/* Scroll indicator arrow */}
                            <motion.div
                                className="absolute bottom-10 flex flex-col items-center gap-2 z-10"
                                style={{ opacity: 1 - scrollProgress * 3 }}
                            >
                                <ChevronDown className="text-white/30 animate-bounce" size={24} />
                            </motion.div>
                        </div>

                        {/* Content section — appears once video is fully expanded */}
                        <motion.section
                            className="flex flex-col w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {children}
                        </motion.section>
                    </div>
                </div>
            </section>
        </div>
    );
}
