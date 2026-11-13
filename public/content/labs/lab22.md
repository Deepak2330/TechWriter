# Review an enum change

## Scenario

A proposed release adds PREORDER while an integration treats every unknown availability value as IN_STOCK.

This lab uses the fictional ShopVerse project. Read [lesson 43](#/lesson/l43) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
enum Availability { IN_STOCK OUT_OF_STOCK PREORDER }
```

## Your task

Write a compatibility note, two migration actions, and one blocking SME question. Keep this separate from the live schema.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Identify exhaustive/unsafe fallback handling, update UI and tests, and confirm preorder cart/order rules. Do not claim the proposal is deployed.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The new output value can affect consumers that assume only two cases or map unknown values to purchasable stock. Add explicit PREORDER handling and tests for unrecognized future values. Confirm whether preorder products may be added or ordered and what fulfillment expectations apply. Label the changed enum as a proposed exercise contract until implementation and release scope are confirmed.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
