```meta
name:             Brookside Animal Hospital
slug:             brookside-animal-hospital
stage:            delivering
vertical:         Veterinary
contact_name:     Dr. Lena Park
contact_email:    demo@example.com
source:           Referral
service_interest: Voice agent
deal_value:       5000
deal_mrr:         1000
team:             maya-chen:2
repo:             NaderTate/vet-voice-agent-memory
recording:        recordings/brookside-kickoff-2026-03-12.md
next_action:      Ship the next milestone.
created:          2026-05-28
```

# Brookside Animal Hospital

The agency's first signed client and the build that became the founding case study. Single-location small-animal vet, 4 vets + 6 techs. Owner Dr. Park is the buyer; her office manager Diane is the day-to-day point of contact.

## Lead note (2026-02-20)

Referral from a previous CRM consulting client. The clinic was losing roughly 15 booking calls a week to a single front-desk person who couldn't keep up during peak hours (school drop-off and after work). Wanted "an AI receptionist that actually books, not just transfers."

## Research (2026-02-22)

- Single location in Round Rock, TX. 4 vets, 6 techs, ~150 patient visits/week.
- Online booking exists (eVetPractice's portal) but the website's primary CTA is the phone number. Most appointments come by phone.
- High vaccination cadence (annual recalls) means a steady drumbeat of outbound reminder work the front desk usually skips, that's lost revenue and missed care.
- Bilingual customer base (~30% Spanish-speaking).
- **Angle:** every missed call is a missed appointment, and every skipped vaccination reminder is a missed appointment they don't even know about. A voice agent owns both ends, inbound booking + outbound reminders.

## Scope

The full feature set agreed at kickoff (see `recordings/brookside-kickoff-2026-03-12.md`). `/progress brookside-animal-hospital` reads this section and reports state.

### Delivered

- [x] **24/7 inbound answering** in the clinic's voice (live 2026-04-08).
- [x] **Returning-client recognition by phone number**, greets by pet's name + last appointment (live 2026-04-08).
- [x] **Appointment booking** against the eVetPractice calendar, with provider + service-length awareness (live 2026-04-15).
- [x] **Cancellation + reschedule** flow (live 2026-04-22).

### In progress

- [ ] **Outbound vaccination reminders**, daily cron pulls the recall list from eVetPractice and dials. In staging since 2026-05-21, awaiting Dr. Park's UAT.
- [ ] **SMS confirmations + reminders via Twilio**, half-built; needs message-template approval from Diane.

### Pending

- [ ] **Waitlist auto-fill on cancellation** (the standout feature from the script playbook; scoped, not started).
- [ ] **Practice-management deeper integration** (eVetPractice write-back for call notes, currently read-only).
- [ ] **Spanish-language routing** (language detection at greeting → Spanish-tuned agent).

## Timeline

- 2026-02-20, Lead captured (referral).
- 2026-02-22, Researched the practice.
- 2026-03-08, Proposal signed (Voice Agent Advanced, $5,000 setup + $1,000/mo).
- 2026-03-12, Kickoff call (transcript at `recordings/brookside-kickoff-2026-03-12.md`).
- 2026-04-08, Inbound answering + caller recognition shipped to production.
- 2026-04-15, Booking flow shipped to production.
- 2026-04-22, Cancel + reschedule shipped.
- 2026-05-15, Outbound reminder logic merged to staging.
- 2026-05-25, Reminder cron deployed to staging; awaiting Dr. Park's UAT this week.
