# Claude Code setup for Dan

You are Claude Code on Dan's Mac. Dan pasted this repo and asked you to set up his Claude Code from it. Follow these steps in order. Ask before changing anything outside his home folder, and show him what you'll change in `~/.claude/` before writing it.

Rules:
- One step at a time; tell Dan in one line what you did after each.
- Never ask Dan to paste a password, token or API key into this chat. Keys go into the app that needs them, or into a `.env.local` file he edits himself (gitignored).
- Back up any file before you change it (`<file>.bak-<date>`).
- If a step fails, say what you tried and use the fallback. Don't get around a permission prompt.

## Step 1. Get the repo

```bash
mkdir -p ~/Projects
git clone https://github.com/jbellsolutions/spike-it-up-ai-team ~/Projects/spike-it-up-ai-team
```
If it's already there, `git -C ~/Projects/spike-it-up-ai-team pull`.

## Step 2. Dan's global instructions

1. Read `~/.claude/CLAUDE.md` if it exists.
2. Take `claude-code/CLAUDE.md` from the repo and add it to `~/.claude/CLAUDE.md` between these markers, replacing any older copy between the same markers:
   ```
   <!-- spike-it-up-ai-team:start -->
   …
   <!-- spike-it-up-ai-team:end -->
   ```
3. Show Dan the diff, then write it.

## Step 3. Skills and commands

```bash
mkdir -p ~/.claude/skills ~/.claude/commands
cp -R ~/Projects/spike-it-up-ai-team/claude-code/skills/* ~/.claude/skills/
cp ~/Projects/spike-it-up-ai-team/.claude/commands/*.md ~/.claude/commands/
```
If a skill or command with the same name already exists, ask Dan before overwriting it.

What he gets:

| Say | Or type | What happens |
|---|---|---|
| "spec this out" | `/new-project <name>` | Interviews Dan and writes a project spec with a charter |
| "write the charter" | | A one-page charter for a project or a business goal |
| "build it from the spec" | `/build <project>` | Plans, asks for INPUT NEEDED, builds in milestone order with tests |
| "make me an agent for…" | `/add-agent <role>` | Writes a GrokBot agent charter, skills and routines in this repo's format, plus the message to paste into GrokBot |
| "where are we?" | `/status` | What's built, what's waiting on Dan, what's next |

## Step 4. Fewer permission prompts

Justin told Dan to stop clicking "allow" on every step; one GHL job alone asked about 1,200 times. Do it safely:

1. Read `~/.claude/settings.json` (create it if missing).
2. Merge in `claude-code/settings.json` from the repo. It allows:
   - file edits in the working folder;
   - the everyday read, build, test, git and SSH commands.

   It still asks before anything that deletes, force-resets, pushes, deploys or runs as root.
3. Show Dan the merged file, then write it.
4. If Dan already uses Auto mode in the app, leave it on. The ask list above still applies.

Never set `bypassPermissions`.

## Step 4b. Don't disturb what Dan already built

Dan already has project folders, for example the funding business build, an income hub and the call hub. Don't move, rename or overwrite any of them. List the ones you find under `~/Projects`, `~/Desktop` and `~/Documents` (folder names only, one level deep). Ask him which repo spec each one matches, and write the answer into that folder's `CLAUDE.md` as one line: "Spec: ~/Projects/spike-it-up-ai-team/projects/<name>/SPEC.md".

## Step 5. Connections (each one optional; ask Dan)

1. **Read AI** (his call transcripts in Claude Code):
   ```bash
   claude mcp add --transport http readai https://api.read.ai/mcp
   ```
   Then tell Dan: "Type /mcp, pick readai, and sign in." You can't do the sign-in for him.
2. **Composio** (Gmail, Calendar, Slack and more with one login): Dan copies his Composio MCP URL from the Composio dashboard. Add it with `claude mcp add --transport http composio <url>` after he pastes the URL (a URL, not a key). If his URL includes a key, have him run the command himself.
3. **GoHighLevel** (only if he wants GHL work from Claude Code): the GHL Super Hub installer at https://github.com/jbellsolutions/ghl-super-hub. Read its `INSTALL-AGENT.md`, tell Dan what it will do, and run it only after his yes.
   - The GHL token goes into its hidden prompt or a gitignored `.env.local`, never this chat.
   - If Dan already set up GHL for a project, reuse that setup.
   - When the API can't do something, Claude Code may use Dan's logged-in Chrome, if he says so.
4. **Rotate anything pasted.** Ask Dan whether a Slack token or GHL key was ever pasted into a chat. If so, walk him through making a new one and replacing it where it's used, before anything else.

## Step 6. Check it works

1. List the installed skills and commands.
2. Run a dry test: "spec this out: a one-page tracker of my morning workout". Show Dan the spec it writes in a temp folder, then delete the temp folder.
3. Confirm `/mcp` shows the connections he added.

## Step 7. Report

One message: what's installed, which connections are live, which wait on him (sign-ins), and the three things to try first:
1. In the funding business folder: "compare this with projects/funding-launch/SPEC.md and tell me what's left".
2. In the income hub folder: `/build income-hub`. It reads what's there and fills the gaps.
3. `/status`

## How Dan works (keep doing this)

- **Opus 5.5 at medium effort** for building. Plan mode is optional.
- **Brief by voice or video.** Use Wispr Flow to dump everything in your head, or paste a Loom link. Claude reads the transcript and the screen.
- **Charter first, then build.** Cowork (or `/new-project`) writes the charter and spec. Claude Code builds from them in that project's folder.
- **One folder per project.** Use a Claude project for things you repeat, like a weekly report. Side work goes in a new chat, a fork or a worktree, and gets merged back only when you say.
- **Watch the weekly usage meter** and use what you pay for. Check it twice a day.
