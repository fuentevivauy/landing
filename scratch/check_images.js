const fs = require('fs');

const content = fs.readFileSync('c:\\Ramarketing\\0 - Ramarketing\\Antigravity\\Fuente viva\\lib\\data\\products.ts', 'utf8');

// Simple regex to find slugs and map entries
const slugsMatch = content.match(/slug:\s*'([^']+)'/g);
const slugs = slugsMatch ? slugsMatch.map(s => s.match(/'([^']+)'/)[1]) : [];

const mapMatch = content.match(/'([^']+)':\s*'([^']+)'/g);
const mapSlugs = mapMatch ? mapMatch.map(m => m.match(/'([^']+)'/)[1]) : [];

console.log('Total Slugs in products.ts:', slugs.length);
console.log('Total entries in IMAGE_MAP:', mapSlugs.length);

const missing = slugs.filter(s => !mapSlugs.includes(s));
console.log('Slugs missing in IMAGE_MAP:', missing);
