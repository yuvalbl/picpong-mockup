# Palette refinement - warm up the home page (color cohesion)

Covers the home page of `mockup-v5` (`index.html` + `css/styles.css`), dated 2026-07-04. This is a color harmony / warmth pass - demote the cool pond blue from the top of the page, cut the coral accent, and enforce one accent per section so the page reads as a single warm system. It is NOT the WCAG contrast work; those fixes live in `docs/todo/accessibility-il-5568.md` and `docs/todo/font-sizes.md` and are only cross-referenced where a warmth change happens to help contrast too.

## Executive summary

- [ ] Hero headline tile: swap `panel--pond` (cyan) for `panel--orange` so the page opens on the warm brand color, not blue - `index.html:96`.
- [ ] Rewire the headline CTAs for the orange field: primary CTA becomes ink (not orange-on-orange), ghost stays ink outline - `css/styles.css:753-758`.
- [ ] Remove coral entirely: repoint the slogan's second marker from `mark--coral` to a warm in-family marker (`--orange-deep`) - `index.html:178`, `css/styles.css:1143`.
- [ ] Dual-funnel lane 02: swap `panel--pond` for `panel--orange` so the primary lead lane reads as the warm "act now" color, ink lane 01 stays the neutral - `index.html:224`.
- [ ] Update the pond lane hover rule to the new orange panel - `css/styles.css:979`.
- [ ] Retire the coral tokens (`--coral`, `--coral-deep`) and delete the now-dead `panel--pond` eyebrow/lead rules to keep the token set honest - `css/styles.css:20-21, 714-716`.
- [ ] Keep the sustainability ocean-to-forest gradient as the single sanctioned cool exception; optionally reduce the cyan glow so forest green leads - `css/styles.css:491-494`.
- [ ] Confirm `--pond` now has exactly one home (the sustainability background) and comment it as such - `css/styles.css:19`.

## Details

### Token / accent inventory

Cool or non-warm accents are the target of this pass; warm tokens are the system we are consolidating onto.

| Token | Value | Family | Where it is used on the home page | Verdict |
|---|---|---|---|---|
| `--orange` | `#E67A2F` | warm (primary) | Brand dot/underline (nav), buttons, marquee sparkle (`css:321`), catalog totem accent, `.accent` underline, focus ring, sticker dot (`css:809`) | Keep - this becomes THE accent |
| `--orange-bright` | `#F58729` | warm | On-dark eyebrows/accents (`css:110,128`), slogan orange marker (`css:1142`), sustainability punch/pillars/CTA | Keep |
| `--orange-deep` | `#E45C01` | warm | Contact FAB hover, facet active state (not otherwise on the home flow) | Keep - reuse for the slogan's 2nd marker |
| `--kraft` / `--kraft-deep` | `#C49A6C` / `#a87d4f` | warm neutral | Slogan tile panel (`html:172`), kraft marquee, About band, eyebrow color, edge divider | Keep - the cardboard base tone (treat as neutral, not an accent) |
| `--cream` / `--cream-2` | `#F7F7F1` / `#FDFDF7` | warm neutral | Page and section backgrounds | Keep |
| `--ink` / `--gallery` | `#1A1A1A` / `#2b2b2b` | neutral dark | `panel--ink` lane, dark bands (trust/spec/projects), footer | Keep - the neutral dark |
| `--pond` | `#2A9BD0` | COOL | Hero headline tile (`html:96`), dual-funnel lane 02 (`html:224`), sustainability bg glow + wave (`css:493`, `html:533`) | Demote - remove from hero and funnel; keep only in sustainability bg |
| `--coral` / `--coral-deep` | `#FF6F5E` / `#F8523F` | warm-but-off | Slogan 2nd marker only (`html:178` via `css:1143`); `-deep` unused | Cut - retire both tokens |
| `--forest` / `--forest-deep` | `#123B33` / `#05120F` | cool-green | Sustainability gradient only (`css:494`) | Keep - part of the sanctioned exception |

The whole "un-warm" footprint is small and concentrated: pond blue appears in exactly three places and coral in exactly one. Fixing those, plus consolidating on orange, does the entire job.

### Per-section accent map (current vs proposed)

Walking top to bottom. The proposed column applies one rule: orange is the single accent; kraft/cream/ink are neutrals; blue and coral are gone (except the sustainability background).

