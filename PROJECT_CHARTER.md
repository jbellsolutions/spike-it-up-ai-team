# Project Charter: Dan's AI Team on GrokBot

**Owner:** Dan Lizarazo · **Builder:** Justin Bellware's team · **Coordinator:** AI Co-Founder · **Destination:** Grok Bot (x.ai/bot) on a fresh business account, with an optional personal account · **Timezone:** America/New_York for every schedule. Event and log timestamps keep UTC as well.

This charter defines how the team is meant to work. Loading it grants no permission to send, spend or switch anything on. Every routine starts paused, and each one goes live only after Dan's yes (`START-HERE.md` Step 9). Where this charter and Dan's current instructions differ, Dan's current instructions win. The dated decisions behind it are in `docs/DECISIONS.md`. What is built, verified and still blocked is in `docs/BUILD-RECORD.md`.

## 1. Mission

Dan runs sales for several offers and is paid a percentage of cash collected on each. His day is eaten by things a system should do:
- compiling EODs;
- chasing reps who didn't post;
- checking every offer's sheet to know what he made;
- scanning Slack so he doesn't miss a priority ping;
- remembering what happened on every call.

He's also launching his own funding business.

The team takes that work. Success means:
- His funding business launches and real referrals start going through it.
- Dan opens one message each morning and knows four things: yesterday's numbers, what he made, who's behind, and what needs his yes.
- His meetings get booked and his reminders show up without him tracking them.
- He can ask for any number ("average sets per setter, Monday to Friday, since the 1st") and get it in under a minute, without asking the VA.
- His notifications can go off, because the team tells him who pinged him, priority people first.
- Every sales call he owns is filed, graded and searchable, in systems he owns.
- His Hermes assistant keeps running until each GrokBot piece has proven itself. Nothing is switched off on day one.

Dan makes the decisions. The agents do the repeatable work and draft everything else. Nothing here promises a number of leads, a launch date or a dollar result.

## 2. Who this is for

- **Dan.** Runs the offers, the setters and the closers. Reads on his phone. Wants short answers and numbers, not essays.
- **Dan's VA.** Today she compiles EODs by hand and chases late posts. With the team she checks the numbers instead of building them. She also gets the escalation when a rep still hasn't posted.
- **Setters and closers.** They post an EOD in Slack every day. They see only the EOD summary, the reminders and, if Dan approves it, the leaderboard. They never drive the bots.
- **Justin's team.** Supports the build and joins a shared channel. They never get Dan's passwords.

## 3. Operating principles

1. **One voice to Dan.** The AI Co-Founder is the only bot that messages Dan unasked, apart from each specialist's own scheduled report, named in its routines (the EOD summary and its corrections, the leaderboard, the weekly income review, the month close, the call insights). Everything else goes in the bot's daily note in `daily/`, and the Co-Founder turns them into one morning brief.
2. **Files, not wake-ups.** Agents hand work to each other through files in the shared workspace. Each handoff is one file with one owner. A bot never wakes another just to ask a question; it reads the other bot's note or data instead.
3. **One writer per outside system.** Each Slack channel, calendar, GoHighLevel account and Drive folder has exactly one bot allowed to change it (section 5). Everyone else reads.
4. **Nothing goes out without a yes.** The team-facing messages run on standing approvals Dan gives once, for exact templates (`policies/APPROVALS.md`). If a template changes, its approval ends. Anything new waits for his yes.
5. **Read the source, never a copy.** Income comes straight from each offer's own tracker or Dan's Income Hub, never from scanning Slack channels. EODs come straight from the EOD channels.
6. **The math is fixed.** The payout formulas and sheet-reading rules in `skills/offer-payout-math` were debugged against Dan's real sheets and reconcile to the penny. Agents never "improve" them.
7. **Unknown is not zero.** A run that didn't happen, a sheet that didn't load or a post that may not have gone out is reported as exactly that. It's never reported as "no change" or "0".
8. **Memory is an Obsidian vault.** Everything the team learns goes into `vault/` as linked markdown notes: daily notes, people, offers, calls. Dan can open it in Obsidian and see exactly what the team remembers (`docs/OBSIDIAN-VAULT.md`).
9. **Own the data.** Calls, transcripts, numbers and notes live in Dan's Google Drive and Dan's vault, not a contractor's cloud.
10. **Lean on usage.** Every routine has limits and stays silent when nothing changed. No routine polls in a loop.
11. **Build in Claude Code, run on GrokBot.** Apps get built in Claude Code from the specs in `projects/`: the Income Hub page, the call hub's webhook, the funding business's forms. The bots run the daily work around them.

