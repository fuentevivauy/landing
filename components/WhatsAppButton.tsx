'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/supabase/analytics';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export function WhatsAppButton() {
    const { settings } = useSiteSettings();
    const whatsappLink = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message)}`;

    const handleTrack = () => {
        // Fire and forget tracking so it doesn't block the window.open or link navigation
        trackEvent('whatsapp_click', null, { source: 'floating_button' });
    };

    return (
        <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTrack}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle className="w-7 h-7 text-white" />

            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />

            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-2 bg-slate-blue text-off-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                ¿Consultas? ¡Escribinos!
            </span>
        </motion.a>
    );
}

