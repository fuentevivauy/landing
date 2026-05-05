// Categorías de productos disponibles (actualizadas)
export type ProductCategory = 'Fuentes' | 'Bebederos' | 'Estatuas' | 'Muebles y Accesorios';

// Especificaciones técnicas del producto (expandidas)
export interface ProductSpecs {
    weight?: string;
    height?: string;
    dimensions?: string;
    diameter?: string;
    width?: string;
    base?: string;
    levels?: number;
    motor?: string;
    motor_required?: boolean;
    material?: string;
    maxLoad?: string;
    color?: string;
    color_options?: string[];
    extras?: string;
    installation?: string;
    installation_complexity?: string;
    table_dim?: string;
    bench_dim?: string;
    weight_per_unit?: string;
    total_units?: number;
    diameter_main?: string;
}

// Estructura de imágenes del producto
export interface ProductImages {
    thumbnail: string;
    carousel: string;
    gallery: string[];
}

// Estructura principal del producto
export interface Product {
    id: string;
    slug: string;
    name: string;
    category: ProductCategory;
    price: number | null;
    priceFormatted: string;
    description: string;
    benefits: string[];
    specs: ProductSpecs;
    images: ProductImages;
    inStock: boolean;
    display_order?: number;
    featured?: boolean;
    maintenance?: string;
    videoUrl?: string;
}

// Constantes de categorías
export const PRODUCT_CATEGORIES: ProductCategory[] = [
    'Fuentes',
    'Bebederos',
    'Estatuas',
    'Muebles y Accesorios',
];

// Información del negocio
export interface BusinessInfo {
    brand: string;
    mission: string;
    contact: {
        whatsapp: string;
        pickup_location: string;
    };
    policy: {
        shipping: string;
        installation: string;
        out_of_stock: string;
    };
}

export const BUSINESS_INFO: BusinessInfo = {
    brand: 'Fuente Viva',
    mission: 'Un rincón de calma donde la naturaleza se detiene a beber.',
    contact: {
        whatsapp: '094713998',
        pickup_location: 'El Pinar, Ciudad de la Costa (Solo retiro, no es fábrica)',
    },
    policy: {
        shipping: 'Envíos a Zona Metropolitana e Interior con costo adicional.',
        installation: 'Servicio de instalación profesional disponible con cotización previa según zona.',
        out_of_stock: 'Fabricación bajo pedido con seña previa. Demora: 10 días hábiles (colores estándar) o 15 días (colores especiales).',
    },
};
