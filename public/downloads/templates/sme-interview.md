# SME interview record

## Context

Record feature, audience, reviewer role, date, environment, and intended release.

## Business behavior

What task does this operation support? What state must exist? What changes on success? What does it explicitly not do?

## Inputs and outputs

Which fields are required, nullable, defaulted, constrained, or enum-like? What units and timezones apply? Which values are generated?

## Access and reliability

Who may call it and whose resources may they access? What happens on duplicates, timeouts, retries, and concurrent changes?

## Errors and evolution

What exact failures occur? Which are recoverable? Is the change compatible with strict or exhaustive clients? What is the deprecation policy?

## Decision log

| Question | Answer | Evidence | Owner | Status |
| --- | --- | --- | --- | --- |
| Specific observable question | Confirmed or pending | Test/contract/review link | Responsible person | Open/confirmed |

Do not silently convert intended future behavior into current supported behavior.
