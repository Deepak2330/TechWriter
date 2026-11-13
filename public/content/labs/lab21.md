# Document a GraphQL mutation

## Scenario

A mutation page lists input types but omits state requirements and duplicate behavior.

This lab uses the fictional ShopVerse project. Read [lesson 39](#/lesson/l39) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
mutation Add($input:AddCartItemInput!) { addCartItem(input:$input) { cart { id items { id quantity } } } }
```

## Your task

Write the missing reference prose and variables for the seed cart. Include the correct operation for changing quantity.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Customer owner/admin, ACTIVE cart, available product, quantity1-99, duplicate conflict, returned item ID, updateCartItem for replacement.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Use {"input":{"cartId":"cart_1001","productId":"prod_1001","quantity":1}} after reset with the owner token. Adding an existing product fails; it does not increment quantity. Save the returned item ID and use updateCartItem to replace quantity. A checked-out cart requires a new cart rather than a retry of the same mutation.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
