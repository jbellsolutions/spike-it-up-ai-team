---
name: vault-notes
description: Use whenever you save something the team should remember: daily notes, people, offers, calls, decisions. Also use for the nightly vault backup to Google Drive. The vault is the team's shared memory and Dan reads it in Obsidian.
---

# Vault notes

The vault is `<workspace>/vault/`, an Obsidian vault: plain markdown files with `[[wikilinks]]`. Dan opens it in Obsidian from his Google Drive copy and sees exactly what the team remembers. Layout and setup: `docs/OBSIDIAN-VAULT.md`.

## Rules

1. **One fact, one place.** Update the existing note instead of making a near-duplicate. Search first.
2. **Link liberally.** People, offers and calls are linked by `[[Name]]`. A link to a note that doesn't exist yet is fine.
3. **Daily note.** Every agent adds one line per notable event to `Daily/<YYYY-MM-DD>.md` under its own heading. Not every routine run; only what's worth remembering.
4. **Frontmatter** on people, offers, calls and decisions: `type`, `updated`, and the fields in the templates below.
5. **No secrets.** No tokens, passwords, bank or ID numbers, ever.
6. **Corrections.** When Dan corrects a fact, fix the note and add `Corrected <date>: <old> → <new>` at the bottom.

## Templates

People (`People/<Name>.md`):
```markdown
---
type: person
role: closer | setter | VA | client | partner | priority
slack: U…            # in the workspace copy only
updated: 2026-10-27
---
# <Name>
- Notes:
- Calls: (backlinks)
```

Offers (`Offers/<Offer>.md`): `type: offer`, rate, kind, netOfAds, tracker type. Money figures stay in `Money/`.

Decisions (`Decisions/<YYYY-MM-DD> <slug>.md`): what was decided, by whom, why, what it replaces.

## Backup

The nightly backup copies every note changed since the last backup to the Google Drive folder "Spike AI Vault" (business) or "Dan Personal Vault" (personal), same paths. It never deletes in Drive. It records the last backup time in `log/vault-backup.txt`. If the Drive connector can't write, it says so in the brief once.
