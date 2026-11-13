# Write a query with variables and aliases

## Scenario

A product comparison needs two products without two indistinguishable response keys.

This lab uses the fictional ShopVerse project. Read [lesson 31](#/lesson/l31) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
query Compare($first: ID!, $second: ID!) {
  first: product(id: $first) { id name }
  second: product(id: $second) { id name }
}
```

## Your task

Provide valid variables, the expected response keys, and a note about alias names in error paths.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Use prod_1001 and prod_1002 in JSON strings. Explain first and second are aliases, not schema fields or product IDs.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Variables are {"first":"prod_1001","second":"prod_1002"}. The data object contains first and second keys holding the selected products. The aliases change response names without changing the underlying product field. If one lookup fails, the error path uses its response alias, helping the client associate the failure with the correct comparison slot.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
