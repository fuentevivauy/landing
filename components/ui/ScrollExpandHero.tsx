'use client';

import {
    useEffect,
    useRef,
    useState,
    ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface ScrollExpandHeroProps {
    videoSrc?: string;
    bgImageSrc?: string;
    children?: ReactNode;
}

export function ScrollExpandHero({
    videoSrc = "https://res.cloudinary.com/dj1wscyom/video/upload/v1768915137/IMG_3426_ixgfyl.mov",
    bgImageSrc = "/images/hero-fountain.jpg",
    children,
}: ScrollExpandHeroProps) {
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Toggle mute
    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    // Auto-play / Unmute on expand logic
    useEffect(() => {
        if (mediaFullyExpanded && videoRef.current) {
            if (!videoRef.current.muted) {
                videoRef.current.play().catch(() => {
                    // Fallback if blocked
                    if (videoRef.current) {
                        videoRef.current.muted = true;
                        setIsMuted(true);
                        videoRef.current.play();
                    }
                });
            } else {
                videoRef.current.play();
            }
        }
    }, [mediaFullyExpanded]);

    useEffect(() => {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
        // Ensure video autoplays on mount (muted for browser policy compliance)
        if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => { });
        }
    }, []);

    useEffect(() => {
        // Desktop Scroll Logic
        const handleWheel = (e: globalThis.WheelEvent) => {
            if (isMobile) return;

            // Si hay un modal abierto, no interferir con el scroll/wheel
            if (document.body.getAttribute('data-modal-open') === 'true') return;

            if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
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

        const handleScroll = (): void => {
            if (!mediaFullyExpanded && !isMobile) {
                window.scrollTo(0, 0);
            }
        };

        if (!isMobile) {
            window.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollProgress, mediaFullyExpanded, isMobile]);

    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const mediaWidth = 300 + scrollProgress * (1350);
    const mediaHeight = 400 + scrollProgress * (500);
    const textTranslateX = scrollProgress * (180);

    return (
        <>
            <div
                ref={sectionRef}
                className="transition-colors duration-700 ease-in-out overflow-x-hidden"
            >
                <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
                    <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
                        {/* Background Image - fades as scroll progresses on Desktop */}
                        <motion.div
                            className="absolute inset-0 z-0 h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isMobile ? 0 : 1 - scrollProgress }}
                            transition={{ duration: 0.1 }}
                        >
                            <Image
                                src={bgImageSrc}
                                alt="Background"
                                width={1920}
                                height={1080}
                                className="w-full h-full object-cover grayscale"
                                priority
                            />
                            <div className="absolute inset-0 bg-slate-blue/30" />
                        </motion.div>


                        {/* MOBILE HERO: Full Loop Video (Muted) */}
                        {isMobile && (
                            <div className="absolute inset-0 z-0 bg-black">
                                <video
                                    src={videoSrc}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover object-center opacity-80"
                                />
                                <div className="absolute inset-0 bg-black/40" />
                            </div>
                        )}


                        <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
                            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

                                {/* DESKTOP HERO: Expandable Video (Audio) */}
                                {!isMobile && (
                                    <div
                                        className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl overflow-hidden group"
                                        style={{
                                            width: `${mediaWidth}px`,
                                            height: `${mediaHeight}px`,
                                            maxWidth: '95vw',
                                            maxHeight: '85vh',
                                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                                        }}
                                    >
                                        <div className="relative w-full h-full">
                                            <video
                                                ref={videoRef}
                                                src={videoSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="auto"
                                                className="w-full h-full object-cover object-center"
                                                controls={false}
                                            />

                                            <motion.div
                                                className="absolute inset-0 bg-black/30 pointer-events-none"
                                                initial={{ opacity: 0.7 }}
                                                animate={{ opacity: 0.5 - scrollProgress * 0.5 }}
                                            />

                                            {/* Mute Button */}
                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: scrollProgress > 0.5 ? 1 : 0 }}
                                                onClick={toggleMute}
                                                className="absolute bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                                            >
                                                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                            </motion.button>
                                        </div>

                                        {!mediaFullyExpanded && (
                                            <div className="absolute bottom-4 left-0 w-full flex justify-center text-center z-10">
                                                <motion.p
                                                    className="text-off-white/80 font-medium text-center text-sm"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: scrollProgress < 0.3 ? 1 : 0 }}
                                                >
                                                    Desliza para explorar
                                                </motion.p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Hero Titles */}
                                <div className="flex items-center justify-center text-center gap-2 md:gap-4 w-full relative z-10 transition-none flex-col pointer-events-none">
                                    {isMobile ? (
                                        <>
                                            <h1 className="font-serif text-5xl font-bold text-off-white italic mb-2 mix-blend-difference">
                                                Fuente Viva
                                            </h1>
                                            <p className="text-off-white font-medium text-lg tracking-wide max-w-xs px-4">
                                                Un rincón de calma donde la naturaleza <br />
                                                se detiene a beber
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex gap-4 mix-blend-difference">
                                                <motion.h1
                                                    className="font-serif text-5xl lg:text-8xl font-bold text-off-white transition-none italic"
                                                    style={{ transform: `translateX(-${textTranslateX}px)` }}
                                                >
                                                    Fuente
                                                </motion.h1>
                                                <motion.h1
                                                    className="font-serif text-5xl lg:text-8xl font-bold text-center text-off-white transition-none italic"
                                                    style={{ transform: `translateX(${textTranslateX}px)` }}
                                                >
                                                    Viva
                                                </motion.h1>
                                            </div>
                                            <motion.p
                                                className="mt-6 text-off-white font-medium text-xl tracking-wide max-w-lg"
                                                style={{ opacity: 1 - scrollProgress * 2 }}
                                            >
                                                Un rincón de calma donde la naturaleza <br />
                                                se detiene a beber
                                            </motion.p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Spacer Content */}
                            <motion.section
                                className="flex flex-col w-full"
                                style={{ display: (mediaFullyExpanded || isMobile) ? 'flex' : 'none' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7 }}
                            >
                            </motion.section>
                        </div>
                    </div>
                </section>
            </div>

            <div className="relative z-10 bg-off-white">
                {children}
            </div>
        </>
    );
}
