---
description: Push a client's delivery tasks into ClickUp as a list. Uses the matched service playbook from playbooks/.
---

# /clickup

Stand up a real ClickUp list for a client's delivery, populated with the standard tasks from the matching playbook.

**Arguments:** $ARGUMENTS (a client slug, e.g. `citywide-hvac`)

## Procedure

1. Read `clients/<slug>.md`. If the file doesn't exist, stop and say so. Pull the client's `name`, `service_interest`, and any `recording:` path.
2. **Match the service to a playbook** in `playbooks/`. Mapping:
   - `AI receptionist` → `playbooks/ai-receptionist.md`
   - `Voice agent (advanced)` / `Voice agent` → `playbooks/voice-agent-advanced.md`
   - `Workflow automation build` / `Workflow automation` → `playbooks/workflow-automation.md`
   - If no match, ask the user which playbook to use (or to create a new one in `playbooks/`).
3. Read the matched playbook. Extract every `- [ ] <task>` line; that's the **standard task list** to push.
4. **If the client has a `recording:`** pointing to a transcript file, read that file. Identify **project-specific scope items** the client and the agency agreed on: integrations to specific systems, custom flows, special handling, edge cases, voice/persona tweaks, language requirements. Build a second list of tasks from these, one task per concrete item. Prefix each with `[from kickoff]` so it's visually clear in ClickUp that it came from the meeting, not the standard playbook. If there's no `recording:`, skip this step.
5. **Resolve the ClickUp target** (where the new list goes):
   - Read `business.md` for a `clickup_space_id:` line.
   - If present, use that space. If a `clickup_folder_id:` is also present (recommended: a folder named "AgencyOS Deliveries"), create the list inside that folder; otherwise create it directly in the space.
   - If neither is set, this is **first-run setup**: call `clickup_get_workspace_hierarchy`, show the user the available spaces/folders, ask which to anchor on, and offer to write the chosen `clickup_space_id` (and optional `clickup_folder_id`) back to `business.md` under a new `## Integrations` section so subsequent runs are silent.
6. **Create the list**, name format: `<Business Name>, <Service>` (e.g. "Citywide HVAC, Voice Agent (Advanced)"). If a list with that exact name already exists, ask whether to add to it or skip (don't silently duplicate).
7. **Push the tasks** into the new list, **playbook tasks first (preserving order), then meeting-derived tasks** (each prefixed with `[from kickoff]`). Use the task text as the task name. Keep descriptions empty for v1.
8. After creation, **update the client file's `meta` block** to record the link: add `clickup_list:` with the ClickUp URL of the new list (so `/status` and `/devlog` can reference it later).
9. Add a one-line timeline entry: `"Pushed delivery tasks to ClickUp (<N_playbook> + <N_meeting> tasks, <playbook> playbook[, from <recording>]), <date>."`

## Output

State the playbook used, the recording (if any) used, the ClickUp list name + URL, and the breakdown of tasks created (e.g. "14 standard + 5 from kickoff"). Suggest opening the list to confirm.

## Notes

- **Idempotence:** if `clickup_list:` is already set on the client and the user runs `/clickup` again, ask whether to push to the existing list (e.g. as task updates) or create a fresh one. Don't blindly duplicate.
- **Honesty:** the playbook is the source of truth for what gets pushed. If the user wants different tasks for this specific client, edit the playbook (and it applies forward) or pass them ad-hoc ("/clickup citywide-hvac with these tasks: ...").
- **Workspace permissions:** ClickUp MCP needs the connector to be authorized in Claude. If it isn't, this command stops with a clear "connect ClickUp first" message rather than silently failing.
