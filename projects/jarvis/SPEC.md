# Jarvis: project spec

**Owner:** Dan · **Builder:** Claude Code installs and extends Justin's Jarvis app · **Runs on:** Dan's Mac (Apple Silicon, macOS 15+)

## 0. Charter

**What:** Dan's "Iron Man" assistant: talk to it out loud from the Mac, ask for any number, see an all-offers tab, and have it act in Chrome and on the Mac.

**Why:** Dan asked on Oct 12 for a dashboard "where I can talk to the bot and it talks back to me, like a Jarvis, with a tab where I can see all offers". Justin built Jarvis for Mac and sent it on Oct 26.

**Done means:** Dan asks Jarvis three questions out loud (an EOD number, "what did I make this month?", "who pinged me?") and gets right answers, and the offers tab shows every offer.

## 1. History (so nobody's confused)

- Oct 22: Jarvis was scoped as the Better Than GrokBot dashboard with a voice add-on, connected to Dan's Hermes agent.
- Oct 26: Justin shipped **Jarvis for Mac** (`github.com/jbellsolutions/jev-assistant`): a voice assistant with Chrome and Mac control.
- Now: Dan's team runs on GrokBot. Jarvis is the voice front end on his Mac; GrokBot runs the daily work; the Income Hub is the numbers.

## 2. Install (Claude Code)

Prompt:
```
Install Jarvis for Mac from https://github.com/jbellsolutions/jev-assistant following docs/start-here.md.
Walk me through each connection one at a time. I'll paste my own keys into the app's
connection screen, never into this chat.
```

Connections (Dan's own accounts; each bills separately): OpenAI (voice and reasoning), LiveKit (live voice), TypeSafe (fast judgments), Browser Use (cloud browser), Composio (Slack, Gmail, ClickUp tools), Orgo (optional).

## 3. Extend

1. **Offers tab / numbers tool.** Give Jarvis a tool that calls the Income Hub's `GET /api/summary` (token from Dan, stored in Jarvis's connection settings). "What did I make this month?" → the month's pctPart + base and the projection. Display only; the Income Hub stays the math.
2. **EOD numbers.** Read the latest EOD summary from the vault copy in Drive (`Spike AI Vault/Sales/EOD/`) or from the Sales Manager's DM.
3. **Who pinged me.** Through Composio's Slack tools, or by reading the latest priority scan.
4. **Ask the team.** For anything else, Jarvis drafts the request and Dan sends it to the AI Co-Founder in GrokBot.

## 4. INPUT NEEDED

- The Income Hub URL and an agent token (after the Income Hub ships).
- Dan's Composio project key and user ID.

## 5. Acceptance

- [ ] Jarvis installs and opens; voice works.
- [ ] "What did I make this month?" matches the Income Hub.
- [ ] "What was cash collected yesterday?" matches the EOD summary.
- [ ] "Who pinged me?" lists the same people as the last priority scan.
- [ ] No key was pasted into a chat.
