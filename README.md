# AgencyOS

**The operating system for an AI services agency, running entirely inside [Claude Code](https://claude.com/claude-code).**

No CRM subscription. No project-management SaaS. No database. The whole agency is a folder of markdown files, and Claude is the operator that runs sales and delivery for you:

```
/intake "Bright Now Dental, wants an AI receptionist, found me on YouTube"
/research bright-now-dental
/proposal bright-now-dental
/kickoff bright-now-dental
/status
```

Add a lead, research the business, send a scoped + priced proposal, book the call, track delivery, without leaving the terminal. `/status` reads every client file and prints your live pipeline value and signed MRR. It's just text files, and it tells you the financial state of your business and the next move on every deal.

**You don't have to remember any of this.** The slash commands are shortcuts; the real interface is plain English. Say "new lead, Bright Now Dental wants a receptionist" or "what's my pipeline look like?" and it does the right thing.

**Already have an agency?** You don't start from scratch, `/import data/clients.csv` lifts your existing client list (a CSV export from any CRM, or a connected one like HubSpot/Notion) into the system in one pass. Try it with the included `data/clients.csv`.

**It runs delivery too, not just sales.** A team lives in `data/team/`; staff people onto active clients with `/assign`, and `/status` shows your **margin** (revenue minus team cost), plus `/team` shows who's loaded and who's free.

**And it tracks the money.** Invoices live in `data/finance/invoices.md`; `/invoice` bills a client (or all active clients for a month), and `/invoices` shows what's outstanding, what's overdue, what's due soon, all derived from the ledger so "overdue" is never stale.

---

## The commands (or just talk to it)

| Command | Say it like | What it does |
| --- | --- | --- |
| `/intake "<lead blurb>"` | "new lead: ..." | Turn a raw lead into a structured client file under `data/clients/`. |
| `/research <slug>` | "research them" | Web-research the prospect, append findings + a tailored angle to their file. |
| `/proposal <slug>` | "write them a proposal" | Draft a scoped, priced proposal into `outputs/proposals/`. |
| `/kickoff <slug>` | "get the call booked" | Draft the outreach email + a kickoff/discovery calendar hold. |
| `/status` | "what's my pipeline / margin?" | Render the pipeline + pipeline value, signed MRR, and net margin. |
| `/import <csv>` | "import my clients" | One-time: lift an existing client list (CSV or a connected CRM) into the CRM. |
| `/team` | "who's free?" | Show the roster, each person's utilization, and who's on which client. |
| `/assign <member> <client> <hrs>` | "put Maya on Citywide" | Staff a team member onto a client (drives utilization + margin). |
| `/invoices` | "who owes me?" | Show AR: outstanding, overdue (derived), due soon, drafts, recently paid. |
| `/invoice <client> [for] [amount]` | "invoice Citywide for May" | Create an invoice (or bulk-bill all active clients for a month). |
| `/remind <INV-id>` | "chase the overdue ones" | Draft a payment-reminder email; tone scales with how late it is. |
| `/brief` | "what's going on today?" | Morning brief: pipeline movement, AR, top 3 actions, anchored to `context/goals.md`. |
| `/prospect <vertical>` | "find me dental practices in Austin" | Outbound lead-gen via real web search; high-fit hits auto-intake. |
| `/devlog [client] [window]` | "what shipped this week?" | This-week shipping (real GitHub commits) per delivering client via `gh`. |
| `/clickup <client>` | "push Citywide's tasks to ClickUp" | Create a ClickUp list for the client and populate it from the matching `context/playbooks/` file. |
| `/progress <client>` | "where are we with Brookside?" | Per-client delivery state: scope progress, recent commits, ClickUp tasks, next milestone. |
| `/performance [member]` | "how's the team doing?" | Team KPI view: utilization, revenue attributed, projects shipped, recent wins. |

## How it's structured

```
agency-os/
├── CLAUDE.md            # the OS brain: rules, auto-prime, command routing
├── context/             # the CONTEXT layer: WHO/WHERE/WHAT + how you deliver (read every session)
│   ├── business.md      # WHO you are: identity, mission, ICP, positioning, brand voice
│   ├── goals.md         # WHERE you're going: north star, quarterly targets, KPIs
│   ├── services.md      # WHAT you sell: catalog + pricing (proposals price from here)
│   └── playbooks/       # HOW you deliver: canonical task list per service
│       ├── ai-receptionist.md
│       ├── voice-agent-advanced.md
│       └── workflow-automation.md
├── data/                # the DATA layer: the live records the agency runs on
│   ├── clients/         # WHO you serve: one md per client = your CRM (SHIPS EMPTY)
│   │   └── _template.md
│   ├── clients.csv      # CRM-style export of clients to /import
│   ├── team/            # WHO does the work: one md per team member (SHIPS EMPTY)
│   │   └── _template.md
│   ├── team.csv         # CRM-style export of team members to /import
│   ├── finance/
│   │   └── invoices.md  # WHO OWES you: the AR ledger
│   ├── recordings/      # WHAT YOU AGREED: meeting transcripts (kickoffs, scope calls), linked from a client's recording: field; /clickup derives extra tasks from them
│   └── onboarding/      # optional rich sidecars merged on /import (Scope, Research, History, Wins)
│       ├── clients/     #   one per slug, used when the CSV row lands
│       └── team/
├── outputs/proposals/   # generated proposals land here
└── .claude/commands/    # the commands above
```

The files in `context/` (`business.md`, `goals.md`, `services.md`, plus the `playbooks/`) are the **context layer**, Claude reads them every session so it knows who you are, what you're going for, and how you deliver. The **data layer** under `data/` holds the live records: clients, team, recordings, finance, and the import seeds. `data/clients/` and `data/team/` ship empty, you populate them by importing the two CSV exports (`/import data/clients.csv`, `/import data/team.csv`). For clients or team members whose situation needs richer content than a CSV row can carry (a full `## Scope`, a `## History`, a `## Wins` section), drop a markdown file at `data/onboarding/{clients,team}/<slug>.md` and `/import` will merge it into the body automatically.

## Setup

1. **Clone and open in Claude Code.** The core works immediately, `/intake`, `/research`, `/proposal`, `/status`, and `/import` need nothing but Claude Code (research uses built-in web search).
2. **See it populated:** the CRM and the team roster both ship empty. Run two imports:
   - `/import data/clients.csv` (or "onboard my clients from data/clients.csv") to fill the pipeline.
   - `/import data/team.csv` (or "onboard my team") to fill the roster.
   Then try `/status`, `/team`, `/progress brookside-animal-hospital`, `/performance`.
3. **Optional, for `/kickoff`:** connect the **Gmail** and **Google Calendar** integrations in Claude so it can draft real emails and calendar holds. Without them, `/kickoff` writes the email + event details into the client file to send by hand.
4. **Optional, for one-tap-send (`/remind`, `/kickoff` actually sending instead of just drafting):** copy `.env.example` to `.env`, drop in a [Resend](https://resend.com) API key as `RESEND_API_KEY`, and optionally `RESEND_FROM="Your Agency <addr@verified-domain>"`. After that, any drafted email shown in the chat can be sent with a simple "send it" reply, via `scripts/send-email.mjs`. Without a verified domain, Resend lets you send only from `onboarding@resend.dev` (good for testing).

## Make it yours

The repo ships with a fictional agency identity ("Aether AI") in `context/business.md`, a sample strategy in `context/goals.md`, an empty CRM, and a sample `data/clients.csv` to import. Three files make it yours:

1. **`context/business.md`** sets your identity, mission, ICP, positioning, brand voice.
2. **`context/goals.md`** sets your north star, this-quarter targets, and the KPIs you care about.
3. **`context/services.md`** sets your offerings + pricing.

Then import or `/intake` your own clients. No real data, no keys, `/kickoff` only sends against contact details you add yourself.

---

Built as a walkthrough for the video **"I Turned Claude Code Into the OS That Runs My AI Agency."** Free to clone and use.
