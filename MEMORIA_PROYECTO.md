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

### A. Refactorización del Hero (`components/ui/ScrollExpandHero.tsx`)
Se realizó una re-escritura total del componente Hero para solucionar problemas de rendimiento y "scroll-jacking":
*   **Eliminación de Scroll-jacking:** Se quitó el bloqueo manual de eventos de rueda/scroll. Ahora usa el scroll nativo del navegador.
*   **Framer Motion Integration:** Se implementó `useScroll` y `useSpring` para una expansión suave basada en la posición física del scroll.
*   **Fix de Hidratación:** Se implementó un estado `isMounted` y `isMobile` vía `useEffect` para evitar errores de renderizado en servidor (SSR) al intentar acceder a `window.innerWidth`.
*   **Video Nativo:** El video del Hero ahora carga directamente desde Supabase Storage (`hero/hero-video.mp4`), garantizando latencia mínima y control total del asset.

### B. Gestión de Slugs (`components/admin/ProductModal.tsx`)
Se actualizó la lógica de creación de productos para evitar colisiones de base de datos añadiendo un sufijo aleatorio a los slugs generados automáticamente.

### C. Segurança e Administración
*   **Configuración de Password:** El panel de administración (`app/admin/settings/page.tsx`) está conectado a Supabase Auth para actualización de contraseñas.
*   **Middleware:** Rutas protegidas para `/admin/*`.

## 4. Variables de Entorno Necesarias (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
# Solo para desarrollo/migración (NO subir a GitHub)
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

## 5. Pendientes y Próximos Pasos 📋

1.  **Verificación de Despliegue:** Confirmar que el fix de hidratación subido solucione la pantalla blanca en Vercel.
2.  **Optimización de Imágenes:** Aunque están en Supabase, se recomienda usar el componente `next/image` correctamente (ya implementado en la mayoría de las vistas).
3.  **Analytics:** La tabla de analíticas está creada pero falta poblar datos reales si se desea un dashboard avanzado.

---
*Última actualización: 11 de Abril, 2026*
