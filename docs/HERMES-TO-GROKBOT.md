# Moving from Hermes to GrokBot

Dan's agents run today on Hermes, on an Orgo computer. His assistant lives in his own Slack workspace and reads the partner workspace, and it has GoHighLevel tools. This is how each piece moves to GrokBot without a day of double posts or missed EODs. **Nothing on Hermes is switched off until its GrokBot replacement has proven itself and Dan says yes.** If Dan decides to stay on Hermes, use `docs/ON-HERMES.md` instead. The charters work there too.

## What moves where

| Today (Hermes on Orgo, Claude, Cowork) | On GrokBot | Notes |
|---|---|---|
| Dan's Hermes assistant in Slack (first called "AI Co-Founder", since renamed) | **AI Co-Founder** (business account, pinned) | Keeps a different name until the Hermes assistant is retired, so Dan always knows who's talking. Meetings, reminders, the VA digest and "what did I make" move with it |
| "Dan's Biz Assistant" Hermes bot | Folded into **AI Co-Founder** (business) and **Personal Assistant** (personal) | One front door instead of two near-identical bots |
| EOD tracker cron jobs on the Hermes box (7:30 summary, 8:30 / 10:30 reminders, 12:30 VA message) | **Sales Manager** routines | Same times, plus the three bug fixes |
| EOD summary scheduled task in Claude (Cowork) | **Sales Manager** trend line and weekly leaderboard | No more manual runs or broken folder paths |
| Income Hub prototype (Claude artifact), now being rebuilt in Dan's own Claude Code folder | **Revenue Analyst** (daily numbers), reading Dan's Income Hub once it's live | The math is carried over unchanged |
| Contractor-hosted call grader | **Call Bank** + the pipeline in `projects/call-hub` | Dan owns the data |
| GHL skill / GHL Super Hub on the Hermes box, plus Claude Code building the funding business on Dan's Mac | **Funding Launch** with the GHL Super Hub, read-only while Claude Code builds | Its own seat and token. Claude Code keeps building; nobody builds twice |
| "Personal agent for scheduling" (planned Oct 23) | **Personal Assistant** (personal account) | |
| Financial OS (Claude Code folder + Drive CSV upload) | **Money Manager** (personal) + `projects/financial-os` | Monarch, Apple Notes |
| Hermes memory / vault | `vault/` (Obsidian) on each account, backed up to Drive | See `docs/OBSIDIAN-VAULT.md` |
| Hermes Slack apps (one in the partner workspace, one in Dan's own; an older one deactivated) | "Spike Ops" Slack app in the partner workspace (`docs/SLACK-SETUP.md`), or keep the Hermes app's bot token | One app posts. Never both. Remove the deactivated old app at api.slack.com/apps when Dan says |

## The parallel run (milestone 2)

The EOD summary is the only thing the team sees every day, so it moves carefully. It starts only when Dan restarts the EOD work.

0. **Check what's running on Hermes.** Dan paused the EOD work on his Hermes assistant on Oct 24. Message it: "List your cron jobs and say which are paused." Write the answer to `context/hermes-jobs.md`.
   - If the Hermes EOD jobs are running, compare against them, as below.
   - If they're paused, compare the preview against the VA's own numbers instead. The "pause the Hermes jobs" step at cutover then has nothing to do.
1. **Preview.** `context/eod-mode.md` says `preview`. The GrokBot Sales Manager builds the summary at 7:30 and sends it to Dan only. Reminders and the VA message are written to the daily note as "would have tagged…". Hermes keeps running exactly as it is.
2. **Compare.** Each morning the AI Co-Founder puts both summaries side by side in the brief (Hermes, or the VA's numbers) and marks every difference. Where they differ, the GrokBot one should be right because of the date/name/late-post fixes; Dan confirms.
3. **Cut over** after three summaries in a row match, or Dan says the GrokBot version is right where they differ. The AI Co-Founder asks: "Switch the team posts to GrokBot and pause the Hermes EOD jobs?" On Dan's yes:
   - Dan gives the five standing approvals in `policies/APPROVALS.md`.
   - **Pause the Hermes jobs first.** In Slack, message Dan's Hermes assistant: "List your cron jobs." Then: "Pause the EOD summary, the EOD reminders and the VA escalation jobs. Don't delete them." Confirm the list shows them paused. (Justin's team has access to Dan's Orgo workspace and can do this with Dan's OK.)
   - Then set `context/eod-mode.md` to `live`.
4. **Watch** the first three live days. If anything is off, set `eod-mode.md` back to `preview` and resume the Hermes jobs.

## The Orgo computer after cutover

It keeps running Dan's Hermes assistant and its GHL tools until he decides otherwise. Once the GrokBot team has run a full month close cleanly, Dan decides what's next. Either keep it as a backup box for Hermes, or stop it to save the hosting cost. Before stopping it, ask the Hermes agent to export its memory and skills to Drive.

## What GrokBot does differently (so nobody is surprised)

- **One computer per account.** Every bot on an account shares it. That's why business and personal are two accounts.
- **Approvals live in the app.** Ask first rules in Auto-review. An approval for a routine expires in about 10 minutes, so routines draft and stop instead of waiting.
- **Weekly usage meter.** Lean routines matter; see the usage budget in `PROJECT_CHARTER.md`.
- **Connectors sign in as Dan.** That's why team posts go through the team bot token instead.
- **Agents talk through files.** Dan's ask for agents that "talk to each other" is the shared workspace: every bot reads and writes the same `daily/`, `data/`, `requests/` and `vault/`.
