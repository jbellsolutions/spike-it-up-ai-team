# Dan Lizarazo: how I work with Claude Code

## Who I am
I run sales for several offers (setters and closers) and I'm paid a percentage of cash collected on each. I'm also launching my own funding business: funding first, credit repair when someone can't get funded yet. My AI team runs on GrokBot (and my Hermes agent on Orgo while I move over). Claude Code is where things get built.

My repo of specs, charters and agents: https://github.com/jbellsolutions/spike-it-up-ai-team (local copy: `~/Projects/spike-it-up-ai-team`).

## How to talk to me
- Answer first, then the why. Short. I read on my phone a lot.
- Numbers before words.
- When something is my call, ask one clear question with your recommendation.
- Don't explain basics. Do explain anything that costs money or can't be undone.

## Claude vs my GrokBot team
- **Claude Code builds**: apps, dashboards, webhooks, scripts, websites, specs.
- **GrokBot runs**: the daily routines, my morning brief, EODs, income, calls, the funding launch.
- If I ask for something that should run every day, build it so a GrokBot routine (or a scheduled job on Railway) runs it, then tell me which.

## How we build
0. **Continue, don't restart.** I often start a project in Cowork or Claude Code before I bring it here. If a folder already has a charter, spec, status board or code, read it first and carry on from it. Never start over, never overwrite, never move my project folders.
1. **Spec before code.** For anything bigger than a quick fix, write or update `SPEC.md` (charter, requirements, INPUT NEEDED, acceptance, build order) using the spec-writer skill, and get my yes.
2. **Ask for INPUT NEEDED first.** Don't guess my data, my offers or my comp.
3. **Plan, then build** in the spec's build order. Smallest working piece first.
4. **Tests for anything that does math or parses money and dates.** My income numbers must match my sheets exactly.
5. **Milestones, not dates.** Never give me time estimates; tell me what's done and what's next.
6. **Verify before you say done.** Run it, show me the result.
7. **Don't block yourself.** Never write permission-checker rules into a spec or a project's CLAUDE.md that stop your own build. Approvals live in my Claude Code settings.
8. **One folder per project.** Side work goes in a new chat, a fork or a worktree. Merge it back only when I say.

## Money and data rules
- The payout math in `skills/offer-payout-math` is fixed. Never "improve" it.
- My income, my team's numbers and call transcripts are private. Never put them in a public repo, a URL, or a third-party form.
- Keys go in `.env.local` (gitignored) or the app's own settings. Never ask me to paste a key into chat. If I paste one by accident, remind me to rotate it.
- Nothing deletes my data. Archive or move.
- Nothing sends to my team, clients or leads without my yes.
- For GoHighLevel you may use my logged-in Chrome when the API can't do it and I've said so. Never type my password anywhere.

## Defaults
- Model: Opus 5.5 at medium effort for building. Don't switch to a slower or bigger model unless the problem has never been solved before.
- I brief you by voice (Wispr Flow) or with a Loom link. Read the Loom's transcript and what's on screen.
- Hosting: Railway. Database: Postgres (SQLite to start is fine).
- Projects live in `~/Projects/<project-name>/`, each its own git repo.
- Memory for my agents is an Obsidian vault. Search can sit on top; the markdown stays the source of truth.
