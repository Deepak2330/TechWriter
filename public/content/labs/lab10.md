# Test ownership rather than token presence

## Scenario

The reference says any bearer token can retrieve any cart.

This lab uses the fictional ShopVerse project. Read [lesson 17](#/lesson/l17) before starting. For state-changing requests, start from a known dataset and record any setup steps. Keep your draft in your own source file or lesson notes; a saved browser note is not a substitute for a portfolio backup.

## Starter material

```text
GET /api/v1/carts/cart_1001
Authorization: Bearer demo-other-customer-token
```

## Your task

Compare anonymous, owner, other-customer, and administrator requests and write an authorization note.

## Expected deliverable

Submit a short Markdown page with the corrected explanation or sample, a test/evidence note, and any unresolved questions. Distinguish exact executed output from illustrative fragments. Include enough context for another learner to reproduce your work without asking which token, identifier, or environment you used.

## Acceptance criteria

Distinguish 401 from 403 in this demo. Use only synthetic tokens. Do not generalize the policy to all APIs.

The writing should be task-focused, consistent with the reference, and free of invented capabilities. Check links and field names. Automated checks can verify structure and code, but use the rubric below to assess the explanation.

## Self-review rubric

| Area | Points |
| --- | --- |
| Technical correctness and scope | 4 |
| Complete, reproducible explanation | 3 |
| Reader-focused wording and recovery guidance | 2 |
| Honest evidence and remaining questions | 1 |

## Model answer

Anonymous access fails authentication. The owner token retrieves the cart. The other customer is authenticated but forbidden. The administrator is permitted. The reference should say owner or administrator, not merely bearer token required. Production services may choose other resource-disclosure policies, so document the behavior of this implementation.

## Why common alternatives fail

A schema type or successful request alone does not explain every business rule. Avoid copying response values without their setup assumptions, treating an illustrative extension as live, or claiming a check ran when it did not. Compare the sample with the current contract, then test the relevant boundary or failure case rather than relying only on a happy path.

## Review and next step

Compare your draft with the model answer for reasoning and completeness, not identical wording. Record one change you made after review and the evidence that justified it. Return to [practice labs](#/labs) or continue the related lesson.
