---
description: Draft a payment-reminder email for an outstanding invoice (single or all overdue).
---

# /remind

Chase what's owed without leaving the terminal. Drafts the email, never auto-sends.

**Arguments:** $ARGUMENTS

Two forms:
- **Single:** `/remind <INV-NNN>` → one reminder for that invoice.
- **Bulk:** "remind all overdue" → one reminder per overdue invoice, one email per client (grouped if a client has multiple overdue rows).

## Procedure

1. Read `finance/invoices.md`. Locate the target invoice(s). For each, compute `days_late` = today minus `due`. Skip anything that's `paid` or `draft`.
2. For each invoice, read the matching `clients/<slug>.md` to get the contact name + email. If `contact_email` is `(unknown yet)` or `demo@example.com`, draft against `demo@example.com` and note it.
3. Read `business.md` to pull the agency voice + owner name for the sign-off.
4. **Compose the email**, tone scaled to lateness:
   - **1-7 days late:** soft nudge. "Quick check on INV-NNN, it was due <date> for <for>, $<amount>. Let me know if there's an issue I can help with."
   - **8-21 days late:** firmer. Restate the invoice details, offer to send another copy, ask for an ETA on payment.
   - **22+ days late:** direct. Note this is the Nth reminder, ask for resolution this week, mention pausing future support if unresolved (only if appropriate to the relationship, otherwise just ask for an ETA).
   - Subject is specific: `Invoice INV-NNN, <for>, $<amount> (due <date>)`, never "Following up".
   - Agency voice from `business.md`: no filler, no emoji, no em dashes.
5. **Always draft + show, never auto-send:**
   - If Gmail is connected, create the email as a **draft** there (so it's archived in Gmail's Drafts). Use the client's real `contact_email` if one is set; otherwise `demo@example.com` and note it's a demo.
   - If Gmail isn't connected, write the full email under a `## Reminder (<date>)` section on the invoice's matching client file.
   - Either way, **show the full subject + body in the chat reply** (per the "show drafted communications in the reply" operating rule). Never just say "drafted, go check Gmail."
6. Add a one-line entry to the client's timeline: "Reminder drafted for INV-NNN (<date>, <days_late> days late)."
7. **Then wait for confirmation before actually sending.** End the reply with: "Want me to send it, or tweak it first?" If the user confirms ("send", "yes, send it", "go ahead", etc.) AND `RESEND_API_KEY` is set in `.env`, send the email via Resend:

   ```
   node scripts/send-email.mjs --to <contact_email> --subject <subject> --body-file <tmp_body_file>
   ```

   Write the body to a temp file (e.g. `data/tmp/remind-INV-NNN.txt`) first, then invoke the script, then delete the temp file. On success, add a second timeline entry: "Reminder SENT to <email> for INV-NNN (<date>, Resend id <id>)." On failure, surface the error and leave the Gmail draft in place. If `RESEND_API_KEY` isn't set, explain the user has to wire it up (see `.env.example`) and the manual "tap send in Gmail" path is the fallback.

## Output

For each reminder created, **show the actual drafted email in the reply** (subject + body, verbatim) so the user can review it without leaving the chat. Then state: invoice ID, client, amount, days late, tone used, and whether it landed in Gmail Drafts (ready to send with one tap) or was written to the client file. Suggest `/invoices` if they want to see what's still outstanding.

**Format hint:** in the reply, lead with one short sentence on what you did, then the email block (clearly labeled with "Subject:" and "Body:"), then a one-line note on where it sits. If this is a Telegram reply, follow the conversational-tone operating rule, plain prose around the email, but always include the email body itself verbatim so the user can read it on their phone.

## Notes

- Never marks the invoice anything other than `sent`. Mark paid only when payment actually arrives, via "mark INV-003 paid".
- Don't fabricate a previous-reminder count. If you don't know how many reminders have been sent, assume this is the next one and write accordingly.
