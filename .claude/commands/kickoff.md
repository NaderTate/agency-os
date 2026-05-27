---
description: Draft the outreach email and a kickoff/discovery calendar hold for a client.
---

# /kickoff

Turn a sent proposal into a booked conversation: a ready-to-send email and a calendar hold.

**Client slug:** $ARGUMENTS

## Procedure

1. Read `clients/<slug>.md` and the matching `outputs/proposals/<slug>.md`.
2. **Draft the outreach email:**
   - Subject: short, specific, references their business + the outcome (not "Following up").
   - Body: 4-6 sentences, recap the problem in one line, point to the proposal, propose a 20-minute discovery call, give two concrete time options, sign off as the agency owner. Agency voice: confident, no filler, no emoji.
3. **Place the calendar hold:** a 20-minute "Discovery call, <Business>" event, two business days out at a sensible time, with the proposal summary in the description.
4. **Send vs. draft (demo-safe):**
   - If Gmail + Google Calendar are connected, create the email as a **draft** (never auto-send) and create the calendar event. Use the client's real `contact_email` only if one is set; otherwise use `demo@example.com` and note it's a demo.
   - If they're not connected, write the full email (subject + body) and the event details into the client file under a `## Kickoff (<date>)` section so the user can send them by hand.
5. Update the client `meta`: `stage: call-booked`, and set `next_action: Run the discovery call.`
6. Add a timeline entry noting kickoff was drafted/sent (with the date).

## Output

Show the email subject + the proposed call time, and say whether it was drafted in Gmail/Calendar or written to the file. Suggest checking `/status`.
