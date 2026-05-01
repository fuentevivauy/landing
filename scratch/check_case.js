const https = require('https');
const url = 'https://res.cloudinary.com/doyde4ron/image/upload/f_auto,q_auto/Buda_Tibetano_Medio_j5mwy1';
https.get(url, (res) => {
    console.log(`${url} -> ${res.statusCode}`);
});
