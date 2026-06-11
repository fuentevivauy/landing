import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

for (const name of ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'NEXT_PUBLIC_R2_PUBLIC_URL']) {
    if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
}

const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/+$/, '');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: products, error } = await supabase
    .from('products')
    .select('name,image_thumbnail,image_carousel,image_gallery');
if (error) throw error;

const urls = new Set([
    `${publicUrl}/hero/hero-video.mp4`,
    `${publicUrl}/hero/hero-fountain-new.jpg`,
    `${publicUrl}/static/final-cta-mobile-birds.jpg`,
    `${publicUrl}/static/final-cta-desktop-birds.png`,
]);
const legacyReferences = [];

for (const product of products) {
    const productUrls = [product.image_thumbnail, product.image_carousel, ...(product.image_gallery || [])].filter(Boolean);
    for (const url of productUrls) {
        urls.add(url);
        if (!url.startsWith(publicUrl)) {
            legacyReferences.push(`${product.name}: ${url}`);
        }
    }
}

if (legacyReferences.length > 0) {
    throw new Error(`Found ${legacyReferences.length} product URLs outside R2:\n${legacyReferences.join('\n')}`);
}

const failures = [];
for (const url of urls) {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) failures.push(`${response.status} ${url}`);
}
if (failures.length > 0) {
    throw new Error(`Found ${failures.length} unreachable R2 assets:\n${failures.join('\n')}`);
}

console.log(`R2 migration verified: ${products.length} products and ${urls.size} public asset URLs.`);
