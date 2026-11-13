# GraphQL developer documentation capstone

## Business brief

Create a developer documentation package for the same ShopVerse marketplace using GraphQL. The reader understands JSON but is new to schemas, selection sets, variables, and field-level errors. The package should support both a first successful query and a complete synthetic purchase.

## Source material and deliverables

Use schema.graphql, the GraphQL operation reference, the shared business service, and the local playground. Deliver an overview, quickstart, annotated schema reference, query and mutation pages, pagination guide, error/authentication guide, purchase tutorial, and test report. Subscriptions, federation, and persisted operations are conceptual topics, not live features of the included API.

## Assessment rubric

| Criterion | Points |
| --- | --- |
| Correct schema and executable documents | 30 |
| Precise nullability, input, and error semantics | 20 |
| Workflow and safe retry guidance | 20 |
| Pagination and authorization | 15 |
| Writing and information architecture | 10 |
| Evidence and limitations | 5 |

## Model answer

### Overview and transport

ShopVerse exposes GraphQL at `http://localhost:3000/graphql`. Use a JSON POST body containing query and variables, with operationName when a document contains multiple operations. Send Content-Type: application/json and an Accept header supporting application/graphql-response+json and application/json. GraphQL execution requires the pinned graphql and graphql-http dependencies; `/health` reports whether they loaded.

Public product queries need no token. Customer operations use the same synthetic bearer identities as REST. Authorization depends on the selected operation and resource ownership, not merely the fact that all requests share an endpoint. The runtime uses GraphQL.js 16.11.0 and graphql-http 1.22.4. The documented core baseline is October 2021; the transport reference is a working draft, not a claim that every newer feature is implemented.

### First product query

```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price { amountMinor currency }
    priceBeforeMarkdown { amountMinor currency }
    availability
  }
}
```

Variables:

```json
{"id":"prod_1001"}
```

After reset, the selected response is:

```json
{
  "data": {
    "product": {
      "id": "prod_1001",
      "name": "Wireless Headphones",
      "price": {"amountMinor":249900,"currency":"INR"},
      "priceBeforeMarkdown": {"amountMinor":299900,"currency":"INR"},
      "availability":"IN_STOCK"
    }
  }
}
```

The response does not contain every Product field; it follows this selection. With prod_1002, priceBeforeMarkdown is null. Explain that null means no original price is recorded, not a zero discount or a missing current price.

### Schema reference sample

| Element | Contract | Consumer guidance |
| --- | --- | --- |
| Product.id | ID! | Opaque identifier; do not infer a sequence contract. |
| Product.price | Money! | Current INR minor units. |
| Product.priceBeforeMarkdown | Money | Nullable original price, at least current price when set. |
| Product.variants | [ProductVariant!]! | Read-only examples; checkout still accepts productId. |
| UpdateProductInput | Optional fields | Omission preserves; null clears only priceBeforeMarkdown. Empty updates fail. |
| DateTime | Custom scalar | Canonical UTC YYYY-MM-DDTHH:mm:ss.sssZ representation. |
| Order.items | [OrderItem!]! | Captured names and prices at order creation. |

Explain list wrappers at both levels. `[Product!]!` permits an empty list but not a null list or null item. Execution errors can propagate through non-null positions to a nullable boundary. A required input and a non-null output have different reader implications even though both use `!`.

### Pagination guide

```graphql
query Browse($first: Int!, $after: String) {
  products(first: $first, after: $after, sort: PRICE_ASC) {
    edges { cursor node { id name } }
    pageInfo { hasNextPage endCursor }
    totalCount
  }
}
```

Start with variables {"first":2}. If hasNextPage is true, pass endCursor unchanged as after in the next request while preserving filters and sorting. Stop when hasNextPage is false. The limit is 1-100, default 20 when the schema argument is omitted. These offset-backed cursors are scope-bound but not durable snapshots; collection changes may move positions. Connection types are this API's convention, not a GraphQL core requirement.

### Mutation reference sample

```graphql
mutation AddItem($input: AddCartItemInput!) {
  addCartItem(input: $input) {
    cart { id status items { id productId quantity } total { amountMinor currency } }
  }
}
```

After reset, use {"input":{"cartId":"cart_1001","productId":"prod_1001","quantity":1}} with the owner customer token. The cart must be ACTIVE and the product available. Duplicate products cause a conflict; use updateCartItem with the returned item ID to replace quantity. Quantity is 1-99; zero does not remove an item.

Success fields are returned in a typed payload. Business failures use the top-level errors array with local extensions, not an invented userErrors payload field. Selecting fewer fields does not reduce the business side effects of the mutation.

### Purchase workflow

Run createCart and save its returned ID. Add prod_1001 with quantity 1. Run createOrder with that cart ID, a synthetic IN address, and a stable idempotencyKey. Select order { id status total { amountMinor currency } } and replayed. Retrieve the order by its returned ID and verify CONFIRMED. The cart is now CHECKED_OUT.

Keep the same key and identical details when retrying an uncertain outcome. An identical retry returns the saved order with replayed true; changed details conflict. The key is scoped to the customer and retained only until reset/restart. A new genuine order intent needs a distinct key.

A client normally performs these dependent requests in sequence because it needs the prior response's identifier. Serial top-level mutation execution does not automatically pipe result values into later inputs and does not provide transactional rollback.

### Errors and partial data

```graphql
query PublicAndPrivate {
  product(id: "prod_1001") { id name }
  me { id name }
}
```

Without a token, public product data succeeds while me is null with an error at path ["me"]. The client can still use the product for a public card. Supply the customer token to retrieve the profile. An unknown selected field is a document-validation failure; a well-typed quantity of 100 is a business-validation failure. Explain these stages separately.

Do not assume every response is HTTP 200. Inspect actual transport status and the GraphQL envelope. An extensions.httpStatus value is business metadata, not proof that the HTTP response uses that status. Avoid exposing stack traces in public examples.

### Verification and portfolio note

Build the SDL, validate each operation, execute success and intentional-error examples, and test ownership, nullability, cursor scope, and idempotency. Record environment limitations honestly. The supplied automated tests include GraphQL execution checks that run after dependency installation; a skipped runtime test is not a pass.

This package demonstrates GraphQL technical writing for a fictional educational API. It includes schema explanations, operation documents, integration guidance, and maintenance considerations. It does not claim real-marketplace affiliation, production authentication, streaming subscriptions, or federated execution.

## Final review

Check that each variables object matches its operation declaration, every response matches its selection set, and all advertised fields exist in the live schema. Keep illustrative interfaces, unions, federation, and subscription examples visibly separate from executable operations.
