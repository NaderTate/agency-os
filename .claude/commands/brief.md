---
description: Your morning brief. Synthesizes the whole agency into one page: pipeline movement, AR, what to chase today, anchored to context/goals.md.
---

# /brief

The single most-valuable view of the agency. Run it first thing in the morning (or schedule it). One screen, no scrolling.

## Procedure

1. **Read the context layer** (you already have it from auto-prime, but re-read if hours have passed): `context/business.md`, `context/goals.md`, `context/services.md`. Pull the **north star** and **this-quarter targets** from `context/goals.md`.
2. **Read the live layer:** `data/clients/*.md` (skip `_template.md`), `data/team/*.md`, and `data/finance/invoices.md` if it exists.
3. **Compute the numbers** the brief will reference (mirror `/status` + `/invoices` + `/team`):
   - Open pipeline value; Signed MRR; net margin (with team cost); free team capacity; outstanding + overdue AR.
   - **Movement since yesterday:** new clients (`created` field = yesterday), stage changes (look at last timeline entries dated yesterday/today), invoices paid/created yesterday. If you can't reliably detect "yesterday's changes," say so and skip that sub-bullet rather than fabricate.
4. **Anchor to `context/goals.md`:** for MRR show "$X vs $Y north star (Z% there)." For margin show "X% vs target." For AR show "$X outstanding vs <1.5x MRR target." For pipeline show "$X open vs 3x quarterly target." Call out any KPI that's red.
5. **Decide today's 3 actions.** Priority order:
   1. Overdue invoices to chase (top priority, every time).
   2. `call-booked` deals: the discovery call to run today, or follow up if the call already happened.
   3. `proposal-sent` deals stale > 3 days: nudge them.
   4. `lead`/`researching` with no activity > 2 days: research or propose.
   5. Anything from `context/goals.md` "top bets" that hasn't moved in a week.
   Don't pad to 3 if there are only 2 real things. Don't recommend a step that's already complete.
6. **Compose the brief** in the format below. Keep it tight, no preamble, no emoji.

## Output format (illustrative)

```
AETHER AI / DAILY BRIEF, 2026-05-28

NUMBERS
  Signed MRR:    $1,500 /mo   (10% of $15k north star)
  Net margin:    $700 /mo (47%, on target)
  Open pipeline: $11,500       (76% of quarterly 3x target)
  AR:            $1,500 outstanding, $500 overdue ← chase
  Team:          75 hrs/wk capacity, 4 assigned (5% loaded, lots of room)

MOVEMENT (since yesterday)
  - INV-005 issued to Citywide HVAC ($1,000, due 2026-05-30).
  - Coastal Law moved call-booked → discovery call scheduled Thursday.
  - No new leads.

TODAY (top 3)
  1. Chase INV-003 (Peak Performance PT, $500, 12 days late). Use /remind INV-003.
  2. Run the Coastal Law discovery call at 11:00am.
  3. Follow up on the Lumen Med Spa proposal, 6 days since sent.

NOTE
  Team utilization is 5%. Per context/goals.md, you're far below the 60-80%
  utilization target, that means you have room to take 2-3 more
  delivering clients before you need to hire. Pipeline is healthy
  enough to convert.
```

## Notes

- "Movement since yesterday" depends on date stamps in client timelines and invoice `issued`/`paid_on`. If a client file doesn't have dated timeline entries, the movement section may be sparse, that's honest, not a bug.
- This command does NOT modify any files. It's read-only.
- For an evening recap, the user can say "give me the day's brief" or "wrap up today", same logic.
