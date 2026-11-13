# Live example. After reset, add an available product to cart_1001 before placing an order. Preserve the same key and details for retries.
curl -i -X POST 'http://localhost:3000/api/v1/orders' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-customer-token' \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: order-demo-001' \
  --data '{"cartId":"cart_1001","shippingAddress":{"line1":"10 Demo Street","city":"Bengaluru","postalCode":"560001","country":"IN"}}'
