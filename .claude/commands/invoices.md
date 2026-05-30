---
description: Show accounts receivable: what's outstanding, what's overdue, what's due soon, drafts.
---

# /invoices

Who owes you money, what's late, and what's coming due. All computed from `data/finance/invoices.md`.

## Procedure

1. Read `data/finance/invoices.md` and parse every row of the ledger table (`id, client, amount, for, issued, due, status, paid_on`). If the ledger doesn't exist yet, say so and suggest creating the first invoice with `/invoice <client>`.
2. Use **today's date** for all derivations. Never trust a stored "overdue" status, the source of truth is `status` + `due`.
3. **Bucket the rows:**
   - **Overdue** = `status: sent` AND `due` is before today. Compute `days_late = today - due`.
   - **Due soon** = `status: sent` AND `due` is today or later. Compute `days_until = due - today`.
   - **Drafts** = `status: draft`.
   - **Recently paid** = `status: paid`, sorted by `paid_on` desc, keep the latest 3-5.
4. **Compute totals:**
   - **Outstanding** = sum of `amount` over Overdue + Due soon.
   - **Overdue** = sum over Overdue only.
5. **Render** in this order, kept to one screen:
   - Header line with Outstanding total + Overdue total (call out overdue, that's the chase list).
   - **OVERDUE** section, sorted most-late first: `id  client  $amount  for  due YYYY-MM-DD  (N days late)`.
   - **DUE SOON** section, sorted soonest first: `id  client  $amount  for  due YYYY-MM-DD  (in N days)`.
   - **DRAFTS** (if any): `id  client  $amount  for  (not yet sent)`.
   - **RECENTLY PAID** (latest 3-5): `id  client  $amount  paid YYYY-MM-DD`.

## Output format (illustrative, against the shipped sample ledger, today = 2026-05-28)

```
AETHER AI / INVOICES

OUTSTANDING: $1,500   OVERDUE: $500 (1 invoice)  ← chase

OVERDUE
  INV-003  Peak Performance PT   $500   May support      due 2026-05-16  (12 days late)

DUE SOON
  INV-005  Citywide HVAC       $1,000   May support      due 2026-05-30  (in 2 days)

DRAFTS
  INV-006  Summit Dental Group $2,500   Setup (deposit)  (not yet sent)

RECENTLY PAID
  INV-004  Citywide HVAC       $5,000   paid 2026-05-12
  INV-002  Peak Performance PT   $500   paid 2026-05-04
  INV-001  Peak Performance PT $2,500   paid 2026-04-30
```

## Marking paid

The user will often just say "mark INV-003 paid" or "Peak paid the May invoice." Update the matching row's `status` to `paid` and set `paid_on` to today. Confirm what changed.
