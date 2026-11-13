# ShopVerse canonical data dictionary

This dictionary describes the live local implementation, not a real Amazon or Flipkart API. REST and GraphQL call the same business service. IDs are opaque; stable seed values support exercises but do not imply a production numbering policy.

## Identities and access

| Demo token | Actor | Role |
| --- | --- | --- |
| demo-customer-token | cust_1001 | Customer, owns the seed cart and delivered order. |
| demo-other-customer-token | cust_1002 | A different customer for ownership tests. |
| demo-seller-token | seller_1001 | Seller, owns the seed headphones and lamp. |
| demo-other-seller-token | seller_1002 | Seller, owns the seed backpack. |
| demo-admin-token | admin_1001 | Administrator for supported owner/admin operations and lab reset. |

Send tokens in Authorization: Bearer. They are synthetic local strings, not JWTs or a complete OAuth implementation. Customer-only operations such as createCart, createOrder, addReview, and me do not treat the administrator as a customer.

## Entities

| Entity | Key fields | Relationships and lifecycle |
| --- | --- | --- |
| Product | id, name, sku, description, price, priceBeforeMarkdown, availability | Belongs to a category and seller. Public reads; owner seller/admin writes. |
| ProductVariant | id, productId, sku, name | Read-only catalogue examples. Checkout accepts productId, not variant ID. |
| Category | id, name | Read-only values accepted by product inputs. |
| Seller | id, name | Public nested GraphQL seller data; no seller onboarding workflow. |
| Customer | id, name, email | Synthetic profile. Customer-only me; REST can update name. |
| Cart | id, customerId, status, items, total | ACTIVE cart uses current catalogue prices. CHECKED_OUT cart retains a snapshot. |
| CartItem | id, productId, quantity, unitPrice, product | Distinct item ID. One item per product in a cart. |
| Order | id, customerId, cartId, status, items, total, shippingAddress, createdAt | Captures line names/prices at creation. No payment or fulfillment integration. |
| OrderItem | id, productId, name, quantity, unitPrice | Historical snapshot unaffected by later catalogue edits. |
| Shipment | id, orderId, status, trackingCode | Read-only delivered seed example; new orders have no shipments. |
| Review | id, productId, customerId, rating, comment, createdAt | One review per customer/product. No verified-purchase requirement. |
| ReturnRequest | id, orderId, customerId, reason, status, createdAt | One whole-order request for a delivered order. Not an automatic refund. |
| Money | amountMinor, currency | Integer minor units. INR only in this demo. |
| Address | line1, city, postalCode, country | Synthetic shipping details; country IN only. |

## Value constraints

| Value | Constraint |
| --- | --- |
| Product name / customer name | 1-120 Unicode code points; not whitespace-only. |
| Product description | 0-2,000 Unicode code points. |
| Product SKU | 1-64 code points, unique among products. |
| Product unit price / original price | Integer 0-1,000,000 INR minor units. |
| priceBeforeMarkdown | Null or a Money value at least the current price. |
| Cart item quantity | Integer 1-99. Updates replace the quantity. |
| Distinct products per cart | At most 10. Duplicate add is a conflict. |
| Review rating | Integer 1-5. |
| Review comment | 1-2,000 code points. |
| Return reason / cancellation reason | 1-500 code points when supplied. |
| Address line1, city, postalCode | 1-120 code points. Postal code is a demo string, not postal-network validation. |
| Address country | IN only. |
| Idempotency key | 1-128 code points; scoped to customer; retained until reset/restart. |
| REST limit / GraphQL first | 1-100, default 20. |
| REST offset | 0-1,000,000, default 0. |
| Product q filter | 1-120 code points; case-insensitive name substring. |
| DateTime | Canonical UTC YYYY-MM-DDTHH:mm:ss.sssZ. |

The product-price and cart-size bounds keep totals within GraphQL's signed 32-bit Int range. INR uses 100 minor units per rupee; other currencies can have different conventions and are not accepted here.

## State machines

Cart: ACTIVE -> CHECKED_OUT after a successful order. Closed carts cannot be edited.

Order: CONFIRMED -> CANCELLED through cancellation. Repeating cancellation returns the cancelled order unchanged. DELIVERED is a seeded state; no live fulfillment transition is implemented. Delivered orders cannot be cancelled.

ReturnRequest: REQUESTED only. The demo does not approve, ship, refund, or complete returns.

Availability: IN_STOCK or OUT_OF_STOCK. IN_STOCK is required when adding an item and rechecked when creating an order. No inventory quantity is reserved or decremented.

## Update rules

REST PUT replaces the writable product fields and resets omitted optional description/original-price values. REST PATCH and GraphQL updateProduct preserve omitted fields. Only priceBeforeMarkdown may be explicitly null to clear its value. Empty updates are rejected. Unknown request properties are rejected.

## Order idempotency

The key is sent in REST's Idempotency-Key header or GraphQL's CreateOrderInput.idempotencyKey field. The server fingerprints cartId and canonicalized address values. First success records an order and its response. Identical replay returns that saved response; different details with the same customer/key return IDEMPOTENCY_CONFLICT. The replay is the original snapshot, not a fresh representation of later cancellation state.

## Error-code catalogue

| Code | Meaning / action |
| --- | --- |
| INVALID_INPUT | Correct type, range, or nonempty-value violations. |
| UNKNOWN_FIELD | Remove unsupported JSON properties or query parameters. |
| MISSING_FIELD / MISSING_BODY | Supply the documented required input. |
| INVALID_JSON | Repair request JSON syntax. |
| UNAUTHENTICATED | Supply a recognized local bearer token. |
| FORBIDDEN | Use the required role and authorized resource owner. |
| NOT_FOUND | Verify the resource ID or preceding workflow output. |
| SKU_CONFLICT | Choose a unique product SKU. |
| INVALID_MARKDOWN | Original price must not be below current price. |
| PRODUCT_IN_CART | Remove active-cart references before deleting a product. |
| CART_CLOSED | Create a new cart for a new order intent. |
| ITEM_EXISTS | Update the existing item rather than adding it again. |
| CART_LIMIT | Remove an item before exceeding ten distinct products. |
| OUT_OF_STOCK | Select an available product or wait for a documented availability change. |
| EMPTY_CART | Add at least one item before ordering. |
| IDEMPOTENCY_CONFLICT | Do not reuse a key for different order details. |
| ORDER_STATE | The order state does not allow the requested transition. |
| REVIEW_EXISTS | The customer already reviewed this product. |
| RETURN_EXISTS | This order already has a return request. |
| INVALID_CURSOR | Restart traversal with the same documented collection scope. |
| METHOD_NOT_ALLOWED | Use a supported method; inspect Allow where supplied. |
| UNSUPPORTED_MEDIA_TYPE | Use application/json for JSON request bodies. |
| REQUEST_TOO_LARGE | Keep the request within 64 KiB. |
| RATE_LIMITED | Deterministic lab trigger; inspect Retry-After. Not a production quota. |
| LOCAL_ONLY / ORIGIN_NOT_ALLOWED | Open the local site from its own loopback origin. |
| INTERNAL_ERROR | Unexpected demo failure; collect safe diagnostics and inspect local logs. |

GraphQL uses its standard error envelope with local extensions for business errors. Do not equate an extensions.httpStatus value with the actual HTTP response status. Parse and validation failures may use engine-generated messages without these business codes.
