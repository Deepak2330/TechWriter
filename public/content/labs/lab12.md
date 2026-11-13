# Document conditional GET

## Scenario

A client repeatedly downloads an unchanged product representation.

This lab uses the fictional ShopVerse project. Read [lesson 19](#/lesson/l19) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
GET /api/v1/products/prod_1001
If-None-Match: REPLACE_WITH_RETURNED_ETAG
```

## Your task

Retrieve the product, copy its ETag, make a conditional request, and explain the no-body response.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Use an actual returned validator. Expect 304 for a match. Explain reuse of the cached representation and avoid calling response.json() on the empty body.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The first GET returns the product and an ETag. The second request supplies that exact validator in If-None-Match and receives 304 when the representation is unchanged. The client keeps its cached body. If the product changes, a later conditional request can return 200 with a new body and validator. The tag is opaque, not a product version to increment manually.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
