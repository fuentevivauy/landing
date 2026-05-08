import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const BASE_URL = 'https://fuenteviva.uy';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ];

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseKey) return staticPages;

        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data } = await supabase
            .from('products')
            .select('slug, updated_at')
            .order('display_order', { ascending: true });

        if (!data) return staticPages;

        const productPages: MetadataRoute.Sitemap = data.map((p) => ({
            url: `${BASE_URL}/producto/${p.slug}`,
            lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        return [...staticPages, ...productPages];
    } catch {
        return staticPages;
    }
}
