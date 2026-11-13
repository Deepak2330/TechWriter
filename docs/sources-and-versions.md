# Sources, versions, and project scope

## What this project is

API Documentation Academy is an original self-study course using ShopVerse, a fictional marketplace. It is not affiliated with Amazon or Flipkart. Examples are synthetic and local. The course is a broad practical foundation, not an exhaustive catalogue of every vendor-specific API feature.

The website uses HTML, CSS, and vanilla JavaScript. A small Node.js server implements REST and shares business services with a real GraphQL engine. The browser never substitutes stored examples for live API responses. A standalone HTML reader supports lessons, search, quizzes, bookmarks, notes, and progress without a server.

## Selected baselines

| Component | Selected version / status | Notes |
| --- | --- | --- |
| Node.js | 22 or later | Build and REST tests use built-in Node APIs. Build environment: 22.16.0. |
| OpenAPI | 3.1.1 | Deliberately selected baseline, not a claim of being the latest edition. |
| GraphQL core teaching baseline | October 2021 | Compatible foundational features used by GraphQL.js 16.11.0; newer editions exist. |
| GraphQL.js | 16.11.0 | Pinned real parser, validator, and executor. |
| graphql-http | 1.22.4 | Pinned Node HTTP adapter. |
| GraphQL over HTTP | Working draft | Transport guidance is distinct from the core GraphQL specification. |
| Playwright | 1.56.1 | Optional development dependency for browser tests; browser installation is separate. |
| Prism | 1.30.0 | Vendored syntax highlighter with MIT license; no CDN needed. |
| Accessibility target | WCAG 2.2 AA | Design target, not a conformance certification. |

Official specification entry points and package source APIs were consulted on 13 November 2026. Chosen baseline versions should not be relabelled latest. The lockfile pins dependencies, but installation still requires access to the npm registry unless packages are already cached.

## Primary references

- [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html)
- [Problem Details, RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html)
- [OAuth security best current practice, RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html)
- [OpenAPI specification editions](https://spec.openapis.org/oas/)
- [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html)
- [OpenAPI learning material](https://learn.openapis.org/)
- [JSON Schema documentation](https://json-schema.org/learn/)
- [GraphQL specification editions](https://spec.graphql.org/)
- [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/)
- [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/)
- [GraphQL learning material](https://graphql.org/learn/)
- [GraphQL.js 16.11.0 source](https://github.com/graphql/graphql-js/tree/v16.11.0)
- [graphql-http 1.22.4 source](https://github.com/graphql/graphql-http/tree/v1.22.4)
- [MDN web documentation](https://developer.mozilla.org/)
- [Official Git documentation](https://git-scm.com/doc)
- [Diataxis documentation framework](https://diataxis.fr/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

Lesson pages include relevant reference links. The explanations and exercises are original teaching material, not copied specification text.

## Live versus illustrative coverage

Live REST includes 24 operations for products, categories, profiles, carts, orders, shipments, reviews, and returns. Live GraphQL exposes seven query root fields and eleven mutation root fields through a real engine after dependency installation. Both use the same synthetic in-memory store and business constraints.

Subscriptions, federation, webhook delivery, multipart uploads, production OAuth, persisted operations, database batching, and distributed rate limiting are explained conceptually or through labelled illustrative examples. They are not advertised as implemented local features. The maintenance capstone's proposed fields and enum changes are also separate from the live contract.

The OpenAPI explorer is a custom local renderer with schema inspection, operation references, downloads, and linked live request forms. It is not Swagger UI. The JavaScript frontend uses a constrained safe Markdown renderer and a display-only SDL metadata extractor; neither is used as a substitute for GraphQL execution.

## Safety and deployment boundary

The server binds to loopback and rejects unexpected hosts and cross-origin browser requests. Requests are bounded to 64 KiB. Use only synthetic demo tokens and data. No payment processing, persistent database, real shipment creation, inventory reservation, or public-service hardening is provided. Do not deploy this server as a production commerce system.

Progress is browser-local and separate from authentication. Tokens are selected from a fixed in-memory demo list and are not saved in localStorage. Export notes and progress for backup. Moving between file://, localhost, and a hosted static site can use different storage origins.

## Verification scope

See docs/testing-report.md in the full source package for commands and actual results. Runtime dependencies could not be installed inside the build environment because its package-network access was unavailable. REST, content/build, schema-example, and browser checks can run independently. GraphQL runtime checks are included and must be run after dependency installation; skipped tests are not counted as passes.

The built-in contract checker covers the schema features used by this project and OpenAPI structural checks. It is not a replacement for a complete third-party OpenAPI conformance validator. Browser checks do not constitute a full WCAG audit.
