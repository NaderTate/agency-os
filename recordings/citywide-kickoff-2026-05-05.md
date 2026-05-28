---
client:  citywide-hvac
date:    2026-05-05
type:    Kickoff call
length:  ~22 min
present: Nader (Aether AI), Tom Briggs (owner, Citywide HVAC)
---

# Kickoff call: Citywide HVAC

A working transcript of the kickoff call. Not verbatim, condensed to the parts that drive the build scope. `/clickup` reads this file when the client has a `recording:` set, extracts the project-specific items, and adds them to the ClickUp list alongside the standard playbook tasks.

---

**Nader:** Tom, thanks for jumping on. Want to lock the scope today so we can stand the agent up next week. Walk me through a normal day on the phones.

**Tom:** Yeah, so we have two bays, six guys total. Phones ring nonstop from about 7am to 6pm. Maybe 40% is people booking AC service or maintenance, another 40% is "is my truck ready," and the rest is emergencies, which usually come after hours, no AC in 100-degree Texas, you know how it is.

**Nader:** Got it. So we need three things: booking, status calls, and an after-hours emergency path. Who's on call for emergencies right now?

**Tom:** Me. My cell is 512-555-0142. If it's a real emergency, that's the line. Otherwise it can wait till morning.

**Nader:** Perfect. So after-hours: the agent qualifies (is this a no-AC emergency or can it wait till morning?), and if it's urgent it forwards to your cell. If not, it offers a morning slot and texts you a heads-up.

**Tom:** That works. One thing, we use **ServiceTitan** for scheduling and customer records. Everything has to land in there or my dispatcher won't know it happened.

**Nader:** Noted. ServiceTitan integration is the big one then. We'll pull the schedule from there for booking, write new appointments back, and pull job status for the "is my truck ready" calls. ServiceTitan has an API, I'll handle the auth.

**Tom:** And for the ready-for-pickup, our guys actually do "tech ETA" texts, like "Marco is 20 minutes out." Not pickup, we drive to the customer. Can the agent do that too?

**Nader:** Yes. When a job is dispatched in ServiceTitan, we'll fire an outbound text from the agent: "Marco is on his way, ETA 4:15pm." We'll pull the tech's name and the ETA straight from the dispatch event.

**Tom:** Nice. One more, the voice. I don't want it sounding like a robot or some big corporate thing. We're a local family shop. Can it sound friendly Texas?

**Nader:** Yeah, we'll tune the system prompt for warmer cadence, drop the formal "thank you for calling." More like "Hey, Citywide, what's going on?" I'll send you three voice samples to pick from before we go live.

**Tom:** Cool. What about Spanish? About a third of our customers are Spanish-speaking.

**Nader:** We can route to a Spanish-speaking version of the same agent if the caller answers in Spanish. I'll set that up as a language detection step at the start.

**Nader:** OK so concretely, scope additions on top of our standard voice-agent build: ServiceTitan integration both ways, after-hours emergency forwarding to your cell, outbound tech-ETA texts on dispatch, friendly-Texas voice tuning, and Spanish-language routing. Anything else?

**Tom:** That's it. When do we go live?

**Nader:** Three weeks. Week one I build, week two you and I test together with real call scenarios, week three we cut over.

**Tom:** Let's do it.

---

## Scope items extracted (the part `/clickup` will turn into tasks)

1. **Integrate with ServiceTitan** (read schedule, write new bookings, read job dispatch events) - the dispatcher uses it as source of truth.
2. **After-hours emergency forwarding** to Tom's cell (512-555-0142) when the agent classifies the call as urgent (no-AC, leak, etc.); non-urgent → morning slot + heads-up text to Tom.
3. **Outbound tech-ETA texts** on dispatch event from ServiceTitan, format "Marco is on his way, ETA 4:15pm."
4. **Friendly Texas voice tuning** - drop formal opener, three sample voices to pick from before go-live.
5. **Spanish-language routing** - language detection at greeting, route to a Spanish-tuned version of the same agent.

These are in addition to the standard tasks in `playbooks/voice-agent-advanced.md`.
