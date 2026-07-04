# Palette refinement - warm up the home page (color cohesion)

Covers the home page of `mockup-v5` (`index.html` + `css/styles.css`), dated 2026-07-04. This is a color harmony / warmth pass. The governing rule: **blue is permitted only as water depiction, and only in the two nature moments that bookend the page** - the hero pond (top) and the sustainability ocean (bottom). Everywhere else consolidates onto one warm accent (orange) over neutrals (kraft / cream / ink). Concretely: **keep** the hero pond panel (the pufferfish's pond), **warm** the funnel lane-02 blue, **cut** coral, and enforce one accent per section. This is NOT the WCAG contrast work; those fixes live in `docs/todo/accessibility-il-5568.md` and `docs/todo/font-sizes.md` and are only cross-referenced where a warmth change happens to help contrast too.

> **Decision (owner, 2026-07-04): keep the hero blue box with the fish.** An earlier draft of this plan demoted the hero pond panel to orange. The owner chose to keep it: the pufferfish + bubbles make that blue read as the fish's *pond* (a depiction), not a stray cold UI panel, and it deliberately rhymes with the sustainability ocean at the bottom of the page. So the pond stays in the hero; the warming effort moves to funnel lane 02 (the actual scattered-blue offender) and to coral. Honest trade-off accepted: the page opens on cool blue rather than warm brand orange, mitigated by the visible fish reading as brand personality, not SaaS-cold.

## Executive summary

- [ ] KEEP the hero headline tile's `panel--pond` (and its orange CTA, ink underline, fish, and bubbles) - no change. It is the top half of a deliberate two-touch water motif, not an intrusion. Rationale below.
- [ ] Remove coral entirely: repoint the slogan's second marker from `mark--coral` to a warm in-family marker (`--orange-deep`) - the `.mark--coral` spans in `index.html` (and the slogan phrases in `app.js`) + the `.slogan .mark--coral` rule in `styles.css`.
- [ ] Dual-funnel lane 02: swap `panel--pond` for `panel--orange` so the primary lead lane reads as the warm "act now" color, ink lane 01 stays the neutral - the `panel--pond` class on the second `.lane--panel` (the `#contact` lane) in `index.html`. **This is the change that keeps the hero pond coherent**: it pulls blue out of its one non-nature home, so blue lands in exactly two water-depiction spots (hero pond + sustainability ocean) instead of scattered across three.
- [ ] Update the lane-02 pond hover rule to the new orange panel - the `.panel--pond.lane--panel:hover` rule in `styles.css`.
- [ ] Retire the coral tokens (`--coral`, `--coral-deep`) to keep the token set honest - the `--coral` / `--coral-deep` `:root` tokens in `styles.css`. KEEP the `panel--pond` rules (the hero still uses them).
- [ ] Keep the sustainability ocean-to-forest gradient exactly as is, and use the **same** `--pond` token there and in the hero so the two blues visibly rhyme as bookends. Do NOT dial the ocean glow down (the earlier draft's optional tightening is reversed - it only made sense when the hero pond was being removed).
- [ ] Recomment the `--pond` `:root` token as "water depiction only - hero pond + sustainability ocean; never a UI accent." Note: the literal `#2A9BD0` also appears off the home flow, in an inline product "Water-resistant" badge and in decorative board SVGs - that is fine and out of this pass's scope.

## Details

> Line-number caveat: the `css/styles.css` line numbers below are close but not exact (minor drift of a line or two, e.g. `.slogan .mark--coral` is around line 1145, not 1143), and the `index.html` references have drifted about +3 (the hero headline tile is at `index.html:96`; the dual-funnel `#contact` lane and the slogan `mark--coral` span are a few lines lower than cited). Locate each target by its selector / class via `grep`, not by the raw line number.

### The governing principle: blue = water depiction, permitted twice

The whole plan rests on one distinction the codebase already half-encodes: **pond blue is allowed as depiction (portraying water/nature), never as a UI accent or a decorative panel fill.** Under that rule blue has exactly two legitimate homes, and they bookend the page:

1. **Hero pond** (`html:96`) - a flat blue field on its own would be a cold decorative panel and would fail the rule. What rescues it is the **pufferfish (`html:108`) + white bubbles (`css:1174-1185`)**: they turn the blue into the fish's *pond*, i.e. a depiction of water. Remove the fish and the exception collapses; with the fish, the blue is earned.
2. **Sustainability ocean** (`html:529-558`) - the `--pond` glow blended into a `--forest` rainforest gradient literally pictures ocean-to-canopy nature; the cool tone is semantically motivated.

Both are nature depictions; both are accented with orange (the CTA on the hero pond, the punch line / pillars / CTA in sustainability). So the page still reads as "one warm accent (orange) over neutrals," with blue appearing only where it depicts water. Everything below serves that rule.

### Token / accent inventory

Cool or non-warm accents are the target of this pass; warm tokens are the system we are consolidating onto.

| Token | Value | Family | Where it is used on the home page | Verdict |
|---|---|---|---|---|
| `--orange` | `#E67A2F` | warm (primary) | Brand dot/underline (nav), buttons, marquee sparkle (`css:321`), catalog totem accent, `.accent` underline, focus ring, sticker dot (`css:809`) | Keep - THE accent |
| `--orange-bright` | `#F58729` | warm | On-dark eyebrows/accents (`css:110,128`), slogan orange marker (`css:1142`), sustainability punch/pillars/CTA | Keep |
| `--orange-deep` | `#E45C01` | warm | Contact FAB hover, facet active state | Keep - reuse for the slogan's 2nd marker |
| `--kraft` / `--kraft-deep` | `#C49A6C` / `#a87d4f` | warm neutral | Slogan tile panel (`html:172`), kraft marquee, About band, eyebrow color, edge divider | Keep - the cardboard base tone (neutral, not an accent) |
| `--cream` / `--cream-2` | `#F7F7F1` / `#FDFDF7` | warm neutral | Page and section backgrounds | Keep |
| `--ink` / `--gallery` | `#1A1A1A` / `#2b2b2b` | neutral dark | `panel--ink` lane, dark bands (trust/spec/projects), footer | Keep - the neutral dark |
| `--pond` | `#2A9BD0` | COOL | Hero headline tile (`html:96`), dual-funnel lane 02 (`html:224`), sustainability bg glow + wave (`css:493`, `html:533`) | Keep as water depiction ONLY: hero pond + sustainability ocean (both nature-licensed); REMOVE from funnel lane 02; never a UI accent |
| `--coral` / `--coral-deep` | `#FF6F5E` / `#F8523F` | warm-but-off | Slogan 2nd marker only (`html:178` via `css:1143`); `-deep` unused | Cut - retire both tokens |
| `--forest` / `--forest-deep` | `#123B33` / `#05120F` | cool-green | Sustainability gradient only (`css:494`) | Keep - the other half of the ocean-to-canopy depiction |

The remaining "un-warm" footprint after this pass is small and deliberate: pond blue in exactly two nature moments, and zero coral.

### Per-section accent map (current vs proposed)

Walking top to bottom. The rule: orange is the single UI accent; kraft/cream/ink are neutrals; blue appears only as water depiction (hero pond, sustainability ocean); coral is gone.

| Section (source) | Current accent(s) | Change? | Proposed |
|---|---|---|---|
| Ribbon + Nav (`html:32-67`) | ink + orange | no | unchanged (orange) |
| Hero - headline tile (`html:96`) | pond panel (fish's water) + orange CTA + ink underline | NO - KEEP | pond stays as depiction; orange CTA is the one accent; fish + bubbles license the blue |
| Hero - slogan tile (`html:172-180`) | kraft panel + orange marker + coral marker | drop coral | kraft panel + two warm markers (orange, orange-deep) |
| Hero - slideshow / video / sticker tiles | photos (neutral) + orange sticker dot | no | unchanged |
| Dual-funnel (`html:214-235`) | lane 01 ink panel, lane 02 pond-blue panel | YES - warm lane 02 | lane 01 ink (neutral), lane 02 orange (accent) - neutral vs hot funnel pairing |
| Trust marquee (`html:238-264`) | dark band + orange-bright eyebrow | no | unchanged |
| Latest strip (`html:269-337`) | cream + kraft eyebrow + orange arrows | no | unchanged |
| Catalog preview (`html:340-444`) | cream-2 + kraft eyebrow + orange (totem, badges) | no | unchanged |
| Spec strip (`html:449-463`) | dark band + orange-bright | no | unchanged |
| Kraft marquee (`html:466-477`) | kraft + orange sparkle | no | unchanged |
| Projects teaser (`html:480-523`) | dark band + orange-bright + orange link | no | unchanged |
| Sustainability (`html:529-558`) | forest+ocean gradient bg + orange-bright accent | no - KEEP | unchanged (the second water-depiction blue) |
| About (`html:561-570`) | kraft + orange link | no | unchanged |
| Contact (`html:573-609`) | cream + kraft eyebrow + orange button | no | unchanged |
| Footer (`html:614-637`) | ink + orange | no | unchanged |

The takeaway: only two spots change - the slogan's coral marker and dual-funnel lane 02. The hero pond stays. This is a smaller change than the earlier demote-everything draft, and it leaves the page's blue confined to its two nature moments.

### The specific changes

**1. Hero pond - KEEP (no code change).** The headline tile stays `panel--pond` (`html:96`, styled at `css:714-716`), with its existing orange CTA override (`css:755-756`), ink accent underline (`css:750`), pufferfish (`html:108`), and bubbles (`css:1174-1185`). Nothing here is edited. The orange-on-pond CTA is correct and pops - orange remains the section's one accent, the pond is the depiction field behind it. Contrast is already fine (ink-on-pond ~5.7:1, per the note at `css:709-710`); the a11y pass leaves the pond panel alone (it only touches the white-on-pond *badge* elsewhere, and the pond eyebrow re-verify, per `todo/README.md`). If a future review ever wants a quieter opening, `panel--kraft` is the fallback - but that is explicitly NOT this plan's direction.

**2. Cut coral.** Coral is used once: the slogan's second marker (`html:178` `mark--coral`, defined at `css:1143`). The design intent (comment at `css:1076-1078`) is two alternating markers so the slogan is not monotone. Keep that intent but stay warm: repoint to `--orange-deep`.

- `css:1143` -> `.slogan .mark--coral { --mk: var(--orange-deep); }` (or rename the class to `mark--deep` and update `html:178`).
- Retire `--coral` and `--coral-deep` at `css:20-21` (coral-deep is already unused). Removing the tokens prevents the accent creeping back later.

The load-bearing reason (not just aesthetics): orange is the site's single "I want this / +" action color (FR-16/17), applied across hundreds of media items - that affordance must stay unmistakable, so no near-orange hue (coral) should compete with it for a decorative, non-clickable role. Orange + orange-deep gives the slogan a two-tone warm rhythm without introducing a third hue.

**3. Dual-funnel lane 02 (the one real recolor).** Lane 02 (project enquiry) is a pond-blue panel (`html:224`, hover at `css:979`) - and it is blue's only non-nature home, so it is what makes blue look "scattered" rather than deliberate. Swap it to `panel--orange`. This both fixes the scatter and sets the correct funnel hierarchy: lane 01 neutral (ink, "browse the catalog") vs lane 02 hot (orange, "tell us about your project") - the enquiry is the site's primary conversion, so the brand-orange "act" color belongs there.

- `html:224` `panel--pond` -> `panel--orange`.
- `css:979` `.panel--pond.lane--panel:hover { background: var(--pond); }` -> `.panel--orange.lane--panel:hover { background: var(--orange); }`.
- The lane's bubbles (`html:229-231`, `css:988`) are white and still read on orange - leave them; they now rhyme with the hero pond's bubbles rather than duplicating its blue.

Note this puts orange on both the hero CTA and lane 02, separated by the rest of the hero and the funnel eyebrow - each section still holds one accent, and repeating orange for "the thing to click" is good wayfinding. If back-to-back orange feels heavy in review, `panel--kraft` for lane 02 is the quieter warm alternative (ink-vs-kraft funnel contrast).

**4. Token cleanup (minimal).** Because the hero keeps `panel--pond`, almost nothing is dead:

- KEEP the `panel--pond` rules at `css:714-716` (the hero uses them).
- The only dead rule is the lane-02 pond hover once lane 02 is orange - that is the repoint in item 3, not a deletion.
- Retire only `--coral` / `--coral-deep` (`css:20-21`).
- Recomment `--pond` at `css:19`: "water depiction only - hero pond + sustainability ocean; never a UI accent," so its two deliberate homes are legible to the next editor.

### The sustainability section (the second water-depiction blue)

The sustainability band (`html:529-558`, `css:485-529`) uses a `--pond` ocean glow blended into a `--forest` rainforest gradient (`css:491-494`, plus the wave at `html:533`). It stays unchanged - and under the keep-the-hero-pond decision it is no longer a lone exception but the **bottom bookend** of the page's water motif. Why it holds as depiction, not decoration:

1. It is full-bleed and fenced by corrugated `edge` dividers (`html:525`, `html:611`), so it reads as its own spread.
2. Its actual accent is already `--orange-bright` (punch line `css:513`, numbered pillars `css:525`, CTA `html:554`) - orange stays the accent; blue is only the background field.
3. It literally depicts ocean-to-rainforest nature, the one place cool tone is on-brand.

**Change from the earlier draft:** that draft suggested nudging the ocean glow *down* (lowering the `rgba(42,155,208,...)` alpha) so blue would be the page's only blue. With the hero pond kept, do the opposite intent - **leave the glow at strength and keep both blues on the same `--pond` token** so the top pond and the bottom ocean visibly rhyme as intentional bookends. They should look related, not like two unrelated blue accidents.

### RTL and on-dark implications

- On-dark sections (trust, spec, projects, sustainability) already use `--orange-bright` as their accent (`css:110,128`) and are untouched by this pass. No new on-dark work.
- The hero headline tile is unchanged, so its CTA/underline/`.accent` coupling is untouched - even less risk than the demote draft. The only structural edit is lane 02.
- No color-with-direction rules change. The hero fish flip is already handled for RTL (`css:1507`); the lane-02 bubbles (`css:988`, positioned by `right`) are symmetric enough that recoloring the panel does not move them - just eyeball lane 02 in HE to confirm the bubbles still sit inside the panel.
