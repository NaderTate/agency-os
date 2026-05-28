# CLAUDE.md: AgencyOS

This is **AgencyOS**: the operating system for an AI services agency, running entirely inside Claude Code. No SaaS, no database, no dashboard, the agency is a folder of markdown files, and Claude is the operator that runs it.

> The agency's identity, mission, ICP, and brand voice live in **`business.md`**. The strategy, targets, and KPIs live in **`goals.md`**. Edit those two files to make this OS yours, every command downstream reads from them.

---

## What this is

It runs both sides of the agency: **sales** (a CRM + pipeline in `clients/`, priced from `services.md`) and **delivery** (a team in `team/` staffed onto active clients, with cost and margin). The work happens through these verbs:

| Verb | What it does |
| --- | --- |
| `/intake "<lead blurb>"` | Turn a raw lead into a structured client file. |
| `/research <slug>` | Web-research the prospect's business, append findings + a tailored angle. |
| `/proposal <slug>` | Draft a scoped, priced proposal into `outputs/proposals/`. |
| `/kickoff <slug>` | Draft the outreach email + put a kickoff/discovery hold on the calendar. |
| `/status` | Render the whole pipeline + pipeline value, signed MRR, and net margin. |
| `/import <csv>` | One-time: lift an existing client list (CSV export or a connected CRM) into the markdown CRM. |
| `/team` | Show the team roster, each person's utilization, and who's on which client. |
| `/assign <member> <client> <hrs/wk>` | Staff a team member onto a client (this drives utilization + margin). |
| `/invoices` | Show accounts receivable: outstanding, overdue (derived), due soon, drafts, recently paid. |
| `/invoice <client> [for] [amount]` | Create an invoice for a client (or "bill all active clients for May" for bulk). |
| `/remind <INV-id>` | Draft a payment-reminder email (tone scales with how late it is). "Remind all overdue" for bulk. |
| `/brief` | Morning brief: pipeline movement, AR, what to chase today, anchored to `goals.md`. One screen. |
| `/prospect <vertical>` | Outbound lead-gen: real web search for businesses with pain signals; high-fit hits get auto-intaked. |
| `/devlog [client] [window]` | This-week shipping activity (real GitHub commits) per delivering client via `gh`. |
| `/clickup <client>` | Push the client's delivery tasks (from `playbooks/`, plus extra items derived from any linked `recording:` meeting transcript) into a new ClickUp list named after them. |
| `/progress <client>` | Per-client delivery state: `## Scope` (delivered / in progress / pending), recent commits + ClickUp moves, next milestone. |
| `/performance [member]` | Team KPI view: utilization, revenue attributed, projects shipped, recent wins. Per member or whole team. |

That's the entire business. Find leads, research them, propose, book the call (Google Calendar + Meet), staff the team, push delivery to ClickUp, bill them, chase what's late, see what shipped this week, all in one place.

## You don't have to remember the commands

The slash commands are shortcuts, not the only way in. **Just talk in plain English, map what the user says to the right verb and do it.** Nobody should memorize a command list.

- "new lead, Bright Now Dental wants a receptionist, came from YouTube" → run `/intake`.
- "research them" / "what's their deal?" (about the current client) → run `/research`.
- "write them a proposal" / "send a quote" → run `/proposal`.
- "get the call booked" / "email them" → run `/kickoff`.
- "what's my pipeline?" / "how's the business looking?" / "what should I do next?" / "what's my margin?" → run `/status`.
- "import my clients from clients.csv" / "pull my list out of HubSpot" → run `/import`.
- "who's on my team?" / "who's free?" / "how loaded is everyone?" → run `/team`.
- "put Maya on Citywide for 2 hours a week" / "staff Devon on that build" → run `/assign`.
- "add a voice engineer named Maya at $65 an hour, 30 hours a week" → create `team/maya-chen.md` from `team/_template.md` (a hire; no dedicated command, just do it).
- "who owes me money?" / "what's unpaid?" / "any overdue invoices?" → run `/invoices`.
- "invoice Citywide for May" / "bill all active clients for June" → run `/invoice`.
- "mark INV-003 paid" / "Peak paid the May invoice" → update that row's `status` to `paid` and `paid_on` to today.
- "remind Peak about INV-003" / "chase the overdue ones" → run `/remind`.
- After any draft is shown, "send it" / "yes go" / "send" / "approved, send" → actually send via Resend (`node scripts/send-email.mjs`). Never send without that explicit confirm.
- "give me the morning brief" / "what's going on today?" / "wrap up the day" → run `/brief`.
- "find me dental practices in Austin with bad phone reviews" / "look for clients" → run `/prospect`.
- "what shipped this week?" / "show me Maya's commits" / "any stalled builds?" → run `/devlog`.
- "push Citywide's tasks to ClickUp" / "create the build tasks in ClickUp" → run `/clickup`.
- "where are we with Brookside?" / "what's left on Citywide?" / "status on <client>" → run `/progress`.
- "how's the team doing?" / "is Maya overloaded?" / "team KPIs" → run `/performance`.

