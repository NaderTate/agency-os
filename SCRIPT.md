# Video Script — "I Turned Claude Code Into the OS That Runs My AI Agency"

> Working title: **"I Turned Claude Code Into the OS That Runs My AI Agency"**
> Backups: "My Entire AI Agency Runs in Claude Code (No CRM, No SaaS)" · "I Replaced My CRM, Notion, and a VA With One Folder of Text Files"
>
> Target length: 12–18 min. Bucket: **70-builder** (reach / recruit builders → free Skool community). CTA = repo + Skool, NOT book-a-call.
> Format being replicated: "How I Turned Claude Code Into [the system that runs my X]" — highest-momentum format in the 2026-05-24 discovery run (8.84). Proof: AI Edge "personal assistant" 97k, Claude official "proactive agent workflow" 55k.
>
> **The one rule for this video:** the live `/research` must find a REAL business's REAL pain point on camera (unanswered phones), and `/status` must compute REAL pipeline numbers from plain text files. Those two moments are why this isn't a toy. Don't cut around them — show them happening live.

---

## Audience + framing (read before recording)

- **This is a builder video. Pick the engineer audience and commit.** Go fast, show the terminal, assume they know what a markdown file and a CLI are. No "don't worry if you're not technical." (Playbook H3.)
- **The hook is the inversion:** everyone sells "AI agency in a box" as a stack of no-code SaaS. You run yours in a folder of text files with Claude Code. That's the differentiator and the thumbnail.
- **Spell "Claude Code" on first mention** — auto-captions turn "Claude" into "cloud" / "clawed." Say it slowly, add an on-screen label `Claude Code`. (Playbook H2.)
- **Re-anchor the money every ~3 min:** this isn't a productivity toy, it's how a real agency goes from cold lead to booked call and tracks $1,500/mo in recurring revenue. (Playbook H4.)

## How to read this script

Each section has three tracks:
- **[SAY]** — what you say to camera / voiceover.
- **[SHOW]** — what's on screen.
- **[DEMO]** — exact commands to run.

The repo ships seeded with 5 demo clients across the pipeline (Northside Chiropractic = lead, Lumen Med Spa = proposal-sent, Coastal Law = call-booked, Apex Auto Repair = delivering, Verde Landscaping = won). The 6th client — **Bright Now Dental** — you create LIVE on camera, so the pipeline number grows on screen.

---

## 0. COLD OPEN — the reveal (0:00 – 0:45)

**[DEMO]** In the `agency-os` folder, run `/status`. Have it already executed so the clean board is on screen at 0:00.

**[SHOW]** Full-screen terminal: the `/status` board — five clients grouped by stage, `Open pipeline value: $10,000`, `Signed MRR: $1,500/mo`.

**[SAY]**
> "This is my entire AI agency. Every client, every deal, ten grand in open pipeline, fifteen hundred a month in recurring revenue, and the next move on every single deal. It's not a CRM. It's not Notion. It's not some twelve-tool no-code stack. It's a folder of text files, and Claude Code runs the whole thing. Let me show you how — and the repo's free, so you can clone it."

---

## 1. THE PREMISE (0:45 – 2:00)

**[SAY]**
> "Every 'start an AI agency' video sells you the same stack: a CRM subscription, a project tool, an automation platform, maybe a VA. I threw all of it out. My agency runs on Claude Code — spell that, C-L-A-U-D-E Code — and five commands. Watch."

**[SHOW]** On-screen label: `Claude Code`. Then a title card listing the five commands:
> `/intake` · `/research` · `/proposal` · `/kickoff` · `/status`

**[SAY]**
> "Capture a lead, research the business, send a priced proposal, book the call, see the whole pipeline. That's an agency. And the thing actually doing the work isn't code I wrote — it's Claude reading a few markdown files. Let me open it up."

---

## 2. THE STRUCTURE — what's actually in the folder (2:00 – 4:30)

**[SHOW]** The repo tree in the editor. Open each file as you name it.

**[SAY]** Go fast, builder pace.
> "Four things. First, `CLAUDE.md` — this is the brain. It tells Claude it's the operator of an AI agency, how to talk, how to price, and to give me a pipeline snapshot the second I open the folder."

