-- ==========================================
-- MIGRACIÓN DE PRODUCTOS A SUPABASE
-- ==========================================

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-baja-paloma-2-niveles', 'Fuente Baja Paloma - 2 Niveles', '🕊️ Clásico y relajante. Su diseño de dos niveles y la suavidad de sus formas invitan a la calma. Un detalle atemporal que nunca pasa de moda. ⛲', 8990, '$8.990', 'Fuentes', true, false, ARRAY['Diseño clásico atemporal', 'Sonido relajante de cascada', 'Ideal para patios y entradas', 'Dos niveles de agua']::TEXT[], '{"levels":2,"height":"95 cm","diameter":"60 cm","diameter_main":"60 cm","weight":"40 kg","motor":"550 L/h (10W)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_baja_paloma_hofep8', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_baja_paloma_hofep8']::TEXT[], 'Hola! Me interesa este producto: Fuente Baja Paloma - 2 Niveles')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-barroca', 'Fuente Barroca', '🏰 La majestuosidad hecha fuente. Con su diseño barroco de tres niveles y un sonido de agua envolvente, esta pieza transformará tu jardín en un palacio real. Impresionante y eterna. 🌊✨', 23990, '$23.990', 'Fuentes', true, true, ARRAY['Motor profesional de 4500 L/h para cascada espectacular', 'Tres niveles con ornamentación barroca detallada', 'Ideal para jardines amplios y espacios comerciales', 'Sonido envolvente que transforma el ambiente']::TEXT[], '{"levels":3,"height":"1.75 m / 2.15 m","diameter_main":"96 cm","weight":"200 kg","motor":"4500 L/h (50W)","material":"Hormigón vibrado inyectado","installation":"Media a compleja"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_barroca_gdabi6', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_barroca_gdabi6']::TEXT[], 'Hola! Me interesa este producto: Fuente Barroca')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-plaqueta-buda-extra-grande', 'Fuente Plaqueta Buda Extra Grande', '🧘‍♂️ Paz monumental. Esta imponente fuente de pared con relieve de Buda es el punto focal perfecto para crear un santuario de serenidad en tu hogar. Conecta con lo esencial. 🌿💧', 25500, '$25.500', 'Fuentes', true, true, ARRAY['Diseño de pared imponente', 'Motor potente de 1600 L/h', 'Acabado piedra gris envejecida', 'Punto focal para patios amplios']::TEXT[], '{"height":"1.30 m","width":"1.00 m","weight":"90 kg","motor":"1600 L/h (60W)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_plaqueta_buda_extra_grande_qfq51w', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_plaqueta_buda_extra_grande_qfq51w']::TEXT[], 'Hola! Me interesa este producto: Fuente Plaqueta Buda Extra Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-buda-parado-plato-loto-xl', 'Fuente Buda Parado con Plato Loto (XL)', '✨ Elevación espiritual. Con 2 metros de altura, esta escultura de Buda sosteniendo un loto es más que una fuente; es una obra de arte que irradia calma y equilibrio a todo tu espacio. 🌸🕊️', 23990, '$23.990', 'Fuentes', true, true, ARRAY['Altura imponente de 2 metros', 'Combinación única de escultura y fuente', 'Motor de 1600 L/h incluido', 'Efecto visual y sonoro extraordinario']::TEXT[], '{"height":"2.00 m","diameter":"85 cm","diameter_main":"85 cm","weight":"100 kg","motor":"1600 L/h (70W)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida","installation":"Media-Avanzada"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Buda_parado_con_plato_Loto_extra_grande_wsch3g', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Buda_parado_con_plato_Loto_extra_grande_wsch3g']::TEXT[], 'Hola! Me interesa este producto: Fuente Buda Parado con Plato Loto (XL)')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-loto-grande', 'Fuente Loto Grande', '🌺 Elegancia que fluye. El diseño orgánico de la flor de loto se une al movimiento del agua para crear un ambiente fresco y vital. Siente la naturaleza en cada gota. 💧🍃', 23990, '$23.990', 'Fuentes', true, false, ARRAY['Diseño orgánico de flor de loto', 'Regulador de presión incluido', 'Motor eficiente de bajo consumo', 'Perfecto equilibrio entre tamaño e impacto']::TEXT[], '{"height":"1.25 m","diameter":"85 cm","diameter_main":"85 cm","weight":"90 kg","motor":"1500 L/h (25W)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida","extras":"Regulador de presión"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Loto_Grande_pehyla', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Loto_Grande_pehyla']::TEXT[], 'Hola! Me interesa este producto: Fuente Loto Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-fiona-3-niveles', 'Fuente Fiona - 3 Niveles', '🎶 Melodía visual. Tres caídas de agua que componen una canción relajante para tus tardes al aire libre. Un clásico atemporal que nunca deja de enamorar. ⛲✨', 16990, '$16.990', 'Fuentes', true, true, ARRAY['Sonido relajante de cascada', 'Punto focal elegante para cualquier jardín', 'Atrae aves y mariposas', 'Tres niveles para máximo efecto visual']::TEXT[], '{"levels":3,"height":"1.50 m","diameter":"75 cm","diameter_main":"75 cm","weight":"100 kg","motor":"1550 L/h (25W)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_fiona_yncrdq', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_fiona_yncrdq']::TEXT[], 'Hola! Me interesa este producto: Fuente Fiona - 3 Niveles')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-kiara-grande', 'Fuente Kiara Grande', '🌊 Suavidad mediterránea. Líneas curvas y flujo constante para quienes aman lo sutil. Trae la brisa y la frescura del mar a tu propio jardín. 🐚🏡', 16990, '$16.990', 'Fuentes', true, false, ARRAY['Diseño de líneas fluidas', 'Regulador de presión para personalizar el flujo', 'Motor silencioso de bajo consumo', 'Resistente a la intemperie']::TEXT[], '{"height":"1.55 m","diameter_main":"80 cm","weight":"115 kg","motor":"550 L/h (10W con regulador de presión)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Kiara_Grande_snvcpj', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Kiara_Grande_snvcpj']::TEXT[], 'Hola! Me interesa este producto: Fuente Kiara Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-fiona-con-pareja', 'Fuente Fiona con Pareja', '💕 Amor y naturaleza. La clásica cascada acompañada de una escena romántica. Un detalle encantador que cuenta una historia en tu jardín. 🌹💑', 18990, '$18.990', 'Fuentes', true, false, ARRAY['Diseño unique con figuras decorativas', 'Dos niveles de cascada', 'Motor potente de 1500 L/h', 'Pieza de conversación garantizada']::TEXT[], '{"levels":2,"height":"1.60 m","diameter_main":"75 cm","weight":"100 kg","motor":"1500 L/h (25W)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Fiona_con_pareja_n0rgwe', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Fiona_con_pareja_n0rgwe']::TEXT[], 'Hola! Me interesa este producto: Fuente Fiona con Pareja')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-buda-flor-loto-grande', 'Fuente Buda Flor de Loto Grande', '🧘‍♀️ Meditación en tu patio. La unión perfecta entre la figura de Buda y la pureza del loto. Un rincón para respirar y reconectar contigo mismo. 🕉️✨', 12990, '$12.990', 'Fuentes', true, false, ARRAY['Combinación de escultura y fuente', 'Tamaño ideal para patios medianos', 'Motor de bajo consumo', 'Acabado cemento natural']::TEXT[], '{"height":"75 cm","diameter_main":"77 cm","weight":"40 kg","motor":"550 L/h (10W con regulador de presión)","material":"Hormigón vibrado inyectado","color":"Cemento"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_buda_flor_de_loto_grande_u5o97h', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_buda_flor_de_loto_grande_u5o97h']::TEXT[], 'Hola! Me interesa este producto: Fuente Buda Flor de Loto Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-loto-mediana', 'Fuente Loto Mediana', '🌸 Belleza compacta. Todo el encanto de la flor de loto en un tamaño versátil. Ideal para patios íntimos donde cada detalle cuenta. ✨🍃', 12590, '$12.590', 'Fuentes', true, false, ARRAY['Tamaño versátil para cualquier espacio', 'Diseño orgánico de flor de loto', 'Fácil instalación', 'Motor silencioso incluido']::TEXT[], '{"height":"90 cm","diameter":"52 cm","diameter_main":"52 cm","weight":"50 kg","motor":"550 L/h (10W)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Loto_Mediana_maj5l6', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Loto_Mediana_maj5l6']::TEXT[], 'Hola! Me interesa este producto: Fuente Loto Mediana')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-nino-perrito', 'Fuente Niño con Perrito', '👦🐶 Ternura en tu jardín. Una escena que evoca la inocencia y la alegría de la infancia. Perfecta para dar una bienvenida cálida y familiar. ❤️🏡', 11990, '$11.990', 'Fuentes', true, false, ARRAY['Diseño entrañable y familiar', 'Ideal para hogares con niños', 'Motor de bajo consumo', 'Altura perfecta para jardines']::TEXT[], '{"height":"1.15 m","base":"32 cm x 32 cm","weight":"50 kg","motor":"550 L/h (10W con regulador de presión)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Nino_con_Perrito_con_base_cuadrada_bhfcbd', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Nino_con_Perrito_con_base_cuadrada_bhfcbd']::TEXT[], 'Hola! Me interesa este producto: Fuente Niño con Perrito')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-nino-flor-loto', 'Fuente Niño Flor de Loto', '🌿 Inocencia zen. La dulzura de un niño sosteniendo un loto, combinada con el sonido del agua. Un toque de pureza y arte para tu rincón favorito. 💫', 9800, '$9.800', 'Fuentes', true, false, ARRAY['Diseño delicado y artístico', 'Tamaño compacto ideal', 'Acabado gris claro envejecido', 'Perfecto para rincones zen']::TEXT[], '{"height":"65 cm","diameter":"50 cm","diameter_main":"50 cm","weight":"40 kg","motor":"550 L/h (10W) con regulador de presión","material":"Hormigón vibrado inyectado","color":"Gris claro envejecido"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Nino_flor_de_Loto_p2laqv', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Nino_flor_de_Loto_p2laqv']::TEXT[], 'Hola! Me interesa este producto: Fuente Niño Flor de Loto')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-marbella-puntero-pina', 'Fuente Marbella con Puntero Piña', '☀️ Aires del sur. Con su elegante remate de piña y estilo mediterráneo, esta fuente trae el sol y la distinción de la costa a tu hogar. 🍍🌊', 8990, '$8.990', 'Fuentes', true, false, ARRAY['Estilo mediterráneo elegante', 'Detalle de piña ornamental', 'Altura ideal para jardines', 'Motor incluido']::TEXT[], '{"height":"1.15 m","diameter":"60 cm","diameter_main":"60 cm","weight":"40 kg","motor":"550 L/h (10W) con regulador de presión","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_marbella_con_puntero_de_pina_imvmhw', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_marbella_con_puntero_de_pina_imvmhw']::TEXT[], 'Hola! Me interesa este producto: Fuente Marbella con Puntero Piña')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-placa-buda-chica', 'Fuente Placa Buda Chica', '🧘 Pequeño gran santuario. Ideal para balcones o muros pequeños, esta fuente ofrece toda la serenidad de Buda en un formato que se adapta a ti. ✨', 8990, '$8.990', 'Fuentes', true, false, ARRAY['Diseño de pared ahorra espacio', 'Ideal para balcones y terrazas', 'Flujo suave y constante', 'Fácil instalación']::TEXT[], '{"dimensions":"85 cm x 54 cm","weight":"50 kg","motor":"550 L/h (10W con regulador de presión)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Placa_Buda_chica_quxehn', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Placa_Buda_chica_quxehn']::TEXT[], 'Hola! Me interesa este producto: Fuente Placa Buda Chica')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-kiara-chica', 'Fuente Kiara Chica', '💧 Encanto azul. Su acabado en piedra azul envejecida la hace única. Una joya compacta que aporta color y frescura a cualquier espacio. 💙', 8990, '$8.990', 'Fuentes', true, false, ARRAY['Diseño compacto y elegante', 'Acabado piedra azul único', 'Motor silencioso incluido', 'Perfecta para patios pequeños']::TEXT[], '{"height":"96 cm","diameter":"55 cm","diameter_main":"55 cm","weight":"60 kg","motor":"550 L/h (10W) con regulador de presión","material":"Hormigón vibrado inyectado","color":"Piedra azul envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Kiara_Chica_vdmjzb', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Kiara_Chica_vdmjzb']::TEXT[], 'Hola! Me interesa este producto: Fuente Kiara Chica')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-esfera-chica', 'Fuente Esfera Chica', '⚪ Minimalismo puro. La simplicidad de la esfera y el agua fluyendo suavemente. Modernidad y calma para jardines actuales. 🌑✨', 5590, '$5.590', 'Fuentes', true, false, ARRAY['Diseño moderno y minimalista', 'Tamaño compacto versátil', 'Precio accesible', 'Fácil de ubicar']::TEXT[], '{"height":"50 cm","diameter":"60 cm","diameter_main":"60 cm","weight":"35 kg","motor":"550 L/h (10W) con regulador de presión","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_esfera_Chica_bqa41y', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_esfera_Chica_bqa41y']::TEXT[], 'Hola! Me interesa este producto: Fuente Esfera Chica')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('fuente-mini-buda-tibetano', 'Fuente Mini con Buda Tibetano Chico', '🎍 Paz en tu mesa. Lleva la armonía del agua al interior de tu hogar. Perfecta para tu escritorio o un rincón de lectura. 🧘‍♂️', 4200, '$4.200', 'Fuentes', true, false, ARRAY['Tamaño ideal para interiores', 'Perfecta para escritorios y mesas', 'Buda tibetano decorativo', 'La más accesible de nuestra colección']::TEXT[], '{"dimensions":"54 cm x 36 cm","weight":"15 kg","motor":"550 L/h (10W con regulador de presión)","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Mini_con_Buda_Tibetano_chico_llbwdf', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Fuente_Mini_con_Buda_Tibetano_chico_llbwdf']::TEXT[], 'Hola! Me interesa este producto: Fuente Mini con Buda Tibetano Chico')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('bebedero-aves-extra-grande', 'Bebedero de Aves Extra Grande', '🐦 Vida en tu jardín. Nuestro bebedero más grande se convertirá en el punto de encuentro favorito de las aves silvestres. ¡Un espectáculo natural en tu ventana! 🌳🦅', 8990, '$8.990', 'Bebederos', true, false, ARRAY['Tamaño extra grande para múltiples aves', 'Instalación básica y sencilla', 'Resistente a la intemperie', 'No requiere motor']::TEXT[], '{"height":"82 cm","diameter":"75 cm","diameter_main":"75 cm","weight":"45 kg","material":"Hormigón vibrado inyectado","installation":"Básica"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Bebedero_de_aves_extra_grande_iwkgrn', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Bebedero_de_aves_extra_grande_iwkgrn']::TEXT[], 'Hola! Me interesa este producto: Bebedero de Aves Extra Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('bebedero-paloma', 'Bebedero Paloma', '🕊️ Arte y naturaleza. Su bella silueta de paloma decora tu jardín incluso cuando no hay aves. Un bebedero que es también una escultura. 🌿✨', 3990, '$3.990', 'Bebederos', true, true, ARRAY['Atrae aves y mariposas', 'Estabilidad frente al viento', 'Mantenimiento muy bajo', 'Diseño artesanal único']::TEXT[], '{"height":"60 cm","diameter":"50 cm","diameter_main":"50 cm","weight":"30 kg","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida","motor_required":false,"installation":"No requiere motor ni instalación eléctrica"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Bebedero_paloma_lrwftk', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Bebedero_paloma_lrwftk']::TEXT[], 'Hola! Me interesa este producto: Bebedero Paloma')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('bebedero-aves-labrado', 'Bebedero Aves Labrado', '🎨 Detalle artesanal. Cada pliegue labrado cuenta una historia. Un bebedero que combina funcionalidad con una estética clásica y refinada. 🏺🐦', 2900, '$2.900', 'Bebederos', true, false, ARRAY['Detalles labrados a mano', 'Precio accesible', 'Sin mantenimiento de motor', 'Diseño atemporal']::TEXT[], '{"height":"55 cm","diameter":"54 cm","diameter_main":"54 cm","weight":"25 kg","material":"Hormigón vibrado inyectado","installation":"Básica"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/bebedero_aves_labrado_oagv6w', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/bebedero_aves_labrado_oagv6w']::TEXT[], 'Hola! Me interesa este producto: Bebedero Aves Labrado')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('bebedero-aves-64-cm', 'Bebedero Aves (64 cm)', '🌿 El tamaño perfecto. Ni muy grande ni muy chico, ideal para cualquier jardín. Invita a la naturaleza a formar parte de tu hogar. 🦋', 2900, '$2.900', 'Bebederos', true, false, ARRAY['Altura ideal para jardines', 'Fácil de mantener', 'Atrae vida silvestre', 'Resistente al clima']::TEXT[], '{"height":"64 cm","diameter":"48 cm","diameter_main":"48 cm","weight":"25 kg","material":"Hormigón vibrado inyectado","installation":"Básica"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Bebedero_aves_yhenmm', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Bebedero_aves_yhenmm']::TEXT[], 'Hola! Me interesa este producto: Bebedero Aves (64 cm)')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('buda-parado-grande', 'Buda Parado Grande', '🧘‍♂️ Guardián de paz. Con 1.50m de altura, este Buda vigila tu jardín irradiando una calma absoluta. Una presencia que se siente. ✨🌿', 11990, '$11.990', 'Estatuas', true, true, ARRAY['Altura imponente de 1.50m', 'Símbolo de paz y armonía', 'Punto focal para jardines', 'Resistente a la intemperie']::TEXT[], '{"dimensions":"1.50 m x 46 cm","weight":"65 kg","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Buda_Parado_Grande_rtdv9g', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Buda_Parado_Grande_rtdv9g']::TEXT[], 'Hola! Me interesa este producto: Buda Parado Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('estatua-camponesa', 'Estatua Camponesa', '🌾 Tradición y nostalgia. Evoca la belleza de la vida rural con esta figura llena de encanto. Un toque clásico que cuenta historias del campo. 👒🍂', 14990, '$14.990', 'Estatuas', true, false, ARRAY['Diseño tradicional y nostálgico', 'Tamaño imponente', 'Detalle artesanal', 'Pieza única de conversación']::TEXT[], '{"dimensions":"1.45 m x 56 cm","weight":"65 kg","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_Camponesa_uingcc', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_Camponesa_uingcc']::TEXT[], 'Hola! Me interesa este producto: Estatua Camponesa')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('pareja-perro-fu-medianos', 'Pareja Perro Fu Medianos', '🐉 Guardianes míticos. Según la tradición, estos leones protegen el hogar de energías negativas. Colócalos en la entrada y blinda tu espacio con buena fortuna. ⛩️✨', 18990, '$18.990', 'Estatuas', true, false, ARRAY['Símbolo de protección', 'Pareja completa incluida', 'Perfectos para entradas', 'Tradición oriental milenaria']::TEXT[], '{"dimensions":"55 cm x 32 cm x 40 cm","weight_per_unit":"35 kg","total_units":2,"material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Pareja_perro_Fu_Medianos_c4g9zb', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Pareja_perro_Fu_Medianos_c4g9zb']::TEXT[], 'Hola! Me interesa este producto: Pareja Perro Fu Medianos')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('buda-tibetano-grande', 'Buda Tibetano Grande', '🧘 Sabiduría milenaria. Sentado en meditación profunda, este Buda tibetano invita a la reflexión y al silencio interior. El alma de tu jardín zen. 🎋', 7990, '$7.990', 'Estatuas', true, false, ARRAY['Diseño tibetano tradicional', 'Tamaño ideal para jardines', 'Transmite paz y calma', 'Acabado resistente']::TEXT[], '{"dimensions":"84 cm x 54 cm","weight":"40 kg","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_Buda_Tibetano_Grande_s0cir8', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_Buda_Tibetano_Grande_s0cir8']::TEXT[], 'Hola! Me interesa este producto: Buda Tibetano Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('estatua-diosa-hindu', 'Estatua Diosa Hindú', '✨ Divinidad y belleza. La gracia de esta silueta aporta un aire místico y elegante. Un detalle espiritual que eleva la vibración de tu rincón favorito. 🕉️', 4990, '$4.990', 'Estatuas', true, false, ARRAY['Diseño hindú tradicional', 'Disponible en dos colores', 'Tamaño decorativo ideal', 'Detalle artístico fino']::TEXT[], '{"dimensions":"0.64 m x 38 cm","weight":"28 kg","material":"Hormigón vibrado inyectado","color_options":["Azul con dorado","Piedra gris envejecida"]}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_Diosa_Hindu_wg0csp', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_Diosa_Hindu_wg0csp']::TEXT[], 'Hola! Me interesa este producto: Estatua Diosa Hindú')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('buda-nino-parado-grande', 'Buda Niño Parado Grande', '🌸 Dulce despertar. La imagen de Buda en su juventud, llena de promesa y bondad. Una figura que inspira ternura y nuevos comienzos. 🧒✨', 4590, '$4.590', 'Estatuas', true, false, ARRAY['Diseño tierno y delicado', 'Ideal para jardines intimistas', 'Símbolo de nuevos comienzos', 'Ligero y fácil de ubicar']::TEXT[], '{"dimensions":"90 cm x 18 cm","weight":"15 kg","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_Buda_Nino_parado_Grande_s9rkpl', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_Buda_Nino_parado_Grande_s9rkpl']::TEXT[], 'Hola! Me interesa este producto: Buda Niño Parado Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('pavo-real-chico', 'Pavo Real Chico', '🦚 Elegancia real. Símbolo de inmortalidad y belleza, este pavo real con su acabado en pátina azul es una joya decorativa que no pasará desapercibida. 💙', 3590, '$3.590', 'Estatuas', true, false, ARRAY['Diseño elegante y distintivo', 'Acabado azul con pátina', 'Tamaño decorativo perfecto', 'Símbolo de belleza']::TEXT[], '{"dimensions":"0.47 m x 39 cm","weight":"28 kg","material":"Hormigón vibrado inyectado","color":"Azul con detalles y pátina"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Pavo_Real_chico_crzcgv', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Pavo_Real_chico_crzcgv']::TEXT[], 'Hola! Me interesa este producto: Pavo Real Chico')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('buda-tibetano-medio', 'Buda Tibetano Medio', '🧘‍♂️ Equilibrio perfecto. Todo el simbolismo del Buda tibetano en un tamaño versátil. Ideal para armonizar espacios interiores o exteriores. 🍂', 2990, '$2.990', 'Estatuas', true, false, ARRAY['Tamaño versátil', 'Precio accesible', 'Ideal para interiores', 'Diseño tradicional']::TEXT[], '{"dimensions":"56 cm x 40 cm","weight":"16 kg","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/BUDA_TIBETANO_MEDIO_j5mwy1', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/BUDA_TIBETANO_MEDIO_j5mwy1']::TEXT[], 'Hola! Me interesa este producto: Buda Tibetano Medio')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('enano-jardin-carro', 'Enano de Jardín con Carro', '🍄 Magia en el jardín. Este simpático personaje trae alegría y color a tus plantas. Un guardián divertido para tus rincones verdes. 🌈', 2700, '$2.700', 'Estatuas', true, false, ARRAY['Diseño divertido y único', 'Ideal para jardines familiares', 'Variedad de colores disponibles', 'Perfecto para rincones especiales']::TEXT[], '{"dimensions":"0.44 m x 48 cm","weight":"20 kg","material":"Hormigón vibrado inyectado","color":"Variedad de colores"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Enano_de_Jardin_con_carro_vl6zu1', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Enano_de_Jardin_con_carro_vl6zu1']::TEXT[], 'Hola! Me interesa este producto: Enano de Jardín con Carro')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('buda-serenidad', 'Buda de la Serenidad', '🧘‍♀️ Pausa sagrada. Un Buda compacto diseñado para recordarte la importancia de respirar y detenerte un momento. Paz instantánea. ✨', 2590, '$2.590', 'Estatuas', true, false, ARRAY['Tamaño ideal para altares', 'Diseño sereno y armonioso', 'Precio muy accesible', 'Perfecto para interiores']::TEXT[], '{"dimensions":"44 cm x 16 cm","weight":"12 kg","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/BUDA_DE_LA_SERENIDAD_ybrzdx', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/BUDA_DE_LA_SERENIDAD_ybrzdx']::TEXT[], 'Hola! Me interesa este producto: Buda de la Serenidad')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('buho-jardin', 'Búho de Jardín', '🦉 Sabiduría silenciosa. Con su mirada atenta y acabado patinado, este búho aporta un toque de misterio y elegancia natural a tu entorno. 🍂', 2250, '$2.250', 'Estatuas', true, false, ARRAY['Símbolo de sabiduría', 'Acabado patinado elegante', 'Tamaño decorativo ideal', 'Ligero y fácil de mover']::TEXT[], '{"dimensions":"42 cm x 20 cm","weight":"8 kg","material":"Hormigón vibrado inyectado","color":"Patinado"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Buho_de_Jardin_sik2rh', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Buho_de_Jardin_sik2rh']::TEXT[], 'Hola! Me interesa este producto: Búho de Jardín')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('buda-porta-vela', 'Estatua Buda Porta Vela', '🕯️ Luz espiritual. Ilumina tus noches con la serenidad de Buda. Perfecto para crear una atmósfera cálida y mágica al atardecer. 🌙✨', 2190, '$2.190', 'Estatuas', true, false, ARRAY['Funcional y decorativo', 'Ideal para ambientar noches', 'Diseño único', 'Regalo perfecto']::TEXT[], '{"dimensions":"45 cm x 15 cm","weight":"9 kg","material":"Hormigón vibrado inyectado","color":"Piedra gris envejecida"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_buda_porta_vela_kvpsw7', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Estatua_buda_porta_vela_kvpsw7']::TEXT[], 'Hola! Me interesa este producto: Estatua Buda Porta Vela')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('tortuga-porta-maceta', 'Tortuga Porta Maceta', '🐢 Naturaleza sobre naturaleza. Esta adorable tortuga no solo decora, sino que acoge tus plantas favoritas. Un detalle lleno de vida y color. 🌸', 1990, '$1.990', 'Estatuas', true, false, ARRAY['Funcional y decorativo', 'Ideal para plantas pequeñas', 'Acabado colorido encantador', 'La más económica de la colección']::TEXT[], '{"dimensions":"22 cm x 35 cm","weight":"10 kg","material":"Hormigón vibrado inyectado","color":"Verde y marrón patinado"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Tortuga_porta_maceta_ejeagx', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Tortuga_porta_maceta_ejeagx']::TEXT[], 'Hola! Me interesa este producto: Tortuga Porta Maceta')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('juego-mesa-bancos-romano', 'Juego Mesa y Bancos Romano', '🏛️ Banquetes imperiales. Reúne a tu familia en un espacio de elegancia clásica. Este juego de mesa y bancos de hormigón está hecho para durar eternamente. 🍇🍷', 25800, '$25.800', 'Muebles y Accesorios', true, true, ARRAY['Set completo: mesa + 2 bancos', 'Estilo romano clásico', 'Hormigón vibrado de alta resistencia', 'Ideal para reuniones al aire libre']::TEXT[], '{"table_dim":"1.50 m x 75 cm","bench_dim":"42 cm x 1.50 m","material":"Hormigón vibrado inyectado","color":"Cemento natural"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Juego_completo_Mesa_y_bancos_Romano_nw0ufy', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Juego_completo_Mesa_y_bancos_Romano_nw0ufy']::TEXT[], 'Hola! Me interesa este producto: Juego Mesa y Bancos Romano')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('banco-madera-jardin-grande', 'Banco de Madera de Jardín Grande', '🌲 Descanso natural. La solidez del hormigón se une a la calidez de la madera. El lugar perfecto para sentarse a disfrutar de tu jardín con un buen libro. 📖☕', 9900, '$9.900', 'Muebles y Accesorios', true, false, ARRAY['Estructura inquebrantable de hormigón', 'Madera tratada resistente', 'Soporta hasta 290 kg', 'Diseño clásico elegante']::TEXT[], '{"height":"1.20 m","width":"1.50 m","dimensions":"50 cm profundidad","material":"Hormigón vibrado inyectado y madera tratada","color":"Cemento","maxLoad":"290 kg"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Banco_con_asiento_y_Respaldo_en_madera_de_jardin_grande_rwprcj', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Banco_con_asiento_y_Respaldo_en_madera_de_jardin_grande_rwprcj']::TEXT[], 'Hola! Me interesa este producto: Banco de Madera de Jardín Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('farol-chino-grande', 'Farol Chino Grande', '🏮 Luz de Oriente. Dale a tu jardín un aire místico y sofisticado. Este imponente farol crea juegos de luz y sombra que transforman la noche. 🎋✨', 5990, '$5.990', 'Muebles y Accesorios', true, false, ARRAY['Estética oriental auténtica', 'Tamaño imponente', 'Ideal para jardines zen', 'Punto focal nocturno']::TEXT[], '{"dimensions":"1.30 m x 40 cm x 40 cm","weight":"40 kg","material":"Hormigón vibrado inyectado","installation":"Básica"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Farol_chino_grande_vxd78a', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Farol_chino_grande_vxd78a']::TEXT[], 'Hola! Me interesa este producto: Farol Chino Grande')
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
    image_gallery = EXCLUDED.image_gallery;

INSERT INTO public.products (slug, name, description, price, price_formatted, category, in_stock, featured, benefits, specs, image_thumbnail, image_gallery, whatsapp_message)
VALUES ('farol-chino-chico', 'Farol Chino Chico', '🌙 Destellos zen. Pequeño pero con carácter, este farol es ideal para marcar senderos o iluminar rincones especiales con un toque oriental. ✨', 4590, '$4.590', 'Muebles y Accesorios', true, false, ARRAY['Versión compacta accesible', 'Perfecto para patios pequeños', 'Fácil de ubicar', 'Complemento ideal']::TEXT[], '{"dimensions":"45 cm x 20 cm","weight":"17 kg","material":"Hormigón vibrado inyectado","installation":"Básica"}'::jsonb, 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Farol_chino_chico_ko58ob', ARRAY['https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Farol_chino_chico_ko58ob']::TEXT[], 'Hola! Me interesa este producto: Farol Chino Chico')
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
    image_gallery = EXCLUDED.image_gallery;

