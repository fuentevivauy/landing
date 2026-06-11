const MAX_IMAGE_SIZE = 12 * 1024 * 1024;

function corsHeaders(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = (env.ALLOWED_ORIGINS || '').split(',').map((value) => value.trim());
    return {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0] || '',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Filename, X-Object-Key',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Max-Age': '3600',
        'Vary': 'Origin',
    };
}

function json(request, env, body, status = 200) {
    return Response.json(body, { status, headers: corsHeaders(request, env) });
}

function sanitizeFilename(filename) {
    const extension = filename.includes('.') ? `.${filename.split('.').pop()}` : '';
    const stem = extension ? filename.slice(0, -extension.length) : filename;
    const safeStem = stem
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'asset';
    return `${safeStem}${extension.toLowerCase()}`;
}

async function isSupabaseUser(request, env) {
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) return false;

    const response = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
        headers: {
            Authorization: authorization,
            apikey: env.SUPABASE_ANON_KEY,
        },
    });
    return response.ok;
}

async function putAsset(env, objectKey, body, contentType) {
    await env.ASSETS.put(objectKey, body, {
        httpMetadata: {
            contentType,
            cacheControl: 'public, max-age=31536000, immutable',
        },
    });
    return `${env.PUBLIC_ASSET_URL.replace(/\/+$/, '')}/${objectKey}`;
}

async function handleAdminUpload(request, env) {
    if (!(await isSupabaseUser(request, env))) return json(request, env, { error: 'No autorizado.' }, 401);

    const contentType = request.headers.get('Content-Type') || '';
    const filename = request.headers.get('X-Filename') || '';
    if (!contentType.startsWith('image/') || !filename) {
        return json(request, env, { error: 'Solo se permiten imágenes.' }, 400);
    }

    const body = await request.arrayBuffer();
    if (body.byteLength === 0 || body.byteLength > MAX_IMAGE_SIZE) {
        return json(request, env, { error: 'La imagen debe pesar entre 1 byte y 12 MB.' }, 400);
    }

    const objectKey = `products/${crypto.randomUUID()}-${sanitizeFilename(filename)}`;
    return json(request, env, { publicUrl: await putAsset(env, objectKey, body, contentType) });
}

function isMigrationAuthorized(request, env) {
    return request.headers.get('Authorization') === `Bearer ${env.MIGRATION_TOKEN}`;
}

async function handleRemoteMigration(request, env) {
    if (!isMigrationAuthorized(request, env)) return json(request, env, { error: 'No autorizado.' }, 401);
    const { sourceUrl, objectKey } = await request.json();
    const source = await fetch(sourceUrl);
    if (!source.ok) return json(request, env, { error: `Source returned HTTP ${source.status}` }, 400);
    const publicUrl = await putAsset(
        env,
        objectKey,
        source.body,
        source.headers.get('Content-Type') || 'application/octet-stream'
    );
    return json(request, env, { publicUrl });
}

async function handleLocalMigration(request, env) {
    if (!isMigrationAuthorized(request, env)) return json(request, env, { error: 'No autorizado.' }, 401);
    const objectKey = request.headers.get('X-Object-Key');
    if (!objectKey) return json(request, env, { error: 'Falta X-Object-Key.' }, 400);
    const publicUrl = await putAsset(
        env,
        objectKey,
        request.body,
        request.headers.get('Content-Type') || 'application/octet-stream'
    );
    return json(request, env, { publicUrl });
}

const worker = {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders(request, env) });
        const path = new URL(request.url).pathname;
        if (request.method === 'POST' && path === '/upload') return handleAdminUpload(request, env);
        if (request.method === 'POST' && path === '/migrate') return handleRemoteMigration(request, env);
        if (request.method === 'POST' && path === '/migrate-local') return handleLocalMigration(request, env);
        return json(request, env, { error: 'No encontrado.' }, 404);
    },
};

export default worker;