**[SHOW]** `CLAUDE.md` — scroll to the auto-prime block and the `AGENCY_NAME` constant.

**[SAY]**
> "Second, `services.md` — my actual catalog and pricing. Every proposal prices from this file, so the numbers are never made up."

**[SHOW]** `services.md` — the four-row services table.

**[SAY]**
> "Third, the `clients` folder. This is the CRM. One markdown file per client. At the top of each is a little `meta` block — stage, deal value, monthly, the next action."

**[SHOW]** Open `clients/lumen-med-spa.md`. Highlight the ` ```meta ` block, then the research + timeline below it.

**[SAY]**
> "And that's the trick that makes `/status` work: the deal lives in the `meta` block, the context lives below it in plain English. Fourth — the `.claude/commands` folder. Each command is just a markdown file telling Claude what to do. No backend, no database. You can read every one of them. Let's run the loop."

---

## 3. LIVE LOOP — INTAKE (4:30 – 6:00)

**[SAY]**
> "A lead just came in from one of my videos. A dental practice. Watch me put it in the system."

**[DEMO]** Run:
```
/intake "Bright Now Dental in Austin, wants an AI receptionist, found me on YouTube"
```

**[SHOW]** Claude creates `clients/bright-now-dental.md`, prints the confirmation (business, vertical, matched service + price, slug).

**[SAY]**
> "It pulled the business name, tagged it dental, matched it to my AI receptionist offer — twenty-five hundred setup, five hundred a month — straight from my services file, and made the client record. Now watch the pipeline."

**[DEMO]** Run `/status`.

**[SHOW]** The board now lists Bright Now Dental under LEAD; `Open pipeline value` ticks from `$10,000` to `$12,500`.

**[SAY]**
> "Pipeline just went from ten grand to twelve-five. A lead entered the business and the number moved — and that number is computed live from text files, not stored anywhere."

---

## 4. LIVE LOOP — RESEARCH (6:00 – 9:00)

> THIS IS HERO MOMENT #1. Let the search run on camera.

**[SAY]**
> "Before I pitch them, I want to know their business. So I research them."

**[DEMO]** Run:
```
/research bright-now-dental
```

**[SHOW]** Claude runs a real web search live. Let the search results and the reasoning show. Then it appends a `## Research` section to the client file.

**[SAY]** When the findings land — and they'll mention unanswered phones — slow down and point at it.
> "Look at what it found. It pulled their locations, their services, and — right here — real reviews complaining the front desk doesn't answer the phone and leaves people on hold. I didn't tell it that. It found the exact pain my product solves, in a real business, on its own. That's the angle for the proposal, and it wrote it for me."

**[SHOW]** Highlight the **Angle** line in the research section.

**[SAY]** (business-value anchor)
> "This is the part that normally takes me twenty minutes per lead before I can even write a proposal. It's now ten seconds, and it's grounded in real sources I can click."

---

## 5. LIVE LOOP — PROPOSAL (9:00 – 12:00)

**[SAY]**
> "Now the proposal. It reads the research, reads my pricing, and writes the document."

**[DEMO]** Run:
```
/proposal bright-now-dental
```

**[SHOW]** Open the generated `outputs/proposals/bright-now-dental.md`. Scroll through: the problem (in their words), what we'll build, scope, timeline, investment (setup + monthly), the next step.

**[SAY]**
> "That's a real proposal. It opens with their problem — the unanswered phones — not my tech stack. It's scoped, it's priced from my catalog, twenty-five hundred plus five hundred a month, and it has an ROI line that's honest example math, not a fake guarantee. Thirty seconds, and it's specific to this one dentist."

**[SAY]** (business-value anchor)
> "Real talk on why this matters: the bottleneck in an agency isn't building the product, it's the sales admin around it — researching, scoping, writing proposals, following up. That's what eats your week. That's what this folder kills."

---

## 6. LIVE LOOP — KICKOFF (12:00 – 14:00)

**[SAY]**
> "Last step: get the call booked. This one uses two integrations — Gmail and Google Calendar — connected to Claude. If you don't have them, it just writes the email and the event into the client file for you to send by hand."

**[SHOW]** On-screen labels: `Gmail`, `Google Calendar`.

