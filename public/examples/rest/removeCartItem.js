// Run with Node.js 22+ while the local server is running.
// After reset, add prod_1001 to cart_1001 once and use the returned item ID.
const response = await fetch("http://localhost:3000/api/v1/carts/cart_1001/items/item_1001", {
  "method": "DELETE",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer demo-customer-token"
  }
});
const text = await response.text();
let body = text;
try { body = text ? JSON.parse(text) : null; } catch { /* Keep non-JSON failure text. */ }
if (!response.ok) { console.error('HTTP', response.status, body); process.exitCode = 1; }
else console.log('HTTP', response.status, body);
