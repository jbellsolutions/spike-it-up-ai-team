# Call Hub: project spec for Claude Code

**Owner:** Dan · **Builder:** Claude Code · **Runs on:** a small service on Railway + Google Drive + the GrokBot Call Bank

## 0. Charter

**What:** every call (Fathom, read.ai, Zoom, GoHighLevel) is transcribed, saved to Dan's Google Drive, filed in his vault, graded if it's a sales call, and searchable by his agents.

**Why:** today a contractor's call hub grades Dan's calls and keeps the data in the contractor's cloud for a monthly fee. Dan wants to "own the whole system".

**Done means:** a call ends, and within the hour its transcript is in `Drive/Calls/Done/`, its note and grade card are in the vault, and Dan can ask about it.

## 1. The flow (Justin's recipe, Oct 21 and Oct 26)

```
Recorder (Fathom / read.ai / Zoom / GHL)
   │  webhook when a recording or transcript is ready
   ▼
Call Hub service (Railway)
   1. fetch the transcript (and the recording link)
   2. write "<YYYY-MM-DD> <title>.md" (+ .vtt if available) to Drive/Calls/Inbox/
   3. delete its local temp copy
   4. ping the Call Bank's webhook (optional; otherwise the 1:07 / 6:07 intake picks it up)
   ▼
GrokBot Call Bank
   5. vault note, grade card, objections, recap draft
   6. move the file to Drive/Calls/Done/<date> <title>/
   7. recap to Dan (and to the client channel after Dan's yes)
```

The service does steps 1–4 only. All judgement (grading, summaries) is the Call Bank's.

## 2. Sources

Check each tool's current API docs before building; these change.

| Source | How | Notes |
|---|---|---|
| Fathom (closers' calls) | Fathom's webhook for new meeting content, then its API for the transcript | Primary source for sales calls |
| read.ai (Dan's calls) | read.ai webhook on meeting end, or the read.ai MCP for backfill | `claude mcp add --transport http readai https://api.read.ai/mcp` |
| Zoom (live transfers) | Zoom `recording.completed` webhook; transcript file from the recording | Only if cloud recording is on |
| GoHighLevel calls | GHL workflow on call completed → Custom Webhook with the recording URL; transcribe with Whisper (or GHL's transcript if available) | For calls not on Fathom |
| Manual | Dan drops a file into `Calls/Inbox/` | Always works |

## 3. The file written to Drive

```markdown
---
source: fathom | readai | zoom | ghl | manual
source_id: <id in the source>
date: 2026-10-27T15:00:00-04:00
title: <meeting title>
participants: [<names as the source gives them>]
recording: <link, if any>
duration_min: 42
---
<speaker-labelled transcript>
```

## 4. Backfill and the contractor's data

1. Ask the contractor for an export of every call record (transcript, grade, notes) in any format. Save it raw to `Drive/Calls/Import/contractor/`.
2. A one-time script converts each record to the format above and drops it in `Calls/Inbox/` in batches of 50, so the Call Bank files them over a few runs.
3. Fathom and read.ai backfill: the same, from their APIs, for the period Dan picks.

## 5. Security

- Webhook endpoints check each source's signature (or a shared secret in the URL path plus a header).
- Google Drive access through OAuth with `drive.file` scope (only files the app creates) plus read on `Calls/`.
- No transcript is kept on the service after it's written to Drive.
- Keys in Railway variables only.

## 6. INPUT NEEDED

- Which recorders the team uses today, and the admin login for each to create the webhook (Dan does this step).
- The Google account that owns the `Calls/` folder.
- Whether the contractor will hand over the existing call database.
- Dan's grading rubric, if it differs from the default in `skills/call-review/SKILL.md` (save as `context/call-rubric.md` on GrokBot).

## 7. Acceptance

- [ ] A test call on each connected recorder lands in `Calls/Inbox/` in the format above.
- [ ] A forged webhook (bad signature) is rejected.
- [ ] The service holds no transcripts after a run.
- [ ] The Call Bank files the test calls, grades the sales one, and moves them to `Done`.
- [ ] Backfill of 50 old calls runs without duplicates (by `source` + `source_id`).

## 8. Build order

1. Drive writer + manual drop path (works with no webhooks at all).
2. Fathom webhook. 3. read.ai webhook. 4. Zoom and GHL. 5. Backfill script.
