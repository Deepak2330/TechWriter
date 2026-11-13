# Errors and troubleshooting

## Response formats

Describe REST Problem Details or the GraphQL data/errors envelope as appropriate. Identify standard members and local extensions.

## Diagnose by stage

Separate transport failure, authentication, authorization, request validation, business conflict, and unexpected server failure.

| Symptom | Likely cause | Evidence to collect | Recovery |
| --- | --- | --- | --- |
| Invalid quantity | Outside the supported range | Field, value, contract version | Correct input |
| Uncertain order timeout | Response not received | Original key and request details | Retry identical intent with the same retained key |

## Retry policy

State which conditions are retryable, any waiting guidance, limits, and idempotency requirements. Do not retry every error unchanged.

## Escalation

List safe diagnostic data and the support owner. Exclude credentials, private customer information, and stack traces from public reports.
