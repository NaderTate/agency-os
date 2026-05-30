---
client:  brookside-animal-hospital
date:    2026-03-12
type:    Kickoff call
length:  ~28 min
present: Nader (Aether AI), Dr. Lena Park (owner), Diane Murphy (office manager)
---

# Kickoff call: Brookside Animal Hospital

Working transcript of the kickoff. The scope items discussed here are what landed in the client's `## Scope` section, the build picked them up in waves over the next two months.

---

**Nader:** Dr. Park, Diane, thanks for the time. Want to walk through exactly what we're building before I start. Start with what's hurting most.

**Dr. Park:** The phone. We miss probably 15 calls a week, most of those are people trying to book. If they can't reach us they call another clinic.

**Diane:** And it's always when I'm in a back-to-back, vaccinations or check-ins. The phone just rings.

**Nader:** So step one is inbound. The agent answers every call in your voice, books appointments against your real calendar. What do you use for scheduling?

**Diane:** eVetPractice. Everything has to land in there.

**Nader:** Good, we'll integrate with eVetPractice both ways: read availability for booking, write the appointment back. Same for cancel and reschedule. Provider-specific, service-length-aware (a wellness exam is shorter than a dental clean).

**Dr. Park:** Can it greet returning clients by name? Maybe by pet's name?

**Nader:** Yes. When the phone rings, the agent sees the caller's number, looks up in eVetPractice, knows who they are, what pets they have, when they were last in. So it opens with "Hi Sarah, calling about Bella?" That's the personalized side.

**Diane:** That alone is going to blow people's minds. People hate when they have to re-explain.

**Nader:** OK. Now the bigger lever for revenue: outbound vaccination reminders. The system pulls the recall list out of eVetPractice each morning, the agent calls each owner, books or moves the annual.

**Dr. Park:** We do that in batches when we have time, which is basically never. So most of our recalls drift past due. That's a huge gap.

**Nader:** Right. The agent does that every day, automatically. If nobody picks up, it leaves a voicemail and follows up with an SMS via Twilio.

**Dr. Park:** SMS reminders too?

**Nader:** Yes, confirmation when a booking is made, reminder 24 hours out, follow-up if a call is missed. Diane, you'll set the message templates so they sound like the clinic.

**Diane:** Done.

**Nader:** Two things that aren't day-one but should be on the roadmap: **waitlist auto-fill**, if someone cancels their wellness slot Friday at 2, the agent texts the next person on the waitlist for that service. The chair doesn't sit empty.

**Dr. Park:** That's huge. Especially Saturdays.

**Nader:** Second is **Spanish**. You said about a third of your clients are Spanish-speaking?

**Dr. Park:** Yeah, we lose some of them at the phone, honestly. Diane speaks some but it's not consistent.

**Nader:** We'll do language detection at the greeting and route to a Spanish-tuned version of the same agent. That's a phase-two thing once English-side is solid.

**Dr. Park:** What about writing notes back into the patient record? Right now Diane retypes everything.

**Nader:** Read-only out of eVetPractice for v1. Write-back of call notes into the patient record is a phase-two integration too. Want to land the booking and outbound flows first, then layer that in.

**Dr. Park:** OK. So phase one: inbound, recognition, booking, cancel/reschedule, outbound reminders, SMS. Phase two: waitlist, Spanish, write-back.

**Nader:** Exactly. Three weeks to phase one go-live, then we re-plan phase two from real data.

**Dr. Park:** Let's do it.

---

## Scope items extracted (mapped to Brookside's client file `## Scope`)

**Phase 1 (will be Delivered / In progress):**
1. 24/7 inbound answering in clinic voice.
2. Returning-client recognition by phone number (pet name, last appointment).
3. Appointment booking against eVetPractice (provider + service-length aware).
4. Cancellation + reschedule flow.
5. Outbound vaccination reminders (daily cron from eVetPractice recall list).
6. SMS confirmations + reminders via Twilio.

**Phase 2 (Pending in the scope):**
7. Waitlist auto-fill on cancellation.
8. Practice-management write-back (call notes into patient record).
9. Spanish-language routing.
