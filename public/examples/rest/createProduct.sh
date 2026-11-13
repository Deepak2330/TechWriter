# Live example. Use the seed dataset or adjust IDs to match your current local data. Writes may affect later examples.
curl -i -X POST 'http://localhost:3000/api/v1/products' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer demo-seller-token' \
  -H 'Content-Type: application/json' \
  --data '{"name":"USB-C Cable","description":"A two metre charging cable.","sku":"USB-C-02","price":{"amountMinor":49900,"currency":"INR"},"priceBeforeMarkdown":null,"availability":"IN_STOCK","categoryId":"cat_accessories"}'
