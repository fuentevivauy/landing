const https = require('https');
const fs = require('fs');

const content = fs.readFileSync('c:\\Ramarketing\\0 - Ramarketing\\Antigravity\\Fuente viva\\lib\\data\\products.ts', 'utf8');
const mapMatch = content.match(/'([^']+)':\s*'([^']+)'/g);
const map = {};
if (mapMatch) {
    mapMatch.forEach(m => {
        const parts = m.match(/'([^']+)'/g);
        map[parts[0].replace(/'/g, '')] = parts[1].replace(/'/g, '');
    });
}

const cloudName = 'doyde4ron';
const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/`;

const entries = Object.entries(map);
let index = 0;

function checkNext() {
    if (index >= entries.length) {
        console.log('--- DONE ---');
        return;
    }
    const [slug, id] = entries[index];
    const url = baseUrl + id;
    https.get(url, (res) => {
        if (res.statusCode !== 200) {
            console.log(`[${res.statusCode}] ${slug} -> ${id}`);
        }
        index++;
        checkNext();
    }).on('error', (e) => {
        console.error(`ERROR ${slug}: ${e.message}`);
        index++;
        checkNext();
    });
}

console.log(`Checking ${entries.length} images...`);
checkNext();
