---
description: Where are we with a specific client? Renders delivery state, scope progress, recent activity, and the next milestone.
---

# /progress

The per-client drill-down. Answers "where are we with X?" without scrolling six tools.

**Client slug:** $ARGUMENTS

## Procedure

1. Read `data/clients/<slug>.md`. If it doesn't exist, stop and say so.
2. Pull from the `meta` block: `stage`, `deal_value`, `deal_mrr`, `team:` (assignments), `repo:`, `recording:`, `clickup_list:`.
3. **Parse the `## Scope` section** if it exists. Expected layout:
   - `### Delivered`, `### In progress`, `### Pending` subsections, each with `- [x]` or `- [ ]` items.
   - Count items per bucket; collect their text.
   - If the client doesn't have a `## Scope` section, say so and skip the scope breakdown (don't fabricate).
4. **Compute margin** for this client (if `won`/`delivering`): for each `team:` entry, multiply `member.rate × hours/week × 4` → monthly cost. Margin = `deal_mrr` − cost.
5. **Recent activity** (last 7 days):
   - **Commits:** if `repo:` is set, call `gh api "repos/<owner>/<name>/commits?since=<ISO>" --jq '.[] | {sha, msg: (.commit.message|split("\n")|.[0]), date: .commit.author.date}'` for the last 7 days. List up to 5; show count of any beyond.
   - **ClickUp:** if `clickup_list:` is set AND the ClickUp connector is available, fetch the list's task statuses. Report counts (done / in progress / todo) and any tasks that moved status this week.
   - **Timeline:** the last 3 entries from the client file's `## Timeline` section, dates included.
   Each subsource is best-effort. If a source isn't accessible, say so on one line (`(no gh access)` / `(ClickUp not connected)`) instead of failing.
6. **Decide the next milestone.** Priority order:
   - If anything is `## In progress`, the next milestone is shipping the most-active in-progress item (the one mentioned most recently in the timeline).
   - Else if anything is `## Pending`, the next milestone is starting the highest-priority pending item.
   - Else (everything Delivered): the next milestone is "Ship the recurring-support cadence + monthly check-in."

## Output format (illustrative, against Brookside)

```
BROOKSIDE ANIMAL HOSPITAL / PROGRESS

Stage:    delivering   |  $5,000 setup + $1,000/mo   |  margin $480/mo (48%)
Team:     Maya Chen, 2 hrs/wk
Repo:     NaderTate/vet-voice-agent-memory
Recording: data/recordings/brookside-kickoff-2026-03-12.md

SCOPE (9 items: 4 delivered, 2 in progress, 3 pending)

  Delivered (4)
    [x] 24/7 inbound answering (live 2026-04-08)
    [x] Returning-client recognition by phone number
    [x] Appointment booking against the eVetPractice calendar
    [x] Cancellation + reschedule flow

  In progress (2)
    [ ] Outbound vaccination reminders (in staging since 2026-05-21)
    [ ] SMS confirmations + reminders via Twilio

  Pending (3)
    [ ] Waitlist auto-fill on cancellation
    [ ] Practice-management deeper integration (eVetPractice write-back)
    [ ] Spanish-language routing

RECENT ACTIVITY (7d)
  Commits:   4 (latest: "vaccination reminder cron, retry on no-answer", Maya, 2026-05-25)
  ClickUp:   (no clickup_list set)
  Timeline:  2026-05-25 reminder cron deployed to staging
             2026-05-15 outbound reminder logic merged to staging
             2026-04-22 cancel + reschedule shipped

NEXT MILESTONE
  Ship outbound vaccination reminders from staging to production (UAT with Dr. Park this week).
```

## Notes

- This command is read-only. It never modifies client files.
- The scope-tracking is only as good as the `## Scope` section the user maintains. The intent is for the owner (or Claude) to mark items `[x]` as they ship. If you want this automated, the next step is wiring `/clickup`'s task-status changes back into the client's `## Scope` items.
- If multiple sources disagree (e.g., scope says "in progress" but ClickUp says "done"), report both and let the user reconcile.
