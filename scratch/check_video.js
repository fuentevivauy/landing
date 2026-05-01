const https = require('https');
const url = 'https://ixzkuosmzqescxalkmbr.supabase.co/storage/v1/object/public/product-images/hero/hero-video.mp4';
https.get(url, (res) => {
    console.log(`${url} -> ${res.statusCode}`);
});
