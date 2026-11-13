# Capture a reproducible HTTP exchange

## Scenario

A reviewer cannot tell whether a response screenshot came from the documented request.

This lab uses the fictional ShopVerse project. Read [lesson 5](#/lesson/l05) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
curl -i http://localhost:3000/api/v1/products/prod_1001
```

## Your task

Run the request after a reset and write a short evidence record including method, URL, status, media type, and three business fields.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Use an actual response when the server runs. Label copied examples as examples otherwise. Explain INR minor units and do not treat request timing as a stable contract.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

After reset, GET retrieves prod_1001 with HTTP 200 and a JSON representation. Record id prod_1001, name Wireless Headphones, and price {amountMinor:249900,currency:"INR"}. Explain that 249900 is INR 2,499.00. Include the response Content-Type and ETag observed in the run, but do not invent a measured duration or claim an unexecuted request was tested.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