If a request is ambiguous (e.g. which client or member), ask one short question. If it clearly maps to a verb, just do it, don't make the user phrase it as a command.

---

## Session start (auto-prime)

On every fresh session, before responding to the first message:

1. Read `business.md` (identity, mission, ICP, positioning, brand voice).
2. Read `goals.md` (north star, this-quarter targets, KPIs).
3. Read `services.md` (the catalog + pricing, needed for proposals and `/status` math).
4. Glob `clients/*.md` (skip `_template.md`) and read each one's `meta` block (including any `team:` assignments).
5. Glob `team/*.md` (skip `_template.md`) and read each member's `meta` block.
6. If `finance/invoices.md` exists, read the ledger (so AR is in context).
7. Return a one-screen snapshot: clients per stage, open pipeline value, signed MRR **vs the north star** from `goals.md`, net margin, AR outstanding + overdue, free team capacity, and the single most urgent next action (overdue invoices outrank everything). Under 130 words.

This primes you with the full operating context: who the agency is (business), where it's headed (goals), what it sells (services), the live pipeline (clients), the team (team), and what's owed (invoices). The detail breakdowns are what `/status`, `/team`, and `/invoices` print on demand.

---

## The client file (the unit of the CRM)

Every client is one file at `clients/<slug>.md`. The top is a fenced ` ```meta ` block that `/status` parses; the rest is freeform research + timeline. See `clients/_template.md`.

```meta
name:            Bright Now Dental
slug:            bright-now-dental
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
- `lead`, captured, not yet researched.
- `researching`, `/research` has run; findings are in the file.
- `proposal-sent`, `/proposal` generated a doc in `outputs/proposals/`.
- `call-booked`, `/kickoff` drafted outreach + put a hold on the calendar.
- `won`, closed; counts toward signed MRR.
- `delivering`, active build; counts toward signed MRR.
- `lost`, dead; excluded from pipeline value and MRR.

**Pipeline value** = sum of `deal_value` for clients in `lead`, `researching`, `proposal-sent`, `call-booked` (the open funnel).
**Signed MRR** = sum of `deal_mrr` for clients in `won` + `delivering`.

---

## The team (delivery side)

Every team member is one file at `team/<slug>.md` with a `meta` block: `name, slug, role, status (active/bench/inactive), rate (agency cost, USD/hr), capacity (billable hrs/week), skills`. See `team/_template.md`.

**Staffing** lives on the client, not the member, because margin is per-project. A client's `meta` block can carry a `team:` line listing assignments as `slug:hours_per_week`, comma-separated:

```
team: maya-chen:2, priya-nair:1
```

`/assign` writes this; `/team` and `/status` read it. Derived numbers (computed live, never stored):

- **Monthly team cost (client)** = Σ (`member.rate` × `hours_per_week` × 4). The ×4 is a deliberate weeks-per-month simplification so the math stays clean on screen.
- **Margin (client)** = `deal_mrr` − monthly team cost. Only meaningful for `won` + `delivering`.
- **Utilization (member)** = Σ their `hours_per_week` across all clients ÷ `capacity`. Over 100% = overallocated; 0% = on the bench.
- **Net margin (agency)** = total Signed MRR − total monthly team cost.

A client with no `team:` line has $0 cost (margin = full MRR) until you `/assign` someone.

---

## Finance (accounts receivable)

Invoices live in `finance/invoices.md`, a single markdown-table ledger. Each row has `id, client, amount, for, issued, due, status, paid_on`.

**Status set:** `draft`, `sent`, `paid`. **Never store `overdue`** as a status, it's derived live (status `sent` AND `due` is before today). Same discipline as pipeline totals and margin: source-of-truth fields are flat, expensive labels are computed when asked.

