# Playbook: Workflow Automation Build

The standard build for the **Workflow Automation Build** offer in `services.md` ($1,500-5,000 setup). Scoped per process; this playbook is the generic frame, edit the task list per engagement to match the actual workflow being automated.

## Estimated effort

- Calendar: 1-2 weeks per workflow.
- Build hours: ~10-30 hrs total depending on complexity and integrations.
- Recurring support: optional, typically a small monthly retainer for monitoring + tweaks.

## Tasks (in order)

- [ ] Discovery call: walk the current workflow step by step, identify the in/out edges, name the systems involved.
- [ ] Map the target workflow in one page (before / after, what the AI replaces, what stays human).
- [ ] Set up the integration credentials and access (API keys, OAuth, shared mailbox, etc.).
- [ ] Build the core automation (scheduled job, webhook, or agent).
- [ ] Build the failure / fallback path (what happens when the AI is unsure or an upstream system is down).
- [ ] Add observability (logs / notifications to the owner) so failures surface within minutes, not days.
- [ ] Run end-to-end with 5 real inputs from the client; confirm output matches their human baseline.
- [ ] Client UAT: walk the owner through behavior, edge cases, how to read the logs.
- [ ] Go live; let it run for a week with daily check-ins.
- [ ] Document the workflow in a one-page README for the client.
- [ ] Hand over: monthly support contract (if scoped) or off-board with a clean cutover.
