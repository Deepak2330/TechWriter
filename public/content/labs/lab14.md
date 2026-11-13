# Separate presence from null

## Scenario

A writer assumes excluding a field from required makes null valid.

This lab uses the fictional ShopVerse project. Read [lesson 23](#/lesson/l23) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
{"type":"object","properties":{"priceBeforeMarkdown":{"$ref":"#/components/schemas/Money"}}}
```

## Your task

Explain the mistake and write an OpenAPI 3.1 schema allowing the property to be absent or null or a valid Money object.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Use a null alternative in the value schema and omit the name from required when absence is allowed. Do not add the OpenAPI 3.0 nullable shortcut.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Use anyOf with a Money reference and {"type":"null"} for the property. Leave priceBeforeMarkdown out of the object-level required array to permit absence. These are independent decisions. For the actual Product response, the property is required but nullable, so include it in required while retaining the null alternative.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
