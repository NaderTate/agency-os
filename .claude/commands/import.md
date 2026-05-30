---
description: One-time onboarding. Import clients or team members from a CSV (or a connected CRM). Auto-merges any matching sidecar in data/onboarding/ for rich content.
---

# /import

For agencies that aren't starting from scratch: lift an existing list (clients OR team members) into AgencyOS in one pass.

**Source:** $ARGUMENTS (a CSV path; defaults to `data/clients.csv` if nothing is given)

## Procedure

1. **Read the CSV.** If the path doesn't exist, stop and say so.
2. **Detect the type** from the header row:
   - If it contains `business` (or `client`, `company`) → **clients import**, target dir is `data/clients/`.
   - If it contains `name` plus `role` plus `rate` → **team import**, target dir is `data/team/`.
   - Ambiguous → ask the user which.
3. Read `context/services.md` if it's a clients import (for service-to-price mapping + sensible defaults).
4. **For each row**, build the file:

   ### Clients import
   - **Business name** → also derive a **slug** (lowercase, hyphenated, no punctuation).
   - **Stage** → map their label to ours. Common mappings:
     - new / contacted / inbound → `lead`
     - qualified / researching → `researching`
     - proposal / quote sent → `proposal-sent`
     - meeting booked / call scheduled → `call-booked`
     - delivering / onboarding / active / in progress → `delivering`
     - closed won / signed → `won`
     - closed lost / dead → `lost`
     - anything unrecognized → `lead` (and note it).
   - **Service** → match to a `context/services.md` offering (default "AI receptionist" if absent).
   - **Deal value / MRR** → CSV's `setup_fee` + `monthly` columns if present, otherwise infer from the matched service.
   - **Contact name / email / source** → carry over; leave `(unknown yet)` if blank.
   - **Optional columns** (if present in the header, carry into `meta` straight): `recording`, `team`, `repo`, `clickup_list`.
   - `next_action` → a sensible default for the mapped stage.

   ### Team import
   - **Name** → derive slug (lowercase, hyphenated).
   - **Role, status, rate, capacity, skills** → into the team `meta` block.
   - If `status` is blank, default to `active`.

5. **Sidecar merge (this is what makes the data rich).** After computing the meta, check whether a sidecar exists at `data/onboarding/<type>/<slug>.md` (e.g. `data/onboarding/clients/brookside-animal-hospital.md` or `data/onboarding/team/maya-chen.md`). If yes, use the **sidecar's full content as the file body** (everything below the `meta` block). If no sidecar, generate a minimal body:
   - For clients: a one-line "Imported from `<source>` on `<date>`." note.
   - For team: a one-line "Imported from `<source>` on `<date>`." note.
6. **Write the file** to the target dir: `data/clients/<slug>.md` or `data/team/<slug>.md`. Each file has the fenced ` ```meta ` block on top, then the body.
7. **Never overwrite.** If a file with that slug already exists, skip it and report it as a duplicate.
8. Do NOT fabricate research or proposals for imported clients beyond what the sidecar provides. Sidecars are factual seed content; everything else comes from `/research`, `/proposal`, etc.

## Output

Report: type (clients or team), how many imported, how many had a sidecar merged, how many skipped as duplicates, and (for clients) the new pipeline totals. Suggest `/status` (clients) or `/team` (team) to see the result.

## Notes

- The sidecar pattern keeps spreadsheets feeling like spreadsheets (basic data) while still letting `/progress` and `/performance` show real depth. Edit the sidecar files in `data/onboarding/` to change what gets merged.
- Sidecars are optional. A CSV-only import is fine; you'll just get the meta block + a one-line note. You can add a sidecar later and re-import, but since "never overwrite" applies, you'd need to delete the existing file first.
