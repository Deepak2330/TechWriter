# Operation name

## Task and prerequisites

State the purpose, endpoint, role, data state, and whether this is live or illustrative.

## Document

```graphql
query GetProduct($id: ID!) {
  product(id: $id) { id name }
}
```

## Variables

```json
{"id":"prod_1001"}
```

## Inputs and constraints

Explain requiredness, defaults, omission versus null, and business validation beyond SDL types.

## Selected response

Show a result matching the exact selection set. Explain nullable positions, generated IDs, and aliases.

## Failures

Distinguish parsing, document validation, variable coercion, authorization, and execution errors. Include partial data when applicable.

## Side effects and recovery

For mutations, document state transitions and idempotency. Do not equate selection size with side-effect scope.

## Related schema elements

Link to relevant types, inputs, enums, custom scalars, and workflow guidance.
