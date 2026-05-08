/**
 * Loader personalizado para imágenes de productos servidas desde Supabase Storage.
 *
 * Motivo: el optimizador de Next.js (`/_next/image`) intenta descargar la imagen
 * desde Supabase y la procesa con sharp. Cuando la imagen pesa más de unos pocos
 * MB o Supabase tarda en responder, el optimizador supera su timeout interno
 * (~7s) y devuelve 500 → la imagen se ve rota.
 *
 * Este loader devuelve la URL directa de Supabase, evitando el optimizador.
 * El navegador descarga la imagen tal cual y la muestra. Más estable que el
 * pipeline de optimización para este caso.
 */
export function supabaseImageLoader({ src }: { src: string; width: number; quality?: number }) {
    return src;
}
