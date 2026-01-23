import { MetadataRoute } from 'next';
import { products } from '@/lib/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://fuenteviva.uy';

    // Páginas estáticas (solo la home en esta SPA, pero incluimos las secciones principales)
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
    ];

    // Productos dinámicos (aunque se abren en modal, generamos URLs por si acaso se implementan subpáginas luego)
    const productPages = products.map((product) => ({
        url: `${baseUrl}?product=${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...productPages];
}
