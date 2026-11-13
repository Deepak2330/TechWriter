# Verify an order workflow

## Scenario

A tutorial hard-codes every generated identifier and says checkout charges a card.

This lab uses the fictional ShopVerse project. Read [lesson 15](#/lesson/l15) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
GET product -> POST cart -> POST cart item -> POST order -> GET order
```

## Your task

Write the five-step workflow using returned IDs. Include a success check and an honest limitation statement.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Use the customer token, carry cart/order IDs, include Idempotency-Key, verify CONFIRMED and CHECKED_OUT, and exclude payment claims.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Retrieve an available product, create a cart, add the product using the returned cart ID, create an order with a stable key and synthetic address, then retrieve the returned order ID. Check its status and total and the closed cart state. The demo records an in-memory order only; no card charge, tax computation, stock reservation, or shipment creation occurs.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
