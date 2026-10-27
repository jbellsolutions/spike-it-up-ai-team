# Client context (private)

The repo is public-safe. Everything specific to Dan's business stays out of it and goes in one private file, `CLIENT-CONTEXT.md`.

- Justin's team fills it in from the calls and Slack and sends it to Dan directly.
- Dan attaches it to the first message he sends the new GrokBot. The bot copies it to `<workspace>/context/CLIENT-CONTEXT.md` and skips every setup question it answers.
- For Claude Code builds, drop it in the project folder; `.gitignore` keeps it out of git.
- Never commit it. `.gitignore` blocks `CLIENT-CONTEXT.md` everywhere.

Leave out passwords, keys and tokens even here. Those go in GrokBot's secure secret cards or Take over.

The shape is in [CLIENT-CONTEXT.template.md](CLIENT-CONTEXT.template.md).
