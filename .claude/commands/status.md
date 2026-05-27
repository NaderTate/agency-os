---
description: Render the whole agency pipeline — every deal, stage, next action, pipeline value, and signed MRR.
---

# /status

The agency at a glance, computed live from the client files.

## Procedure

1. Glob `clients/*.md` and read each one **except `_template.md`**. Parse the fenced `meta` block at the top of each (name, stage, vertical, deal_value, deal_mrr, next_action).
2. **Compute the numbers** (state them, don't hand-wave):
   - **Open pipeline value** = sum of `deal_value` for every client whose stage is `lead`, `researching`, `proposal-sent`, or `call-booked`.
   - **Signed MRR** = sum of `deal_mrr` for every client whose stage is `won` or `delivering`.
   - **Annualized signed** = Signed MRR × 12 (one-line aside).
   - Exclude any client with stage `lost` from both totals.
3. **Render the board**, grouped by stage in pipeline order (`lead → researching → proposal-sent → call-booked → won → delivering`, then `lost` last if any). For each client show one line: `Business — vertical — $value setup / $mrr per mo — next: <next_action>`.
4. **Surface the focus:** below the board, list the 1–3 most urgent next actions (deals furthest along the funnel first — a `call-booked` follow-up outranks a fresh `lead`).
5. Keep it to one screen. This is the cold-open shot and the closing shot of the walkthrough, so it must be clean and instantly legible.

## Output format (this is the shape; numbers below match the shipped seed)

```
AETHER AI — PIPELINE

LEAD
  Northside Chiropractic — Chiropractic — $2,500 / $500 mo — next: Research the practice, then send a proposal.

PROPOSAL-SENT
  Lumen Med Spa — Med spa — $2,500 / $500 mo — next: Follow up / book the discovery call.

CALL-BOOKED
  Coastal Law — Law — $5,000 / $1,000 mo — next: Run the discovery call.

DELIVERING
  Apex Auto Repair — Auto — $5,000 / $1,000 mo — next: Ship the week-2 milestone (booking + status-update flows live).

WON
  Verde Landscaping — Home services — $2,500 / $500 mo — next: Kick off the build (provision number, seed schedule, go live).

──────────────────────────────
Open pipeline value:  $10,000     (lead + researching + proposal-sent + call-booked)
Signed MRR:           $1,500 /mo   (~$18,000/yr)   (won + delivering)

DO NEXT
  1. Coastal Law — run the discovery call.
  2. Lumen Med Spa — follow up on the proposal.
  3. Northside Chiropractic — research + propose.
```

(After you `/intake` a new lead, that deal's `deal_value` is added to the open pipeline total — so the number you see here moves the moment a lead enters the system.)
