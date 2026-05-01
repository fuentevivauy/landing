const https = require('https');
const fs = require('fs');

const content = fs.readFileSync('c:\\Ramarketing\\0 - Ramarketing\\Antigravity\\Fuente viva\\seed_products.sql', 'utf8');
const urlsMatch = content.match(/https:\/\/res\.cloudinary\.com\/doyde4ron\/image\/upload\/[^\s',)]+/g);

if (!urlsMatch) {
    console.log('No Cloudinary URLs found in seed_products.sql');
    process.exit(0);
}

const urls = [...new Set(urlsMatch)];
let index = 0;

function checkNext() {
    if (index >= urls.length) {
        console.log('--- DONE ---');
        return;
    }
    const url = urls[index];
    https.get(url, (res) => {
        if (res.statusCode !== 200) {
            console.log(`[${res.statusCode}] ${url}`);
        }
        index++;
        checkNext();
    }).on('error', (e) => {
        console.error(`ERROR ${url}: ${e.message}`);
        index++;
        checkNext();
    });
}

console.log(`Checking ${urls.length} Cloudinary URLs...`);
checkNext();
