# Write a cursor-pagination loop

## Scenario

A client increments a decoded cursor and changes sorting between pages.

This lab uses the fictional ShopVerse project. Read [lesson 34](#/lesson/l34) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
products(first: 2, sort: PRICE_ASC, after: $after) { edges { cursor node { id name } } pageInfo { hasNextPage endCursor } }
```

## Your task

Write pseudocode that uses returned cursors correctly and document the local consistency limitation.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Begin without after, retain filters/sort, pass endCursor unchanged, stop on hasNextPage false, and avoid a snapshot guarantee.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Fetch the first page with after omitted. Append the returned nodes. While hasNextPage is true, send the returned endCursor unchanged with the same sorting and filters. Start over if the collection scope changes. ShopVerse cursors are offset-backed and not durable snapshots, so catalogue changes can produce repeated or skipped items.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
