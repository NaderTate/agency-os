# Playbook: AI Receptionist

The standard build for the **AI Receptionist** offer in `context/services.md` ($2,500 setup + $500/mo). One markdown file = one canonical task list. Used by:

- `/clickup <client>` to push these tasks as a list into the ClickUp workspace.
- `/onboarding <client>` (when it ships) for the internal welcome packet.

Edit this file to change the standard delivery, every receptionist build picks it up next time.

## Estimated effort

- Calendar: 2-3 weeks from signed to live.
- Build hours: ~15-25 hrs total across the build window.
- Recurring support after go-live: ~2 hrs/week.

## Tasks (in order)

- [ ] Discovery call: confirm services, providers, hours, edge cases, integration target (calendar/CRM).
- [ ] Provision phone number (Vapi / Twilio) and configure SIP.
- [ ] Build assistant prompt: knowledge base, opening message, agency-voice tuning, hours + service awareness.
- [ ] Build booking flow: tool calls for create/reschedule/cancel against their calendar.
- [ ] Integrate calendar (Google Calendar / GoHighLevel / their system) end to end.
- [ ] Configure caller recognition (returning-client greeting + context).
- [ ] Configure SMS confirmations + reminders (Twilio).
- [ ] Configure waitlist auto-fill (if scoped in the proposal).
- [ ] Run 5 test-call scenarios: new booking, reschedule, cancel, returning client, edge case (out-of-hours).
- [ ] Client UAT call: walk the owner through behavior + the dashboard.
- [ ] Go live: port the number or set call forwarding from their existing line.
- [ ] Week-1 post-launch monitoring + tweaks (review every call recording, adjust prompt).
- [ ] Set up recurring monthly check-in on the calendar.
- [ ] Send the welcome packet + onboarding doc to the client.
