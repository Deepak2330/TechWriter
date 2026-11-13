// Run with Node.js 22+ while the local server is running.
// Create a cart item and order first; use the returned order ID. The seeded delivered order cannot be cancelled.
const response = await fetch("http://localhost:3000/api/v1/orders/ord_1002/cancellations", {
  "method": "POST",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer demo-customer-token",
    "Content-Type": "application/json"
  },
  "body": "{\"reason\":\"Ordered by mistake.\"}"
});
const text = await response.text();
let body = text;
try { body = text ? JSON.parse(text) : null; } catch { /* Keep non-JSON failure text. */ }
if (!response.ok) { console.error('HTTP', response.status, body); process.exitCode = 1; }
else console.log('HTTP', response.status, body);
