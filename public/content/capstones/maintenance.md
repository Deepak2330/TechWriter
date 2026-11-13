# Documentation maintenance capstone

## Business brief

Review an illustrative next ShopVerse release. The proposal adds nullable estimatedDeliveryAt to Order, deprecates an illustrative legacy originalPrice field in favor of priceBeforeMarkdown, reduces cart quantity maximum from 99 to 50, and adds PREORDER to Availability. These changes are not enabled in the current live demo. Keep proposed artifacts separate from current contracts.

## Source packet

Current Order has no estimatedDeliveryAt. Current quantities accept 1-99. Availability currently has IN_STOCK and OUT_OF_STOCK. The legacy originalPrice field is an exercise-only historical assumption: for this assignment, assume it used the same Money shape and null semantics as priceBeforeMarkdown. The release owner has not supplied rollout/removal dates, existing-cart handling, or preorder purchasing rules.

## Deliverables

Submit an impact matrix, proposed field descriptions and schema fragments, release-note draft, migration guide, test plan, SME review comments, and release-readiness checklist. Explicitly distinguish confirmed exercise facts from open decisions. Do not invent dates or claim the proposed operations were executed against the current server.

## Assessment rubric

| Criterion | Points |
| --- | --- |
| Impact and compatibility analysis | 25 |
| Correct proposed references and examples | 25 |
| Actionable migration guide | 20 |
| Release and deprecation communication | 15 |
| Tests, questions, and readiness evidence | 15 |

## Model answer

### Change impact matrix

| Change | Consumer impact | Artifacts to update | Decision still needed |
| --- | --- | --- | --- |
| estimatedDeliveryAt: DateTime | GraphQL opt-in; REST extra nullable property may affect strict readers. | Order schemas, field tables, order examples, tracking guide. | Meaning of estimate, update cadence, null semantics, supported versions. |
| originalPrice deprecation | Existing use continues until removal; replacement selection and parser changes needed. | Legacy field description, migration examples, release notes, tests. | Deprecation and removal dates. |
| Quantity maximum 50 | Previously valid values 51-99 become invalid. | REST/GraphQL inputs, business validators, tutorials, quizzes, boundary tests. | Existing carts and checkout enforcement during rollout. |
| PREORDER output value | Exhaustive consumers and unsafe unknown-value fallbacks may fail. | Enum descriptions, product examples, cart rules, UI guidance. | Add/order eligibility and fulfillment expectations. |

### Proposed field descriptions

Order.estimatedDeliveryAt is a nullable UTC timestamp estimate for delivery. This sentence remains a draft until the owner confirms whether it refers to initial estimated delivery, the latest estimate, or another event. The final description must explain null, update behavior, and that an estimate is not a guarantee. Do not imply shipment tracking exists for every new order.

The illustrative originalPrice deprecation reason can say: "Use priceBeforeMarkdown. Both fields use Money with the same null semantics in this exercise. Update selections and client field access before the confirmed removal date." Do not publish an unconfirmed date.

Quantity becomes an integer from 1 through 50 in the proposed release. This is a business constraint even though GraphQL still uses Int. PREORDER is a distinct availability state; its cart and order behavior remains a blocking question rather than a guessed rule.

### Proposed schema fragments

```graphql
# Illustrative future fragment; not the shipped live schema.
type Order {
  id: ID!
  estimatedDeliveryAt: DateTime
}
```

```json
{
  "quantity": {"type":"integer","minimum":1,"maximum":50}
}
```

These are fragments, not complete standalone API descriptions. Merge them into a separately versioned proposed contract for full validation. Do not overwrite the current contract while the server still enforces 99.

### Release-note draft

New: Order documentation adds estimatedDeliveryAt when a delivery estimate is available, subject to the confirmed null and update policy. GraphQL consumers opt in by selecting the field; REST consumers should allow the documented additional property.

Action required: The proposed cart quantity maximum is 50. Update client validation and boundary tests before the confirmed rollout. Handling of existing cart items above 50 must be finalized before this note is published.

Compatibility review: Availability can return PREORDER in the proposed release. Update exhaustive enum handling and provide a distinct UI state. Do not treat every unrecognized value as IN_STOCK.

Deprecated: The exercise-only originalPrice field is superseded by priceBeforeMarkdown. The replacement has the same Money shape for this assignment. Removal timing is pending release-owner confirmation.

### Migration steps

First inventory consumers: search query documents, REST response parsers, generated models, UI switches, validation constants, tutorials, and tests. Record which operations accept quantity and which pages render availability or original price.

Second update quantity validation to 50 in clients targeting the new release. Add valid boundary tests at 1 and 50 and invalid tests at 0 and 51. Do not silently truncate a customer's quantity without a product decision. Determine what to do with existing carts containing larger values before rollout.

Third add explicit PREORDER handling and a safe unknown-value fallback consistent with the product's policy. Confirm whether addCartItem and createOrder accept it. A UI label alone is insufficient when ordering semantics differ.

Fourth replace originalPrice selections and parser access with priceBeforeMarkdown. Because the exercise defines the same Money shape, retain minor-unit conversion and null handling. Test both a product with an original price and a product with null.

Fifth add estimatedDeliveryAt only after its meaning is approved. Handle null without displaying an invalid date. Parse the documented canonical UTC format and choose an explicit presentation timezone for the reader-facing interface. Do not label the value as a guaranteed arrival date.

### Before-and-after GraphQL example

```graphql
# Illustrative old selection.
query OldCard { product(id:"prod_1001") { name originalPrice { amountMinor currency } } }
```

```graphql
# Replacement exists in the current demo.
query NewCard { product(id:"prod_1001") { name priceBeforeMarkdown { amountMinor currency } } }
```

The old query is not executable against the current demo because originalPrice is only an exercise assumption. Label it accordingly; otherwise a learner may mistake a validation failure for a server defect.

### SME review comments

For the order owner: define which delivery event the estimate describes, whether it can move earlier or later, and when null is returned. For the cart owner: confirm whether existing quantities above 50 are grandfathered, rejected at checkout, or require user action. For the catalogue owner: confirm preorder add/order behavior and fulfillment expectations. For the release owner: supply supported API versions, rollout scope, deprecation date, and removal policy.

Each question blocks a specific publication claim. Assign ownership and record decisions rather than hiding uncertainty in vague prose such as "may behave differently."

### Test plan

Validate proposed OpenAPI and SDL separately from current artifacts. Update operation examples and verify every selected field. Test quantity boundaries, legacy/replacement price selections during the support window, null delivery estimates, and all availability states. Run both old-client and new-client compatibility checks where relevant. Preserve current-release tests until the actual rollout is complete.

No current-server test can prove that PREORDER or estimatedDeliveryAt works because those changes are not implemented here. The evidence report must state this and identify the target implementation needed for execution.

### Release-readiness checklist

Confirm all semantic decisions, version scope, and dates. Update contracts, reference prose, tutorials, downloads, generated clients where applicable, release notes, and migration steps. Execute representative examples against the target release. Obtain engineering and product review, then publish in sync with the rollout. Keep a rollback plan for documentation and an owner for post-release feedback.

### Portfolio statement

This capstone demonstrates documentation change analysis using a fictional proposal. It shows how business limits and enum evolution can affect consumers even when operation names remain unchanged. Open decisions are deliberately visible and are not presented as completed implementation work.

## Final review

Check that every proposed behavior is labelled, every migration action maps to a consumer impact, and every remaining question has an owner. A complete analysis can honestly identify a publication blocker without inventing its answer.
