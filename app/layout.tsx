import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Fuente Viva | Serenidad en tu hogar",
  description: "Fuentes, bebederos y estatuas artesanales de hormigón premium. Más de 6 años creando espacios zen en Uruguay. Envíos a todo el país.",
  keywords: ["fuentes de jardín", "bebederos para aves", "estatuas de hormigón", "decoración exterior", "jardín zen", "Uruguay"],
  authors: [{ name: "Fuente Viva" }],
  openGraph: {
    title: "Fuente Viva | Serenidad en tu hogar",
    description: "Fuentes, bebederos y estatuas artesanales de hormigón premium. Más de 6 años creando espacios zen en Uruguay.",
    url: "https://fuenteviva.uy",
    siteName: "Fuente Viva",
    locale: "es_UY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuente Viva | Serenidad en tu hogar",
    description: "Fuentes, bebederos y estatuas artesanales de hormigón premium.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          "antialiased min-h-screen bg-off-white font-sans overflow-x-hidden",
          playfair.variable,
          montserrat.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
