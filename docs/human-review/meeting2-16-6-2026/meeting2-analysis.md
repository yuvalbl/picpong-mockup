# Meeting 2 — Prototype-Review Analysis (input to the PRD update)

> **Purpose:** Distill the prototype-review meeting into **what was validated, what was refined, and what is newly required** for the Picpong website - the delta the PRD must absorb. Unlike Meeting 1 (requirements-gathering), this meeting reviewed a working prototype built *from* those requirements, so the focus is on confirmation and refinement.
> **Source:** `meeting2-summary.md` + `meeting2-transcript.md` (this folder).
> **Meeting:** 2026-06-16, 12:44-13:04 · **Participants:** Yuval (design/product) × Kuki Saad (sales/business).
> **Continuity:** FR/NFR/CR IDs carry over from `../meeting1-3-6-2026/meeting1-analysis.md`. New requirements get fresh IDs (FR-29+); existing IDs are cited where the prototype **confirmed** or **refined** them.
> **Status:** Analysis for review.
> **Naming note:** The summary/transcript render the brand as "PingPong / פינג פונג" (a transcription artifact) - the actual brand is **Picpong / Pic Pong.biz** (FR-2). Treat every "PingPong" here as Picpong. See §9.

---

## 1. Meeting purpose & outcome

Yuval walked Kuki through a **working prototype** that unifies the quote-request flow which is today scattered across channels. Kuki **validated the direction** without reservation - *"זה סבבה, זה כיוון מעולה"*, *"מעולה"* - then layered on targeted feedback (sustainability emphasis, audience precision, English taxonomy). The meeting doubled as a **commercial checkpoint**: Kuki needed a written quote by **15:30 the same day** to present the prototype and pricing to **David and Amir** (stakeholders/decision-makers), so effectively this is a *concept sign-off in progress* plus a go/no-go on funding Phase 2.

This reframes the document: the spine is no longer "elicit requirements" but **"which Phase-1 requirements are now confirmed, and what did the review add or sharpen."**

---

## 2. Requirements confirmed by the prototype

The prototype made the Meeting-1 requirements tangible, and Kuki approved them on sight. These are now **validated**, not merely specified:

| Demonstrated in the prototype | Meeting-1 FR | Verdict |
|---|---|---|
| "+" / **"I want this"** affordance on every image, product, media | FR-16, FR-17 | Confirmed |
| Quote/contact form pre-bound to the clicked item, with its **thumbnail** | FR-17, FR-18 | Confirmed |
| **One-click "I liked this, get back to me"** intent, no payment | FR-19 | Confirmed |
| Routing to **email and WhatsApp**, switchable, email as default | FR-22 | Confirmed |
| **Persistent contact** element accompanying the whole experience | FR-20 | Confirmed |
| **Deep-linkable** projects; a rep sends a customer to a specific item | FR-15 | Confirmed |
| **Catalog browse-only** + **Projects** as distinct surfaces | FR-10, FR-12 | Confirmed |
| Reuse of the current site's moving-feed element as the **Studio Journal** | FR-24 | Confirmed + refined (→ FR-32) |
| **English-first** for the Czech/international use case | FR-4, NFR-6 | Reaffirmed as strategic priority |
| **Eco/green-only** content, excluding signage/army/municipality work | CR-1 | Reaffirmed - *"שלטים וצבא ועיריות... לא פה"* |

**Reading:** the core interaction model (per-media lead capture → consolidated request → routed to a human) survives contact with the client. The PRD's Phase-1 spine is intact; the rest of this document is refinement on top of a confirmed foundation.

---

## 3. New & refined requirements (the substance for the PRD update)

### 3.1 Multi-item quote list (the "cart replacement")
- **FR-29 — Accumulating quote list.** A visitor adds **multiple media items** across the site into a **single** quote request - a deliberate stand-in for a shopping cart, since there is no purchase. *Source: "תחליף של עגלת קניות, כי זה לא עגלת קניות."*
- **FR-29a — First-add confirmation only.** The list-attachment confirmation surfaces **only on the first add**, not on every add (repeated toasts are annoying). *Source: "זה לא יקפוץ כל פעם שאני מוסיף אייטם כי זה יהיה מאוד מעצבן. רק בפעם הראשונה."*

