---
description: Render the whole agency pipeline, every deal, stage, next action, pipeline value, and signed MRR.
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
3. **Render the board**, grouped by stage in pipeline order (`lead → researching → proposal-sent → call-booked → won → delivering`, then `lost` last if any). For each client show one line: `Business (vertical): $value setup / $mrr per mo. Next: <next_action>`.
4. **Surface the focus:** below the board, list the 1-3 most urgent next actions (deals furthest along the funnel first, a `call-booked` follow-up outranks a fresh `lead`).
5. Keep it to one screen. This is the cold-open shot and the closing shot of the walkthrough, so it must be clean and instantly legible.

## Output format (illustrative: the shape after importing the sample `clients.csv`)

The repo ships with an empty `clients/` folder, so a fresh `/status` shows an empty pipeline ($0). After `/import clients.csv` the board looks like this:

```
AETHER AI / PIPELINE

LEAD
  Glow Aesthetics (Med spa): $2,500 / $500 mo. Next: Research the business, then send a proposal.
  Bella Vita Salon (Salon): $1,500 / $0 mo. Next: Research the business, then send a proposal.

PROPOSAL-SENT
  Summit Dental Group (Dental): $2,500 / $500 mo. Next: Follow up / book the discovery call.

CALL-BOOKED
  Harbor Family Law (Law): $5,000 / $1,000 mo. Next: Run the discovery call.

DELIVERING
  Citywide HVAC (Home services): $5,000 / $1,000 mo. Next: Ship the current milestone.

WON
  Peak Performance PT (Physical therapy): $2,500 / $500 mo. Next: Kick off the build.

LOST
  Crestview Realty Partners (Real estate): $0 / $0 mo. (closed lost)

──────────────────────────────
Open pipeline value:  $11,500     (lead + researching + proposal-sent + call-booked)
Signed MRR:           $1,500 /mo   (~$18,000/yr)   (won + delivering)

DO NEXT
  1. Harbor Family Law: run the discovery call.
  2. Summit Dental Group: follow up on the proposal.
  3. Glow Aesthetics: research + propose.
```

(After you `/intake` a new lead, its `deal_value` is added to the open pipeline total, so the number moves the moment a lead enters the system.)
