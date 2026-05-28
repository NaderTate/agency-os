---
description: Draft the outreach email and create a Google Calendar event (with Meet link) for the discovery call.
---

# /kickoff

Turn a sent proposal into a booked conversation: a Google Calendar event with a Meet link, and a Gmail draft to the prospect.

**Client slug:** $ARGUMENTS

## Procedure

1. Read `clients/<slug>.md` and the matching `outputs/proposals/<slug>.md`. Read `business.md` for agency voice + owner name (for the sign-off).
2. **Create the calendar event (Google Calendar MCP):**
   - Title: `Discovery call, <Business>`
   - Duration: 20 minutes.
   - Time: two business days from today at a sensible weekday hour (10:00am or 2:00pm in the owner's working hours; never weekends, never before 9am or after 5pm).
   - Attendees: the agency owner (host, by default) and the client's `contact_email` if set; otherwise `demo@example.com` and note it's a demo.
   - **Google Meet:** request a Meet link via `conferenceData.createRequest` so the event has a Meet link auto-generated. The email body and the event description will both reference it.
   - Description: one-paragraph summary of the proposal (problem + what we'll build + investment), so the call has context for both sides.
3. **Draft the outreach email (Gmail MCP, draft only, never auto-send):**
   - Subject: short, specific. e.g. `<Business>, locking in the AI receptionist build`. Not "Following up".
   - Body: 4-6 sentences. Recap the problem in one line (from the research/angle), point to the proposal by name, confirm the call ("I put a hold on the calendar for <Day> at <time>, here's the Meet link: <link>"), offer to move it if the time doesn't work, sign off as the agency owner. Agency voice: confident, no filler, no emoji, no em dashes.
   - To: client's `contact_email` if set; otherwise `demo@example.com`.
4. **Fallback if Gmail or Google Calendar isn't connected:** write the full email + event details (date, time, Meet link "to be generated", description) into the client file under a `## Kickoff (<date>)` section for the user to send/create by hand.
5. Update the client `meta`: `stage: call-booked`, and set `next_action: Run the discovery call <date> at <time>.`
6. Add a one-line timeline entry: "Kickoff drafted, discovery call <date> <time> (Meet link: <url>) (<date>)."
7. **Then wait for confirmation before sending.** End the reply with: "Want me to send it, or tweak it first?" If the user confirms ("send", "yes go", etc.) AND `RESEND_API_KEY` is set in `.env`, send the email via Resend. **Pipe the body as stdin via a heredoc, no temp files:**

   ```bash
   node scripts/send-email.mjs --to "<contact_email>" --subject "<subject>" <<'EMAIL_BODY_END'
   <the full email body verbatim, multiple lines fine>
   EMAIL_BODY_END
   ```

   The single-quoted heredoc tag (`<<'EMAIL_BODY_END'`) prevents shell expansion so quotes, backticks, and dollar signs pass through. On success, add a second timeline entry: "Kickoff SENT to <email>, discovery call <date> <time> (Resend id <id>)." On failure, surface the error and leave the Gmail draft in place.

## Output

**Show the drafted email in the reply** (subject + body, verbatim) and the event details (date, time, Meet link URL) so the user can review everything without opening Gmail or Calendar. Then state where each artifact landed (Gmail Drafts + Calendar, or the client file fallback). Suggest `/status`.

**Format hint:** lead with one short sentence on what you did, show the email block (labeled "Subject:" and "Body:"), then a one-line note with the Meet URL and event time. If this is a Telegram reply, follow the conversational-tone operating rule, plain prose around the email, but always include the email body itself verbatim so the user can read it on their phone.

## Notes

- **Always use the Meet `hangoutLink`** that Google Calendar returns after the event is created, not a placeholder. The link is created when the event is created with the conference request.
- **Times are in the owner's timezone** (from the Google Calendar default). State the timezone in the email if the prospect is in a different one.
- The event is a real invite the prospect will get. For demo flows, the `demo@example.com` address is safe (no real human is bothered).