### 3.2 Routed request payloads (email + WhatsApp)
- **FR-30 — Pre-composed WhatsApp message.** Choosing WhatsApp opens a **structured, pre-written** message - fixed opener plus the selected items' links and image: *"Hi PingPong, I'd like a quote on these items."* Arrives as a chat message, not an email. *Source: transcript 3:14-3:23.* (The opener text must read "Picpong", not "PingPong" - see §9.)
- **FR-31 — Consolidated sales-rep email.** The rep receives **one email listing each selected item with its link (and thumbnail)**, so they instantly know what the customer wants without back-and-forth. This is the whole point of the consolidation: *"אני יכול לראות את הפריטים אחד אחד ולדעת על מה הוא מדבר ולא צריך להתחיל להסתבך."* Refines FR-22/FR-23.

### 3.3 Known limitation (MVP-accepted)
- **KL-1 — WhatsApp single-image cap.** On a **multi-item** WhatsApp request, only the **first item's image** renders (WhatsApp platform limitation); the rest are links/text. Yuval flagged it; **Kuki accepted it for the MVP** - *"סבבה."* Revisit only if it proves a real friction point. *Source: 5:46-5:55.*

### 3.4 Sustainability as the loud, primary message
- **FR-32 (positioning) — Sustainability must "scream."** The site exists **primarily** to sell the green/סביבה story; the eco message should be **loud and deliberate**, not subtle. Candidate device: **nature imagery** (ocean, rainforest) in a dedicated hero-ish spot. *Source: "אנחנו מקימים את האתר הזה לטובת הקטע הירוק... שזה צריך לצרוח את זה... תמונה של אוקיינוס או יער גשם."* Strengthens CR-1/CR-2 and the Meeting-1 positioning.
- **Design constraint (carries CR-3):** a dedicated eco section already exists in the prototype with many small green references; it can be made bolder, **but** a "glowing green" must still harmonize with the rest of the palette - *"אם פתאום אני אשים פה ירוק זוהר זה לא יסתדר עם הצבעים למעלה."* So: louder message, disciplined color.
- **Buyer persona sharpened:** the message is aimed at the **sustainability / CSR manager at a hi-tech company** who mandates "from now on we work with him - stop the PVC and tarpaulins." *Source: "מי שאחראי על קיימות במיקרוסופט... תפסיקו עם PVC ועם שמשוניות."*

### 3.5 Audience segments (now explicitly three)
Kuki dictated the target list verbatim - *"תרשום לך"* - refining Meeting-1 §2:

| Segment | Priority | Note |
|---|---|---|
| **Hi-tech companies** (Microsoft/Google-type) | Primary | Buy exhibitions/conventions/booths; CSR angle is the wedge |
| **Production companies** (agencies producing hi-tech events) | Secondary | *"באה חברת הפקה... אני צריך לעשות אירוע עובדים לגוגל"* |
| **Independent producers** | Secondary | The third of Kuki's "three worlds" |

Priority-among-segments for the site's core messaging is an **open question** (see §7).

### 3.6 Site structure & sections
- **FR-33 — Studio Journal feed.** An **auto-updating feed** ("From the Studio Journal") of latest studio work/updates, reusing the current site's moving-but-unobtrusive element. Backed by the daily CMS (FR-24). *Source: 7:50-8:09.*
- **FR-34 — Featured Works (curated).** A **separate, hand-curated** section of Kuki's best/showcase works, **distinct** from the auto feed. The two are complementary, each with a different job; both optional. *Source: "זה עבודות נבחרות... העבודות הכי טובות שאתה רוצה להציג. לא חייבים את שני הsections."*
- **FR-35 — Catalog vs Projects, differentiated by design.** Catalog reads **cleaner, quieter, more solid** (*"פחות קופץ בעין"*); Projects reads **more dynamic and visual** but **balanced and dignified**, not constantly jumping. Refines CR-4. *Source: 9:16-9:34.*
- **FR-36 — Per-project page = one main image + several supporting media, each independently attachable to a quote.** A single project may contain **several booths**, so the visitor must be able to say "in Google's project I want *this* booth." Each project must ultimately **drive a lead**. Refines FR-14 and extends FR-16 to the project page. *Source: "יש פרויקט שיהיה לו כמה דוכנים... אני רוצה בפרויקט של גוגל את הדוכן הזה."*
- **FR-37 — Products section** returns as a distinct band showing the products themselves, needing **real Picpong photos** (currently placeholders) plus eco messaging (Recycle / Resistance). *Source: 8:10-8:38.* Depends on the asset delivery in §8.
- **In-page linking model:** the "Latest"/section blocks and Contact are **navigational pointers** (in-page anchors or dedicated pages) that keep a growing archive tidy - Kuki already has **hundreds** of past items, not a half-year's worth. *Source: 10:06-10:34.*

