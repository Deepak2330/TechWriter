# Live example. The preset uses prod_1002 because the seed customer already reviewed prod_1001.
curl -i -X POST 'http://localhost:3000/api/v1/products/prod_1002/reviews' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-customer-token' \
  -H 'Content-Type: application/json' \
  --data '{"rating":5,"comment":"Easy to set up and use."}'
