'use client';

import { motion } from 'framer-motion';
import { Leaf, Sun, Wrench } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const features = [
    {
        icon: Leaf,
        title: 'Más de 6 Años',
        description:
            'Vendiendo e Instalando Fuentes. Experiencia, dedicación y atención personalizada en proyectos en todo Uruguay.',
    },
    {
        icon: Sun,
        title: 'Acabado Artesanal',
        description:
            'Trabajamos con piezas moldeadas y terminaciones artesanales, logrando un resultado cuidado y personalizado.',
    },
    {
        icon: Wrench,
        title: 'Instalación Profesional',
        description:
            'Podemos encargarnos de la instalación de tu fuente. Este servicio es opcional y se cotiza aparte del precio del producto.',
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
        <section className="py-20 bg-warm-cream">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-16">
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-2 text-sm font-medium text-sage-green bg-sage-light rounded-full mb-6 tracking-widest uppercase"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-light rounded-full mb-5">
                                <feature.icon className="w-7 h-7 text-sage-green" />
                            </div>

                            {/* Title */}
                            <h3 className="font-serif text-xl font-semibold text-slate-blue mb-3">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-stone-gray leading-relaxed max-w-xs mx-auto">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