## 4. The team

### Business account

| Agent | Role in one line | Milestone |
|---|---|---|
| [AI Co-Founder](agents/01-ai-cofounder.md) | Pinned lead. Morning brief, approvals, routing, "who pinged me", meetings, reminders, the VA digest, Friday session prep | 1 |
| [Funding Launch](agents/05-funding-launch.md) | Tracks the funding launch from Dan's own project files, watches GoHighLevel read-only while Claude Code builds, drafts follow-up | 1 |
| [Sales Manager](agents/02-sales-manager.md) | Reads every EOD, posts the 7:30 summary, chases missing posts, updates late ones, flags who's behind, answers any number | 2 |
| [Revenue Analyst](agents/03-revenue-analyst.md) | Reads every offer's tracker (or Dan's Income Hub) daily and works out what Dan made per offer, with a monthly projection; checks reported cash against billing | 2 |
| [Call Bank](agents/04-call-bank.md) | Files every call into Drive and the vault, grades sales calls, answers "what happened on…" | 3 |
| [CRM Coach](agents/90-reserved-crm-coach.md) | Reserved, not a completed role. HubSpot guide during the move, lead touch-count gaps, contact cards | 3 |
| [Reactivation Desk](agents/91-reserved-reactivation-desk.md) | Reserved, not a completed role. Dormant-lead reactivation, if Dan restarts it | Later |

### Personal account (optional)

| Agent | Role in one line |
|---|---|
| [Personal Assistant](agents/06-personal-assistant.md) | Pinned lead. Calendar, scheduling, inbox drafts, tomorrow's prep |
| [Money Manager](agents/07-money-manager.md) | Reads Monarch exports and your notes; answers "can I afford this?"; monthly review |

Roles are jobs, not extra machines. Don't create a bot for each offer or each brand. One bot carries one role, and a new bot appears only when a role's job really differs.

```
                         Dan (phone)
                             │
                      AI Co-Founder  ◄── reads <workspace>/daily/*
        ┌──────────────┬─────┴────────┬──────────────┬──────────────┐
  Funding Launch  Sales Manager  Revenue Analyst  Call Bank      CRM Coach
  (GHL, launch)   (Slack EODs)   (offer sheets)   (calls)        (HubSpot, later)
        └──────────────┴──── vault/ (Obsidian: shared memory) ──┴──────────────┘
```

## 5. Who writes what (one writer each)

One bot changes each record or outside system. Everyone else reads it, or asks its owner through `requests/`. While Hermes still runs, Hermes and GrokBot never write the same thing. Paths are in the account's workspace.

**Business account** (`/workspace/spike-team/`)

| Record or outside system | Only writer | Rules |
|---|---|---|
| Messages to Dan he didn't ask for (brief, scans, reminders) | AI Co-Founder | A specialist may send Dan only its own scheduled report, named in its routines, plus a one-line "unknown" notice when its source can't be read. Any bot answers Dan in its own chat when he asks there |
| Posts in team Slack channels | Sales Manager, as the team bot | Standing-approved templates only, each logged in `log/sent.md`. Hermes stops posting first (`docs/HERMES-TO-GROKBOT.md`) |
| Business calendars (invites, holds) | AI Co-Founder | Only after Dan's yes. Every bot may read free/busy |
| GoHighLevel, funding sub-account | Claude Code on Dan's Mac while the build runs; Funding Launch after Dan hands GHL over | Never both at once. Funding Launch reads only until the handover |
| GoHighLevel, Dan's other locations; HubSpot | Nobody until Dan says | Read only |
| Offer trackers, the billing sheet | Nobody on the team | Read only |
| Drive `Calls/` | Call Bank | Moves files from `Inbox` to `Done`. Never deletes |
| Drive vault backup | AI Co-Founder | Nightly. Adds and updates, never deletes |
| `context/owner.md`, `priority-people.md`, `digest-channels.md`, `ping-mutes.md`, `reminders.md`, `last-ping-scan.txt`, `routine-registry.md`, `decisions.md`, `hermes-jobs.md` | AI Co-Founder | Updated when Dan says or corrects something |
| `context/routines-on.md`, `context/standing-approvals.md` | AI Co-Founder | Only with Dan's yes, in his words |
| `approved/`, `daily/<date>/brief.md`, `vault/Sessions/` | AI Co-Founder | |
| `requests/<agent>/` | The bot asking writes the request; the bot it's addressed to closes it | One task, one owner |
| `context/offers.md` | AI Co-Founder at setup; the Revenue Analyst from milestone 2 | Only with Dan's yes. Never both |
| `context/funding-launch.md`, `ghl-locations.md`, `funding-facts.md`, `funding-brain-dump.md`, `daily/<date>/funding.md`, `vault/Funding/` | Funding Launch | `funding-facts.md` holds only Dan's words, after counsel's review |
| `data/eod/`, `context/eod-roster.md`, `eod-format.md`, `eod-mode.md`, `kpi-targets.md`, `daily/<date>/sales.md`, `vault/Sales/` | Sales Manager | Except `vault/Sales/Objections.md`. `eod-mode.md` and `kpi-targets.md` change only on Dan's yes |
| `data/income/`, `context/offer-trackers.md`, `offer-status.md`, `daily/<date>/revenue.md`, `vault/Money/` | Revenue Analyst | |
| `vault/Calls/`, `vault/Sales/Objections.md`, `context/call-rubric.md`, `call-channels.md`, `daily/<date>/calls.md` | Call Bank | |
| `log/<YYYY-MM>.md`, `log/sent.md`, `log/incidents.md`, today's vault daily note | Every bot, its own lines | Add lines; never edit another bot's |

