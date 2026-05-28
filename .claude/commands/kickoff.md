---
description: Draft the outreach email and lock the discovery call (Calendly link if connected, otherwise Google Calendar hold + time options).
---

# /kickoff

Turn a sent proposal into a booked conversation: a ready-to-send email with the easiest possible way for them to pick a time.

**Client slug:** $ARGUMENTS

## Procedure

1. Read `clients/<slug>.md` and the matching `outputs/proposals/<slug>.md`. Read `business.md` for the agency voice + owner name.
2. **Decide the booking mechanism** (in priority order, use the first available):
   - **A. Calendly (preferred).** If a Calendly connector is available, create a **single-use scheduling link** for the user's "Discovery call" or default event type (use the Calendly `scheduling_links-create_single_use_scheduling_link` tool against the host's default event type, expiring in 14 days). The email then includes that one link, "pick any slot." Cleanest CTA, zero back-and-forth.
   - **B. Google Calendar hold + time options.** If Calendly isn't connected but Google Calendar is, create a 20-minute "Discovery call, <Business>" event two business days out, and the email proposes two concrete time options.
   - **C. File-write fallback.** Neither connected: write the full email + suggested times into the client file under a `## Kickoff (<date>)` section for the user to send by hand.
3. **Draft the outreach email** (always, regardless of mechanism):
   - Subject: short, specific, references their business + the outcome (not "Following up"). e.g. `<Business>, locking in the AI receptionist build`.
   - Body: 4-6 sentences. Recap the problem in one line (from their research/angle), point to the proposal by name, propose a 20-minute discovery call, then either: (A) "Grab any slot here: <calendly-link>", (B) "Does <Day> at <time> or <Day> at <time> work?", or (C) suggested times for the user to send. Sign off as the agency owner from `business.md`. Agency voice: confident, no filler, no emoji, no em dashes.
4. **Send vs draft (demo-safe):**
   - If Gmail is connected, create the email as a **draft** (never auto-send). Use the client's real `contact_email` only if one is set; otherwise `demo@example.com` and note it's a demo.
   - If Gmail isn't connected, write the email into the client file (path C above).
5. Update the client `meta`: `stage: call-booked`, and set `next_action: Run the discovery call.`
6. Add a timeline entry: "Kickoff drafted, booking via <Calendly link | Calendar hold | manual> (<date>)."

## Output

State which mechanism was used, the email subject, and where the booking lives (Calendly URL, Calendar event, or file section). Suggest checking `/status`.

## Notes

- **Calendly URLs vs URIs:** when you ask Calendly for a scheduling link, the response has a public `booking_url` (real URL on `calendly.com`) and internal `uri` fields (`api.calendly.com/...`). **Always use the `booking_url`** in the email, never the URI.
- Default event type: if there are multiple Calendly event types, prefer one named "Discovery", "Discovery Call", or "Intro Call". Otherwise use the user's default. If you must guess, ask before creating the link rather than picking the wrong event.
- The single-use link expires after one booking, so if the prospect doesn't book, /kickoff again will create a fresh link.
