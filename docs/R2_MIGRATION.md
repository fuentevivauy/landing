# Migración de assets a Cloudflare R2

La web mantiene Vercel para Next.js y Supabase Free para base de datos y autenticación. Todas las imágenes y videos propios se sirven desde Cloudflare R2.

El bucket también está conectado a `assets.fuenteviva.uy`. Actualmente la aplicación utiliza la URL pública `r2.dev` porque el dominio propio conservó temporalmente una respuesta `404` en caché durante su activación.

## Configuración requerida

Crear el bucket público `fuente-viva-assets`, habilitar su dominio público y desplegar el Worker:

```powershell
npx.cmd wrangler r2 bucket create fuente-viva-assets
npx.cmd wrangler r2 bucket dev-url enable fuente-viva-assets
npx.cmd wrangler deploy --config cloudflare/upload-worker/wrangler.jsonc
```

Configurar en el Worker `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PUBLIC_ASSET_URL`, `ALLOWED_ORIGINS` y `MIGRATION_TOKEN`.
La aplicación incluye como valores predeterminados las URLs productivas de R2 y del Worker. Estas variables son opcionales y permiten reemplazarlas por otros endpoints:

```env
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-ca2ecc1cb4254361b44aa79f5e034cd2.r2.dev
NEXT_PUBLIC_R2_UPLOAD_URL=https://assets-upload.fuenteviva.uy/upload
R2_MIGRATION_WORKER_URL=https://assets-upload.fuenteviva.uy
R2_MIGRATION_TOKEN=
```

## Migración

La simulación verifica todos los archivos sin modificar producción:

```powershell
npm.cmd run migrate:assets:r2
```

La ejecución real crea un respaldo local ignorado por Git, sube todos los objetos, confirma que sean públicos y recién entonces actualiza las fichas:

```powershell
npm.cmd run migrate:assets:r2 -- --apply
npm.cmd run verify:assets:r2
```

No eliminar los archivos de Supabase Storage hasta verificar el despliegue productivo.
