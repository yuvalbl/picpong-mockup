# Open questions — mockup-v4

> Running list of decisions still pending Yuval/Kuki input. **From now on, open questions live here** (not scattered in the individual PRDs). When one is resolved, move the decision into the relevant PRD's "Decisions" section and mark it resolved here with the date + answer.

| # | Question | Raised in | Owner | Status |
|---|---|---|---|---|
| OQ-1 | **Form contact requirement:** is "**at least one of Email/Phone** required" (current PRD 2 §4.1 spec) the right rule — or should we force **both**, or make **Email the sole required** channel? Lowest-friction is at-least-one; forcing both raises friction but guarantees two reply paths; Email-only is simplest but loses Kuki's phone/WhatsApp lead. | PRD 2 §4.1 | Yuval + Kuki | **Open** |
| OQ-2 | **WhatsApp number:** the prefilled `wa.me` link uses a placeholder (`WA_NUMBER = "972000000000"` in `mockup-v4/js/app.js`). Need Picpong's real WhatsApp Business number to make it functional. | PRD 2 §9 | Yuval + Kuki | **Open** |

## Resolved

_(none yet — move answered questions here with date + decision, and update the source PRD.)_
