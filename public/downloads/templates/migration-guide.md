# Migrate an integration

## Who is affected

Identify versions, operations, fields, clients, and assumptions that change.

## Old and new behavior

Use a comparison table with types, limits, nullability, permissions, and side effects. Do not assume a rename preserves semantics.

## Migration steps

Inventory usage, update requests and response handling, revise validation, add tests, and deploy under the confirmed rollout policy.

## Before and after

Include matching request/response or query/variables examples. Label legacy examples that are no longer executable.

## Verification

Test boundaries, null/empty values, new enum members, errors, and compatibility during the transition window.

## Rollout and recovery

Use verified dates and ownership. Explain rollback or support routes. Mark unresolved decisions rather than inventing answers.
