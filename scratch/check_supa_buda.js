const https = require('https');
const url = 'https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/products/buda-tibetano-medio.jpg';
https.get(url, (res) => {
    console.log(`${url} -> ${res.statusCode}`);
});
