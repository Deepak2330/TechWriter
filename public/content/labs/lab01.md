# Plan the product-card documentation

## Scenario

A frontend developer needs to display a product name, current price, and optional original price. The draft contains only a list of URLs.

This lab uses the fictional ShopVerse project. Read [lesson 1](#/lesson/l01) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
GET /api/v1/products/prod_1001
price.amountMinor = 249900; currency = INR; priceBeforeMarkdown may be null.
```

## Your task

Write an audience statement, one observable learning outcome, and a three-page documentation plan.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Name the developer task, state the local setup, and separate a quickstart from a reference. Include a null-price explanation and a synthetic-marketplace disclaimer.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The audience is a developer building a product card with basic HTTP knowledge. The outcome is a successful product request and correct INR price display, with no original-price label when the value is null. Use Overview and setup, First product request, and Product reference as the three pages. Link the quickstart to the complete field table rather than placing every contract detail in the opening steps.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
