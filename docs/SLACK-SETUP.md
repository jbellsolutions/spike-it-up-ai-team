# Slack setup

The team uses Slack two ways:

| | How | Used for |
|---|---|---|
| **Reading as Dan** | GrokBot's Slack connector (Connect apps), signed in as Dan | The priority ping scan (Dan's DMs and mentions), the VA digest, "any number" questions |
| **Posting as the team bot** | The "Spike Ops" Slack app's bot token | The EOD summary, reminders, the VA message, corrected summaries |

Posting as a bot means reps see "Spike Ops", not Dan, and the bot can only post where Dan invited it.

## Which workspace

Dan works in two workspaces:

| Workspace | What's there | Connector (reading as Dan) | Spike Ops (posting) |
|---|---|---|---|
| **Dan's own** | His DMs; where he wants his assistant to live | Yes, from milestone 1 | No |
| **The partner program's** | EOD, setter and leaderboard channels; the VA's posts; the partner, who needs fast replies | Yes, from milestone 1 if the connector can hold both | Read only in milestone 1 if the connector can't hold both (for the VA digest); posting from milestone 2. The partner's admin approves the install |

Ask the partner's admin before installing. A pending install is the most common reason the bot "can't see" a channel.

**Read only what's needed.** Dan doesn't want agents reading channels that have nothing to do with the job:
- The ping scan reads DMs and mentions.
- The VA digest reads only the channels in `context/digest-channels.md`.
- The Sales Manager reads only the EOD channels in `context/owner.md`.
- Revenue never comes from Slack, except a channel Dan names in `context/offers.md` as one offer's tracker.

## Create the app (Dan)

1. Go to https://api.slack.com/apps → **Create New App** → **From a manifest** → pick the partner workspace (where the EOD channels are).
2. Paste the contents of [`slack-app-manifest.json`](slack-app-manifest.json) → **Next** → **Create**.
3. **Install to Workspace** → **Allow**. If it says "request to install", the workspace admin has to approve it.
4. **OAuth & Permissions** → copy the **Bot User OAuth Token** (starts with `xoxb-`). Don't paste it into any chat.
5. In Slack, invite the bot to each EOD channel: `/invite @Spike Ops`. Private channels need this too.
6. Back in GrokBot, the Sales Manager opens a hidden prompt on its computer. Choose **Take over**, paste the token, press Return, then **I'm done**.

The Sales Manager checks it with `auth.test` and sends Dan one test DM.

## Scopes and why

| Scope | Why |
|---|---|
| `channels:history`, `groups:history` | Read EOD posts in public and private channels the bot is in |
| `channels:read`, `groups:read` | Find channel IDs by name |
| `chat:write` | Post the summary and reminders |
| `users:read` | Turn user IDs into names |
| `usergroups:read` | See who's in the @closers and @setters groups, so the roster is exact |
| `im:write` | DM Dan and the VA |
| `reactions:write` | React ✅ to a counted EOD (optional; off unless Dan wants it) |

Not included on purpose: inviting people, managing channels, reading DMs between other people, files, admin scopes.

## Keeping the Hermes app instead

If Dan would rather keep his existing Hermes Slack app in the partner workspace, use its bot token the same way, and check it has `usergroups:read`. Only one app may post the EOD items at a time (`docs/HERMES-TO-GROKBOT.md`).

## When something breaks

| Symptom | Fix |
|---|---|
| "not_in_channel" | `/invite @Spike Ops` in that channel |
| "missing_scope" | Add the scope under OAuth & Permissions → **Reinstall** (the token usually stays the same) |
| "invalid_auth" / "token_revoked" | Reinstall, copy the new token, paste it again with Take over |
| Install stuck on "pending" | The workspace admin hasn't approved it yet |
| A token was pasted into a chat | Regenerate it: **OAuth & Permissions** → **Revoke** (or reinstall), then paste the new one with Take over |
