---
name: spec-writer
description: Use when Dan says "spec this out", "write a spec", "turn this into a project", or describes something he wants built that's bigger than a quick fix. Interviews him briefly and writes a SPEC.md (charter, requirements, data, integrations, INPUT NEEDED, acceptance, build order) for his approval before any code.
---

# Spec writer

Dan's method: Claude talks it out and writes the spec; Claude Code builds from the spec. A spec is good when another Claude session could build it without asking Dan anything except the INPUT NEEDED items.

## 1. Gather (one round, five questions max)

Read what Dan already said, his `~/.claude/CLAUDE.md`, and any related spec in `~/Projects/spike-it-up-ai-team/projects/`. Then ask only what's missing, in one message:
1. What does "done" look like: what will you see or stop doing?
2. Who uses it, and where (phone, Mac, Slack, GrokBot)?
3. Where does the data come from today (sheet, Slack channel, CRM, a person)?
4. What must it never do?
5. Anything already decided (tool, host, format)?

If Dan says "just write it", write it with your best assumptions and list them at the top under **Assumptions to confirm**.

## 2. Write

Use the template at `~/Projects/spike-it-up-ai-team/projects/_template/SPEC.md`. Rules:
- **Charter first**: what, why (in Dan's words when you have them), users, done means, decisions already made.
- Requirements as a table, each "must" or "should".
- **INPUT NEEDED**: every file, link, login or decision only Dan can give.
- **Acceptance**: checkboxes a person can verify, at least one against real data. For anything with money or dates, list the edge cases as tests.
- **Build order**: milestones, smallest working piece first. **No dates or time estimates.**
- Say where it runs: Claude Code builds; GrokBot or Railway runs anything recurring.
- No private data in the spec (revenue, names, links, IDs). Point to Dan's private context instead.
- Keep it as short as it can be. Dan said an earlier generated spec was "way too much": cut anything a builder doesn't need.

## 3. Save and confirm

- New project: `~/Projects/<name>/SPEC.md` (create the folder, `git init`). If it belongs in the shared repo, also offer to add it under `projects/<name>/` there.
- Show Dan a five-line summary and ask: "Build it, change it, or park it?"
