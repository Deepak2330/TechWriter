# Review security requirements

## Scenario

An API defines global bearer security, but public product reads should not require it.

This lab uses the fictional ShopVerse project. Read [lesson 24](#/lesson/l24) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
security:
  - DemoBearer: []
```

## Your task

Write the global security scheme and the public-operation override. Explain why documentation does not enforce access.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Use an HTTP bearer security scheme for the local demo and security: [] on public reads. Do not declare fake OAuth scopes on a bearer scheme.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Define DemoBearer as type http and scheme bearer. The operation-level empty security list makes the product read public despite a global requirement. For private operations, describe role and ownership separately and enforce them in the server. OpenAPI metadata informs tooling but does not perform authentication or authorization.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
