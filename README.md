# Dan's AI Team: Spike It Up Media

Everything Dan needs to run his sales business with AI agents, in one link:

- **A GrokBot team** that runs the daily work, in your order:
  1. your funding launch and one front door (morning brief, who pinged you, meetings, reminders);
  2. EOD reports and income by offer, when you restart that work;
  3. every sales call filed and searchable.
- **Or the same team on Better than GrokBot**, on your own Mac (see below).
- **Specs for every project** Dan wants built, written so Claude Code can build each one.
- **A Claude Code setup** that turns any new idea into a spec, a charter and a build.

You stay in charge. Nothing goes to your team, a client or a lead until you say yes, and every routine starts switched off. Your Hermes assistant keeps running the whole time. Nothing on it gets switched off until the GrokBot version has proven itself and you say so.

---

## 1. Build the GrokBot team

You need a Grok plan that includes Grok Bot (Premium or higher) and the Grok Bot desktop app for the first session.

1. **Make a fresh Grok account for the business.** Every bot on one Grok account shares one computer, its files and its logins, so start clean. A second account for your personal assistant and money tracker is optional (see "Two accounts" below).
2. In Grok Bot, choose **New chat (+) → Create new Bot**.
3. Paste this as its first message:

   ```
   Set yourself up from this repo: https://github.com/jbellsolutions/spike-it-up-ai-team
   Read START-HERE.md first and follow it step by step. This is my business account.
   Ask me before anything goes live.
   ```

4. If Justin gave you a file called `CLIENT-CONTEXT.md`, attach it to that first message. The bot then skips every question the file already answers.
5. Answer its questions. It builds the rest of the team, connects Slack, Google and GoHighLevel (read only), and sets up every routine switched off. It turns each one on only after you say yes.
6. **Before you start:** if a Slack token or a GoHighLevel key was ever pasted into a chat, make a new one and retire the old one.

### Two accounts (optional)

| Account | Bots | Why separate |
|---|---|---|
| **A. Business** (start here) | AI Co-Founder and Funding Launch first; Sales Manager and Revenue Analyst when you restart EOD and income; Call Bank and CRM Coach after that | Team data, Slack, sheets and GHL live on one computer |
| **B. Personal** (later, optional) | Personal Assistant, Money Manager | Your calendar, notes and personal money never share a computer with business bots |

For account B, do the same three steps and say **"This is my personal account."** instead.

## Better Than GrokBot (on your Mac)

The same team can run on **Better than GrokBot**, Justin's app, instead of Grok. The app runs on your Mac. Your bots work on Orgo cloud computers, like your Hermes assistant does now. Same charters, same skills, same routines, and the same rule: nothing goes live until you say yes.

Open Claude Code (or Codex) on your Mac and paste:

```
Install Better than GrokBot and load my team from https://github.com/jbellsolutions/spike-it-up-ai-team
Follow INSTALL.md step by step. Ask me before anything goes live.
```

It installs the app and asks for your keys one at a time. It loads the AI Co-Founder and Funding Launch with every routine switched off. Then the AI Co-Founder sets up its computer and asks you the setup questions. EOD, income and calls come later, when you ask.

| | GrokBot | Better than GrokBot |
|---|---|---|
| Runs on | Grok's computer | Your Mac, plus Orgo cloud computers |
| You pay for | A Grok plan (Premium or higher) | The app is free. The AI model (OpenRouter or OpenAI), Orgo and Composio each bill you directly |
| Business and personal | Two Grok accounts | Two workspaces in one app: Spike Team and Personal |
| Both Slack workspaces, every calendar | Depends on Grok's connectors | Yes: several accounts per app |
| Setup | Paste the link into a new Grok Bot | Paste the link into Claude Code or Codex |

Your Hermes assistant keeps running. Better than GrokBot makes its own computers and never touches the Hermes one.

## 2. Set up Claude Code (one paste)

Open Claude Code and paste:

```
Set up my Claude Code from this repo: https://github.com/jbellsolutions/spike-it-up-ai-team
Follow claude-code/SETUP.md step by step and ask me before changing anything outside my home folder.
```

After that, in any folder you can say **"spec this out"**, **"write the charter"** or **"build it from the spec"**, and Claude follows the same method every time.

