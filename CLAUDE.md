# CLAUDE.md: working in this repo

This repo is Dan Lizarazo's AI team: a GrokBot agent team (START-HERE.md is what the bot follows), project specs for Claude Code (`projects/`), and Dan's Claude Code setup (`claude-code/`).

If Dan pasted the repo link and asked you to set up Claude Code, follow `claude-code/SETUP.md`. If he asked you to build a project, use `projects/<name>/SPEC.md` and the build-from-spec method in `claude-code/skills/build-from-spec/SKILL.md`.

## Rules for changing this repo

1. **No private data, ever.** No revenue figures, team names, Slack IDs, sheet links, client or offer names, transcripts, tokens or keys. Those belong in `CLIENT-CONTEXT.md` (gitignored) or on the bots' computers. Examples use placeholder names (Sam, Alex, Jordan).
2. **No dates or time estimates** in plans. Milestones and "done means" only. Routine schedules (7:30 AM) are fine; "launch in two weeks" is not.
3. **Plain language.** Short sentences. Dan reads on his phone.
4. **The payout math in `skills/offer-payout-math` and the parsing rules in `skills/eod-parsing` are fixed.** Change them only when Dan asks, and say what output changes.
5. **Keep the pieces in sync.** A new or changed agent touches its charter, `manifest.json`, `PROJECT_CHARTER.md` (team table and daily rhythm), its skills and its routines.
6. **Routine files** keep the exact header (NAME, OWNER, ACCOUNT, WHEN, MILESTONE, STATUS, `---`) and the switch check, test mode, isolation guard and lean-run lines.
7. **Anything team-facing** needs a standing approval in `policies/APPROVALS.md`.
8. Run `python3 scripts/check_repo.py` before committing. It checks the manifest, the routine headers, the Profile blocks and looks for things that shouldn't be public.

## Layout

```
START-HERE.md          GrokBot build steps (business and personal)
PROJECT_CHARTER.md     mission, team, rhythm, usage, milestones
agents/                one charter per bot (Profile block = the bot's standing role)
skills/                GrokBot private skills (SKILL.md each)
routines/              scheduled jobs, created paused
policies/              approvals and data rules
docs/                  Hermes → GrokBot, Slack setup + manifest, Obsidian vault
projects/              SPEC.md per project for Claude Code
claude-code/           Dan's Claude Code setup: SETUP.md, CLAUDE.md, settings.json, skills
.claude/commands/      /new-project, /build, /add-agent, /status
client-context/        how to fill the private CLIENT-CONTEXT.md (template only)
scripts/check_repo.py  consistency and privacy check
```
