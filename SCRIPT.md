# Video Script: "I Turned Claude Code Into the OS That Runs My AI Agency"

> Working title: **"I Turned Claude Code Into the OS That Runs My AI Agency"**
> Backups: "My Entire AI Agency Runs in Claude Code (No CRM, No SaaS)" · "I Replaced My CRM, Notion, and a VA With One Folder of Text Files"
>
> Target length: 12-18 min. Bucket: **70-builder** (reach / recruit builders → free Skool community). CTA = repo + Skool, NOT book-a-call.
> Format being replicated: "How I Turned Claude Code Into [the system that runs my X]", highest-momentum format in the 2026-05-24 discovery run (8.84). Proof: AI Edge "personal assistant" 97k, Claude official "proactive agent workflow" 55k.
>
> **The one rule for this video:** three moments must happen live on camera, because they are what make this real and not a toy:
> 1. The **import reveal**: an empty folder becomes a full agency in one command.
> 2. The live **`/research`** finding a real business's real pain (unanswered phones) on its own.
> 3. **`/status`** computing real pipeline numbers from plain text files.
> Don't cut around them.

---

## Audience + framing (read before recording)

- **This is a builder video. Pick the engineer audience and commit.** Go fast, show the terminal, assume they know what a markdown file, a CSV, and a CLI are. No "don't worry if you're not technical." (Playbook H3.)
- **The hook is the inversion:** everyone sells "AI agency in a box" as a stack of no-code SaaS. You run yours in a folder of text files with Claude Code. That's the differentiator and the thumbnail.
- **Spell "Claude Code" on first mention**, auto-captions turn "Claude" into "cloud" / "clawed." Say it slowly, add an on-screen label `Claude Code`. (Playbook H2.)
- **Re-anchor the money every ~3 min:** this isn't a productivity toy, it's how a real agency goes from a cold lead to a booked call and tracks recurring revenue. (Playbook H4.)

## How to read this script

Each section has three tracks:
- **[SAY]**, what you say to camera / voiceover.
- **[SHOW]**, what's on screen.
- **[DEMO]**, exact commands to run.

You film starting from an **empty** agency (`clients/` holds only `_template.md`). The repo ships with a sample `clients.csv` that you import live to populate the pipeline, then you run one new lead (**Bright Now Dental**) through the full loop by hand.

---

## 0. COLD OPEN, the transformation (0:00 - 0:50)

> The strongest moment goes first (Playbook H1). Here it's the import: nothing becomes a whole agency in one command.

**[DEMO]** Start on an empty agency. Run `/status` so the board shows an empty pipeline ($0).

**[SHOW]** Full-screen terminal: an empty `/status`. Then show `clients.csv` for a beat (a list of businesses).

**[SAY]**
> "This is a brand new AI agency. No clients, no CRM, no Notion, nothing. Just an empty folder. Watch me build the entire thing in one command."

**[DEMO]** Run the import (say it in plain English to make the point early):
```
import my clients from clients.csv
```

**[SHOW]** Claude creates a client file per row and prints the result. Then run `/status`: the board fills, `Open pipeline value: $11,500`, `Signed MRR: $1,500/mo`.

**[SAY]**
> "That's my entire agency now. Every client, every deal, eleven and a half grand in open pipeline, fifteen hundred a month recurring, and the next move on every deal. Pulled out of a CSV in seconds. And it's not a CRM, it's a folder of text files, and Claude Code runs the whole thing. Spell that, C-L-A-U-D-E Code. Let me show you how."

**[SHOW]** On-screen label: `Claude Code`.

---

## 1. THE PREMISE (0:50 - 2:00)

**[SAY]**
> "Every 'start an AI agency' video sells you the same stack: a CRM subscription, a project tool, an automation platform, maybe a VA. I threw all of it out. My agency runs on Claude Code and a handful of commands."

**[SHOW]** A title card listing the commands:
> `intake` · `research` · `proposal` · `kickoff` · `status` · `import`

**[SAY]** (the talk-to-it point, say it early)
> "And before anyone asks: no, you don't memorize these. They're just shortcuts. You can literally talk to it, like I just did with that import. Capture a lead, research the business, send a priced proposal, book the call, see the whole pipeline. That's an agency. And the thing doing the work isn't code I wrote, it's Claude reading a few markdown files. Let me open it up."

