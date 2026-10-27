# Funding Launch: project spec

**Owner:** Dan · **Runs on:** GoHighLevel (the business's own sub-account) + Claude Code on Dan's Mac + the Funding Launch bot · **Claude Code's part:** forms, custom fields, funnel, lead handling and workflows

## 0. Charter

**What:** launch Dan's funding business. It's separate from the partner program he sells for. It helps clients get business or personal funding, and helps with credit repair when they can't get funded yet. Referrals come from the partner program's community: members who are good prospects but don't have the cash right now.

**Why:** the business was ready to go for months and kept getting pushed behind the offers. It's now Dan's top priority.

**Done means (draft for Dan to confirm):** the forms and funnel are live in the business's GHL sub-account, every form lands in a pipeline with the right tags, and the first partner-community referrals have gone through the whole path.

## 1. Already started: continue, don't restart

Dan began this build with Claude Cowork and Claude Code. His project folder holds:
- a project charter and an agent charter;
- a build spec, a workflow map and an inputs-and-decisions list;
- a status board and a README with a kickoff message.

It also has a GHL Private Integration and the sub-account's location ID. About 60 custom fields already exist, and the forms are being copied from a reference site Dan was given.

Prompt for Claude Code, run inside that project folder:
```
Read projects/funding-launch/SPEC.md in https://github.com/jbellsolutions/spike-it-up-ai-team
and this folder's charter, build spec and status board.
Don't start over. Tell me in ten lines what's done, what's left in the foundation
(forms, custom fields, funnel, lead handling, follow-up workflows), and the next step.
Compare what's built against section 5 of the spec and list the gaps.
Keep it lean: skip offer ladders, team phases and anything about merging with the partner program.
```

If the folder is gone, start from `claude-code/skills/build-from-spec` with this spec.

## 2. Pieces

| Piece | Who builds it | Where |
|---|---|---|
| Offer, pricing, fulfilment, processing partner | Dan (Justin's network can help with processing and intros) | Dan's decisions |
| Compliance review | Dan's counsel | Before any copy goes live |
| Custom fields, forms, funnel | Claude Code | The business's GHL sub-account |
| Lead handling and follow-up workflows | Claude Code builds them; the Funding Launch bot drafts the messages | GHL, as Drafts until Dan's yes |
| Referral tracking | Claude Code | GHL tag `src:partner-referral` and a source field |
| Daily status, launch checklist, GHL health watch | Funding Launch bot | `context/funding-launch.md`, `daily/<date>/funding.md` |

## 3. Forms (chosen: native GHL forms)

Each application form is rebuilt as a native GHL form or survey and embedded on the site or funnel page. Submissions land in GHL with no code to maintain. Each form's submission triggers one workflow, in this order:
1. Tag the contact.
2. Open an opportunity in the right pipeline and stage.
3. Send the speed-to-lead message. It stays a draft until Dan gives a standing yes.
4. Create a task for a person if there's no reply.

Only if a site's own form must stay: POST it to a GHL **Inbound Webhook** workflow trigger. Map every field explicitly so nothing is dropped silently.

**Access:**
- Claude Code uses the GHL Private Integration Dan created. The key lives in a gitignored `.env.local` and is never pasted into a chat. Rotate any key that was.
- When the API can't do something (funnels, some workflow steps), Claude Code may drive GHL in Dan's own logged-in Chrome, because he asked it to.
- The GHL Super Hub (`github.com/jbellsolutions/ghl-super-hub`) has the skills for both.

**Build rules:**
- Build additively and never delete. Old things get a `ZZ-ARCHIVE |` prefix.
- Never write permission-checker rules into this spec or the project's CLAUDE.md that block the build itself. Approvals belong in Claude Code's settings.

## 4. Copy rules

- No guaranteed approvals, funding amounts, score increases or timelines.
- No upfront-fee wording for credit repair.
- Every claim must be on the "may say" list in `context/funding-facts.md`, which Dan fills in after counsel's review.
- The bot and Claude Code both check every draft against it.

## 5. Acceptance

- [ ] A test submission of each form creates the contact, tags it, and opens an opportunity in the right pipeline and stage.
- [ ] A referral from the partner community carries `src:partner-referral`.
- [ ] No form submission lands outside a pipeline: the GHL health check reports zero.
- [ ] The speed-to-lead message goes to Dan for approval. Nothing sends without his yes or a standing yes.
- [ ] Copy passes the "never say" check.
- [ ] The first real referrals go through end to end, and Dan marks the business launched.

## 6. INPUT NEEDED

- The project folder's status board, or a ten-line summary of where the build stands.
- What "launched" means to Dan: confirm or change the draft in section 0.
- Pricing, who fulfils, the processing partner.
- Counsel's "may say / never say".
- How referrals arrive from the partner community: a post with a link, a form, or a tag.
