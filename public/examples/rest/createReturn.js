// Run with Node.js 22+ while the local server is running.
// Use the seed dataset or adjust IDs to match your current local data. Writes may affect later examples.
const response = await fetch("http://localhost:3000/api/v1/orders/ord_1001/returns", {
  "method": "POST",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer demo-customer-token",
    "Content-Type": "application/json"
  },
  "body": "{\"reason\":\"The item is not suitable.\"}"
});
const text = await response.text();
let body = text;
try { body = text ? JSON.parse(text) : null; } catch { /* Keep non-JSON failure text. */ }
if (!response.ok) { console.error('HTTP', response.status, body); process.exitCode = 1; }
else console.log('HTTP', response.status, body);
