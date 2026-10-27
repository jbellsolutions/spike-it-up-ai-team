---
name: slack-api
description: Use whenever you read Slack history with the team bot token or post anything to Slack as the team bot (the EOD summary, reminders, the VA message, a corrected summary in a thread). Also use to check the Slack token works.
---

# Slack API (team bot)

Two ways into Slack, for two jobs:

| Job | Use | Why |
|---|---|---|
| Read Dan's DMs and mentions, search | The Slack connector (signed in as Dan) | Only Dan's own access can see his DMs |
| Read EOD channels, post team-facing messages | The team bot token `SLACK_BOT_TOKEN` ("Spike Ops" app, `docs/SLACK-SETUP.md`) | Posts come from the bot, not from Dan, and the bot's access is limited to what Dan installed |

Never post as Dan. Never post anything that isn't a standing-approved template or something Dan approved in chat.

## Where the token is

The token was pasted by Dan with **Take over** into a hidden prompt and saved to `~/.config/spike-team/slack.env` (mode 600) as `SLACK_BOT_TOKEN=…`. If a secure secret card named `SLACK_BOT_TOKEN` exists instead, it's in the environment. Never print, echo or log the token. Load it with:

```bash
set -a; . ~/.config/spike-team/slack.env; set +a
```

If it's missing, open a terminal and run the hidden prompt, then ask Dan to paste it with **Take over**:

```bash
mkdir -p ~/.config/spike-team && (umask 077; read -rsp "Paste the Slack bot token (xoxb-…), then press Return: " T && printf 'SLACK_BOT_TOKEN=%s\n' "$T" > ~/.config/spike-team/slack.env)
```

## Calls

All calls: `-H "Authorization: Bearer $SLACK_BOT_TOKEN"`, base `https://slack.com/api/`. Check `"ok": true` in every response.

| What | Method |
|---|---|
| Check the token | `auth.test` |
| Find a channel's ID | `conversations.list?types=public_channel,private_channel&limit=1000` (follow `response_metadata.next_cursor`) |
| Read a window | `conversations.history?channel=C…&oldest=<unix>&latest=<unix>&limit=200` (paginate) |
| Read a thread | `conversations.replies?channel=C…&ts=<parent ts>` |
| Who's in a user group | `usergroups.list` then `usergroups.users.list?usergroup=S…` (needs `usergroups:read`) |
| A user's name | `users.info?user=U…` |
| Post | `chat.postMessage` with JSON `{"channel":"C…","text":"…"}` |
| Reply in a thread | `chat.postMessage` with `"thread_ts":"<parent ts>"` |
| DM Dan or the VA | `conversations.open` with `{"users":"U…"}`, then `chat.postMessage` to the returned channel |

Mentions in posts: `<@U…>`. Use the user ID, never a typed name.

## Errors

| Error | Meaning | Do |
|---|---|---|
| `not_in_channel` | The bot isn't in that channel | Tell Dan: "Invite @Spike Ops to #channel" |
| `channel_not_found` | Wrong ID, or a private channel the bot can't see | Same |
| `missing_scope` | The app lacks a scope | Tell Dan which scope; he adds it and reinstalls (`docs/SLACK-SETUP.md`) |
| `invalid_auth`, `token_revoked` | Token dead | Pause team posts, tell Dan, re-run the hidden prompt after he reinstalls |
| `ratelimited` | Too fast | Wait the `Retry-After` seconds once, then continue |

After two failures in a row, stop the run and put it in the morning brief under "Broken".
