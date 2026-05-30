---
description: Turn a raw lead blurb into a structured client file under data/clients/.
---

# /intake

Capture a new lead into the CRM. The argument is a freeform blurb describing the lead.

**Lead blurb:** $ARGUMENTS

## Procedure

1. Read `context/services.md` so you can map the lead's interest to a real service + price.
2. Extract from the blurb (infer what's reasonable; mark unknowns as `(unknown yet)`):
   - **Business name** → also derive a **slug** (lowercase, words joined by hyphens, no punctuation; e.g. "Bright Now Dental" → `bright-now-dental`).
   - **Vertical** (Dental, Med spa, Law, Home services, Auto, etc.).
   - **Service interest** (match to a `context/services.md` offering; default to "AI receptionist" if they describe missed calls / front-desk pain).
   - **Source** (YouTube, referral, cold inbound, etc.).
   - **Contact name / email** if present.
3. Set the deal numbers from the matched service in `context/services.md`:
   - `deal_value` = the setup price (use the low end of a range).
   - `deal_mrr` = the monthly price (0 if the service has none).
4. Create `data/clients/<slug>.md` by copying the structure of `data/clients/_template.md` and filling the `meta` block:
   - `stage: lead`
   - `next_action: Research the business, then send a proposal.`
   - `created:` today's date (YYYY-MM-DD).
5. In the body, write a one-line **Lead note** capturing the raw blurb and the date.
6. If a file with that slug already exists, stop and say so, don't overwrite.

## Output

Confirm in one or two lines: the business name, vertical, matched service + price, and the slug. Then suggest the next command: `/research <slug>`.