---

## 2. THE STRUCTURE, what the import just created (2:00 - 4:30)

**[SHOW]** The repo tree in the editor. Open each file as you name it.

**[SAY]** Go fast, builder pace.
> "Here's what that import actually did. First, `CLAUDE.md`, the brain. It tells Claude it's the operator of an AI agency, how to talk, how to price, and to show me a pipeline snapshot the second I open the folder."

**[SHOW]** `CLAUDE.md`, scroll to the auto-prime block and the `AGENCY_NAME` constant.

**[SAY]**
> "Second, `services.md`, my actual catalog and pricing. Every proposal prices from this file, so numbers are never made up."

**[SHOW]** `services.md`, the services table.

**[SAY]**
> "Third, the `clients` folder. This is the CRM, and it was empty 90 seconds ago. The import read each row of my CSV and created one markdown file per client, even mapping their old stage names, 'Closed Won', 'Meeting Booked', onto mine."

**[SHOW]** Open one imported client, e.g. `clients/harbor-family-law.md`. Highlight the ` ```meta ` block (stage, deal value, monthly, next action), then the body.

**[SAY]**
> "That's the trick that makes `/status` work: the deal lives in the `meta` block up top, the context lives below in plain English. Fourth, the `.claude/commands` folder, each command is just a markdown file telling Claude what to do. No backend, no database. You can read every one. Now let me run the actual daily loop on a brand new lead."

---

## 3. THE LIVE LOOP, a new lead start to finish (4:30 - 12:30)

### 3a. Intake (4:30 - 5:30)

**[SAY]**
> "A lead just came in from one of my videos. A dental practice. And to prove the point about not memorizing commands, I won't type a slash command, I'll just tell it what happened."

**[DEMO]** Type it as plain English:
```
new lead: Bright Now Dental in Austin, wants an AI receptionist, found me on YouTube
```
(The `/intake "<blurb>"` slash command does the same if you prefer.)

**[SHOW]** Claude creates `clients/bright-now-dental.md` and confirms (business, vertical, matched service + price). Run `/status`: open pipeline ticks from `$11,500` to `$14,000`.

**[SAY]**
> "It tagged it dental, matched my AI receptionist offer, twenty-five hundred setup and five hundred a month, straight from my services file, and the pipeline moved from eleven-five to fourteen grand. That number is computed live from text files, not stored anywhere."

### 3b. Research (5:30 - 8:30)

> HERO MOMENT. Let the search run on camera.

**[SAY]**
> "Before I pitch them, I want to know their business. So I research them."

**[DEMO]** Run:
```
/research bright-now-dental
```

**[SHOW]** Claude runs a real web search live. Let the results and reasoning show, then it appends a `## Research` section to the client file.

**[SAY]** When the findings land, and they'll mention unanswered phones, slow down and point at it.
> "Look at what it found. Their locations, their services, and right here, real reviews complaining the front desk doesn't answer the phone and leaves people on hold. I didn't tell it that. It found the exact pain my product solves, in a real business, on its own. That's the angle for the proposal, and it wrote it for me."

**[SHOW]** Highlight the **Angle** line.

**[SAY]** (business-value anchor)
> "This normally takes me twenty minutes per lead before I can even start a proposal. Now it's ten seconds, grounded in real sources I can click."

### 3c. Proposal (8:30 - 11:00)

**[SAY]**
> "Now the proposal. It reads the research, reads my pricing, and writes the document."

**[DEMO]** Run:
```
/proposal bright-now-dental
```

**[SHOW]** Open `outputs/proposals/bright-now-dental.md`. Scroll: the problem (in their words), what we'll build, scope, timeline, investment (setup + monthly), next step.

**[SAY]**
> "A real proposal. It opens with their problem, the unanswered phones, not my tech stack. Scoped, priced from my catalog, twenty-five hundred plus five hundred a month, with an honest example ROI line. Thirty seconds, specific to this one dentist."

**[SAY]** (business-value anchor)
> "Here's why this matters: the bottleneck in an agency isn't building the product, it's the sales admin around it, the research, the scoping, the proposals, the follow-up. That's what eats your week. That's what this folder kills."