**Personal account** (`/workspace/dan-personal/`, its own computer)

| Record or outside system | Only writer | Rules |
|---|---|---|
| Messages to Dan he didn't ask for; personal calendars; email drafts | Personal Assistant | Nothing sent, accepted or booked without Dan's yes |
| `context/`, `daily/`, `vault/` | Personal Assistant | Except the Money Manager's files below |
| `requests/<agent>/` | The bot asking writes the request; the bot it's addressed to closes it | One task, one owner |
| `context/money-rules.md`, `pending-purchases.md`, `daily/<date>/money.md`, `vault/Money/` | Money Manager | `money-rules.md` changes only on Dan's yes |
| Drive `Financial OS/` | Nobody: Dan uploads | Read only |
| `log/<YYYY-MM>.md`, `log/incidents.md` | Every bot, its own lines | Add lines; never edit another bot's |

A calendar connected to both accounts is written from one of them only, the one named in `context/owner.md`. The two accounts never hand work to each other: they're separate computers.

**GrokBot fact that shapes this.** Every bot on one account shares one computer, its files, its browser sessions and its command-line credentials. A bot's screen is not a security boundary. So any bot *could* read the team bot token file, and "sole writer" is a rule the bots follow, not a lock. Three things back it up:
- Dan's Ask first rules (`START-HERE.md` Step 4);
- the sent-actions ledger (section 6);
- each bot's Profile.

That's also why the personal account is separate: business bots can never see Dan's personal money.

## 6. Records (one owner each)

These are the team's working records, in `<workspace>`. Consumers read the owner's copy; nobody keeps a second version.

| Record | Path | Owner | What it holds |
|---|---|---|---|
| Routine registry | `context/routine-registry.md` | AI Co-Founder | One row per routine: name, owning bot, schedule in plain words, timezone, repo file and version, on / paused / test, last readback date |
| Routine switch | `context/routines-on.md` | AI Co-Founder, on Dan's yes | Which routines may run (`on`) or run as a test (`test`). Anything not listed stops at its switch check |
| Run log | `log/<YYYY-MM>.md` | Each routine appends its own line | One line per run: time, routine, and **done**, **no change**, **not switched on**, **blocked** (why) or **failed** (why), with counts. No line means the run **didn't happen**, and the morning brief says so |
| Sent-actions ledger | `log/sent.md` | The writer for that system (section 5) | Action key, where it went, template and version, Slack timestamp or other receipt, status (`SENT`, `FAILED`, `UNKNOWN`) |
| Approvals | `approved/<date>.md`, `context/standing-approvals.md` | AI Co-Founder | Dan's exact words, time, the exact item or template version approved, and any revocation |
| Decisions | `context/decisions.md` | AI Co-Founder | Every decision Dan makes in chat: what, when, what it replaces |
| Requests | `requests/<agent>/<date>-<slug>.md` | The requester writes it; the owner closes it | One task, one owner, a result or a precise blocker |
| Daily notes | `daily/<date>/<agent>.md` | Each agent | What it did, what changed, what's blocked, "no change" when nothing did |
| Shared memory | `vault/` | Each agent, its own folders | Linked notes Dan can open in Obsidian |

