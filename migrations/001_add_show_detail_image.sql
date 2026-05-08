-- Migración: Añade el campo show_detail_image en products
-- Permite ocultar la imagen principal de detalle y mostrar primero el video

ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS show_detail_image BOOLEAN NOT NULL DEFAULT TRUE;

COMMENT ON COLUMN public.products.show_detail_image IS
    'Si es true, muestra la imagen de detalle antes del video. Si es false, muestra primero el video.';
