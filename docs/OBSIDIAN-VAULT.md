# The memory vault (Obsidian)

The team's memory is an Obsidian vault: plain markdown notes with links. The bots write it; Dan opens it in Obsidian and sees exactly what they remember, with the graph view showing who and what connects.

## Layout

Each account has its own vault at `<workspace>/vault/`.

Business (`/workspace/spike-team/vault/`):
```
Home.md                  start page: links to everything below
Daily/                   one note per day; every agent adds its lines
People/                  reps, the VA, clients, partners, priority people
Offers/                  one note per offer (no money figures)
Sales/
  EOD/                   one note per day: the summary as sent
  Weekly/                Monday leaderboards and rep health
  Objections.md          every objection from every graded call
  Call insights/         Friday call insights
Calls/                   one note per call, linked to people
Money/Income/            monthly and weekly income (Dan only)
Funding/                 the launch checklist history, decisions
CRM/                     milestone 3
Decisions/               what was decided, by whom, why
Sessions/                Friday session prep and notes
```

Personal (`/workspace/dan-personal/vault/`): `Home.md`, `Daily/`, `People/`, `Money/Reviews/`, `Decisions/`.

## Building it (setup Step 1)

Create the folders above and `Home.md`:
```markdown
# Spike AI Vault
- [[Daily]] · today's note is Daily/<date>
- Team: [[People]] · [[Offers]]
- Sales: [[Sales/EOD]] · [[Sales/Weekly]] · [[Sales/Objections]]
- [[Calls]] · [[Money/Income]] · [[Funding]] · [[Decisions]] · [[Sessions]]
```

## How Dan opens it

1. The nightly backup copies the vault to Google Drive, folder **Spike AI Vault** (personal: **Dan Personal Vault**).
2. Install **Google Drive for desktop** and **Obsidian** on the Mac.
3. In Obsidian: **Open folder as vault** → pick `Google Drive/My Drive/Spike AI Vault`.

Treat that copy as read-only: the next backup overwrites notes the bots changed. To change what the team remembers, tell the AI Co-Founder ("Jordan is now a closer, not a setter"); it fixes the note and the change shows up after the next backup.

## Rules the bots follow

The `vault-notes` skill: one fact in one place, link people/offers/calls with `[[…]]`, daily-note lines only for things worth remembering, no secrets, corrections recorded at the bottom of the note.

## Later: search on top

When the vault is big enough that plain search is slow, add semantic search over these same files (for example mem0 or a local embedding index) as a layer on top. The markdown files stay the source of truth, so Dan can always open the vault and see what the team remembers.