### 3d. Kickoff (11:00 - 12:30)

**[SAY]**
> "Last step, get the call booked. This uses two integrations, Gmail and Google Calendar, connected to Claude. No integrations? It just writes the email and event into the client file for you to send by hand."

**[SHOW]** On-screen labels: `Gmail`, `Google Calendar`.

**[DEMO]** Run:
```
/kickoff bright-now-dental
```

**[SHOW]** The Gmail **draft** (subject + body) and the Calendar hold. Stress it's a draft, never auto-sent, and the demo points at a placeholder email.

**[SAY]**
> "It drafted the outreach, referencing their actual problem, with two time options, and put a discovery hold on my calendar. I review, hit send, done. It drafts, it never sends on its own."

---

## 4. THE RECAP (12:30 - 13:30)

**[DEMO]** Run `/status` one more time.

**[SHOW]** The full board: the imported clients plus Bright Now Dental progressed through the loop. Open pipeline `$14,000`, MRR `$1,500/mo`.

**[SAY]**
> "Fifteen minutes ago this was an empty folder. Now it's a running agency, with my real book imported and a brand new lead taken from cold to a drafted booking, and I never left the terminal. The whole financial state of the business, recomputed from text files every time I ask."

---

## 5. UNDER THE HOOD, why this works (13:30 - 15:00)

**[SAY]** Tight, for the builders.
> "Thirty seconds on how, because there's no magic. `CLAUDE.md` primes Claude on startup. Each command is a markdown file with plain instructions. The client files have a `meta` block Claude parses to do the math. That's the whole architecture. No server, no database, nothing to deploy. Which means you can read it, fork it, and bend it to your own business in an afternoon. Already have an agency? You saw it, one import and your existing clients are in. You don't start over."

**[SHOW]** Quick split: `.claude/commands/status.md` next to a client `meta` block, so they see the instruction and the data it reads.

---

## 6. CTA + CLOSE (15:00 - end)

**[SAY]** (builder-bucket CTA, Playbook H5)
> "The entire thing is free. The repo's in the description, clone it, drop in your own services and pricing or import your client list, and you've got this. Want to go deeper and see what else I run this way? Join the free Skool community, link's also below. Tell me what command you'd add next. I'm Nader, see you in the next one."

**[SHOW]** GitHub repo URL + the free Skool link on screen.

> **CTA priority:** free repo first, Skool community second. Do NOT use a "book a call" CTA, this is a reach/builder video.

---

## Pre-record checklist

- [ ] **`clients/` must be EMPTY at the start** (only `_template.md` present). If you rehearsed, delete every client file the rehearsal created, including `clients/bright-now-dental.md`, before the real take.
- [ ] `clients.csv` is in the repo root and open/ready to show for a beat.
- [ ] Run `/status` once on the empty folder so the "$0 / empty" cold-open shot is ready.
- [ ] **PRE-SCOUT the `/research` target, this is the #1 risk.** The hero moment only works if the business's public reviews actually complain about unanswered phones / hold times. Search it yourself first and confirm. **"Bright Now Dental in Austin" is pre-verified.** Have a SECOND verified business ready as backup. Never discover the result live for the first time.
- [ ] Gmail + Google Calendar connected in Claude for the live `/kickoff` draft, otherwise narrate the file-write fallback. **Rehearse `/kickoff` once** so the drafted call time lands on a sensible weekday hour.
- [ ] Say **"Claude Code, C-L-A-U-D-E"** on first mention with an on-screen label.
- [ ] The three live beats MUST be on camera: the import reveal (empty → full), `/research` finding the phone complaint, and `/status` moving the number.
- [ ] Add YouTube chapters (one per section), the video is >8 min.
- [ ] Read your auto-captions before publishing; fix any "cloud code" → "Claude Code."

## Notes on honesty (keep the trust)

- Proposals use **example** ROI math, labeled as such, never invented client numbers presented as real.
- The imported clients (from `clients.csv`) are fictional demo businesses. The only real business researched on camera is the live `/intake` target, pulled from cited public web sources, and never contacted (`/kickoff` drafts to a placeholder address).
- Pricing on screen is your real catalog from `services.md`. Change your prices, change that file.
