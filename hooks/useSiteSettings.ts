import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface SiteSettings {
    id?: string;
    whatsapp_number: string;
    whatsapp_message: string;
    contact_email: string;
    store_name: string;
}

const defaultSettings: SiteSettings = {
    whatsapp_number: '59894713998',
    whatsapp_message: 'Hola Fuente Viva, quiero consultar sobre sus productos.',
    contact_email: 'contacto@fuenteviva.com.uy',
    store_name: 'Fuente Viva',
};

export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .limit(1)
                    .single();

                if (data && !error) {
                    setSettings(data);
                }
            } catch {
                // Use default settings on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, isLoading };
}
