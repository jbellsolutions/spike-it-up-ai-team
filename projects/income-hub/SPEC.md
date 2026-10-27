# Income Hub: project spec for Claude Code

**Owner:** Dan · **Builder:** Claude Code (Justin's team reviews) · **Status:** ready to build once the INPUT NEEDED items are in · **Runs on:** Railway (or any host that gives Dan a URL)

**Dan started building this himself** in his own Claude Code folder ("income hub"), from a call transcript. Build in that folder: read what's there first, compare it with this spec, and fill the gaps. Don't start a second Income Hub.

## 0. Charter

**What:** one page where Dan sees what he made today. For every offer he's paid on, it shows the cash collected each day and his payout under that offer's comp structure, with month to date, a monthly projection, and paid / invoiced / projected status.

**Why:** today it's one spreadsheet per offer, so Dan can't see total daily cash or what he made without opening each one. The prototype only runs inside a Claude artifact and needs a manual "save the day".

**Users:** Dan only. Single user.

**Done means:** Dan opens one URL and the numbers are already fresh every morning, with zero manual steps, and they match each offer's own tracker.

**Decisions already made (Oct 21 call):**
- Read each offer's own tracker directly. No master sheet, no extra work for the VA.
- Update **every day**, not weekly.
- Show a **monthly projection** on the main view.
- **No bank connection.** Personal money is a separate project (`projects/financial-os`).
- The GrokBot **Revenue Analyst** runs the daily work; this page is the dashboard on top.
- **Revenue never comes from reading Slack channels in general** (Dan, Oct 24). The only Slack source allowed is a channel Dan names as one offer's tracker.

## 1. Source of truth

Dan's prototype `income-hub.html` is the source of truth for every screen, every calculation and every parsing rule. This spec explains why it works the way it does and what has to change to run outside Claude's artifact runtime. When in doubt, read the prototype's function before changing behavior.

**Do not redesign the UI, rename fields or "improve" the math.** The math and parsing were debugged against Dan's real production sheet and reconcile exactly with his own totals. A rewrite that changes an output value is a regression.

## 2. INPUT NEEDED (ask Dan before building)

1. `income-hub.html`, the prototype (export it from the Claude artifact, or have Claude save it).
2. The artifact's data as JSON: `offers`, `daily`, `other`, `offerStatus`, `settings/main` (ask Claude in the artifact to dump its db collections).
3. For each offer: its tracker (sheet URL and the label it uses for cash, default "cash collected"; or the Slack channel).
4. The reconciliation check: one real sheet and the total Dan has independently computed for a period (in his private `CLIENT-CONTEXT.md`). The parser must reproduce it exactly.

## 3. The two Claude-only pieces to replace

The prototype uses two globals that exist only inside Claude artifacts:
1. `window.claude.use('db')`: a hosted document database. → **Replace with a real database** (section 5).
2. `window.claude.use('mcp')`: calls Dan's Google Drive and Slack connectors (`get_file_metadata`, `slack_read_channel`). → **Replace with direct Google Sheets API and Slack Web API calls** (section 7), keeping the parsing logic.

Everything else is plain HTML/CSS/JS and should be kept as close to as-is as possible.

## 4. Stack

- **Frontend:** Vite + vanilla JS (closest to the prototype, least behavior drift). If React, map components 1:1 to the prototype's render functions (`renderHero`, `renderRangeHero`, `renderChartPanel`, `renderOffers`, `renderOther`, …).
- **Backend:** Node + Express or Fastify. CRUD for offers / daily / other / settings / offerStatus, plus `POST /api/sync/:offerId`, `POST /api/sync/all`, and `GET /api/summary?range=…` (section 8).
- **Database:** Postgres (Railway or Neon). SQLite is fine to start. JSON columns where the prototype used free-form docs (`tracker`).
- **Math module:** one shared module imported by both client and server, so there's exactly one implementation.
- **Auth:** single user. A password-gated session from an env secret. Don't over-build it.
- **Scheduled sync:** server-side cron (node-cron or the host's cron) at 6:30 AM ET daily, running the same code as the "Sync now" button. Plus sync-on-load if the data is older than 12 hours.
- **Hosting:** Railway, one service + one Postgres. Dan gets a URL.

## 5. Data model (names match the prototype exactly)

```
offers       id (pk), name, kind ('percent'|'base_plus_percent'), rate (number, 10 = 10%),
             base (number|null), netOfAds (bool), notes, order (number), example (bool), tracker (json)
daily        id (pk = `${offerId}_${date}`), offerId (fk), date ('YYYY-MM-DD'), cash, adSpend (default 0),
             source ('manual'|'paste'|'slack'|'sheet'), period ('day'|'week'|'range'|null), raw (text|null)
other        id, month ('YYYY-MM'), source, amount, status ('paid'|'invoiced'|'projected'), note, example
offerStatus  offerId, month, status ('paid'|'invoiced'|'projected')
settings     single row: target (default 20000), adWarn (default 30)
```
Tracker shapes, stored as JSON exactly:
```
{ type: 'none' }
{ type: 'paste' }
{ type: 'slack', slackRef, slackChannelId, slackLabel, lastError }
{ type: 'sheet', sheetUrl, sheetLabel, fileId, lastError, lastTab, lastPeriod }
```
The `daily` id is a natural key so a re-sync upserts instead of duplicating.

## 6. Features to keep (all of them)

**Offers:** add / edit / delete; `example` seed offers hidden once real ones exist; each card shows this month's payout (percent part + base part), status (paid / invoiced / projected, set per offer per month), an ad-spend warning when ads exceed `adWarn`% of cash, and a tracker badge ("Sheet: TabName", "Slack connected", or the last error).

**Daily numbers:** per offer, a day ledger (date, cash, adSpend, source); a quick-add form; an editable table; "Paste from spreadsheet" parsed client-side (`parsePaste()`).

**Monthly view:** month navigator; hero with the month's total payout, delta vs last month, and a meter of paid / invoiced / projected against `target`; stacked bar chart by month and offer (`buildChartData()`) with a target line, legend and a table toggle; the small stats strip; "Other income" (referral fees, bonuses) with month, source, amount, status, note.

**Monthly projection (added Oct 21):** on the hero: month-to-date percent part ÷ days elapsed × days in month, plus base. Labelled "Projection".

**Daily / range view:** Monthly vs Daily toggle; presets Yesterday, Today, This week (Monday → today), Month to date, Custom (two dates; reversed dates swap). Range hero: total **percent-based** earnings (base excluded, with a note pointing to Monthly), total cash, per-offer breakdown. Day chart buckets by day, or by week when the range is over 45 days. Table toggle; header reads Month / Week / Day.

**Settings:** `target`, `adWarn`.

**UI conventions:** light/dark following the system with an override via `data-theme`; all colors are CSS custom properties; hand-rolled inline SVG chart (no chart library), 2px gaps between stacked segments, palette `--c1`…`--c4`, `--c-other`, legend when ≥2 series; `:focus-visible`, `aria-pressed` on toggles, native `<dialog>`; Hanken Grotesk for UI, IBM Plex Mono for money with tabular figures; toasts for save/sync results.

## 7. Calculation and sync rules (do not alter)

Shared math module:
- `offerPayout(offer, month)` → `{cash, ads, days, pctPart, basePart, total}`: `pctPart = rate/100 × (netOfAds ? cash − ads : cash)`; `basePart = base` for `base_plus_percent`, else 0.
- Range payout (`rangeOfferBreakdown`): pctPart over any date range; **base excluded on purpose** (it's a monthly retainer). Don't prorate it.
- Delta, meter and pace come from `offerStatusFor(offerId, month)` and `target`. Read `renderHero()` for the meter-segment math.
- `periodOf(dates)`: median gap ≤ 2 days → `day`; ≥ 6 → `week`; else `range`.

**Google Sheets sync** (three production bugs were fixed here; keep all three fixes):
1. **Read every tab**, not just the first. Use `spreadsheets.get` for tab titles, then `spreadsheets.values.get` per tab (or `includeGridData`). Parse each tab on its own.
2. **Money never splits on a thousands comma.** With structured values this mostly disappears; keep `mergeMoneyFields()` for the paste and CSV paths.
3. **No guessed years.** `parseDateCell(str, yearHint)`: take the year from the row's leading 4-digit cell; never fall back to `new Date()` for a string without a year (it returns 2001). Align each value row to its **own** label column (`detectLabeledSheetSeries` + `findDateRunStart`), never by a shared column index.
4. Choose the tab with the most matched pairs as primary; fill only missing dates from other tabs; **never sum the same date across tabs**.
5. `sheetLabel` is per offer (default "cash collected").

**Slack sync:** `conversations.history` on the offer's channel (paginated). Count a message only if it contains the literal phrase **"CASH COLLECTED"**; keep the matched line in `raw`. No loose dollar-grabbing.

**Sync results:** write `lastError` on failure and clear it on success; set `lastTab` and `lastPeriod`. The UI badge shows them.

## 8. The API the agents use

- `GET /api/summary?range=yesterday|today|week|mtd|month:YYYY-MM|custom&start=&end=` → per offer: cash, ads, pctPart, (basePart for month ranges), plus totals and projection.
- `GET /api/offers` → offers with tracker health.
- Auth: a bearer token from `INCOME_HUB_AGENT_TOKEN`, read only.

Once this is live, the GrokBot **Revenue Analyst** reads `/api/summary` instead of computing (token in a secure secret card), and **Jarvis** uses it for its offers tab. The `offer-payout-math` skill stays as the fallback and as a test oracle.

## 9. Integrations auth

- **Google:** OAuth2, scopes `spreadsheets.readonly` and `drive.readonly`. A one-time "Connect Google" admin page; store the refresh token server-side.
- **Slack:** a bot token with `channels:history` / `groups:history` (the Spike Ops app from `docs/SLACK-SETUP.md` works). Store server-side.

## 10. Migration

1. Import the artifact's JSON, preserving ids (especially `daily`).
2. Spot-check one month per offer against the artifact before retiring it.

## 11. Acceptance checklist

- [ ] Every prototype screen is reproduced with the same fields, validation, empty and loading states.
- [ ] Monthly totals for every offer match the artifact for at least two real months.
- [ ] Yesterday / Today / This week / MTD / a custom range match hand-computed totals from the same `daily` rows.
- [ ] Sheet sync against Dan's reconciliation sheet reproduces his independent total exactly (figure in `CLIENT-CONTEXT.md`).
- [ ] Edge cases pass as unit tests: `$X,XXX` cell; bare "Mon D" header with the year only in the row's first cell; value row whose label column doesn't line up with the header's date-run start; same dates on two tabs not double-counted.
- [ ] Slack sync ignores dollar figures without "CASH COLLECTED".
- [ ] The daily cron runs with the page closed; the morning numbers are fresh.
- [ ] Monthly projection shows on the hero.
- [ ] Light and dark both render correctly.
- [ ] `/api/summary` returns the same numbers the page shows.
- [ ] Imported data reconciles before the artifact is retired.

## 12. Build order (milestones)

1. Math module + parser with unit tests from the acceptance edge cases (tests first).
2. Database, API, import of the artifact data; totals reconcile.
3. Frontend port of the prototype; screens match.
4. Google + Slack sync, cron, tracker badges.
5. `/api/summary`, deploy to Railway, hand Dan the URL.
