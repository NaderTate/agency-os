---
description: Render the whole agency pipeline, every deal, stage, next action, pipeline value, and signed MRR.
---

# /status

The agency at a glance, computed live from the client files.

## Procedure

1. Glob `clients/*.md` and read each one **except `_template.md`**. Parse the fenced `meta` block at the top of each (name, stage, vertical, deal_value, deal_mrr, next_action, and `team:` if present).
2. **Compute the pipeline numbers** (state them, don't hand-wave):
   - **Open pipeline value** = sum of `deal_value` for every client whose stage is `lead`, `researching`, `proposal-sent`, or `call-booked`.
   - **Signed MRR** = sum of `deal_mrr` for every client whose stage is `won` or `delivering`.
   - **Annualized signed** = Signed MRR × 12 (one-line aside).
   - Exclude any client with stage `lost` from both totals.
3. **Compute margin** (only for `won` + `delivering` clients, the ones generating revenue). For each, read the `team:` field (`slug:hours_per_week` entries), look up each member's `rate` in `team/<slug>.md`, and:
   - **Monthly team cost** = Σ (`rate` × `hours_per_week` × 4). (4 weeks/month, a deliberate simplification for clean math.)
   - **Client margin** = `deal_mrr` − monthly team cost.
   - **Agency net margin** = total Signed MRR − total monthly team cost across those clients.
   - If a client has no `team:` assignments, its cost is $0 (so margin = full MRR) until you `/assign` someone.
4. **Compute AR (accounts receivable)**, if `finance/invoices.md` exists. Read the ledger. Bucket as in `/invoices`: outstanding = `status: sent`; overdue subset = `status: sent` AND `due < today`. Sum each. Surface as a one-line AR summary on the dashboard. The full breakdown is what `/invoices` prints.
5. **Render the board**, grouped by stage in pipeline order (`lead → researching → proposal-sent → call-booked → won → delivering`, then `lost` last if any). For each client show one line: `Business (vertical): $value setup / $mrr per mo. Next: <next_action>`.
6. **Surface the focus:** below the board, list the 1-3 most urgent next actions (deals furthest along the funnel first, a `call-booked` follow-up outranks a fresh `lead`). If any invoices are overdue, the top action should be to chase them.
7. Keep it to one screen. This is the cold-open shot and the closing shot of the walkthrough, so it must be clean and instantly legible.

## Output format (illustrative: the shape after importing the sample `clients.csv`)

The repo ships with one pre-seeded delivering client (Brookside Animal Hospital, $1,000/mo MRR). So a fresh `/status` shows just Brookside under DELIVERING. After `/import clients.csv` the board looks like this:

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
  Brookside Animal Hospital (Veterinary): $5,000 / $1,000 mo. Next: Ship outbound vaccination reminders from staging to production.
  Citywide HVAC (Home services): $5,000 / $1,000 mo. Next: Ship the current milestone.

WON
  Peak Performance PT (Physical therapy): $2,500 / $500 mo. Next: Kick off the build.

LOST
  Crestview Realty Partners (Real estate): $0 / $0 mo. (closed lost)

──────────────────────────────
Open pipeline value:  $11,500     (lead + researching + proposal-sent + call-booked)
Signed MRR:           $2,500 /mo   (~$30,000/yr)   (won + delivering)

MARGIN (won + delivering)
  Brookside Animal Hospital:  $1,000 mo - $520 cost = $480 margin (48%)   [maya-chen 2h]
  Citywide HVAC:              $1,000 mo - $520 cost = $480 margin (48%)   [maya-chen 2h]
  Peak Performance PT:        $500 mo - $280 cost = $220 margin (44%)     [priya-nair 2h]
  ──────
  Net margin:                 $2,500 mo - $1,320 cost = $1,180 /mo (47%)

AR
  Outstanding: $1,500   Overdue: $500 (1 invoice)   → /invoices

DO NEXT
  1. Chase INV-003 (Peak Performance PT, $500, 12 days late).
  2. Harbor Family Law: run the discovery call.
  3. Summit Dental Group: follow up on the proposal.
```

(The MARGIN block above assumes you've staffed Citywide + Peak via `/assign` (Brookside is already staffed in the pre-seed). Before any `/assign`, team cost is $0 and margin equals full MRR. The AR line is from `finance/invoices.md`; if the ledger doesn't exist yet, omit that section. After you `/intake` a new lead, its `deal_value` joins the open pipeline total, so the number moves the moment a lead enters the system.)
