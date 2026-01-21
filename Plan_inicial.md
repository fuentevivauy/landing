# Implementation Plan: Fuente Viva Digital Ecosystem

## 1. Project Identity & Strategic Context

* **Project Name:** Fuente Viva.
* 
**Brand Purpose:** Sale and installation of premium concrete garden fountains, birdbaths, and statues.


* 
**Target Audience:** Homeowners, commercial spaces, and landscape projects in Uruguay (Metropolitan area and Interior).


* 
**Core Value Proposition:** "Un rincón de calma donde la naturaleza se detiene a beber".



## 2. Brand Identity Assets

### 2.1 Logo Generation (Design Prompt for IDE)

* **Concept:** Organic Minimalist.
* **Visual Elements:** A stylized fountain silhouette or a water drop merging with a lotus leaf.
* **Style:** Clean vectors, balanced proportions.
* **Primary Color:** Slate Blue (from reference site).

### 2.2 Visual Language (Style Guide)

* **Reference Style:** Based on Wix-Vibe design.
* **Palette:**
* 
**Primary:** Stone Gray (Hex: #8E8E8E) – inspired by "Piedra gris envejecida".


* **Secondary:** Slate Blue / Deep Water (Hex: #2F3E46).
* **Background:** Off-White / Paper (Hex: #F8F9FA).


* **Typography:**
* 
**Headings:** Elegant Serif (e.g., *Playfair Display*) for inspirational texts.


* 
**Body:** Clean Sans-Serif (e.g., *Montserrat*) for technical specs.





## 3. Frontend Architecture

The system will use **Next.js 14 (App Router)** with **Tailwind CSS** and **Framer Motion**.

### 3.1 Components & Structure

* **Hero Section:** High-resolution video background showing water movement. Text overlay with "Fuente Viva: Serenidad en tu hogar".


* **Product Gallery (Interactive Grid):**
* **Trigger:** User clicks on a product image.
* **Animation:** Shared Layout Transition (Layout ID). The small card expands into a full-screen modal/card overlay.
* 
**Details view:** Includes high-res image, "Características Técnicas", and "Beneficios".




* **FAQ Section (Preguntas Frecuentes):**
* 
**Retiro:** Pickup en El Pinar, Ciudad de la Costa (solo retiro, no fábrica).


* 
**Instalación:** Disponible con costo adicional según zona.


* 
**Motores:** Las fuentes incluyen motor (ej. 550 L/h, 800 L/h o 4500 L/h según modelo).


* 
**Personalización:** Colores especiales bajo pedido con seña previa y demora de 15 días.





## 4. Product Database (Content Object)

The system will map the following data structure for the gallery:

| ID | Product Name | Category | Price (UYU) | Key Specs |
| --- | --- | --- | --- | --- |
| 01 | Bebedero Paloma | Bebedero | $3.990 | 30kg, 60cm Height, Concrete.

 |
| 02 | Fuente Baja Paloma | Fuente | $8.990 | 2 Levels, 40kg, Motor 10W.

 |
| 03 | Fuente Fiona | Fuente | $16.990 | 3 Levels, 100kg, 1.50m Height.

 |
| 04 | Fuente Barroca | Fuente | $23.990 | 3 Levels, 200kg, Motor 4500 L/h.

 |
| 05 | Estatua Buda Niño | Estatua | $4.590 | 90cm x 18cm, 15kg.

 |
| 06 | Fuente Placa Buda | Fuente | $8.990 | 50kg, 85cm x 54cm, Includes motor.

 |
| 07 | Banco de Madera | Mueble | $9.900 | 1.50m Width, Concrete/Wood, Supports 290kg.

 |

## 5. Conversion & Backend Integration

* 
**WhatsApp Lead Generation:** Every product card features a CTA button linking to `wa.me/59894713998`.


* **Pre-filled message:** "Hola Fuente Viva, deseo consultar por el producto [Product_Name] con precio [Price]".
* 
**Order Management:** If stock = false, trigger "Fabricación bajo pedido" alert (10 business days).
