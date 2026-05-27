---
description: Web-research a prospect and append findings + a tailored angle to their client file.
---

# /research

Research the prospect so the proposal is specific to their business, not generic.

**Client slug:** $ARGUMENTS

## Procedure

1. Read `clients/<slug>.md`. If it doesn't exist, stop and say so.
2. Run **real web search** on the business (use the business name + vertical + any location signal). Look for:
   - What they actually do + the services they offer.
   - Size signals (number of locations, team size, years in business).
   - How they handle inbound now (online booking? a phone number front and center? "call us" with no form?).
   - Reputation signals (review volume/rating) — only if you can actually find them.
   - The specific pain an AI receptionist / automation would solve for *this* business.
3. **Ground every claim.** Cite what you found (site, directory, reviews). If something can't be confirmed, write "couldn't confirm" rather than guessing. Never invent addresses, phone numbers, ratings, or owner names.
4. Append a `## Research (<date>)` section to the client file with:
   - 3–5 bullet findings.
   - A short **Angle** paragraph: the one sentence of pain that becomes the proposal's opening, tied to the service they're interested in.
5. Update the `meta` block: `stage: researching`, and set `next_action: Send a proposal.`

## Output

Summarize the findings in 3–4 lines and state the angle you'll lead the proposal with. Suggest `/proposal <slug>`.
