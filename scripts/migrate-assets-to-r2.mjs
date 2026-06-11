import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

dotenv.config({ path: '.env.local' });

const apply = process.argv.includes('--apply');
const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_R2_PUBLIC_URL',
    ...(apply ? ['R2_MIGRATION_WORKER_URL', 'R2_MIGRATION_TOKEN'] : []),
];

for (const name of required) {
    if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/+$/, '');
const migrationWorkerUrl = process.env.R2_MIGRATION_WORKER_URL?.replace(/\/+$/, '');
const staticAssets = [
    {
        objectKey: 'hero/hero-fountain-new.jpg',
        sourcePath: 'public/images/hero-fountain-new.jpg',
        contentType: 'image/jpeg',
    },
    {
        objectKey: 'static/final-cta-mobile-birds.jpg',
        sourceUrl: 'https://res.cloudinary.com/doyde4ron/image/upload/v1770408575/final_cta_mobile_birds_azmtti.jpg',
    },
    {
        objectKey: 'static/final-cta-desktop-birds.png',
        sourceUrl: 'https://res.cloudinary.com/doyde4ron/image/upload/v1770408607/final_cta_desktop_birds_uh8qyg.png',
    },
];

function objectKeyFromUrl(url) {
    const parsed = new URL(url);
    if (parsed.hostname.includes('supabase.co')) {
        const marker = '/product-images/';
        const index = parsed.pathname.indexOf(marker);
        if (index >= 0) return parsed.pathname.slice(index + marker.length);
    }
    return `legacy/${crypto.randomUUID()}-${parsed.pathname.split('/').pop() || 'asset'}`;
}

async function verifyPublicUrl(url) {
    for (let attempt = 1; attempt <= 5; attempt += 1) {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) return;
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
    throw new Error(`Uploaded asset is not publicly reachable: ${url}`);
}

async function migrateRemoteToWorker(sourceUrl, objectKey) {
    const response = await fetch(`${migrationWorkerUrl}/migrate`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.R2_MIGRATION_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sourceUrl, objectKey }),
    });
    if (!response.ok) throw new Error(`Worker could not migrate ${sourceUrl}: ${await response.text()}`);
}

async function migrateLocalToWorker(sourcePath, objectKey, contentType) {
    const response = await fetch(`${migrationWorkerUrl}/migrate-local`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.R2_MIGRATION_TOKEN}`,
            'Content-Type': contentType,
            'X-Object-Key': objectKey,
        },
        body: await readFile(sourcePath),
    });
    if (!response.ok) throw new Error(`Worker could not migrate ${sourcePath}: ${await response.text()}`);
}

async function migrateUrl(url, urlMap) {
    if (!url || url.startsWith(publicUrl)) return url;
    if (urlMap.has(url)) return urlMap.get(url);

    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) throw new Error(`Could not download ${url}: HTTP ${response.status}`);

    const objectKey = objectKeyFromUrl(url);
    if (apply) {
        await migrateRemoteToWorker(url, objectKey);
    }

    const migratedUrl = `${publicUrl}/${objectKey}`;
    if (apply) await verifyPublicUrl(migratedUrl);
    urlMap.set(url, migratedUrl);
    console.log(`${apply ? 'MIGRATE' : 'DRY RUN'} ${url} -> ${migratedUrl}`);
    return migratedUrl;
}

async function migrateStaticAsset({ objectKey, sourceUrl, sourcePath, contentType }) {
    const response = sourceUrl ? await fetch(sourceUrl, { method: 'HEAD' }) : null;
    if (response && !response.ok) throw new Error(`Could not download ${sourceUrl}: HTTP ${response.status}`);

    if (apply) {
        if (sourcePath) {
            await migrateLocalToWorker(sourcePath, objectKey, contentType);
        } else {
            await migrateRemoteToWorker(sourceUrl, objectKey);
        }
    }
    if (apply) await verifyPublicUrl(`${publicUrl}/${objectKey}`);
    console.log(`${apply ? 'MIGRATE' : 'DRY RUN'} ${sourceUrl || sourcePath} -> ${publicUrl}/${objectKey}`);
}

async function migrateStorageFolder(folder, urlMap) {
    const { data: objects, error: listError } = await supabase.storage
        .from('product-images')
        .list(folder, { limit: 1000 });
    if (listError) throw listError;

    for (const object of objects) {
        if (!object.id) continue;
        const objectKey = `${folder}/${object.name}`;
        const { data } = supabase.storage.from('product-images').getPublicUrl(objectKey);
        await migrateUrl(data.publicUrl, urlMap);
    }

    return objects.filter((object) => object.id).length;
}

const { data: products, error } = await supabase
    .from('products')
    .select('id,name,image_thumbnail,image_carousel,image_gallery');
if (error) throw error;

const urlMap = new Map();
let storageObjectCount = 0;
if (apply) {
    await mkdir('scripts/.migration-backups', { recursive: true });
    await writeFile(
        `scripts/.migration-backups/products-before-r2-${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
        JSON.stringify(products, null, 2)
    );
}
for (const folder of ['hero', 'products']) {
    storageObjectCount += await migrateStorageFolder(folder, urlMap);
}
for (const asset of staticAssets) {
    await migrateStaticAsset(asset);
}
for (const product of products) {
    const migrated = {
        image_thumbnail: await migrateUrl(product.image_thumbnail, urlMap),
        image_carousel: await migrateUrl(product.image_carousel, urlMap),
        image_gallery: await Promise.all((product.image_gallery || []).map((url) => migrateUrl(url, urlMap))),
    };

    if (apply) {
        const { error: updateError } = await supabase.from('products').update(migrated).eq('id', product.id);
        if (updateError) throw updateError;
    }
}

if (apply) {
    await writeFile('scripts/.migration-backups/url-map.json', JSON.stringify(Object.fromEntries(urlMap), null, 2));
}
console.log(`${apply ? 'Migration completed' : 'Dry run completed'}: ${products.length} products, ${storageObjectCount} Supabase Storage objects, ${staticAssets.length} additional static assets.`);
