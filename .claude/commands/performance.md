---
description: Team KPI view. Utilization, revenue attributed, projects shipped, wins. Per member or whole team.
---

# /performance

How is the team actually performing? Derives KPIs from the live data + each member's own `## History` + `## Wins`.

**Arguments:** $ARGUMENTS (optional: a single member slug like `maya-chen`. Default: every active member.)

## Procedure

1. Glob `data/team/*.md` (skip `_template.md`). If a member slug was passed, restrict to that one.
2. For each member, parse the `meta` block (`rate`, `capacity`, `status`), the `## History` section (count past + current projects), and the `## Wins` section (latest 1-2 achievements).
3. **Compute live KPIs** by reading `data/clients/*.md`:
   - **Assignments today:** find every client whose `meta` `team:` field contains the member's slug; pull `hours_per_week`.
   - **Utilization** = Σ assigned hrs ÷ `capacity`. Flag over 100% (overallocated) and 0% (bench).
   - **Revenue attributed (MRR)** = Σ `deal_mrr` of the clients they're on (full MRR, not shared, treat them as the responsible engineer).
   - **Cost generated (monthly)** = Σ `rate × hours/week × 4` across all their assignments.
   - **Margin contribution** = the share of net margin their clients generate vs cost.
4. **Optional shipping signal** (last 7 days): if any of their assigned clients have a `repo:` set, attempt `gh api "repos/<owner>/<name>/commits?since=<ISO>&author=<git-email-or-name>"` to count their commits this week. If `gh` can't auth or the author doesn't match, omit gracefully.
5. **Render** per member, then a one-line agency total.

## Output format (illustrative, against the shipped seed)

```
AETHER AI / TEAM PERFORMANCE

MAYA CHEN, Voice / AI engineer
  Utilization:     4 / 30 hrs/wk (13%)
  Currently on:    Brookside Animal Hospital (2h), Citywide HVAC (2h)
  Revenue on:      $2,000 /mo MRR
  Cost generated:  $1,040 /mo
  Projects shipped (history): 3
  Recent win:      Shipped Brookside's inbound stack 2 days ahead of target (Apr 2026).

DEVON BROOKS, Automation engineer
  Utilization:     0 / 25 hrs/wk (0%) -- ON BENCH
  Currently on:    none
  Revenue on:      $0 /mo
  Cost generated:  $0 /mo
  Projects shipped (history): 1 (Verde)
  Recent win:      Built the n8n + Claude automation default (3 reuses).
  Note:            Capacity available; consider pulling him into a workflow-automation pipeline deal.

PRIYA NAIR, Client success / support
  Utilization:     2 / 20 hrs/wk (10%)
  Currently on:    Peak Performance PT (2h)
  Revenue on:      $500 /mo
  Cost generated:  $280 /mo
  Projects shipped (history): 3 (Brookside onboarding, Verde, Peak)
  Recent win:      100% Q1 client retention.

──────────────────────────────
AGENCY:  $2,500 /mo MRR on assigned clients, $1,320 /mo team cost, net margin $1,180 (47%).
         3 of 3 active members, 1 on bench, 6 hrs/wk assigned of 75 hrs/wk capacity (8% loaded).
```

## Notes

- "Revenue on" is the full MRR of clients the member is assigned to, treating them as the responsible engineer. If you'd rather pro-rate by hours, say so and recompute, the source data is the same.
- This is read-only. Never modifies team files.
- The `## History` and `## Wins` sections are what carry achievements over time, edit them when a member ships something notable so this view stays current.
