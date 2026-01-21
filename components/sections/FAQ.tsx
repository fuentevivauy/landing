'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { faqItems } from '@/lib/data/products';

function FAQAccordionItem({
    question,
    answer,
    isOpen,
    onClick,
    index,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border-b border-stone-gray/20 last:border-b-0"
        >
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between text-left hover:text-slate-blue/80 transition-colors"
            >
                <span className="font-medium text-slate-blue pr-4">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-stone-gray" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-stone-gray leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-white">
            <Container className="max-w-3xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-blue mb-4">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-stone-gray text-lg">
                        Todo lo que necesitas saber antes de tu compra.
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="bg-off-white rounded-2xl p-6 md:p-8">
                    {faqItems.map((item, index) => (
                        <FAQAccordionItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                            index={index}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
