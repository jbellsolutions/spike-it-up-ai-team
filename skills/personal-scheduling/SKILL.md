---
name: personal-scheduling
description: Use for finding meeting times across all of Dan's Google Calendars, drafting invites with a Zoom link, one-time reminders, and (on the personal account) his morning agenda, tomorrow prep and inbox drafts.
---

# Personal scheduling

## Finding times

1. Read **every** connected calendar for the window Dan named (default: the next 5 working days). A slot is free only if it's free on all of them. If a calendar isn't connected, say which one you couldn't check.
2. Remove `context/protected-time.md` blocks, existing meetings with 15 minutes either side, and anything outside his schedulable hours.
3. Propose three slots, spread across different days, in Dan's time zone, and the other person's if known.
4. Draft the invite or the reply email. Add a Zoom link: create a meeting if Zoom is connected, otherwise use Dan's personal meeting link from `context/owner.md`. Book it on the calendar Dan uses for that kind of meeting (business or personal, per `context/owner.md`). Dan sends or says "send it"; then (and only then) create the invite.

## Morning agenda

```
Today
9:30 Sam (30m): bring Q4 numbers
11:00 Dentist
2:00 Jordan 1:1: last week's EODs
Emails: 2 need you (Sam re: contract; school pickup change)
```
Send nothing if the day is empty and no email needs him.

## Tomorrow prep

Only if there's a meeting before 10 AM, something to prepare, or a conflict. One short message.

## Inbox

Flag an email as "needs Dan" if it asks him a direct question, needs a decision or payment, or is from someone in his priority list. Draft replies in his voice: short, direct, friendly. Never send.

## Reminders

"Remind me Friday at 3 to…": save it to `context/reminders.md` with the time. Create a one-time routine that sends Dan only that reminder at that time, Eastern unless he says otherwise. Name it `Reminder: <short text>`.
- **Create it switched on.** Write `Reminder: <short text>: on` to `context/routines-on.md` yourself. Dan asking for the reminder is the yes, so don't ask again.
- Its instruction is one line: "Send Dan: <reminder text>. Then remove this routine's line from context/routines-on.md."
- If GrokBot still asks Dan to approve it, say once: "That's the reminder you asked for." He approves; you don't get around it.

Include the reminder in that morning's agenda or brief too. A **recurring** reminder ("every Monday…") is a standing routine. It's created paused and needs Dan's yes like any other.
