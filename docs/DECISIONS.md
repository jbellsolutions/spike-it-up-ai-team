# Decisions that shaped this build

This ledger is for the repo: the decisions from Dan's calls and Slack that the charters are built on. The bots keep their own live ledger in `context/decisions.md` on their computer. That's where a decision Dan makes in chat goes, the same day. When one of those changes the build, Justin's team adds it here too.

Names and figures stay out of this public file. They're in Dan's private `CLIENT-CONTEXT.md`.

| Date | Decision | Who | What it changed in the repo |
|---|---|---|---|
| Sep 11, Oct 7, Oct 21 | Dan wants "every offer, every day, what did I make", read from each offer's own tracker | Dan | Revenue Analyst; `projects/income-hub` |
| Oct 7 | The sales side is moving from GoHighLevel to HubSpot. The funding business stays on GoHighLevel | Dan | HubSpot is read only, and nobody writes to it until Dan says |
| Oct 21 | Read each offer's sheet directly instead of having the VA merge them, so she gets no extra work | Justin | Revenue Analyst reads every tracker itself |
| Oct 21 | Three EOD tracker bugs to fix: a mistyped date counts as missed, a mistyped name isn't credited, and late or edited posts aren't shown | Dan | The `eod-parsing` skill and the late-EOD check |
| Oct 21 | Stay on one platform and stop switching tools | Justin | Superseded on Oct 27 (below) |
| Oct 23 | Stop the evening accountability check-in. Never recreate it | Dan | Not in any routine |
| Oct 23 | A separate personal assistant for scheduling and reminders | Dan | Personal account; Personal Assistant |
| Oct 24 | Launch the funding business first; get the assistant working second | Dan | Milestone 1 is the AI Co-Founder and Funding Launch |
| Oct 24 | Pause the EOD work and the Income Hub until Dan gives instructions | Dan | Sales Manager and Revenue Analyst are milestone 2 and aren't created until Dan says "start" |
| Oct 24 | Agents should stop reading channels unrelated to revenue and pay | Dan | Each bot reads only the channels listed for it (`policies/DATA.md` rule 9) |
| Oct 24 | The funding build already under way in Dan's Claude Code project continues. Nobody restarts it | Dan | Funding Launch tracks from Dan's status board, read only, until Dan hands GHL over |
| Oct 27 | Dan gets a GrokBot team built from this repo. It runs next to Hermes, not instead of it, and takes over one piece at a time after each piece passes its check and Dan says yes | Justin | Whole repo; `PROJECT_CHARTER.md` section 12; `docs/HERMES-TO-GROKBOT.md` |
| Oct 27 | Funding copy makes no claims about amounts, approval odds, score changes or timelines until counsel has reviewed it | Justin's team | Funding Launch guardrails; `context/funding-facts.md` |

## Still open (Dan decides)

- What "launched" means for the funding business.
- Whether the lead bot is renamed after Dan's Hermes assistant once the cutover is done.
- What the "@" and "Pace" lines mean in the EOD summary.
- Rep KPI targets, the purchase-review threshold, protected family time.
- Which jobs stay on Hermes for good.
