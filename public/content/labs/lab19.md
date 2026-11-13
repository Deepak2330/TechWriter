# Explain partial data

## Scenario

An anonymous query requests both product and me. A developer discards the entire response when errors exists.

This lab uses the fictional ShopVerse project. Read [lesson 33](#/lesson/l33) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
query Mixed { product(id:"prod_1001") { id name } me { id name } }
```

## Your task

Run without a token and write a troubleshooting note explaining usable data, the missing profile, and recovery.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Expect public product data, nullable me set to null, and a me error path. Do not infer HTTP status solely from extensions.httpStatus.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The public product can be used even though me failed authorization. The nullable profile field is null and the errors array identifies me. Supply the customer demo token to retrieve the profile. Inspect the actual HTTP status separately from the GraphQL envelope; a business status extension is not necessarily the transport status.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
