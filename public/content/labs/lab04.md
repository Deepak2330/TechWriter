# Write a defensive fetch example

## Scenario

A sample always calls response.json(), even for DELETE success, and treats every fetch resolution as success.

This lab uses the fictional ShopVerse project. Read [lesson 8](#/lesson/l08) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
const response = await fetch(url, options);
const body = await response.json();
console.log("Success", body);
```

## Your task

Rewrite the sample to handle an empty body, HTTP errors, and a network rejection without executing arbitrary entered code.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Check status or response.ok, parse only a nonempty body, preserve useful error information, and explain that an aborted write may already have reached the server.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Use a try/catch around fetch. Read response.text(), parse JSON only when nonempty and appropriate, then check response.ok before reporting success. For a 204, retain a null or absent body instead of forcing JSON parsing. A rejected fetch means the client did not obtain a normal response; it does not by itself prove the server made no change.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
