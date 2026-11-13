# API Documentation Academy

A complete, editable technical-writing learning project built with **HTML, CSS, vanilla JavaScript, and Node.js**. Learn REST, OpenAPI, and GraphQL through **ShopVerse**, a fictional e-commerce marketplace.

ShopVerse is not affiliated with Amazon or Flipkart. Its products, customers, tokens, and transactions are synthetic. Do not use real credentials or personal data.

## Start here

### Read the course immediately: no installation

Open **`standalone.html`** in a modern browser. The lessons, search, glossary, quizzes, templates, and reference examples are embedded in this single file. The same reader is supplied separately as `API_Documentation_Academy.html`.

The reader does not start a server. Live request buttons are intentionally disabled in reading mode. Browser privacy settings can limit file-origin storage; use **My workspace > Export progress** to back up notes and completion state.

### Run the complete project with live API labs

Install Node.js **22 or later**, extract the ZIP, and open a terminal in the extracted `api-documentation-academy` folder:

```sh
npm install
npm run dev
```

Open **http://localhost:3000** in your browser. Keep the terminal running while using the live labs. Stop the server with Ctrl+C.

`npm install` requires package-network access the first time. No database, account, API key, paid service, or environment file is needed. Runtime versions are pinned. See the verification note below: dependency installation could not be completed in the authoring environment.

Addresses:

| Interface | Address |
| --- | --- |
| Course website | `http://localhost:3000` |
| REST API base | `http://localhost:3000/api/v1` |
| GraphQL HTTP endpoint | `http://localhost:3000/graphql` |
| Backend readiness | `http://localhost:3000/health` |
| OpenAPI YAML | `http://localhost:3000/contracts/openapi.yaml` |

The website includes its own REST and GraphQL request forms. `/graphql` is the HTTP endpoint, not a separate GraphiQL application.

Without installed dependencies, `npm run dev` still serves the website and REST API. It reports GraphQL as unavailable and returns an explicit 503 rather than a fake GraphQL result. Install the packages and restart to enable the real engine.

## What is included

| Learning material | Count |
| --- | ---: |
| Course modules | 12 |
| Substantive lessons | 48 |
| Lesson prose, excluding code (approximate) | 39,000 words |
| Practical labs with model answers | 24 |
| Quiz questions with explanations | 60 |
| Glossary entries | 110 |
| Before/after documentation edits | 12 |
| Interview questions with answers | 30 |
| Portfolio capstones with 100-point rubrics | 3 |
| Editable writing templates | 13 |
| REST operations with references | 24 |
| GraphQL query root fields | 7 |
| GraphQL mutation root fields | 11 |
| GraphQL example documents and variable files | 24 |

The course combines detailed notes, annotated examples, writer-focused checklists, exercises, corrections, and complete model answers. It is a broad practical course, not a claim to cover every API vendor or advanced framework.

### Curriculum

1. API technical writing foundations: audiences, documentation types, structure, style, and SME interviews.
2. HTTP, JSON, YAML, cURL, Postman, browser tools, and JavaScript `fetch`.
3. REST resources, HTTP methods, parameters, pagination, statuses, and errors.
4. Endpoint references, product APIs, cart/order integration guides, and troubleshooting.
5. Authentication, authorization, OAuth concepts, reliability, caching, webhooks, and asynchronous patterns.
6. OpenAPI structure, operations, reusable models, and security descriptions.
7. Advanced schemas, callbacks/webhooks, publishing, validation, and contract maintenance.
8. GraphQL fundamentals, SDL, queries, variables, fragments, and mutations.
9. Nullability, partial errors, pagination, custom scalars, HTTP transport, and operational concerns.
10. GraphQL schema documentation, query/mutation references, and workflow guides.
11. Docs-as-code, review, testing, release notes, migration guides, and engineering collaboration.
12. REST, GraphQL, and documentation-maintenance portfolio projects.

### Website features

