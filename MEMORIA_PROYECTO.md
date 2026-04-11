# MEMORIA DEL PROYECTO: FUENTE VIVA ⛲

Este archivo contiene el estado actual del proyecto, la infraestructura utilizada y las modificaciones técnicas críticas realizadas. Sirve como punto de referencia para cualquier intervención futura.

## 1. Infraestructura Actual (Independencia del Cliente)

El proyecto ha sido migrado exitosamente de las cuentas de desarrollo a la infraestructura propia del cliente.

*   **Repositorio GitHub:** `fuentevivauy/landing`
*   **Despliegue (Vercel):** `landing-mu-nine-15.vercel.app` (conectado al repositorio anterior).
*   **Base de Datos (Supabase):** Proyecto del cliente con las siguientes credenciales configuradas en Vercel (Environment Variables):
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
*   **Almacenamiento (Supabase Storage):** Bucket `product-images`. Contiene todas las fotos de productos y el video del Hero, eliminando la dependencia de Cloudinary.

## 2. Estado de la Base de Datos

La base de datos en Supabase está completamente operativa con los siguientes esquemas aplicados:
*   `supabase_schema.sql`: Estructura de tablas (productos, categorías, analíticas) y políticas RLS.
*   `seed_products.sql`: Datos maestros con **37 productos** actualizados con las nuevas URLs de Supabase Storage.

## 3. Modificaciones Técnicas Críticas

### A. Optimización Final del Hero (`components/ui/ScrollExpandHero.tsx`)
Se perfeccionó la experiencia visual del Hero tras la migración, logrando la fidelidad estética solicitada:
*   **Corrección de Imagen de Fondo**: Se solucionó el error de expansión vertical limitando el contenedor al viewport (`100dvh`). Se aplicó un filtro `grayscale`, un `blur-[4px]` sutil y un `scale-105` para crear profundidad visual sin artefactos en los bordes.
*   **Refinamiento de UI/UX**: 
    *   Se eliminó el subtítulo "Naturaleza en Movimiento" para una estética más limpia.
    *   Se optimizó el indicador "Desliza para explorar" (blanco, bold, sombra) con un efecto de desvanecimiento acelerado al iniciar el scroll.
*   **Versión Móvil Estricta**: Se eliminó el botón de audio en móviles para mantener el video 100% silenciado y libre de distracciones visuales.
*   **Lógica de Expansión**: Se implementó una lógica de "scroll-jacking" controlada para desktop que permite la expansión fluida del video modal antes de liberar el scroll de la página.

### B. Gestión de Slugs y Assets
*   **Migración de Assets**: El video y la imagen principal del Hero fueron migrados de Cloudinary a Supabase Storage (`product-images/hero/`), eliminando dependencias externas.
*   **Slugs Únicos**: Se actualizó la lógica en `ProductModal.tsx` para generar slugs con sufijos aleatorios, evitando errores de duplicación en la base de datos.

## 4. Variables de Entorno Necesarias (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
# Solo para desarrollo/migración (NO subir a GitHub)
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

## 5. Pendientes y Próximos Pasos 📋

1.  **Monitoreo de Performance**: Vigilar la carga del video en dispositivos de gama baja; considerar compresión adicional del asset si es necesario.
2.  **SEO Final**: Revisar meta-tags dinámicos para las páginas de productos individuales.

---
*Última actualización: 11 de Abril, 2026 (Finalización de Hero y Assets)*
