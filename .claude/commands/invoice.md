---
description: Create a new invoice for a client (or bulk-bill all active clients for a month).
---

# /invoice

Append a row to `data/finance/invoices.md` for billing.

**Arguments:** $ARGUMENTS

Two forms:
- **Single:** `/invoice <client-slug> [for "<label>"] [amount]` → one invoice for one client.
  - Default `for` = "Setup" if the client has no prior invoices; otherwise "<current month> support" (e.g. "May support").
  - Default `amount` = the client's `deal_value` for a Setup, or `deal_mrr` for a monthly support invoice.
- **Bulk:** "bill all active clients for <month>" → for every client whose `stage` is `won` or `delivering` and whose `deal_mrr > 0`, append a `<month> support` invoice at that MRR.

## Procedure

1. Read `data/finance/invoices.md`. Determine the next ID: `INV-NNN` where NNN is one greater than the highest existing.
2. For the single form: read `data/clients/<slug>.md` to confirm the client and pull `deal_value` / `deal_mrr`. If the client file doesn't exist, stop and say so.
3. For each invoice being created:
   - `id` = next ID (incrementing for bulk).
   - `client` = the client's display name from their `meta`.
   - `amount` = as resolved above.
   - `for` = as resolved above.
   - `issued` = today.
   - `due` = today + 15 days (net 15 default).
   - `status` = `sent` by default. If the user says "draft" or "don't send yet", use `draft` and leave `due` blank.
   - `paid_on` = blank.
4. Append the row(s) to the ledger, keeping the table well-formatted.
5. Add a one-line entry to each affected client's timeline: "Invoiced INV-NNN: $<amount> for <for> (<date>)."

## Output

Confirm: how many invoices created, IDs + clients + amounts + due dates, and the new outstanding total. Suggest `/invoices` to see the AR view.
