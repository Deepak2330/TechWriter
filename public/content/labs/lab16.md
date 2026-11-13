# Detect example drift

## Scenario

A response example uses quantity 100 while its schema allows 1-99.

This lab uses the fictional ShopVerse project. Read [lesson 28](#/lesson/l28) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
{"productId":"prod_1001","quantity":100}
```

## Your task

Write a defect report and a validation plan that distinguishes syntax, schema, and runtime checks.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Identify the exact field and boundary, correct the sample or obtain a contract decision, validate examples, and test 99 and 100 separately.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The JSON parses, but quantity violates the published maximum. Report the file/operation, expected 1-99, actual example 100, and reader impact. Confirm the intended contract, update the example to a valid value, and add boundary tests. A runtime check verifies that 99 succeeds under valid preconditions and 100 fails; schema validation checks the same constraint independently.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