**No double posts.** Every team-facing post has its own key: `<report date>|<channel>|<template>|<version>|<target>`, where the target is the rep's Slack user ID for a tag, `va` for the VA message, `summary` for the summary, and the run time (`1503` or `2003`) for a corrected summary. Before posting, the writer checks `log/sent.md` for that key. If it's there as `SENT`, the writer stops. If a post's result is `UNKNOWN` (a timeout, a crash), the writer first reads the channel back. If the post is there, it records the timestamp. If it isn't, it posts once. It never posts twice just because it lost the reply.

## 7. Approvals

- **Standing approvals** (`policies/APPROVALS.md`) cover exact templates: the EOD summary, reminder 1, reminder 2, the VA message and the corrected-summary thread reply. Each names its template version. If the template changes, the approval ends and the new version needs a fresh yes. Revoking an approval stops anything already queued under it.
- **Everything else** waits for Dan's own words in his chat with the bot that will act, for the exact item shown. A changed item needs a new yes.
- **Ask first rules** in GrokBot (Settings → General → Auto-review → Custom Rules) stop matching actions on every bot. Ask first always wins over Allow automatically.
- **When an approval prompt shows**, GrokBot offers Allow once, Always allow or Deny. Choose **Allow once** for anything outward-facing. **Always allow** saves a rule that would skip future checks.

## 8. Usage and limits

Grok Bot comes with X's Premium, Super and Ultra plans. Usage comes from a weekly pool shared with Grok and Cursor; Super and Ultra pools are larger than Premium. Use beyond the pool is paid from prepaid credit. Check **Settings → Usage & Billing**, or **Weekly usage** in the account menu.

- **Milestone 1** is about eight scheduled runs a day, and most end in seconds with "no change". Premium handles it. If the meter runs short, run one priority scan a day instead of three.
- **Milestone 2** adds about ten more a day. Super or Ultra fits both comfortably. On Premium, run one late-EOD check a day instead of two.
- **Pause order** when usage runs short before the reset:
  1. priority scans down to one;
  2. late-EOD checks down to one;
  3. the weekly income review;
  4. Friday prep.

  The launch check, the EOD summary, the reminders and the income sync stay on longest.
- **Every bot has limits per run** in its charter's Operating contract, and some routines repeat them (call intake's 10 calls, the brief's 150 words, the ping scan's 10 lines):
  - how many messages, rows or files it may read;
  - how many it may send;
  - how many retries it gets.

  A retry never gets a fresh allowance. If the input is bigger than the limit, the bot takes the part its contract names (the oldest calls first, the newest messages first), says what's left, and the next run picks it up. It never guesses at what it didn't read.
- **GrokBot's own limits:**
  - up to 50 routines per bot;
  - schedules at least five minutes apart;
  - only the 20 most recent runs kept per routine.

  One-time reminders are deleted after they fire, so they don't pile up. The run log (`log/<YYYY-MM>.md`) is the long-term record.
- **Unattended routines can pause themselves.** After a long absence, GrokBot may ask whether to keep routines running, and pauses them if nobody answers. The morning brief lists any routine that's paused but should be on.
- **If usage runs out,** scheduled work stops. Nothing queued is lost. The brief reports what was skipped once usage returns, and never reports a skipped run as "no change".

## 9. What it does for you, how you use it, how it's measured

