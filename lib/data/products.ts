import { Product, ProductCategory } from '@/lib/types/product';

// Cloudinary configuration
const CLOUDINARY_CLOUD = 'dj1wscyom';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload`;

// Helper para generar URLs de Cloudinary con optimización automática
const getCloudinaryImage = (publicId: string) => ({
    thumbnail: `${CLOUDINARY_BASE}/w_400,f_auto,q_auto/${publicId}`,
    gallery: [`${CLOUDINARY_BASE}/w_1200,f_auto,q_auto/${publicId}`],
});

// Mapeo de productos a public IDs de Cloudinary (con sufijos únicos)
const IMAGE_MAP: Record<string, string> = {
    // Fuentes
    'fuente-barroca': 'Fuente_barroca_s9wpvk',
    'fuente-plaqueta-buda-xl': 'Fuente_plaqueta_buda_extra_grande_gittph',
    'fuente-buda-parado-loto-xl': 'Fuente_Buda_parado_con_plato_Loto_extra_grande_a8qsbd',
    'fuente-loto-grande': 'Fuente_Loto_Grande_cobnlm',
    'fuente-fiona': 'Fuente_fiona_oumdim',
    'fuente-kiara-grande': 'Fuente_Kiara_Grande_sovsan',
    'fuente-fiona-pareja': 'Fuente_Fiona_con_pareja_otdctk',
    'fuente-buda-flor-loto': 'Fuente_buda_flor_de_loto_grande_pksg8n',
    'fuente-loto-mediana': 'Fuente_Loto_Mediana_l40cvm',
    'fuente-nino-perrito': 'Fuente_Nino_con_Perrito_con_base_cuadrada_xz89x5',
    'fuente-nino-flor-loto': 'Fuente_Nino_flor_de_Loto_zvo7x7',
    'fuente-baja-paloma': 'Fuente_baja_paloma_fuyf3d',
    'fuente-marbella': 'Fuente_marbella_con_puntero_de_pina_glsisy',
    'fuente-placa-buda-chica': 'Fuente_Placa_Buda_chica_sfe9rs',
    'fuente-kiara-chica': 'Fuente_Kiara_Chica_dc5wln',
    'fuente-esfera-chica': 'Fuente_esfera_Chica_vw7dg4',
    'fuente-mini-buda-tibetano': 'Fuente_Mini_con_Buda_Tibetano_chico_gcy3zo',
    // Bebederos
    'bebedero-aves-xl': 'Bebedero_de_aves_extra_grande_nhmrhf',
    'bebedero-paloma': 'Bebedero_paloma_lx2whj',
    'bebedero-aves-labrado': 'bebedero_aves_labrado_nr4g2a',
    'bebedero-aves-64': 'Bebedero_aves_wzjtd7',
    'bebedero-aves-59': 'Bebedero_aves_wzjtd7',
    // Estatuas
    'buda-parado-grande': 'Buda_Parado_Grande_utyzha',
    'estatua-camponesa': 'Estatua_Camponesa_cnvxar',
    'pareja-perro-fu': 'Pareja_perro_Fu_Medianos_mcypvi',
    'buda-tibetano-grande': 'Estatua_Buda_Tibetano_Grande_rs0ur2',
    'estatua-diosa-hindu': 'Estatua_Diosa_Hindu_oeps1k',
    'buda-nino-parado': 'Estatua_Buda_Nino_parado_Grande_njg27w',
    'pavo-real-chico': 'Pavo_Real_chico_syoqum',
    'buda-tibetano-medio': 'BUTA_TIBETANO_MEDIO_yi1jss',
    'enano-jardin-carro': 'Enano_de_Jardin_con_carro_ejwtvp',
    'buda-serenidad': 'BUDA_DE_LA_SERENIDAD_tq8wlo',
    'buho-jardin': 'Buho_de_Jardin_sexafm',
    'buda-porta-vela': 'Estatua_buda_porta_vela_rkq6jt',
    'tortuga-porta-maceta': 'Tortuga_porta_maceta_cdjlrt',
    // Muebles y Accesorios
    'juego-mesa-bancos-romano': 'Juego_completo_Mesa_y_bancos_Romano_cxtkaq',
    'banco-madera-jardin-grande': 'Banco_con_asiento_y_Respaldo_en_madera_de_jardin_grande_fgaq5q',
    'farol-chino-grande': 'Farol_chino_grande_zppnhm',
    'farol-chino-chico': 'Farol_chino_chico_stlwug',
};

// Helper que usa el mapeo para obtener imágenes
export const getImages = (slug: string) => {
    const publicId = IMAGE_MAP[slug];
    if (publicId) {
        return getCloudinaryImage(publicId);
    }
    // Fallback para productos sin imagen mapeada
    return {
        thumbnail: '/images/placeholder.jpg',
        gallery: ['/images/placeholder.jpg'],
    };
};

// Helper para formatear precio
const formatPrice = (price: number | null): string => {
    if (price === null) return 'Consultar';
    return `$${price.toLocaleString('es-UY')}`;
};

/**
 * Catálogo completo de productos Fuente Viva
 * Actualizado con datos completos del cliente
 */
export const products: Product[] = [
    // ============================================
    // FUENTES
    // ============================================
    {
        id: 'f-01',
        slug: 'fuente-barroca',
        name: 'Fuente Barroca',
        category: 'Fuentes',
        price: 23990,
        priceFormatted: '$23.990',
        description: '🏰 La majestuosidad hecha fuente. Con su diseño barroco de tres niveles y un sonido de agua envolvente, esta pieza transformará tu jardín en un palacio real. Impresionante y eterna. 🌊✨',
        benefits: [
            'Motor profesional de 4500 L/h para cascada espectacular',
            'Tres niveles con ornamentación barroca detallada',
            'Ideal para jardines amplios y espacios comerciales',
            'Sonido envolvente que transforma el ambiente',
        ],
        specs: {
            levels: 3,
            height: '1.75 m / 2.15 m',
            diameter_main: '96 cm',
            weight: '200 kg',
            motor: '4500 L/h (50W)',
            material: 'Hormigón vibrado inyectado',
            installation_complexity: 'Media a compleja',
        },
        images: getImages('fuente-barroca'),
        inStock: true,
        featured: true,
        maintenance: 'Limpieza anual de motor; control periódico de nivel de agua.',
    },
    {
        id: 'f-02',
        slug: 'fuente-plaqueta-buda-extra-grande',
        name: 'Fuente Plaqueta Buda Extra Grande',
        category: 'Fuentes',
        price: 23990,
        priceFormatted: '$23.990',
        description: '🧘‍♂️ Paz monumental. Esta imponente fuente de pared con relieve de Buda es el punto focal perfecto para crear un santuario de serenidad en tu hogar. Conecta con lo esencial. 🌿💧',
        benefits: [
            'Diseño de pared imponente',
            'Motor potente de 1600 L/h',
            'Acabado piedra gris envejecida',
            'Punto focal para patios amplios',
        ],
        specs: {
            height: '1.30 m',
            width: '1.00 m',
            weight: '90 kg',
            motor: '1600 L/h (60W)',
            color: 'Piedra gris envejecida',
        },
        images: getImages('fuente-plaqueta-buda-xl'),
        inStock: true,
        featured: true,
    },
    {
        id: 'f-03',
        slug: 'fuente-buda-parado-plato-loto-xl',
        name: 'Fuente Buda Parado con Plato Loto (XL)',
        category: 'Fuentes',
        price: 23990,
        priceFormatted: '$23.990',
        description: '✨ Elevación espiritual. Con 2 metros de altura, esta escultura de Buda sosteniendo un loto es más que una fuente; es una obra de arte que irradia calma y equilibrio a todo tu espacio. 🌸🕊️',
        benefits: [
            'Altura imponente de 2 metros',
            'Combinación única de escultura y fuente',
            'Motor de 1600 L/h incluido',
            'Efecto visual y sonoro extraordinario',
        ],
        specs: {
            height: '2.00 m',
            diameter: '85 cm',
            weight: '100 kg',
            motor: '1600 L/h (70W)',
            installation: 'Media-Avanzada',
        },
        images: getImages('fuente-buda-parado-loto-xl'),
        inStock: true,
        featured: true,
    },
    {
        id: 'f-04',
        slug: 'fuente-loto-grande',
        name: 'Fuente Loto Grande',
        category: 'Fuentes',
        price: 23990,
        priceFormatted: '$23.990',
        description: '🌺 Elegancia que fluye. El diseño orgánico de la flor de loto se une al movimiento del agua para crear un ambiente fresco y vital. Siente la naturaleza en cada gota. 💧🍃',
        benefits: [
            'Diseño orgánico de flor de loto',
            'Regulador de presión incluido',
            'Motor eficiente de bajo consumo',
            'Perfecto equilibrio entre tamaño e impacto',
        ],
        specs: {
            height: '1.25 m',
            diameter: '85 cm',
            weight: '90 kg',
            motor: '1500 L/h (25W)',
            extras: 'Regulador de presión',
        },
        images: getImages('fuente-loto-grande'),
        inStock: true,
    },
    {
        id: 'f-05',
        slug: 'fuente-fiona-3-niveles',
        name: 'Fuente Fiona - 3 Niveles',
        category: 'Fuentes',
        price: 16990,
        priceFormatted: '$16.990',
        description: '🎶 Melodía visual. Tres caídas de agua que componen una canción relajante para tus tardes al aire libre. Un clásico atemporal que nunca deja de enamorar. ⛲✨',
        benefits: [
            'Sonido relajante de cascada',
            'Punto focal elegante para cualquier jardín',
            'Atrae aves y mariposas',
            'Tres niveles para máximo efecto visual',
        ],
        specs: {
            levels: 3,
            height: '1.50 m',
            diameter: '75 cm',
            weight: '100 kg',
            motor: '1550 L/h (25W)',
        },
        images: getImages('fuente-fiona'),
        inStock: true,
        featured: true,
    },
    {
        id: 'f-06',
        slug: 'fuente-kiara-grande',
        name: 'Fuente Kiara Grande',
        category: 'Fuentes',
        price: 16990,
        priceFormatted: '$16.990',
        description: '🌊 Suavidad mediterránea. Líneas curvas y flujo constante para quienes aman lo sutil. Trae la brisa y la frescura del mar a tu propio jardín. 🐚🏡',
        benefits: [
            'Diseño de líneas fluidas',
            'Regulador de presión para personalizar el flujo',
            'Motor silencioso de bajo consumo',
            'Resistente a la intemperie',
        ],
        specs: {
            height: '1.55 m',
            diameter: '80 cm',
            weight: '115 kg',
            motor: '550 L/h (10W)',
            extras: 'Regulador de presión',
        },
        images: getImages('fuente-kiara-grande'),
        inStock: true,
    },
    {
        id: 'f-07',
        slug: 'fuente-fiona-con-pareja',
        name: 'Fuente Fiona con Pareja',
        category: 'Fuentes',
        price: 18990,
        priceFormatted: '$18.990',
        description: '💕 Amor y naturaleza. La clásica cascada acompañada de una escena romántica. Un detalle encantador que cuenta una historia en tu jardín. 🌹💑',
        benefits: [
            'Diseño único con figuras decorativas',
            'Dos niveles de cascada',
            'Motor potente de 1500 L/h',
            'Pieza de conversación garantizada',
        ],
        specs: {
            levels: 2,
            height: '1.60 m',
            diameter: '75 cm',
            weight: '100 kg',
            motor: '1500 L/h (25W)',
        },
        images: getImages('fuente-fiona-pareja'),
        inStock: true,
    },
    {
        id: 'f-08',
        slug: 'fuente-buda-flor-loto-grande',
        name: 'Fuente Buda Flor de Loto Grande',
        category: 'Fuentes',
        price: 12990,
        priceFormatted: '$12.990',
        description: '🧘‍♀️ Meditación en tu patio. La unión perfecta entre la figura de Buda y la pureza del loto. Un rincón para respirar y reconectar contigo mismo. 🕉️✨',
        benefits: [
            'Combinación de escultura y fuente',
            'Tamaño ideal para patios medianos',
            'Motor de bajo consumo',
            'Acabado cemento natural',
        ],
        specs: {
            height: '75 cm',
            diameter: '77 cm',
            weight: '40 kg',
            motor: '550 L/h (10W)',
            color: 'Cemento',
        },
        images: getImages('fuente-buda-flor-loto'),
        inStock: true,
    },
    {
        id: 'f-09',
        slug: 'fuente-loto-mediana',
        name: 'Fuente Loto Mediana',
        category: 'Fuentes',
        price: 12590,
        priceFormatted: '$12.590',
        description: '🌸 Belleza compacta. Todo el encanto de la flor de loto en un tamaño versátil. Ideal para patios íntimos donde cada detalle cuenta. ✨🍃',
        benefits: [
            'Tamaño versátil para cualquier espacio',
            'Diseño orgánico de flor de loto',
            'Fácil instalación',
            'Motor silencioso incluido',
        ],
        specs: {
            height: '90 cm',
            diameter: '52 cm',
            weight: '50 kg',
            motor: '550 L/h (10W)',
        },
        images: getImages('fuente-loto-mediana'),
        inStock: true,
    },
    {
        id: 'f-10',
        slug: 'fuente-nino-perrito',
        name: 'Fuente Niño con Perrito',
        category: 'Fuentes',
        price: 11990,
        priceFormatted: '$11.990',
        description: '👦🐶 Ternura en tu jardín. Una escena que evoca la inocencia y la alegría de la infancia. Perfecta para dar una bienvenida cálida y familiar. ❤️🏡',
        benefits: [
            'Diseño entrañable y familiar',
            'Ideal para hogares con niños',
            'Motor de bajo consumo',
            'Altura perfecta para jardines',
        ],
        specs: {
            height: '1.15 m',
            base: '32 cm x 32 cm',
            weight: '50 kg',
            motor: '550 L/h (10W)',
        },
        images: getImages('fuente-nino-perrito'),
        inStock: true,
    },
    {
        id: 'f-11',
        slug: 'fuente-nino-flor-loto',
        name: 'Fuente Niño Flor de Loto',
        category: 'Fuentes',
        price: 9800,
        priceFormatted: '$9.800',
        description: '🌿 Inocencia zen. La dulzura de un niño sosteniendo un loto, combinada con el sonido del agua. Un toque de pureza y arte para tu rincón favorito. 💫',
        benefits: [
            'Diseño delicado y artístico',
            'Tamaño compacto ideal',
            'Acabado gris claro envejecido',
            'Perfecto para rincones zen',
        ],
        specs: {
            height: '65 cm',
            diameter: '50 cm',
            weight: '40 kg',
            motor: '550 L/h (10W)',
            color: 'Gris claro envejecido',
        },
        images: getImages('fuente-nino-flor-loto'),
        inStock: true,
    },
    {
        id: 'f-12',
        slug: 'fuente-baja-paloma-2-niveles',
        name: 'Fuente Baja Paloma - 2 Niveles',
        category: 'Fuentes',
        price: 8990,
        priceFormatted: '$8.990',
        description: '🕊️ Clásico y relajante. Su diseño de dos niveles y la suavidad de sus formas invitan a la calma. Un detalle atemporal que nunca pasa de moda. ⛲',
        benefits: [
            'Diseño clásico atemporal',
            'Sonido relajante de cascada',
            'Ideal para patios y entradas',
            'Dos niveles de agua',
        ],
        specs: {
            levels: 2,
            height: '95 cm',
            diameter: '60 cm',
            weight: '40 kg',
            motor: '550 L/h (10W)',
        },
        images: getImages('fuente-baja-paloma'),
        inStock: true,
    },
    {
        id: 'f-13',
        slug: 'fuente-marbella-puntero-pina',
        name: 'Fuente Marbella con Puntero Piña',
        category: 'Fuentes',
        price: 8990,
        priceFormatted: '$8.990',
        description: '☀️ Aires del sur. Con su elegante remate de piña y estilo mediterráneo, esta fuente trae el sol y la distinción de la costa a tu hogar. 🍍🌊',
        benefits: [
            'Estilo mediterráneo elegante',
            'Detalle de piña ornamental',
            'Altura ideal para jardines',
            'Motor incluido',
        ],
        specs: {
            height: '1.15 m',
            diameter: '60 cm',
            weight: '40 kg',
            motor: '550 L/h (10W)',
        },
        images: getImages('fuente-marbella'),
        inStock: true,
    },
    {
        id: 'f-14',
        slug: 'fuente-placa-buda-chica',
        name: 'Fuente Placa Buda Chica',
        category: 'Fuentes',
        price: 8990,
        priceFormatted: '$8.990',
        description: '🧘 Pequeño gran santuario. Ideal para balcones o muros pequeños, esta fuente ofrece toda la serenidad de Buda en un formato que se adapta a ti. ✨',
        benefits: [
            'Diseño de pared ahorra espacio',
            'Ideal para balcones y terrazas',
            'Flujo suave y constante',
            'Fácil instalación',
        ],
        specs: {
            height: '85 cm',
            width: '54 cm',
            weight: '50 kg',
            motor: '550 L/h (10W)',
        },
        images: getImages('fuente-placa-buda-chica'),
        inStock: true,
    },
    {
        id: 'f-15',
        slug: 'fuente-kiara-chica',
        name: 'Fuente Kiara Chica',
        category: 'Fuentes',
        price: 8990,
        priceFormatted: '$8.990',
        description: '💧 Encanto azul. Su acabado en piedra azul envejecida la hace única. Una joya compacta que aporta color y frescura a cualquier espacio. 💙',
        benefits: [
            'Diseño compacto y elegante',
            'Acabado piedra azul único',
            'Motor silencioso incluido',
            'Perfecta para patios pequeños',
        ],
        specs: {
            height: '96 cm',
            diameter: '55 cm',
            weight: '60 kg',
            motor: '550 L/h (10W)',
            color: 'Piedra azul envejecida',
        },
        images: getImages('fuente-kiara-chica'),
        inStock: true,
    },
    {
        id: 'f-16',
        slug: 'fuente-esfera-chica',
        name: 'Fuente Esfera Chica',
        category: 'Fuentes',
        price: 5590,
        priceFormatted: '$5.590',
        description: '⚪ Minimalismo puro. La simplicidad de la esfera y el agua fluyendo suavemente. Modernidad y calma para jardines actuales. 🌑✨',
        benefits: [
            'Diseño moderno y minimalista',
            'Tamaño compacto versátil',
            'Precio accesible',
            'Fácil de ubicar',
        ],
        specs: {
            height: '50 cm',
            diameter: '60 cm',
            weight: '35 kg',
            motor: '550 L/h (10W)',
        },
        images: getImages('fuente-esfera-chica'),
        inStock: true,
    },
    {
        id: 'f-17',
        slug: 'fuente-mini-buda-tibetano',
        name: 'Fuente Mini con Buda Tibetano Chico',
        category: 'Fuentes',
        price: 4200,
        priceFormatted: '$4.200',
        description: '🎍 Paz en tu mesa. Lleva la armonía del agua al interior de tu hogar. Perfecta para tu escritorio o un rincón de lectura. 🧘‍♂️',
        benefits: [
            'Tamaño ideal para interiores',
            'Perfecta para escritorios y mesas',
            'Buda tibetano decorativo',
            'La más accesible de nuestra colección',
        ],
        specs: {
            height: '54 cm',
            width: '36 cm',
            weight: '15 kg',
            motor: '550 L/h (10W)',
        },
        images: getImages('fuente-mini-buda-tibetano'),
        inStock: true,
    },

    // ============================================
    // BEBEDEROS
    // ============================================
    {
        id: 'b-01',
        slug: 'bebedero-aves-extra-grande',
        name: 'Bebedero de Aves Extra Grande',
        category: 'Bebederos',
        price: 8990,
        priceFormatted: '$8.990',
        description: '🐦 Vida en tu jardín. Nuestro bebedero más grande se convertirá en el punto de encuentro favorito de las aves silvestres. ¡Un espectáculo natural en tu ventana! 🌳🦅',
        benefits: [
            'Tamaño extra grande para múltiples aves',
            'Instalación básica y sencilla',
            'Resistente a la intemperie',
            'No requiere motor',
        ],
        specs: {
            height: '82 cm',
            diameter: '75 cm',
            weight: '45 kg',
            installation: 'Básica',
        },
        images: getImages('bebedero-aves-xl'),
        inStock: true,
    },
    {
        id: 'b-02',
        slug: 'bebedero-paloma',
        name: 'Bebedero Paloma',
        category: 'Bebederos',
        price: 3990,
        priceFormatted: '$3.990',
        description: '🕊️ Arte y naturaleza. Su bella silueta de paloma decora tu jardín incluso cuando no hay aves. Un bebedero que es también una escultura. 🌿✨',
        benefits: [
            'Atrae aves y mariposas',
            'Estabilidad frente al viento',
            'Mantenimiento muy bajo',
            'Diseño artesanal único',
        ],
        specs: {
            height: '60 cm',
            diameter: '50 cm',
            weight: '30 kg',
            motor_required: false,
        },
        images: getImages('bebedero-paloma'),
        inStock: true,
        featured: true,
    },
    {
        id: 'b-03',
        slug: 'bebedero-aves-labrado',
        name: 'Bebedero Aves Labrado',
        category: 'Bebederos',
        price: 2900,
        priceFormatted: '$2.900',
        description: '🎨 Detalle artesanal. Cada pliegue labrado cuenta una historia. Un bebedero que combina funcionalidad con una estética clásica y refinada. 🏺🐦',
        benefits: [
            'Detalles labrados a mano',
            'Precio accesible',
            'Sin mantenimiento de motor',
            'Diseño atemporal',
        ],
        specs: {
            height: '55 cm',
            diameter: '54 cm',
            weight: '25 kg',
        },
        images: getImages('bebedero-aves-labrado'),
        inStock: true,
    },
    {
        id: 'b-04',
        slug: 'bebedero-aves-64cm',
        name: 'Bebedero Aves (64 cm)',
        category: 'Bebederos',
        price: 2900,
        priceFormatted: '$2.900',
        description: '🌿 El tamaño perfecto. Ni muy grande ni muy chico, ideal para cualquier jardín. Invita a la naturaleza a formar parte de tu hogar. 🦋',
        benefits: [
            'Altura ideal para jardines',
            'Fácil de mantener',
            'Atrae vida silvestre',
            'Resistente al clima',
        ],
        specs: {
            height: '64 cm',
            diameter: '48 cm',
            weight: '25 kg',
        },
        images: getImages('bebedero-aves-64'),
        inStock: true,
    },
    {
        id: 'b-05',
        slug: 'bebedero-aves-59cm',
        name: 'Bebedero Aves (59 cm)',
        category: 'Bebederos',
        price: null,
        priceFormatted: 'Consultar',
        description: '✨ Pequeño y acogedor. Perfecto para balcones o rincones reducidos. Porque todos merecemos un toque de vida silvestre. 🐦🌱',
        benefits: [
            'Tamaño compacto',
            'Ideal para balcones',
            'Cero mantenimiento',
            'Diseño discreto',
        ],
        specs: {
            height: '59 cm',
            diameter: '47 cm',
            weight: '25 kg',
        },
        images: getImages('bebedero-aves-59'),
        inStock: true,
    },

    // ============================================
    // ESTATUAS
    // ============================================
    {
        id: 'e-01',
        slug: 'buda-parado-grande',
        name: 'Buda Parado Grande',
        category: 'Estatuas',
        price: 11990,
        priceFormatted: '$11.990',
        description: '🧘‍♂️ Guardián de paz. Con 1.50m de altura, este Buda vigila tu jardín irradiando una calma absoluta. Una presencia que se siente. ✨🌿',
        benefits: [
            'Altura imponente de 1.50m',
            'Símbolo de paz y armonía',
            'Punto focal para jardines',
            'Resistente a la intemperie',
        ],
        specs: {
            height: '1.50 m',
            width: '46 cm',
            weight: '65 kg',
        },
        images: getImages('buda-parado-grande'),
        inStock: true,
        featured: true,
    },
    {
        id: 'e-02',
        slug: 'estatua-camponesa',
        name: 'Estatua Camponesa',
        category: 'Estatuas',
        price: 14990,
        priceFormatted: '$14.990',
        description: '🌾 Tradición y nostalgia. Evoca la belleza de la vida rural con esta figura llena de encanto. Un toque clásico que cuenta historias del campo. 👒🍂',
        benefits: [
            'Diseño tradicional y nostálgico',
            'Tamaño imponente',
            'Detalle artesanal',
            'Pieza única de conversación',
        ],
        specs: {
            height: '1.45 m',
            width: '56 cm',
            weight: '65 kg',
        },
        images: getImages('estatua-camponesa'),
        inStock: true,
    },
    {
        id: 'e-03',
        slug: 'pareja-perro-fu-medianos',
        name: 'Pareja Perro Fu Medianos',
        category: 'Estatuas',
        price: 18990,
        priceFormatted: '$18.990',
        description: '🐉 Guardianes míticos. Según la tradición, estos leones protegen el hogar de energías negativas. Colócalos en la entrada y blinda tu espacio con buena fortuna. ⛩️✨',
        benefits: [
            'Símbolo de protección',
            'Pareja completa incluida',
            'Perfectos para entradas',
            'Tradición oriental milenaria',
        ],
        specs: {
            dimensions: '55 cm x 32 cm x 40 cm',
            weight_per_unit: '35 kg',
            total_units: 2,
        },
        images: getImages('pareja-perro-fu'),
        inStock: true,
    },
    {
        id: 'e-04',
        slug: 'buda-tibetano-grande',
        name: 'Buda Tibetano Grande',
        category: 'Estatuas',
        price: 7990,
        priceFormatted: '$7.990',
        description: '🧘 Sabiduría milenaria. Sentado en meditación profunda, este Buda tibetano invita a la reflexión y al silencio interior. El alma de tu jardín zen. 🎋',
        benefits: [
            'Diseño tibetano tradicional',
            'Tamaño ideal para jardines',
            'Transmite paz y calma',
            'Acabado resistente',
        ],
        specs: {
            dimensions: '84 cm x 54 cm',
            weight: '40 kg',
        },
        images: getImages('buda-tibetano-grande'),
        inStock: true,
    },
    {
        id: 'e-05',
        slug: 'estatua-diosa-hindu',
        name: 'Estatua Diosa Hindú',
        category: 'Estatuas',
        price: 4990,
        priceFormatted: '$4.990',
        description: '✨ Divinidad y belleza. La gracia de esta silueta aporta un aire místico y elegante. Un detalle espiritual que eleva la vibración de tu rincón favorito. 🕉️',
        benefits: [
            'Diseño hindú tradicional',
            'Disponible en dos colores',
            'Tamaño decorativo ideal',
            'Detalle artístico fino',
        ],
        specs: {
            height: '64 cm',
            width: '38 cm',
            weight: '28 kg',
            color_options: ['Azul con dorado', 'Piedra gris envejecida'],
        },
        images: getImages('estatua-diosa-hindu'),
        inStock: true,
    },
    {
        id: 'e-06',
        slug: 'buda-nino-parado-grande',
        name: 'Buda Niño Parado Grande',
        category: 'Estatuas',
        price: 4590,
        priceFormatted: '$4.590',
        description: '🌸 Dulce despertar. La imagen de Buda en su juventud, llena de promesa y bondad. Una figura que inspira ternura y nuevos comienzos. 🧒✨',
        benefits: [
            'Diseño tierno y delicado',
            'Ideal para jardines intimistas',
            'Símbolo de nuevos comienzos',
            'Ligero y fácil de ubicar',
        ],
        specs: {
            dimensions: '90 cm x 18 cm',
            weight: '15 kg',
        },
        images: getImages('buda-nino-parado'),
        inStock: true,
    },
    {
        id: 'e-07',
        slug: 'pavo-real-chico',
        name: 'Pavo Real Chico',
        category: 'Estatuas',
        price: 3590,
        priceFormatted: '$3.590',
        description: '🦚 Elegancia real. Símbolo de inmortalidad y belleza, este pavo real con su acabado en pátina azul es una joya decorativa que no pasará desapercibida. 💙',
        benefits: [
            'Diseño elegante y distintivo',
            'Acabado azul con pátina',
            'Tamaño decorativo perfecto',
            'Símbolo de belleza',
        ],
        specs: {
            dimensions: '47 cm x 39 cm',
            weight: '28 kg',
            color: 'Azul con pátina',
        },
        images: getImages('pavo-real-chico'),
        inStock: true,
    },
    {
        id: 'e-08',
        slug: 'buda-tibetano-medio',
        name: 'Buda Tibetano Medio',
        category: 'Estatuas',
        price: 2990,
        priceFormatted: '$2.990',
        description: '🧘‍♂️ Equilibrio perfecto. Todo el simbolismo del Buda tibetano en un tamaño versátil. Ideal para armonizar espacios interiores o exteriores. 🍂',
        benefits: [
            'Tamaño versátil',
            'Precio accesible',
            'Ideal para interiores',
            'Diseño tradicional',
        ],
        specs: {
            dimensions: '56 cm x 40 cm',
            weight: '16 kg',
        },
        images: getImages('buda-tibetano-medio'),
        inStock: true,
    },
    {
        id: 'e-09',
        slug: 'enano-jardin-carro',
        name: 'Enano de Jardín con Carro',
        category: 'Estatuas',
        price: 2700,
        priceFormatted: '$2.700',
        description: '🍄 Magia en el jardín. Este simpático personaje trae alegría y color a tus plantas. Un guardián divertido para tus rincones verdes. 🌈',
        benefits: [
            'Diseño divertido y único',
            'Ideal para jardines familiares',
            'Variedad de colores disponibles',
            'Perfecto para rincones especiales',
        ],
        specs: {
            dimensions: '44 cm x 48 cm',
            weight: '20 kg',
            color: 'Variedad',
        },
        images: getImages('enano-jardin-carro'),
        inStock: true,
    },
    {
        id: 'e-10',
        slug: 'buda-serenidad',
        name: 'Buda de la Serenidad',
        category: 'Estatuas',
        price: 2590,
        priceFormatted: '$2.590',
        description: '🧘‍♀️ Pausa sagrada. Un Buda compacto diseñado para recordarte la importancia de respirar y detenerte un momento. Paz instantánea. ✨',
        benefits: [
            'Tamaño ideal para altares',
            'Diseño sereno y armonioso',
            'Precio muy accesible',
            'Perfecto para interiores',
        ],
        specs: {
            dimensions: '44 cm x 16 cm',
            weight: '12 kg',
        },
        images: getImages('buda-serenidad'),
        inStock: true,
    },
    {
        id: 'e-11',
        slug: 'buho-jardin',
        name: 'Búho de Jardín',
        category: 'Estatuas',
        price: 2250,
        priceFormatted: '$2.250',
        description: '🦉 Sabiduría silenciosa. Con su mirada atenta y acabado patinado, este búho aporta un toque de misterio y elegancia natural a tu entorno. 🍂',
        benefits: [
            'Símbolo de sabiduría',
            'Acabado patinado elegante',
            'Tamaño decorativo ideal',
            'Ligero y fácil de mover',
        ],
        specs: {
            dimensions: '42 cm x 20 cm',
            weight: '8 kg',
            color: 'Patinado',
        },
        images: getImages('buho-jardin'),
        inStock: true,
    },
    {
        id: 'e-12',
        slug: 'buda-porta-vela',
        name: 'Estatua Buda Porta Vela',
        category: 'Estatuas',
        price: 2190,
        priceFormatted: '$2.190',
        description: '🕯️ Luz espiritual. Ilumina tus noches con la serenidad de Buda. Perfecto para crear una atmósfera cálida y mágica al atardecer. 🌙✨',
        benefits: [
            'Funcional y decorativo',
            'Ideal para ambientar noches',
            'Diseño único',
            'Regalo perfecto',
        ],
        specs: {
            dimensions: '45 cm x 15 cm',
            weight: '9 kg',
        },
        images: getImages('buda-porta-vela'),
        inStock: true,
    },
    {
        id: 'e-13',
        slug: 'tortuga-porta-maceta',
        name: 'Tortuga Porta Maceta',
        category: 'Estatuas',
        price: 1990,
        priceFormatted: '$1.990',
        description: '🐢 Naturaleza sobre naturaleza. Esta adorable tortuga no solo decora, sino que acoge tus plantas favoritas. Un detalle lleno de vida y color. 🌸',
        benefits: [
            'Funcional y decorativo',
            'Ideal para plantas pequeñas',
            'Acabado colorido encantador',
            'La más económica de la colección',
        ],
        specs: {
            dimensions: '22 cm x 35 cm',
            weight: '10 kg',
            color: 'Verde y Marrón patinado',
        },
        images: getImages('tortuga-porta-maceta'),
        inStock: true,
    },

    // ============================================
    // MUEBLES Y ACCESORIOS
    // ============================================
    {
        id: 'm-01',
        slug: 'juego-mesa-bancos-romano',
        name: 'Juego Mesa y Bancos Romano',
        category: 'Muebles y Accesorios',
        price: 25800,
        priceFormatted: '$25.800',
        description: '🏛️ Banquetes imperiales. Reúne a tu familia en un espacio de elegancia clásica. Este juego de mesa y bancos de hormigón está hecho para durar eternamente. 🍇🍷',
        benefits: [
            'Set completo: mesa + 2 bancos',
            'Estilo romano clásico',
            'Hormigón vibrado de alta resistencia',
            'Ideal para reuniones al aire libre',
        ],
        specs: {
            table_dim: '1.50 m x 75 cm',
            bench_dim: '42 cm x 1.50 m',
            material: 'Hormigón vibrado inyectado',
            color: 'Cemento natural',
        },
        images: getImages('juego-mesa-bancos-romano'),
        inStock: true,
        featured: true,
    },
    {
        id: 'm-02',
        slug: 'banco-madera-jardin-grande',
        name: 'Banco de Madera de Jardín Grande',
        category: 'Muebles y Accesorios',
        price: 9900,
        priceFormatted: '$9.900',
        description: '🌲 Descanso natural. La solidez del hormigón se une a la calidez de la madera. El lugar perfecto para sentarse a disfrutar de tu jardín con un buen libro. 📖☕',
        benefits: [
            'Estructura inquebrantable de hormigón',
            'Madera tratada resistente',
            'Soporta hasta 290 kg',
            'Diseño clásico elegante',
        ],
        specs: {
            height: '1.20 m',
            width: '1.50 m',
            dimensions: '50 cm profundidad',
            material: 'Hormigón y madera tratada',
            maxLoad: '290 kg',
        },
        images: getImages('banco-madera-grande'),
        inStock: true,
    },
    {
        id: 'm-03',
        slug: 'farol-chino-grande',
        name: 'Farol Chino Grande',
        category: 'Muebles y Accesorios',
        price: 5990,
        priceFormatted: '$5.990',
        description: '🏮 Luz de Oriente. Dale a tu jardín un aire místico y sofisticado. Este imponente farol crea juegos de luz y sombra que transforman la noche. 🎋✨',
        benefits: [
            'Estética oriental auténtica',
            'Tamaño imponente',
            'Ideal para jardines zen',
            'Punto focal nocturno',
        ],
        specs: {
            dimensions: '1.30 m x 40 cm x 40 cm',
            weight: '40 kg',
        },
        images: getImages('farol-chino-grande'),
        inStock: true,
    },
    {
        id: 'm-04',
        slug: 'farol-chino-chico',
        name: 'Farol Chino Chico',
        category: 'Muebles y Accesorios',
        price: 4590,
        priceFormatted: '$4.590',
        description: '🌙 Destellos zen. Pequeño pero con carácter, este farol es ideal para marcar senderos o iluminar rincones especiales con un toque oriental. ✨',
        benefits: [
            'Versión compacta accesible',
            'Perfecto para patios pequeños',
            'Fácil de ubicar',
            'Complemento ideal',
        ],
        specs: {
            dimensions: '45 cm x 20 cm',
            weight: '17 kg',
        },
        images: getImages('farol-chino-chico'),
        inStock: true,
    },
];

// ============================================
// FUNCIONES HELPER
// ============================================

export const getProductBySlug = (slug: string): Product | undefined =>
    products.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
    products.find((p) => p.id === id);

export const getProductsByCategory = (category: ProductCategory): Product[] =>
    products.filter((p) => p.category === category);

export const getFeaturedProducts = (): Product[] =>
    products.filter((p) => p.featured);

export const getInStockProducts = (): Product[] =>
    products.filter((p) => p.inStock);

export const getWhatsAppLink = (product: Product): string => {
    const message = encodeURIComponent(
        `Hola Fuente Viva, deseo consultar por el producto ${product.name} con precio ${product.priceFormatted}`
    );
    return `https://wa.me/59894713998?text=${message}`;
};

