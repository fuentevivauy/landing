const https = require('https');
const urls = [
    'https://res.cloudinary.com/doyde4ron/image/upload/v1770408575/final_cta_mobile_birds_azmtti.jpg',
    'https://res.cloudinary.com/doyde4ron/image/upload/v1770408607/final_cta_desktop_birds_uh8qyg.png'
];
urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`${url} -> ${res.statusCode}`);
    });
});
