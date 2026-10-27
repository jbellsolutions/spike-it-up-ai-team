---
name: eod-parsing
description: Use whenever you read, count, summarize or answer questions about setter and closer EOD posts in Slack: the daily summary, reminders, late-post checks, the weekly leaderboard, or "any number" questions about the sales team.
---

# EOD parsing

## 1. The window

The EOD summary at 7:30 AM on day D+1 covers day D. A post belongs to day D if it was posted after 3:00 PM on day D and before the 7:30 AM summary on D+1. Late checks extend the window to the moment of the check. Weekends count like weekdays.

Use the poster's Slack user ID and the message `ts` (post time). Never use the date or name typed in the message to decide whose day it is.

## 2. Reading the channels

- Read the closers' and setters' EOD channels from `context/owner.md` with `conversations.history` for the window (see `slack-api`), plus `conversations.replies` for any thread with replies.
- For every message use its **current** text. If the message has an `edited` field, it was edited; use the latest text and note the edit time.
- If one rep posted twice for the same day, use the latest complete post and note "reposted".

## 3. Fields

Labels are matched case-insensitively, ignoring punctuation, emoji and bold markers. Values: strip `$`, `,` and spaces; `12k` = 12000; a `%` value stays a percent. A blank or "-" is 0 only if the label is present; a missing label is "not reported", which is different from 0.

| Field | Labels that count |
|---|---|
| cash | cash collected, cash, collected |
| closes | closes, closed, deals closed |
| booked | booked calls, booked, calls booked |
| live | live calls, calls taken, live, shows |
| offers | offers, offers made |
| sets | sets, today's sets, sets today |
| setsOnCalendar | sets on calendar, on calendar |
| setterLive | setter live calls, live calls (in a setter's post) |
| pickups | pick ups, pickups, dials answered |
| convos | conversations, convos, total convos |
| meaningfulConvos | meaningful convos, meaningful conversations |

A rep is a **closer** or **setter** by the roster (`context/eod-roster.md` or the Slack user group), not by which fields they filled.

## 4. Checks and flags

| Situation | Count it? | Flag |
|---|---|---|
| Typed date ≠ the day the window says | Yes, for the window's day | `date typo` |
| Typed name ≠ the poster's name | Yes, for the poster | `name mismatch` |
| Edited after the summary | Yes, latest text | `edited`, and update the summary |
| Posted after the 7:30 summary | Yes | `late` |
| Can't find any known label | No | `unreadable`, quote the first line, tell Dan |
| Rep on the roster, nothing in the window | — | `missing` |
| Rep marked off that day in the roster | — | Not missing |

## 5. Totals and rates

Sum each field across reps for the day. Then:
- close rate = closes ÷ live
- show rate = live ÷ booked
- offer rate = offers ÷ live
- pick-up-to-convo = convos ÷ pickups
- convo-to-set = sets ÷ meaningfulConvos

Two decimals, as a percent. A zero denominator shows "n/a". Never average reps' own percentages.

MTD, Week and Today lines: use the definitions in `context/eod-format.md`. If it doesn't exist, show `sets @ closes` and leave Pace out.

Cash pace (if defined there) = MTD cash ÷ days elapsed × days in the month.

## 6. Data file

`data/eod/<YYYY-MM-DD>.json`:
```json
{ "date": "2026-10-26", "reps": [ { "slackId": "U…", "name": "…", "role": "closer", "postedTs": "…", "editedTs": null, "fields": { "cash": 0, "closes": 0 }, "flags": ["late"] } ],
  "totals": { }, "rates": { }, "missing": ["…"], "summaryTs": null }
```

## 7. Weekly

From the daily files: per rep, the week's and month's sums and rates. Compare each rep with `context/kpi-targets.md`:
- **on track:** at or above target pace for the period
- **yellow:** 75–99% of target pace
- **behind:** under 75%

Dan can change those cut-offs in `kpi-targets.md`. Give two short lines of why for every yellow or behind, from the numbers (e.g. "show rate 38% vs 55%; 4 no-shows Tue–Thu").

## 8. Any-number questions

Answer from `data/eod/` first. Read Slack only for days or fields the data doesn't hold. Always end with the method: what you summed, over which days, from how many EODs. If the question is ambiguous (weekdays or all days? which setters?), pick the obvious reading, say which, and answer.
