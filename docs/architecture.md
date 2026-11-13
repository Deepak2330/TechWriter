# Architecture

## Layers

1. **Content source:** Markdown lessons/labs/capstones and JSON manifests, questions, and glossary entries.
2. **Contracts:** REST route metadata plus reusable JSON Schema models; canonical GraphQL SDL.
3. **Business services:** a synthetic in-memory marketplace that validates inputs, enforces ownership and transitions, snapshots orders, and retains idempotency results.
4. **Transport:** a small native Node HTTP server routes REST requests and wraps the real graphql-http handler. GraphQL root resolvers call the same services as REST.
5. **Presentation:** semantic HTML, custom CSS, vanilla JavaScript, safe constrained Markdown rendering, and vendored Prism highlighting. No CDN, UI framework, or telemetry is used.
6. **Build:** generates OpenAPI JSON/YAML, fixtures, cURL/fetch examples, Postman, downloadable notes, an embedded content bundle, and the standalone/static outputs.

## Source-of-truth map

| Material | Edit here | Derived output |
| --- | --- | --- |
| Lessons | `public/content/lessons/*.md` | course bundle, combined notes |
| Course navigation | `public/data/course-manifest.json` | sidebar, learning path, coverage table |
| Business behavior | `server/services/commerce.js` | shared REST/GraphQL results |
| REST operation metadata | `server/routes.js` | routing, references, OpenAPI operations |
| REST schema models | `server/schemas.js` | OpenAPI components, reference field tables |
| GraphQL contract | `public/contracts/schema.graphql` | actual engine schema, display metadata |
| GraphQL behavior | `server/graphql/index.js` | resolvers, scalar behavior, cursor convention |
| Question/exercise material | `public/data/*.json` | interactive quizzes and reference screens |
| UI behavior | `public/js/core.js`, `public/js/app.js` | browser interactions |
| UI design | `public/css/styles.css` | responsive/dark/print layouts |

## Important choices

The frontend uses ordered classic scripts to support a self-contained file-origin reader without module-fetch restrictions. Backend code uses native ES modules. The build copies data into `window.COURSE` with script-safe escaping. Static reading never pretends that stored fixtures are actual API responses.

Progress lives under `api-academy-progress-v1` and has a validated versioned structure. Unknown lesson IDs and invalid quiz values are dropped during import. Notes are escaped as text. Credentials are neither imported nor stored in that state. There is no automatic server sync.

REST pagination uses offset/limit; GraphQL uses forward cursor connections. The cursor wraps an offset with filter/sort/identity scope, not a stable historical snapshot. This limitation is explained in the course. Monetary bounds keep totals inside GraphQL's signed 32-bit Int range: INR-only unit prices at most 1,000,000, quantity at most 99, and at most 10 distinct cart products.

Orders store immutable item/price snapshots. Active carts use current catalog prices; checked-out carts preserve snapshots. Idempotency is scoped to customer/key and lasts only until local restart/reset. The demo deliberately has no persistent database, transaction isolation across services, stock reservation, or real payment gateway.

The display-only SDL extractor produces schema-reference tables. It is not a GraphQL parser used for execution. The real engine handles parsing, validation, variable coercion, resolver execution, null propagation, and the result envelope.

## Runtime boundaries

Loopback binding, host/origin checks, request-size limits, fixed role tokens, constrained requests in the browser playground, and safe text rendering reduce accidental exposure. These measures do not make the demo production-ready. The server is not an open proxy and does not send user-selected webhook requests.

Read `testing-report.md` for checks actually performed and remaining validation work.
