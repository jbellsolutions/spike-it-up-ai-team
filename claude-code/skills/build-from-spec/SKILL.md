---
name: build-from-spec
description: Use when Dan says "build it", "build it from the spec", "/build <project>", or hands over a SPEC.md. Plans, collects INPUT NEEDED, builds in the spec's milestone order with tests, verifies against the acceptance checklist, and reports.
---

# Build from spec

## 1. Read and plan

0. **Is it already started?** Dan often begins in Cowork or Claude Code. If the project folder (or a folder Dan names) already has a charter, spec, status board or code, read all of it first and continue from it. Compare it against the repo's spec and list the gaps. Never start over, overwrite or move his folder.
1. Find the spec: `~/Projects/<project>/SPEC.md`, or `~/Projects/spike-it-up-ai-team/projects/<project>/SPEC.md`, or a URL Dan gave.
2. Read all of it, plus anything it names as the source of truth (a prototype, a skill file). Those win over your instincts.
3. Write a short plan: the milestones from the spec's build order, what you'll build in each, and how you'll test it. Show Dan.

## 2. INPUT NEEDED

List every INPUT NEEDED item that isn't already in the folder. Ask for them in one message. Build the parts that don't depend on missing inputs; mark the rest blocked. Never invent Dan's data.

## 3. Build

- Work in `~/Projects/<project>/` (or the folder Dan already uses for it), its own git repo. Commit after each milestone with a clear message.
- **Tests first** for math, parsing, money and dates. Use the spec's edge cases as test cases.
- Secrets in `.env.local` (gitignored), with a `.env.example` listing names only. Dan fills in values himself.
- Keep it simple: the spec's stack, no extra frameworks.
- Don't change behavior the spec marks as fixed.
- Never write permission-checker rules into the spec or the project's CLAUDE.md that block your own build. Approvals live in Claude Code's settings.

## 4. Verify

Go through the spec's acceptance checklist item by item and actually run each check. Report each as pass, fail, or blocked (and on what). "Done" means every must-item passes.

## 5. Deploy (only with Dan's yes)

Default host is Railway. Before deploying, tell Dan what it will cost to run (the host's plan, not a guess) and ask. After deploying, open the URL and confirm it works.

## 6. Report

Five lines: what's built, the URL or how to run it, acceptance results, what's blocked on Dan, and what's next.