| Area | What it does | How you use it | How it's measured |
|---|---|---|---|
| Morning brief | One message at 7:47 AM: what needs your yes, yesterday's cash and what you made, who's behind, priority pings, the launch, the VA digest, today's calls and reminders | Read it, reply "approve 1, 3" or "skip 2" | Delivered every day; approvals older than a day: zero |
| Meetings and reminders | Finds open slots across all your calendars, drafts the invite with a Zoom link, reminds you of things | "Find 30 minutes with Sam next week", "remind me at 3 to call Jordan" | Three slots offered in one message; reminders on time |
| Funding launch | Daily launch status from your own project files, GHL watched read-only while Claude Code builds, follow-up drafts | Do the owner steps it lists; approve drafts | Launched; every form lands in a pipeline; every referral tagged |
| Priority pings | Who pinged you, priority people first, with a one-line gist and a link | Turn notifications off; read the scan | Priority pings seen within the scan window |
| EOD summary | 7:30 AM in your format: cash, closes, booked, live calls, offers, setter numbers, the five rates, MTD / week / today | Read it. Late posts update it and you get one heads-up | Every day, including weekends; matches the VA's numbers |
| Missing EODs | Tags missing reps at 8:30 and 10:30, then messages the VA at 12:30 | Nothing; it runs on your standing yes | Reps missing at 12:30, per week |
| Rep health | Weekly leaderboard and on track / yellow / behind per rep, against your KPI targets | Read Monday's scorecard, talk to the reds | Delivered every Monday |
| Ask any number | Answers from Slack history and the trackers: "average sets per setter Mon–Fri since the 1st" | Ask the AI Co-Founder in plain words | Answer in under a minute, with the method shown |
| Income | Cash and your payout per offer, every day, with month-to-date, projection and paid / invoiced / projected | Read the income line in the brief; ask "what did I make this week?" | Numbers reconcile with each offer's tracker |
| Payment check | Reported cash vs what billing shows, mismatches flagged | Read the flag, decide | Mismatches caught before payroll |
| Calls | Every call filed in Drive and the vault, graded, objections logged, recap drafted | Ask "what did the prospect say about price on Tuesday's call?" | Calls filed; grade and objections on every sales call |

## 10. Milestones

No dates. The order follows Dan's own priorities from the Oct 24 call. Each milestone starts only when all three hold:
- Dan asks for it;
- the milestone before it has run cleanly for five weekdays in a row;
- the weekly usage meter has room.

**Milestone 1: the launch and the front door.** AI Co-Founder, Funding Launch.
- The funding launch is tracked daily from Dan's own status board. Claude Code keeps building; the bot never rebuilds.
- GoHighLevel is watched read-only. Forms that land in no pipeline, and referrals with no first touch, are flagged.
- The priority ping scan replaces watching notifications.
- Meetings are booked across all of Dan's calendars, and reminders arrive on time.
- The VA's posts come as a three-line digest in the brief.

**Milestone 2: the numbers run themselves.** Sales Manager, Revenue Analyst, when Dan restarts the EOD and income work.
- The EOD summary runs in preview next to Hermes, or next to the VA's numbers if the Hermes jobs are paused. It takes over the team posts only after Dan's yes (`docs/HERMES-TO-GROKBOT.md`).
- The three EOD bugs are fixed: wrong date, wrong name, late edits.
- Every offer's tracker parses, or the Revenue Analyst reads Dan's own Income Hub. The daily income line is in the brief.
- Dan can ask for any number.

**Milestone 3: calls and CRM.** Call Bank, then CRM Coach.
- Every call lands in Drive and the vault, owned by Dan, with grades and objections.
- HubSpot guidance during the move; lead touch-count gaps once the move is done.
- Closes by source once the CRM records it.

