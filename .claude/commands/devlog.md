---
description: Show this-week shipping activity (GitHub commits) per delivering client, so you see what actually got built.
---

# /devlog

What shipped this week. Pulls real commits from each delivering client's repo via the `gh` CLI.

**Arguments:** $ARGUMENTS (optional: a specific client slug, or a time window like "this week", "yesterday", "since Monday". Default: "this week".)

## Procedure

1. Glob `clients/*.md` (skip `_template.md`) and read each `meta` block. Pick those whose `stage` is `delivering` AND whose meta has a `repo:` field (format: `owner/name`). Skip the rest, they have no code to log.
2. If the user passed a specific client slug, restrict to that client.
3. Resolve the time window:
   - "today" → since 00:00 today.
   - "yesterday" → 00:00 yesterday to 00:00 today.
   - "this week" → since most recent Monday 00:00.
   - "last week" → previous Mon-Sun window.
   - "since YYYY-MM-DD" → that date.
   - Default → "this week".
4. For each (client, repo), call `gh` to list commits in the window:
   ```
   gh api "repos/<owner>/<name>/commits?since=<ISO>&until=<ISO>" \
     --jq '.[] | {sha:.sha[0:7], author:.commit.author.name, date:.commit.author.date, msg:(.commit.message|split("\n")|.[0])}'
   ```
   If `gh` is not authed or the repo isn't accessible, skip with a one-line note (`(no access to <repo>)`) instead of failing.
5. Render per client: client name + repo, then a list of commits (`<sha>  <date>  <author>: <subject>`). Group by author when there are many. Show a per-client count.
6. End with totals: total commits across the window, number of clients with shipping activity, and any delivering clients with `repo:` set that had **zero commits this week** (a flag, those builds may be stalled).

## Output format (illustrative)

```
AETHER AI / DEVLOG (this week, 2026-05-26 to 2026-05-30)

CITYWIDE HVAC, NaderTate/citywide-hvac-voice (8 commits)
  a3c1f02  Wed  Maya Chen: book appointment flow handles same-day requests
  d77b1aa  Wed  Maya Chen: cron job for ready-for-pickup texts
  e022c91  Tue  Maya Chen: webhook signature validation
  ...

APEX AUTO REPAIR, NaderTate/apex-auto-voice (3 commits)
  ...

────────────────────────────────
Total: 11 commits across 2 of 2 active builds.
No stalled builds this week.
```

## Notes

- Requires the `gh` CLI to be authed (`gh auth status` to check). If not, instruct the user to run `gh auth login` once, after that this command works for any repo they have access to.
- Honest about access: never invent commits. If you can't fetch, say so.
- Use only this for delivering builds. If the user asks "what did Maya ship this week", you can pivot: pull commits across all delivering repos and filter by author.
