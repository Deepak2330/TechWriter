# Live example. Use the seed dataset or adjust IDs to match your current local data. Writes may affect later examples.
curl -i -X PATCH 'http://localhost:3000/api/v1/products/prod_1001' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-seller-token' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Wireless Headphones Pro"}'
