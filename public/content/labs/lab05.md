# Compare product PUT and PATCH

## Scenario

The draft says both methods accept any subset of product fields.

This lab uses the fictional ShopVerse project. Read [lesson 10](#/lesson/l10) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
PATCH /api/v1/products/prod_1001
{"name":"Travel Headphones"}
```

## Your task

Write a method comparison and construct one valid PATCH and one valid PUT body for the seeded product.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

PATCH preserves omitted fields. PUT supplies name, sku, price, availability, and categoryId. Explain optional-field reset behavior in PUT.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The PATCH body can contain only name and leaves existing values intact. A valid PUT body supplies name, sku WH-BLK-01, price {amountMinor:249900,currency:"INR"}, availability IN_STOCK, and categoryId cat_audio. Omitted optional description and priceBeforeMarkdown reset to their replacement defaults. Both writes require the owning seller or administrator.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
