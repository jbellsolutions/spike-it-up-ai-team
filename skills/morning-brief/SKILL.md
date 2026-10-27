---
name: morning-brief
description: Use for Dan's morning brief, and whenever you turn the team's daily notes into one message for Dan or record his approvals from it.
---

# Morning brief

## Inputs

`daily/<today>/`: `funding.md`, and when they exist `sales.md`, `revenue.md`, `calls.md`, `crm.md`. Plus:
- `approved/` (what's still waiting) and `context/standing-approvals.md`;
- today's events on every connected calendar, and today's lines in `context/reminders.md`;
- the VA's posts since yesterday's brief, in the channels listed in `context/digest-channels.md`.

## Shape (under 150 words)

```
Mon Oct 27
Needs your yes
1. Call Bank: recap to the client's channel: "Great call today…" 
2. Funding Launch: publish the "Apply" form route (Draft)
Money: $X yesterday · you made $Y · MTD $Z · proj $P
Team: $C cash · 4 closes · show 55% · missing: Jordan
Pings: Sam waiting on contract numbers
Launch: 2 forms live · blocked: pricing (you) · next: approve follow-up text
VA: 3 refunds logged · Jordan out Fri · new rep starts Mon
Broken: Offer B tracker didn't parse (tab renamed?) · GHL health check didn't run 6:07
Today: 11:00 Sam call: bring Q4 numbers · 3:00 remind: call Jordan
```

Drop any section that's empty. Before milestone 2 there's no Team line, and the Money line appears only if the trackers or the Income Hub are readable. Numbers before words. No greetings, no sign-off.

## Missed runs

Every routine ends with one run-record line in this month's file in `log/`. A routine that should have run and left no line didn't run, and Dan hears it here, because a silent failure looks exactly like a quiet day.

1. Take the routines listed as `on` or `test` in `context/routines-on.md`.
2. For each, read its WHEN line in `repo/routines/` and work out every time it should have run **since the last brief**, not since midnight: the 6:07, 6:41 and 7:30 runs land just before this one. Count weekdays only, weekly days, the monthly day, every time of a routine that runs several times a day, and skip a routine that has marked its job done (the launch check after "launched").
3. An expected run with no line: "<NAME> didn't run at <time>". A line that says blocked or failed: "<NAME> blocked: <reason>" or "<NAME> failed: <reason>".
4. Put each under **Broken**, one line each. If two or more runs in a row are missing, add "check Weekly usage": the weekly meter or billing may have run out.

A missing daily note is also broken, not "no change": "No note from Funding Launch."

## Approvals

- Number items across the whole brief, 1 to N. Each line: which agent, to whom, and the first words of the message or the change.
- Dan replies "approve 1, 3", "skip 2", "edit 4: <change>", or "approve all".
- Record each answer in `approved/<today>.md` with Dan's exact words and the time.
- Send each owning agent one handoff message with only its approved items. An edited item goes back to its agent to redraft and comes back as a new item tomorrow (or now, if Dan asks).
- Items with no answer stay in the queue. On the second morning, prefix them with "Still waiting:".

## Tone

Plain, short, specific. "Jordan missed EOD twice this week" beats "some reps had compliance issues".
