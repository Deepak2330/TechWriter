# Data model reference

## Model purpose

Explain what the object represents and when it is created or returned.

| Field | Type | Presence / nullability | Default | Constraints | Meaning / relationship |
| --- | --- | --- | --- | --- | --- |
| priceBeforeMarkdown | Money / nullable | Present but may be null in Product output | Not an input default | At least current price when set | Original price when recorded |

## Value semantics

Explain units, supported currencies, timezones, enum meanings, empty lists, and opaque IDs.

## Input versus output

Separate caller obligations from response guarantees. Document read-only and write-only behavior where applicable.

## Relationships and permissions

State access rules, lifecycle dependencies, and whether nested values are current or historical snapshots.

## Examples and validation

Provide valid, null/empty, and relevant invalid examples. Validate them against the correct schema version.
