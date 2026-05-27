---
description: Draft a scoped, priced proposal for a client into outputs/proposals/.
---

# /proposal

Generate a proposal the prospect could actually receive. Specific, priced, in the agency voice.

**Client slug:** $ARGUMENTS

## Procedure

1. Read `clients/<slug>.md` (including the `## Research` section) and `services.md`.
2. If there's no research yet, run `/research <slug>` first (or tell the user to) — a proposal without research is generic and weak.
3. Match the client's interest to a named tier in `services.md`. Price from the catalog; present **setup and monthly separately**. Only go custom if the scope spans two tiers, and itemize the delta.
4. Write the proposal to `outputs/proposals/<slug>.md` with these sections:
   - **Title** — `Proposal: <Service> for <Business>` + the date.
   - **The problem** — open with the researched angle, in their terms and their dollars. One short paragraph.
   - **What we'll build** — the solution in plain business language (what it does for them), not a tech-stack dump. 3–5 bullets.
   - **Scope** — what's included; what's explicitly out of scope.
   - **Timeline** — realistic (e.g. discovery → build → go-live over 2–3 weeks).
   - **Investment** — setup price, then monthly, each on its own line. A one-line ROI anchor using **example** math (label it "example") tied to their business.
   - **Next step** — book the discovery call (service 1) unless the deal is already past it.
5. Update the client `meta`: `stage: proposal-sent`, confirm/adjust `deal_value` + `deal_mrr` to the proposed numbers, and set `next_action: Follow up / book the discovery call.`
6. Add a one-line entry to the client file's timeline noting the proposal was generated (with the date).

## Output

State the proposed tier, the setup + monthly numbers, and the path to the generated file. Suggest `/kickoff <slug>`.
