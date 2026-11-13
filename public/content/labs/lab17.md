# Explain four GraphQL list types

## Scenario

A schema review confuses empty lists with null lists.

This lab uses the fictional ShopVerse project. Read [lesson 30](#/lesson/l30) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
[Product]
[Product!]
[Product]!
[Product!]!
```

## Your task

Create a four-row table showing whether the list itself and an item may be null. State whether an empty list is permitted.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

All four permit an empty list. Place each non-null rule at its correct wrapper level. Explain that execution failures can propagate through non-null positions.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

[Product] permits a null list and null items. [Product!] permits a null list but not null items. [Product]! forbids a null list but permits null items. [Product!]! forbids both. Empty lists are valid for all four; list cardinality constraints are separate business rules.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
