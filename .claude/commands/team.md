---
description: Show the team roster, each person's utilization, and who's on which client.
---

# /team

Your delivery team at a glance, with how loaded each person is.

## Procedure

1. Glob `data/team/*.md` and read each one **except `_template.md`**. Parse the `meta` block (name, role, status, rate, capacity, skills).
2. Glob `data/clients/*.md` (skip `_template.md`) and read each `meta` block's `team:` field. It lists assignments as `slug:hours_per_week`, comma-separated (e.g. `team: maya-chen:2, priya-nair:1`). Build, per team member, the list of clients they're on and the hours on each.
3. **Compute per member:**
   - **Assigned hours/week** = sum of their hours across all clients.
   - **Utilization** = assigned hours ÷ `capacity`, as a percentage. Flag anyone over 100% (overallocated) and anyone at 0% (on the bench).
4. **Render the roster**, active members first (then bench, then inactive). One block per member: name, role, utilization (assigned/capacity), and the clients they're on with hours. Close with a one-line summary: total team capacity, total assigned, and free capacity (how many more hours/week the team can take on).

## Output format (illustrative)

```
AETHER AI / TEAM

Maya Chen, Voice / AI engineer          7% utilized (2 / 30 hrs/wk)
  - citywide-hvac        2 hrs/wk
Devon Brooks, Automation engineer       0% utilized (0 / 25 hrs/wk)   ON BENCH
Priya Nair, Client success / support   10% utilized (2 / 20 hrs/wk)
  - peak-performance-pt  2 hrs/wk

──────────────────────────────
Team capacity: 75 hrs/wk   Assigned: 4 hrs/wk   Free: 71 hrs/wk
```

(This matches the demo staffing in `/status`: Maya on Citywide, Priya on Peak. If nobody is assigned yet, show each member at 0% and note the bench, that's the expected state before you `/assign` anyone.)
