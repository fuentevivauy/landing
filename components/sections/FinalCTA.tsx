'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function FinalCTA() {
    const whatsappLink =
        'https://wa.me/59894713998?text=Hola%20Fuente%20Viva%2C%20quiero%20hacer%20un%20pedido.';

    return (
        <section className="relative py-24 bg-slate-blue overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    src="https://res.cloudinary.com/dj1wscyom/video/upload/v1768934599/video_fuentes_web_final_lokfit.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-slate-blue/80 mix-blend-multiply" />
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
                        className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-off-white mb-6 italic"
                    >
                        Fuente Viva
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