### 3.7 English service taxonomy
- **FR-38 — Service terms in English.** Converging on **Events, Conventions, Trade show booths** - preferring "Trade show booth" over/alongside "Exhibitions" because it spells the offering out for an international audience (*"להאכיל אותם בכפית"*). Final wording is **Kuki's call** (open question / action item). Reinforces the scope exclusion of signage/army/municipality work. *Source: 14:33-15:42.*

### 3.8 Mobile & polish
- **FR-39 — Mobile layout reworked toward the reference site** Kuki supplied, for a more harmonious feel; the **persistent quote element must not obscure content on mobile**. Explicitly a **first/draft pass** with known rough edges to close. *Source: "קצת שיניתי... שיהיה יותר דומה לאתר שנתת לי... במובייל הדבר הזה... לא צריך להיות מסתיר."* Refines FR-7.

### 3.9 Future/optional capability
- **FR-40 (Phase 2+, optional) — AI lead-research agent.** On lead submission, an agent produces a **short brief on the enquiring company/person** (what they do, who is writing) to prep the sales rep before the call. Yuval floated it as headroom, explicitly the client's call on depth. *Source: "ליצור איזשהו Agent שעושה מחקר קטן... אתה עכשיו הולך לדבר עם משה כהן מחברת ABC."* Keep out of Phase-1 scope; log as a growth option.

---

## 4. The lead-handling operational model (business context shaping the product)

Not a website requirement per se, but it sets the **latency and volume assumptions** the product must serve:

- Kuki will staff a **dedicated, full-time person whose only job is to respond to leads immediately** and hand them off to field sales reps. *Source: "בן אדם שכל המהות שלו זה לחזור ללידים האלה מיידית... זה עבודה במשרה מלאה."*
- Implication for the PRD: the consolidated email/WhatsApp payload (FR-30/FR-31) is the **primary work-surface of a real human role**, so its clarity and completeness are load-bearing, not cosmetic. The optional AI brief (FR-40) is the scale valve if volume justifies it.

---

## 5. Timeline, effort & commercial framing

| Phase | Scope | Estimate | Notes |
|---|---|---|---|
| **Phase 1** | Spec + design (this prototype → build-ready "instructions for construction") | **~25 hours total, ~12.5 already done** | One more focused pass expected to finalize a precise, standalone mock-up |
| **Phase 2** | Implementation / build of the custom system (not Wix/off-the-shelf, per NFR-2) | **100-200 hours** | Range **driven mainly by Kuki**: fewer open decisions and fewer revision rounds → lower end |

- **Deliverable framing (FR/NFR link):** Phase-1 output is a **self-standing spec** ("instructions for construction") from which the custom **system** (tailored, not a template) is built - reaffirms NFR-2. *Source: 16:50-17:34.*
- **Commercial action:** Yuval to send a **written, itemized quote** for both phases **by 15:30 today**; Kuki presents prototype + quote to **David and Amir at 15:30**. The prototype **link is live** and Kuki may use it. *Source: 18:10-19:19.*

---

## 6. Decisions taken / to settle

