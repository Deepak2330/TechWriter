// Run with Node.js 22+ while the local server is running.
// Use the seed dataset or adjust IDs to match your current local data. Writes may affect later examples.
const response = await fetch("http://localhost:3000/api/v1/products/prod_1001", {
  "method": "PUT",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer demo-seller-token",
    "Content-Type": "application/json"
  },
  "body": "{\"name\":\"USB-C Cable\",\"description\":\"A two metre charging cable.\",\"sku\":\"USB-C-02\",\"price\":{\"amountMinor\":49900,\"currency\":\"INR\"},\"priceBeforeMarkdown\":null,\"availability\":\"IN_STOCK\",\"categoryId\":\"cat_accessories\"}"
});
const text = await response.text();
let body = text;
try { body = text ? JSON.parse(text) : null; } catch { /* Keep non-JSON failure text. */ }
if (!response.ok) { console.error('HTTP', response.status, body); process.exitCode = 1; }
else console.log('HTTP', response.status, body);
