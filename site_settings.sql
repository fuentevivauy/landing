-- Tabla para configuraciones del sitio
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    whatsapp_number TEXT NOT NULL DEFAULT '59894713998',
    whatsapp_message TEXT NOT NULL DEFAULT 'Hola Fuente Viva, quiero consultar sobre sus productos.',
    contact_email TEXT NOT NULL DEFAULT 'contacto@fuenteviva.com.uy',
    store_name TEXT NOT NULL DEFAULT 'Fuente Viva',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Lectura pública de configuraciones" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Solo usuarios autenticados pueden actualizar configuraciones" ON public.site_settings
    FOR UPDATE USING (auth.role() = 'authenticated');
    
CREATE POLICY "Solo usuarios autenticados pueden insertar configuraciones" ON public.site_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insertar valores por defecto
INSERT INTO public.site_settings (whatsapp_number, whatsapp_message, contact_email, store_name)
VALUES ('59894713998', 'Hola Fuente Viva, quiero consultar sobre sus productos.', 'contacto@fuenteviva.com.uy', 'Fuente Viva');
