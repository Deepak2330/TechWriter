# Write a Problem Details guide

## Scenario

The API returns fields named type, title, status, detail, instance, code, and fields, but the draft calls all of them standard RFC members.

This lab uses the fictional ShopVerse project. Read [lesson 12](#/lesson/l12) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
{"type":"about:blank","title":"Bad Request","status":400,"detail":"quantity must be an integer from 1 through 99.","instance":"/api/v1/carts/cart_1001/items","code":"INVALID_INPUT","fields":["quantity"]}
```

## Your task

Annotate the response and provide a recovery instruction for the client.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Identify standard members versus ShopVerse extensions. Keep HTTP status consistent with status in the body. Do not recommend unchanged retries for invalid input.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

type, title, status, detail, and instance are standard Problem Details members. code and fields are ShopVerse extensions for stable programmatic handling and input identification. Correct quantity to an integer in the documented range, then resubmit under the same business intent. Do not blindly retry the identical invalid body.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
