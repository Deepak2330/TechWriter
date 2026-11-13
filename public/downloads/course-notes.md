# API Documentation Academy - complete lesson notes

Fictional ShopVerse learning project. See README for setup and scope.

# What API documentation is

Learn to explain an API as a useful product, not merely a list of URLs.

## Learning objectives

- Identify the reader and their task
- Distinguish an API contract from a working integration
- Define a useful documentation outcome

## Prerequisites

No programming experience is required.

## Start with the developer's job

An API is an interface through which one software component asks another to perform work or return information. The documentation explains the agreement between those components. It should answer what a developer can accomplish, how to make a valid request, what to expect, and what to do when the request fails.

A technical writer does not need to implement an entire backend before contributing. You do need enough technical understanding to ask precise questions, reproduce examples, notice contradictions, and explain consequences. A beautifully written page that sends a reader to a nonexistent endpoint is not successful documentation.

In ShopVerse, an integration developer might need to display product prices. A seller integrator might need to update a catalogue. A support engineer might need to diagnose a rejected order. These readers share some concepts but do not need identical starting points. Describe the reader by their task and existing knowledge rather than a vague label such as "technical audience."

## Contract, behavior, and guidance

The contract describes valid operations and data shapes. Runtime behavior is what the service actually does. Guidance connects that behavior to a task. An OpenAPI schema can say that `quantity` is an integer, but a useful guide also explains why setting it to zero does not remove a ShopVerse cart item.

Treat these three layers as related evidence. A schema may be incomplete; a server may contain a defect; an engineer's explanation may describe a future release rather than the deployed one. When they disagree, record the discrepancy instead of choosing the most convenient answer. Label what you observed and which environment you tested.

## ShopVerse scenario

A developer wants to show the name and current price of a product. Start with a public read operation, not seller onboarding or checkout. The following request is **live** when the local learning server is running:

```bash
curl -i http://localhost:3000/api/v1/products/prod_1001
```

The `-i` option includes response headers. The path identifies one product. This public operation does not require a token. The representation includes `price.amountMinor: 249900` and `price.currency: "INR"`; that means INR 2,499.00 in this demo. The integer is not a rupee amount and should not be displayed directly without conversion.

A complete product response contains additional fields. Do not label a shortened fragment as the exact full response. In this course, excerpts are explicitly identified and full examples are available in the REST reference.

## A documentation outcome you can test

Replace "The docs explain products" with "A developer can retrieve the seeded product and correctly display its currency and price without asking for additional instructions." This outcome suggests a useful review: ask someone to follow the page from a fresh setup and record where they become uncertain.

Measure task completion separately from page popularity. A large number of visits might mean a page is useful, confusing, or repeatedly needed. A missing token explanation can make a single page seem complete while blocking an entire integration. Pair usage information with support questions, test results, and direct reader feedback.

## What the technical writer must document

Describe the API's purpose, supported use cases, intended audience, base URL, environment, prerequisites, and limitations. Identify a first successful task and an expected result. For the learning API, say that data is synthetic and in memory, product reads are public, and restart/reset removes changes.

The phrase "Amazon-like shopping example" describes a business scenario; it does not establish official compatibility. ShopVerse has no affiliation with Amazon or Flipkart. Never invent a real company's endpoint, authentication flow, or rate limit to make an example look authentic.

## Common mistakes and corrections

**Weak:** "This API is easy to integrate and returns product data."

**Better:** "Use the Product API to retrieve catalogue names, availability, and INR prices. Product reads are public in the local demo. Product changes require a seller or administrator token."

The revision replaces an untestable promise with tasks, data, and an access boundary. Avoid phrases such as "simply call" when setup, authorization, or business state can affect the result.

## Practical exercise

Write a three-sentence API overview for a developer building a product comparison page. Mention the task, one starting operation, and one important limitation. Do not describe checkout or seller-only updates as necessary prerequisites.

## Model answer

Use the ShopVerse Product API to retrieve product names, availability, and prices for a comparison page. Start with `GET /api/v1/products`, then retrieve individual records with `GET /api/v1/products/{productId}`. The local demo uses synthetic INR prices and does not provide live marketplace inventory or purchasing access.

The answer is task-focused, gives an entry point, and prevents the reader from mistaking the training service for a real retailer. It does not promise price accuracy beyond the seeded demo.

## Recap

API documentation is an operational agreement plus task guidance. Begin with a reader outcome, verify examples, and make environment boundaries explicit. Good documentation enables a successful decision or action; it is not measured by how many endpoint names it lists.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html).

