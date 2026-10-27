# Build record

What's specified, what's built and what's actually running, kept honest. Justin's team updates this file. The bot never does; it keeps its own live list in `context/routine-registry.md`.

**Where it stands: a specification package.** Everything below exists as files in this repo. Nothing is installed, connected or switched on in Dan's GrokBot accounts until the bot follows `START-HERE.md` and reads back what it created.

## Status by piece

"Specified" means the job is written down. "Built" means the file the bot or Claude Code uses exists in this repo. "Active" means it's running on Dan's account and has been read back.

| Piece | Specified | Built in repo | Active on Dan's account |
|---|---|---|---|
| Project charter, approvals, data rules | Yes | `PROJECT_CHARTER.md`, `policies/` | Not yet |
| AI Co-Founder (business, milestone 1) | Yes | `agents/01-ai-cofounder.md` | Not yet |
| Funding Launch (business, milestone 1) | Yes | `agents/05-funding-launch.md` | Not yet |
| Sales Manager (business, milestone 2, paused by Dan) | Yes | `agents/02-sales-manager.md` | No: waits for "start the EOD work" |
| Revenue Analyst (business, milestone 2, paused by Dan) | Yes | `agents/03-revenue-analyst.md` | No: waits for "start the income work" |
| Call Bank (business, milestone 3) | Yes | `agents/04-call-bank.md` | No |
| Personal Assistant (personal account) | Yes | `agents/06-personal-assistant.md` | Not yet |
| Money Manager (personal account) | Yes | `agents/07-money-manager.md` | No: created only on Dan's yes |
| CRM Coach, Reactivation Desk | Reserved, not a role yet | `agents/90-…`, `agents/91-…` | No |
| 20 routines | Yes | `routines/*.prompt` | Not yet. Each is created paused, and runs only when listed in `context/routines-on.md` |
| 11 private skills | Yes | `skills/` | Not yet uploaded |
| Better than GrokBot edition | Yes | `team.json` (built by `scripts/build-team.mjs`) | Not installed |
| Claude Code setup | Yes | `claude-code/` | Unknown: Dan runs `claude-code/SETUP.md` on his Mac |
| Project specs (8) | Specs only | `projects/*/SPEC.md` | The funding build is under way in Dan's own Claude Code project; the rest aren't started |

**How "Active" gets filled in.** After the bot creates each routine, it reads it back (name, owner, schedule, timezone, paused) into `context/routine-registry.md` and sends Dan the list. Justin's team copies that readback here. A piece is active only once its readback matches this repo.

## GrokBot facts this build relies on

Checked against xAI's Grok Bot documentation (docs.x.ai/grok-bot) on 2026-10-27.

**Verified in the docs**
- Plans: Grok Bot comes with X's Premium, Super and Ultra plans. Usage comes from a weekly pool, shown under "Weekly usage" in the account menu and Settings → Usage & Billing.
- A bot is created with New chat (+) → Create new Bot, and renamed by clicking its name. There's no instructions field. The bot gets its job in the first message and is asked to remember it. Bots can be pinned.
- Timezone: Settings → General → Bot → Timezone.
- Auto-review: Settings → General → Auto-review → Custom Rules. "Ask first" always wins over "Allow automatically". Approval prompts offer Allow once, Always allow or Deny.
- One shared computer per account. Its files, browser sessions and command-line credentials are shared by every bot on that account, and a bot's screen isn't a security boundary. Project files live in `/workspace`.
- Passwords and 2FA go through **Take over**. Supported connections can ask for a secret through a secure secret request.
- Apps connect through Add, then the provider's own login. Private skills are one shared library, turned on per bot.
- Routines have a Details tab with Pause/Resume, Test and Edit. **Test performs real actions.** Each bot can have up to 50 routines. Scheduled runs must be at least 5 minutes apart. The last 20 run records are kept. Unattended routines can be paused automatically.
- Event triggers (Slack, GitHub) come through Cursor's integrations.

**Seen working on another Grok Bot account, though not in the public docs**
- A routine can be started by a webhook (the trigger shows as a webhook event). Its key is a secret: Dan pastes it into the recorder himself. Call intake uses this; the 1:07 and 6:07 schedule still runs if no webhook is set.
- Secure secret cards hold keys and tokens, such as the team Slack bot token, and the bot's shell reads them as environment variables. They never go in chat.

**Not verified: check on Dan's live account before relying on it**

| Claim | Where the repo uses it | How to check |
|---|---|---|
| A "Settings → Vault" for website logins | Not relied on: website logins go through Take over | If Settings shows a Vault, Dan may use it instead |
| Approval prompts expire after about 10 minutes | `START-HERE.md` Step 4 | Leave one prompt open and see what happens |
| One connector signed in to several accounts of the same app (several calendars, several Slack workspaces) | AI Co-Founder, Personal Assistant, priority ping scan | Connect a second account and read both |
| A Zoom connector | Meeting invites | Look in Connect apps. Without it, use Dan's personal meeting link |

Each unverified item has a fallback in the charter that uses it, so a "no" slows a step down but doesn't break it.

## Open items and who owns them

| Item | Owner | Blocks |
|---|---|---|
| Rotate the Slack bot token and the GoHighLevel key that were pasted into chats | Dan | Any bot using Slack or GHL |
| Say what "launched" means for the funding business | Dan | Funding Launch's done test |
| Approve installing the team Slack app in the partner workspace | Dan, with that workspace's admin | Team posts (milestone 2) |
| Each offer's comp structure and tracker | Dan | Revenue Analyst (milestone 2) |
| The billing source for the payment check | Dan | Payment check |
| Export of the old call-grading data | Dan, with the contractor | Call Bank history (milestone 3) |
| Counsel review of funding copy (`context/funding-facts.md`) | Dan | Any applicant-facing message |
| Check the unverified GrokBot facts above at first setup | Justin's team, with the bot | The fallbacks stay in place until then |
| Hermes or GrokBot for each job | Dan and Justin, at the Friday session | Pausing any Hermes job. GrokBot runs alongside until Dan says otherwise (`PROJECT_CHARTER.md` section 12) |

## Change log

- 2026-10-27: Charters rewritten to the GrokBot operating standard. Each one now has an owner, inputs, sole-writer records, limits, wakes, retry, stop and "done means". Verified and unverified GrokBot facts are recorded above.
  The Better than GrokBot role blocks (`<!-- btg-role -->`) are unchanged: each already ends with its charter's path, and the bot reads the full charter, contract included, before every task.
