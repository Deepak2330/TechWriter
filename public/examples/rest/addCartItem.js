// Run with Node.js 22+ while the local server is running.
// Use an ACTIVE cart that does not already contain this product. The seed cart is empty after reset.
const response = await fetch("http://localhost:3000/api/v1/carts/cart_1001/items", {
  "method": "POST",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer demo-customer-token",
    "Content-Type": "application/json"
  },
  "body": "{\"productId\":\"prod_1001\",\"quantity\":1}"
});
const text = await response.text();
let body = text;
try { body = text ? JSON.parse(text) : null; } catch { /* Keep non-JSON failure text. */ }
if (!response.ok) { console.error('HTTP', response.status, body); process.exitCode = 1; }
else console.log('HTTP', response.status, body);