| Section (source) | Current accent(s) | Mixed? | Proposed |
|---|---|---|---|
| Ribbon + Nav (`html:32-67`) | ink + orange | no | unchanged (orange) |
| Hero - headline tile (`html:96`) | pond blue panel + orange CTA + ink accent-underline | YES (blue + orange) | orange panel, ink CTA, warm accent underline - one accent (orange) |
| Hero - slogan tile (`html:172-180`) | kraft panel + orange marker + coral marker | YES (kraft + orange + coral) | kraft panel + two warm markers (orange, orange-deep) - drop coral |
| Hero - slideshow / video / sticker tiles | photos (neutral) + orange sticker dot | no | unchanged |
| Dual-funnel (`html:214-235`) | lane 01 ink panel, lane 02 pond-blue panel | YES (ink + blue) | lane 01 ink (neutral), lane 02 orange (accent) - neutral vs hot funnel pairing |
| Trust marquee (`html:238-264`) | dark band + orange-bright eyebrow | no | unchanged |
| Latest strip (`html:269-337`) | cream + kraft eyebrow + orange arrows | no | unchanged |
| Catalog preview (`html:340-444`) | cream-2 + kraft eyebrow + orange (totem, badges) | no | unchanged |
| Spec strip (`html:449-463`) | dark band + orange-bright | no | unchanged |
| Kraft marquee (`html:466-477`) | kraft + orange sparkle | no | unchanged |
| Projects teaser (`html:480-523`) | dark band + orange-bright + orange link | no | unchanged |
| Sustainability (`html:529-558`) | forest+ocean gradient bg + orange-bright accent | intentional | KEEP (see exception below) |
| About (`html:561-570`) | kraft + orange link | no | unchanged |
| Contact (`html:573-609`) | cream + kraft eyebrow + orange button | no | unchanged |
| Footer (`html:614-637`) | ink + orange | no | unchanged |

The takeaway: nearly the whole page already lives on an orange-on-neutral system. Only three spots break it - the hero headline, the slogan's coral marker, and dual-funnel lane 02 - and all three are the cool/off intrusions the owner flagged. There is no sprawling rework here.

### The specific changes

**1. Hero pond demotion (highest impact).** The headline tile is the first thing on the page and it is a saturated cyan block (`html:96` `panel--pond`, styled at `css:714-716`). Swap it to `panel--orange`, which already exists (`css:711-713`; ink text on orange approx 5.2:1 - the same contrast note recorded at `css:709-710`, so this is contrast-neutral). Orange is the actual brand color and, tellingly, the hero currently has no orange field at all - so this both warms the top and finally lets the brand color lead.

Coupled change - the headline CTAs. The tile currently overrides `btn--onDark` to orange (`css:755-756`) because the panel was blue. On an orange panel an orange button vanishes, so flip the primary CTA to ink:

- `css:755-756` -> primary CTA `background: var(--ink); color: var(--cream); border-color: var(--ink)` (and hover to a warm invert).
- `css:757-758` ghost CTA (ink outline) already works on orange - leave as is.
- The HTML button classes at `html:101-102` can stay (`btn--onDark` / `btn--ghostDark`) since the local override is what defines them here; only the CSS values change.

Coupled note - the accent underline. `css:750` forces the "no trace" underline to ink on the headline. Ink-under-ink on an orange field is a very quiet tonal underline; bump it to `var(--orange-deep)` for a warm pop, or leave ink if a subtle mark is preferred.

Motif note - the white bubbles (`css:1174-1185`) and the pufferfish (`html:108`) are the "pond" whimsy and they read by contrast against a colored field. White bubbles sit well on orange (better than on pale cream), so orange preserves the playful pond-life motif without any actual blue. This is a point in orange's favor over a cream headline, which would need the bubbles recolored. If the client wants a quieter opening, `panel--kraft` is the conservative alternative (still warm, bubbles still read on tan), at the cost of matching the slogan tile's tone.

**2. Cut coral.** Coral is used once: the slogan's second marker (`html:178` `mark--coral`, defined at `css:1143`). The design intent (comment at `css:1076-1078`) is two alternating markers so the slogan is not monotone. Keep that intent but stay in the warm family: repoint the marker to `--orange-deep`.

- `css:1143` -> `.slogan .mark--coral { --mk: var(--orange-deep); }` (or rename the class to `mark--deep` and update `html:178`).
- Retire `--coral` and `--coral-deep` at `css:20-21` (coral-deep is already unused anywhere on the home flow). Removing the tokens prevents the accent creeping back in later.

