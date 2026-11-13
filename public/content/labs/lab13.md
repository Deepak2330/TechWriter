# Repair an OpenAPI operation

## Scenario

A path parameter is optional and a request body was placed in the query parameter list.

This lab uses the fictional ShopVerse project. Read [lesson 22](#/lesson/l22) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
paths:
  /products/{productId}:
    patch:
      parameters:
        - name: productId
          in: path
          required: false
```

## Your task

Correct the path parameter and add a JSON requestBody with ProductPatch and a 200 Product response.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Path productId is required with a string schema. Use requestBody/content/application~1json structurally, not a body parameter. Resolve component references.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Set required: true on productId and give it schema type string. Add required requestBody with application/json content referencing ProductPatch. Under responses, describe 200 and reference Product for its JSON schema. Include demo bearer security and relevant failure responses. Validate the full document; a standalone fragment is not itself a complete OpenAPI description.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
