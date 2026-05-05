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
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' as const },
    },
};

export function Philosophy() {
    return (
        <section className="py-12 md:py-20 bg-warm-cream">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-16">
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-2 text-xs md:text-sm font-medium text-sage-green bg-sage-light rounded-full mb-4 md:mb-6 tracking-widest uppercase"
                    >
                        Nuestra Filosofía
                    </motion.span>

                    {/* Main Title - MOBILE VERSION (4 lines) */}
                    <motion.h2
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="font-serif text-3xl text-slate-blue leading-tight max-w-xs mx-auto md:hidden"
                    >
                        <motion.span variants={lineVariants} className="block">
                            Cada fuente es una
                        </motion.span>
                        <motion.span
                            variants={lineVariants}
                            className="block italic text-sage-green"
                        >
                            obra de arte
                        </motion.span>
                        <motion.span variants={lineVariants} className="block">
                            creada con
                        </motion.span>
                        <motion.span
                            variants={lineVariants}
                            className="block italic text-sage-green"
                        >
                            detalle y pasión.
                        </motion.span>
                    </motion.h2>

                    {/* Main Title - WEB VERSION (3 lines) */}
                    <motion.h2
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="hidden md:block font-serif text-4xl lg:text-5xl text-slate-blue leading-tight max-w-3xl mx-auto"
                    >
                        <motion.span variants={lineVariants} className="block">
                            Cada fuente es una{' '}
                            <span className="italic text-sage-green whitespace-nowrap">obra de arte</span>
                        </motion.span>
                        <motion.span variants={lineVariants} className="block text-slate-blue/90">
                            creada con detalle y pasión.
                        </motion.span>
                    </motion.h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-sage-light rounded-full mb-4 md:mb-5">
                                <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-sage-green" />
                            </div>

                            {/* Title */}
                            <h3 className="font-serif text-lg md:text-xl font-semibold text-slate-blue mb-2 md:mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-stone-gray text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