## 3. Build a project

Every project has a spec in [projects/](projects/).

**Already started it?** Open Claude Code in that project's folder (your funding business build, your income hub) and say:

```
Compare this folder with https://github.com/jbellsolutions/spike-it-up-ai-team/tree/main/projects/funding-launch
Don't start over. Tell me what's done, what's left, and the next step.
```

**Starting fresh?** Open Claude Code in an empty folder and say:

```
Build the Call Hub from https://github.com/jbellsolutions/spike-it-up-ai-team/tree/main/projects/call-hub
Read SPEC.md first. Ask me for anything marked INPUT NEEDED before you start.
```

| Project | What you get | Spec |
|---|---|---|
| Income Hub | One page: what you made today, per offer, with a monthly projection. Use it to check the build you started | [projects/income-hub](projects/income-hub/SPEC.md) |
| EOD Tracker | The 7:30 AM team summary, reminders and late-post updates, with the three bugs fixed | [projects/eod-tracker](projects/eod-tracker/SPEC.md) |
| Call Hub | Every call recorded, transcribed, filed in Drive and your vault, and searchable. You own all of it | [projects/call-hub](projects/call-hub/SPEC.md) |
| Slack Priority Scan | "Who pinged me?" with your priority people first, so notifications can go off | [projects/slack-priority-scan](projects/slack-priority-scan/SPEC.md) |
| Funding Launch | Your funding business's forms, fields and funnel in GHL, every form into a pipeline, referrals tagged. Continues the build you already started | [projects/funding-launch](projects/funding-launch/SPEC.md) |
| Payment Check | Reported cash matched against billing, with mismatches flagged before payroll | [projects/payment-check](projects/payment-check/SPEC.md) |
| Jarvis | Talk to your agents out loud from your Mac, with an all-offers tab | [projects/jarvis](projects/jarvis/SPEC.md) |
| Financial OS | "Can I afford this?" answered from Monarch and your notes | [projects/financial-os](projects/financial-os/SPEC.md) |

## What's in here

| Path | What it is |
|---|---|
| [START-HERE.md](START-HERE.md) | Build steps the GrokBot follows. You don't need to read it. |
| [INSTALL.md](INSTALL.md) | Better than GrokBot install steps, for Claude Code or Codex. You don't need to read it either. |
| [AGENTS.md](AGENTS.md) | What Claude Code or Codex follows for each thing you ask |
| [team.json](team.json) | What the Better than GrokBot installer creates, built from the files below |
| [PROJECT_CHARTER.md](PROJECT_CHARTER.md) | Mission, team, daily rhythm, how it's measured |
| [agents/](agents/) | One charter per agent: role, scope, tools, routines, KPIs, handoffs, guardrails |
| [skills/](skills/) | The methods the agents use, in GrokBot's skill format |
| [routines/](routines/) | Every scheduled job, word for word. Each one starts switched off. |
| [policies/](policies/) | What needs your yes, and how team and money data is handled |
| [projects/](projects/) | A spec per project, for Claude Code |
| [claude-code/](claude-code/) | Your Claude Code setup: instructions, skills, commands |
| [docs/](docs/) | Moving from Hermes, running these agents on Hermes instead, Slack setup, the memory vault |
| [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) | Decisions still to make |
| [manifest.json](manifest.json) | Machine-readable list of all of the above |
| [scripts/](scripts/) | Repo checks, and the Better than GrokBot installer |

## Staying on Hermes instead?

Everything here is plain markdown, so the same charters, skills and routines work as Hermes profiles and cron jobs. See [docs/ON-HERMES.md](docs/ON-HERMES.md). Give your Hermes assistant this repo link and say "set these agents up as Hermes profiles, following docs/ON-HERMES.md".

## What this repo never holds

Passwords, API keys, tokens, revenue figures, team names, Slack IDs, client names, sheet links or call transcripts. Those go in your own GrokBot (a secure secret card, **Settings → Vault** or **Take over**) or in your private `CLIENT-CONTEXT.md`. See [client-context/README.md](client-context/README.md).

Built for Dan Lizarazo by Justin Bellware ([Your AI Guy](https://www.skool.com/your-ai-guy/)).
