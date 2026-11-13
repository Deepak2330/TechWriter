# API writer's cheat sheets

## REST reference essentials

For every operation, answer: what task, which method/path, who may call it, what input, which constraints, what changes, what response, what failure, and how to recover?

GET retrieves; POST performs resource-specific processing; PUT replaces; PATCH partially modifies; DELETE removes the association. Safety and idempotency concern intended semantics, not identical response bytes. Define the actual API behavior instead of relying on a method name alone.

## Common HTTP distinctions

200 returns a successful representation; 201 indicates creation and may supply Location; 204 has no body; 304 supports conditional reuse without a new representation body. 400 identifies an invalid request; 401 concerns authentication; 403 concerns permission; 404 indicates not found under the service's disclosure policy; 409 identifies a conflict; 415 rejects an unsupported request media type; 429 communicates throttling or the local demonstration of it.

Inspect Content-Type before assuming JSON. Fetch normally resolves for HTTP errors: inspect response.ok/status. Network failure or cancellation does not prove a write did not reach the server.

## OpenAPI 3.1 reminders

```yaml
openapi: 3.1.1
info:
  title: Example
  version: 1.0.0
paths:
  /products/{productId}:
    get:
      operationId: getProduct
      parameters:
        - name: productId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Product retrieved
```

This is a minimal instructional fragment, not the full ShopVerse contract. Add response content, schemas, security, errors, and useful descriptions for a real reference.

Object-level required controls presence. A null type alternative controls null values. Examples are not defaults. oneOf means exactly one match; anyOf means at least one; allOf means every subschema. Validate referenced components and examples, not only YAML syntax.

## GraphQL syntax

```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    name
    price { amountMinor currency }
  }
}
```

Variables are separate JSON: {"id":"prod_1001"}. A document's name is GetProduct; its root field is product. Alias syntax changes a response key. Fragments reuse selections. Directives such as @include can omit a field from the response; omission is not null.

## GraphQL list wrappers

| Type | List may be null | Items may be null | Empty list allowed |
| --- | --- | --- | --- |
| [Product] | Yes | Yes | Yes |
| [Product!] | Yes | No | Yes |
| [Product]! | No | Yes | Yes |
| [Product!]! | No | No | Yes |

## Failure stages

Invalid JSON is an HTTP-envelope problem. Invalid GraphQL syntax fails parsing. Unknown fields fail schema validation. Incompatible variable values fail coercion. Resolver/business failures happen during execution and may produce partial data. Inspect actual HTTP status and the data/errors envelope; do not assume all GraphQL responses use 200.

## Documentation review reminders

Verify units, defaults, nullability, enum members, permissions, ownership, state transitions, duplicate behavior, retries, and pagination consistency. Label live, illustrative, intentional-error, excerpt, and template examples. Never invent release dates, official affiliations, or passing tests.
