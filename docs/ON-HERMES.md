# Running these agents on Hermes instead

Everything in this repo is plain markdown: charters, skills, routines and specs. GrokBot is the default, but the same team runs on Hermes on Orgo. Use this page if Dan decides to stay on Hermes, or to run some agents there.

Give Dan's Hermes assistant this message:
```
Set up the agents in https://github.com/jbellsolutions/spike-it-up-ai-team as Hermes profiles,
following docs/ON-HERMES.md. Start with milestone 1. Ask me before anything goes live.
```

## How the pieces map

| In this repo (GrokBot) | On Hermes |
|---|---|
| A bot on the business account | A Hermes **profile** in the same Hermes install, with its own memory and tools. Dan's existing assistant stays the orchestrator and plays the AI Co-Founder |
| The charter's **Profile** block | The profile's system prompt / persona, word for word |
| **Memory seed** | The profile's first memories |
| `skills/<name>/SKILL.md` | A Hermes skill with the same name and description |
| `routines/*.prompt` | A Hermes cron job: the WHEN line is the schedule; the text below `---` is the job. Create it paused |
| `/workspace/spike-team/` | One shared folder on the Orgo computer, for example `~/spike-team/`. Replace the path in every routine |
| Ask first rules (Auto-review) | Hermes approval settings, with the same list from START-HERE Step 4. Where Hermes has no equivalent, the profile asks Dan in Slack before acting |
| Secure secret card / Take over | A secret file or environment variable on the Orgo box, typed in by Dan in the terminal. Never pasted into Slack or a chat |
| Slack connector (reading as Dan) | The Hermes Slack app's read scopes in each workspace |
| Spike Ops bot (posting) | The Hermes Slack app that already posts. One app posts, never two |
| `vault/` | An Obsidian vault folder on the Orgo box, synced to Drive nightly |

## Order

Same as GrokBot: AI Co-Founder duties and Funding Launch first, then Sales Manager and Revenue Analyst when Dan restarts the EOD and income work, then Call Bank.

Split a role into its own profile only when its job really differs, for example the funding business. A profile per role, all in one Hermes install, is enough. If Dan wants the funding business fully separate, it can get its own Orgo computer with its own Hermes, using `agents/05-funding-launch.md` as that agent's charter.

## What stays the same

The approvals in `policies/APPROVALS.md`, the data rules in `policies/DATA.md`, the fixed payout math, the EOD fixes, the parallel run before anything replaces a live job, and the rule that every job is created paused and turned on only after Dan says yes.
