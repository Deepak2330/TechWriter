// Run with Node.js 22+ while the local server is running.
// Create a return for ord_1001 first, then use the returned return ID.
const response = await fetch("http://localhost:3000/api/v1/returns/ret_1001", {
  "method": "GET",
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