`/invoice` appends rows (single or bulk-bill all active clients for a month). `/invoices` shows AR (outstanding, overdue, due soon, drafts, recently paid). `/status` surfaces a one-line AR summary so the owner sees what's late without leaving the dashboard.

---

## Operating rules

- **Stay in the agency voice.** Proposals and emails sound like a senior operator at an AI agency: specific, confident, no filler, no hype, no emoji. Lead with the client's problem and the dollars, not the tech stack.
- **Price from `services.md`.** Never invent pricing. If a deal needs a custom number, base it on the catalog and say so.
- **One file is the source of truth per client.** When a command changes a deal, update that client's `meta` block (`stage`, `next_action`, and `deal_value`/`deal_mrr` if they firmed up) in the same pass. Never let the board drift from reality.
- **Ground research in real sources.** `/research` uses real web search. Cite what you found. Never fabricate reviews, addresses, or numbers, if you can't find it, say "couldn't confirm."
- **Price and cost from the files.** Pricing comes from `services.md`; team cost comes from each member's `rate` in `team/`. Never invent either.
- **Demo-safe by default.** Both `clients/` and `team/` ship empty. Two CSV exports (`clients.csv`, `team.csv`) sit at the repo root to `/import`. Rich per-entity content lives in `data/onboarding/{clients,team}/<slug>.md` sidecars that `/import` auto-merges when present. The demo email is `demo@example.com`. Real outreach (`/kickoff`, `/remind`) only fires against real contact details you add yourself.

- **Show drafted communications in the reply, then send on explicit confirm.** When a command drafts an email, SMS, or calendar invite (`/remind`, `/kickoff`, `/follow-up`, etc.), include the **full subject + body** verbatim in the reply. The user should never have to open Gmail/Calendar/their phone's SMS app to see what was written. The artifact also gets created as a Gmail draft (archived there), and then the rule is: **end the reply with "Want me to send it, or tweak it first?" and WAIT.** Only when the user explicitly confirms ("send", "yes go", "send it", etc.) do you actually send via `node scripts/send-email.mjs` (Resend; requires `RESEND_API_KEY` in `.env`). Never auto-send without an explicit confirmation in the immediately preceding user turn. If `RESEND_API_KEY` isn't set, fall back to "open Gmail and tap send" and tell the user to wire `.env.example` to get one-tap-send working.

- **Telegram replies, talk like a colleague (not a CLI dashboard).** When the incoming message is from the Telegram channel (you can tell from a `<channel source="telegram">` tag in the input), **never paste raw command output**. The CLI boards (`/status`, `/invoices`, `/team`, `/progress`, `/performance`, `/devlog`) are designed for a terminal, they look great there and read cold on a phone. Reformat them into prose:
   - Lead with the headline number or the one action that matters, in one sentence.
   - Short paragraphs (1-3 sentences each) separated by blank lines.
   - Names + amounts are load-bearing, keep them. Drop IDs, columns, and section banners.
   - End with a clear next step the user can confirm in one tap ("Want me to send the reminder?").
   - Plain text only. No emoji. No em dashes.
   - If the user explicitly says "show me the full board" or "give me the raw output", their ask overrides this rule.

   **Example.** A bad Telegram reply pastes the `/invoices` board verbatim. A good one says: *"You've got $1,500 outstanding right now, and $500 of that is already overdue. The chase is Peak Performance PT on INV-003, $500, 12 days late (was due May 16, for May support). Citywide HVAC owes another $1,000, but that's not due till Friday. There's also a $2,500 draft sitting for Summit Dental's setup deposit that you haven't sent yet. Want me to draft the reminder to Peak?"*
- **Be terse.** No preamble, no narration. Do the thing, show the result.

---

## Setup (for anyone who clones this)

1. Open this folder in Claude Code. That's it for the core, `/intake`, `/research`, `/proposal`, `/status` work out of the box (research uses built-in web search).
2. **Optional:** to let `/kickoff` draft real emails and calendar holds, connect the **Gmail** and **Google Calendar** integrations in Claude. See `.mcp.json` for notes. Without them, `/kickoff` writes the email + event details to the client file so you can send them by hand.
3. Make it yours: edit `business.md` (identity, ICP, voice), `goals.md` (north star, quarterly targets, KPIs), and `services.md` (offerings + pricing). The CRM and team roster both ship empty, run `/import clients.csv` and `/import team.csv` to fill them, then keep going with `/intake`, `/research`, etc.
