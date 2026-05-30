# Goals & KPIs: Aether AI

> Where the agency is headed and how we measure it. Read every session by Claude (auto-prime) so suggestions are anchored to the strategy, not generic advice. Edit quarterly.

## North star

**$15,000/mo signed MRR by end of Q4 2026.** Current: $1,500/mo (per `/status`). The gap is the work.

## This year (2026)

- Reach the $15k/mo MRR target above.
- 10 active delivering clients across 2-3 named verticals.
- Net margin 50% or better on recurring (per `/status` margin).
- Make AgencyOS itself a cloneable artifact (this repo) used by other agency operators.

## This quarter

- 3 new signed clients (move from $1,500/mo to ~$5,000/mo).
- Ship monthly recurring billing automation in `/invoice`.
- Add the daily brief layer (`/brief`).
- Stress-test one new vertical end to end (likely law or auto).

## KPIs the OS tracks

| KPI | Why it matters | Target |
| --- | --- | --- |
| **Signed MRR** | The north star. From `/status`. | $15k/mo by Q4 |
| **Net margin %** | Profit per recurring client. From `/status` margin. | 50%+ |
| **Open pipeline value** | Forward leading indicator. From `/status`. | 3x quarterly MRR target |
| **Pipeline-to-close rate** | % of `proposal-sent` that becomes `won`. | 30%+ |
| **AR outstanding** | Cash not yet collected. From `/invoices`. | < 1.5x monthly MRR |
| **AR overdue** | Cash already late. From `/invoices`. | $0 |
| **Team utilization** | Are people loaded or on the bench? From `/team`. | 60-80% (room to scale) |
| **Away-from-desk autonomy** | % of work doable from phone via Telegram. | 80% |
| **Task automation %** | % of recurring tasks handled by the OS. | 60-70% |
| **Revenue per employee** | Total revenue ÷ headcount (FTE-equivalent for contractors). | Rising every quarter |

The first 7 are computed live from the repo. The last 3 are operator-judged and reviewed monthly.

## How to use this file

- When you ask "what should I do this week?" or "how am I tracking?", Claude compares the live numbers (pipeline, MRR, margin, AR, utilization) against the targets here and suggests the next move.
- Update the quarter section at the start of each quarter. Update the north star whenever the strategy actually changes, not monthly.