Search, deep links, light/dark themes, mobile navigation, copyable syntax-highlighted code, model-answer disclosures, print styling, quizzes, bookmarks, lesson notes, manual completion, progress import/export, REST/GraphQL references, an OpenAPI explorer, and actual local API request execution.

The OpenAPI explorer is a custom renderer, not Swagger UI. The GraphQL schema tables are display metadata; actual execution uses GraphQL.js and graphql-http, not the display parser.

## Try the learning APIs

### Read a product

```sh
curl http://localhost:3000/api/v1/products/prod_1001
```

On Windows PowerShell, use `curl.exe` when `curl` resolves to a PowerShell alias. The browser playground is also available without command-line quoting differences.

### Run GraphQL

Open **GraphQL playground**, select **Get a product**, and send the operation after the header shows **Live APIs ready**:

```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price { amountMinor currency }
    priceBeforeMarkdown { amountMinor currency }
    availability
  }
}
```

Variables:

```json
{ "id": "prod_1001" }
```

This selection uses the same product and business data as REST. `amountMinor` is an integer; the demo supports INR. The schema and lessons explain range and currency limitations.

### Demo identities

| Token | Purpose |
| --- | --- |
| `demo-customer-token` | Customer `cust_1001`, owner of seed cart and order |
| `demo-other-customer-token` | Ownership-failure exercises |
| `demo-seller-token` | Seller `seller_1001`, owner of seed products |
| `demo-other-seller-token` | Seller ownership-failure exercises |
| `demo-admin-token` | Administrative operations and lab reset |

Supply protected requests with `Authorization: Bearer <demo-token>`. These fixed tokens are not JWTs or a production OAuth provider. The frontend keeps role selection in memory, not localStorage.

### Purchase workflow

Start with a fresh seed dataset, create a cart or use `cart_1001`, add a product, and then place an order. The order request needs an `Idempotency-Key`. Repeating the identical request with the same customer/key returns the retained result without another order; changing the body with that key produces a conflict. Restart/reset clears retained keys.

Use returned IDs in subsequent requests. Example prerequisites appear beside the request forms. The Postman collection is a set of reusable examples, not an assumption that every operation can be run sequentially against unchanged state.

### Reset API data

Click **Reset demo data** in a playground and confirm. Alternatively:

```sh
curl -X POST http://localhost:3000/lab/reset -H "Authorization: Bearer demo-admin-token"
```

All API data is in memory. Resetting or restarting restores the seed data and clears idempotency history. It does not erase browser learning progress. **My workspace > Reset learning progress** is a separate confirmed action.

## Build, edit, and test

```sh
npm run build
npm run check
npm test
```

`build` regenerates contracts, reference fixtures, request examples, Postman files, the content bundle, `dist/`, and `standalone.html`. It requires Node but no installed runtime packages. The ZIP does not include the redundant `dist/` directory; generate it with this command.

`check` checks content structure, internal lesson links, JavaScript syntax, OpenAPI references and examples, and GraphQL documents when its dependencies are installed. The built-in validator covers the schema keywords used here; it is not a full OpenAPI conformance validator.

`test` runs shared-service, REST HTTP, and GraphQL tests. GraphQL tests explicitly skip when dependencies are absent; a skipped test is not a pass.

For full browser tests:

```sh
npx playwright install chromium
npm run test:e2e
```

The browser runner starts its own temporary server and writes results/screenshots to `test-results/`. A configured machine may set `CHROMIUM_PATH` to its installed executable. Do not bypass enterprise browser policies.

### Actual verification in the authoring environment

- Build completed.
- **1,119 structural/content checks passed.**
- **165 request/response examples validated**, including an independent JSON Schema check.
- YAML and JSON OpenAPI representations are equivalent; 30 schema definitions passed JSON Schema syntax checks.
- **49 Node tests passed; 8 GraphQL tests skipped; 0 failed.** All 24 REST operations were exercised over actual HTTP.
- **154 static browser checks passed**, including content rendering, navigation, search, state logic, safe text rendering, and mobile widths. No uncaught browser JavaScript errors were observed.
- Package downloads were unavailable, so **GraphQL execution and the full installed-dependency workflow were not verified here**.
- Enterprise browser policy blocked URL navigation. Browser QA used the actual standalone document loaded through `set_content` and a QA-only in-memory storage stub. True persisted storage, saved downloads, clipboard integration, and browser-to-server execution remain for the included full browser suite to verify.