| ID | Item | Status after Meeting 2 |
|---|---|---|
| **M2-D1** | Overall concept & unified lead flow | **Approved** ("כיוון מעולה"); proceed to precise mock-up |
| **M2-D2** | WhatsApp single-image limitation (KL-1) | **Accepted for MVP** by Kuki |
| **M2-D3** | Sustainability = loud, primary message | **Decided** (must "scream"); execution (nature imagery, intensity) to detail |
| **M2-D4** | Audience = hi-tech + production companies + independent producers | **Decided**; *priority among them* still open (Q-A) |
| **M2-D5** | English service taxonomy (Events / Conventions / Trade show booths) | **Direction set**, exact wording pending Kuki (Q-B / action item) |
| **M2-D6** | Fast-track (build on Kuki's knowledge) **vs.** user-research (interview hi-tech HR/producers) | **Open fork** for Kuki - a time/cost/speed-to-launch trade-off (Q-C) |

---

## 7. Open questions (resolve before/while updating the PRD)

| # | Question | Context | Owner |
|---|---|---|---|
| Q-A | **Which audience segment leads** the core messaging? | Three segments with slightly different needs/messages | Kuki (decide) |
| Q-B | **Final English service terms** - "Exhibition / Trade show booth" vs. "Trade show booth" only? | International clarity vs. brevity | Kuki (decide) |
| Q-C | **Fast-track vs. formal user research** with hi-tech decision-makers? | Deeper market validation vs. added time/cost; also gates launch date | Kuki (decide) |
| Q-D | **How many design refinement rounds** before go-live? | Prototype is functional but a first draft with known gaps; rounds drive the Phase-2 hours range | Kuki + Yuval |
| Q-E | **When are real product/project photos available?** | Placeholders today; needed for Phase-2 build (FR-37) | Kuki (deliver) |
| Q-F | **Sustainability messaging intensity** - how loud vs. how woven-in? | Must "scream" yet harmonize with the palette | Both |
| Q-G | **Is KL-1 (WhatsApp single image) acceptable long-term**, or is a workaround needed? | Accepted for MVP; may need a more complex solution later | Yuval (technical), Kuki (business) |

*(Carry-over from Meeting 1 still relevant: Q1 video "+" behavior, Q4 form field set, Q5 SEO - none were closed here.)*

---

## 8. Action items

| Owner | Action |
|---|---|
| **Yuval** | Send the **written, itemized quote** (spec + build phases) **by 15:30 today** |
| **Yuval** | Continue refining the mock-up per this feedback to a precise, build-ready spec |
| **Yuval** | Collect **product/project photos from Kuki** for catalog & project pages (FR-37) |
| **Kuki** | Review the shared **prototype link** and add any further design notes |
| **Kuki** | Present prototype + quote to **David and Amir at 15:30** |
| **Kuki** | Send Yuval **green/eco reference sites** |
| **Kuki** | Decide **final service taxonomy** (Q-B) for message consistency |
| **Kuki** | Decide **fast-track vs. user research** (Q-C) |
| **Both** | Assess whether to run **user interviews** with hi-tech producers/HR to sharpen messaging |

---

## 9. Notes & flags

- **Brand string bug:** the prototype's WhatsApp opener reads **"Hi PingPong, I'd like a quote on these items"** - the brand is **Picpong / Pic Pong.biz** (FR-2). Fix the string wherever the brand appears in copy and payloads.
- **Doc labeling:** `meeting2-summary.md` renders the brand as "PingPong / פינג פונג" throughout. It is the same Picpong project; the discrepancy is a transcription artifact, not a rename.
- **Prototype maturity:** repeatedly described as a **first/draft version** with intentional gaps ("גרסה ראשונית, לא גרסה סופית") - the confirmations in §2 are of **direction**, not of pixel-final execution.

---

## 10. Next steps (process, not requirements)

- Fold §3's new FR-29..FR-40 and the refinements into the **PRD update**; resolve §6/§7 with Kuki.
- Send the quote, then run the **next focused refinement pass** to convert the prototype into the standalone build spec (the ~remaining half of Phase-1's 25 hours).
- Gate Phase-2 estimate tightening on Q-C (research or not), Q-D (rounds), and Q-E (real assets).
