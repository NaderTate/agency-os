# Playbook: Voice Agent (Advanced)

The standard build for the **Voice Agent (Advanced)** offer in `context/services.md` ($5,000 setup + $1,000/mo). Includes everything in the AI Receptionist playbook plus outbound, advanced integrations, and qualification logic.

Edit this file to change the standard delivery.

## Estimated effort

- Calendar: 3 weeks from signed to live.
- Build hours: ~30-45 hrs total across the build window.
- Recurring support after go-live: ~3-4 hrs/week.

## Tasks (in order)

- [ ] Discovery call: confirm intake criteria, qualification rules, outbound triggers, integration targets.
- [ ] Provision phone number (Vapi / Twilio) and configure SIP.
- [ ] Build inbound assistant: knowledge base, qualification flow, intake-summary hand-off.
- [ ] Build booking flow: tool calls against their calendar.
- [ ] Build outbound flow: reactivation / waitlist auto-fill / ready-for-pickup texts (scoped per client).
- [ ] CRM / ticketing integration (Zendesk / GoHighLevel / their stack) for lead hand-off.
- [ ] Configure caller recognition + returning-client context.
- [ ] Configure SMS confirmations, reminders, and outbound nudges (Twilio).
- [ ] Run 8 test scenarios: inbound new, inbound qualified, inbound disqualified, reschedule, cancel, returning, outbound reminder, outbound reactivation.
- [ ] Client UAT call: walk through inbound + outbound behavior + the dashboard.
- [ ] Go live: port number or forward; enable outbound queue.
- [ ] Week-1 post-launch monitoring (review every call + outbound text, tune).
- [ ] Set up recurring weekly check-in on the calendar for the first month, monthly after.
- [ ] Send the welcome packet + onboarding doc to the client.
