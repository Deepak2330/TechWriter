# Write an endpoint reference

## Scenario

A teammate gives you the add-cart-item operation but no prose reference.

This lab uses the fictional ShopVerse project. Read [lesson 13](#/lesson/l13) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
POST /api/v1/carts/{cartId}/items
{"productId":"prod_1001","quantity":1}
```

## Your task

Create a reference with purpose, access, path/body table, success behavior, and three relevant failures.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Explain owner/admin access, ACTIVE state, quantity 1-99, duplicate conflict, and the 201 response containing the updated cart. Include returned item IDs.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The operation adds an available product not already in an ACTIVE cart. cartId is a required path ID; productId and quantity are required body fields. Success is 201 with the updated Cart. Missing authentication, wrong-owner access, invalid quantity, duplicate product, closed cart, and out-of-stock product require distinct recovery guidance. Use updateCartItem for quantity changes and a new cart after checkout.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
