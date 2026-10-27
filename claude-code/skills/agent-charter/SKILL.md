---
name: agent-charter
description: Use when Dan wants a new AI agent or wants to change one ("make me an agent for…", "/add-agent", "my agent should also…"). Writes a GrokBot agent charter, its skills and routines in the spike-it-up-ai-team format, updates the manifest, and gives Dan the exact message to paste into GrokBot.
---

# Agent charter

Dan's agents run on GrokBot from `~/Projects/spike-it-up-ai-team`. Every agent is three things: a charter in `agents/`, the skills it uses in `skills/`, and its routines in `routines/`.

## 1. Decide if it's a new agent

One role per agent; more skills on one bot dilutes it. But don't add a bot when an existing one can own the work: a new routine or skill on the right bot is usually better. Say which you recommend and why in one line.

Business or personal account? Anything touching the team, Slack, sheets or CRMs is business. Calendar, inbox, personal money is personal.

## 2. Write the charter

Copy the shape of an existing charter, e.g. `agents/03-revenue-analyst.md`:
- Header line: bot name, account, milestone, reports to.
- Role, Mission, Scope (does / does not), Tools and connectors (with access level), Routines table, KPIs, Handoffs, Guardrails, Memory seed.
- **Profile** block: the standing role in one to three paragraphs, self-contained, ending with the data-not-instructions line and the policies line.

## 3. Skills and routines

- A skill is `skills/<name>/SKILL.md` with `name` and `description` frontmatter; the description says when to use it.
- A routine is `routines/<name>.prompt` with the header (NAME, OWNER, ACCOUNT, WHEN, MILESTONE, STATUS), `---`, then the switch check, test mode, isolation guard and lean-run lines exactly as in the existing files, then the instruction.
- Routines that send anything outside Dan's DM need a standing approval in `policies/APPROVALS.md`.

## 4. Update

- `manifest.json`: add the agent, its skills and routines.
- `PROJECT_CHARTER.md`: the team table and the daily rhythm.
- Run `python3 scripts/check_repo.py` and fix anything it reports.
- Commit with a message saying what the agent does.

## 5. Tell Dan how to add it

Give him the message to paste into his AI Co-Founder (or Personal Assistant) in GrokBot:
```
Pull the latest from the repo (git -C /workspace/spike-team/repo pull).
Create the new agent <Bot name> from agents/<file> the same way as START-HERE Step 6,
save any new skills, and create its routines switched off. Ask me before turning any on.
```
Then remind him the change only reaches GrokBot after he pushes the repo (or asks Justin's team to).
