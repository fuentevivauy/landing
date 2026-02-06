'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function FinalCTA() {
    const whatsappLink =
        'https://wa.me/59894713998?text=Hola%20Fuente%20Viva%2C%20quiero%20hacer%20un%20pedido.';

    return (
        <section className="relative py-24 bg-slate-blue overflow-hidden">
            {/* Background Images */}
            <div className="absolute inset-0 z-0 select-none">
                {/* Mobile Image */}
                <div className="relative w-full h-full md:hidden">
                    <Image
                        src="https://res.cloudinary.com/doyde4ron/image/upload/v1770408575/final_cta_mobile_birds_azmtti.jpg"
                        alt="Bebedero con pájaros"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Desktop Image */}
                <div className="hidden md:block relative w-full h-full">
                    <Image
                        src="https://res.cloudinary.com/doyde4ron/image/upload/v1770408607/final_cta_desktop_birds_uh8qyg.png"
                        alt="Bebedero con pájaros"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Container */}

            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Brand */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 flex items-baseline justify-center gap-3"
                    >
                        <span className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold italic text-off-white">Fuente</span>
                        <span className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light text-sage-green translate-y-1">Viva</span>
                    </motion.h2>

                    {/* Mission */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-off-white/80 text-lg md:text-xl leading-relaxed mb-10"
                    >
                        Un rincón de calma donde la naturaleza se detiene a beber.
                        <br />
                        Fuentes, bebederos y estatuas artesanales de hormigón premium.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-sage-green hover:bg-sage-green/90 text-white shadow-lg hover:shadow-xl"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Hacer mi pedido
                            </Button>
                        </a>
                        <a href="#catalogo">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto border-off-white/30 text-off-white hover:bg-off-white/10 hover:border-off-white"
                            >
                                Ver catálogo
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </a>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 flex flex-wrap justify-center gap-8 text-off-white/60 text-sm"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-sage-green rounded-full" />
                            Más de 6 años de experiencia
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-sage-green rounded-full" />
                            Instalación profesional
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-sage-green rounded-full" />
                            Envíos a todo Uruguay
                        </span>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
