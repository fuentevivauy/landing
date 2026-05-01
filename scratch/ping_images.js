const https = require('https');

const urls = [
    'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/BUDA_DE_LA_SERENIDAD_ybrzdx',
    'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/BUDA_TIBETANO_MEDIO_j5mwy1'
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`${url} -> ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`${url} -> ERROR: ${e.message}`);
    });
});
