# Live example. After reset, add prod_1001 to cart_1001 once and use the returned item ID.
curl -i -X PATCH 'http://localhost:3000/api/v1/carts/cart_1001/items/item_1001' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-customer-token' \
  -H 'Content-Type: application/json' \
  --data '{"quantity":2}'
