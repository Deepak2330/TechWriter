# Live example. Create a return for ord_1001 first, then use the returned return ID.
curl -i -X GET 'http://localhost:3000/api/v1/returns/ret_1001' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-customer-token'
