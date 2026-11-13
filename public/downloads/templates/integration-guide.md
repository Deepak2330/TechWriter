# Complete a business task

## Outcome and scope

Define the final observable result and unsupported side effects.

## Prerequisites

List environment, actor, tools, seed state, and permissions.

## Workflow map

```text
Read product -> create cart -> add item -> place order -> verify order
```

## Steps

For each step, include purpose, request, response checks, values to retain, and likely failure recovery. Carry returned identifiers forward instead of guessing sequence values.

## State transitions

Explain what changes after success and which earlier operations are no longer valid.

## Uncertain outcomes

Preserve idempotency information and explain the retention boundary. A client timeout does not prove the server made no change.

## Verify and clean up

State success conditions, safe reset behavior, and what data will be lost. Link to detailed references without forcing constant navigation.
