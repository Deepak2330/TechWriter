# Course content style guide

Write for a technical writer who is learning API concepts, not for an experienced backend engineer. Explain the developer task and business outcome before the syntax. Introduce terminology at first use and link to related lessons without creating circular prerequisites.

Each lesson should include objectives, prerequisites, a plain-language explanation, a concrete ShopVerse scenario, annotated examples, a writer-focused documentation checklist, common mistakes, an exercise, a model answer, a recap, and relevant primary references. Do not replace explanations with topic lists or inflate length with repeated introductions.

Use exact identifiers from the shared data dictionary. Distinguish optional presence, nullable values, defaults, constraints, and examples. Identify whether a behavior comes from an HTTP/GraphQL/OpenAPI standard, a common convention, or a ShopVerse design choice. Avoid universal claims such as "GraphQL always returns 200" or "DELETE always returns 204."

Label examples as live, illustrative, or intentional errors. State prerequisites for stateful requests and use returned IDs. Use synthetic customer information and fixed demo tokens only. Never present copied output as a newly executed response.

Descriptions should explain business meaning rather than repeat a field name. Error guides should include a condition, diagnostic evidence, and safe recovery. Document authorization, ownership, side effects, state transitions, defaults, and limits alongside request syntax.

Use original prose. Cite primary technical sources near relevant explanations. Record selected versions and verification dates; do not label a pinned baseline as the latest release. New specification features belong in separately identified material when unsupported by the chosen runtime or validator.

Writing exercises require judgment. Provide rubrics and reasoning rather than pretending that word count or an automated linter can establish documentation quality. Preserve the fictional-project disclaimer in portfolio submissions.

Before publishing: rebuild, check links and schemas, execute runnable examples, review source/contract/implementation consistency, inspect responsive layouts, and record actual test results and limitations.
