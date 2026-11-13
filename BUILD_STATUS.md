# Build status

## Delivered

- 48 substantive lessons across 12 modules, with examples, exercises, model answers, and references.
- 24 labs, 60 quiz questions, 110 glossary entries, 30 interview answers, 12 editing exercises, 3 capstones, and 13 writing templates.
- Responsive HTML/CSS/vanilla JavaScript reader with search, themes, progress, notes, bookmarks, references, quizzes, and downloads.
- Standalone HTML reader and editable Markdown notes.
- Shared in-memory ShopVerse business implementation and 24 real REST operations.
- Real GraphQL engine integration, canonical SDL, 7 query fields, 11 mutation fields, and 24 operation examples.
- OpenAPI 3.1.1 YAML/JSON, cURL/JavaScript examples, Postman collection/environment, and custom reference explorer.
- Build scripts, structural/example validation, service/HTTP/GraphQL tests, and a full browser test runner.
- README, architecture, style guide, coverage matrix, version/source notes, licensing, and verification evidence.

## Commands run and results

- `npm run build`: passed.
- `npm run check`: 1,119 structural/content checks and 165 examples passed; GraphQL checks explicitly skipped because dependencies were unavailable.
- `npm test`: 49 passed, 8 GraphQL tests skipped, 0 failed.
- Independent Python JSON Schema/YAML checks: 165 examples and 30 schema definitions passed; YAML/JSON equivalent.
- Static Chromium content/interaction checks: 154 passed, no uncaught page errors.
- `npm install`: attempted but blocked by package-network restrictions; not completed.
- `npm run test:e2e`: full installed-dependency run not performed in this environment. The runner is included.

## Remaining verification, not missing lesson content

1. On a network-enabled machine, run `npm install`, then `npm run check` and `npm test` to validate and execute GraphQL.
2. Install Chromium with `npx playwright install chromium` and run `npm run test:e2e` to verify live browser integration and persistent state.
3. Manually review print output, clipboard permissions, accessibility with assistive technology, and any target static hosting configuration.

Read `docs/testing-report.md` for the exact boundaries of completed checks. No skipped test is presented as a pass. Runtime dependency installation, GraphQL execution, and full browser integration remain unverified in the authoring environment.
