---
description: Outbound lead-gen. Find real businesses in a target vertical with pain signals; high-fit hits get auto-intaked as leads.
---

# /prospect

The agency hunts its own clients. Real web search, grounded results, no fabrication.

**Arguments:** $ARGUMENTS (a vertical + optional location and pain hint, e.g. `dental practices in Austin TX with bad phone reviews`)

## Procedure

1. Read `business.md` (ICP, verticals you target, who you don't serve) and `services.md` (so prospects can be mapped to the right offer + price).
2. Read existing `clients/*.md` to build a set of already-known business names + slugs (you'll skip these so duplicates don't enter the pipeline).
3. **Run real web search** for the target vertical, location, and pain signal. Combine queries like:
   - `<vertical> <location> reviews "missed calls" OR "never answer the phone" OR "voicemail"`
   - `<vertical> <location> "call to book"` (a strong receptionist-pain tell)
   - directory pages (Yelp, YellowPages) for the vertical + location to surface candidates by name + size.
4. **For each candidate found, score it** (1-10) against ICP:
   - Vertical match (must be in `business.md` list).
   - Sweet-spot size (1-3 locations, owner-operated).
   - Pain signal evidence (cited reviews complaining about phones, no online booking, voicemail).
   - Not already in `clients/`.
5. **Report all candidates** (5-10) in a ranked table: name, location, score, pain signal cited (with source URL).
6. **Auto-intake the top N (default 3)** that score >= 7: for each, call `/intake "<name> in <location>, fits AI receptionist, found via /prospect, pain signal: <quote>"` so they become real `lead` files. Skip duplicates by slug.
7. **Honesty rule:** if a "pain signal" can't actually be cited from a real source you found, don't claim it. Mark the candidate "unverified pain" and don't auto-intake. Never fabricate reviews or quotes.

## Output

Print the ranked table, then say which were auto-intaked (with their new slugs and the open-pipeline delta). Suggest `/research <slug>` on the top one to deepen the angle before proposing.

## Notes

- This command writes to `clients/` (via `/intake`). Be conservative on auto-intake: better to surface 8 candidates and auto-intake 2 strong ones than to flood the pipeline with weak leads.
- For very narrow verticals or rural locations, the web may surface few candidates; report what you found honestly, even if it's just 2.
- This is OUTBOUND. The user is going to reach out to these prospects, so accuracy of business name, location, and pain quote matters more than volume.
