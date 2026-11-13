# Prove order idempotency

## Scenario

A client lost the response after placing an order and proposes a new key for every retry.

This lab uses the fictional ShopVerse project. Read [lesson 18](#/lesson/l18) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
Idempotency-Key: lab-order-001
{"cartId":"cart_1001","shippingAddress":{"line1":"10 Example Road","city":"Bengaluru","postalCode":"560001","country":"IN"}}
```

## Your task

Add an item to the seed cart, create the order, replay it identically, then change the address with the same key. Document the three outcomes.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

First creation is 201; replay is 200 with the same order and replay header; changed details conflict. Scope is customer plus key, retained until reset/restart.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The first request records one order and closes the cart. The identical retry uses the retained result and does not create another order. Reusing the same key with a changed address returns 409 IDEMPOTENCY_CONFLICT. Preserve the original key and details for uncertain retries; a new genuine order intent needs a distinct key. Reset or restart removes this protection history.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
