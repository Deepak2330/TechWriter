# Authentication and authorization

## Supported mechanism

Describe the actual scheme. ShopVerse uses fixed local bearer tokens for synthetic actors, not production OAuth or JWT validation.

## Obtain credentials

For a real API, describe the approved acquisition flow and environments. For the demo, list only documented synthetic tokens.

## Send credentials

```http
Authorization: Bearer demo-customer-token
```

## Permissions and ownership

Map tasks to roles/scopes and ownership. Distinguish missing credentials from insufficient permissions.

## Security guidance

Do not place production secrets in source, URLs, logs, notes, or browser storage. Document expiration, rotation, and revocation only when implemented.

## Failure and recovery

Explain observed 401/403 behavior and how to correct it. Never recommend bypassing access controls.

## OAuth appendix when applicable

Specify flow, redirect validation, PKCE, scopes, and token handling from verified provider documentation. Keep conceptual examples separate from the local demo.
