# Project Charter: Dan's AI Team

## 1. Mission

Dan runs sales for several offers and is paid a percentage of cash collected on each. His day is eaten by things a system should do: compiling EODs, chasing reps who didn't post, checking every offer's sheet to know what he made, scanning Slack so he doesn't miss a priority ping, and remembering what happened on every call.

The team takes that work. Success means:
- His funding business launches and real referrals start going through it.
- Dan opens one message each morning and knows yesterday's numbers, what he made, who's behind and what needs his yes.
- His meetings get booked and his reminders show up without him tracking them.
- He can ask for any number ("average sets per setter, Monday to Friday, since the 1st") and get it in under a minute, without asking the VA.
- His notifications can go off, because the team tells him who pinged him, priority people first.
- Every sales call he owns is filed, graded and searchable, in systems he owns.
- His Hermes assistant keeps running until each GrokBot piece has proven itself. Nothing is switched off on day one.

Dan makes the decisions. The agents do the repeatable work and draft everything else.

## 2. Who this is for

- **Dan.** Runs the offers, the setters and the closers. Reads on his phone. Wants short answers and numbers, not essays.
- **Dan's VA.** Today she compiles EODs by hand and chases late posts. With the team she checks the numbers instead of building them, and she gets the escalation when a rep still hasn't posted.
- **Setters and closers.** They post an EOD in Slack every day. They see only the EOD summary, the reminders and the leaderboard. They never drive the bots.
- **Justin's team.** Supports the build and joins a shared channel; they never get Dan's passwords.

## 3. Operating principles

1. **One voice to Dan.** Only the AI Co-Founder messages Dan unasked, apart from the EOD summary itself. Every other agent writes its daily note to `daily/` and the Co-Founder turns them into one morning brief.
2. **Files, not wake-ups.** Agents hand work to each other through files in the shared workspace. One bot asking another a one-line question is the biggest single waste of usage, so it isn't done. This is how Dan's agents "talk to each other".
3. **Nothing goes to the team without a yes.** The EOD summary, reminders and the VA escalation run on standing approvals Dan gives once, for exact templates (`policies/APPROVALS.md`). Anything new waits for his yes.
4. **Read the source, never a copy.** Income comes straight from each offer's own tracker, not a merged master sheet, so the VA gets no extra work. EODs come straight from Slack.
5. **The math is fixed.** Payout formulas and the sheet-reading rules in `skills/offer-payout-math` were debugged against Dan's real sheets and reconcile to the penny. Agents never "improve" them.
6. **Memory is an Obsidian vault.** Everything the team learns goes into `vault/` as linked markdown notes: daily notes, people, offers, calls. Dan can open it in Obsidian and see exactly what the team remembers (`docs/OBSIDIAN-VAULT.md`).
7. **Own the data.** Calls, transcripts, numbers and notes live in Dan's Google Drive and Dan's vault, not a contractor's cloud.
8. **Lean on usage.** Every routine stays silent when nothing changed. No routine polls in a loop.
9. **Build in Claude Code, run on GrokBot.** Apps (the Income Hub page, the call hub's webhook, website forms) get built in Claude Code from the specs in `projects/`. The bots run the daily work around them.

## 4. The team

### Business account

| Agent | Role in one line | Milestone |
|---|---|---|
| [AI Co-Founder](agents/01-ai-cofounder.md) | Pinned lead. Morning brief, approvals, routing, "who pinged me", meetings, reminders, the VA digest, Friday session prep | 1 |
| [Funding Launch](agents/05-funding-launch.md) | Tracks the funding launch from Dan's own project files, watches GoHighLevel read-only while Claude Code builds, drafts follow-up | 1 |
| [Sales Manager](agents/02-sales-manager.md) | Reads every EOD, posts the 7:30 summary, chases missing posts, updates late ones, flags who's behind, answers any number | 2 |
| [Revenue Analyst](agents/03-revenue-analyst.md) | Reads every offer's tracker (or Dan's Income Hub) daily and works out what Dan made per offer, with a monthly projection; checks reported cash against billing | 2 |
| [Call Bank](agents/04-call-bank.md) | Files every call into Drive and the vault, grades sales calls, answers "what happened on…" | 3 |
| [CRM Coach](agents/90-reserved-crm-coach.md) | Reserved. HubSpot guide during the move, lead touch-count gaps, contact cards | 3 |

### Personal account (optional)

| Agent | Role in one line |
|---|---|
| [Personal Assistant](agents/06-personal-assistant.md) | Pinned lead. Calendar, scheduling, inbox drafts, tomorrow's prep |
| [Money Manager](agents/07-money-manager.md) | Reads Monarch exports and your notes; answers "can I afford this?"; monthly review |

```
                         Dan (phone)
                             │
                      AI Co-Founder  ◄── reads <workspace>/daily/*
        ┌──────────────┬─────┴────────┬──────────────┬──────────────┐
  Funding Launch  Sales Manager  Revenue Analyst  Call Bank      CRM Coach
  (GHL, launch)   (Slack EODs)   (offer sheets)   (calls)        (HubSpot, later)
        └──────────────┴──── vault/ (Obsidian: shared memory) ──┴──────────────┘
```

## 5. What it does for you, how you use it, how it's measured

