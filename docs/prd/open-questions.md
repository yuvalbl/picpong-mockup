# Open questions — mockup-v4

> Running list of decisions still pending Yuval/Kuki input. **From now on, open questions live here** (not scattered in the individual PRDs). When one is resolved, move the decision into the relevant PRD's "Decisions" section and mark it resolved here with the date + answer.

| # | Question | Raised in | Owner | Status |
|---|---|---|---|---|
| OQ-1 | **Form contact requirement:** is "**at least one of Email/Phone** required" (current PRD 2 §4.1 spec) the right rule — or should we force **both**, or make **Email the sole required** channel? Lowest-friction is at-least-one; forcing both raises friction but guarantees two reply paths; Email-only is simplest but loses Kuki's phone/WhatsApp lead. | PRD 2 §4.1 | Yuval + Kuki | **Open** |
| OQ-2 | **WhatsApp number:** the prefilled `wa.me` link now points at the **Twilio WhatsApp sandbox** (`WA_NUMBER = "14155238886"`, +1 415 523 8886) for testing. Still need Picpong's **real WhatsApp Business number** for launch. | PRD 2 §9 | Yuval + Kuki | **Open (sandbox set)** |
| OQ-3 | **Home page — do we need BOTH "From the studio journal" (the daily-feed strip, §8) AND "Trusted on the world's biggest show floors" (the "Selected work" projects teaser)?** Both are bands of project-photo cards on the Home page (plus the client-logo marquee = a third "our work/clients" surface). They have *different* intended jobs — the projects teaser = curated, evergreen **portfolio/proof** linking to deep case studies; the journal = a rolling, frequently-updated **"we're alive, here's recent work"** feed (freshness + SEO + a reason to return). The risk is they *look* alike (same brands, same hero shots) so a visitor reads "projects… and more projects." Decision needed: keep both (and differentiate the journal into a real *diary* register — process/behind-the-scenes/dated, not a second polished portfolio), or cut/merge one. See the assistant's recommendation in the session reply. | PRD 3 §8 | Yuval + Kuki | **Open** |

## Resolved

_(none yet — move answered questions here with date + decision, and update the source PRD.)_