Orange plus orange-deep gives the slogan a two-tone warm rhythm that is distinct enough not to feel flat, without introducing a third hue.

**3. Dual-funnel lane 02.** Lane 02 (project enquiry) is a pond-blue panel (`html:224`, hover at `css:979`). Swap it to `panel--orange`. This makes the two lanes read as neutral (ink, "browse the catalog") versus hot (orange, "tell us about your project"), which is the correct funnel hierarchy - the project enquiry is the site's primary conversion, so the brand-orange "act" color belongs there.

- `html:224` `panel--pond` -> `panel--orange`.
- `css:979` `.panel--pond.lane--panel:hover { background: var(--pond); }` -> `.panel--orange.lane--panel:hover { background: var(--orange); }`.
- The lane's bubbles (`html:229-231`, `css:988`) are white and still read on orange - leave them, they rhyme with the hero.

Two orange blocks now appear on the page (hero headline and lane 02), separated by the rest of the hero and the funnel eyebrow. Each section individually still holds one accent, so the per-section rule is satisfied, and repeating orange for "the thing to click" is good wayfinding. If back-to-back orange feels heavy in review, make lane 02 `panel--kraft` instead - quieter, still warm - and let ink-vs-kraft be the funnel contrast.

**4. Dead-rule and token cleanup.** Once pond leaves the hero and funnel, several rules are dead and should go so the palette stays legible:

- `css:714-716` - `panel--pond` background/eyebrow/lead rules (no `panel--pond` element remains).
- `css:753-754` comment about "the bright pond panel" - update to describe the orange headline.
- Keep `--pond` at `css:19` but recomment it as "sustainability ocean background only" so its one remaining, deliberate use is obvious.

### The sustainability-section exception (the deliberate call)

This is the real tension: the owner says "demote pond blue," and the sustainability section (`html:529-558`, `css:485-529`) intentionally uses a `--pond` ocean glow blended into a `--forest` rainforest gradient (`css:491-494`, plus the wave at `html:533`).

Case for warming it too: strict consistency. If blue is banished everywhere else, one large cool section can read as a leftover rather than a decision, and "demote pond" taken literally would include it.

Case for keeping it (stronger): the blue here is not a UI accent, it is depiction. The section's entire rhetorical job is "your event can be genuinely green" and it literally pictures ocean-to-rainforest nature; the cool tone is semantically motivated (water), not a decorative color choice. Three things make it read as a deliberate chapter rather than an inconsistency:

1. It is full-bleed and fenced by corrugated `edge` dividers (`html:525`, `html:611`), so it reads as its own spread.
2. Its actual accent is already `--orange-bright` (the punch line `css:513`, the numbered pillars `css:525`, the CTA `html:554`). So orange remains the accent even here - the blue is only a background field. That is the clean distinction to hold to: demote pond as an accent and as a panel color everywhere, but the sustainability background may use ocean blue because it is portraying nature, not accenting the UI.
3. It is the one place cool tones are on-brand ("ocean/eco"), and confining blue to exactly this spot actually makes the demotion elsewhere more legible - blue becomes meaningful rather than ambient.

Recommendation: keep the sustainability gradient as the single sanctioned cool exception, unchanged in structure. Optional tightening - since it is now the only blue on the page, nudge the cyan radial glow down (`css:493`, e.g. lower the `rgba(42,155,208,0.38)` alpha toward ~0.22) so forest green clearly leads and the blue reads as a supporting hint, not a second "pond moment" competing with the (now removed) hero blue. This keeps orange as the throughline accent and blue as a contained, intentional nature cue.

### RTL and on-dark implications

- On-dark sections (trust, spec, projects, sustainability) already use `--orange-bright` as their accent (`css:110,128`) and are untouched by removing pond - if anything the change reinforces them, since orange is now the sole page-wide accent. No new on-dark work.
- The hero headline tile is not `.on-dark`; as an orange panel with ink text, `.accent` uses the default (non-on-dark) rule, overridden locally at `css:750`. The only real coupling is the CTA class values (item 1) - swap them in CSS, not in the RTL layer.
- None of these are color-with-direction rules, so RTL needs no color-specific change. The decorative bubbles are already handled for RTL (the fish flip lives at `css:1507`); the lane-02 bubbles (`css:988`, positioned by `right`) are symmetric enough that recoloring the panel does not affect them. Low risk - just eyeball lane 02 in HE to confirm the bubbles still sit inside the panel.
