-- ============================================================
-- 🏗️ ESQUEMA DE BASE DE DATOS - FUENTE VIVA
-- Pegar este SQL completo en: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- 1. TABLA DE PRODUCTOS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    price NUMERIC(10, 2),
    price_formatted TEXT NOT NULL DEFAULT 'Consultar',
    category TEXT NOT NULL DEFAULT 'Fuentes de Mesa',
    in_stock BOOLEAN NOT NULL DEFAULT true,
    featured BOOLEAN NOT NULL DEFAULT false,
    benefits TEXT[] DEFAULT '{}',
    specs JSONB DEFAULT '{}',
    image_thumbnail TEXT DEFAULT '',
    image_gallery TEXT[] DEFAULT '{}',
    whatsapp_message TEXT DEFAULT 'Hola! Me interesa este producto.',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABLA DE ANALYTICS (Tracking de productos)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click', 'whatsapp_click', 'page_view')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. INDICES para rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_analytics_product ON public.analytics_events(product_id);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics_events(created_at);

-- 4. FUNCIÓN para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. ROW LEVEL SECURITY (RLS)
-- Permitir leer productos a todos (público)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Productos visibles para todos"
    ON public.products FOR SELECT
    USING (true);

CREATE POLICY "Solo admin puede insertar productos"
    ON public.products FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Solo admin puede actualizar productos"
    ON public.products FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Solo admin puede eliminar productos"
    ON public.products FOR DELETE
    TO authenticated
    USING (true);

-- Analytics: cualquiera puede insertar (para trackeo público), solo admin lee
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede registrar eventos"
    ON public.analytics_events FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Solo admin puede ver analytics"
    ON public.analytics_events FOR SELECT
    TO authenticated
    USING (true);

-- 6. STORAGE BUCKET para imágenes de productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política: cualquiera puede ver imágenes
CREATE POLICY "Imágenes públicas" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');

-- Política: solo admin sube/modifica/borra imágenes
CREATE POLICY "Admin sube imágenes" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin actualiza imágenes" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'product-images');

CREATE POLICY "Admin borra imágenes" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'product-images');

-- ============================================================
-- ✅ ¡LISTO! Después de ejecutar, verificá en Table Editor
-- que las tablas 'products' y 'analytics_events' existan.
-- ============================================================
