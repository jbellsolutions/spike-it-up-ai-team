---
name: offer-payout-math
description: Use whenever you read an offer's tracker (Google Sheet, Slack channel or pasted numbers) or calculate what Dan made: daily income sync, month close, weekly review, payment check, and questions like "what did I make this week?". The formulas and parsing rules here are fixed; never change them.
---

# Offer payout math

These rules come from Dan's own Income Hub spec. They were debugged against his real production sheets and reconcile to the penny. A rewrite that changes an output value is a bug.

## 1. The formulas

For one offer over one calendar month:
- `cash` = sum of the offer's daily `cash`
- `ads` = sum of daily `adSpend` (0 when not tracked)
- `pctPart` = `rate / 100 × (netOfAds ? cash − ads : cash)`
- `basePart` = `kind == "base_plus_percent" ? base : 0`
- `total` = `pctPart + basePart`

For a day or any date range (yesterday, today, this week Monday→today, month to date, custom): **pctPart only.** Base is a monthly retainer and is never prorated into days. Say so in the answer: "Excludes base; see the monthly view."

Projection for the current month = (month-to-date pctPart ÷ days elapsed × days in month) + basePart. Always labelled "projection".

Ad-spend warning: if `ads > adWarn% × cash` for the month, flag it.

Daily row id: `<offerId>_<YYYY-MM-DD>`. A re-sync replaces the row. `source` is `sheet`, `slack`, `paste` or `manual`.

## 2. Reading a Google Sheet

1. **Read every tab.** List the workbook's tabs and parse each one on its own. A tool that returns only the first tab gives wrong numbers (it once showed a flat, wrong monthly figure from a tab with no daily data).
2. In each tab, find the row or column whose label contains the offer's `sheetLabel` (default "cash collected"), checking column A and column B of each row.
3. Find the header row of dates. **Find where its run of dates starts on its own**, then align the value row **relative to its own label position**. Never assume the header row and the value row start in the same column (one sheet had an extra week-index cell in the header row only, which shifted every date by one).
4. **Dates.** Parse `YYYY-MM-DD`, `M/D/YYYY`, `Mon D, YYYY`. For a bare `Mon D` or `M/D` with no year, take the year from a 4-digit year cell at the start of that row (e.g. `["2026","Jan 1","Jan 2",…]`). If the row has no year cell, the date is unreadable. **Never** let a date library guess the year.
5. **Money.** If you ever handle a row as comma-separated text, re-join money split on a thousands comma: a field that starts with `$` and 1–3 digits, followed by bare 3-digit fields, is one number (`$62` `500` → 62500). With structured cell values this rarely happens; keep the check anyway.
6. **Choose one primary tab:** the tab with the most matched date/value pairs. Use other tabs only for dates the primary is missing. **Never add the same date from two tabs**: the same numbers often appear on a daily tab and a summary tab.
7. **Period.** From the dates found: median gap ≤ 2 days = `day`; ≥ 6 days = `week`; otherwise `range`. A weekly series is recorded as weekly rows, not spread over days.
8. Record `lastTab`, `lastPeriod` and `lastError` for the offer. On success clear `lastError`.

## 3. Reading a Slack channel

Count a message only if it contains the literal phrase **CASH COLLECTED** (any case). Take the dollar figure that follows the phrase on the same line. Date it by the message's post time unless the line has an explicit date. Keep the matched line as `raw`. Never take a dollar figure from a message without the phrase: channels are full of deal sizes and invoices that aren't daily cash.

## 4. Pasted numbers

Each line: a date and a cash amount, optionally ad spend. Apply the same date and money rules. Read the parsed rows back to Dan before saving.

## 5. Checks before reporting

- Any offer whose month total moved by more than 30% versus the last sync without new dates: flag "tracker changed".
- A tracker that failed: show it in the brief with `lastError`; use the last good data and say so.
- When Dan says a number is wrong, find the rows that produced it and show them. Never adjust a formula to match.