Continue to [the next lesson](#/lesson/l02).


---

# Choose the right documentation type

Separate learning, task instructions, explanations, and lookup reference so readers can find the right level of help.

## Learning objectives

- Choose a format for a developer question
- Plan a quickstart that produces an observable result
- Connect tutorials and reference pages without duplicating them

## Prerequisites

Read [the previous lesson](#/lesson/l01), or review its recap before continuing.

## Four different reader needs

A tutorial teaches through a guided experience. It controls the starting state, gives a sensible sequence, and helps a learner recognize success. A how-to guide helps someone who already understands the basics complete a particular task. A conceptual explanation builds understanding. A reference supports accurate lookup.

These distinctions are useful design tools, not laws that force every paragraph into one category. A short explanation can support a tutorial step. The problem arises when a page continually changes purpose: a developer looking for the maximum page size should not need to work through a story about building a store.

For ShopVerse, "Place your first order" is a tutorial; "Cancel a confirmed order" is a how-to; "Why order prices are snapshots" is an explanation; and the `POST /orders` field table is reference material.

## Design a quickstart around one success

A quickstart should deliver a small, meaningful outcome with minimal prerequisites. Use a public product request before introducing credentials. State how to start the local server, identify the base URL, show one command, and describe the expected product. Include an explicit next step.

Do not hide essential setup in a distant page. Conversely, do not expand the quickstart into the complete security manual. A short note can explain that authenticated workflows use local demo tokens, followed by a link to the authentication guide.

## ShopVerse example: a tutorial outline

```text
Goal: create a cart containing one available product.
Starting state: the local server is running; use the customer demo token.
1. Create a cart with POST /api/v1/carts.
2. Copy the returned cart ID.
3. Add prod_1001 with quantity 1.
4. Retrieve the cart and check its item and total.
Success: the cart contains one item priced in INR minor units.
Next: place an order with an idempotency key.
```

Notice that the tutorial uses the returned identifier instead of assuming that the new cart is always `cart_1002`. Seed IDs are stable after reset; newly created IDs depend on previous actions. A reader who repeats the tutorial should still succeed.

## Reference is not a tutorial

An endpoint reference should organize information predictably: business purpose, method/path, access, parameters, request body, responses, errors, and examples. A tutorial can then link to it for the complete constraints without repeating every field table.

Keep examples synchronized even when prose is shared. If a quantity limit changes, the reference, OpenAPI description, exercise, and sample request may all need review. Reuse a canonical example where appropriate, but write different explanations for different reader tasks. Reusing data is useful; repeating an identical introductory paragraph across twelve pages is not.

## Plan the information architecture

Start navigation with the developer journey: overview, first request, access, common workflows, reference, troubleshooting, and changes. Put stable concepts such as money representation near both API styles. Use meaningful link labels such as "Review order idempotency" rather than "Click here."

Design for readers arriving from search. A page titled "Add an item" should establish that it concerns a ShopVerse cart and identify the required cart state. It should not assume the reader just completed the previous page. Prerequisite links restore context without forcing every reader through the full course.

## What the technical writer must document

For each planned page, record the primary reader question, format, prerequisites, expected outcome, and related reference. Define the boundary of the page. For a cancellation how-to, explain eligible order states and the result; put a general discussion of asynchronous fulfilment elsewhere.

A troubleshooting page needs symptoms, likely causes, verification steps, and a fix or escalation path. It should not be a disconnected list of numeric status codes. An integration guide needs a sequence across operations and the data passed from one step to the next.

## Common mistakes and corrections

**Weak quickstart:** "Authenticate, call an endpoint, and inspect the result."

**Better quickstart:** "Start the local server, retrieve `prod_1001`, and confirm that the response contains `Wireless Headphones`. No token is required for this public request."

The improvement provides a reproducible state, an executable action, and a visible check. Avoid sending a new reader into a reference explorer with no explanation of which operation to choose.

## Practical exercise

Classify these proposed pages: "What null means in GraphQL," "The Product type," "Your first product query," and "Retrieve the next page of products." Write one acceptance criterion for each.

## Model answer

"What null means" is conceptual: readers can explain omission versus null. "The Product type" is reference: every field has a type and business meaning. "Your first product query" is a tutorial: a fresh learner can execute the example and identify its result. "Retrieve the next page" is a how-to: a developer can reuse `endCursor` without changing the filter or losing the next-page check.

## Recap

Choose a page format by the reader's immediate need. A connected documentation set can be both approachable and precise when tutorials guide action and references provide complete details.

## Sources and related reading

[Diataxis documentation framework](https://diataxis.fr/); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/).

Continue to [the next lesson](#/lesson/l03).


---

# Writing style and information architecture

Write descriptions that explain behavior, constraints, and decisions instead of repeating a field name.

## Learning objectives

- Rewrite vague API prose
- Use consistent names and task-based headings
- Organize a page for scanning and accessibility

## Prerequisites

Read [the previous lesson](#/lesson/l02), or review its recap before continuing.

## Explain what the name does not tell you

A description such as "The product identifier" adds little to a field named `productId`. A better description explains where to obtain the value, what it identifies, and whether it is stable. For example: "Opaque identifier returned by product search. Use it to retrieve the catalogue record; do not treat it as a SKU."

Documentation is not improved by making every description long. A Boolean with a clear business meaning may need one sentence. A price field with currency, scale, nullability, and discount rules needs more. Match the detail to the decisions a developer must make.

## Prefer direct, observable language

Use active constructions when they clarify the actor: "The server rejects duplicate SKUs" is easier to interpret than "Duplicate SKUs are not permissible." Name who performs the action when permissions matter. "The owning seller can update this product" is more precise than "Products can be updated."

Avoid unsupported promises such as "instantly," "always succeeds," or "fully secure." An API can time out, reject an input, or change state between calls. State documented guarantees and distinguish them from typical behavior. Words such as "must" should reflect a real requirement, not a stylistic preference.

## ShopVerse field-description workshop

| Field | Weak description | Useful description |
|---|---|---|
| quantity | Item quantity | Number of units to set for this cart item. Integer from 1 through 99. Zero does not remove the item. |
| priceBeforeMarkdown | Previous price | Recorded pre-markdown price. Null when no original markdown price is available; when present, it is at least the current price. |
| status | Current status | Order lifecycle value. A newly placed order is CONFIRMED. Only confirmed orders can be cancelled. |
| amountMinor | Amount | Integer currency minor units. For INR in this demo, 249900 represents INR 2,499.00. |

The table separates shape from meaning. `String` does not explain an enum-like field; `Int` does not explain a business range. Keep constraints in the schema and in readable prose, then test that they agree.

## Terminology and consistency

Maintain a small terminology list. Use "cart item" for the record inside a cart, "product" for the catalogue entity, and "SKU" for a seller-facing stock identifier. Do not alternate between "item," "listing," and "product" unless the API really distinguishes them.

Preserve exact case in code names. `IN_STOCK` and `in_stock` are different enum values. Put identifiers in code formatting and ordinary concepts in normal text. Use consistent examples: a customer ID must not appear where a cart ID is required simply because both are strings.

## Make the page scannable

Use a single descriptive title and a meaningful heading hierarchy. Task headings begin with an action: "Create a cart," "Handle a duplicate order request," or "Retrieve the next page." Do not skip heading levels just to produce a particular font size.

Parameter tables should include type, requiredness, default, allowed values, and constraints when relevant. Very wide tables become difficult on mobile; move lengthy behavior into nearby paragraphs. Every code sample needs a language label and enough context to identify whether it is complete, illustrative, or intentionally invalid.

Accessible documentation also needs descriptive links, text alternatives for meaningful diagrams, keyboard-operable controls, visible focus, and adequate contrast. A color-only distinction between success and error is insufficient. Use status text alongside color.

## What the technical writer must document

Create a style checklist covering terminology, capitalization, example conventions, number units, timezones, placeholders, cross-references, and error language. Specify whether descriptions count characters or bytes; ShopVerse validation counts Unicode code points for its bounded strings.

For requirements not yet confirmed, write a review question rather than authoritative prose. "Confirm whether missing and null values both clear this field" is an engineering question. Do not publish either behavior until it has been established.

## Common mistakes and corrections

**Weak:** "Simply pass the necessary details and you will get a successful response."

**Better:** "Send `productId` and a quantity from 1 through 99. The cart must be ACTIVE and the product must be IN_STOCK. A duplicate product returns 409; update the existing cart item instead."

The revised paragraph tells the reader what to supply, what state is required, and how to recover from a predictable failure.

## Practical exercise

Rewrite: "This parameter is optional and can be null. It is the discount price. Example: 299900." Use `priceBeforeMarkdown` and the Money object defined by this project.

## Model answer

`priceBeforeMarkdown` records the original price before a markdown. Supply a Money object with `amountMinor` and `currency`, or null when no original price should be recorded. In a partial update, omission leaves the value unchanged; null clears it. A non-null value must be at least the current price. An example is `{"amountMinor":299900,"currency":"INR"}`.

This version distinguishes an absent property from an explicit null and removes the ambiguity of a bare integer amount.

## Recap

Write the information that developers cannot safely infer from a name or data type. Consistency, precise constraints, and predictable page structure are more valuable than elaborate phrasing.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Continue to [the next lesson](#/lesson/l04).


---

# Gather information and interview engineers

Build an evidence-based documentation plan from tickets, schemas, implementation, and reproducible tests.

## Learning objectives

- Create a documentation evidence map
- Ask targeted SME questions
- Separate confirmed behavior from assumptions

## Prerequisites

Read [the previous lesson](#/lesson/l03), or review its recap before continuing.

## Begin with an inventory

Collect the API description, GraphQL SDL, change request, implementation entry points, acceptance tests, existing guides, and sample consumers. Record the version and environment for each source. A ticket describes intended work; a schema describes a contract; a test demonstrates one behavior under specific conditions. None automatically answers every documentation question.

For an existing API, inventory operations and types before writing polished prose. Identify which surfaces are public, internal, experimental, or deprecated. An internal field in a repository is not automatically available to external developers. Confirm exposure and permissions with the owning team.

## ShopVerse change request

Consider a request to expose `priceBeforeMarkdown` on product responses. The feature title alone leaves several important questions unanswered. Is the value money or a number? Can it be absent? Can it be null? Is it the historical price, a seller-provided reference price, or the price before the current promotion? Does REST return it automatically while GraphQL returns it only when selected?

Write a focused interview brief rather than asking an engineer to "explain the API." Specific questions are easier to answer and review. Include a proposed example and ask the engineer to correct it.

```text
Documentation question log
Change: expose priceBeforeMarkdown
1. Confirm meaning: recorded price before markdown, not a calculated saving.
2. Confirm null behavior: null means no original price is recorded.
3. Confirm units: Money with integer minor units and currency.
4. Confirm constraints: non-null original price >= current price.
5. Confirm permissions: product reads are public in this demo.
6. Confirm release surface: REST Product and GraphQL Product.
7. Confirm compatibility: older consumers may ignore the new response field.
```

## Use an evidence matrix

A practical matrix links each claim to a source and an owner. "Maximum quantity is 99" can point to the service validation and a boundary test. "Order retries are safe" is too broad: document the required idempotency key, its scope, its retention, and what happens when the body changes.

When evidence conflicts, preserve the conflict in the review record. For example, if a schema permits quantity 100 but the server rejects it, file a contract defect and ask whether implementation or schema should change. Do not silently weaken the reference to avoid choosing.

## Reproduce what you write

Test success, missing inputs, invalid types, boundaries, permissions, and relevant lifecycle states. Save the request and actual status, headers, and body. A screenshot of a successful tool window is less reusable than a text fixture with the exact request and environment.

Use synthetic data. Redact bearer tokens, cookies, addresses, email accounts, and internal hostnames before sharing diagnostic evidence outside the intended environment. For this project, fixed demo tokens are intentionally public, but that pattern must not be carried into production documentation.

## Work effectively with subject-matter experts

Ask reviewers to verify technical behavior, not to rewrite every sentence. Group questions by topic and show the proposed resolution. For a field description, ask whether the business meaning, allowed values, and null behavior are correct. For a workflow, ask whether intermediate state changes and recovery steps are complete.

Assign owners and a review deadline in a real project. A comment such as "engineering to confirm" without an owner can remain unresolved indefinitely. Record decisions near the affected contract or documentation issue so future writers understand why an explanation exists.

## What the technical writer must document

Keep a documentation plan with audience, supported tasks, deliverables, source locations, unresolved questions, review owners, test evidence, and release dependencies. Note which examples are live and which are proposed. If the endpoint is not available yet, write a clearly labelled design example rather than claiming a successful execution.

For an API release, map the change across endpoint/type references, schemas, tutorials, samples, release notes, migration notes, and troubleshooting. A one-field change may still affect many reader-facing surfaces.

## Common mistakes and corrections

**Weak review request:** "Please check the docs."

**Better:** "Please confirm whether null clears `priceBeforeMarkdown`, whether a lower original price is rejected, and whether this field is public in both interfaces. The attached requests test all three cases."

The better request makes technical review bounded and actionable.

## Practical exercise

A ticket says: "Add optional modified variation traits to update input." Write five questions that must be answered before publishing a parameter table. Treat this as an illustrative extension, not an implemented ShopVerse operation.

## Model answer

Ask whether the input is a list and whether an empty list is meaningful; whether names and values can both be renamed; which fields are required within each list item; what uniqueness and length limits apply; and what happens when the old name or value does not exist. Also clarify whether the operation changes variant identities or preserves them, because that affects integration behavior even if the JSON shape is simple.

## Recap

Strong API writing is evidence-driven. Build a source inventory, ask narrow questions, reproduce behavior, and preserve unresolved differences instead of turning assumptions into requirements.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/).

Continue to [the next lesson](#/lesson/l05).


---

# HTTP requests, URLs, and responses

Learn to read the request and response envelope before interpreting the business data.

## Learning objectives

- Identify the parts of an HTTP request
- Distinguish path parameters from query parameters
- Explain content negotiation and HTTPS

## Prerequisites

Read [the previous lesson](#/lesson/l04), or review its recap before continuing.

## The request is more than a URL

An HTTP request combines a method, target, headers, and sometimes a body. The method expresses the intended semantics, the target identifies a resource, headers carry metadata, and a body carries a representation or operation input. A response combines a status, headers, and an optional body.

In a URL such as `http://localhost:3000/api/v1/products?limit=2`, the scheme is HTTP, the host is localhost, the port is 3000, the path is `/api/v1/products`, and the query string begins after `?`. A path template such as `{productId}` is documentation notation; replace it with a real value before sending the request.

## ShopVerse request anatomy

This is a readable HTTP representation of a **live** request:

```http
GET /api/v1/products/prod_1001 HTTP/1.1
Host: localhost:3000
Accept: application/json
```

`GET` requests the product representation. `Host` identifies the server authority. `Accept` states which response media type the client can process. There is no request body and no authentication header because the local product read is public.

A JSON body uses `Content-Type: application/json` to identify its representation. `Accept` describes the desired response; `Content-Type` describes the body actually being sent. They are related but not interchangeable.

## Follow the response envelope

A successful product retrieval returns status 200 and a JSON product. The response headers include a content type and an ETag. The ETag is an opaque representation validator, not a product ID. A later conditional request can use it to ask whether that representation has changed.

A response body must be interpreted in context. A JSON object containing an error message is not necessarily a success because it can be parsed. Conversely, 204 and 304 intentionally have no response body. Calling a JSON parser on an empty response can produce a client error even when the HTTP exchange succeeded.

## Paths, queries, and encoding

Use path parameters for the resource identity defined by the API, such as `prod_1001`. Use query parameters for options such as `limit`, filtering, or sorting. This is a common design convention, not a universal rule that determines whether every API is RESTful.

Encode query values rather than concatenating arbitrary strings. A space in a product search should not break the URL. In JavaScript, use `URL` and `URLSearchParams`:

```javascript
const url = new URL('/api/v1/products', 'http://localhost:3000');
url.searchParams.set('q', 'wireless headphones');
url.searchParams.set('limit', '20');
console.log(url.toString());
```

The keys and values are encoded separately. Do not percent-encode the entire finished URL because that would also encode structural separators.

## HTTPS and environment boundaries

Production APIs should protect traffic with HTTPS. Encryption protects data in transit, but it does not replace authorization checks or guarantee the safety of a response after it is stored. A bearer token remains sensitive even when transmitted over TLS.

ShopVerse uses plain HTTP only on a loopback development server. That is a local teaching choice, not production deployment guidance. The server binds to `127.0.0.1` and rejects unrelated hostnames and cross-origin browser requests. Do not expose it as a public commerce service.

## What the technical writer must document

Specify the base URL, supported environments, methods, paths, media types, required headers, and body shape. Identify whether a header is required, optional, or server-generated. Mention relevant response headers, especially when clients need them for caching, pagination, retries, or newly created resource locations.

Separate variables from literal values. In a template, explain where `{productId}` comes from. In a runnable example, provide `prod_1001`. Avoid mixing both styles in one unlabeled command.

## Common mistakes and corrections

**Mistake:** Putting a JSON request body in a GET example without a documented API requirement.

**Correction:** Use the query parameters specified by this API. ShopVerse product search takes filters in the URL and does not define a GET body.

**Mistake:** Saying a URL fragment is sent to the server.

**Correction:** A fragment such as `#overview` is handled by the client and is not part of the HTTP request target sent to the server.

## Practical exercise

Explain the scheme, host, port, path, and query parameters in `http://localhost:3000/api/v1/products?availability=IN_STOCK&limit=2`. Then identify where a bearer token would go for a protected request.

## Model answer

The scheme is HTTP; the host is localhost; the port is 3000; the collection path is `/api/v1/products`. The query filters availability and limits the page to two records. A bearer token belongs in the `Authorization` header, not in the query string. This particular product-list request is public, so it does not require one.

## Recap

Read method, target, headers, status, and body as one exchange. Correct examples explain the envelope as carefully as the business payload.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [MDN web documentation](https://developer.mozilla.org/).

Continue to [the next lesson](#/lesson/l06).


---

# JSON, YAML, and schema fundamentals

Distinguish valid syntax from a valid API request, and learn to describe nested data accurately.

## Learning objectives

- Read nested objects and arrays
- Explain missing, null, empty, and default values
- Use schemas to describe structure and constraints

## Prerequisites

Read [the previous lesson](#/lesson/l05), or review its recap before continuing.

## Syntax is only the first check

JSON represents objects, arrays, strings, numbers, booleans, and null. Object property names and strings use double quotes. Comments and trailing commas are not part of JSON syntax. A string containing quotation marks must escape them. An array preserves an ordered list of values; an object is a set of named members.

A syntactically valid document may still be invalid for an API. `{"quantity":"2"}` is valid JSON, but ShopVerse requires an integer quantity, not a numeric string. A schema adds rules about types, required properties, allowed values, and numeric or string limits. Business validation adds rules involving state or relationships.

## Read a nested example

This is a **live-compatible input fragment**, not a complete product-creation request:

```json
{
  "price": {
    "amountMinor": 249900,
    "currency": "INR"
  },
  "priceBeforeMarkdown": null
}
```

The outer object contains two properties. `price` is another object. Its `amountMinor` is a number constrained to an integer by the schema, and `currency` is a string. `priceBeforeMarkdown` is present with a null value. It is not absent and it is not an empty object.

Using a nested object makes the currency convention explicit. Do not assume every currency uses the same number of minor units. The executable demo accepts INR only, while the general Money model illustrates why an amount needs a currency identifier.

## Missing, null, empty, and default

An optional property may be omitted. A nullable property may contain null. Those are independent decisions. A property can be required and nullable, meaning the key must be present but its value may be null. It can be optional and non-nullable, meaning omission is permitted but an explicit null is rejected.

An empty string is a string with zero characters. An empty array is a collection with no elements. An empty object has no properties. None automatically means the same thing as null. The API must define how each is handled.

A default describes what happens when an input is not supplied. An example demonstrates one plausible value. Do not document a sample quantity of 1 as the default unless the implementation actually inserts 1 when quantity is missing. ShopVerse requires cart item quantity, so there is no such default.

## YAML as an authoring format

YAML can represent the same data model as JSON with less punctuation, which makes it convenient for OpenAPI authoring. Indentation establishes nesting. Use spaces consistently, avoid tabs, and quote values when interpretation could be surprising. Duplicate mapping keys can be silently overwritten by some parsers, so a robust lint process rejects them.

```yaml
price:
  amountMinor: 249900
  currency: INR
priceBeforeMarkdown: null
```

The structure corresponds to the JSON fragment. A format conversion should preserve values and types, not merely produce a file that looks similar. This project generates YAML and JSON descriptions from one canonical contract definition.

## Structure versus business rules

A schema can express that rating is an integer from 1 through 5. A business rule determines whether the caller has already reviewed that product. A schema can require a `cartId`; it cannot, by itself, guarantee that the referenced cart belongs to the current customer and is ACTIVE.

Some constraints can be represented using advanced schema constructs, but do not force relational business semantics into unreadable descriptions. State the input shape in the schema, then explain state and ownership requirements in operation prose and tests.

## What the technical writer must document

For each field, capture its type, requiredness, nullability, default behavior, allowed values, limits, units, format, and relationship to other fields. For arrays, explain item type, minimum/maximum size when applicable, ordering, and duplicate handling. For nested objects, identify which inner fields are required when the outer object is present.

## Common mistakes and corrections

**Wrong:** `"rating": "5"` when rating is an integer.

**Correct:** `"rating": 5`.

**Wrong explanation:** "Null means the value is optional."

**Correct explanation:** "Null is an explicit value. Whether the property may be omitted is a separate rule."

## Practical exercise

For a partial product update, explain the difference between `{}`, `{"priceBeforeMarkdown":null}`, and `{"priceBeforeMarkdown":{}}`. Predict the result in ShopVerse.

## Model answer

An empty patch leaves all writable fields unchanged. Explicit null clears the recorded original markdown price. An empty Money object is invalid because `amountMinor` and `currency` are required within a non-null Money input. The last request receives a validation error rather than clearing the field.

## Recap

Validate syntax, schema, and business state separately. Missing, null, empty, default, and example are distinct concepts that deserve distinct documentation.

## Sources and related reading

[JSON Schema documentation](https://json-schema.org/learn/); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [MDN web documentation](https://developer.mozilla.org/).

Continue to [the next lesson](#/lesson/l07).


---

# Test APIs with cURL, Postman, and browser tools

Capture reproducible evidence and learn what each tool can and cannot establish.

## Learning objectives

- Run and inspect a REST request
- Use environment variables without exposing secrets
- Record success and failure evidence for documentation

## Prerequisites

Read [the previous lesson](#/lesson/l06), or review its recap before continuing.

## Establish a repeatable starting state

Before testing, identify the base URL, API version, account role, seed data, and any prior operations required. Resetting the local demo restores stable seed IDs, but it also removes changes made in another open browser tab. Coordinate tests that share the same server.

Keep learning progress separate from server data. Resetting ShopVerse does not erase completed lessons or notes. Conversely, exporting course progress does not back up in-memory carts or orders. Documentation should distinguish these storage boundaries so a reader knows what survives a restart.

## A first cURL request

This command is **live** against the local server:

```bash
curl -i http://localhost:3000/api/v1/products/prod_1001
```

Inspect the status, `Content-Type`, ETag, and JSON body. Then request a nonexistent product to capture a meaningful failure:

```bash
curl -i http://localhost:3000/api/v1/products/prod_missing
```

Expect 404 and a Problem Details response. The HTTP exchange may succeed even though the API operation failed. By default, cURL does not treat every HTTP error status as a shell-level failure; scripts should select appropriate options and inspect status explicitly.

On Windows PowerShell, use `curl.exe` when necessary to avoid an alias with different behavior. Multi-line examples that use a backslash are written for a POSIX shell; do not paste them into PowerShell unchanged. The single-line commands above avoid that particular difference.

## Authenticated requests and variables

For a local customer profile, send the documented demo bearer token:

```bash
curl -i http://localhost:3000/api/v1/me -H "Authorization: Bearer demo-customer-token"
```

These tokens are intentionally synthetic and published with the project. Real tokens should live in the appropriate secret store or a private local environment, not in a public collection, screenshot, repository, or generated example. A placeholder should be clearly marked and should never accidentally look like a real secret.

## Work with the Postman collection

Import the downloadable collection and environment. Select the local environment, verify `baseUrl`, and run product retrieval before authenticated operations. The collection uses variables for resource IDs and credentials. When a request creates a resource, copy the returned ID or use the supplied tests that update environment variables where available.

An exported collection is useful only when its state dependencies are explained. A cancellation request needs a CONFIRMED order; the seed order is DELIVERED and should fail cancellation. The fact that an example request is syntactically valid does not mean every prior server state will allow it.

## Use browser developer tools

The Network panel shows requests made by the course playground, their methods, statuses, headers, and timing. It is useful for distinguishing a server rejection from a browser policy failure. A request that works in cURL may fail in a browser because browsers enforce cross-origin rules that cURL does not.

Do not treat browser timing as a production performance benchmark. Local machine load, startup, tooling, and dataset size influence the result. If documentation needs latency guidance, obtain measured and approved service data rather than extrapolating from a demo.

## What the technical writer must document

Record the command, role, prerequisites, environment, expected outcome, and observed outcome. Preserve status and relevant headers alongside the body. A response example without its initiating request can be misleading when filters, selected GraphQL fields, or permissions change the shape.

Build a small test matrix: valid input, missing required field, wrong type, minimum and maximum values, one value outside each bound, wrong owner, and a lifecycle conflict. This provides stronger evidence than repeating the happy path with different names.

## Common mistakes and corrections

**Mistake:** Publishing a test token copied from a real account.

**Correction:** Replace it with a documented placeholder and regenerate the captured request without sensitive headers.

**Mistake:** Calling a request "broken" because it returns 409.

**Correction:** Check the resource state. A valid test may intentionally verify a conflict, such as cancelling a delivered order.

## Practical exercise

Capture one successful profile request, one request with no token, and one request with a seller token. Record the statuses and explain what each proves.

## Model answer

The customer token returns 200 and the synthetic customer profile. No token returns 401 because identity is missing. A seller token returns 403 because a seller identity is not authorized for the customer-profile operation. Together, these cases demonstrate the difference between authentication and role authorization; they do not establish every possible ownership rule elsewhere in the API.

## Recap

A good test is reproducible and tied to a claim. Use tools to inspect behavior, preserve clean evidence, and distinguish expected failures from defects.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [MDN web documentation](https://developer.mozilla.org/).

Continue to [the next lesson](#/lesson/l08).


---

# JavaScript fetch for technical writers

Write examples that handle network problems, HTTP errors, and empty bodies without hiding what happened.

## Learning objectives

- Read async JavaScript request code
- Handle HTTP failures separately from rejected promises
- Explain timeouts and browser CORS behavior

## Prerequisites

Read [the previous lesson](#/lesson/l07), or review its recap before continuing.

## Learn the minimum JavaScript you need

A technical writer can read useful API examples without becoming a full-time application developer. A variable stores a value; an object groups named values; an array holds a list. A function performs reusable work. An asynchronous function can pause at `await` while a promise resolves, without blocking the browser's main thread.

`fetch` returns a promise for a response. A 404 or 500 response normally resolves that promise because the browser received an HTTP response. A network failure, blocked request, or cancellation can reject it. This distinction is essential: a `catch` block alone does not handle every failed API operation.

## A robust product example

This example is **live** when run from the local course website's origin:

```javascript
async function getProduct(productId) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(
      `/api/v1/products/${encodeURIComponent(productId)}`,
      { headers: { Accept: 'application/json' }, signal: controller.signal }
    );
    const text = await response.text();
    const body = text ? JSON.parse(text) : null;
    if (!response.ok) {
      throw new Error(body?.detail ?? `HTTP ${response.status}`);
    }
    return body;
  } finally {
    clearTimeout(timeout);
  }
}

getProduct('prod_1001')
  .then(product => console.log(product.name, product.price))
  .catch(error => console.error(error.message));
```

The controller supplies a cancellation signal. The timeout aborts after ten seconds in this sample; it is a client choice, not a service latency guarantee. `encodeURIComponent` protects the path segment. Reading text first makes an empty response explicit. The example expects JSON; a more generic client should inspect the response content type before attempting to parse arbitrary content.

The `finally` block clears the timer whether the request succeeds or throws. It does not retry the request. Retrying a write requires an operation-specific policy, not simply adding another `fetch` in `catch`.

## Construct a JSON request correctly

The following **live** request creates a cart for the demo customer:

```javascript
const response = await fetch('/api/v1/carts', {
  method: 'POST',
  headers: { Authorization: 'Bearer demo-customer-token' }
});
const cart = await response.json();
if (!response.ok) throw new Error(cart.detail ?? 'Cart creation failed.');
console.log(cart.id);
```

Cart creation needs no request body. For an operation with a body, use `JSON.stringify(input)` and `Content-Type: application/json`. Do not pass an ordinary object directly as the body and assume the browser will encode it as JSON.

## Browser origins and CORS

An origin consists of scheme, host, and port. `localhost:3000` and `localhost:8000` are different origins. A browser can send a preflight OPTIONS request for certain cross-origin requests; the server's CORS policy determines whether the browser exposes the response to JavaScript.

CORS is not authentication and is not a general protection against non-browser clients. Do not recommend `mode: 'no-cors'` as an API integration fix: it does not give ordinary JavaScript access to a readable cross-origin JSON response. Use the documented origin or an approved server configuration.

The local course deliberately serves its frontend and APIs together. Opening the static reader from disk lets you study the content, but live execution is disabled until you use the local server URL.

## What the technical writer must document

Explain where a sample runs, which variables readers must replace, the required headers, the expected result, and error handling. Separate client-selected timeouts from service guarantees. Identify whether cancellation only stops waiting or also guarantees that the server did no work; in general, aborting a request does not prove a write was rolled back.

## Common mistakes and corrections

**Mistake:** Treating `response.json()` as proof of success.

**Correction:** Check the HTTP status and interpret the documented error body. JSON can contain an error.

**Mistake:** Automatically parsing every DELETE response as JSON.

**Correction:** Check whether that operation returns a body. Product deletion returns 204; cart-item deletion returns an updated cart in this project.

## Practical exercise

A sample uses `await fetch(...)` inside `try/catch` and reports every resolved promise as "Saved." Explain the defect and propose a correction for an order request.

## Model answer

A resolved fetch can contain an HTTP error. Read the response body safely, inspect `response.ok`, and report the API's documented error. For order creation, retain the original request and idempotency key before sending; an aborted or lost response does not establish whether the order was created. Retry only under the documented idempotency rules.

## Recap

Good sample code teaches the request and its failure model. A network promise, an HTTP status, and a business outcome are different layers that deserve separate handling.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [MDN web documentation](https://developer.mozilla.org/).

Continue to [the next lesson](#/lesson/l09).


---

# Resources and REST principles

Understand the design ideas behind an HTTP API without assuming that every JSON endpoint is fully RESTful.

## Learning objectives

- Model resources and representations
- Explain stateless requests
- Distinguish REST constraints from common URL conventions

## Prerequisites

Read [the previous lesson](#/lesson/l08), or review its recap before continuing.

## Resources are concepts, not database rows

A resource is something the API identifies and interacts with, such as a product, a cart, or an order. A representation is the information about that resource sent in a response. The representation can change without changing the resource's identity. A product's price can change while its ID remains the same.

Do not assume the API directly exposes database tables. An order representation may combine records, calculated totals, permissions, and historical snapshots. Documentation should describe the public contract, not speculate about the storage system. A field named `customerId` establishes an identifier relationship; it does not reveal a database join strategy.

## The architectural ideas

REST describes a set of architectural constraints, including client/server separation, stateless interactions, cacheability, a uniform interface, layered systems, and optional code on demand. The uniform interface includes resource identification, manipulation through representations, self-descriptive messages, and hypermedia-driven application state.

Many APIs commonly called REST APIs use HTTP methods and resource-oriented URLs without fully implementing all of these constraints. Be accurate rather than dogmatic. ShopVerse is a resource-oriented HTTP learning API; its examples do not claim full hypermedia-driven REST conformance.

## Stateless does not mean no stored data

A stateless interaction contains the information needed to understand that request instead of depending on hidden conversational state from an earlier request. The server can still store products, accounts, carts, and orders. Those are resource states, not proof that the API violates statelessness.

A cart request includes a cart ID and the necessary authentication information. The server looks up the cart and checks ownership. It should not require an undocumented sequence such as "call product search once so the server remembers which cart you mean."

## ShopVerse resource model

```text
Customer -> Cart -> CartItem -> Product
Customer -> Order -> OrderItem snapshot
Order -> Shipment
Order -> ReturnRequest
Product -> Review
Product -> Seller
```

The arrow means a documented relationship, not a particular storage implementation. A cart item uses current catalogue pricing. An order item records the name and price at checkout. This distinction is more important to an integrator than whether both are stored in one database.

A returned product is a representation with fields such as `id`, `name`, `price`, and `availability`. The GraphQL interface can expose the same underlying concept with a client-selected field set. Interface style and business entity are different dimensions.

## Choose identities carefully

Use opaque IDs for resource lookup and explain where clients obtain them. A SKU is a business identifier with different constraints. In this demo, product IDs remain stable when a seller changes a SKU. A client that constructs a URL using a SKU where an ID is expected will not retrieve the intended resource.

Collections and members have different purposes: `/products` supports listing and creation, while `/products/{productId}` addresses one member. Plural nouns and these particular path shapes are familiar conventions, not the defining rules of REST.

## What the technical writer must document

Document resource purpose, identity, relationships, lifecycle, ownership, and representation boundaries. State whether values are live, calculated, or captured snapshots. Explain links between resources and which operation creates each identifier.

For an order guide, describe the state transition from an ACTIVE cart to a CHECKED_OUT cart and a CONFIRMED order. The path alone does not reveal that side effect. Also state that payment processing and stock reservation are not implemented in this training service.

## Common mistakes and corrections

**Weak:** "The API is stateless, so it does not save carts."

**Better:** "Cart data is stored as a resource. Each request identifies the cart and supplies the credentials needed to authorize access."

**Weak:** "Any API that uses JSON is REST."

**Better:** "JSON is a representation format. REST is an architectural style; a JSON-over-HTTP API may implement some REST conventions without satisfying every constraint."

## Practical exercise

Explain why a product price update should not change the `unitPrice` inside an existing order. Identify where current pricing should appear instead.

## Model answer

An order records the transaction's accepted details. Changing its unit price after checkout would alter the recorded agreement and make totals unreliable. Current catalogue pricing belongs on the Product and on ACTIVE cart calculations. The order representation keeps a snapshot even when the catalogue product later changes or is deleted.

## Recap

Resource identity, stored state, representation, and interface style are separate concepts. Useful API explanations focus on the behaviors and relationships consumers can rely on.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l10).


---

# Methods, safety, and idempotency

Explain GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS without reducing them to misleading CRUD labels.

## Learning objectives

- Distinguish safe from idempotent methods
- Explain replacement versus partial update
- Document repeat-request behavior accurately

## Prerequisites

Read [the previous lesson](#/lesson/l09), or review its recap before continuing.

## Methods express semantics

HTTP methods communicate the meaning of a request. GET retrieves a representation. HEAD asks for the corresponding response metadata without the response body. POST performs resource-specific processing. PUT creates or replaces the target resource's representation according to its contract. DELETE requests removal of the target association. OPTIONS describes communication options. PATCH applies partial modifications using a defined patch format.

Do not teach "POST always creates" or "DELETE always returns 204." These are common patterns, not universal rules. ShopVerse returns 204 when deleting a product, but deleting a cart item returns the updated cart with 200. The operation reference determines the exact contract.

## Safety and idempotency are different

A safe method is intended to be read-only from the client's perspective. Incidental logging does not make a retrieval unsafe. An idempotent method has the same intended server effect when repeated as when performed once. It does not require identical response bodies or statuses on every attempt.

GET, HEAD, OPTIONS, and TRACE have safe semantics. PUT and DELETE are idempotent by their defined semantics, although they are not safe. POST and PATCH are not generally idempotent methods; a particular operation can implement idempotent behavior. ShopVerse's quantity-setting patch is repeatable, while a hypothetical increment operation would have a different effect on every repeat.

## PUT versus PATCH in ShopVerse

A **live** partial update can change only the product name:

```bash
curl -i -X PATCH http://localhost:3000/api/v1/products/prod_1001 -H "Authorization: Bearer demo-seller-token" -H "Content-Type: application/json" -d '{"name":"Wireless Headphones Pro"}'
```

The other fields remain unchanged. This project accepts a partial JSON object; it does not implement JSON Patch operations or JSON Merge Patch media types. Explicit null clears only `priceBeforeMarkdown`.

A PUT request requires the complete writable product input: name, SKU, price, availability, and category. Omitted optional description becomes an empty string; omitted `priceBeforeMarkdown` becomes null. The product's ID, owner, and creation timestamp remain server-managed.

## Repeated deletion

Deleting a product once removes it. A later identical deletion can return 404 because the resource is already absent. That difference in status does not contradict DELETE's idempotent semantics: the intended final state is still absence.

The business contract may prevent deletion. ShopVerse rejects product deletion when an ACTIVE cart references it. A 409 in that state explains why the requested effect did not occur. Historical order snapshots do not prevent deletion because they retain their own data.

## POST can define replay protection

Order creation uses POST plus an application-defined idempotency key. Repeating the same request with the same customer and key returns the saved original order result. Reusing the key with different order details produces a conflict. This is an explicit service behavior, not a guarantee automatically provided by the POST method.

A new key means a new intent, so blindly generating a fresh key on every retry defeats the protection. Key scope and retention belong in the documentation alongside the header syntax.

## What the technical writer must document

State the actual method and path, input format, side effects, relevant lifecycle requirements, repeat-request behavior, and possible success statuses. For partial updates, explain omission and null. For replacement, identify which writable properties must be resubmitted and which server-managed fields cannot change.

HEAD and OPTIONS should be documented only to the extent the implementation supports them. This demo supports HEAD for GET routes; it does not implement a general CORS OPTIONS service. Do not advertise a method solely because it exists in the HTTP standard.

## Common mistakes and corrections

**Wrong:** "Idempotent means the response always matches."

**Correct:** "Idempotency concerns the intended server effect. A repeated deletion may return a different status while leaving the resource absent."

**Wrong:** "PATCH is always safe to retry."

**Correct:** "Retry safety depends on the patch format and operation semantics. Setting a quantity differs from incrementing it."

## Practical exercise

A client times out after sending `POST /orders`. Should it retry with a new key, the same key and body, or a changed body? Explain the conditions.

## Model answer

Retry with the same key and identical request details within the documented retention window. The original attempt may already have created the order. A new key does not identify the same attempt, and a changed body with the old key conflicts. In this demo, a restart/reset clears retained keys, so the guarantee does not survive that boundary.

## Recap

Use method semantics as the starting point, then document operation-specific behavior. Safe, idempotent, repeatable, and successful are not interchangeable terms.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html).

Continue to [the next lesson](#/lesson/l11).


---

# Parameters, filtering, sorting, and pagination

Make collection documentation precise enough to support reliable iteration, not just the first page.

## Learning objectives

- Document parameter location and serialization
- Compare offset and cursor pagination
- Explain sort order, limits, and changing datasets

## Prerequisites

Read [the previous lesson](#/lesson/l10), or review its recap before continuing.

## Collection controls need a contract

A collection can contain more data than a client should retrieve at once. Filtering selects matching records, sorting establishes order, and pagination limits each response. These controls interact: the next page must use the same filter and sort if the client wants to continue the same traversal.

ShopVerse's REST product collection accepts `q`, `categoryId`, `availability`, `sort`, `limit`, and `offset`. The default page size is 20 and the maximum is 100. The server rejects invalid limits instead of silently clipping them. Unknown and duplicate query parameter names are also rejected by the local HTTP handler.

## A live product-list request

```bash
curl -i "http://localhost:3000/api/v1/products?availability=IN_STOCK&sort=PRICE_ASC&limit=1&offset=0"
```

This retrieves the first available product ordered by ascending price. A response includes `items`, `total`, `limit`, and `offset`. After a clean reset, the least expensive in-stock seed product is Desk Lamp. The next page uses offset 1 while preserving the other parameters.

The API uses product ID as a tie-breaker when primary sort values match. Without a deterministic order, records could shift unpredictably even in an unchanged dataset. Document both the main sort and the tie-breaking behavior when clients depend on stable iteration.

## Offset pagination

Offset pagination uses a starting position and a page size. It is easy to demonstrate and can support direct navigation to a position. However, inserting or deleting earlier records between requests can cause duplicates or omissions across pages. A stable sort does not turn a changing collection into a snapshot.

If the first response has offset 0 and two items, the next offset is 2. Stop when you have exhausted the documented result set, not merely when a page size differs in an undocumented way. ShopVerse returns a `total` for the current request; it can change if the dataset changes between calls.

## Cursor pagination

A cursor represents a position according to a particular API's rules. It is often opaque. Do not instruct readers to decode or construct it merely because an example looks like Base64. The API may change its internal encoding without changing the public contract.

The GraphQL demo uses forward connections with `first`, `after`, `edges`, and `pageInfo`. Its cursor is bound to the collection/filter scope. It is still an offset-derived educational cursor rather than a durable database snapshot. Consequently, it does not promise immunity to changing data. Explain the actual implementation, not benefits associated with other cursor systems.

## Parameter descriptions that answer decisions

For each parameter, identify its location, type, requiredness, default, range, and serialization. A path parameter is required in OpenAPI. A query parameter may be optional. A header parameter such as an idempotency key has a different role and must not be mixed into the query table as though location were irrelevant.

Array parameters need special attention. Comma-separated, repeated-key, and JSON-string conventions are not interchangeable. ShopVerse does not define array-valued query filters. Teach other serialization styles as illustrative examples and specify their OpenAPI `style` and `explode` behavior when used.

## What the technical writer must document

State exact filter semantics: `q` performs a case-insensitive substring match against product names, not a full-text search of every field. `categoryId` is an exact identifier match. `availability` and `sort` have explicit allowed values. Unsupported enum spelling is not automatically normalized.

Also explain empty results, invalid cursors, maximum page size, sort stability, total-count meaning, and whether pagination creates a snapshot. Include both first-page and next-page examples. A reference that documents only `limit` leaves the reader unable to finish a complete traversal.

## Common mistakes and corrections

**Weak:** "Use limit to get more products."

**Better:** "Set limit from 1 through 100; the default is 20. Increase offset by the number of records consumed, preserving filters and sorting. The response reflects the current dataset, not a snapshot."

## Practical exercise

Write a two-request sequence that retrieves in-stock products in price order one at a time. Explain what could go wrong if a cheaper product is inserted between requests.

## Model answer

First use `availability=IN_STOCK&sort=PRICE_ASC&limit=1&offset=0`, then the same parameters with `offset=1`. If a new cheaper record is inserted before the original first record, positions shift; the second request can return a product already seen. A client that needs snapshot consistency requires an API feature that actually provides it, not a documentation claim that offset traversal is always stable.

## Recap

Pagination is a workflow and a consistency model, not just a parameter. Document how to begin, continue, stop, and interpret changes between pages.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/).

Continue to [the next lesson](#/lesson/l12).


---

# Status codes and Problem Details

Write error documentation that explains what happened and what the developer should do next.

## Learning objectives

- Interpret success and error statuses in context
- Read an RFC 9457-style error representation
- Distinguish retryable conditions from input and state problems

## Prerequisites

Read [the previous lesson](#/lesson/l11), or review its recap before continuing.

## Status and body work together

An HTTP status communicates a broad result category. The response body supplies operation-specific details. 200 indicates success for a response with a representation; 201 commonly signals resource creation; 204 indicates success without a response body. 304 belongs to conditional retrieval and has no body.

400 indicates a bad request under the service's contract. 401 means valid authentication credentials are missing; 403 means the request is forbidden. 404 means the target was not found under the service's behavior. 409 identifies a conflict with current state. 415 concerns unsupported request media. 429 signals rate limiting. A 5xx response indicates a server-side failure, but it does not automatically prove that a write had no effect.

Do not treat these descriptions as an exhaustive guarantee for every API. A service may intentionally return 404 instead of revealing whether a protected resource exists. ShopVerse uses explicit ownership failures for teaching, and its reference describes that choice.

## A live failure example

```bash
curl -i http://localhost:3000/api/v1/products/prod_missing
```

The demo returns a response of this form:

```json
{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "Product prod_missing was not found.",
  "instance": "/api/v1/products/prod_missing",
  "code": "NOT_FOUND",
  "fields": []
}
```

The media type is `application/problem+json`. RFC 9457 defines the general Problem Details model; `code` and `fields` are ShopVerse extension members. They are not universally required RFC fields. `about:blank` identifies a problem whose meaning follows the HTTP status rather than a separate domain-specific problem type.

## Write actionable recovery guidance

A useful error guide maps a symptom to a cause and a next action. For an invalid quantity, tell the developer the accepted integer range. For an ownership failure, tell them to use the owning account, not to retry the same token indefinitely. For a duplicate review, explain the one-review-per-customer/product rule.

Avoid displaying internal stack traces, database statements, secrets, or unrelated account details. Technical precision does not require exposing implementation internals. An actionable message describes the consumer-visible problem and a safe path forward.

## Separate malformed input from business conflict

Quantity zero is invalid input because it falls outside the documented range. An ACTIVE cart containing an already-added product causes a conflict because the request clashes with existing state. A delivered order cannot be cancelled because of a lifecycle rule, not because the JSON is malformed.

These distinctions matter for client behavior. Fix the input for a validation error, choose the proper operation for an existing resource, and check state before retrying a lifecycle conflict. Repeating the same request unchanged is not a universal recovery strategy.

## Demonstrate rate limiting honestly

The local demo supports `X-Demo-Error: rate-limit`, which deterministically returns 429 with `Retry-After: 5`. This is a lab trigger, not an actual quota enforcement system. Removing the header disables the trigger. The course does not claim that ShopVerse has a production request-per-minute plan.

A real rate-limit guide should describe quota scope, windows, headers, backoff, and whether all operations share the same budget. Do not invent those values from another company's documentation.

## What the technical writer must document

For relevant failures, include status, media type, body schema, stable machine code, an example, likely causes, and recovery guidance. State which fields clients may programmatically inspect and which prose messages might change. Include correlation or request IDs only if the service actually emits them.

Test error examples as carefully as success examples. If the documented 409 example actually produces 400 because a required field is missing first, it does not demonstrate the intended conflict. Prepare valid inputs and the exact state necessary to isolate the condition.

## Common mistakes and corrections

**Weak:** "On any error, retry the request."

**Better:** "Correct validation failures before retrying. For an uncertain order-creation result, replay the same request with its original idempotency key. Treat rate limits according to the documented delay."

## Practical exercise

Write troubleshooting guidance for `ORDER_STATE` when cancelling `ord_1001`. Explain why changing the token is not the right default fix.

## Model answer

The seeded order is DELIVERED. ShopVerse cancellation accepts only CONFIRMED orders, so the request returns 409 even for the owning customer. Retrieve the order to confirm its state. Use a newly created confirmed order for the cancellation lab, or request a return for the delivered seed order. A different token does not change the lifecycle restriction and may add an authorization failure.

## Recap

A status code classifies the outcome; a well-documented error helps the client recover. Explain input, permissions, state, and retry behavior separately.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [Problem Details, RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html).

Continue to [the next lesson](#/lesson/l13).


---

# Anatomy of a complete endpoint reference

Build a reference page that answers the questions a developer asks immediately before and after a request.

## Learning objectives

- Create a predictable endpoint-page structure
- Document fields and side effects together
- Provide complete success and failure examples

## Prerequisites

Read [the previous lesson](#/lesson/l12), or review its recap before continuing.

## Start with the business purpose

An endpoint title should explain its action: "Add a product to a cart" is more useful than "Cart endpoint." Follow it with the exact method and path. Explain when to use the operation and what it does not do. Adding an item changes an ACTIVE cart; it does not reserve stock, charge a payment method, or create an order in this demo.

Place authentication and ownership near the top. The developer should not discover a required role after copying a long request example. For cart changes, the owner or administrator can act, but creating a new cart itself requires a customer identity.

## A reference skeleton

```text
Title and purpose
Method and path
Access and prerequisites
Path, query, and header parameters
Request body and constraints
Successful response and side effects
Relevant errors and recovery
Complete cURL and JavaScript examples
Related integration guide
```

This structure is a checklist, not a rigid page-layout requirement. Short public reads may need less explanation than order creation. The goal is predictable retrieval of information, not filling every section with boilerplate.

## ShopVerse operation example

The **live** operation `POST /api/v1/carts/{cartId}/items` takes this body:

```json
{
  "productId": "prod_1001",
  "quantity": 1
}
```

`cartId` is a path parameter. `productId` and `quantity` are body properties. The quantity is required and has no default. The product must exist and be IN_STOCK. The cart must be ACTIVE, contain fewer than ten distinct products, and not already contain this product.

The successful response is 201 with the updated Cart representation, not just the newly created item. That choice needs explicit documentation because another API could legitimately return an item resource instead.

## Field tables need semantics

For each field, record location, type, requiredness, nullability, constraints, and meaning. A required path parameter is not the same as a required body property. For nested objects, distinguish the outer object's presence from its required child fields.

Descriptions should explain where to obtain IDs. The cart ID comes from cart creation or the seed setup. The product ID comes from the catalogue. A cart item ID, needed for later update/removal, comes from the returned cart's `items` array. Do not leave consumers to infer those relationships from similar-looking strings.

## Document the complete exchange

A success example should show the request, status, relevant headers, and body. If a value is dynamic, label it as such. A created ID or timestamp should not be presented as a guaranteed literal for every execution. An excerpt is acceptable when clearly identified, but provide a full downloadable fixture for validation.

For failures, select cases that matter to this operation: missing credentials, wrong owner, unknown product, invalid quantity, duplicate item, closed cart, and unavailable stock. Avoid attaching the same generic error list to every operation without checking that the behavior is possible.

## Link reference to workflows

The operation page should link to a cart-and-order tutorial. The tutorial explains the sequence and passes returned IDs between steps. The reference explains all valid inputs and outcomes for one step. This separation lets a beginner follow a guided route while an experienced developer performs a quick lookup.

Reference generation helps maintain field names and types, but generated prose cannot infer business meaning. Review descriptions as real writing. "The quantity of the quantity field" is not useful simply because it was generated consistently.

## What the technical writer must document

Capture access, prerequisites, state changes, input validation, response meaning, repeat behavior, and safe recovery. Document limitations that affect integration decisions: no stock reservation, no tax calculation, and no payment processing in this learning service.

Review code examples independently. A cURL example should use the correct method and shell quoting. A JavaScript example should serialize JSON, check HTTP status, and avoid exposing real credentials. Both must send equivalent business data.

## Common mistakes and corrections

**Weak:** "Returns cart information."

**Better:** "Returns the updated Cart, including the new item ID and a total calculated from current catalogue prices. Tax and shipping charges are not included."

## Practical exercise

Draft the parameter table and success description for `PATCH /carts/{cartId}/items/{itemId}`. Include the meaning of quantity and the removal alternative.

## Model answer

`cartId` and `itemId` are required opaque path IDs. The JSON body requires `quantity`, an integer from 1 through 99. The value replaces the existing quantity rather than incrementing it. The operation returns 200 with the updated Cart. Quantity zero is invalid; use `DELETE` on the same item path to remove it. The cart must remain ACTIVE and the caller must be its owner or an administrator.

## Recap

A complete endpoint page describes an action, its boundaries, and its consequences. Types and paths are necessary, but they do not replace meaningful behavior documentation.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l14).


---

# Product API documentation workshop

Apply the reference structure to reads, creation, replacement, partial update, and deletion.

## Learning objectives

- Compare six product operations
- Write accurate money and markdown descriptions
- Explain ownership and write constraints

## Prerequisites

Read [the previous lesson](#/lesson/l13), or review its recap before continuing.

## Build a small operation map

The Product API supports listing, retrieval, creation, complete writable replacement, partial update, and deletion. Product reads are public. Creation requires a seller or administrator; changing an existing product requires its owning seller or an administrator. A seller role alone does not authorize modifications to every seller's products.

Use this operation map to organize the reference before writing individual pages. Common concepts such as Money, product IDs, and availability can be defined once and linked from each page. Operation-specific behavior still needs a local explanation.

## Public reads

`GET /products` returns a paginated collection. `GET /products/{productId}` returns one product and supports a conditional ETag request. Listing has filters and sort options; retrieval has a required identity. Do not copy the collection's query parameters onto the member endpoint unless the server supports them.

Product responses include a nullable `priceBeforeMarkdown`. A null value does not mean the product costs zero. It means no original markdown price is recorded. Current price is always represented separately by `price`.

## Create a product

This **live** request body works with the seller token and `POST /products` after a clean reset:

```json
{
  "name": "USB-C Cable",
  "description": "A two metre charging cable.",
  "sku": "USB-C-02",
  "price": { "amountMinor": 49900, "currency": "INR" },
  "priceBeforeMarkdown": null,
  "availability": "IN_STOCK",
  "categoryId": "cat_accessories"
}
```

The service assigns the product ID, seller ID, and creation time. Name is 1-120 characters; SKU is 1-64 and unique among product SKUs. Unit prices are nonnegative integer INR minor units and are capped at 1,000,000 in this bounded demo. The category must already exist.

Repeating creation with the same SKU returns a conflict. A tutorial should therefore tell a reader to reset the data, choose a new SKU, or reuse the existing product appropriately. A replayed sample is not automatically a harmless retry.

## Replacement and partial update

PUT requires the full writable input. Omitted optional description resets to an empty string; omitted original price resets to null. PATCH changes only supplied fields. An empty patch object is rejected; supply at least one field. Only `priceBeforeMarkdown` accepts null as a clearing operation.

For both operations, the original price must not be lower than the current price. Updating current price alone can violate that rule when an existing original price remains set. This is a cross-field business constraint that deserves an explicit example, not just two independent numeric bounds.

## Delete without erasing history

Product deletion returns 204 with no body. A product referenced by an ACTIVE cart cannot be deleted. Historical order item snapshots remain available after catalogue deletion. That means a consumer should not assume that retrieving an old order guarantees a corresponding live catalogue product still exists.

The read-only variant examples illustrate product/variant relationships, but checkout uses a product ID rather than variant selection. State that boundary clearly; otherwise a developer might build a variant checkout flow the local API cannot execute.

## What the technical writer must document

Document permissions per operation, required fields, generated fields, nested Money constraints, SKU uniqueness, category lookup, update semantics, and deletion restrictions. Explain allowed availability values and their effect on cart additions. The demo uses availability labels rather than a numeric inventory ledger.

Create at least one negative example that isolates a business rule: an original price lower than the current price, a duplicate SKU, or an update by another seller. Ensure the rest of the request is valid so the intended failure is the one observed.

## Common mistakes and corrections

**Wrong:** "The seller can update products."

**Correct:** "The owning seller can update this product; administrators can update any product."

**Wrong:** "PUT changes the fields you include."

**Correct:** "PUT replaces the writable details and applies documented defaults to omitted optional values. Use PATCH to leave unspecified fields unchanged."

## Practical exercise

Write a PATCH example that changes the current price to INR 3,499.00 and clears the original markdown price. Explain why leaving the old original price in place would fail for the seeded headphones.

## Model answer

Use `{"price":{"amountMinor":349900,"currency":"INR"},"priceBeforeMarkdown":null}` with the owning seller token. The seeded original price is 299900, lower than the proposed current price. A patch that updates only `price` preserves that original value and violates the cross-field rule. Explicit null clears it, allowing the new current price.

## Recap

A product workshop should connect schema constraints to realistic seller actions. Permissions, update semantics, and business relationships are as important as a successful JSON example.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l15).


---

# Write a cart-to-order integration guide

Document a multi-step purchase workflow, including transferred IDs, state changes, and recovery.

## Learning objectives

- Create a sequence with explicit prerequisites
- Explain order snapshotting and cart closure
- Handle uncertain order-creation outcomes

## Prerequisites

Read [the previous lesson](#/lesson/l14), or review its recap before continuing.

## A workflow is more than adjacent endpoints

A useful integration guide explains why steps occur in a particular order, which values flow between them, and what each step changes. A list of endpoint links leaves those connections implicit. Begin with a goal: create one confirmed order containing an available product for the demo customer.

Prerequisites are a running local server and the customer demo token. Resetting gives a predictable starting dataset, but the guide should use returned IDs for resources it creates. Do not require readers to guess which numeric suffix the server will assign next.

## The purchase sequence

1. Retrieve `prod_1001` and inspect its availability and current price.
2. Create a cart with `POST /api/v1/carts`.
3. Copy the returned cart ID.
4. Add `prod_1001` with quantity 1 to that cart.
5. Retrieve the cart and confirm its item and total.
6. Place an order with the cart ID, shipping address, and an idempotency key.
7. Copy the returned order ID and retrieve the order.

The preliminary availability check improves the user experience but is not a guarantee that checkout will succeed later. The service validates availability again during order creation. Documentation should not turn an earlier observation into a transactional guarantee.

## Order creation input

The following is a **live-compatible body**. Replace the cart ID with the value returned in your own run:

```json
{
  "cartId": "cart_1001",
  "shippingAddress": {
    "line1": "10 Demo Street",
    "city": "Bengaluru",
    "postalCode": "560001",
    "country": "IN"
  }
}
```

Send `Authorization: Bearer demo-customer-token`, `Content-Type: application/json`, and `Idempotency-Key: order-demo-001`. The address is synthetic; do not enter a real home address. Only country IN is supported in this demo.

A new order returns 201 and `Idempotency-Replayed: false`. An identical retained replay returns 200 with the saved order response and `Idempotency-Replayed: true`. These statuses represent different handling of the same purchase intent, not two separate orders.

## Explain the side effects

Successful checkout snapshots product names, quantities, and unit prices into order items. The order starts CONFIRMED. The cart becomes CHECKED_OUT and can no longer be modified. The stored order total does not change when the seller later updates a catalogue price.

No money is charged. Tax and shipping fees are not calculated. Numeric inventory is not reserved or decremented. New orders do not automatically become shipped or delivered. The seeded delivered order exists to support shipment and return exercises. These are explicit training boundaries, not missing steps that learners should discover through trial and error.

## Recover from failure

If a request is rejected before creation because the cart is empty, add an item and submit a valid request. If an HTTP response is lost or the client aborts while waiting, the order may already exist. Replay the identical order request with the same retained key rather than inventing a new purchase intent.

A key reused with a different address or cart ID returns 409. Keys are scoped to the customer and retained only until reset or restart in this in-memory implementation. Do not promise replay protection across those boundaries. Real services must publish their own retention and concurrency semantics.

## What the technical writer must document

Include prerequisites, exact sequence, ID handoffs, token requirements, expected statuses, side effects, and recovery decisions. State when a reader should start a new cart. Distinguish the visible cart total before checkout from the order snapshot after checkout.

An integration guide also needs an observable completion check: retrieve the order and confirm its item and CONFIRMED status. A successful-looking button click or lack of a console exception is not enough to prove that the intended workflow finished.

## Common mistakes and corrections

**Weak:** "Create a cart and place an order."

**Better:** "Create a cart, use its returned ID to add an available product, then submit that cart with a shipping address and a retained idempotency key. Confirm that the order exists and the cart is now CHECKED_OUT."

## Practical exercise

A user changes the shipping address after an order request times out. Explain why they should not reuse the original idempotency key with the changed body and what information they must establish first.

## Model answer

The old key identifies the original order request, including its address. Reusing it with changed details conflicts. First establish the outcome of the original attempt, preferably by replaying the original body/key while it remains retained. An order may already exist. An address-change capability is not implemented in this demo, so the guide must not invent an update endpoint; use a documented cancellation/new-order workflow only when the existing state permits it.

## Recap

A reliable guide connects actions, data, state, and recovery. Teach the purchase intent as carefully as the individual HTTP calls.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html).

Continue to [the next lesson](#/lesson/l16).


---

# Troubleshooting and trustworthy code samples

Build diagnostic guidance that narrows a problem instead of asking readers to try random fixes.

## Learning objectives

- Write symptom-cause-check-fix guidance
- Audit sample code for hidden assumptions
- Separate API defects from expected validation failures

## Prerequisites

Read [the previous lesson](#/lesson/l15), or review its recap before continuing.

## Troubleshooting starts with an observable symptom

"The API does not work" is not a useful diagnostic category. Ask what request was sent, what status and body were returned, which environment was used, and what the caller expected. A browser CORS failure, a 401 response, a 409 business conflict, and invalid JSON require different investigations.

A troubleshooting entry should connect a symptom to likely causes, a verification step, a remedy, and an escalation boundary. Avoid giving a long unordered list of possible fixes. The reader should be able to narrow the problem using evidence.

## ShopVerse diagnostic table

| Symptom | Check | Next action |
|---|---|---|
| 401 on /me | Is Authorization present and correctly formatted? | Use the customer demo bearer token. |
| 403 on a product update | Does the token belong to the product's seller? | Use the owning seller or administrator token. |
| 400 on quantity | Is it an integer from 1 through 99? | Correct the type/range; use DELETE to remove an item. |
| 409 on order creation | Is the cart nonempty and ACTIVE? | Inspect the cart and the specific error code. |
| 409 on cancellation | Is the order CONFIRMED? | Do not cancel the delivered seed order. |
| Browser cannot reach API | Was the page opened from the local server? | Open the same-origin course URL rather than the disk reader. |

The table gives starting points, not proof of a single cause. Inspect the actual Problem Details `code` and `detail` before deciding what happened.

## A sample must survive normal failures

A minimal fetch example that logs the response may be useful for introducing syntax. A production-style integration example needs more: status checking, safe parsing, cancellation behavior, token handling, and operation-specific retry logic. Label the purpose and limitations of the sample so readers do not confuse a teaching snippet with a complete client library.

Avoid examples that silently swallow errors and print success. Do not stringify an `Error` object and assume its message will be preserved in the desired format. Show meaningful error handling without exposing real secrets or internal stack traces to end users.

## Empty responses and non-JSON errors

Product deletion returns 204. Calling `response.json()` unconditionally produces a parsing error even though deletion succeeded. A general HTTP wrapper should account for no-body responses and inspect content type. Intermediaries can also return non-JSON responses, especially for failures outside the application.

For GraphQL, a 200 response may still contain an `errors` array, sometimes alongside useful `data`. HTTP success and application completion are different checks. This is not a reason to ignore HTTP statuses; it is a reason to interpret both layers.

## Reproduce the exact scenario

To demonstrate a duplicate review, use a product already reviewed by that customer. To demonstrate an invalid rating, choose a request that will not be rejected earlier for an unrelated reason. To demonstrate a closed cart, complete checkout first. A well-designed negative test controls prerequisites so it isolates the intended rule.

Capture the request and response as text, not only a screenshot. Include the reset/setup steps. If the bug depends on concurrency or a server restart, record that timing explicitly. Do not claim a test covered those cases when it only ran sequential happy-path requests.

## What the technical writer must document

Publish supported troubleshooting steps, expected outcomes, and the information needed for escalation. A real support escalation might request a request ID, timestamp, environment, operation, and sanitized sample. This demo does not emit a request-correlation ID, so its guide should not instruct learners to find a nonexistent header.

For code samples, document runtime, prerequisites, inputs, output, assumptions, and cleanup. Explain whether a sample changes data. A script that creates orders should not be presented as a harmless read-only diagnostic.

## Common mistakes and corrections

**Wrong:** "Disable browser security to fix CORS."

**Correct:** "Use the supported same-origin server URL or configure an approved CORS policy in an appropriate environment."

**Wrong:** "A timeout means no order was created."

**Correct:** "The client stopped receiving a result. The server may still have processed the request; use documented idempotent recovery."

## Practical exercise

A learner reports that deleting a product "failed" because their JavaScript threw `Unexpected end of JSON input`. They captured HTTP 204. Write the troubleshooting entry.

## Model answer

The captured status indicates successful deletion with no body. The client error came from trying to parse that empty body as JSON. Check for 204 before parsing, or read text and parse only when content is present and expected. Verify that a later product retrieval returns 404. Do not repeat a destructive operation just to fix a client-side parsing mistake.

## Recap

Good troubleshooting is a decision process based on evidence. Good sample code makes its assumptions and failure handling visible rather than hiding complexity behind a success message.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [Problem Details, RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html); [MDN web documentation](https://developer.mozilla.org/).

Continue to [the next lesson](#/lesson/l17).


---

# Authentication, authorization, and OAuth

Explain how callers obtain access and what they are permitted to do without confusing tokens, identities, and scopes.

## Learning objectives

- Distinguish authentication from authorization
- Explain common OAuth use cases
- Document the demo tokens without presenting them as production security

## Prerequisites

Read [the previous lesson](#/lesson/l16), or review its recap before continuing.

## Identity and permission are separate questions

Authentication establishes who or what is calling. Authorization determines whether that caller can perform a particular action on a particular resource. A valid token does not guarantee access to every operation or every account's data.

ShopVerse demonstrates role and ownership checks. A seller token identifies a seller, but only the owning seller or an administrator can update a product. A customer cannot retrieve another customer's cart merely because both are customers. A customer-profile request without a valid demo token returns 401; a seller token used for that profile operation returns 403.

## Common credential forms

An API key is an application credential whose exact meaning depends on the service. A bearer token grants access to whoever possesses it, subject to server validation and permissions. A JWT is a token representation format, not a synonym for OAuth or a guarantee that the token is trustworthy.

A signed JWT can carry claims, but verifying the signature alone is not the complete acceptance policy. A service also considers the expected issuer, audience, expiry, algorithm policy, and authorization context. An opaque access token can be perfectly legitimate; consumers should not assume every token can or should be decoded.

## The local demo is deliberately different

This **live** request uses a fixed educational token:

```bash
curl -i http://localhost:3000/api/v1/me -H "Authorization: Bearer demo-customer-token"
```

The string is not a JWT and is not obtained through an OAuth token endpoint. It maps directly to a seeded identity in the local service. The other published tokens demonstrate seller, administrator, and ownership-failure cases. Never reuse this mechanism as a production identity provider.

The website keeps the selected demo token in the current form rather than storing credentials with learning progress. Imported notes and progress files are not credential stores. Keep real secrets out of requests made through a training project.

## OAuth use cases

OAuth 2.0 is an authorization framework for delegated access. In an authorization-code flow with PKCE, a client creates a verifier and challenge, directs the user through an authorization step, receives an authorization code, and exchanges it using the verifier. Exact endpoints, parameters, redirect registration, and token handling depend on the provider.

A browser-based public client cannot safely hide a static client secret in shipped JavaScript. PKCE binds the code exchange to the initiating client instance. It does not eliminate the need to validate redirects, handle state correctly, or protect tokens after receipt.

The client-credentials grant is used for a confidential application acting on its own behalf, such as a server-to-server integration. It does not represent a user signing in. OAuth alone is not an identity protocol; OpenID Connect adds an authentication layer for user identity use cases. Do not recommend deprecated or insecure legacy flows as default onboarding patterns.

## Scopes, roles, and ownership

A scope is a permission label defined by an authorization system. A role groups abilities according to an application's model. Ownership connects access to a particular resource. These mechanisms may coexist, and one does not automatically replace the others.

The executable ShopVerse API uses roles and ownership, not an OAuth scope system. A lesson may show illustrative scope names such as `orders:write`, but those names are not magically enforced by adding them to documentation or OpenAPI. Keep the live security scheme and illustrative OAuth examples separate.

## What the technical writer must document

Explain how to obtain credentials, where to send them, which permissions are required, how expiration/revocation is handled, and how to troubleshoot access failures. For production OAuth, document registered redirects, supported grants, requested scopes, token endpoints, refresh behavior, and safe handling using approved provider details.

For the demo, document the exact token-to-role map and its limits. State that tokens are fixed, public, local-only, and reset-independent. Do not invent expiry or refresh endpoints that do not exist.

## Common mistakes and corrections

**Wrong:** "OAuth logs the user in and every JWT is an OAuth token."

**Correct:** "OAuth delegates authorization. JWT is a token format; user authentication commonly uses a protocol such as OpenID Connect."

## Practical exercise

Explain why `demo-other-customer-token` cannot retrieve `cart_1001`, even though it is a valid customer token. Write a recovery sentence that does not suggest broadening permissions unnecessarily.

## Model answer

The cart belongs to `cust_1001`, while the other token maps to `cust_1002`. The request fails the ownership check. Use the owning customer's token or retrieve a cart created by the other customer. Do not use an administrator token as the default workaround for an ordinary customer integration.

## Recap

Document identity, permission, and ownership separately. Security examples must describe the system actually implemented, not a more sophisticated protocol that merely sounds familiar.

## Sources and related reading

[OAuth 2.0 security best current practice, RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html).

Continue to [the next lesson](#/lesson/l18).


---

# Rate limits, retries, and idempotency keys

Give developers a recovery policy that avoids unnecessary traffic and accidental duplicate work.

## Learning objectives

- Explain uncertain outcomes and retry conditions
- Document idempotency scope and retention
- Distinguish a rate-limit simulation from real quota enforcement

## Prerequisites

Read [the previous lesson](#/lesson/l17), or review its recap before continuing.

## A failed response is not always a failed action

A client can lose its connection after the server commits a write but before the response arrives. A timeout therefore means the client lacks a result, not that the operation definitely did nothing. Retrying blindly can create duplicate business actions when the operation has no replay protection.

Document outcomes in terms of the operation's contract. For a safe read, retrying may be reasonable after a transient network problem. For a payment or order write, an API-specific idempotency mechanism or an outcome lookup may be necessary. Do not make a universal rule based only on one status category.

## ShopVerse's idempotency contract

`POST /orders` requires `Idempotency-Key`, a string from 1 through 128 characters. The key is scoped to the customer. The service retains the request fingerprint and original result until reset or restart. Identical retained requests replay the original result without creating another order.

```text
First request: same customer + key A + body X -> 201, new order
Retry:         same customer + key A + body X -> 200, saved order result
Mismatch:      same customer + key A + body Y -> 409, no new order
Different key: same customer + key B + body X -> separate attempt
```

The last line is not a safe retry strategy. In this demo, the cart may already be closed, but that state conflict is not a substitute for correctly retaining the key. An integration should create a key for one intended order and keep the body associated with it.

## Retention and replay semantics

Retention matters because a key cannot prevent duplicates after the service has forgotten it. The local process uses an in-memory map rather than durable shared storage. It does not demonstrate distributed exactly-once delivery, cross-process coordination, or production persistence.

The replayed response is the saved original order result. If the order is later cancelled, replaying the original creation request can still return its original creation snapshot. Retrieve the order resource to inspect its current state. Documentation must distinguish a replay receipt from a fresh resource read.

## Rate-limit guidance

Real APIs may limit requests per account, token, application, endpoint, or time window. The rules and response headers are service-specific. A useful guide states the scope, reset behavior, retry signals, and whether clients should coordinate a shared budget.

For a deterministic **live lab**, send:

```bash
curl -i http://localhost:3000/api/v1/products -H "X-Demo-Error: rate-limit"
```

The response is 429 with `Retry-After: 5`. This is a teaching trigger. There is no actual quota counter; leaving the trigger on continues to request the error. Remove the header to resume normal requests. Do not interpret this example as a production request-per-second policy.

## Backoff and cancellation

A retry policy often uses a bounded exponential delay plus jitter to avoid many clients retrying at once. Respect a documented Retry-After value when applicable. That header can represent a delay in seconds or an HTTP date, depending on the response. Set a maximum attempt count and an overall deadline instead of retrying indefinitely.

Do not retry validation and permission errors without changing the cause. Do not retry a conflict simply because it is a 4xx response. Aborting a client request does not guarantee cancellation of server-side work, so the recovery policy should preserve information needed to determine the outcome.

## What the technical writer must document

State retryable conditions, required keys, key generation responsibility, uniqueness scope, retention, body-matching rules, replay statuses, and any concurrency behavior the service guarantees. Keep unsupported guarantees out of the documentation.

A sample should demonstrate retaining a key outside the retry loop. A subtly wrong code sample that creates a new UUID for every attempt can defeat otherwise excellent prose. Review retry code against the business contract, not just syntax.

## Common mistakes and corrections

**Weak:** "Requests are idempotent, so you can retry forever."

**Better:** "Identical order requests with the same customer/key replay while that key remains retained. The demo loses retention on reset or restart. Check the current order resource for later state changes."

## Practical exercise

An order was created, then cancelled. The original creation request is replayed with its retained key and returns CONFIRMED. Is that proof cancellation failed?

## Model answer

No. The replay returns the saved creation result, not a new current-state lookup. Retrieve the order by ID to confirm its present status. The documentation should explicitly describe this distinction so a client does not treat an idempotent receipt as a fresh snapshot of a mutable resource.

## Recap

Reliable recovery depends on precise scope, retention, and outcome semantics. Explain what can be retried, under which identity, with which data, and for how long.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html).

Continue to [the next lesson](#/lesson/l19).


---

# Caching, API evolution, and deprecation

Document representation freshness and change management without promising compatibility that the API cannot guarantee.

## Learning objectives

- Explain ETags and conditional requests
- Separate API versions from specification versions
- Assess additive and breaking changes

## Prerequisites

Read [the previous lesson](#/lesson/l18), or review its recap before continuing.

## Caching is a behavior contract

A cache stores a representation for reuse under specified conditions. Cache-Control directives communicate policy, while validators such as ETags help determine whether a stored representation is still current. Caching is not simply "the browser remembers the response," and it must account for authorization and representation differences.

An ETag is an opaque validator. Clients should store and resend it rather than interpret its characters as a version number. A weak validator and a strong validator have different comparison semantics in HTTP. The local product endpoint uses a generated strong tag for its JSON representation and supports conditional reads.

## A live conditional request

First retrieve a product and capture the exact ETag header:

```bash
curl -i http://localhost:3000/api/v1/products/prod_1001
```

Then repeat the request with `If-None-Match` set to that value, including its quotes. The literal below is a **placeholder**, not the product's actual tag:

```bash
curl -i http://localhost:3000/api/v1/products/prod_1001 -H 'If-None-Match: "PASTE_ETAG_HERE"'
```

A matching representation returns 304 with no body. Reuse the cached representation; do not try to parse a new JSON product from the empty response. After a seller changes the product, the old tag no longer matches and a fresh read returns 200 with the new representation.

## State the exact freshness policy

This endpoint sends `Cache-Control: private, max-age=0, must-revalidate`. That permits private storage but requires revalidation before reuse once stale; it is not a promise of a long freshness lifetime. Other demo JSON responses use `no-store` by default.

Do not assume the same policy applies to every endpoint. An authenticated order response and a public catalogue response can require different handling. If a response varies by a request header, the service must account for that variation in its caching strategy; document the relevant behavior rather than inventing a generic caching recommendation.

## Versions have different purposes

The URL's `/v1` identifies the business API's chosen version convention. OpenAPI's `openapi: 3.1.1` identifies the description language version. `info.version: 1.0.0` describes the API information's version according to this project's convention. A library's package version is another independent number.

A version label by itself does not explain a change policy. State how compatibility is evaluated, when consumers must migrate, how long older behavior remains supported, and where deprecations are announced. The learning project does not make a production support-duration promise.

## Additive does not always mean harmless

Adding an optional response field is often compatible for consumers that ignore unknown fields. It can still affect clients with strict response validation or generated models. Adding an enum member may break exhaustive switches. Adding a required input property without a usable default changes what existing clients must send.

For GraphQL, clients select fields, so a new field does not automatically appear in every existing response. However, schema changes can still affect validation, code generation, input coercion, and consumer assumptions. Classify changes by direction and consumer impact rather than calling every addition safe.

## What the technical writer must document

For caching, include request/response headers, body behavior for 304, validator handling, and any authorization considerations. For evolution, record the old and new contract, affected operations, compatibility assessment, deprecation notice, migration steps, and consumer action.

A deprecation should explain the replacement and why it is preferable. Marking a field deprecated without an alternative or timeline leaves readers uncertain. Do not invent a removal date; state when it is unannounced.

## Common mistakes and corrections

**Wrong:** "304 is an error because it is not 2xx."

**Correct:** "304 is the expected conditional-response result when the cached representation remains valid. It has no new response body."

**Wrong:** "A new enum value cannot break clients."

**Correct:** "A new value can affect exhaustive client logic; review generated models and handling of unknown values."

## Practical exercise

A new availability value `PREORDER` is proposed. Explain the documentation and client-compatibility questions before adding it to the live API.

## Model answer

Define whether preordered products can be added to carts, when orders can be created, and what delivery expectations apply. Update schemas, field references, examples, business validation, and release notes together. Assess clients that exhaustively handle only IN_STOCK and OUT_OF_STOCK. This is a proposal, not a current ShopVerse feature; do not publish it as live until implementation and tests agree.

## Recap

Freshness and compatibility are observable behaviors, not slogans. Explain exact headers and exact changes, then connect them to what consumers must do.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/).

Continue to [the next lesson](#/lesson/l20).


---

# Webhooks, asynchronous work, and uploads

Document event-driven integrations and long-running tasks while keeping unimplemented examples clearly labelled.

## Learning objectives

- Describe webhook delivery and verification
- Explain polling for asynchronous operations
- Document multipart upload requirements

## Prerequisites

Read [the previous lesson](#/lesson/l19), or review its recap before continuing.

## Identify who initiates the interaction

In a normal request/response workflow, the client initiates an API call. With a webhook, the service sends an HTTP request to a consumer-controlled receiver when an event occurs. The webhook payload represents an event; it is not automatically a fresh, complete snapshot of every related resource.

This lesson's webhook, asynchronous job, and upload examples are **illustrative extensions**. The live ShopVerse server does not send outbound webhooks, accept arbitrary destination URLs, run background fulfilment jobs, or implement file uploads. Keeping that distinction visible prevents readers from trying endpoints that do not exist.

## An illustrative order event

```json
{
  "eventId": "evt_demo_1001",
  "type": "order.confirmed",
  "occurredAt": "2026-01-16T09:00:00.000Z",
  "data": {
    "orderId": "ord_1002",
    "status": "CONFIRMED"
  }
}
```

Document each identifier's role. `eventId` identifies an event for deduplication; `orderId` identifies the business resource. A delivery attempt ID, if the service has one, would identify one attempt to deliver an event. Do not interchange them.

## Delivery guarantees and duplicate handling

A real webhook guide needs delivery policy, acknowledgment requirements, retry schedule, timeouts, duplicate behavior, ordering expectations, and retention. Many systems can redeliver events, so receivers should avoid repeating side effects merely because another HTTP request arrived. Do not claim exactly-once delivery unless the implementation truly guarantees it.

A receiver can acknowledge receipt quickly and process work separately, but the precise acknowledgment status and timing belong to the provider's contract. An event delivered later can describe an earlier resource state. Consider retrieving the current resource when that distinction matters, while respecting authorization and rate limits.

## Signature verification

Document the exact signed bytes, algorithm, encoding, header names, timestamp policy, and secret-rotation behavior. A common HMAC design signs the raw request body or a specified timestamp/body combination. Re-serializing parsed JSON can change whitespace or property order and invalidate the signature.

Use a timing-safe comparison after validating the signature representation and length. Treat timestamp tolerance and replay detection as distinct from signature correctness: a valid old signed request may still need rejection. Never print the signing secret in public examples or logs.

## Asynchronous jobs and polling

A long-running operation may return 202 Accepted with a job location. That status means the request has been accepted for processing, not that the requested work has completed successfully. A polling guide should define job states, terminal outcomes, recommended polling behavior, error details, and retention of job results.

```text
Illustrative job states
QUEUED -> RUNNING -> SUCCEEDED
                 -> FAILED
                 -> CANCELLED (only if supported)
```

Do not add a cancellation state merely because it looks useful. Explain whether cancellation stops future work, attempts to interrupt current work, or is unsupported after a certain stage. Similarly, an upload acknowledgment does not prove a later import succeeded.

## Multipart uploads

Upload documentation should identify the HTTP method, media type, part names, allowed file types, maximum size, encoding, and error handling. `multipart/form-data` separates fields and files using a boundary. Browser `FormData` normally sets the appropriate boundary; manually overriding its Content-Type incorrectly can break the request.

State whether the server validates declared MIME type, actual file content, filename, and size. A file extension alone is not a trustworthy content check. A documentation example should use a harmless synthetic file, not customer exports or sensitive logs.

## What the technical writer must document

For events, define payload semantics and delivery behavior. For jobs, define lifecycle and completion checks. For uploads, define representation and limits. Add complete success and failure examples, but label proposals separately from deployed features.

## Common mistakes and corrections

**Wrong:** "The webhook arrives exactly once and in order."

**Correct:** "State the provider's actual delivery guarantees. Without an explicit guarantee, design and document duplicate and out-of-order handling."

## Practical exercise

Write a webhook reference checklist for an order-confirmed event. Include at least one question about security and one about repeated deliveries. Do not invent values for an unimplemented provider.

## Model answer

The checklist covers registration, event type, event and resource IDs, payload schema, version, signature algorithm and exact signed bytes, secret rotation, timestamp tolerance, acknowledgment requirements, retries, duplicate handling, ordering, and troubleshooting. Unknown values remain review questions. A proposed example may illustrate structure, but it must not be described as an observed ShopVerse delivery.

## Recap

Asynchronous documentation must distinguish acceptance, delivery, processing, and final outcome. The most important details often concern repetition, ordering, and verification rather than the happy-path payload.

## Sources and related reading

[HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [OAuth 2.0 security best current practice, RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html).

Continue to [the next lesson](#/lesson/l21).


---

# OpenAPI, Swagger, and version numbers

Learn what an OpenAPI description does and choose a supported baseline without confusing it with the API itself.

## Learning objectives

- Distinguish the specification from tooling
- Read the top-level OpenAPI structure
- Explain three independent version numbers

## Prerequisites

Read [the previous lesson](#/lesson/l20), or review its recap before continuing.

## OpenAPI describes an interface

OpenAPI is a machine-readable description format for HTTP APIs. It can express operations, parameters, request bodies, responses, security requirements, reusable schemas, examples, and related information. Tools can use the description to generate reference interfaces, clients, tests, or mock services.

A description does not implement the service. Adding a path to YAML does not create a server route. Adding a maximum length does not enforce validation unless the implementation or a middleware layer uses that contract. Good documentation work keeps description, behavior, and tests aligned.

## Specification versus tools

OpenAPI is the specification. Swagger is associated with a family of tools, including editors and interactive documentation renderers. A renderer consumes an OpenAPI description and presents it to people; it is not itself the definition of correct API behavior.

This project provides a local OpenAPI explorer and downloadable YAML/JSON contracts. Its renderer is intentionally integrated into the vanilla JavaScript course rather than relying on an unversioned CDN. The operation reference and model tables are derived from the same contract data used in the project.

## A small valid description

This **illustrative standalone contract** describes a simple health operation, not an extra operation added to the ShopVerse REST contract:

```yaml
openapi: 3.1.1
info:
  title: Example Health API
  version: 1.0.0
paths:
  /health:
    get:
      operationId: getHealth
      summary: Check service health
      responses:
        '200':
          description: The service is available.
```

`openapi` identifies the specification version. `info` contains API metadata. `paths` contains operation definitions. Responses use status-code keys, and the response description explains the result. The minimal example does not claim a JSON body because it has not defined one.

## Three version numbers

The specification version, such as 3.1.1, tells a parser which OpenAPI feature set to interpret. `info.version`, such as 1.0.0, identifies the described API information according to the project's versioning policy. A server path such as `/api/v1` is an API routing/version convention. A renderer package has its own unrelated release number.

Changing `openapi: 3.0.3` to `3.1.1` is not an API endpoint migration by itself. Conversely, a business API can introduce breaking behavior while its OpenAPI description still uses the same specification version. Keep those changes distinct in release notes.

## Choose and declare a baseline

This course's executable contract uses OpenAPI 3.1.1. It is a selected baseline, not a claim that 3.1.1 is the newest published edition. The official specification index lists later editions. Verify what your validator, renderer, generator, and consumer tooling support before adopting a newer feature.

OpenAPI 3.1 aligns its Schema Object with JSON Schema 2020-12 through the OpenAPI dialect. That changes how authors express details such as nullability compared with OpenAPI 3.0. Do not copy a 3.0-specific construct into a 3.1 document without checking its meaning.

## Documentation generation has limits

Generated tables can expose missing descriptions, but they cannot invent business semantics. A field named `priceBeforeMarkdown` still needs an explanation of what historical/reference price it represents, when it is null, and how it relates to current price. A generated quickstart cannot reliably infer the intended workflow or credential onboarding.

Treat the description as a contract source, then add task guides and conceptual explanations around it. Avoid maintaining a separate manual table that silently diverges from the schema when fields change.

## What the technical writer must document

Record the selected OpenAPI version, API versioning policy, supported environments, contract source location, validation command, publishing process, and known tool limitations. Define whether examples are captured, generated from fixtures, or illustrative. Maintain a source-of-truth policy for generated YAML/JSON copies.

## Common mistakes and corrections

**Wrong:** "Swagger 3.1.1 is the version of our API."

**Correct:** "The API description uses OpenAPI 3.1.1. The described ShopVerse API is version 1.0.0 and is served under `/api/v1`."

## Practical exercise

Explain why changing `info.version` does not automatically make old client requests invalid or create a new URL. Identify what else must be evaluated for a breaking change.

## Model answer

The field is metadata, not routing or validation logic. Evaluate operation inputs, outputs, permissions, status behavior, constraints, lifecycle rules, and actual deployment changes. A version label should communicate a policy-backed release; it does not create compatibility or incompatibility on its own.

## Recap

OpenAPI is a description language used by tools. Pick a supported version deliberately and keep specification, API, routing, and package versions conceptually separate.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [JSON Schema documentation](https://json-schema.org/learn/).

Continue to [the next lesson](#/lesson/l22).


---

# Document OpenAPI operations

Describe methods, inputs, responses, and headers with correct requiredness and clear operation identities.

## Learning objectives

- Build a Path Item and Operation Object
- Separate request-body presence from property presence
- Describe response bodies and relevant headers

## Prerequisites

Read [the previous lesson](#/lesson/l21), or review its recap before continuing.

## Begin with the path and method

In an OpenAPI document, each path maps to a Path Item containing operations such as `get`, `post`, or `patch`. The method name is lowercase in the description. A unique `operationId` gives tools and reviewers a stable operation identifier; a human-focused `summary` gives readers a quick explanation.

Use `description` for behavior that does not fit a brief title: prerequisites, permissions, side effects, and related workflow details. Tags group operations in a useful navigation structure. The grouping should reflect reader tasks or business areas rather than the server's internal source-code folder names.

## An annotated ShopVerse operation fragment

This is an **excerpt from a contract pattern**, not a complete OpenAPI document:

```yaml
/carts/{cartId}/items:
  post:
    operationId: addCartItem
    summary: Add a product to a cart
    parameters:
      - name: cartId
        in: path
        required: true
        schema:
          type: string
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CartItemInput'
    responses:
      '201':
        description: The updated cart after adding the item.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Cart'
```

The parameter name matches the placeholder in the path. Path parameters must be marked required. The body uses a media-type key before its schema. The response describes the updated Cart rather than pretending the server returns a standalone CartItem.

## Requiredness at different levels

`requestBody.required: true` means the HTTP request must include a body. It does not make every property in that body required. An object schema's `required` array names the properties that must be present. A nested object can have its own required properties independently.

A Parameter Object's `required` flag applies to that parameter. Do not use the schema object's `required` array where a parameter Boolean belongs. This is a common authoring error because the same word appears at different structural levels with different types.

## Parameters and serialization

Document location using `in: path`, `query`, `header`, or `cookie`. Include the correct schema, description, examples, defaults, and ranges. For arrays or objects, select the serialization rules supported by the API rather than assuming every client will encode them the same way.

ShopVerse's collection query parameters are simple scalar values. Its additional idempotency header is specific to order creation. The Authorization header is represented through a security scheme, not by adding a free-form token parameter to every operation.

## Responses are contracts too

Each response needs a useful description. When a body exists, specify its media type and schema. A 204 or 304 response should not advertise a JSON body. If the client needs a header such as Location, ETag, or Retry-After, describe it in the response's headers map.

Status codes tell clients what happened at the HTTP layer. The schema tells them how to interpret the representation. A correct body example under the wrong status code is still incorrect documentation. Likewise, describing only a successful response leaves integrations without guidance for ordinary failures.

## What the technical writer must document

For each operation, record purpose, access, parameters, body media type, requiredness, responses, relevant headers, side effects, and examples. Ensure an operation's `operationId` is unique. Keep references resolvable and use the same names as the actual server.

Distinguish examples from defaults. A parameter example of 10 does not mean the server defaults to 10. In ShopVerse pagination, the default is 20 and the maximum is 100. Both values should agree across schemas, prose, and tests.

## Common mistakes and corrections

**Wrong:** A path has `{productId}` but its parameter is named `id`.

**Correct:** The parameter must use the exact placeholder name `productId`.

**Wrong:** A delete response declares 204 and includes a JSON success object.

**Correct:** Document no body for the implemented 204 response, or use the actual body-bearing status if the service returns one.

## Practical exercise

Write the response portion for product deletion and explain why the request example's JavaScript must not call `response.json()` unconditionally.

## Model answer

The response is `'204': { description: 'Product deleted. No response body.' }`, without a `content` entry. A client should treat 204 as successful completion without parsing JSON. If it later retrieves the deleted ID, it should expect the documented not-found behavior rather than a deletion receipt body.

## Recap

OpenAPI operation authoring is structural and semantic. Correct nesting, matching parameter names, and accurate body/status combinations are essential to a usable contract.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l23).


---

# Reusable models, constraints, and examples

Build a coherent schema library without losing the differences between input and output representations.

## Learning objectives

- Use components and references correctly
- Model nested objects and constrained values
- Separate reusable structure from operation-specific behavior

## Prerequisites

Read [the previous lesson](#/lesson/l22), or review its recap before continuing.

## Reuse concepts, not accidental shapes

The `components` section can hold reusable schemas, parameters, responses, examples, headers, and security schemes. A `$ref` points to one of those definitions or to an external document. Reuse helps when the same concept appears in many operations, such as Money or an order error representation.

Do not merge two models solely because they happen to share fields today. A product-creation input and a product response have different responsibilities. The response includes server-generated identity, ownership, and timestamps; the request does not let the client set those values.

## A reusable Money model

This **illustrative schema fragment** follows the project's representation:

```yaml
Money:
  type: object
  required: [amountMinor, currency]
  additionalProperties: false
  properties:
    amountMinor:
      type: integer
      minimum: 0
      maximum: 2147483647
      description: Integer currency minor units.
    currency:
      type: string
      enum: [INR]
      description: The local demo supports INR only.
```

The bounds keep output values within the supported signed GraphQL Int range. The demo's MoneyInput applies a lower unit-price maximum, because multiplying price by quantities and distinct items can produce a larger total. Input and output constraints need not be identical when their meanings differ.

## Required properties and unknown properties

An object's `required` array lists property names that must be present. Properties not listed are optional unless another rule applies. `additionalProperties: false` rejects unspecified keys in that object. It does not automatically impose the same restriction on every nested object; each nested schema has its own policy.

Restricting unknown properties can catch typos but has compatibility consequences. Adding new response fields may affect consumers that validate responses strictly against an older closed schema. Describe the API's evolution policy instead of assuming one schema setting is universally best.

## Enums and formats

An enum defines allowed values, including exact case. A string field that functions like an enum should publish those values rather than merely saying "status." Explain what each value means and how it affects permitted actions.

Formats such as `date-time` or `email` provide semantic annotations and may be checked differently by validators. Do not assume every tool enforces every format identically. For critical business rules, validate them in the implementation and test them explicitly. ShopVerse's DateTime output uses a documented UTC form with milliseconds.

## Examples need to exercise the schema

Use examples that reveal important behavior: a nested Money object, a null original price, an empty collection, or a meaningful error. A product example with only `id` and `name` cannot validate against a response schema requiring price and availability unless it is explicitly an excerpt.

Validate examples after model changes. If the price representation moves from a number to an object, every sample request, response, tutorial, and quiz using that field needs review. A schema reference reduces duplicated definitions; it does not automatically update hand-written sample values.

## What the technical writer must document

Maintain a data dictionary with model purpose, field meaning, presence, nullability, default behavior, units, enum values, bounds, examples, and business constraints. Explain relations using IDs and distinguish live values from snapshots. Identify the canonical definition and generated outputs.

Use descriptions that complement the type. "Integer" belongs in type metadata; "number of units to set, not an increment" belongs in business prose. A complete reference needs both.

## Common mistakes and corrections

**Wrong:** `required: true` inside a property definition to make that property required in JSON Schema.

**Correct:** Add the property's name to the containing object's `required` array.

**Wrong:** Assuming `default` causes all validators to mutate input by inserting a value.

**Correct:** A schema default is an annotation; insertion behavior depends on the service or tool. Document and test what the API actually does.

## Practical exercise

Design the ReviewInput schema with required rating and comment. Then list one rule that still needs business validation beyond this schema.

## Model answer

Use an object requiring `rating` and `comment`, with rating an integer from 1 through 5 and comment a string from 1 through 2,000 characters. Reject unknown properties if that is the input policy. The one-review-per-customer/product restriction depends on authenticated identity and existing data, so it must be enforced by the business service and explained in the operation description.

## Recap

Reusable schemas create a common vocabulary. Keep input/output differences explicit, validate examples, and do not mistake structural rules for the complete business contract.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [JSON Schema documentation](https://json-schema.org/learn/).

Continue to [the next lesson](#/lesson/l24).


---

# Security schemes and complete API descriptions

Describe public and protected operations accurately, including alternatives, combined requirements, and the limits of contract declarations.

## Learning objectives

- Define bearer and illustrative OAuth schemes
- Apply security globally or per operation
- Understand OR and AND semantics in security requirements

## Prerequisites

Read [the previous lesson](#/lesson/l23), or review its recap before continuing.

## Declare the mechanism, then the requirement

A Security Scheme Object defines an authentication mechanism. A security requirement applies a named scheme to an operation or to the API generally. Defining a scheme does not automatically require it everywhere, and declaring a requirement does not implement a runtime authorization check.

ShopVerse defines an HTTP bearer scheme for fixed local tokens. The service itself maps tokens to identities and enforces roles and ownership. The contract describes that behavior; it is not the enforcement mechanism.

## The live bearer pattern

```yaml
components:
  securitySchemes:
    DemoBearer:
      type: http
      scheme: bearer
      description: Fixed local teaching tokens; not production credentials.
paths:
  /me:
    get:
      security:
        - DemoBearer: []
      responses:
        '200':
          description: The authenticated customer's profile.
```

This is a **contract fragment**. The empty list in `DemoBearer: []` does not mean "no authentication." For a non-OAuth bearer scheme, the requirement does not list OAuth scopes. The named scheme is still required.

## Public operations and overrides

A top-level `security` requirement can supply a default for operations. An operation can override it. An empty operation-level array, `security: []`, removes the inherited requirement and describes a public operation.

Do not confuse an empty array with an array containing an empty requirement object. In OpenAPI, requirement alternatives and optional access have distinct representations. Review the specification rather than relying on how one renderer happens to display a lock icon.

## Alternatives versus combined requirements

Different entries in the security requirement array are alternatives: satisfying one can be enough. Multiple schemes within one requirement object are combined: all named schemes in that object are required. A documentation example that accidentally changes nesting can change OR into AND.

```yaml
# Illustrative alternatives: either mechanism can satisfy the requirement.
security:
  - ApiKey: []
  - OAuthAccess: [orders:read]
```

This is an illustrative pattern, not the live ShopVerse security definition. The names must refer to schemes defined elsewhere in the same complete description.

## OAuth scopes belong to a real flow

An OAuth security scheme defines supported flows and their endpoints and scopes. An operation requirement selects the scopes it needs. The flow URLs and scope meanings must come from the real authorization system; a writer should not fabricate them to fill a template.

If an integration needs both a broad scope and resource ownership, document both. A scope such as `orders:read` does not necessarily permit reading every customer's orders. The security requirement format cannot, by itself, encode every dynamic ownership rule.

## A complete description needs context

Metadata should identify the API, its purpose, supported servers, version convention, and limitations. Tags should group operations usefully. Descriptions should explain business behavior. Models and examples should agree with actual data. Public versus protected access should be explicit and tested.

A production description must also avoid leaking private base URLs, secret values, or internal-only operations. Separating internal and external API surfaces may require a publication process, not just removing a paragraph from the rendered page.

## What the technical writer must document

Provide credential onboarding, scheme syntax, relevant scopes/roles, ownership restrictions, token lifecycle, and error recovery. For the educational bearer mechanism, state the exact available tokens and the fact that there is no token endpoint, expiry protocol, or refresh flow.

Review each operation rather than assuming every read is public or every write has the same role. Product retrieval is public; customer profile and order retrieval are not. Creation and modification may also have different ownership rules.

## Common mistakes and corrections

**Wrong:** Adding an Authorization header parameter and assuming that makes the operation secure.

**Correct:** Define and apply the appropriate security scheme, document the permission semantics, and verify runtime enforcement independently.

**Wrong:** Describing illustrative `orders:write` as a live ShopVerse scope.

**Correct:** The live demo uses role and ownership checks. Keep illustrative OAuth examples in a separate teaching file.

## Practical exercise

A global bearer requirement exists, but product retrieval is public. Write the operation-level override and explain how you would verify it.

## Model answer

Set `security: []` on the product GET operation. Then execute it without Authorization and confirm that it succeeds. Also test a protected operation such as `/me` without a token and confirm the expected 401 behavior. The contrast verifies that the public override reflects implementation rather than merely changing the rendered lock icon.

## Recap

Security declarations describe an access mechanism and its application. They do not replace credential onboarding, ownership documentation, or runtime authorization tests.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [OAuth 2.0 security best current practice, RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html).

Continue to [the next lesson](#/lesson/l25).


---

# Advanced schemas: composition and nullability

Model alternative shapes and shared constraints without assuming that schema composition behaves like object-oriented inheritance.

## Learning objectives

- Compare oneOf, anyOf, and allOf
- Express nullable values in OpenAPI 3.1
- Identify common closed-object composition traps

## Prerequisites

Read [the previous lesson](#/lesson/l24), or review its recap before continuing.

## Composition combines validation rules

`allOf` means a value must satisfy every listed schema. `anyOf` means it must satisfy at least one. `oneOf` means it must satisfy exactly one. These are validation relationships, not instructions to merge objects, select a class, or construct a response automatically.

Consider overlapping alternatives. If a value matches two branches of a `oneOf`, it fails because exactly one must match. A broad generic object branch can accidentally overlap every specialized branch. Make alternatives distinguishable and test both valid and ambiguous examples.

## A discriminated teaching example

This **illustrative extension** models two delivery contact methods. It is not an input accepted by the live ShopVerse API:

```yaml
DeliveryContact:
  oneOf:
    - $ref: '#/components/schemas/EmailContact'
    - $ref: '#/components/schemas/SmsContact'
  discriminator:
    propertyName: kind
    mapping:
      EMAIL: '#/components/schemas/EmailContact'
      SMS: '#/components/schemas/SmsContact'
```

Each referenced schema should require `kind` and constrain it to the corresponding constant, alongside its own address or phone field. The discriminator provides a selection hint to tooling. It does not excuse invalid data or override the underlying validation result. Describing a mapping without compatible branch schemas leaves the contract incomplete.

## allOf is not inheritance by itself

An `allOf` can apply shared constraints, but each subschema still validates the same complete instance. If one branch has `additionalProperties: false` and knows only the base properties, it may reject properties introduced by another branch. This surprises authors who think allOf simply merges class members.

JSON Schema 2020-12 includes mechanisms such as `unevaluatedProperties` that can help close a composed shape after other subschemas have evaluated it, but tool support and intended semantics must be checked. A simpler explicit input schema may be more maintainable than clever composition when the model is small.

## Nullability in OpenAPI 3.1

OpenAPI 3.1 uses JSON Schema-style null types. A simple nullable string can use `type: [string, 'null']` in YAML. Quoting the word `'null'` matters because the type name is a string, not a YAML null value. A referenced object can be combined with a `{type: 'null'}` branch using an appropriate composition construct.

```yaml
priceBeforeMarkdown:
  anyOf:
    - $ref: '#/components/schemas/Money'
    - type: 'null'
  description: Null when no original markdown price is recorded.
```

Whether the property must appear is determined separately by the containing object's required array. Do not use the older OpenAPI 3.0 `nullable: true` pattern as though it were the 3.1 mechanism.

## Read-only and write-only annotations

A server-generated ID is commonly read-only; a secret supplied by the client might be write-only. These annotations help describe different request and response views. They do not encrypt a value or prevent a backend from accidentally returning it. Test implementation behavior and consider distinct input/output schemas when that makes the contract clearer.

ShopVerse uses explicit input and output models. Product responses contain IDs and timestamps that creation requests cannot set. This avoids relying on every tool to interpret a shared model's annotations identically.

## What the technical writer must document

Explain the business meaning of each alternative, the distinguishing field, required fields within each branch, null behavior, and rejection conditions. Provide a valid example for every branch and a negative example that demonstrates ambiguity or an unsupported combination.

When composition is used to reduce duplication, verify that generated reference pages remain understandable. A reader should not have to mentally intersect five schemas to discover the minimum valid request.

## Common mistakes and corrections

**Wrong:** "oneOf means any number of the schemas may match."

**Correct:** "Exactly one branch must match. anyOf permits one or more matching branches."

**Wrong:** "allOf copies properties into the parent."

**Correct:** "The instance must satisfy every listed schema; their constraints remain active."

## Practical exercise

Explain whether a null `priceBeforeMarkdown` can be valid when the property is required on Product. Then explain whether omission is valid under that same response schema.

## Model answer

Null can be valid because the property's schema includes a null alternative. Omission is invalid if the containing Product schema lists `priceBeforeMarkdown` as required. Requiredness controls presence; the property's allowed types control its value. These independent rules produce a required-but-nullable response field.

## Recap

Composition combines validators, not business objects. Test alternatives, preserve the distinction between presence and nullability, and prefer clarity over unnecessarily complex schema reuse.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [JSON Schema documentation](https://json-schema.org/learn/).

Continue to [the next lesson](#/lesson/l26).


---

# Links, callbacks, webhooks, and multipart descriptions

Describe advanced HTTP relationships without falsely advertising features that the server does not implement.

## Learning objectives

- Distinguish links, callbacks, and webhooks
- Represent multipart request bodies
- Keep illustrative contracts separate from the live API

## Prerequisites

Read [the previous lesson](#/lesson/l25), or review its recap before continuing.

## Relationships are not interchangeable

An OpenAPI Link Object describes a possible connection from an operation response to another operation, including how values may be obtained for the next call. It does not necessarily add a hyperlink to the actual JSON response or cause the next operation to execute.

A callback describes an out-of-band request related to an originating operation, often with a destination obtained from that operation's data. Top-level webhooks in OpenAPI 3.1 describe incoming requests that may be initiated independently of a particular operation in the document. All three features need accurate implementation context.

## A link between creation and retrieval

Suppose order creation returns an Order with `id`. A link can describe retrieving that order by using the response body value as the next operation's `orderId`. This is an **illustrative contract fragment**:

```yaml
links:
  RetrieveCreatedOrder:
    operationId: getOrder
    parameters:
      orderId: '$response.body#/id'
    description: Retrieve the created order using its returned identifier.
```

The target operationId must exist in the intended description. The runtime expression must refer to a value the response actually contains. If creation returned `{ "order": { "id": ... } }` instead, the pointer would differ. The REST and GraphQL response envelopes are not interchangeable.

## Callback destination and security

A callback example may obtain a consumer URL from a request body. A production service that calls arbitrary URLs needs substantial validation and security controls. Documentation should explain registration and verification rather than implying that every URL is an acceptable callback destination.

This course does not implement outbound calls to learner-provided destinations. That limitation avoids turning a local teaching server into an unrestricted network proxy. The downloadable advanced examples describe structure only and are labelled illustrative.

## A webhook description

A top-level `webhooks` entry can describe an event's HTTP request and receiver response expectations. The request body should use a reusable event schema. The description should explain event identity, payload version, delivery duplication, and the meaning of acknowledgment.

An OpenAPI schema for the payload cannot fully express retry timing, secret rotation, or event ordering. Those details belong in the accompanying guide. Do not treat a structurally valid webhook definition as complete integration documentation.

## Multipart bodies

A multipart upload description identifies `multipart/form-data`, the object-shaped set of parts, and their schemas. An Encoding Object can describe content type and serialization details for particular parts. Required body presence and required part names are separate rules, just as with JSON object properties.

```yaml
requestBody:
  required: true
  content:
    multipart/form-data:
      schema:
        type: object
        required: [metadata, file]
        properties:
          metadata:
            type: object
            properties:
              label:
                type: string
          file:
            type: string
            format: binary
      encoding:
        metadata:
          contentType: application/json
```

This is an illustrative upload shape, not a live ShopVerse path. Explain the actual supported file types and limits when documenting a real implementation. A format annotation does not supply virus scanning, size enforcement, or authorization.

## Multiple servers and environment selection

A description can list multiple servers, and some structures can override the server context. This is useful for distinguishing environments, but examples must remain safe. Clearly separate production, sandbox, and local data. Avoid setting an interactive reference's default to a live destructive environment without an explicit user choice and appropriate safeguards.

This project's server URL is relative to the local origin. It does not embed private company hosts or depend on a remote demo API remaining available.

## What the technical writer must document

Explain how an advanced construct maps to a real interaction: which party sends the request, how values are transferred, which credentials apply, and which errors can occur. Label structural excerpts and complete runnable descriptions differently. Confirm feature support in your chosen OpenAPI version and tools before relying on generated behavior.

## Common mistakes and corrections

**Wrong:** "Adding a Link Object automatically adds a link property to every response."

**Correct:** "The Link Object describes a relationship in the API description; actual response fields are defined by the response schema and implementation."

## Practical exercise

Why should a callback registration example not be added to the main ShopVerse contract just to demonstrate OpenAPI syntax?

## Model answer

The live server does not implement callback registration or outbound delivery. Adding the path would falsely advertise an available capability. Put a complete illustrative contract in a separate teaching download, explain its assumptions, and keep the primary contract limited to implemented operations.

## Recap

Advanced description features model relationships and representations. They do not implement the workflow or replace operational guidance and security boundaries.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l27).


---

# Authoring, bundling, and publishing an OpenAPI description

Choose a source-of-truth workflow that prevents generated files and hand-written guidance from drifting apart.

## Learning objectives

- Compare design-first and code-first workflows
- Explain references and bundling
- Plan a reproducible publication pipeline

## Prerequisites

Read [the previous lesson](#/lesson/l26), or review its recap before continuing.

## Decide where changes begin

In a design-first workflow, teams agree on an API contract before implementation and use it to guide development and review. In a code-first workflow, descriptions are generated from implementation annotations or framework metadata. Both can work, and many teams combine them.

Neither approach guarantees accurate documentation. A design can diverge from deployment; generated code metadata can omit business semantics. The important questions are which source is authoritative, how changes are reviewed, and how the team detects differences between contract and behavior.

## The source of truth in this project

ShopVerse operation metadata lives in `server/routes.js`, and reusable REST schemas live in `server/schemas.js`. The build script generates the OpenAPI JSON and YAML, REST reference data, example fixtures, and bundled course data from those sources. The GraphQL SDL in `public/contracts/schema.graphql` is the schema source.

Edit the canonical source rather than manually patching only a generated YAML copy. Otherwise the next build overwrites the patch, or the JSON and YAML versions disagree. Documentation prose remains in Markdown so the course is easy to review and extend.

## Multi-file descriptions

A larger API description may reference separate files for paths, schemas, or examples. Relative references are resolved from the appropriate document location, not from whichever folder a reader happens to open in a terminal. Moving files can therefore break references even when their contents do not change.

```yaml
# Illustrative multi-file pattern
paths:
  /products:
    $ref: './paths/products.yaml'
components:
  schemas:
    Product:
      $ref: './schemas/product.yaml'
```

This is a teaching excerpt. The project's generated main description uses internal references for portability. Do not claim a reference is resolved merely because an editor applies syntax highlighting to the `$ref` string.

## Bundling and dereferencing

Bundling commonly produces a portable document that brings together referenced content while retaining useful references. Dereferencing replaces references with their target structures. Tool behavior varies, particularly around cycles and shared identities, so use the tool's documented terminology and test the resulting artifact.

A fully expanded document can become much larger and may obscure reusable concepts. A bundled description can simplify publishing without discarding semantic reuse. Choose the artifact consumers need rather than treating "no references" as an automatic quality improvement.

## Rendering is one publishing step

An interactive renderer helps readers browse operations and try requests. It should show descriptions, examples, security requirements, parameters, models, and errors accurately. It also needs surrounding material: overview, setup, tutorials, troubleshooting, release notes, and migration guidance.

The course's local explorer is a lightweight renderer for the bundled contract. It does not claim every feature of a specialized OpenAPI platform. Advanced constructs are taught in separate examples, and the source files remain available for independent tools.

## A reproducible pipeline

A sensible build validates source syntax, checks references, verifies examples, runs implementation tests, builds reference assets, checks links, and produces a deployable directory. Store exact dependency versions and a lockfile. Record failures rather than allowing a broken reference to publish silently.

Static deployment can serve the reading website and downloads without running the API server. Live request execution requires the Node service. Documentation must explain that difference; a static host cannot execute the in-memory commerce backend merely because it can display a playground form.

## What the technical writer must document

Publish authoring locations, generation commands, validation commands, review requirements, deployment modes, and ownership. Explain which files are generated and should not be edited directly. Include a quick recovery path when a build fails, such as identifying the unresolved reference or mismatched example.

For distributed documentation, keep versioned artifacts together. An API reference for one release paired with examples from another can be more confusing than an obvious missing page.

## Common mistakes and corrections

**Wrong:** "The generated documentation is correct because it builds."

**Correct:** "A successful build shows that the build completed. Technical accuracy also requires contract checks, example execution, and human review of meaning."

## Practical exercise

An engineer changes the product quantity rule in service code but not in the schema or lesson. Explain which checks should catch the mismatch and which files need review.

## Model answer

Boundary tests should detect implementation behavior outside the contract, and documentation example tests should verify the taught values. Review service validation, reusable schemas, operation prose, the data dictionary, examples, labs, quizzes, and relevant release notes. Regenerate derived JSON/YAML and reference assets from the corrected canonical definitions.

## Recap

Publishing quality depends on a reproducible relationship between source, generated artifacts, implementation, and review. A renderer is useful, but it is not the complete documentation system.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [Official Git documentation](https://git-scm.com/doc).

Continue to [the next lesson](#/lesson/l28).


---

# Validate contracts and prevent documentation drift

Design checks that distinguish syntactic correctness, schema correctness, runtime agreement, and editorial quality.

## Learning objectives

- Build a layered validation strategy
- Test examples against schemas
- Report validation coverage honestly

## Prerequisites

Read [the previous lesson](#/lesson/l27), or review its recap before continuing.

## One green check is not enough

A YAML parser can establish that a file is readable YAML. It cannot prove that the document follows OpenAPI. An OpenAPI validator can detect many structural violations, but it does not automatically know whether the deployed service behaves that way. A successful request does not prove all errors and boundaries are documented.

Treat quality checks as layers. Syntax, specification structure, references, schema validity, example validity, runtime agreement, link integrity, and prose usefulness answer different questions. Report which layers were actually checked.

## Reference resolution and schema checks

Every `$ref` should resolve to the intended target. An internal pointer such as `#/components/schemas/Product` must match the exact key and structure. A misspelled target can remain hidden until a renderer or code generator tries to use it.

Validate reusable schemas under the correct JSON Schema dialect. Validate request examples against request schemas and response examples against response schemas. Do not use a partial response excerpt as a complete instance unless the schema permits that shape.

## A drift example

```text
Implementation: quantity must be an integer from 1 through 99.
OpenAPI:        maximum: 100
Tutorial:       says "up to 200 units"
Test fixture:   only sends quantity 1
```

The happy-path fixture does not expose the contradiction. Add boundary cases at 1 and 99, rejection cases at 0 and 100, and a wrong-type case such as the string "2". Then align the contract and prose with the intended implementation.

## Runtime contract testing

A runtime test sends a request to the service, inspects the status and headers, and validates the returned body against the expected response schema. It should account for intentional no-body responses, dynamic IDs/timestamps, and environment-dependent data.

Avoid tests that remove every difficult field until the example passes. Validate dynamic fields by type, format, relationship, and expected state rather than comparing a fixed timestamp. Save real captures when useful, but do not freeze a response and present it as evidence of every later execution.

## Negative cases and security

Test missing credentials, wrong roles, wrong owners, invalid types, unknown enum values, unsupported methods, and lifecycle conflicts where relevant. A successful administrator request does not establish that customer ownership checks work. A rejected malformed request does not establish that a structurally valid unauthorized request is blocked.

Prepare each negative test to isolate the intended rule. If the input is malformed before authorization is evaluated, the resulting error may not prove the access behavior you intended to test.

## Editorial and usability checks

Automated checks can count missing descriptions, detect broken links, and enforce certain terminology. They cannot fully judge whether a developer understands the business model or can recover from a confusing state transition. Use peer review and task-based testing for those questions.

Accessibility scans can find some problems, but they do not establish complete WCAG compliance. Keyboard navigation, meaningful headings, focus behavior, contrast, and screen-reader experience need appropriate review. Report the scope of testing instead of claiming certification from one automated result.

## What the technical writer must document

Define the validation commands, their prerequisites, the checks they perform, known limitations, and the release acceptance criteria. A test report should distinguish passed, failed, skipped, and not-run checks. Explain a skipped dependency-dependent GraphQL test rather than converting it into a success count.

This project includes dependency-free structural checks and Node tests, plus browser tests and optional independent validation instructions. Consult the bundled testing report for the actual build-environment results. A runnable test script and a completed test run are different deliverables.

## Common mistakes and corrections

**Wrong:** "All examples are valid because they are formatted JSON."

**Correct:** "JSON parsing checks syntax. Validate examples against their specific schemas and execute live examples against the implementation."

**Wrong:** "The API is fully tested" after a single GET request.

**Correct:** State the exact operations and failure cases exercised.

## Practical exercise

Write four checks for a newly added `priceBeforeMarkdown` field. Include one schema check, one business-rule check, one example check, and one documentation review question.

## Model answer

Verify that the response schema allows Money or null while preserving required presence. Test that a non-null original price below current price is rejected. Validate full REST examples and GraphQL selections using the new field. Ask whether the description explains that null means no recorded original price rather than zero or a failed lookup.

## Recap

Validation is evidence about specific properties. Combine layers, test boundaries, and report limitations honestly so a green result means something useful.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [JSON Schema documentation](https://json-schema.org/learn/); [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Continue to [the next lesson](#/lesson/l29).


---

# GraphQL and REST: choose by the problem

Understand the two interface styles using the same marketplace task rather than treating them as competing slogans.

## Learning objectives

- Explain the GraphQL execution model at a high level
- Compare request and response shapes
- Discuss tradeoffs without unsupported performance claims

## Prerequisites

Read [the previous lesson](#/lesson/l28), or review its recap before continuing.

## A typed query interface

GraphQL defines a type system and a language for selecting data and invoking operations. A client sends an operation document that selects fields from the server's schema. The server validates it and executes the selected fields through its implementation. The resulting data shape follows the selection set, subject to errors and nullability rules.

GraphQL is not a database product and does not require a graph database. Resolvers can obtain data from databases, services, caches, or in-memory objects. The public schema should describe the available API, not expose arbitrary internal storage access.

## Compare the product task

A REST client retrieves the server-defined product representation with `GET /api/v1/products/prod_1001`. A GraphQL client sends a selection such as this **live** query to `/graphql`:

```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price {
      amountMinor
      currency
    }
  }
}
```

Variables are separate JSON: `{"id":"prod_1001"}`. The response contains a `data` envelope with the selected product fields. Fields not selected, such as description or availability, are not automatically included just because they exist in the Product type.

## Over-fetching and under-fetching

Over-fetching means receiving more data than a client needs for a task. Under-fetching means needing additional calls to obtain necessary related information. GraphQL can help clients select a useful nested shape, while REST APIs can also support purpose-built resources, expansion options, or tailored endpoints.

Do not claim GraphQL is always faster because it can use one HTTP request. A nested operation can trigger many backend calls, expensive joins, authorization checks, or large responses. One network envelope is not the same as one unit of work. Measure the real system and document its operational limits.

## Different reference structures

REST reference is usually organized by method/path and resource operations. GraphQL reference needs types, fields, arguments, input objects, enums, custom scalars, and operation examples. An OpenAPI page that describes `POST /graphql` can document the HTTP envelope but does not replace the schema's field-level contract.

Both styles still need overview, authentication, workflows, errors, troubleshooting, and change guidance. GraphQL's introspection can expose schema structure; it does not explain every business constraint or intended integration path.

## Authorization stays necessary

A single GraphQL endpoint does not imply a single authorization decision. Fields can access different resources and require different permissions. In this demo, public product fields can succeed while an unauthenticated `me` field fails, producing partial data with an error.

The shared ShopVerse business layer keeps roles and ownership consistent across REST and GraphQL. Interface style does not change who owns a cart or whether an order is cancellable. Test those rules through both interfaces rather than assuming shared code guarantees complete transport correctness.

## What the technical writer must document

Explain the schema entry points, endpoint/transport, request envelope, operation documents, variables, response envelope, authentication, and failure handling. State which GraphQL conventions the API adopts, such as forward connection pagination.

For a comparison guide, show the same business task and acknowledge tradeoffs. REST's HTTP semantics and representation caching can be useful. GraphQL's typed selections can be useful. Tooling, team expertise, security controls, observability, data shape, and consumer needs all influence the choice.

## Common mistakes and corrections

**Wrong:** "GraphQL replaces the need for API documentation because the schema is self-documenting."

**Correct:** "The schema exposes structure. Developers still need business meaning, setup, permission rules, examples, workflows, and recovery guidance."

**Wrong:** "One endpoint means all requests use the same permissions."

**Correct:** "Permissions may be checked at operation, field, and resource levels."

## Practical exercise

Compare retrieving name and price with REST and GraphQL. Give one potential advantage and one caveat for each, without claiming a measured speed difference.

## Model answer

REST offers a straightforward resource URL and conventional HTTP retrieval semantics; its full representation may include unused fields. GraphQL lets the client select only name and price; its execution cost still depends on the server's resolvers and data sources. Neither comparison establishes latency or scalability without measurement under a defined workload.

## Recap

GraphQL and REST are interface choices. Explain their contracts and tradeoffs using actual tasks, not universal claims about superiority.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/).

Continue to [the next lesson](#/lesson/l30).


---

# Read GraphQL SDL and nullability

Translate type signatures into precise documentation about objects, inputs, lists, and values.

## Learning objectives

- Read object, input, scalar, and enum definitions
- Interpret list and non-null wrappers
- Distinguish input presence from output selection

## Prerequisites

Read [the previous lesson](#/lesson/l29), or review its recap before continuing.

## SDL is the schema's written form

GraphQL Schema Definition Language describes the types and entry points clients can use. An object type contains fields. Fields have return types and may accept arguments. Input objects describe structured inputs. Enums provide a finite set of named values. Scalars represent leaf values rather than nested selection sets.

The built-in scalars are Int, Float, String, Boolean, and ID. GraphQL Int is a signed 32-bit integer, not an arbitrary-precision money type. The demo bounds its amounts and totals accordingly. A different API may need a documented custom scalar for larger values.

## A schema excerpt

```graphql
type Money {
  amountMinor: Int!
  currency: String!
}

type Product {
  id: ID!
  name: String!
  price: Money!
  priceBeforeMarkdown: Money
}

input MoneyInput {
  amountMinor: Int!
  currency: String!
}
```

`Product.price` is a non-null object field, so a query must select its child fields. `priceBeforeMarkdown` is nullable. `MoneyInput` is a separate input type because output objects cannot be used directly as input objects. Similar shapes do not remove that distinction.

## Read list wrappers from the inside out

| Type | List may be null | Element may be null | Empty list allowed |
|---|---|---|---|
| [Product] | Yes | Yes | Yes |
| [Product!] | Yes | No | Yes |
| [Product]! | No | Yes | Yes |
| [Product!]! | No | No | Yes |

The exclamation mark applies to the type immediately before it. None of these signatures means "at least one item." A nonempty-list requirement is a separate business constraint that must be documented and enforced.

A non-null output field is a promise enforced through GraphQL's error and propagation behavior. It does not mean the server can never fail. If a resolver cannot provide that field, the resulting null propagates according to the enclosing type wrappers.

## Inputs and defaults

A non-null argument without a default must be supplied with a non-null value. A default can affect whether omission is allowed, while explicit null remains distinct. A nullable input property can be omitted or supplied as null at the GraphQL type level, but the service can apply additional business validation.

ShopVerse's UpdateProductInput deliberately has optional fields. Omission leaves the old value unchanged. Null is accepted by the business layer only for clearing `priceBeforeMarkdown`; null for name or price is rejected. The SDL alone does not express every business constraint.

## IDs and enums

ID is used for opaque identity. It is serialized as a string and should not be treated as an arithmetic value even if an example looks numeric. Use the value returned by the API rather than constructing one from a business assumption.

GraphQL enum literals in an operation document are unquoted names, such as `IN_STOCK`. In variables JSON, the same enum value is represented as a JSON string. This distinction is a frequent source of beginner errors. Enum members are case-sensitive.

## Descriptions are part of the schema

SDL supports descriptions, commonly written with triple-quoted strings. Describe business meaning, constraints, units, permissions, and null behavior rather than repeating the field name. Tools can expose those descriptions through introspection and schema browsers.

The local DateTime custom scalar has a documented UTC representation with milliseconds. A type called DateTime is not a universal GraphQL standard scalar. Consumers need its actual accepted and returned formats.

## What the technical writer must document

For every important field or input, record the type signature, argument/default rules, meaning, permission requirements, constraints, and relevant examples. For lists, explain ordering, pagination, empty results, and element nullability. For custom scalars, explain input coercion and output serialization.

## Common mistakes and corrections

**Wrong:** "[Product!]! means one or more products."

**Correct:** "The list and its elements are non-null, but the list may be empty."

## Practical exercise

Explain the difference between an unselected nullable field, a selected field with value null, and a missing required input argument.

## Model answer

An unselected output field does not appear because the operation did not request it. A selected nullable field can appear with null according to its resolver/business semantics. A missing required input argument causes request validation or coercion failure before normal execution, depending on how the input was supplied. These situations are not interchangeable kinds of optional data.

## Recap

Type wrappers communicate precise structure, but schema prose must supply business meaning. Read nullability carefully and keep input presence separate from output selection.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/).

Continue to [the next lesson](#/lesson/l31).


---

# Queries, variables, aliases, and fragments

Write reusable GraphQL operations and explain how their selections determine the response shape.

## Learning objectives

- Build a named query with variables
- Use aliases and fragments correctly
- Predict nested response keys

## Prerequisites

Read [the previous lesson](#/lesson/l30), or review its recap before continuing.

## Start with a named operation

A GraphQL query selects fields from the Query root. A useful operation name describes the client task and helps readers, logs, and tools identify it. The operation name does not need to match the root field name, but it should not misrepresent the task.

This **live** operation reads the required product example:

```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price {
      amountMinor
      currency
    }
    priceBeforeMarkdown {
      amountMinor
      currency
    }
    availability
  }
}
```

Send variables separately as `{"id":"prod_1001"}`. The variable definition uses `$id` and type `ID!`; the variables JSON key is `id` without a dollar sign. A required variable must receive a compatible non-null value.

## Follow the response shape

The response has a top-level `data` object containing `product`. Nested selections under `price` produce a nested object. The selected original markdown price is a Money object for the seeded headphones; on a product without a recorded original price, the entire `priceBeforeMarkdown` value is null.

```json
{
  "data": {
    "product": {
      "id": "prod_1001",
      "name": "Wireless Headphones",
      "price": { "amountMinor": 249900, "currency": "INR" },
      "priceBeforeMarkdown": { "amountMinor": 299900, "currency": "INR" },
      "availability": "IN_STOCK"
    }
  }
}
```

This expected result assumes the untouched seed data. A prior product edit changes the returned values. The live playground always shows the actual server response rather than substituting this stored example.

## Aliases name response keys

Use an alias when querying the same field with different arguments or when a client needs a different response key:

```graphql
query CompareProducts {
  headphones: product(id: "prod_1001") { name }
  lamp: product(id: "prod_1002") { name }
}
```

The keys under `data` are `headphones` and `lamp`, not two duplicate `product` keys. An alias changes the response key; it does not rename the schema field or alter its permissions.

## Fragments reuse selections

A fragment defines a reusable selection on a compatible type. It can keep repeated product-card fields consistent across operations. It does not automatically execute on its own, and the operation must include or reference the fragment definition appropriately.

```graphql
fragment ProductCard on Product {
  id
  name
  price { amountMinor currency }
}
query ProductCards {
  product(id: "prod_1001") { ...ProductCard }
}
```

Do not publish an operation using `...ProductCard` without also providing the fragment definition or clearly identifying its source. A copyable example should be self-contained unless the tutorial explicitly teaches multi-file composition.

## Variables and safe construction

Use variables rather than constructing a query string by inserting arbitrary user input. Variables provide typed input coercion and keep the document reusable. They do not replace authorization or business validation; a structurally valid product ID can still identify an inaccessible resource in a protected field.

When a document contains more than one operation, the HTTP request's `operationName` identifies which one to execute. Do not confuse that envelope field with the name of a variable or the root schema type.

## What the technical writer must document

Provide the complete document, variables, operation name when necessary, authorization, expected response, error behavior, and relevant field meanings. Explain whether an example assumes seed data or a resource created earlier. If you shorten a response, label it as an excerpt.

A guide should explain why each field is selected. For a product card, id, name, and price may be enough. Selecting every available field makes a beginner example harder to understand and can teach unnecessary request cost.

## Common mistakes and corrections

**Wrong variables:** `{"$id":"prod_1001"}`.

**Correct variables:** `{"id":"prod_1001"}`.

**Wrong:** Selecting `price` without subfields.

**Correct:** Select the required children, such as `price { amountMinor currency }`.

## Practical exercise

Write a query that returns product names under response keys `firstProduct` and `secondProduct`. Explain why aliases are needed.

## Model answer

Use `query Compare { firstProduct: product(id:"prod_1001") { name } secondProduct: product(id:"prod_1002") { name } }`. The aliases distinguish two selections of the same field with different arguments and determine the JSON response keys. They do not create new fields in the schema.

## Recap

A complete GraphQL example includes the document and its variables. Names, aliases, fragments, and nested selections each play a different role in execution and response shape.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/).

Continue to [the next lesson](#/lesson/l32).


---

# Mutations, inputs, payloads, and side effects

Document GraphQL writes as business operations with explicit validation, state changes, and result handling.

## Learning objectives

- Read a mutation input and payload
- Explain serial root-field execution without implying transactions
- Document business failures in the implemented error model

## Prerequisites

Read [the previous lesson](#/lesson/l31), or review its recap before continuing.

## A mutation is a write entry point

GraphQL mutations select fields from the Mutation root. They can change server state and return selected result fields. The schema determines the available mutation names and input shapes; GraphQL does not prescribe universal create/update/delete operations.

A mutation payload often groups the changed resource and related metadata. That is a schema-design convention, not a required GraphQL shape. ShopVerse uses payloads such as CartPayload and CreateOrderPayload to make results explicit.

## Add a cart item

This **live** operation assumes the seeded cart is ACTIVE and does not already contain the product:

```graphql
mutation AddCartItem($input: AddCartItemInput!) {
  addCartItem(input: $input) {
    cart {
      id
      status
      items { id productId quantity }
      total { amountMinor currency }
    }
  }
}
```

Variables:

```json
{
  "input": {
    "cartId": "cart_1001",
    "productId": "prod_1001",
    "quantity": 1
  }
}
```

The customer demo token supplies identity. The input object groups required values. The payload returns the updated cart; the caller selects item IDs needed for later changes. Omitting the items selection does not prevent the side effect; it only changes the returned data shape.

## GraphQL validation versus business validation

GraphQL rejects an unknown input field or an incompatible scalar value according to its schema rules. The business service additionally checks quantity range, ownership, availability, duplicate cart items, and cart state. `Int!` says that an input is a non-null integer; it does not express the full 1-99 business range by itself.

A structurally valid mutation can therefore fail during execution. The error model must explain how consumers distinguish the failure and whether any data remains available.

## The project's error convention

ShopVerse converts known business failures into GraphQL errors with extension members such as `code`, `httpStatus`, and `fields`. The `httpStatus` extension is descriptive metadata and does not mean the transport must use that same HTTP status for a completed GraphQL execution response.

Some APIs return expected business failures inside typed payload fields such as `userErrors`. That can be a valid design, but it is not the local schema's convention. Do not invent a `userErrors` field in a ShopVerse example just because another GraphQL API uses one.

## Serial does not mean atomic

Top-level mutation fields are executed serially under GraphQL's execution semantics. This helps define the order of those fields within one operation. It does not automatically wrap multiple mutations in a database transaction, roll back an earlier successful field when a later one fails, or provide isolation from other requests.

A purchase guide should use and document the service's actual workflow guarantees. The local createOrder mutation calls the same business logic as REST and requires an idempotency key inside its input. GraphQL does not provide idempotency simply because the operation is a mutation.

## What the technical writer must document

Describe purpose, input fields, requiredness, null/omission behavior, constraints, authorization, ownership, state transitions, returned payload, and error handling. Include a before/after state when it helps explain a side effect. For order creation, say that the cart closes and the order records price snapshots.

Make preconditions visible. An add-cart-item example can fail after a learner runs it once because the item now exists. Provide a reset instruction or a follow-on update operation rather than implying the sample should succeed indefinitely.

## Common mistakes and corrections

**Wrong:** "Selecting fewer payload fields makes the mutation change less data."

**Correct:** "The mutation's input and business logic determine its side effects; the selection set determines the returned result fields."

**Wrong:** "Several mutations in one document are an all-or-nothing transaction."

**Correct:** "Document actual transaction guarantees; serial root-field execution alone does not provide rollback."

## Practical exercise

Explain why creating a new random idempotency key every time the createOrder mutation is retried is incorrect. Identify where the key belongs in this GraphQL API.

## Model answer

Each new key identifies a different attempt rather than a replay of the original intent. Retain the original key and identical order details while recovering from an uncertain result. In the GraphQL interface, the key is the required `idempotencyKey` field of CreateOrderInput, whereas REST carries it in the Idempotency-Key header.

## Recap

Mutation documentation must describe the business operation, not just the selection syntax. Inputs, side effects, error conventions, and retry rules all matter.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l33).


---

# Validation, coercion, nullability, and errors

Learn to explain failures without hiding successful fields or confusing missing values with null.

## Learning objectives

- Distinguish request failures from execution failures
- Explain null propagation using the schema
- Document partial responses and stable error codes

## Prerequisites

Read [the previous lesson](#/lesson/l32), or review its recap before continuing.

## Follow the request through its stages

A GraphQL server parses a document, validates it against the schema, selects an operation, coerces variable values, and executes fields. This sequence gives a writer a useful troubleshooting model. A syntax error is not a missing product. A query that selects an unknown field cannot become valid merely by changing a product ID. Separate these categories before recommending a fix.

Validation checks the document's structure against the schema. For example, selecting `colour` on Product fails because that field is absent. Variable coercion checks whether the supplied JSON values match declared input types. Passing `"many"` to an Int variable fails before the business resolver can interpret quantity. A well-typed quantity of 100 still violates ShopVerse's business maximum of 99 during execution.

## Null is a contract decision

A nullable field may return null. Non-null does not mean the resolver can never fail; it means null is not a valid value at that position. When execution produces null for a non-null field, the failure propagates upward until it reaches a nullable boundary. That can remove an object, a list, or even the entire data result depending on the enclosing types.

For `[Product!]!`, both the list and every item are non-null. If an item cannot be completed because a required field fails, the list cannot retain that item as null. For `[Product]`, a null item is permitted. Document the consequences of the actual type rather than describing every list as "an array that might be empty." An empty array is not a null array.

## ShopVerse partial-data example

This **live intentional-error** query combines a public product lookup with a customer-only profile request:

```graphql
query PublicAndPrivate {
  product(id: "prod_1001") {
    id
    name
  }
  me {
    id
    name
  }
}
```

Run it anonymously. `product` succeeds. The nullable `me` field becomes null and an error identifies that response position. An illustrative response excerpt is:

```json
{
  "data": {
    "product": {"id": "prod_1001", "name": "Wireless Headphones"},
    "me": null
  },
  "errors": [{
    "message": "Authentication is required.",
    "path": ["me"],
    "extensions": {"code": "UNAUTHENTICATED"}
  }]
}
```

Inspect the live result for the exact message and additional metadata. The `path` uses response names, including aliases when present. A client should decide whether usable product data is sufficient for its task instead of blindly treating every response containing errors as an empty result.

## Omitted inputs versus explicit null

An omitted field and a field explicitly set to null are different input states. ShopVerse's UpdateProductInput uses omission to preserve an existing value. Explicit null clears `priceBeforeMarkdown`. For other update fields, null is structurally accepted by the input type but rejected by business validation. This deliberate distinction belongs in the field description and update guide.

Defaults add another layer. Omitting `first` uses the schema's default of 20. Passing null to its non-null argument is invalid; null does not mean "use the default." Never show an example that contradicts the distinction simply because a JavaScript variable happened to be undefined before serialization.

## Custom scalars and error extensions

DateTime is a custom scalar in this project, not a built-in GraphQL type. It serializes timestamps in canonical UTC form, such as `2026-01-01T10:00:00.000Z`. Its implementation validates that exact representation. A scalar name alone cannot communicate all accepted formats, precision, or timezone behavior.

ShopVerse adds `code`, `httpStatus`, and `fields` to business errors. These are local conventions in `extensions`, not universal GraphQL error fields. In particular, `extensions.httpStatus` describes the mapped business failure; it does not automatically change the HTTP transport status of an execution response.

## What the technical writer must document

Document failure stage, response shape, nullable boundaries, stable machine-readable codes, and recovery action. Include one partial-data example, not only happy-path queries. Explain what a client may retain and what must be corrected before retrying. Avoid exposing implementation stack traces in public examples.

## Common mistakes and corrections

**Wrong:** "HTTP success means the GraphQL operation succeeded completely."

**Correct:** "Inspect the GraphQL response's data and errors as well as the transport status."

**Wrong:** "Set every unused variable to null."

**Correct:** "Omit optional values when omission is intended; explicit null has distinct coercion and business behavior."

## Practical exercise

A response contains a valid product and `me: null` with an error path of `["me"]`. Write two sentences explaining what happened and how to retrieve the missing profile.

## Model answer

The public product lookup succeeded, but the profile field could not be resolved because the request lacked customer authentication. Repeat the query with the local customer bearer token to retrieve `me`; the product data from the original response is still valid for a public product display.

## Recap

Classify failures by stage. Describe null propagation from the actual schema, distinguish omitted values from explicit null, and explain partial success as a normal possibility rather than an exception to ignore.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/).

Continue to [the next lesson](#/lesson/l34).


---

# GraphQL pagination and collection contracts

Document forward pagination without treating a popular connection pattern as part of every GraphQL API.

## Learning objectives

- Read edges, nodes, cursors, and pageInfo
- Write a correct next-page workflow
- Explain limits and cursor stability

## Prerequisites

Read [the previous lesson](#/lesson/l33), or review its recap before continuing.

## A collection is more than a list

A small list can be returned in one response. A growing catalogue needs limits so a client can request a manageable amount of information. GraphQL does not prescribe one pagination design. An API can use offsets, page numbers, cursors, or another documented model. Connection types with edges and pageInfo are a widely used convention, not a requirement of the core language.

ShopVerse uses forward connections for products and orders. An edge contains a node and a cursor. The node is the business object. The cursor identifies a position for continuing the same collection traversal. `pageInfo.hasNextPage` indicates whether another page is available, and `endCursor` provides the continuation value for the last edge in the current page.

## First-page example

The following **live** operation requests two products in ascending price order:

```graphql
query BrowseProducts($first: Int!, $after: String) {
  products(first: $first, after: $after, sort: PRICE_ASC) {
    edges {
      cursor
      node {
        id
        name
        price { amountMinor currency }
      }
    }
    pageInfo { hasNextPage endCursor }
    totalCount
  }
}
```

First-page variables:

```json
{"first": 2}
```

The omitted `after` means start at the beginning. Copy the returned endCursor into the next request's `after` variable, retaining the same sorting and filters. Stop when hasNextPage is false. Do not construct the next cursor by incrementing a visible number, even if a development cursor happens to decode to readable text.

## Limits and defaults

ShopVerse accepts first values from 1 through 100, with a default of 20. A value of zero is not a request for metadata only; it fails validation in the business layer. A value greater than 100 is rejected rather than silently clamped. Document this distinction because a client that expects clamping may fail unexpectedly after increasing its page size.

The operation variable above is non-null, so its caller must provide first even though the schema argument has a default. Variable declarations and schema argument defaults are different layers. A simpler query can omit the argument entirely and let the schema default apply.

## What this cursor guarantees

The local implementation encodes an offset and a collection scope. The scope includes product filters and sorting, or the caller's identity for order listings. Reusing a cursor with a different collection scope fails instead of silently browsing a different result set. The cursor is opaque to callers even though its educational implementation is simple.

This is not a durable database snapshot. If catalogue contents change between requests, offset-based positions can move, creating skips or repeated items. Stable sorting includes ID as a tie-breaker, but that alone does not freeze the collection. Document the limitation rather than making generic claims that "cursor pagination never duplicates records."

## Empty results and totals

A valid filter can produce no products. In that case the edges list is empty, hasNextPage is false, endCursor is null, and totalCount is zero. An empty result is not necessarily an error. `totalCount` describes the full matching collection at execution time, not just the number of edges in the current page.

Orders are private. The customer sees their own orders; an administrator sees all orders. A totalCount value therefore depends on authorization as well as filters. Avoid implying that the count is a global business metric that every caller can compare directly.

## What the technical writer must document

Describe each argument, default, bound, filter combination, sort order, cursor lifetime, and continuation rule. Explain whether totals are exact or approximate; ShopVerse computes exact totals from its in-memory collection. Include first-page, next-page, final-page, and invalid-cursor examples. Specify whether backward pagination exists; this demo supports only first and after.

## Common mistakes and corrections

**Wrong:** "Use any previous endCursor after changing the sort order."

**Correct:** "Start a new traversal when filters or sorting change; ShopVerse rejects cursors from another scope."

**Wrong:** "Connections are mandatory GraphQL response fields."

**Correct:** "Connections are this API's collection design; other GraphQL APIs may use different pagination contracts."

## Practical exercise

Write pseudocode for collecting all products without assuming a fixed total number of pages. Include the stopping condition and a warning about concurrent catalogue changes.

## Model answer

Start with after omitted. Execute the same operation and append each edge's node to the result. If hasNextPage is false, stop; otherwise assign endCursor to after and repeat with the same filters and sorting. For a changing catalogue, deduplicate by ID when appropriate and do not treat this offset-backed traversal as a consistent snapshot.

## Recap

Pagination documentation must explain traversal and consistency, not merely define cursor as a string. Treat connection fields as a project contract and show a reproducible continuation workflow.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/).

Continue to [the next lesson](#/lesson/l35).


---

# Interfaces, unions, directives, and introspection

Learn the schema features writers encounter while keeping illustrative extensions separate from the live marketplace.

## Learning objectives

- Explain interfaces and unions
- Use __typename and inline fragments
- Describe directives, introspection, and deprecation

## Prerequisites

Read [the previous lesson](#/lesson/l34), or review its recap before continuing.

## Read beyond simple object types

Real GraphQL schemas may contain objects that share fields or collections that contain different object types. Interfaces and unions model these cases differently. An interface declares fields that implementing object types must provide. A union lists possible object types without declaring shared selectable business fields itself. Clients select type-specific fields using fragments.

ShopVerse's live schema uses ordinary object, input, enum, scalar, and connection types. The interface and union examples in this lesson are **illustrative extensions**, not queries that can be executed unchanged in the included playground. This boundary matters: a polished explanation becomes misleading if it advertises fields that the running schema does not contain.

## Interface example

Imagine that a future catalogue supports physical products and gift cards:

```graphql
interface CatalogueItem {
  id: ID!
  name: String!
}

type PhysicalProduct implements CatalogueItem {
  id: ID!
  name: String!
  weightGrams: Int!
}

type GiftCard implements CatalogueItem {
  id: ID!
  name: String!
  expiryPolicy: String!
}
```

A field returning CatalogueItem permits direct selection of id and name. A fragment on PhysicalProduct can then select weightGrams. The technical writer must explain the runtime possibilities and their business meaning; listing the interface name alone does not help a client handle each case.

## Union example and runtime type

A search result might be a product or a seller:

```graphql
union SearchResult = Product | Seller
```

An illustrative selection would use `__typename` and fragments:

```graphql
query Search($text: String!) {
  search(text: $text) {
    __typename
    ... on Product { id name availability }
    ... on Seller { id name }
  }
}
```

The live ShopVerse schema does not expose search in this form. The example shows why __typename is useful: it identifies the concrete result type so the client can choose the appropriate rendering or processing path. Even fields that happen to share names across union members should be selected according to the schema's validation rules.

## Built-in conditional directives

Directives modify how a document or schema element is interpreted. For the baseline used here, `@include(if:)` and `@skip(if:)` can conditionally include fields or fragments during execution. The condition is a Boolean value, often supplied through a variable.

```graphql
query ProductCard($showOriginal: Boolean!) {
  product(id: "prod_1001") {
    name
    price { amountMinor currency }
    priceBeforeMarkdown @include(if: $showOriginal) {
      amountMinor
      currency
    }
  }
}
```

This operation is **live**. With showOriginal false, the field is omitted from the response, not returned as null. That is distinct from selecting the field and receiving null because no original price exists. Document conditional response shapes when client examples depend on them.

## Introspection and descriptions

Introspection lets tools inspect a schema's types, fields, arguments, descriptions, and other metadata. It supports explorers and generated references. Availability is an operational policy: a production service may restrict introspection. Do not claim that disabling it replaces field-level authorization or prevents every form of schema discovery.

Descriptions in SDL should communicate purpose, constraints, and relationships. Introspection can expose those descriptions, but it cannot invent missing workflow context or explain business rules that were never written down. A generated explorer is a starting point for reference documentation, not a complete developer experience.

## Deprecation and compatibility

A deprecation marks an element as discouraged while retaining it for compatibility. A useful reason names the replacement, explains differences, and links to migration guidance. Removing the deprecated element later is a separate change that requires an explicit release policy. Exact directive locations and capabilities depend on the specification and tooling version; verify the chosen baseline before teaching newer features as executable.

## What the technical writer must document

Record possible runtime types, shared versus type-specific fields, fragment examples, directive conditions, introspection access, and deprecation replacements. Explain what consumers must do when a new union member appears. Do not assume every client uses generated types or the same cache conventions.

## Common mistakes and corrections

**Wrong:** "A skipped field is returned with null."

**Correct:** "A field excluded by a conditional directive is absent from the response selection."

**Wrong:** "Deprecated means deleted."

**Correct:** "Deprecation warns consumers before removal; the field remains callable while it is still in the schema."

## Practical exercise

Write a deprecation reason for a hypothetical product field named originalPrice that is being replaced by priceBeforeMarkdown. Avoid claiming that this legacy field exists in the live API.

## Model answer

For the illustrative legacy field: "Use priceBeforeMarkdown, which returns an amountMinor and currency object. Update both your selection set and price formatting before removing originalPrice from your integration." Add the actual removal date only after the release owner confirms it; do not invent one.

## Recap

Advanced schema features affect client behavior and reference structure. Teach them with explicit scope labels and explain the consequences of runtime types, conditional selections, and deprecation.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/).

Continue to [the next lesson](#/lesson/l36).


---

# GraphQL transport and operational concerns

Separate the GraphQL language from HTTP behavior, runtime limits, subscriptions, and platform-specific architecture.

## Learning objectives

- Describe a complete GraphQL HTTP request
- Explain operational risks without universal claims
- Identify extension features that the demo does not implement

## Prerequisites

Read [the previous lesson](#/lesson/l35), or review its recap before continuing.

## The language is not the transport

GraphQL specifies a type system and execution model. Moving a request over HTTP adds another layer: URL, method, headers, media types, status codes, and connection behavior. The GraphQL-over-HTTP document is a working draft, so distinguish its status from a published core language specification. The included server uses graphql-http 1.22.4 with GraphQL.js 16.11.0; behavior should be tested against those versions.

ShopVerse exposes one local endpoint, `/graphql`. A typical POST request contains query, variables, and optionally operationName. When a document contains multiple operations, the request must select one. The operationName is a declared GraphQL operation name, not an arbitrary label for a log entry.

## Complete request example

```bash
curl -i http://localhost:3000/graphql \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/graphql-response+json, application/json;q=0.9' \
  --data '{"query":"query GetProduct($id: ID!) { product(id: $id) { id name } }","variables":{"id":"prod_1001"},"operationName":"GetProduct"}'
```

Content-Type describes the request body. Accept expresses supported response formats. Quoting rules in a shell are separate from GraphQL syntax; provide a variables editor or JSON file alternative when a command becomes hard to read. Authentication uses the same local bearer-token roles as REST.

## Status codes and response interpretation

Do not teach that GraphQL always returns HTTP 200. Malformed requests, unsupported methods, negotiation problems, and request-level failures can produce non-success statuses depending on the request and selected media type. Execution responses can contain data and errors together. Inspect both transport metadata and the GraphQL envelope.

ShopVerse business exceptions are converted into GraphQL errors with extensions such as code and httpStatus. That extension does not force the HTTP status to the same number. The playground shows actual status, headers, and body rather than deriving status from an error field. An unavailable engine in the dependency-free mode returns HTTP 503 with a clear installation message.

## Authentication and authorization

A token identifies a demo actor; it does not automatically authorize every field in a document. The shared business layer checks ownership and role for private operations. A public product and private profile can appear in one query, so authorization may affect individual response positions. Never document one endpoint as simply "authenticated" when its field-level behavior is more nuanced.

Do not store production tokens in browser learning notes or examples. The demo tokens are fixed synthetic strings, not signed JWTs. The project does not implement an OAuth authorization server. Its OAuth lesson explains real protocols conceptually without misrepresenting these local tokens.

## Performance and demand controls

GraphQL allows nested selections, but a single network request is not automatically cheap. An N+1 problem occurs when resolving a list triggers a separate dependent lookup for each item. Batching and request-scoped caching can help in suitable implementations. This in-memory teaching server does not demonstrate a database query planner or a production batching system.

Production services may use depth limits, complexity budgets, pagination limits, timeouts, persisted operations, or allowlists. Each policy needs an exact documented rule and error behavior. ShopVerse enforces collection and business limits but is not a hardened public GraphQL gateway. Do not deploy it as a production commerce backend.

## Subscriptions and federation

Subscriptions describe long-lived operation behavior, but an actual delivery mechanism and connection protocol must also be selected. WebSocket or event-stream examples require their own authentication, reconnect, ordering, and cleanup guidance. The live demo exposes no subscription root and no streaming transport.

Federation combines separately managed schemas through a platform-specific composition and execution model. Terms such as subgraph, entity key, and gateway belong to that architecture, not to every GraphQL service. This course introduces the concepts so a writer can ask informed questions; it does not claim that ShopVerse is a federated system.

## What the technical writer must document

Specify endpoint, methods, request envelope, media types, authentication, transport failures, execution errors, and operational limits. Mark subscriptions, persisted queries, batching, and federation as supported, unsupported, or illustrative. Avoid leaving readers to infer platform capabilities from the word GraphQL.

## Common mistakes and corrections

**Wrong:** "One endpoint means one permission and one cost."

**Correct:** "The selected fields determine the work and may have different access requirements."

**Wrong:** "The presence of a GraphQL schema proves subscriptions are available."

**Correct:** "Subscription support requires a schema operation and a documented transport implementation."

## Practical exercise

Write a support note for a learner who can read REST products but receives 503 from /graphql before running npm install.

## Model answer

The local server can run its dependency-free REST features without the GraphQL packages, but GraphQL execution requires the pinned runtime dependencies. Run `npm install` in the project directory, restart `npm run dev`, and check `/health` for `graphqlAvailable: true`; the course reader and REST labs remain usable meanwhile.

## Recap

Document the whole request path, not just the query syntax. Be precise about transport, authorization, cost controls, and which platform extensions actually exist.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [OAuth 2.0 security best current practice, RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html).

Continue to [the next lesson](#/lesson/l37).


---

# Document a GraphQL schema beyond its field names

Turn SDL into a useful business reference with constraints, relationships, and precise value semantics.

## Learning objectives

- Write descriptions that add information
- Build complete field and argument tables
- Document scalar and relationship behavior

## Prerequisites

Read [the previous lesson](#/lesson/l36), or review its recap before continuing.

## A schema is a map, not a complete guide

SDL identifies operations and their type relationships. It tells a client that Product has a nullable Money field named priceBeforeMarkdown, but it does not automatically explain when that value is recorded, how it relates to price, or how a shopping interface should handle its absence. Good reference writing adds those business meanings without contradicting the machine-readable contract.

Start with the reader's task. A product-card developer needs current price, original price, availability, and formatting rules. A seller integrator needs writable fields and constraints. A support engineer needs to understand why a valid GraphQL document still fails business validation. Organize descriptions around those needs rather than repeating "the product ID" for every id field.

## A useful field table

For Product, a focused reference might include:

| Field | Type | Meaning and rules |
| --- | --- | --- |
| id | ID! | Opaque identifier; do not derive ordering or business meaning from it. |
| name | String! | Display name containing 1-120 Unicode code points. |
| price | Money! | Current catalogue price; INR minor units in this demo. |
| priceBeforeMarkdown | Money | Original price when recorded; null means none is recorded, not zero. |
| availability | Availability! | IN_STOCK permits adding to a cart; OUT_OF_STOCK does not. |
| reviews | [Review!]! | Public reviews; an empty list means no recorded reviews. |

Keep requiredness language appropriate to context. A non-null output field is a response guarantee subject to execution error propagation. A required input field is a caller obligation. Both use exclamation marks but play different roles in documentation.

## ShopVerse description workshop

A weak description says, "The price before markdown." A stronger one says, "Original price before a markdown, when recorded. Null means no original price is recorded. When present, the amount is at least the current price and uses the same supported currency."

This description adds semantics, null behavior, and a relationship constraint. It still needs an example showing Money's amountMinor and currency fields. Do not convert the amount to a formatted string in a response example; display formatting belongs in the client explanation.

```graphql
query PriceCard($id: ID!) {
  product(id: $id) {
    name
    price { amountMinor currency }
    priceBeforeMarkdown { amountMinor currency }
  }
}
```

Use prod_1001 to demonstrate an original price and prod_1002 to demonstrate null. Both examples are live after resetting the seed data. A before-and-after pair teaches the optional display behavior better than a single happy-path value.

## Describe arguments separately from inputs

Root-field arguments, input-object fields, and output fields belong in related but distinct tables. For products, document first's default and maximum beside the argument. For CreateOrderInput, document idempotencyKey's scope and retention beside the input field and link to retry guidance. For Order, explain that items and totals are captured at creation rather than continually recalculated from catalogue prices.

ShopVerse's UpdateProductInput illustrates why type syntax alone is insufficient. All its fields are optional, but an empty input object is invalid and explicit null is allowed by business logic only for priceBeforeMarkdown. Include both rules so generated forms do not submit null for every unused field.

## Relationships and access

A relationship field can be cheap, expensive, public, private, empty, or unavailable. Explain the actual implementation. Product.seller returns a seller profile. Product.variants contains read-only demonstration variants, while checkout selects a product ID rather than a variant ID. Without that clarification, readers may infer a variant-ordering workflow that the demo does not support.

Order.shipments requires access to the parent order and returns an empty list for newly confirmed orders. A seeded delivered order supplies a tracking example. Do not describe a missing shipment as a delayed network result; it is a normal business state in this implementation.

## What the technical writer must document

For every important element, capture business meaning, type, nullability, allowed values, limits, defaults, permissions, relationship behavior, and an example. Document DateTime's exact UTC representation and Money's integer convention. Add cross-links from schema elements to operations and workflows that use them. Record unanswered questions rather than replacing them with plausible guesses.

## Common mistakes and corrections

**Wrong:** "Money is the price."

**Correct:** "Money contains integer minor units and a currency code; this demo supports INR only."

**Wrong:** "Variants can be ordered because Product exposes variants."

**Correct:** "Variants are read-only catalogue examples; the implemented cart accepts productId."

## Practical exercise

Write a reference entry for UpdateProductInput.priceBeforeMarkdown covering omission, null, a supplied value, permissions, and a link to a related operation.

## Model answer

`priceBeforeMarkdown: MoneyInput` is optional. Omit it to preserve the existing value, send null to clear it, or supply a MoneyInput to set an original price at least as large as the current price. Product updates require the owning seller or administrator; see the updateProduct mutation for complete variables and error examples.

## Recap

Useful schema documentation explains business meaning and consumer behavior. Field names and type syntax are the starting evidence, not the finished reference.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/).

Continue to [the next lesson](#/lesson/l38).


---

# GraphQL query reference workshop

Write operation pages that a developer can execute and adapt without reconstructing missing context.

## Learning objectives

- Build a complete query reference
- Provide matching variables and response selections
- Cover missing data and permissions

## Prerequisites

Read [the previous lesson](#/lesson/l37), or review its recap before continuing.

## Start with a task-specific operation

A schema reference tells readers what is possible. An operation reference demonstrates a useful selection for a task. Do not imply that one example query is the only valid way to retrieve a product. State the purpose of the example, its prerequisites, and the fields it deliberately includes.

For a product card, the task is to display a name, current price, optional original price, and availability. This is smaller than an all-fields catalogue query and easier to reason about. For a support page, another query may include reviews, seller details, or variants. Explain why each example selects what it does.

## Complete product lookup

Use the local `/graphql` endpoint without authentication for this public query:

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
{"id": "prod_1001"}
```

After a seed reset, the successful response is:

```json
{
  "data": {
    "product": {
      "id": "prod_1001",
      "name": "Wireless Headphones",
      "price": {"amountMinor": 249900, "currency": "INR"},
      "priceBeforeMarkdown": {"amountMinor": 299900, "currency": "INR"},
      "availability": "IN_STOCK"
    }
  }
}
```

The response mirrors the selection set. It does not include sku merely because Product has that field. Name the reset condition because a learner can update or delete the product during other exercises. The example is deterministic only relative to a known dataset state.

## Argument and result explanations

The id variable is required by the operation declaration. It is an opaque product identifier, not a SKU. Explain that unknown IDs produce a field error with product null in this implementation; do not describe an empty object or an empty list. Link the error guidance to a valid catalogue query that can find available IDs.

Money values are integers in INR minor units. A price of 249900 represents INR 2,499.00 here. Null original price means no original value is recorded. Availability is a business enum, not a stock quantity. An IN_STOCK value does not reserve inventory or promise that a later purchase will succeed.

## Add a private query

An order reference must state its access requirements before the example:

```graphql
query ReadOrder($id: ID!) {
  order(id: $id) {
    id
    status
    total { amountMinor currency }
    items { productId name quantity unitPrice { amountMinor currency } }
    shipments { id status trackingCode }
  }
}
```

Use the customer token with ord_1001 after reset. The other customer's token must not reveal it. For a newly created order, use the returned order ID instead of assuming that every environment assigns ord_1002. Seed IDs are stable; generated IDs are outputs of earlier steps.

## Describe variations intentionally

A reference can include a minimal example, a nested example, and an error example. Label them by purpose. Keep operation names stable and variables separate from query text. Aliases are useful when retrieving two products in one document, but the response keys then use the aliases, which should be reflected in examples and error-path explanations.

A query containing multiple named operations needs operationName in its HTTP envelope. A document containing one operation may omit that envelope field. Do not confuse operationName with the root-field name; GetProduct and product are different identifiers in the example above.

## What the technical writer must document

Include purpose, endpoint, transport, authentication, schema elements, query document, variables, selected response shape, errors, and related workflows. Describe the dataset assumptions behind exact responses. Mark abbreviated response excerpts explicitly. A reference review should validate the document against the actual SDL and execute it when the runtime is available.

## Common mistakes and corrections

**Wrong:** "Variables: id = prod_1001."

**Correct:** "Provide a valid JSON object: `{"id":"prod_1001"}` in the variables editor."

**Wrong:** "The response includes every Product field."

**Correct:** "The response includes the fields selected by this operation, subject to execution results."

## Practical exercise

Review a query page that includes a required $id variable but no variables block, shows sku in the response without selecting it, and says all orders are public. List the three corrections.

## Model answer

Add a valid variables JSON block with a known product or order ID. Remove sku from the response or add it to the actual selection, then regenerate the example. Replace the public-access statement with the order-owner or administrator requirement and include an unauthorized-access test.

## Recap

A trustworthy operation page is a reproducible package: task, query, variables, access, response, and failure guidance all agree.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/).

Continue to [the next lesson](#/lesson/l39).


---

# GraphQL mutation reference workshop

Document writes as state transitions with validation, permissions, and recovery guidance.

## Learning objectives

- Describe mutation preconditions and side effects
- Write complete input and payload examples
- Explain safe recovery from uncertain outcomes

## Prerequisites

Read [the previous lesson](#/lesson/l38), or review its recap before continuing.

## Write about the business change first

A mutation is not just a query that begins with another keyword. Its reference must explain what state changes, who may request the change, what must already exist, and what happens when the operation cannot complete. The response selection does not determine which side effects occur.

ShopVerse addCartItem requires an existing ACTIVE cart, access to that cart, a product that permits adding to carts, and a quantity from 1 through 99. If the product is already present, the mutation returns an error rather than incrementing its quantity. A writer who omits that rule causes repeat executions of a copied sample to become confusing.

## Add an item example

This **live** mutation uses the customer demo token:

```graphql
mutation AddItem($input: AddCartItemInput!) {
  addCartItem(input: $input) {
    cart {
      id
      status
      items { id productId quantity }
      total { amountMinor currency }
    }
  }
}
```

Variables after reset:

```json
{
  "input": {
    "cartId": "cart_1001",
    "productId": "prod_1001",
    "quantity": 1
  }
}
```

Record the returned item ID for later update or removal. Do not assume that an item ID equals the product ID. The cart total reflects current catalogue prices. Once an order is placed, its own line prices and names become a separate snapshot.

## Explain invalid states

A checked-out cart cannot accept additional changes. An out-of-stock product cannot be added. A quantity of zero does not remove an item; use removeCartItem. A second add for the same product is not an update; use updateCartItem with a replacement quantity. These are business rules beyond SDL's Int and ID types.

A good error table links each condition to an action. For example, CART_CLOSED means start a new cart rather than repeatedly retry the old one. INVALID_INPUT means correct the indicated input. FORBIDDEN means the current actor lacks access; changing a quantity will not fix it.

## Order creation is a workflow boundary

```graphql
mutation PlaceOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    order { id status total { amountMinor currency } }
    replayed
  }
}
```

CreateOrderInput contains cartId, shippingAddress, and idempotencyKey. The key identifies the customer's order intent and survives until the local server restarts or resets. The first successful call snapshots the order and closes the cart. Repeating identical details with the same key returns the saved order with replayed true. Reusing the key with different details causes a conflict.

A timeout does not prove that order creation failed. The server might have committed the change before the client stopped waiting. Recover with the same key and identical details while the retained result remains available. Do not instruct learners to generate a new key for every automatic retry.

## Payload conventions and failures

ShopVerse returns typed success payloads and uses top-level GraphQL errors for failed business operations. Some APIs instead include typed user-error collections inside payloads. Both patterns require documentation; neither should be assumed from the mutation name alone. Do not add a userErrors selection to this schema because another API uses it.

The root mutation fields are nullable, allowing the failed field's result to be null. An execution error can coexist with data from other root fields. Serial execution of top-level mutation fields does not provide an all-or-nothing transaction or automatically prevent subsequent fields from running after a nullable failure.

## What the technical writer must document

Capture permissions, required inputs, limits, preconditions, state transitions, outputs, idempotency, side effects, and error recovery. Explain generated IDs and how to use them in follow-on steps. Separate exact seed examples from workflows that create new resources dynamically. Include a reset note for destructive or stateful exercises.

## Common mistakes and corrections

**Wrong:** "Retry createOrder with any new key after a timeout."

**Correct:** "For the same order intent, reuse the original key and identical details while its result is retained."

**Wrong:** "Set quantity to zero to remove an item."

**Correct:** "ShopVerse requires quantity 1-99; use removeCartItem to delete an item."

## Practical exercise

Write a five-line reference note for addCartItem that explains its access, state requirement, quantity limit, duplicate behavior, and next operation for changing quantity.

## Model answer

Use the cart owner's customer token or the administrator token. The cart must be ACTIVE. Quantity is an integer from 1 through 99. Adding a product already in the cart fails rather than merging quantities. Use updateCartItem with the returned item ID to set a new quantity.

## Recap

Mutation references must make changes and recovery visible. A syntactically correct example is not enough when its state assumptions and retry rules are missing.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l40).


---

# Write a GraphQL purchase-flow guide

Connect individual operations into a reproducible integration without hiding state or promising unrealistic transaction behavior.

## Learning objectives

- Plan a multi-step GraphQL tutorial
- Carry identifiers and retry keys across steps
- Compare REST and GraphQL fairly

## Prerequisites

Read [the previous lesson](#/lesson/l39), or review its recap before continuing.

## Define the tutorial's outcome

A useful integration guide ends with an observable result. For ShopVerse, the outcome is a confirmed synthetic order containing one available product, together with its identifier and total. It is not a paid purchase: the demo has no payment provider, taxes, shipping fees, inventory reservation, or fulfillment automation.

State the environment before the steps. Run the local server, install the GraphQL dependencies, use the customer demo token, and reset data when a known seed state is needed. A reset erases every learner's in-memory work on that server process. Explain this before a troubleshooting instruction suggests resetting without considering other open browser tabs.

## Step 1: Find an available product

Use a product query to retrieve the ID, name, availability, and current price. The seeded prod_1001 is available, but a general client should consume the response rather than assume every product can be ordered. Availability is checked again when adding or ordering; a prior read does not reserve the product.

```graphql
query PickProduct {
  product(id: "prod_1001") {
    id
    name
    availability
    price { amountMinor currency }
  }
}
```

The task needs these fields, not every Product relationship. Explain the selected shape so a reader understands how to adapt it for their own interface.

## Step 2: Create a cart and retain its ID

```graphql
mutation StartCart {
  createCart {
    cart { id status }
  }
}
```

Use the returned cart.id in the next request. Do not hard-code cart_1002 into a general tutorial: another operation could have created a cart first. The seeded cart_1001 is convenient for isolated labs, whereas a full workflow should demonstrate carrying real outputs forward.

## Step 3: Add the product

Execute addCartItem with the new cart ID, prod_1001, and quantity 1. Request the updated cart total and returned item ID. If a repeat call says the item already exists, retrieve the cart and choose updateCartItem rather than blindly retrying addCartItem.

An operation document cannot automatically use the result of one root mutation as an argument to another root field in the same request. A client normally waits for the first response and then constructs the next request. Serial mutation execution does not create a general result-piping language.

## Step 4: Place the order

Use this variables structure with the PlaceOrder mutation from the previous lesson:

```json
{
  "input": {
    "cartId": "REPLACE_WITH_RETURNED_CART_ID",
    "shippingAddress": {
      "line1": "10 Example Road",
      "city": "Bengaluru",
      "postalCode": "560001",
      "country": "IN"
    },
    "idempotencyKey": "purchase-guide-001"
  }
}
```

This block is a template until the cart ID is replaced. Label that fact rather than calling it an executable exact request. The address is synthetic and the local demo supports country IN only. Preserve the same key and details while recovering from an uncertain result; use a distinct key for a genuinely new order intent.

## Step 5: Verify and explain the result

Retrieve the returned order ID. Verify status CONFIRMED and the expected quantity and total. Retrieve the cart and verify CHECKED_OUT. Newly created orders have no shipments; the seeded delivered order is the tracking example. A successful order response does not imply that a courier or payment network was contacted.

Capture both the successful path and a recovery path in the guide. An exact response can be reproduced after a reset, but generated timestamps and IDs should be treated as outputs. The tutorial should tell a learner which values to compare exactly and which to carry forward.

## Compare the REST workflow

REST uses a product GET, cart POST, cart-item POST, order POST, and order GET. GraphQL expresses comparable operations through documents sent to one endpoint and lets each operation select its returned fields. Both use the same business rules here. Count actual requests for the documented workflow rather than claiming that GraphQL always completes checkout in one request.

Neither interface is automatically more secure or faster. Response size, server execution, caching, latency, tooling, and the consumer's needs all affect the result. The documentation should help readers choose the relevant guide without turning a technical comparison into a slogan.

## What the technical writer must document

Include prerequisites, environment, token role, state assumptions, steps, identifier handoffs, success checks, recovery actions, and cleanup. Mark templates and excerpts clearly. Link each step to its operation reference, but keep enough information in the tutorial that a reader does not need to jump among many pages to complete the task.

## Common mistakes and corrections

**Wrong:** "Run all mutations together and use the first result as the next input."

**Correct:** "Capture the returned identifier, then pass it in the next request's variables."

**Wrong:** "Order confirmed means payment was processed."

**Correct:** "In this local demo, confirmation records an order only; no payment integration exists."

## Practical exercise

Add a recovery section for a lost createOrder response. Include what to preserve, what to retry, and a boundary on the guarantee.

## Model answer

Preserve the original customer identity, cart ID, address, and idempotency key. Retry createOrder with identical details and the same key to retrieve the retained result. The demo retains keys only until restart or reset, so do not describe this as permanent duplicate protection.

## Recap

A workflow guide explains how steps depend on each other and how to recover safely. Use the same business outcome to compare REST and GraphQL, and avoid unsupported claims about requests, payments, or transactions.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l41).


---

# Docs-as-code: Markdown, Git, and review

Treat documentation changes as reviewable, versioned product work rather than untracked files.

## Learning objectives

- Use a simple documentation branch workflow
- Separate source content from generated output
- Write a useful documentation pull request

## Prerequisites

Read [the previous lesson](#/lesson/l40), or review its recap before continuing.

## What docs-as-code means

Docs-as-code applies familiar software collaboration practices to documentation: plain-text source, version control, review, automated checks, and repeatable publishing. It does not mean that every writer must become a software engineer or that a particular hosting platform is mandatory. The purpose is traceability and dependable collaboration.

This course stores lessons as Markdown, structured metadata as JSON, API contracts as JSON/YAML/SDL, and behavior as JavaScript. The build combines those sources into a browser-readable bundle. Editing the generated bundle alone would lose the change on the next build. Start by identifying which file is authoritative for the information you are changing.

## Understand the repository layout

The lesson source for this page lives in public/content/lessons. API operation metadata lives in server/routes.js, reusable REST schemas in server/schemas.js, and the GraphQL schema in public/contracts/schema.graphql. Generated OpenAPI files and REST references come from scripts/contracts.js. Application code and learning content are deliberately separate.

A technical writer should be able to explain this flow without memorizing every source file. The essential question is: which change should be made once so that all derived outputs stay consistent? For a new REST parameter, changing only a rendered reference page leaves the contract and implementation behind.

## A practical Git workflow

The following commands are **illustrative repository commands**; initialize or clone a repository before using them:

```bash
git status
git switch -c docs/product-price-clarification
# Edit the relevant source files in your editor.
npm run build
npm run check
npm test
git diff --check
git diff
git add public/content/lessons/l37.md
git commit -m "Clarify product markdown-price semantics"
```

Read the diff before staging. Avoid committing secrets, local progress exports, node_modules, generated test artifacts, or unrelated changes. A writer's branch should make its purpose easy to review. A huge mixed change containing formatting, behavior, and a new tutorial is harder to verify than a focused set of commits.

## Write a useful pull-request description

Summarize the reader problem, the change, its scope, and the evidence. For example: "Clarifies that null priceBeforeMarkdown means no original price is recorded, not zero. Updates the field reference and the product-card lesson. Validated both seeded products against the local REST server; GraphQL example validation remains pending in this environment."

That last sentence is important. Reviewers need to know what was actually tested. Do not turn a planned check into a completed check. Include screenshots when they reveal layout behavior, but use request/response evidence for API semantics. A screenshot of a code block does not prove the request works.

## Review with different responsibilities

A technical review checks correctness, permissions, limits, states, and compatibility. An editorial review checks clarity, consistency, organization, and audience fit. A usability review asks someone to follow the steps from the stated starting point. Automated checks can support all three but cannot replace them.

Resolve comments with specific changes or a documented reason. When two reviewers disagree about behavior, ask for a source of truth or a reproducible test instead of polishing both contradictory statements. If the implementation is wrong, track the product defect; do not silently describe an accidental behavior as a permanent contract.

## Publishing and rollback

A repeatable build reduces manual publishing errors. The static build supports reading, search, quizzes, and local progress; a Node server is needed for live API execution. Deploying only the static folder must not make the playground pretend to run requests. The interface explains that boundary explicitly.

Keep documentation versions aligned with supported API versions. A rollback may need to restore both content and contract artifacts. Do not assume that reverting prose reverts a deployed server behavior. The release owner should identify which parts are independently deployed and which release notes apply to each.

## What the technical writer must document

Document how to install, build, preview, test, review, and publish the docs. Identify generated files, ownership, branch conventions, review expectations, and release gates. Include known tool limitations. A contributor guide should help a new writer make one safe change without needing private knowledge from the original author.

## Common mistakes and corrections

**Wrong:** "Edit the bundled course-data.js to change a lesson."

**Correct:** "Edit the Markdown lesson source and rebuild the bundle."

**Wrong:** "All checks passed" when one check could not run.

**Correct:** "List passed checks and explicitly identify skipped or blocked checks with their reason."

## Practical exercise

Write a pull-request description for a correction that changes a quantity limit from 100 to 99 in a tutorial. Include the reader impact and verification evidence.

## Model answer

"Corrects the cart tutorial's quantity maximum to 99, matching the business validator and API contract. Previously, a reader following the page could receive an avoidable validation error. Checked quantity 99 succeeds and 100 fails in the local REST lab, updated the matching GraphQL explanation, and ran the content and link checks."

## Recap

Docs-as-code makes changes traceable and reviewable. Edit authoritative sources, show evidence, separate review responsibilities, and publish through a repeatable process.

## Sources and related reading

[Official Git documentation](https://git-scm.com/doc).

Continue to [the next lesson](#/lesson/l42).


---

# Test documentation at several layers

Build a quality plan that catches broken examples, misleading contracts, and unusable pages.

## Learning objectives

- Distinguish content, contract, runtime, and browser checks
- Design representative positive and negative tests
- Report results honestly

## Prerequisites

Read [the previous lesson](#/lesson/l41), or review its recap before continuing.

## No single test proves documentation quality

A file can be valid JSON and still describe a nonexistent operation. A request can succeed and still be explained badly. A page can pass an automated accessibility scan and still be difficult to navigate with a keyboard. Test documentation at multiple layers, each tied to a specific failure mode.

Start with a coverage matrix. List every advertised operation, lesson, download, and interaction. Mark whether it has source content, a valid contract, a working example, and test evidence. The matrix exposes gaps that a successful homepage screenshot cannot reveal. Counts are useful only when the entries represent substantive completed work.

## Layer 1: Content integrity

Check that lesson IDs are unique, required sections exist, links resolve, downloads are present, and generated references contain meaningful descriptions. Search for placeholder phrases and empty files. Verify that examples are labelled live, illustrative, or intentional-error so readers know what to expect.

Word counts can identify suspiciously thin lessons, but they are not proof of quality. A 1,000-word page may repeat itself, while a precise reference table may be short and excellent. Review explanations for correctness, task relevance, and unnecessary complexity instead of using length as the only acceptance criterion.

## Layer 2: Contract validation

Parse OpenAPI and check its structural requirements, references, operation IDs, schemas, and examples. A schema validator should evaluate the version and dialect actually used. In OpenAPI 3.1, null handling follows JSON Schema semantics; older 3.0 assumptions can reject valid documents or accept misleading ones.

Build the GraphQL schema and validate executable operation documents against it. This catches unknown fields, missing selection sets, invalid arguments, and incompatible variable declarations. It does not prove that a resolver enforces ownership or that a business side effect is correct. Add runtime tests for those behaviors.

## Layer 3: Execute examples

Test success paths and meaningful failures. For addCartItem, quantity 1 and 99 should succeed under valid preconditions; 0 and 100 should fail. The wrong customer must not access another customer's cart. Repeating a product add must follow the documented duplicate behavior. Tests should reset or isolate state so their order does not accidentally determine the result.

For createOrder, verify one creation, identical replay, changed-body conflict, cart closure, and immutable order prices. Do not assert a guessed timestamp. Check timestamp format and compare business fields that should remain stable. Capture exact responses when a page claims to show an exact seeded result.

## ShopVerse test example

```javascript
import assert from 'node:assert/strict';

const response = await fetch('http://localhost:3000/api/v1/products/prod_1001');
assert.equal(response.status, 200);
const product = await response.json();
assert.equal(product.id, 'prod_1001');
assert.equal(product.price.currency, 'INR');
assert.equal(product.price.amountMinor, 249900);
```

Run this after resetting the dataset, or make the test establish its own known product. The example checks selected facts; it is not a full response-schema validator. State that scope rather than calling a few assertions complete contract coverage.

## Layer 4: Browser behavior and accessibility

Check navigation, deep links, search, theme persistence, progress, notes, quiz feedback, downloads, and real request execution. Test desktop and narrow screens. Use the keyboard for menus, dialogs, form controls, and focus transitions. Verify visible labels and readable error messages.

The standalone reader should work without a backend. Its playground should show an unavailable state instead of a successful canned response. The server-backed version should show actual status and headers. Also test invalid JSON, aborted requests, and an offline server so failures are understandable rather than blank panels.

## Evidence and release decisions

Record commands, environment, versions, pass/fail counts, skipped checks, and known limitations. A network-restricted environment may prevent dependency installation; that is a real limitation, not a reason to invent passing GraphQL tests. Include the tests in the project so they can run where dependencies are available.

A release gate should reflect risk. A broken installation command blocks the entire course. A misleading order retry rule can create duplicate intent. A minor spacing defect matters, but it should not distract reviewers from incorrect authorization guidance or invalid schema examples.

## What the technical writer must document

Provide a test plan, expected results, reproducible setup, known limitations, and acceptance criteria. Distinguish structural checks from full specification validation and automated accessibility checks from conformance claims. Include a human review of explanations and task completion.

## Common mistakes and corrections

**Wrong:** "The YAML parses, so the OpenAPI contract is correct."

**Correct:** "Parsing checks syntax; validate structure, schemas, examples, and implementation agreement separately."

**Wrong:** "No browser errors means the page is accessible."

**Correct:** "Console checks are useful but do not replace keyboard, semantic, contrast, and usability review."

## Practical exercise

Design three tests for order idempotency and explain why a single successful order request is insufficient.

## Model answer

First, create an order with a new key and verify the created result. Second, repeat identical details with the same customer and key and verify the same order is returned without another order being created. Third, change the address while reusing the key and verify a conflict. One success proves neither replay behavior nor conflict protection.

## Recap

Quality comes from complementary evidence. Test source content, contracts, real behavior, and the reader's interface, then report exactly what each check establishes.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [WCAG 2.2](https://www.w3.org/TR/WCAG22/); [JSON Schema documentation](https://json-schema.org/learn/).

Continue to [the next lesson](#/lesson/l43).


---

# Release notes, deprecation, and migration guides

Explain API changes in terms of consumer impact, required action, and verified compatibility.

## Learning objectives

- Classify additive and breaking changes carefully
- Write actionable release notes
- Create before-and-after migration guidance

## Prerequisites

Read [the previous lesson](#/lesson/l42), or review its recap before continuing.

## Start with the consumer's contract

A release note is not a transcript of an engineering ticket. It should explain what changed, who is affected, why it matters, and what action is required. A migration guide provides the steps needed when an integration must change. Both need the release's actual scope and timing; do not invent a deployment date or removal deadline.

Classify changes relative to supported consumers. Adding an optional response field is often compatible with tolerant readers, but strict response validators may reject unknown fields. Adding an enum member can break exhaustive client handling. Tightening a maximum may reject requests that previously succeeded. Avoid calling every addition non-breaking without considering client assumptions.

## ShopVerse example: a new optional price field

Suppose a release adds priceBeforeMarkdown to Product. REST consumers may see an additional nullable object in the response. GraphQL consumers do not receive it until they select it. Both need the same business meaning: null means no original price is recorded; when present, the original amount is at least the current amount.

A useful release note could say:

> Product responses can now expose an original price through priceBeforeMarkdown. REST responses include the nullable field; GraphQL clients can request it explicitly. Update product-card rendering to display an original price only when a value is present. Existing current-price behavior is unchanged.

This is an **illustrative change history** for the capstone; the delivered demo already includes the field. Do not present the exercise as an actual historical release by Amazon, Flipkart, or another real service.

## Before-and-after examples

A GraphQL migration may extend a selection:

```graphql
# Before
query Card { product(id: "prod_1001") { name price { amountMinor currency } } }
```

```graphql
# After
query Card {
  product(id: "prod_1001") {
    name
    price { amountMinor currency }
    priceBeforeMarkdown { amountMinor currency }
  }
}
```

Then explain the client condition: do not render an original-price label when the returned value is null. Do not show a discount percentage computed without checking zero or currency assumptions. A migration guide should include behavior and tests, not only a field-name replacement.

## Breaking changes need a complete path

Consider an illustrative quantity maximum reduction from 99 to 50. Requests for 51-99 would become invalid even though the GraphQL type remains Int. A schema diff alone might miss this if the limit lives in descriptions and business validation. The migration must identify affected create/update operations, error behavior, and how clients should validate inputs before the change.

A proper guide includes the supported old and new versions, rollout dates supplied by the release owner, detection steps, code changes, tests, and rollback or support guidance. When dates are not known, label them as release-owner decisions in the draft rather than publishing a fake deadline.

## Deprecation is a process

A deprecation notice should identify the replacement and explain semantic differences. A replacement may change type, nullability, default, or authorization, so "rename the field" may be insufficient. Keep the old behavior available for the agreed period and test both paths while they are supported.

Removal is a separate compatibility event. Do not imply that @deprecated automatically removes a GraphQL field or that an OpenAPI deprecated flag enforces a sunset. These metadata help tools communicate policy; operational behavior comes from the service and release process.

## Enum changes deserve explicit review

An illustrative PREORDER availability member may require a different UI label and different cart rules. A client switch statement that handles only IN_STOCK and OUT_OF_STOCK needs a fallback or an update. Explain whether new enum values can appear without a version change under the API's policy, and what clients should do with unrecognized values.

For input enums, adding a value increases caller options; for output enums, it increases possible responses. The implications differ. Identify where the enum is used before making a broad compatibility statement.

## What the technical writer must document

Record old behavior, new behavior, affected operations and fields, compatibility analysis, required actions, examples, validation changes, timing, and support contacts or ownership. Link release notes to detailed references and migration steps. Keep evidence of engineering review and test results with the change.

## Common mistakes and corrections

**Wrong:** "Added a field. No impact."

**Correct:** "Describe which responses expose it, its null behavior, and whether strict consumers need updates."

**Wrong:** "The type stayed Int, so the new maximum cannot break clients."

**Correct:** "Business constraints are part of the contract even when the GraphQL type syntax is unchanged."

## Practical exercise

Write a release note for an illustrative new PREORDER availability value. Include a client action and identify the business question that must be answered before publication.

## Model answer

"Product availability may now include PREORDER. Update exhaustive enum handling and provide a distinct display state rather than treating unknown values as IN_STOCK." Before publication, confirm whether PREORDER products may be added to carts, when payment or fulfillment occurs, and which API versions can return the value.

## Recap

Document changes by consumer impact. Include business constraints and enum behavior, distinguish deprecation from removal, and provide a tested migration path when action is required.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l44).


---

# Work with engineering teams and release owners

Build a documentation workflow with clear questions, ownership, and release-readiness evidence.

## Learning objectives

- Run focused SME reviews
- Define documentation acceptance criteria
- Use metrics without confusing activity with quality

## Prerequisites

Read [the previous lesson](#/lesson/l43), or review its recap before continuing.

## Start before the feature is finished

Documentation is easier to keep correct when the writer joins during design rather than after deployment. A schema proposal, engineering ticket, or example request can reveal missing business rules early. The writer's role is not to approve every implementation decision; it is to make the consumer contract explicit and testable.

For ShopVerse order creation, early questions include who can place an order, which cart states are accepted, what is captured in the price snapshot, how duplicate requests are handled, and whether inventory is reserved. These questions shape both the reference and the tutorial. Waiting until the end often turns unanswered design questions into rushed guesses.

## Turn broad questions into specific ones

Instead of asking "How does authentication work?", ask "Which token roles may call createOrder, and can an administrator create an order on behalf of a customer?" Instead of "What are the errors?", ask "What response is returned when the same idempotency key is reused with a different address?"

Specific questions invite verifiable answers. Record the answer, source, date, environment, and unresolved follow-up. An engineer's comment may describe intended future behavior; a test may show current behavior. Preserve that distinction until the release owner resolves it.

## A useful SME review packet

Give reviewers a focused package: a short business summary, changed operations, field tables, examples, open questions, and the exact decisions you need. Do not send a long document with only "please review." A reviewer responsible for security should see permissions and token handling; a product owner should see state transitions and terminology.

For a product markdown-price change, ask the reviewer to confirm null semantics, relationship to current price, supported currency, write permissions, and whether existing consumers can receive the new field. Include a negative example where the original price is lower than the current price so the constraint is visible.

## Documentation acceptance criteria

Acceptance criteria should describe observable outcomes. For example: all new fields have business descriptions and constraints; requests and responses validate against the contract; required authentication is explained before examples; the quickstart works from a fresh setup; errors include a recovery action; and the release note links to updated references.

A checklist is not a substitute for judgment. Marking every box does not resolve a contradiction between an enum definition and the server. Treat unresolved high-impact discrepancies as release blockers or explicitly scoped limitations, depending on the product owner's decision and the risk.

## Ownership and change tracking

Assign owners for contract, implementation, content, security review, and publication. One person can hold several roles in a small project, but the responsibilities should still be clear. Generated reference files should have an identified source so nobody fixes a rendered symptom while leaving the generator wrong.

Track a documentation change alongside the feature change. Link the relevant issue, commit, schema diff, examples, and review comments. When a release is delayed, the documentation should not silently publish future behavior as currently available. Feature flags and staged rollouts require explicit audience and environment notes.

## Measure useful outcomes

Page views and number of words are activity measures. More useful evidence includes whether a new developer can finish the quickstart, how often support receives the same integration question, how many examples fail automated checks, and how quickly important documentation defects are corrected. Use several signals rather than a single vanity metric.

Reader feedback should be actionable. A page-level report that includes the operation, environment, request ID when safe, expected result, and actual result is more useful than an unexplained thumbs-down. Do not collect tokens, payment data, or unnecessary personal information in feedback forms.

## ShopVerse release review scenario

Imagine the cart maximum changes. The engineering ticket updates the validator but not the GraphQL description, OpenAPI maximum, tutorial, or quiz. A writer reviewing the coverage matrix can identify all affected artifacts. The right response is a coordinated update and boundary tests, not a single sentence in release notes.

A review comment might say: "The implementation now rejects quantity 75, but the contract and lesson still advertise 99. Please confirm the intended maximum and release scope. Once confirmed, update both interfaces and add tests at the boundary." This is precise, neutral, and actionable.

## What the technical writer must document

Maintain decision records, open questions, acceptance criteria, review owners, release status, and evidence. Include a clear path for reporting defects. Distinguish planned behavior from supported behavior and internal implementation details from public contract commitments.

## Common mistakes and corrections

**Wrong:** "Engineering reviewed it" without identifying scope or unresolved questions.

**Correct:** "Record who reviewed which behaviors, what evidence was used, and which questions remain open."

**Wrong:** "Documentation is complete because every endpoint has a heading."

**Correct:** "Require complete, tested consumer tasks and reference contracts, not just structural coverage."

## Practical exercise

Write three precise SME questions for adding a whole-order return operation.

## Model answer

Which order states may request a return, and may a customer submit more than one request for an order? Does a successful response create only a request, or also initiate refund and shipping actions? Which actor may retrieve the return, and what exact error is returned for another customer's request?

## Recap

Effective collaboration turns assumptions into reviewed contract decisions. Use focused questions, clear ownership, evidence-based acceptance criteria, and metrics tied to reader success.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [Official Git documentation](https://git-scm.com/doc).

Continue to [the next lesson](#/lesson/l45).


---

# Capstone: build a REST documentation package

Use the course tools to produce a complete, testable developer documentation set.

## Learning objectives

- Plan a coherent REST documentation deliverable
- Validate references against the implementation
- Assess the result with a weighted rubric

## Prerequisites

Read [the previous lesson](#/lesson/l44), or review its recap before continuing.

## Your assignment

Act as the technical writer for ShopVerse's product-and-order integration. Your audience is a developer who understands basic HTTP but has not used this API. Produce a documentation package that lets them retrieve a product, create a cart, place a synthetic order, and recover from common failures without private help.

Use the implemented API as the source of truth for this capstone. Do not add payments, seller onboarding, international currencies, or shipment creation to make the project appear larger. A well-scoped accurate package is more valuable than a broad fictional reference that cannot be tested.

## Deliverables and structure

Create an overview, prerequisites and authentication guide, first-request quickstart, endpoint references, purchase-flow tutorial, error and retry guide, validated OpenAPI description, and a portfolio README. Include links among these pages so the package works as a site rather than a disconnected collection of files.

The overview should explain the business tasks, local environment, synthetic data, in-memory lifetime, and production limitations. The quickstart should reach one visible success quickly. Detailed endpoint references can then supply field tables, constraints, and edge cases without overwhelming the first page.

## Start with a documentation plan

List the reader's tasks and map each to a page. Product lookup belongs in both the quickstart and reference, but the two pages should have different purposes. The quickstart explains a successful task; the reference lists the full contract. Reuse canonical examples where possible instead of maintaining contradictory copies.

Identify the authoritative sources: route metadata, shared business rules, reusable schemas, and observed responses. Record any discrepancy in an issue list. A writing project should not quietly modify the API merely to fit an already written paragraph unless the change is intentional and reviewed.

## Build and test the central workflow

The essential sequence is:

```text
GET product -> POST cart -> POST cart item -> POST order -> GET order
```

Carry returned IDs forward. Use the customer token for private operations. Preserve the order idempotency key across retries. Verify the new order is CONFIRMED and the cart is CHECKED_OUT. Explain that confirmation does not charge a payment method or create a shipment.

Include at least four failure cases: missing authentication, another customer's cart, invalid quantity, and changed-body idempotency conflict. For each, explain how the client can recover. A list of status codes without actions does not meet the troubleshooting requirement.

## Reference quality expectations

Each endpoint reference needs method/path, purpose, access, parameters, body fields, requiredness, nullability, defaults, limits, success shape, headers, errors, and examples. Pay special attention to PUT versus PATCH, a 204 response with no body, and conditional GET behavior. Do not show JSON after a no-content response.

Use RFC 9457 Problem Details consistently with the implemented error envelope. Explain code and fields as local extensions. Avoid claiming that every possible error is enumerated if the server can also return transport or unexpected failures. Keep public examples free of private stack traces.

## Assessment rubric

| Criterion | Points |
| --- | --- |
| Technical accuracy and contract agreement | 30 |
| Complete and reproducible purchase workflow | 20 |
| Useful reference tables and examples | 20 |
| Authentication, errors, and safe retry guidance | 15 |
| Information architecture and writing quality | 10 |
| Evidence, limitations, and portfolio honesty | 5 |

A high score requires evidence, not just attractive formatting. The companion capstone page contains a full model submission and review checklist. Use it after writing your own draft so it becomes a comparison tool rather than a copying shortcut.

## What the technical writer must document

Document every prerequisite and business assumption needed to reproduce the result. Include commands used to validate the contract and execute examples. State which checks actually ran and which remain blocked by the environment. The portfolio README should identify ShopVerse as a fictional educational project and explain your contribution accurately.

## Common mistakes and corrections

**Wrong:** "This documents Amazon's order API."

**Correct:** "This documents ShopVerse, a fictional marketplace inspired by common e-commerce workflows."

**Wrong:** "OpenAPI validation proves the checkout tutorial works."

**Correct:** "Validate the contract and execute the complete workflow separately."

## Practical exercise

Draft a five-page information architecture for the capstone and explain how a first-time reader reaches the purchase tutorial without reading every endpoint reference.

## Model answer

Use Overview, Quickstart, Authentication, Purchase tutorial, and API reference as the main entry points, with Error guidance linked from the reference and tutorial. The overview directs a new reader to the quickstart, which establishes the environment and first request. Its next-step link leads directly to the purchase tutorial; the reader consults references only for deeper field and error details.

## Recap

A REST portfolio project succeeds when a reader can complete a realistic task using accurate, tested documentation. Scope, evidence, and recovery guidance matter as much as the endpoint list.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); [Problem Details, RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html).

Continue to [the next lesson](#/lesson/l46).


---

# Capstone: build a GraphQL documentation package

Create a field-aware developer guide that explains both schema structure and real integration behavior.

## Learning objectives

- Combine schema and operation references
- Document a working GraphQL workflow
- Assess nullability, errors, and pagination explanations

## Prerequisites

Read [the previous lesson](#/lesson/l45), or review its recap before continuing.

## Your assignment

Create a GraphQL documentation package for ShopVerse. The reader knows basic JSON and HTTP but needs help reading SDL, supplying variables, selecting fields, and handling errors. Your package should make a product query and a purchase workflow executable while explaining the schema well enough for the reader to adapt those examples.

Do not treat a single POST /graphql entry in OpenAPI as the complete GraphQL reference. It can describe the transport endpoint, but the developer also needs root operations, input types, output fields, enums, nullability, relationships, and examples. The schema is the central contract for those details.

## Required deliverables

Produce a GraphQL overview, first-query quickstart, schema reference, query and mutation examples, pagination guide, authentication and error guide, purchase tutorial, annotated SDL, and portfolio README. Include the exact variables for each runnable example and the selected response shape. Mark illustrative extensions separately from live schema features.

Explain the chosen baseline and runtime versions. The project uses GraphQL.js 16.11.0 and graphql-http 1.22.4, not an unspecified "latest GraphQL" implementation. Link to the specification editions and transport working draft while keeping version claims precise.

## Design the quickstart around one success

Start with GetProduct and the seeded prod_1001. Explain the endpoint, JSON request envelope, query document, required id variable, and response data wrapper. Then ask the reader to remove a selected field and observe how the response changes. This teaches the selection model through a useful task.

Next, retrieve prod_1002 and show priceBeforeMarkdown as null. The comparison creates a natural explanation of nullable fields. Do not introduce every advanced schema feature before the learner can execute and interpret a simple query.

## Explain the difficult behaviors

The package must include a partial-data example that queries public product data and private me anonymously. Explain why the product can succeed while me is null with an error. Include an unknown-field validation error and an invalid input example so readers can distinguish failure stages.

Pagination must show a first page, the returned endCursor, a next-page request, and the stopping condition. State first's default and maximum. Explain that the local cursor is scope-bound and offset-backed, not a durable snapshot. Do not claim that connection types are required by GraphQL itself.

## Document writes as workflows

Use createCart, addCartItem, createOrder, and order to demonstrate a purchase. Capture returned identifiers and preserve the idempotency key. Explain that multiple root mutation fields do not automatically form a transaction or pipe results into later arguments.

For updateProduct, document omission versus null. For addCartItem, document duplicate behavior and quantity replacement through updateCartItem. For createReturn, explain that a request is not a refund and that the demo supports one whole-order return for a delivered order only.

## A model reference excerpt

```text
Field: Product.priceBeforeMarkdown
Type: Money
Purpose: Original price before markdown, when recorded.
Null behavior: No original price is recorded; do not display zero.
Constraint: When present, amount is at least the current price.
Related task: Product-card query and seller updateProduct mutation.
```

This excerpt adds business meaning to the SDL without replacing it. Expand the same pattern to important inputs and relationships. A generated table that says only "priceBeforeMarkdown: Money" is not sufficient for the assignment.

## Assessment rubric

| Criterion | Points |
| --- | --- |
| Schema accuracy and executable operation examples | 30 |
| Clear nullability, errors, and input semantics | 20 |
| Complete purchase workflow and retry guidance | 20 |
| Pagination, permissions, and relationship descriptions | 15 |
| Navigation, writing quality, and source traceability | 10 |
| Honest testing evidence and project scope | 5 |

Review the complete model submission in the capstone area after drafting. Compare the reasoning, not just the wording. Different information architectures can work when they support the reader's task and preserve the contract.

## What the technical writer must document

Document every selected field's relevant meaning, the role needed for private operations, variables, errors, and dataset assumptions. Keep query documents and SDL together in source control. Include automated validation and execution tests where the runtime is available, and identify skipped execution checks explicitly.

## Common mistakes and corrections

**Wrong:** "GraphQL returns all fields listed in the schema."

**Correct:** "The response follows the operation's selection set, subject to execution results."

**Wrong:** "The GraphQL endpoint always returns 200."

**Correct:** "Document actual HTTP behavior for the chosen transport and inspect the data/errors envelope."

## Practical exercise

Choose three schema details that need prose beyond their SDL type and explain the missing information.

## Model answer

Money needs minor-unit and supported-currency rules. UpdateProductInput needs omission-versus-null behavior and the non-empty update rule. Product.variants needs the clarification that variants are read-only examples and checkout accepts productId, not a variant ID. None of those business meanings can be inferred reliably from the field types alone.

## Recap

A GraphQL portfolio package combines machine-readable structure with business guidance. Its strongest evidence is a set of valid, reproducible operations and precise explanations of the behaviors that type syntax alone cannot express.

## Sources and related reading

[GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [GraphQL over HTTP working draft](https://http-spec.graphql.org/draft/).

Continue to [the next lesson](#/lesson/l47).


---

# Capstone: maintain documentation through an API change

Practice impact analysis across contracts, examples, release notes, and migration guidance.

## Learning objectives

- Analyze a realistic multi-part change request
- Update all affected documentation artifacts
- Separate confirmed decisions from draft assumptions

## Prerequisites

Read [the previous lesson](#/lesson/l46), or review its recap before continuing.

## Your assignment

You are reviewing an illustrative ShopVerse API release. The change request adds a nullable estimatedDeliveryAt field to Order, deprecates an old illustrative product-price field in favor of priceBeforeMarkdown, reduces the cart quantity maximum from 99 to 50, and adds PREORDER to Availability. These are capstone proposals, not changes already enabled in the delivered live API.

Your job is to prepare a reviewable documentation change package. Do not silently modify the live examples and make the course contradict its current implementation. Keep proposed contracts and examples in a clearly labelled exercise folder until the release decisions and implementation are ready.

## Build an impact matrix

For each change, list affected REST responses, GraphQL fields or enums, input validation, tutorials, reference tables, tests, release notes, and migration guidance. Include business questions that cannot be answered from the schema diff alone. Estimated delivery needs a definition of what is estimated, timezone format, update behavior, and null meaning.

The quantity limit affects both add and update operations, not just a single field table. PREORDER affects output handling and potentially cart eligibility. Deprecation requires a replacement and removal policy. A one-line changelog cannot carry all these decisions safely.

## Classify compatibility carefully

Adding a nullable GraphQL output field does not change existing selections, but REST consumers may receive an additional property. Strict response validators may need changes. Reducing the quantity maximum breaks previously valid requests. Adding an output enum value can break exhaustive client code even though existing values remain.

Deprecation itself can be compatible while eventual removal is breaking. The exact impact of replacing a field depends on its type and semantics. Do not assume the old illustrative field used the same Money shape; the exercise source must specify that before a migration says "rename only."

## Draft the release note

A useful release note separates changes by impact:

```text
New: Order responses can expose estimatedDeliveryAt when an estimate exists.
Action required: Cart quantities must not exceed the confirmed new maximum.
Compatibility review: Availability may include PREORDER; update enum handling.
Deprecated: Use priceBeforeMarkdown instead of the documented legacy field.
```

This is a draft structure, not a publishable final note. Replace vague wording with confirmed field semantics, supported versions, rollout dates, and links. If an owner has not supplied a removal date, mark the draft's open question rather than inventing a deadline.

## Write the migration path

For the quantity change, identify where clients set or validate quantity, update their bounds, add boundary tests for 50 and 51, and decide how to handle existing carts containing larger quantities. That last decision is a product question: the service might preserve existing items until edited, reject checkout, or provide another policy. A writer should surface it explicitly.

For PREORDER, add a distinct UI state and confirm whether addCartItem and createOrder accept it. For estimatedDeliveryAt, handle null and parse the documented timestamp format. For the legacy price field, update selections, response parsing, formatting, and tests according to the confirmed replacement semantics.

## Update tests and examples together

Do not leave a tutorial example using quantity 75 after reducing the maximum. Do not add PREORDER to an enum table while tests still expect only two values. Validate proposed examples against the proposed schema, then run them against the corresponding implementation when available. Keep current-release tests separate so the exercise does not falsely report a regression in the delivered demo.

Use a before/after diff to help reviewers see the contract changes. Include a review comment for each unresolved decision and identify the owner who can answer it. This turns an ambiguous change ticket into a concrete release-readiness conversation.

## Assessment rubric

| Criterion | Points |
| --- | --- |
| Complete impact and compatibility analysis | 25 |
| Correct updated references and examples | 25 |
| Actionable migration guidance | 20 |
| Release notes and deprecation communication | 15 |
| Test plan, open questions, and review evidence | 15 |

The companion capstone provides a model impact matrix and draft submission. Its unresolved decisions are deliberately labelled; recognizing missing information is part of the assignment, not a failure to finish writing.

## What the technical writer must document

Document old and proposed behavior, affected consumers, required actions, assumptions, open decisions, rollout scope, and evidence. Separate proposed material from the live reference. Include a release checklist that prevents publication while high-impact semantics remain unknown.

## Common mistakes and corrections

**Wrong:** "All changes are additive because no endpoint was removed."

**Correct:** "A tightened business limit and new enum outputs can affect existing consumers without removing an endpoint."

**Wrong:** "Choose a reasonable removal date to complete the page."

**Correct:** "Obtain the date from the release owner and mark it as unresolved in the draft until confirmed."

## Practical exercise

Write the two most important unanswered questions about lowering the quantity maximum and adding PREORDER.

## Model answer

For the quantity limit: what happens to existing cart items above 50, and when does the new rule apply to checkout versus edits? For PREORDER: may those products be added and ordered, and what fulfillment or payment expectations must the client communicate? These decisions determine both documentation and migration tests.

## Recap

Maintenance work is contract analysis, not just wording changes. Track every affected artifact, explain consumer impact, and preserve uncertainty visibly until the responsible owners resolve it.

## Sources and related reading

[OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [HTTP semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html).

Continue to [the next lesson](#/lesson/l48).


---

# Assemble and review your API-writing portfolio

Present your work as an honest, coherent demonstration of technical writing skills.

## Learning objectives

- Package a portfolio around reader outcomes
- Explain evidence and limitations
- Plan useful next improvements

## Prerequisites

Read [the previous lesson](#/lesson/l47), or review its recap before continuing.

## Show the work and the reasoning

A portfolio should help a reviewer understand what you created, who it serves, how you checked it, and which decisions you made. It is more persuasive to show one complete workflow with accurate contracts than many screenshots of attractive but untested pages. Include the source files so the reviewer can inspect how the documentation is maintained.

Describe ShopVerse honestly as a fictional educational marketplace. Do not imply employment by Amazon or Flipkart, access to their private APIs, or authorship of their official documentation. Inspiration from familiar shopping tasks is enough to make the examples understandable without borrowing an organization's authority.

## Build a clear entry point

Your portfolio README should begin with a concise project summary, audience, scope, and the best starting page. Add installation and viewing instructions, the documentation deliverables, tests performed, and limitations. A reviewer should not need to discover an undocumented command before seeing the work.

Provide a direct reading mode as well as the full local project. Explain that the static reader supports lessons, search, quizzes, and progress, while live REST and GraphQL require the Node server and GraphQL dependencies. Do not hide this boundary behind a disabled button with no explanation.

## Demonstrate the writing lifecycle

Include a documentation plan, a sample SME questionnaire, an endpoint reference, a GraphQL operation page, a tutorial, a schema change review, release notes, and a migration guide. These artifacts show different skills: planning, interviewing, reference writing, instruction, analysis, and maintenance.

Choose a few strong examples rather than forcing every file into the main navigation. Explain what makes each example useful. For instance, the order tutorial demonstrates identifier handoffs and idempotency; the GraphQL error guide demonstrates partial data and nullability; the change capstone demonstrates compatibility analysis beyond syntax.

## Make evidence inspectable

Include commands and results for checks that actually ran. A good report distinguishes unit tests, HTTP integration tests, schema checks, browser tests, and manual review. Record skipped tests with their reason and how to run them elsewhere. Do not write "fully tested" as a substitute for a test inventory.

When a screenshot supports a design decision, identify the state shown. A desktop homepage does not prove mobile navigation works. A successful response screenshot does not prove error handling. Match each evidence item to the claim it supports and avoid turning test counts into exaggerated quality guarantees.

## Review consistency across the package

Use the same identifiers, enum values, field names, and limits everywhere. Check that a quantity maximum does not change between a lesson and an endpoint page. Verify that price amounts use the same integer-minor-unit convention. Make sure a tutorial's response selection matches its GraphQL document and that a 204 REST example has no body.

Check terminology as well as code. Authentication identifies an actor; authorization determines access. A return request is not automatically a refund. A confirmed order in this demo is not a payment. Consistent explanations prevent a reviewer from having to guess which page is authoritative.

## Explain limitations as engineering decisions

The local server uses synthetic in-memory data and fixed demo tokens. It is not designed for public production deployment, real payments, persistent storage, or customer information. Subscriptions, federation, webhook delivery, and multipart uploads are conceptual extension topics rather than advertised live features.

A limitation is not embarrassing when it is clearly scoped and consistent with the learning goal. The problem is claiming capabilities that the project does not possess. Explain why the simplified model is useful for learning and what a production system would need beyond it, without pretending to have implemented those extensions.

## Plan improvements based on reader needs

Useful next work might include observing a new learner complete the quickstart, adding a missing recovery example, improving keyboard focus, or validating the contract with an additional independent tool. Prioritize evidence-backed gaps over decorative features. More animation does not fix an unclear idempotency rule.

Export your learning progress and notes before moving browsers or resetting storage. Save your capstone drafts outside localStorage as source files. The course's progress tracker supports practice, but a portfolio should be versioned and backed up in a repository or another reliable storage location.

## What the technical writer must document

Document authorship, audience, scope, deliverables, setup, validation, limitations, and how to report issues. Identify external standards and third-party tools accurately. Include a readable license and avoid shipping credentials, private data, or unrelated files.

## Common mistakes and corrections

**Wrong:** "Production-ready Amazon API documentation platform."

**Correct:** "An educational API-writing project using a fictional marketplace, with local REST and GraphQL examples."

**Wrong:** "Everything works" without reproducible evidence.

**Correct:** "List the tested workflows, results, and any checks that were not executable in the build environment."

## Practical exercise

Write a three-sentence portfolio introduction that explains the project, your deliverables, and its scope without overstating affiliation or readiness.

## Model answer

"API Documentation Academy is a self-study technical writing project built around ShopVerse, a fictional e-commerce marketplace. It includes REST and GraphQL references, an OpenAPI description, tutorials, error guidance, exercises, and documentation-maintenance capstones. The included server uses synthetic in-memory data for local learning and is not an official marketplace API or a production commerce system."

## Recap

Present a coherent story: a real reader task, accurate documentation, maintainable source, and visible evidence. Honest scope and thoughtful review make a portfolio stronger than inflated claims.

## Sources and related reading

[Official Git documentation](https://git-scm.com/doc); [OpenAPI 3.1.1 specification](https://spec.openapis.org/oas/v3.1.1.html); [GraphQL October 2021 baseline](https://spec.graphql.org/October2021/) and [GraphQL specification editions](https://spec.graphql.org/); [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Return to [your learning dashboard](#/workspace) and export your progress.
