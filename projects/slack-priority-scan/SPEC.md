# Slack Priority Scan: project spec

**Owner:** Dan · **Runs on:** GrokBot (AI Co-Founder, `priority-ping-scan` routine) · **Claude Code's part:** a scope audit and, if wanted, the same scan on Hermes

## 0. Charter

**What:** three times each weekday, one short list of who pinged Dan in Slack, priority people first, with a gist and a link.

**Why:** Dan keeps Slack notifications on around the clock across more than one workspace so he doesn't miss a priority person, and he won't give a new VA his Slack access. He asked for this first ("the more filtering task… scanning the channels to see who's hit me up").

**Done means:** Dan turns notifications off and still answers priority people within one scan window.

## 1. Behavior

`skills/slack-priority-scan/SKILL.md`: DMs, group DMs, mentions, priority people anywhere, thread replies; skip what Dan already answered; priority first; 10 lines max; silent when nothing's new.

## 2. Access

It reads as Dan through GrokBot's Slack connector, one connection per workspace. That's the only way to see Dan's own DMs; a bot token can't.

## 3. Claude Code work

**Scope audit (the question Dan asked on Oct 21).** Prompt for Claude Code:
```
Check my Slack apps at api.slack.com/apps (I'll log in). For each app, list its bot and user scopes,
which workspace it's installed in, and whether an install is pending approval.
Tell me what's missing for: reading every channel my EOD bot is in, reading private channels,
and the priority scan described in projects/slack-priority-scan/SPEC.md of
https://github.com/jbellsolutions/spike-it-up-ai-team. Don't change anything until I say yes.
```

**Optional: the same scan on Hermes** (if Dan wants it before GrokBot is live): a Hermes cron job with the skill above, using a Slack user token with `im:history`, `mpim:history`, `channels:history`, `groups:history`, `search:read`, `users:read`.

## 4. INPUT NEEDED

- Priority people (names; the bot looks up IDs).
- Which workspaces to scan.
- Channels to mute.

## 5. Acceptance

- [ ] A DM from a priority person appears first in the next scan.
- [ ] A message Dan already replied to doesn't appear.
- [ ] No new messages → no scan message.
- [ ] Gists are 12 words or fewer and say what the person needs.
