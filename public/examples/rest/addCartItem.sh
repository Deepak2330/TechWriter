# Live example. Use an ACTIVE cart that does not already contain this product. The seed cart is empty after reset.
curl -i -X POST 'http://localhost:3000/api/v1/carts/cart_1001/items' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-customer-token' \
  -H 'Content-Type: application/json' \
  --data '{"productId":"prod_1001","quantity":1}'
