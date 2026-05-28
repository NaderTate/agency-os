# Invoices

The agency's accounts-receivable ledger. One row per invoice. `/invoices` reads this file and computes outstanding, overdue (derived from `due` + `status`), and aging on demand.

## Format

| Column | Notes |
| --- | --- |
| `id` | `INV-NNN`, monotonically increasing. |
| `client` | Display name of the client (matches `clients/<slug>.md` once they exist). |
| `amount` | USD, integer (no commas in the cell, the command formats them). |
| `for` | What it's for: `Setup`, `April support`, `May support`, etc. |
| `issued` | YYYY-MM-DD. |
| `due` | YYYY-MM-DD. Overdue is **derived** from `due < today` + `status: sent`. |
| `status` | `draft`, `sent`, or `paid`. Never `overdue` (computed, not stored). |
| `paid_on` | YYYY-MM-DD when paid, else blank. |

## Ledger

| id      | client                | amount | for             | issued     | due        | status | paid_on    |
| ------- | --------------------- | ------ | --------------- | ---------- | ---------- | ------ | ---------- |
| INV-001 | Peak Performance PT   | 2500   | Setup           | 2026-04-18 | 2026-05-03 | paid   | 2026-04-30 |
| INV-002 | Peak Performance PT   | 500    | April support   | 2026-04-20 | 2026-05-05 | paid   | 2026-05-04 |
| INV-003 | Peak Performance PT   | 500    | May support     | 2026-05-01 | 2026-05-16 | sent   |            |
| INV-004 | Citywide HVAC         | 5000   | Setup           | 2026-05-01 | 2026-05-16 | paid   | 2026-05-12 |
| INV-005 | Citywide HVAC         | 1000   | May support     | 2026-05-15 | 2026-05-30 | sent   |            |
| INV-006 | Summit Dental Group   | 2500   | Setup (deposit) | 2026-05-27 |            | draft  |            |

(The clients above match the ones in `clients.csv`, so after you `/import` everything lines up. Drafts are invoices you haven't sent yet, no `due` date until you do.)
