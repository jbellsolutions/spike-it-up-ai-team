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
Broken: Offer B tracker didn't parse (tab renamed?)
Today: 11:00 Sam call: bring Q4 numbers · 3:00 remind: call Jordan
```

Drop any section that's empty. Before milestone 2 there's no Team line, and the Money line appears only if the trackers or the Income Hub are readable. Numbers before words. No greetings, no sign-off.

## Approvals

- Number items across the whole brief, 1 to N. Each line: which agent, to whom, and the first words of the message or the change.
- Dan replies "approve 1, 3", "skip 2", "edit 4: <change>", or "approve all".
- Record each answer in `approved/<today>.md` with Dan's exact words and the time.
- Send each owning agent one handoff message with only its approved items. An edited item goes back to its agent to redraft and comes back as a new item tomorrow (or now, if Dan asks).
- Items with no answer stay in the queue. On the second morning, prefix them with "Still waiting:".

## Tone

Plain, short, specific. "Jordan missed EOD twice this week" beats "some reps had compliance issues".
