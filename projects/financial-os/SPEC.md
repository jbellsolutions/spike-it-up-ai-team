# Financial OS: project spec

**Owner:** Dan (personal) · **Builder:** Claude Code · **Runs on:** a Claude Code folder on Dan's Mac + Google Drive, and optionally the Money Manager bot on the personal GrokBot account

## 0. Charter

**What:** "Can I afford this? Should I?" answered from Dan's real money and his own journal, plus a monthly review.

**Why:** Dan started this from a creator's Financial OS setup, swapped in Monarch and Apple Notes, built a Drive folder for CSV uploads, and stopped there.

**Done means:** Dan exports from Monarch, asks a money question in Claude Code (or the Money Manager), and gets yes/no first, then the reasoning, by his rules.

## 1. Folder

```
~/Financial OS/                     (and the same folder in Google Drive)
  CLAUDE.md                         Dan's rules (section 2)
  monarch/                          Monarch CSV exports (transactions, balances)
  journals/                         Apple Notes journal exports, one .md per day
  documents/                        mortgage, vehicles, statements, insurance
  reviews/                          monthly reviews
```

Prompt for Claude Code:
```
Set up my Financial OS from projects/financial-os/SPEC.md in
https://github.com/jbellsolutions/spike-it-up-ai-team. Use Monarch, not Kubera,
and Apple Notes, not Day One. Show me the plan, then build it.
```

## 2. CLAUDE.md (Dan's rules)

```markdown
# Financial OS: instructions for Claude

## When I ask a money question
1. Check my liquid position first: cash and accessible funds only (from the latest monarch/ export).
2. Search recent journals/ for this topic.
3. Pull the relevant document from documents/ if it applies.
4. Give me a yes or no first, then the reasoning.

## Affordability
"Can I afford this?" means paying from liquid funds without touching investments or taking on debt.
Never answer on net worth.

## Values check (any discretionary purchase)
- Have I mentioned this before? Considered or impulse?
- Does it fit the life I've described wanting?
- Would I feel good about it in 30 days?

## Monthly review (the 4th)
1. Net worth vs last month: what moved and why.
2. Biggest spending themes in this month's journals.
3. Anything unusual.
4. Progress on goals I've mentioned.
5. One paragraph I can act on.

## Standing rules
- Keep business and personal money separate.
- Never recommend selling long-term investments for lifestyle purchases.
- Give me both "you can afford this" and "this is a good idea".
- If I sound excited, slow me down.
- Any single purchase over $<THRESHOLD> gets a 24-hour review.
- If the latest Monarch export is more than 10 days old, tell me before answering.
```

## 3. Getting data in

- **Monarch:** export transactions and account balances as CSV into `monarch/` (Monarch: Transactions → export; Accounts → export). When Monarch offers an API, add a script that pulls them daily instead.
- **Apple Notes journal:** an iPhone Shortcut, run nightly by an automation: find notes in the "Journal" folder modified today → save each as text to `Google Drive/Financial OS/journals/<date>.md`. Claude Code writes the step-by-step Shortcut instructions for Dan.
- **Documents:** drop PDFs into `documents/`.
- **Sync:** the folder lives in Google Drive, so the Mac and the Money Manager bot see the same files.

## 4. Monthly review

A Claude Code scheduled task (or the Money Manager's routine on the 4th) runs the review and saves it to `reviews/<YYYY-MM>.md`.

## 5. INPUT NEEDED

- Dan's 24-hour-review threshold.
- His money goals, in his words.

## 6. Acceptance

- [ ] "Can I afford a $3,000 trip?" returns yes/no first, uses liquid funds only, and runs the values check.
- [ ] A purchase over the threshold gets "let's look again tomorrow".
- [ ] A stale export is flagged.
- [ ] The monthly review produces all five parts.
