# CLAUDE.md: working in this repo

This repo is Dan Lizarazo's AI team: a GrokBot agent team (START-HERE.md is what the bot follows), the same team for Better than GrokBot on Dan's Mac (INSTALL.md), project specs for Claude Code (`projects/`), and Dan's Claude Code setup (`claude-code/`).

If Dan pasted the repo link and asked you to install Better than GrokBot or load his team into it, follow `INSTALL.md` (`AGENTS.md` is the brief). If he asked you to set up Claude Code, follow `claude-code/SETUP.md`. If he asked you to build a project, use `projects/<name>/SPEC.md` and the build-from-spec method in `claude-code/skills/build-from-spec/SKILL.md`.

## Rules for changing this repo

1. **No private data, ever.** No revenue figures, team names, Slack IDs, sheet links, client or offer names, transcripts, tokens or keys. Those belong in `CLIENT-CONTEXT.md` (gitignored) or on the bots' computers. Examples use placeholder names (Sam, Alex, Jordan).
2. **No dates or time estimates** in plans. Milestones and "done means" only. Routine schedules (7:30 AM) are fine; "launch in two weeks" is not.
3. **Plain language.** Short sentences. Dan reads on his phone.
4. **The payout math in `skills/offer-payout-math` and the parsing rules in `skills/eod-parsing` are fixed.** Change them only when Dan asks, and say what output changes.
5. **Keep the pieces in sync.** A new or changed agent touches its charter, `manifest.json`, `PROJECT_CHARTER.md` (team table and daily rhythm), its skills and its routines. A changed Profile also changes the charter's `<!-- btg-role -->` block (500 characters at most). After any change to the manifest, a charter or a routine, run `node scripts/build-team.mjs` to rebuild `team.json`. Never edit `team.json` by hand.
6. **Routine files** keep the exact header (NAME, OWNER, ACCOUNT, WHEN, MILESTONE, STATUS, `---`) and the switch check, test mode, isolation guard, lean-run and run-record lines. A routine that reads a source says what to do when it can't: "unknown" with the reason, and nothing sent to the team.
7. **Anything team-facing** needs a standing approval in `policies/APPROVALS.md`.
8. Run `python3 scripts/check_repo.py` and `node scripts/verify.mjs` before committing. The first checks the manifest, the routine headers, the Profile blocks and looks for things that shouldn't be public. The second checks `team.json` and the Better than GrokBot limits.

## Layout

```
START-HERE.md          GrokBot build steps (business and personal)
INSTALL.md             Better than GrokBot install, run by Claude Code or Codex
AGENTS.md              brief for Claude Code and Codex: what to follow for each ask
team.json              what the Better than GrokBot installer creates (built, never edited)
PROJECT_CHARTER.md     mission, team, rhythm, usage, milestones
agents/                one charter per bot (Profile block = the bot's standing role; btg-role = its Better than GrokBot role)
skills/                GrokBot private skills (SKILL.md each)
routines/              scheduled jobs, created paused
policies/              approvals and data rules
docs/                  build record, decision ledger, Hermes → GrokBot, Slack setup + manifest, Obsidian vault
projects/              SPEC.md per project for Claude Code
claude-code/           Dan's Claude Code setup: SETUP.md, CLAUDE.md, settings.json, skills
.claude/commands/      /new-project, /build, /add-agent, /status
client-context/        how to fill the private CLIENT-CONTEXT.md (template only)
scripts/check_repo.py  consistency and privacy check
scripts/build-team.mjs builds team.json (btg-team.mjs holds the shared helpers)
scripts/install-team.mjs  loads team.json into a running Better than GrokBot
scripts/verify.mjs     checks team.json and the Better than GrokBot limits
```
