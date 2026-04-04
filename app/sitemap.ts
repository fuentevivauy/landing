import { MetadataRoute } from 'next';


import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://fuenteviva.uy';

    // Páginas estáticas
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
    ];

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: dbProducts } = await supabase
            .from('products')
            .select('slug')
            .eq('in_stock', true);
            
        if (dbProducts) {
            const productPages = dbProducts.map((product) => ({
                url: `${baseUrl}?product=${product.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            }));
            
            return [...staticPages, ...productPages];
        }
    } catch (e) {
        console.error("Error generating sitemap", e);
    }

    return staticPages;
}
