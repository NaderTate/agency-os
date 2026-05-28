---
description: Import existing clients from a CSV export (or a connected CRM) into the markdown CRM. One-time onboarding.
---

# /import

For agencies that aren't starting from scratch: lift an existing client list into AgencyOS in one pass. The CRM becomes a seed, not a dependency, once imported, you operate here.

**Source:** $ARGUMENTS (a path to a CSV export; defaults to `clients.csv` in the repo root if nothing is given)

## Procedure

1. Read the CSV (or, if the user pointed at a connected CRM like Notion/HubSpot instead of a file, pull the client list from that connector). If the file/source doesn't exist, stop and say so.
2. Read `services.md` so you can map services to prices and fill gaps.
3. **Map each row to a client file**, being flexible about column names (real exports vary):
   - **Business name** → `name` + a derived `slug` (lowercase, hyphenated).
   - **Stage** → map their stage label to ours. Common mappings:
     - new / contacted / inbound → `lead`
     - qualified / researching → `researching`
     - proposal / quote sent → `proposal-sent`
     - meeting booked / call scheduled → `call-booked`
     - closed won / signed → `won`
     - onboarding / active / in progress → `delivering`
     - closed lost / dead → `lost`
     - anything unrecognized → `lead` (and note it).
   - **Service** → match to a `services.md` offering (default "AI receptionist" if absent).
   - **Deal value / MRR** → use the CSV's setup + monthly columns if present; otherwise infer from the matched service. Use `0` where unknown.
   - **Contact name / email / source** → carry over; leave `(unknown yet)` if blank.
   - **`recording` column (optional)** → if the CSV has a `recording` column with a non-empty path, set the client's `meta` `recording:` field to it. This is how `/clickup` later picks up a meeting transcript to derive extra tasks from.
   - `next_action` → a sensible default for the mapped stage (e.g. a `lead` → "Research the business, then send a proposal.").
4. Create `clients/<slug>.md` per row using the structure of `clients/_template.md`. In each body, add a one-line note: "Imported from <source file> on <date>."
5. **Never overwrite.** If a client file with that slug already exists, skip it and report it as a duplicate.
6. Do NOT fabricate research or proposals for imported clients, they come in at their stage with the data the CSV had. Run `/research` and `/proposal` on them as normal afterward.

## Output

Report: how many clients imported, how many skipped as duplicates, and the new pipeline totals. Then suggest running `/status` to see the full book.