**[DEMO]** Run:
```
/kickoff bright-now-dental
```

**[SHOW]** The Gmail **draft** that gets created (subject + body), and the Calendar hold. Emphasize it's a DRAFT, not auto-sent, and the demo uses a placeholder email.

**[SAY]**
> "It drafted the outreach email — references their actual problem, proposes a twenty-minute call with two time options — and put a discovery hold on my calendar. I review it, hit send, done. Note it drafts, it never sends on its own, and in the demo it's pointed at a placeholder address."

---

## 7. THE RECAP — full pipeline (14:00 – 15:30)

**[DEMO]** Run `/status` one more time.

**[SHOW]** Bright Now Dental has progressed; the board reflects every stage; pipeline value holds at `$12,500`, MRR `$1,500/mo`.

**[SAY]**
> "From a cold lead to a researched, priced proposal and a drafted booking email — four commands, and I never left the terminal. And the whole financial state of the business is right here, recomputed from text files every time I ask. That's the agency. That's the OS."

---

## 8. UNDER THE HOOD — why this works (15:30 – 17:00)

**[SAY]** Keep it tight for the builders.
> "Thirty seconds on how, because there's no magic. `CLAUDE.md` primes Claude on startup. Each command is a markdown file with plain instructions. The client files have that `meta` block Claude parses to do the math. That's the entire architecture. No server, no database, nothing to deploy. Which means you can read it, fork it, and bend it to your own business in an afternoon."

**[SHOW]** Quick split: `.claude/commands/status.md` next to a client `meta` block, so they see the instruction and the data it reads.

---

## 9. CTA + CLOSE (17:00 – end)

**[SAY]** (builder-bucket CTA — Playbook H5)
> "The entire thing is free. The repo's linked in the description — clone it, swap in your own services and pricing, and you've got this. And if you want to go deeper, build your own version, and see what else I'm running this way, join the free Skool community, link's also below. Tell me what command you'd add next. I'm Nader — I'll see you in the next one."

**[SHOW]** GitHub repo URL + the free Skool link on screen.

> **CTA priority:** free repo first, Skool community second. Do NOT use a "book a call" CTA here — this is a reach/builder video, not a services-conversion one.

---

## Pre-record checklist

- [ ] Open `agency-os` in Claude Code; run `/status` once so the clean seeded board ($10,000 / $1,500) is ready for the cold open.
- [ ] Confirm `clients/bright-now-dental.md` does NOT exist yet (it's created live). If you rehearsed, delete it before the real take.
- [ ] **PRE-SCOUT the research target off-camera — this is the #1 risk.** The hero moment only works if the business's public reviews actually complain about unanswered phones / hold times. Pick a real business + city, search it yourself first, and confirm those reviews exist before you film. **"Bright Now Dental in Austin" is pre-verified** (its public reviews mention front-desk phone complaints) — use it, or scout your own. Either way, have a SECOND verified business ready as a backup. Never discover the search result live for the first time.
- [ ] **Live `/intake` blurb must name the real business + its city** (e.g. "Bright Now Dental in Austin") so `/research` returns one clean business, not a list. A bare name returns mush.
- [ ] Gmail + Google Calendar connected in Claude if you want the live `/kickoff` draft on screen — otherwise narrate the file-write fallback. **Rehearse `/kickoff` once** so the drafted call time lands on a sensible weekday hour (not 3am or a weekend) before the real take.
- [ ] Say **"Claude Code — C-L-A-U-D-E"** on first mention with an on-screen label (caption fix).
- [ ] The live `/research` finding the unanswered-phone complaint, and `/status` moving the pipeline number, MUST be on camera. Those are the two "it's not a toy" beats.
- [ ] Add YouTube chapters (one per loop step) — the video is >8 min.
- [ ] Read your auto-captions before publishing; fix any "cloud code" → "Claude Code."

## Notes on honesty (keep the trust)

- The proposals use **example** ROI math, labeled as such — never present invented client numbers as real.
- The seeded clients are fictional demo businesses. The only real business researched on camera is the live `/intake` target, pulled from public web sources you cite — and you never contact them (kickoff is a draft to a placeholder address).
- Pricing on screen is your real catalog from `services.md`; if you change your prices, change that file.
