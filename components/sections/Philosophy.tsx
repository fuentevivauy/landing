'use client';

import { motion } from 'framer-motion';
import { Leaf, Sun, Wrench } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const features = [
    {
        icon: Leaf,
        title: 'Más de 6 Años',
        description:
            'Vendiendo e instalando fuentes artesanales con atención personalizada y dedicación en cada proyecto.',
    },
    {
        icon: Sun,
        title: 'Acabado Artesanal',
        description:
            'Trabajamos con piezas moldeadas y terminaciones artesanales, logrando un resultado elegante, cuidado y único.',
    },
    {
        icon: Wrench,
        title: 'Instalación Profesional',
        description:
            'Disponible en Montevideo, Ciudad de la Costa, Canelones y Maldonado.',
    },
];

// Animation variants for staggered text entrance
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const lineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const },
    },
};

export function Philosophy() {
    return (
        <section className="py-4 md:py-8 bg-warm-cream">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-6 md:mb-8">
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 text-[10px] md:text-xs font-medium text-sage-green bg-sage-light rounded-full mb-3 tracking-widest uppercase"
                    >
                        Nuestra Filosofía
                    </motion.span>

                    {/* Main Title - MOBILE VERSION (Compact) */}
                    <motion.h2
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="font-serif text-[22px] leading-tight px-2 text-slate-blue mx-auto md:hidden"
                    >
                        <motion.span variants={lineVariants}>
                            Cada fuente es una <span className="italic text-sage-green">obra de arte</span> creada con detalle y pasión.
                        </motion.span>
                    </motion.h2>

                    {/* Main Title - WEB VERSION */}
                    <motion.h2
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="hidden md:block font-serif text-3xl lg:text-4xl text-slate-blue leading-tight max-w-3xl mx-auto"
                    >
                        <motion.span variants={lineVariants}>
                            Cada fuente es una <span className="italic text-sage-green whitespace-nowrap">obra de arte</span> creada con detalle y pasión.
                        </motion.span>
                    </motion.h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="text-center p-2"
                        >
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-light rounded-full mb-3">
                                <feature.icon className="w-6 h-6 text-sage-green" />
                            </div>

                            {/* Title */}
                            <h3 className="font-serif text-lg font-semibold text-slate-blue mb-1">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-stone-gray text-sm leading-relaxed max-w-[240px] mx-auto">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
