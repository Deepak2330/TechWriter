# Live example. Create a cart item and order first; use the returned order ID. The seeded delivered order cannot be cancelled.
curl -i -X POST 'http://localhost:3000/api/v1/orders/ord_1002/cancellations' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-customer-token' \
  -H 'Content-Type: application/json' \
  --data '{"reason":"Ordered by mistake."}'