**Alongside, in Claude Code:** the funding business build (already under way), the Income Hub (Dan's own folder), the call hub pipeline, Jarvis and the Financial OS, from `projects/`.

## 11. Daily rhythm (Eastern Time)

| Time | Who | What | Days |
|---|---|---|---|
| 6:07 | Funding Launch | GHL health check (read only) | Weekdays |
| 7:47 | AI Co-Founder | Morning brief | Every day |
| 9:07 | Funding Launch | Launch check, until Dan marks it launched | Weekdays |
| 9:17, 12:47, 4:17 | AI Co-Founder | Priority ping scan | Weekdays |
| Fri 2:47 PM | AI Co-Founder | Prep for the Friday session with Justin | Weekly |
| 11:41 PM | AI Co-Founder | Nightly vault backup to Google Drive (silent) | Every day |
| Any time | AI Co-Founder | One-time reminders Dan asks for | As set |
| Milestone 2 | Revenue Analyst | Income sync 6:41; Mon 8:21 weekly income review; the 1st at 8:37 month close | Daily, weekly, monthly |
| Milestone 2 | Sales Manager | EOD summary 7:30; reminders 8:30 and 10:30; VA message 12:30; late check 3:03 and 8:03 PM; Mon 8:07 leaderboard | Every day, weekly |
| Milestone 3 | Call Bank | Call intake at 1:07 and 6:07 PM (or as soon as the recorder's webhook fires); Friday 11:07 call insights | |

## 12. Moving off Hermes, and rolling back

Dan's Hermes assistant on Orgo keeps running throughout. The order of work:
1. **Inventory first.** Ask the Hermes assistant which jobs it runs, and which are paused, and write the answer to `context/hermes-jobs.md`. Record its Slack apps and GHL tools. Nothing on Hermes is changed to do this.
2. **Preview next to it.** Each GrokBot piece first runs where only Dan sees it: the EOD summary in preview, the scans and briefs to Dan only.
3. **Cut over one piece at a time,** after its acceptance check passes and Dan says yes. The Hermes job for that piece is paused, not deleted, *before* the GrokBot piece starts posting. Two systems never post to the team at the same time.
4. **Roll back** by doing the same steps in reverse:
   - set `eod-mode.md` back to `preview`, or pause the GrokBot routine;
   - check `log/sent.md` so nothing gets posted twice;
   - resume the paused Hermes job.

   Rolling back never resends what already went out.
5. **Nothing is deleted** on either side without a separate yes from Dan for that exact item.

Details: `docs/HERMES-TO-GROKBOT.md`. To run the same charters on Hermes instead: `docs/ON-HERMES.md`.

## 13. Acceptance

Each check records the date, what was expected, what happened, PASS or HOLD, and who owns the next step. A check described in a document is not a check that passed. Checks run with made-up data and messages go to Dan only, unless Dan approves a live test.

| Check | Pass means |
|---|---|
| Ownership | Every active role is assigned to one bot; every outside system in section 5 has one writer; no two bots post to the same place |
| Switch and test mode | A routine not listed in `routines-on.md` stops at its switch check; a `test` run messages only Dan |
| Honest run status | A run with nothing new logs "no change"; a switched-off run logs "not switched on"; an unreadable source logs "blocked" with the reason and reports "unknown", never $0 or "nobody missing"; a run with no line shows as "didn't run" under Broken in the next brief |
| No double posts | Running the EOD summary twice for the same day posts once; a post with an `UNKNOWN` result is read back before any retry |
| Approval tied to version | Editing a standing-approval template stops posts under it until Dan approves the new version; revoking stops queued posts |
| Reminders | "Remind me at 3 to call Sam" fires once at 3 PM Eastern to Dan only, then its routine is removed |
| Meetings | "Find 30 minutes with Jordan next week" offers three slots free on every connected calendar and sends nothing |
| Funding watch | A test form submission that lands in no pipeline is flagged; nothing in GHL changes |
| Copy check | A draft that promises an approval, an amount, a score change or a timeline is rejected |
| Revenue source | "What did I make yesterday?" is answered from a tracker or the Income Hub, never from scanning Slack channels |
| EOD fixes (milestone 2) | Wrong typed date credited by post time and flagged; wrong typed name credited to the poster and flagged; an edit after the summary updates it with one heads-up |
| Payout math (milestone 2) | `$62,500` reads as 62500; a bare "Jan 1" takes the row's year cell; net-of-ads offers pay on cash minus ads; Slack-tracked offers count only "CASH COLLECTED" messages |
| Cutover and rollback (milestone 2) | Three matching preview summaries before cutover; the Hermes job paused before GrokBot posts; rollback resumes Hermes without reposting |

## 14. Out of scope

- Moving money, paying anyone, changing billing or payroll. The team flags; Dan pays.
- Hiring, firing or disciplining reps. The team flags who's behind; Dan has the conversation.
- Quoting funding amounts, approval odds, credit outcomes or results to anyone. Funding and credit-repair claims are regulated; drafts stay factual and Dan approves every one.
- Logging in as Dan, pulling session cookies, or getting around a permission or a security check.
- Paid lead-enrichment services. Agents research with the tools they have.
- Changing the offer trackers, deleting anything anywhere, or sending to a lead or client without Dan's yes.

## 15. Definition of done for setup

- The AI Co-Founder and Funding Launch exist with their profiles, skills and memory seeded.
- Slack (reading as Dan), Google Calendar (every account he books from), Drive and Sheets are connected, and the read-only first look passed.
- The Funding Launch bot reads the GHL sub-account with its own read-only token, and has built the checklist from Dan's status board.
- Dan added the Ask first rules in Auto-review → Custom Rules.
- Every milestone 1 routine:
  - exists and is listed in `context/routine-registry.md` with a readback;
  - ran once as a test that messaged only Dan and left one line in the run log;
  - is on only after Dan said yes.
- The first morning brief arrived, and the section 13 checks for milestone 1 are recorded as PASS or HOLD with owners.
- Milestone 2 has its own done list in START-HERE Step 11: the EOD summary matched three times in a row, Dan said yes to the cutover, and any Hermes EOD jobs still running are paused.