Full evidence and limitations are in `docs/testing-report.md`. No full accessibility certification or production-readiness claim is made.

## Project layout

```text
api-documentation-academy/
  README.md
  BUILD_STATUS.md
  package.json / package-lock.json
  standalone.html
  public/
    index.html
    css/styles.css
    js/                         # UI and generated content bundle
    vendor/                     # Prism and its license
    content/lessons/             # 48 editable Markdown lessons
    content/labs/                # 24 labs
    content/capstones/           # 3 briefs, rubrics, model submissions
    content/references/
    data/                       # manifests, questions, glossary, metadata
    contracts/                  # OpenAPI YAML/JSON and GraphQL SDL
    examples/rest/              # cURL and JavaScript examples
    examples/graphql/           # documents and variables
    downloads/                  # templates, Postman, combined course notes
  server/
    index.js                    # bounded local HTTP server
    routes.js / schemas.js      # REST metadata and models
    services/commerce.js        # shared business rules and in-memory store
    graphql/index.js            # real schema execution and HTTP adapter
  scripts/                      # build and validation tools
  tests/                        # service, HTTP, GraphQL, browser tests
  docs/                         # architecture, style, coverage, sources, QA
```

Edit lesson Markdown in `public/content/lessons/` and update its metadata in `public/data/course-manifest.json`. Edit quizzes/glossary in their JSON files. Edit REST behavior in the business service and contracts in the route/schema source, then rebuild; do not manually maintain conflicting generated OpenAPI copies. Edit GraphQL SDL in `public/contracts/schema.graphql` and matching resolvers together.

The frontend intentionally uses ordinary ordered scripts instead of browser module imports so the standalone reader can work directly from a file. The backend and build scripts use JavaScript ES modules.

## Deployment and security boundary

**Static course:** run `npm run build` and publish the contents of `dist/` to a static host, or distribute `standalone.html`. Static hosting does not execute Node; API buttons remain disabled without the specific local backend. There is no login or cloud synchronization.

**Full server:** intended for a local learning machine only. It binds to loopback and rejects unexpected hosts/origins. It is not a publicly deployable commerce service. A real hosted system would need production authentication, persistence, HTTPS configuration, operational security, and a separate deployment design.

Illustrative-only topics include production OAuth, subscriptions, federation, webhook delivery, multipart uploads, persisted operations, database batching, and distributed rate limiting. No payments, real shipments, inventory reservations, or tax calculations take place.

## Troubleshooting

- **`node` or `npm` not found:** install Node.js 22 or later, reopen the terminal, and check `node --version`.
- **GraphQL unavailable:** run `npm install` successfully in the project folder, then restart. Check `/health` for `graphqlAvailable: true`.
- **Port 3000 in use:** stop the other local process, or choose a port: PowerShell `$env:PORT=3001; npm run dev`; macOS/Linux `PORT=3001 npm run dev`. Open the matching address.
- **An example returns a business error:** read its prerequisites, use current returned IDs, verify the selected role, and reset the demo when appropriate.
- **Changes not visible:** rebuild after editing content/contracts. Reload the browser.
- **Progress is missing:** different browsers, file paths, and origins can use separate storage. Import a previously exported progress file.
- **Browser test fails to launch:** install the Playwright browser and any OS dependencies required by its official instructions. Respect managed browser restrictions.

## Licensing

Original project code and teaching content: MIT, see `LICENSE`. Third-party components retain their own licenses; see `THIRD_PARTY_NOTICES.md`. No font files are bundled. Source links and selected specification baselines are recorded in `docs/sources-and-versions.md`.
