import { Product } from '@/lib/types/product';

export const getWhatsAppLink = (product: Product, whatsappNumber: string = '59894713998'): string => {
    const message = encodeURIComponent(
        `Hola Fuente Viva, deseo consultar por el producto ${product.name} con precio ${product.priceFormatted}`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
};

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export const faqItems: FAQItem[] = [
    {
        id: 'q1',
        question: '¿Dónde se retira el producto?',
        answer: 'El retiro se coordina en nuestro Pickup en El Pinar, Ciudad de la Costa.',
    },
    {
        id: 'q2',
        question: '¿Las fuentes incluyen motor?',
        answer: 'Sí, todas nuestras fuentes incluyen motor de agua de bajo consumo listo para usar.',
    },
    {
        id: 'q3',
        question: '¿Realizan instalaciones?',
        answer: 'Sí, ofrecemos instalación profesional opcional en Montevideo, Ciudad de la Costa, Canelones y Maldonado.',
    },
    {
        id: 'q4',
        question: '¿Hacen envíos?',
        answer: 'Sí, realizamos envíos coordinados en Montevideo, Ciudad de la Costa, Canelones y Maldonado.',
    },
    {
        id: 'q5',
        question: '¿Se puede pedir un color especial?',
        answer: 'Sí, algunos modelos pueden realizarse en colores o terminaciones personalizadas según disponibilidad.',
    },
];
