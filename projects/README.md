# Projects

Each folder is one thing to build, with a `SPEC.md` written so Claude Code can build it. The GrokBot team runs the daily work around these; Claude Code builds the apps and pipelines.

| Project | Builds | Runs on | First INPUT NEEDED |
|---|---|---|---|
| [income-hub](income-hub/SPEC.md) | The income page + `/api/summary` | Railway | Dan's own income hub folder (he started it), or the prototype `income-hub.html` and its data export |
| [eod-tracker](eod-tracker/SPEC.md) | The EOD logic (bot), Hermes fixes until cutover, optional sheet writer | GrokBot | What "@" and "Pace" mean |
| [call-hub](call-hub/SPEC.md) | Webhooks → Drive pipeline for every call | Railway + Drive | Which recorders the team uses |
| [slack-priority-scan](slack-priority-scan/SPEC.md) | The "who pinged me" scan, a Slack scope audit | GrokBot | Priority people |
| [funding-launch](funding-launch/SPEC.md) | Continue Dan's build: forms, fields, funnel, follow-up in GHL | GHL sub-account | The project's status board; what "launched" means |
| [payment-check](payment-check/SPEC.md) | Reported vs verified cash | GrokBot (+ optional script) | Billing source |
| [jarvis](jarvis/SPEC.md) | Voice assistant on the Mac with an offers view | Dan's Mac | Income Hub URL |
| [financial-os](financial-os/SPEC.md) | Personal money answers and monthly review | Claude Code + Drive | Monarch export |
| [_template](_template/SPEC.md) | Start a new one | | |

## How to build one

Open Claude Code in a new, empty folder and say:

```
Build <project> from https://github.com/jbellsolutions/spike-it-up-ai-team/tree/main/projects/<project>
Read SPEC.md first. Ask me for anything under INPUT NEEDED before you start.
Plan first, then build in the order in "Build order", with tests for anything that does math.
```

With the Claude Code setup from `claude-code/SETUP.md` installed, the short version works too: **`/build income-hub`**.

## How to add a new one

Say **"spec this out"** (or `/new-project <name>`) and describe it. Claude Code interviews you, writes `projects/<name>/SPEC.md` from the template, and asks you to approve it before anything gets built.

## Suggested order

1. Income Hub (the daily numbers everything else reads)
2. Call Hub (Dan owns his call data)
3. Funding Launch forms (on Dan's launch path)
4. Jarvis (after the Income Hub, so the offers view has data)
5. Financial OS (personal, any time)
