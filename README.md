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

## How it's structured

```
agency-os/
├── CLAUDE.md            # the OS brain: agency identity, rules, auto-prime
├── services.md          # your services + pricing (proposals price from this)
├── clients/             # one markdown file per client = your CRM (ships empty)
│   └── _template.md
├── clients.csv          # sample client list, try /import on it
├── team/                # one markdown file per team member (rate, capacity)
│   ├── _template.md
│   └── maya-chen.md, devon-brooks.md, priya-nair.md   # sample roster
├── outputs/proposals/   # generated proposals land here
└── .claude/commands/    # the commands above
```

Each client file has a fenced ` ```meta ` header (stage, deal value, MRR, next action, and team assignments) that `/status` parses, followed by freeform research notes and a timeline. Team members are staffed onto clients via a `team:` line in that header (`slug:hours-per-week`), which is what powers utilization and margin.

## Setup

1. **Clone and open in Claude Code.** The core works immediately, `/intake`, `/research`, `/proposal`, `/status`, and `/import` need nothing but Claude Code (research uses built-in web search).
2. **See it populated:** the CRM ships empty. Run `/import clients.csv` (or say "import my clients from clients.csv") to fill it with a sample pipeline, then try `/status`.
3. **Optional, for `/kickoff`:** connect the **Gmail** and **Google Calendar** integrations in Claude so it can draft real emails and calendar holds. Without them, `/kickoff` writes the email + event details into the client file to send by hand.

## Make it yours

The CRM ships empty with a sample `clients.csv` and a fictional agency identity ("Aether AI") so you can see it working in one import. To make it your own: set `AGENCY_NAME` in `CLAUDE.md`, replace `services.md` with your offerings + pricing, and import or `/intake` your own clients. No real data, no keys, `/kickoff` only sends against contact details you add yourself.

---

Built as a walkthrough for the video **"I Turned Claude Code Into the OS That Runs My AI Agency."** Free to clone and use.
