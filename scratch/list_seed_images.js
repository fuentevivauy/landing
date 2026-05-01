const fs = require('fs');
const content = fs.readFileSync('c:\\Ramarketing\\0 - Ramarketing\\Antigravity\\Fuente viva\\seed_products.sql', 'utf8');

const regex = /INSERT INTO public\.products .*? VALUES \('([^']+)', '([^']+)', .*?, '([^']+)', ARRAY/g;
let match;
console.log('Product Slugs and Image URLs:');
while ((match = regex.exec(content)) !== null) {
    console.log(`${match[1]}: ${match[3]}`);
}
