import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fuenteviva.uy'),
  title: "Fuente Viva | Arte y Naturaleza en Hormigón Premium",
  description: "Descubre la serenidad de nuestras fuentes y bebederos artesanales. Más de 6 años creando piezas de hormigón premium para transformar tu jardín en un santuario de calma. Envíos a todo Uruguay.",
  alternates: {
    canonical: 'https://fuenteviva.uy',
  },
  keywords: ["fuentes de jardín", "bebederos para aves", "estatuas de hormigón", "decoración exterior", "jardín zen", "hormigón premium", "Uruguay"],
  authors: [{ name: "Fuente Viva" }],
  openGraph: {
    title: "Fuente Viva | Arte y Naturaleza en Hormigón Premium",
    description: "Fuentes, bebederos y estatuas artesanales para transformar tu jardín en un santuario de calma. Piezas únicas hechas a mano en Uruguay.",
    url: "https://fuenteviva.uy",
    siteName: "Fuente Viva",
    images: [
      {
        url: '/images/og-fuente.jpg',
        width: 1200,
        height: 630,
        alt: 'Fuente de agua artesanal de tres niveles - Fuente Viva',
      }
    ],
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuente Viva | Arte y Naturaleza en Hormigón Premium",
    description: "Transforma tu jardín con nuestras fuentes y estatuas de hormigón premium.",
    images: ['/images/og-fuente.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Suspense } from "react";
import { Analytics } from "@/components/Analytics";
import FacebookPixel from "@/components/FacebookPixel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://fuenteviva.uy/#business',
    name: 'Fuente Viva',
    description:
      'Fuentes, bebederos y estatuas artesanales de hormigón premium para jardín. Más de 6 años creando piezas únicas en Uruguay.',
    url: 'https://fuenteviva.uy',
    image: 'https://fuenteviva.uy/images/og-fuente.jpg',
    telephone: '+59894713998',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'El Pinar',
      addressRegion: 'Canelones',
      addressCountry: 'UY',
    },
    areaServed: ['Montevideo', 'Canelones', 'Maldonado', 'Uruguay'],
    sameAs: [],
  };

  return (
    <html lang="es-UY">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          "antialiased min-h-screen bg-off-white font-sans overflow-x-hidden",
          playfair.variable,
          montserrat.variable,
          cormorant.variable
        )}
      >
        <FacebookPixel />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

