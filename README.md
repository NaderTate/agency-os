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

**Already have an agency?** You don't start from scratch, `/import clients.csv` lifts your existing client list (a CSV export from any CRM, or a connected one like HubSpot/Notion) into the system in one pass. Try it with the included `clients.csv`.

**It runs delivery too, not just sales.** A team lives in `team/`; staff people onto active clients with `/assign`, and `/status` shows your **margin** (revenue minus team cost), plus `/team` shows who's loaded and who's free.

**And it tracks the money.** Invoices live in `finance/invoices.md`; `/invoice` bills a client (or all active clients for a month), and `/invoices` shows what's outstanding, what's overdue, what's due soon, all derived from the ledger so "overdue" is never stale.

---

## The commands (or just talk to it)

| Command | Say it like | What it does |
| --- | --- | --- |
| `/intake "<lead blurb>"` | "new lead: ..." | Turn a raw lead into a structured client file under `clients/`. |
| `/research <slug>` | "research them" | Web-research the prospect, append findings + a tailored angle to their file. |
| `/proposal <slug>` | "write them a proposal" | Draft a scoped, priced proposal into `outputs/proposals/`. |
| `/kickoff <slug>` | "get the call booked" | Draft the outreach email + a kickoff/discovery calendar hold. |
| `/status` | "what's my pipeline / margin?" | Render the pipeline + pipeline value, signed MRR, and net margin. |
| `/import <csv>` | "import my clients" | One-time: lift an existing client list (CSV or a connected CRM) into the CRM. |
| `/team` | "who's free?" | Show the roster, each person's utilization, and who's on which client. |
| `/assign <member> <client> <hrs>` | "put Maya on Citywide" | Staff a team member onto a client (drives utilization + margin). |
| `/invoices` | "who owes me?" | Show AR: outstanding, overdue (derived), due soon, drafts, recently paid. |
| `/invoice <client> [for] [amount]` | "invoice Citywide for May" | Create an invoice (or bulk-bill all active clients for a month). |

## How it's structured

```
agency-os/
├── CLAUDE.md            # the OS brain: rules, auto-prime, command routing
├── business.md          # WHO you are: identity, mission, ICP, positioning, brand voice
├── goals.md             # WHERE you're going: north star, quarterly targets, KPIs
├── services.md          # WHAT you sell: catalog + pricing (proposals price from here)
├── clients/             # WHO you serve: one md per client = your CRM (ships empty)
│   └── _template.md
├── clients.csv          # sample client list, try /import on it
├── team/                # WHO does the work: one md per team member (rate, capacity)
│   ├── _template.md
│   └── maya-chen.md, devon-brooks.md, priya-nair.md   # sample roster
├── finance/
│   └── invoices.md      # WHO OWES you: the AR ledger
├── outputs/proposals/   # generated proposals land here
└── .claude/commands/    # the commands above
```

The top three files (`business.md`, `goals.md`, `services.md`) are the **context layer**, Claude reads them every session so it knows who you are and what you're going for. Each client file has a fenced ` ```meta ` header (stage, deal value, MRR, next action, team assignments) that `/status` parses, plus freeform research and a timeline. Team members are staffed onto clients via a `team:` line in that header (`slug:hours-per-week`), which powers utilization and margin.

## Setup

1. **Clone and open in Claude Code.** The core works immediately, `/intake`, `/research`, `/proposal`, `/status`, and `/import` need nothing but Claude Code (research uses built-in web search).
2. **See it populated:** the CRM ships empty. Run `/import clients.csv` (or say "import my clients from clients.csv") to fill it with a sample pipeline, then try `/status`.
3. **Optional, for `/kickoff`:** connect the **Gmail** and **Google Calendar** integrations in Claude so it can draft real emails and calendar holds. Without them, `/kickoff` writes the email + event details into the client file to send by hand.

## Make it yours

The repo ships with a fictional agency identity ("Aether AI") in `business.md`, a sample strategy in `goals.md`, an empty CRM, and a sample `clients.csv` to import. Three files make it yours:

1. **`business.md`** sets your identity, mission, ICP, positioning, brand voice.
2. **`goals.md`** sets your north star, this-quarter targets, and the KPIs you care about.
3. **`services.md`** sets your offerings + pricing.

Then import or `/intake` your own clients. No real data, no keys, `/kickoff` only sends against contact details you add yourself.

---

Built as a walkthrough for the video **"I Turned Claude Code Into the OS That Runs My AI Agency."** Free to clone and use.
