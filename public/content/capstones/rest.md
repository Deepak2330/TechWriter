# REST developer documentation capstone

## Business brief

ShopVerse needs a documentation package for a developer building a product catalogue and a local checkout demonstration. The reader knows basic HTTP and JSON but has not used this API. The deliverable must work without private instructions from the author. This is a fictional educational project, not an official Amazon or Flipkart integration.

## Source material and scope

Use the [REST reference](#/rest), [OpenAPI explorer](#/openapi), business rules in server/services/commerce.js, and the downloadable contract. Product reads are public. Customer workflows require the customer's demo token. The administrator can inspect resources but does not impersonate a customer for order creation. Data is synthetic and in memory.

Include products, categories, carts, orders, tracking, reviews, and returns in the reference scope. The central tutorial covers product lookup through order verification. Do not invent payment, tax, inventory reservation, international currency, or shipment-creation capabilities.

## Required submission

Create an overview, setup/authentication guide, quickstart, endpoint references, purchase tutorial, error/retry guide, OpenAPI description, test report, and portfolio README. Link related pages. Include request and response examples with documented prerequisites and exact field meanings. Use the provided writing templates as starting structures, not as completed evidence.

## Assessment rubric

| Criterion | Points |
| --- | --- |
| Contract and implementation accuracy | 30 |
| Complete reproducible workflow | 20 |
| Reference fields, examples, and headers | 20 |
| Access, errors, and recovery | 15 |
| Structure, clarity, and navigation | 10 |
| Evidence and honest project scope | 5 |

## Model answer

### Overview

The ShopVerse API lets you browse products, build a cart, record a synthetic order, and inspect its state. The local base URL is `http://localhost:3000/api/v1`. Start with a public product request, then use the customer demo token for private tasks. The service binds to localhost and stores changes only in memory. Resetting or restarting the server restores the seed dataset and removes retained idempotency results.

Prices use integer INR minor units. For example, 249900 represents INR 2,499.00. The demo supports INR only; this convention must not be generalized to every currency. Product variants are read-only catalogue examples; cart inputs use productId, not variant IDs.

### Setup and authentication

Install Node.js 22 or later, open a terminal in the project folder, run `npm install`, then `npm run dev`. Open the printed local address. The REST server also works without the optional GraphQL runtime installed, but installing dependencies enables both API styles.

Public product and category reads need no token. For the purchase workflow, send `Authorization: Bearer demo-customer-token`. The other-customer token represents a different account and cannot access the seed customer's cart or orders. These tokens are synthetic fixed strings, not real credentials or a complete OAuth service.

### Quickstart: read a product

```bash
curl -i http://localhost:3000/api/v1/products/prod_1001
```

After reset, verify HTTP 200, id prod_1001, name Wireless Headphones, and price {amountMinor:249900,currency:"INR"}. The response also contains sku, description, availability, categoryId, sellerId, priceBeforeMarkdown, and createdAt. This paragraph lists selected checks, not a claim that the response contains only those fields.

For prod_1001, priceBeforeMarkdown is 299900 INR minor units. For prod_1002 it is null, meaning no original price is recorded. Do not display null as a zero-valued original price.

### Endpoint reference example: add a cart item

`POST /carts/{cartId}/items` adds one available product to an ACTIVE cart. Use the cart owner's customer token or the administrator token. The cart must not already contain the product.

| Input | Location | Required | Rule |
| --- | --- | --- | --- |
| cartId | Path | Yes | Existing cart accessible to the actor. |
| productId | JSON body | Yes | Existing IN_STOCK product. |
| quantity | JSON body | Yes | Integer from 1 through 99; not an increment. |

```bash
curl -i http://localhost:3000/api/v1/carts/cart_1001/items \
  -H 'Authorization: Bearer demo-customer-token' \
  -H 'Content-Type: application/json' \
  --data '{"productId":"prod_1001","quantity":1}'
```

Run this after reset when the seed cart is empty. Success returns HTTP 201 with the updated Cart, including the returned cart-item ID, quantity, product details, unit price, and total. The full response model is in the reference. Save the item ID for updates or removal; it is not the product ID.

A duplicate product returns 409 ITEM_EXISTS; use the item update operation instead. A closed cart returns 409 CART_CLOSED; create a new cart. An invalid quantity returns 400 INVALID_INPUT; correct the input. Missing authentication and wrong-owner access are different failures, 401 and 403 respectively in this demo.

### Purchase tutorial

1. Retrieve prod_1001 and confirm availability IN_STOCK. This read does not reserve stock.
2. POST /carts with the customer token and no request body. Save the returned cart ID.
3. POST /carts/{returnedCartId}/items with productId prod_1001 and quantity 1. Verify the total.
4. POST /orders with the same customer token, `Idempotency-Key: portfolio-order-001`, and the following body after replacing the cart ID.
5. GET /orders/{returnedOrderId} and verify CONFIRMED, one line item, and the expected total. Retrieve the cart and verify CHECKED_OUT.

```json
{
  "cartId": "REPLACE_WITH_RETURNED_CART_ID",
  "shippingAddress": {
    "line1": "10 Example Road",
    "city": "Bengaluru",
    "postalCode": "560001",
    "country": "IN"
  }
}
```

The body above is a template until the ID is replaced. First creation returns 201 and Location for the order. Replaying the same customer/key/details returns 200, the same order, and Idempotency-Replayed: true. Changing details with the same key returns 409 IDEMPOTENCY_CONFLICT. Keys survive only until server reset or restart.

Confirmation records a synthetic order; it does not process payment, calculate tax, reserve stock, or book delivery. New orders have no shipments. Use seeded ord_1001 to examine a delivered-order shipment example.

### Failure and recovery guide

| Symptom | Cause | Recovery |
| --- | --- | --- |
| 400 INVALID_INPUT | A value violates a type or range rule. | Correct the indicated input before retrying. |
| 401 UNAUTHENTICATED | Missing or unrecognized demo token. | Use the documented synthetic role token. |
| 403 FORBIDDEN | Role or ownership does not permit access. | Use the correct account or authorized administrator. |
| 404 NOT_FOUND | The identifier is not present. | Retrieve available IDs or check earlier workflow outputs. |
| 409 ITEM_EXISTS | Product already present in the cart. | Update the existing item rather than add it again. |
| 409 CART_CLOSED | The cart has been checked out. | Create a new cart for a new purchase. |
| 409 IDEMPOTENCY_CONFLICT | Same key, different order details. | Recover the original intent; use a new key only for a genuinely new intent. |
| 429 forced demo response | X-Demo-Error: rate-limit was supplied. | Observe Retry-After, remove the test header, and retry when appropriate. |

Problem Details uses standard members plus local code and fields extensions. Never retry an uncertain order with a new key merely because the client timed out. A timeout does not prove that the write failed.

### OpenAPI and verification

Use the supplied OpenAPI 3.1.1 contract, not a second manually maintained description with different limits. Run `npm run build`, `npm run check`, and `npm test`. Validate response examples against schemas and execute the purchase workflow from a clean state. Include quantity-boundary, wrong-owner, duplicate-item, and order-replay checks. Record actual results and any blocked checks in the submission's test report.

### Portfolio README

This project demonstrates REST API technical writing using a fictional marketplace. Deliverables include task-oriented guides, operation references, reusable schemas, troubleshooting, and contract tests. The implementation is a local educational service with synthetic data and fixed demo identities, not a production commerce backend or an official marketplace API.

## Final review

Verify every link, generated identifier handoff, token role, response shape, and status claim. Review the full API references for operations beyond the central tutorial. Ask a new reader to follow the quickstart without extra explanations and record where the documentation needs improvement.