| Area | What it does | How you use it | How it's measured |
|---|---|---|---|
| Morning brief | One message at 7:47 AM: what needs your yes, yesterday's cash and what you made, who's behind, priority pings, the launch, the VA digest, today's calls and reminders | Read it, reply "approve 1, 3" or "skip 2" | Delivered every day; approvals older than a day: zero |
| Meetings and reminders | Finds open slots across all your calendars, drafts the invite with a Zoom link, reminds you of things | "Find 30 minutes with Sam next week", "remind me at 3 to call Jordan" | Three slots offered in one message; reminders on time |
| EOD summary | 7:30 AM in your format: cash, closes, booked, live calls, offers, setter numbers, the five rates, MTD / week / today | Read it. Late posts update it and you get one heads-up | Every day, including weekends; matches the VA's numbers |
| Missing EODs | Tags missing reps at 8:30 and 10:30, then messages the VA at 12:30 | Nothing; it runs on your standing yes | Reps missing at 12:30, per week |
| Rep health | Weekly leaderboard and on track / yellow / behind per rep, against your KPI targets | Read Monday's scorecard, talk to the reds | Delivered every Monday |
| Ask any number | Answers from Slack history and the trackers: "average sets per setter Mon–Fri since the 1st" | Ask the AI Co-Founder in plain words | Answer in under a minute, with the method shown |
| Income | Cash and your payout per offer, every day, with month-to-date, projection and paid / invoiced / projected | Read the income line in the brief; ask "what did I make this week?" | Numbers reconcile with each offer's tracker |
| Payment check | Reported cash vs what billing shows, mismatches flagged | Read the flag, decide | Mismatches caught before payroll |
| Priority pings | Who pinged you, priority people first, with a one-line gist and a link | Turn notifications off; read the scan | Priority pings seen within the scan window |
| Calls | Every call filed in Drive and the vault, graded, objections logged, recap drafted | Ask "what did the prospect say about price on Tuesday's call?" | Calls filed; grade and objections on every sales call |
| Funding launch | Daily launch status from your own project files, GHL watched read-only while Claude Code builds, follow-up drafts | Do the owner steps it lists; approve drafts | Launched; every form lands in a pipeline; every referral tagged |

## 6. Milestones

No dates. The order follows Dan's own priorities, from the Oct 24 call. Each milestone starts when Dan asks for it, the one before has run cleanly for five weekdays in a row, and the weekly usage meter has room.

**Milestone 1: the launch and the front door.** AI Co-Founder, Funding Launch.
- The funding launch is tracked daily from Dan's own status board. Claude Code keeps building; the bot never rebuilds.
- GoHighLevel is watched read-only. Forms that land in no pipeline and referrals with no first touch are flagged.
- The priority ping scan replaces watching notifications.
- Meetings are booked across all of Dan's calendars, and reminders arrive on time.
- The VA's posts come as a three-line digest in the brief.

**Milestone 2: the numbers run themselves.** Sales Manager, Revenue Analyst, when Dan restarts the EOD and income work.
- The EOD summary runs in preview next to Hermes (or next to the VA's numbers, if the Hermes jobs are paused), then takes over the team posts after Dan's yes (`docs/HERMES-TO-GROKBOT.md`).
- The three EOD bugs are fixed: wrong date, wrong name, late edits.
- Every offer's tracker parses, or the Revenue Analyst reads Dan's own Income Hub. The daily income line is in the brief.
- Dan can ask for any number.

**Milestone 3: calls and CRM.** Call Bank, then CRM Coach.
- Every call lands in Drive and the vault, owned by Dan, with grades and objections.
- HubSpot guidance during the move; lead touch-count gaps once the move is done.
- Closes by source once the CRM records it.

**Alongside, in Claude Code:** the funding business build (already under way), the Income Hub (Dan's own folder), the call hub pipeline, Jarvis and the Financial OS, from `projects/`.

## 7. Daily rhythm (Eastern Time)

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
| Milestone 3 | Call Bank | Call intake at 1:07 and 6:07 PM (or instantly by webhook); Friday 11:07 call insights | |

## 8. Usage budget

Grok Bot usage resets weekly; watch **Weekly usage** in the account menu.

- Milestone 1 is about eight scheduled runs a day, and most end in seconds with "no change". Premium handles it; on Premium, run one priority scan a day instead of three if the meter runs short.
- Milestone 2 adds about ten more a day. Super or Ultra fits both comfortably. On Premium, run one late-EOD check a day instead of two.
- Only the AI Co-Founder's routines and the EOD summary message Dan.
- If usage runs short before the reset, pause in this order: priority scans down to one, late-EOD checks down to one, weekly income review, Friday prep. The launch check, the EOD summary, reminders and income sync stay on longest.
- Every routine first checks its switch in `context/routines-on.md`, then: "Lean run. If nothing changed, write 'no change' and stop."

## 9. Out of scope

- Moving money, paying anyone, changing billing or payroll. The team flags; Dan pays.
- Hiring, firing or disciplining reps. The team flags who's behind; Dan has the conversation.
- Quoting funding amounts, approval odds, credit outcomes or results to anyone. Funding and credit-repair claims are regulated; drafts stay factual and Dan approves every one.
- Logging in as Dan, pulling session cookies, or getting around a permission.
- Paid lead-enrichment services. Agents research with the tools they have.

## 10. Definition of done for setup

- The AI Co-Founder and Funding Launch exist with their profiles, skills and memory seeded.
- Slack (reading as Dan), Google Calendar (every account he books from), Drive and Sheets are connected, and the read-only first look passed.
- The Funding Launch bot reads the GHL sub-account with its own read-only token and has built the checklist from Dan's status board.
- Dan added the Ask first rules in Auto-review.
- Every milestone 1 routine exists, ran once as a test that messaged only Dan, and is on only after Dan said yes.
- The first morning brief arrived.
- Milestone 2 has its own done list in START-HERE Step 11: the EOD summary matched three times in a row, Dan said yes to the cutover, and any Hermes EOD jobs still running are paused.
