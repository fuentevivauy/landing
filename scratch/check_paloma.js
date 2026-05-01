const https = require('https');
const url = 'https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/products/fuente-baja-paloma-2-niveles_1775918800294.jpg';
https.get(url, (res) => {
    console.log(`${url} -> ${res.statusCode}`);
});
