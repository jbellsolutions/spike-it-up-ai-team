# EOD Tracker: project spec

**Owner:** Dan · **Runs on:** GrokBot (Sales Manager) · **Claude Code's part:** the fixes on Hermes until cutover, an optional sheet writer, and tests

## 0. Charter

**What:** every setter and closer EOD in Slack, counted once and correctly, summarized at 7:30 AM in Dan's format, with reminders, VA escalation, late-post updates, a weekly leaderboard and rep health.

**Why:** the VA compiles EODs by hand, is late on weekends, and re-updates manually when someone posts late. The Hermes tracker went live but miscounts wrong dates and wrong names and misses edits.

**Done means:** zero EODs miscounted as missing, totals that match the VA's check, and Dan never compiles a number.

## 1. Where it runs

The GrokBot Sales Manager runs it (`agents/02-sales-manager.md`, `skills/eod-parsing/SKILL.md`, the `eod-*` routines). This spec is the single description both the bot and any code follow.

## 2. Behavior

| Time (ET, every day) | What |
|---|---|
| 7:30 | Summary for yesterday, in Dan's format |
| 8:30 | Tag missing reps in their EOD channel |
| 10:30 | Second tag |
| 12:30 | Message the VA with names still missing |
| 3:03 PM, 8:03 PM | Re-read for late and edited posts; post a corrected summary in the thread and tell Dan in one line |
| Monday 8:07 | Leaderboard and on track / yellow / behind per rep, to Dan |

Window, crediting, field labels, rates and flags: `skills/eod-parsing/SKILL.md`.

## 3. The three fixes

1. **Wrong date:** credit by posting time; flag "date typo".
2. **Wrong name:** credit by Slack user ID; flag "name mismatch".
3. **Late or edited:** re-read edits and threads at every run; use each rep's latest version; update the summary and the data.

## 4. Claude Code work

**A. Fix the Hermes tracker now (optional, until GrokBot cuts over).**
Prompt for Claude Code:
```
My Hermes agent on Orgo runs an EOD tracker (cron jobs at 7:30, 8:30, 10:30, 12:30 ET).
Apply the three fixes in projects/eod-tracker/SPEC.md section 3 and the window and crediting rules in
skills/eod-parsing/SKILL.md from https://github.com/jbellsolutions/spike-it-up-ai-team.
Show me the diff and a dry run on the last 7 days before changing anything live.
```

**B. Leaderboard sheet writer (optional, needs Dan's yes).**
Dan keeps his spreadsheet-driven dashboard. If he wants the tracker to fill it: write daily per-rep rows to a dedicated tab ("EOD Data", one row per rep per day: date, rep, role, every field, flags) that his dashboard formulas read. Never write to any other tab. Append or upsert by (date, rep).

**C. Test fixtures.** A folder of anonymized sample EODs covering: correct post, wrong date, wrong name, edited after summary, thread reply, duplicate post, unreadable post, rep on a day off, weekend. Expected totals per fixture. The bot's test run and any code both use them.

## 5. INPUT NEEDED

- What the two numbers around "@" mean on the MTD, Week and Today lines, and what "Pace" is.
- KPI targets per closer and setter for on track / yellow / behind.
- Whether the @closer and @setter user groups exist in the workspace (then the roster is exact).

## 6. Acceptance

- [ ] Summary matches the VA's manual numbers for five days in a row.
- [ ] Every fixture in 4C produces its expected totals and flags.
- [ ] Reminders tag only reps who are missing and not marked off.
- [ ] A late post after 7:30 updates the thread and Dan gets one line.
- [ ] Weekends run on time.
