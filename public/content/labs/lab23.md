# Prepare a documentation pull request

## Scenario

A quantity correction was made only in a generated page and the author claims every test passed.

This lab uses the fictional ShopVerse project. Read [lesson 41](#/lesson/l41) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
Changed: public/js/course-data.js
Claim: all checks passed
Evidence: npm install failed
```

## Your task

Write a review comment requesting the correct source change and an accurate validation report.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Point to the Markdown/schema source, require rebuild and relevant checks, and separate executed from blocked tests without blaming the author.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Please make the correction in the authoritative lesson or schema source and regenerate course-data.js so the next build preserves it. Record the checks that ran and their results. Since dependency installation failed, mark GraphQL execution checks as blocked and include the commands to run them after installation; do not count them as passed.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
