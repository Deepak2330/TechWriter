// Run with Node.js 22+ while the local server is running.
// The preset uses prod_1002 because the seed customer already reviewed prod_1001.
const response = await fetch("http://localhost:3000/api/v1/products/prod_1002/reviews", {
  "method": "POST",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer demo-customer-token",
    "Content-Type": "application/json"
  },
  "body": "{\"rating\":5,\"comment\":\"Easy to set up and use.\"}"
});
const text = await response.text();
let body = text;
try { body = text ? JSON.parse(text) : null; } catch { /* Keep non-JSON failure text. */ }
if (!response.ok) { console.error('HTTP', response.status, body); process.exitCode = 1; }
else console.log('HTTP', response.status, body);
