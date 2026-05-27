---
description: Assign a team member to a client at a number of hours per week.
---

# /assign

Staff a team member onto a client's delivery. This is what powers utilization and margin.

**Arguments:** $ARGUMENTS (expected: `<member-slug> <client-slug> <hours-per-week>`, e.g. `maya-chen citywide-hvac 2`)

## Procedure

1. Parse the member slug, client slug, and hours/week from the arguments. If hours is missing, ask for it.
2. Confirm `team/<member-slug>.md` and `clients/<client-slug>.md` both exist. If either is missing, stop and say which.
3. Update the client's `meta` block `team:` field:
   - If there's no `team:` line, add one: `team: <member-slug>:<hours>`.
   - If the member is already listed, update their hours.
   - Otherwise append `, <member-slug>:<hours>`.
4. Add a one-line entry to the client's timeline: "Assigned <member name> at <hours> hrs/wk (<date>)."
5. **Sanity-check capacity:** after assigning, sum the member's hours across all clients. If it exceeds their `capacity`, warn that they're now overallocated (don't block it, just flag).

## Output

Confirm: who is now on which client at how many hours, their new utilization, and the client's updated margin (`deal_mrr` minus the monthly cost of all assigned members, where monthly cost = rate × hours/week × 4). Suggest `/team` or `/status`.
