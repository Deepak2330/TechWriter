# Verification report

Date: 13 November 2026. Platform: Linux, Node.js 22.16.0, Python 3.13, managed Chromium.

## Results actually obtained

| Area | Result | Evidence / scope |
| --- | --- | --- |
| Build | Passed | `npm run build` produced the bundled course, source downloads, `dist/`, and standalone HTML. |
| Structural and content checks | 1,119 passed | Lesson sections, counts, internal content links, JavaScript syntax, OpenAPI structure and references. `qa/content-checks.txt`. |
| Example validation | 165 passed | All request/response examples emitted in the OpenAPI document, using the project's supported-keyword validator. |
| Independent JSON Schema validation | 165 examples passed; 30 schema definitions valid | Python `jsonschema.Draft202012Validator` with format checking and local reference resolution. `qa/independent-schema-results.json`. |
| OpenAPI serialization | Passed | YAML parsed with PyYAML is deeply equal to the JSON document. |
| Node tests | 49 passed, 8 skipped, 0 failed | `npm test`; 57 tests including nested operation tests. `qa/node-tests.tap`. |
| REST transport | All 24 advertised operations exercised over actual HTTP | Success responses checked against contract schemas. Additional auth, ownership, invalid input, ETag, HEAD, media type, idempotency, origin, reset, and availability tests. |
| GraphQL execution | Not run | Eight tests explicitly skipped because GraphQL packages could not be installed. |
| Static browser QA | 154 passed; no uncaught page errors | Actual standalone HTML rendered in Chromium using `set_content`. `qa/static-browser-results.json`. |
| Full browser/server suite | Not run end to end | Included as `tests/browser.js`; package access and managed browser URL restrictions prevented a normal installed-dependency run. |

The validation results are not a claim that every OpenAPI requirement or every accessibility criterion was audited. The built-in checker is deliberately scoped to the schema features used by the project. An independent JSON Schema check is not the same as full OpenAPI conformance validation.

## Browser methodology and limitations

Managed Chromium blocked URL navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. Its policy was not modified or bypassed. The actual built standalone HTML was loaded as document content using Playwright's `set_content` for visual and interaction testing.

An opaque content origin does not support ordinary persistent localStorage. A QA-only in-memory implementation was injected before the application scripts to exercise the same progress logic. This stub is not in the delivered application. Its results establish in-session state behavior, not disk persistence across browser restarts or origins.

Verified: desktop rendering, all 48 lesson routes, all 24 lab routes, three capstone routes, 24 REST reference routes, 24 GraphQL operation routes, search, theme switching, explicit completion, bookmarks, notes, quiz feedback, glossary filtering, schema display, download-content presence, safe note rendering, imported identifier filtering, disabled static execution, responsive widths, and mobile navigation.

Not verified in a normal browser session here: downloaded-file saving, clipboard permission behavior, persistent localStorage, imported files through the real file picker, print/PDF output, or browser-to-live-server requests. The included full Playwright suite covers several of these after installation. Clipboard and print behavior still benefit from a manual check in the user's browser.

QA found and corrected a search-dialog Escape issue and a skip-link routing issue. The final static run had no uncaught JavaScript errors and no horizontal page overflow on the checked 390 px mobile routes. Desktop preview: `../docs/preview-desktop.png`.

## Dependency and GraphQL limitations

The environment could inspect official package source APIs through web research but could not download npm packages. Runtime code uses real GraphQL.js 16.11.0 and graphql-http 1.22.4. Those packages are declared and pinned, not replaced with a custom query matcher.

The version lock records the selected package graph; a fresh npm installation was not validated here. Registry integrity hashes were not invented. Complete the installation in a network-enabled environment, which can populate package integrity metadata, then run the provided GraphQL and browser suites.

GraphQL tests cover the product response, validation/coercion errors, partial data, ownership, cursor scope, the purchase workflow, idempotent replay, conditional selections, the DateTime scalar, and the real HTTP adapter. They must pass after installation before representing the GraphQL runtime as verified.

## Reproduction

```sh
npm install
npm run build
npm run check
npm test
npx playwright install chromium
npm run test:e2e
```

Expected with installed dependencies: GraphQL tests no longer skip. Investigate any failure; do not convert failures into mock successes. Full browser results are written to `test-results/`.

## Intentional implementation boundaries

The marketplace has no persistent database, payment processor, inventory reservation, actual carrier integration, production OAuth identity provider, distributed rate limiter, subscription server, federation gateway, arbitrary webhook sender, or multipart upload implementation. These subjects are explicitly taught as conceptual/illustrative extensions. This is a local educational project, not a production commerce service.
