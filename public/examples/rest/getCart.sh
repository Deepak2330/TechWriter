# Live example. Use the seed dataset or adjust IDs to match your current local data. Writes may affect later examples.
curl -i -X GET 'http://localhost:3000/api/v1/carts/cart_1001' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-customer-token'
