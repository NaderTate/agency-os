# CLAUDE.md — AgencyOS

This is **AgencyOS**: the operating system for an AI services agency, running entirely inside Claude Code. No SaaS, no database, no dashboard — the agency is a folder of markdown files, and Claude is the operator that runs it.

> Swap the agency identity in one place: change `AGENCY_NAME` below. Everything (proposals, emails, status board) reads from it.

```
AGENCY_NAME   = Aether AI
AGENCY_OWNER  = Nader
AGENCY_DOMAIN = AI receptionists, voice agents, and workflow automation for local service businesses
```

---

## What this is

A real CRM + sales + delivery pipeline that lives in `clients/` (one markdown file per client) and `services.md` (the catalog). You drive it with five commands:

| Command | What it does |
| --- | --- |
| `/intake "<lead blurb>"` | Turn a raw lead into a structured client file. |
| `/research <slug>` | Web-research the prospect's business, append findings + a tailored angle. |
| `/proposal <slug>` | Draft a scoped, priced proposal into `outputs/proposals/`. |
| `/kickoff <slug>` | Draft the outreach email + put a kickoff/discovery hold on the calendar. |
| `/status` | Render the whole pipeline — every deal, its stage, the next action, pipeline value, and signed MRR. |

That's the entire business. Add a client, research them, send a proposal, book the call, track delivery — without leaving the terminal.

---

## Session start (auto-prime)

On every fresh session, before responding to the first message:

1. Read `services.md` (the catalog + pricing — needed for proposals and `/status` math).
2. Glob `clients/*.md` (skip `_template.md`) and read each one's frontmatter block (the fenced `meta` block at the top).
3. Return a one-screen pipeline snapshot: count of clients per stage, total open pipeline value, signed MRR, and the single most urgent next action. Under 120 words.

This primes you to operate the agency immediately. The full per-deal breakdown is what `/status` prints on demand.

---

## The client file (the unit of the CRM)

Every client is one file at `clients/<slug>.md`. The top is a fenced ` ```meta ` block that `/status` parses; the rest is freeform research + timeline. See `clients/_template.md`.

```meta
name:            Bright Smile Dental
slug:            bright-smile-dental
stage:           lead          # lead → researching → proposal-sent → call-booked → won → delivering → lost
vertical:        Dental
contact_name:    (unknown yet)
contact_email:   (unknown yet)
source:          YouTube
service_interest: AI receptionist
deal_value:      2500          # one-time, USD (0 if unknown)
deal_mrr:        500           # recurring, USD/mo (0 if none)
next_action:     Research the practice, then send a proposal.
created:         2026-05-27
```

**Stages and what they mean:**
- `lead` — captured, not yet researched.
- `researching` — `/research` has run; findings are in the file.
- `proposal-sent` — `/proposal` generated a doc in `outputs/proposals/`.
- `call-booked` — `/kickoff` drafted outreach + put a hold on the calendar.
- `won` — closed; counts toward signed MRR.
- `delivering` — active build; counts toward signed MRR.
- `lost` — dead; excluded from pipeline value and MRR.

**Pipeline value** = sum of `deal_value` for clients in `lead`, `researching`, `proposal-sent`, `call-booked` (the open funnel).
**Signed MRR** = sum of `deal_mrr` for clients in `won` + `delivering`.

---

## Operating rules

- **Stay in the agency voice.** Proposals and emails sound like a senior operator at an AI agency: specific, confident, no filler, no hype, no emoji. Lead with the client's problem and the dollars, not the tech stack.
- **Price from `services.md`.** Never invent pricing. If a deal needs a custom number, base it on the catalog and say so.
- **One file is the source of truth per client.** When a command changes a deal, update that client's `meta` block (`stage`, `next_action`, and `deal_value`/`deal_mrr` if they firmed up) in the same pass. Never let the board drift from reality.
- **Ground research in real sources.** `/research` uses real web search. Cite what you found. Never fabricate reviews, addresses, or numbers — if you can't find it, say "couldn't confirm."
- **Demo-safe by default.** This workspace ships with mock clients and a demo email (`demo@example.com`). Real outreach (`/kickoff`) only fires against real contact details you add yourself.
- **Be terse.** No preamble, no narration. Do the thing, show the result.

---

## Setup (for anyone who clones this)

1. Open this folder in Claude Code. That's it for the core — `/intake`, `/research`, `/proposal`, `/status` work out of the box (research uses built-in web search).
2. **Optional:** to let `/kickoff` draft real emails and calendar holds, connect the **Gmail** and **Google Calendar** integrations in Claude. See `.mcp.json` for notes. Without them, `/kickoff` writes the email + event details to the client file so you can send them by hand.
3. Edit `services.md` to your own services + pricing, change `AGENCY_NAME` above, and delete the demo clients in `clients/`.
