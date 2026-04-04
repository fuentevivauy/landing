import * as fs from 'fs';
import { products } from './lib/data/products';

let sql = '-- ==========================================\n-- MIGRACIÓN DE PRODUCTOS A SUPABASE\n-- ==========================================\n\n';

for (const p of products) {
    const slug = p.slug.replace(/'/g, "''");
    const name = p.name.replace(/'/g, "''");
    const description = p.description ? p.description.replace(/'/g, "''") : '';
    const price = p.price || 0;
    const price_formatted = (p.priceFormatted || 'Consultar').replace(/'/g, "''");
    const category = (p.category || 'Fuentes').replace(/'/g, "''");
    const in_stock = p.inStock ? 'true' : 'false';
    const featured = p.featured ? 'true' : 'false';
    
    // Manejo de arrays asegurando el cast
    const benefits = p.benefits && p.benefits.length > 0
        ? `ARRAY[${p.benefits.map(b => `'${b.replace(/'/g, "''")}'`).join(', ')}]::TEXT[]` 
        : "ARRAY[]::TEXT[]";
        
    const image_gallery = p.images?.gallery && p.images.gallery.length > 0
        ? `ARRAY[${p.images.gallery.map(img => `'${img.replace(/'/g, "''")}'`).join(', ')}]::TEXT[]` 
        : "ARRAY[]::TEXT[]";
    
    const specs = p.specs ? `'${JSON.stringify(p.specs).replace(/'/g, "''")}'::jsonb` : "'{}'::jsonb";
    
    const image_thumbnail = p.images?.thumbnail ? `'${p.images.thumbnail.replace(/'/g, "''")}'` : "''";
    const whatsapp = `'Hola! Me interesa este producto: ${name}'`;

    sql += `INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('${slug}', '${name}', '${description}', ${price}, '${price_formatted}', '${category}', ${in_stock}, ${featured}, ${benefits}, ${specs}, ${image_thumbnail}, ${image_gallery}, ${whatsapp})
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    price_formatted = EXCLUDED.price_formatted,
    category = EXCLUDED.category,
    in_stock = EXCLUDED.in_stock,
    featured = EXCLUDED.featured,
    benefits = EXCLUDED.benefits,
    specs = EXCLUDED.specs,
    image_thumbnail = EXCLUDED.image_thumbnail,
    image_gallery = EXCLUDED.image_gallery;\n\n`;
}

fs.writeFileSync('seed_products.sql', sql);
console.log('Se generó el archivo seed_products.sql con todos los productos!');
