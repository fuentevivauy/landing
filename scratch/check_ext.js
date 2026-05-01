const https = require('https');
const url = 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/BUDA_TIBETANO_MEDIO_j5mwy1.jpg';
https.get(url, (res) => {
    console.log(`${url} -> ${res.statusCode}`);
});
