import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { DBProduct } from '@/lib/types/admin';
import { Product, ProductCategory } from '@/lib/types/product';
import { ProductPageClient } from './ProductPageClient';

const BASE_URL = 'https://fuenteviva.uy';

async function fetchProduct(slug: string): Promise<Product | null> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

    if (error || !data) return null;

    const dbProd = data as DBProduct;
    return {
        id: dbProd.id,
        slug: dbProd.slug,
        name: dbProd.name,
        category: dbProd.category as ProductCategory,
        price: dbProd.price,
        priceFormatted: dbProd.price
            ? `$${dbProd.price.toLocaleString('es-UY')}`
            : dbProd.price_formatted,
        description: dbProd.description,
        benefits: dbProd.benefits || [],
        specs: dbProd.specs || {},
        images: {
            thumbnail: dbProd.image_thumbnail || '/images/hero-fountain-new.jpg',
            carousel: dbProd.image_carousel || dbProd.image_thumbnail || '/images/hero-fountain-new.jpg',
            gallery:
                dbProd.image_gallery?.length > 0
                    ? dbProd.image_gallery
                    : [dbProd.image_thumbnail || '/images/hero-fountain-new.jpg'],
        },
        inStock: dbProd.in_stock,
        featured: dbProd.featured,
        display_order: dbProd.display_order,
        videoUrl: dbProd.video_url ?? undefined,
        showDetailImage: dbProd.show_detail_image ?? true,
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = await fetchProduct(slug);

    if (!product) {
        return {
            title: 'Producto no encontrado | Fuente Viva',
            robots: { index: false, follow: false },
        };
    }

    const title = `${product.name} | Fuente Viva`;
    const description = product.description
        ? product.description.slice(0, 155)
        : `${product.name} — ${product.category} de hormigón premium artesanal en Uruguay. Envíos a Montevideo, Canelones y Maldonado.`;
    const url = `${BASE_URL}/producto/${product.slug}`;
    const image = product.images.carousel || product.images.thumbnail;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Fuente Viva',
            type: 'website',
            locale: 'es_UY',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 1200,
                    alt: product.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await fetchProduct(slug);

    if (!product) notFound();

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${BASE_URL}/producto/${product.slug}#product`,
        name: product.name,
        description: product.description,
        image: [product.images.carousel, ...product.images.gallery].filter(Boolean),
        category: product.category,
        brand: {
            '@type': 'Brand',
            name: 'Fuente Viva',
        },
        sku: product.slug,
        ...(product.price && {
            offers: {
                '@type': 'Offer',
                url: `${BASE_URL}/producto/${product.slug}`,
                priceCurrency: 'UYU',
                price: product.price,
                availability: product.inStock
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/PreOrder',
                seller: {
                    '@type': 'Organization',
                    name: 'Fuente Viva',
                },
            },
        }),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <ProductPageClient product={product} />
        </>
    );
}
