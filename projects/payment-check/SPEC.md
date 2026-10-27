# Payment Check: project spec

**Owner:** Dan · **Runs on:** GrokBot (Revenue Analyst) · **Claude Code's part:** optional Stripe and billing-sheet export script

## 0. Charter

**What:** compare the cash the team reports (EODs, "CASH COLLECTED" posts, offer trackers) against the cash billing actually received, and flag every gap before payroll.

**Why:** on the Aug 18 call Dan described a large gap between reported cash collected and billing's records. Pay and commissions ride on these numbers.

**Done means:** every gap over the threshold is flagged to Dan the day it appears, with the rows on both sides.

## 1. Sources

| Side | Source | Access |
|---|---|---|
| Reported | `data/eod/` (per rep per day), each offer's tracker, deal posts in the team's win channel | Read only |
| Verified | The billing team's Google Sheet, or Stripe with a **restricted read-only key** (charges, payments, refunds; no write) | Read only |

## 2. Matching

Per offer and per day (and per rep where billing records the rep):
- `reported` vs `verified`, after refunds.
- A gap counts when it's over the threshold in `context/offers.md` (default: $500 or 5%, whichever is larger).
- Timing: a payment can land a day or two after the deal is reported. Compare on a rolling three-day window before flagging.
- Each flag: date, offer, rep (if known), reported rows, verified rows, gap, and the likeliest reason (late posting, refund, typo, missing payment).

## 3. Output

- Daily: flags in `daily/<date>/revenue.md` (only when there are any).
- Weekly review: the week's reconciliation in one table.
- Month close: a reconciliation Dan can hand to payroll.

The bot never contacts billing or a rep about a gap. Dan decides.

## 4. Claude Code work (optional)

If the billing sheet is messy or Stripe needs pulling on a schedule: a small script that exports verified payments daily to a clean sheet tab or CSV in Drive (`Payments/verified-<date>.csv`), which the Revenue Analyst reads. Prompt:
```
Read projects/payment-check/SPEC.md in https://github.com/jbellsolutions/spike-it-up-ai-team.
Write a script that pulls yesterday's succeeded charges and refunds from Stripe using a restricted
read-only key from an env variable, and writes them as CSV to the Drive folder Payments/.
Show me the plan first.
```

## 5. INPUT NEEDED

- Which billing source is the truth (sheet or Stripe), and read access.
- How billing records the rep and the offer on each payment.
- Dan's gap threshold.

## 6. Acceptance

- [ ] A planted mismatch (reported $5,000, verified $4,000) is flagged with both rows.
- [ ] A payment that lands two days late is not flagged.
- [ ] A refund reduces verified cash.
- [ ] Nothing is written to billing's sheet or Stripe.
