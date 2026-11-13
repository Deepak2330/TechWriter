// Run with Node.js 22+ while the local server is running.
// After reset, add an available product to cart_1001 before placing an order. Preserve the same key and details for retries.
const response = await fetch("http://localhost:3000/api/v1/orders", {
  "method": "POST",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer demo-customer-token",
    "Content-Type": "application/json",
    "Idempotency-Key": "order-demo-001"
  },
  "body": "{\"cartId\":\"cart_1001\",\"shippingAddress\":{\"line1\":\"10 Demo Street\",\"city\":\"Bengaluru\",\"postalCode\":\"560001\",\"country\":\"IN\"}}"
});
const text = await response.text();
let body = text;
try { body = text ? JSON.parse(text) : null; } catch { /* Keep non-JSON failure text. */ }
if (!response.ok) { console.error('HTTP', response.status, body); process.exitCode = 1; }
else console.log('HTTP', response.status, body);
