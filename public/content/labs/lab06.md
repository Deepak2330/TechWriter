# Document collection boundaries

## Scenario

A product-listing page names limit and offset but does not state bounds or sorting behavior.

This lab uses the fictional ShopVerse project. Read [lesson 11](#/lesson/l11) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
GET /api/v1/products?limit=2&offset=0&sort=PRICE_ASC
```

## Your task

Write the parameter table and a next-page instruction. Add a negative test for an invalid limit.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Limit defaults to 20 and accepts 1-100. Offset is nonnegative. Sorting includes an ID tie-breaker. Do not promise a consistent snapshot during catalogue changes.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Use limit 2 and offset 0 for the first page, then offset 2 for the next. Explain that total counts matching products, not returned items. A limit of 101 is invalid and should produce a client error rather than silent clamping. Because catalogue changes can move offsets, a multi-page read is not a frozen snapshot.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
