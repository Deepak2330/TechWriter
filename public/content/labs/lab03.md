# Repair a JSON request body

## Scenario

A writer copied a JavaScript object literal into a JSON request editor.

This lab uses the fictional ShopVerse project. Read [lesson 6](#/lesson/l06) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
{productId: 'prod_1001', quantity: 1,}
```

## Your task

Correct the JSON and explain each syntax repair. Then identify one business constraint that valid JSON alone does not enforce.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Property names and strings use double quotes; remove the trailing comma. Retain a numeric quantity, not a quoted number. Mention the 1-99 bound.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

The corrected body is {"productId":"prod_1001","quantity":1}. JSON requires double-quoted names and strings and forbids trailing commas. The parser accepts many numeric values, but ShopVerse requires an integer quantity from 1 through 99. Syntax validity therefore does not prove business validity.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