// ============================================
// FAQ DATA
// ============================================
export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export const faqItems: FAQItem[] = [
    {
        id: 'q1',
        question: '¿Dónde se retira el producto?',
        answer:
            'El retiro se realiza en nuestro Pickup en El Pinar, Ciudad de la Costa. Recuerda que es solo punto de retiro, no es la fábrica.',
    },
    {
        id: 'q2',
        question: '¿Las fuentes incluyen motor?',
        answer:
            'Sí, todas nuestras fuentes incluyen el motor correspondiente, de bajo consumo y con regulador de presión según el modelo.',
    },
    {
        id: 'q3',
        question: '¿Realizan instalaciones?',
        answer:
            'Sí, realizamos instalaciones de fuentes y bebederos. Contáctanos para recibir una cotización según tu zona.',
    },
    {
        id: 'q4',
        question: '¿Se puede pedir un color especial?',
        answer:
            'Sí, es posible bajo pedido y con seña previa. Tiene una demora aproximada de 15 días.',
    },
    {
        id: 'q5',
        question: '¿Hacen envíos al interior?',
        answer:
            'Sí, realizamos envíos a Zona Metropolitana e Interior con costo adicional según el peso y destino.',
    },
    {
        id: 'q6',
        question: '¿Qué pasa si el producto no está en stock?',
        answer:
            'Lo fabricamos bajo pedido con seña previa. Demora: 10 días hábiles para colores estándar o 15 días para colores especiales.',
    },
];
