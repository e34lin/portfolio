# Changelog

Running log of changes made by Claude on branch `claude/charming-cori-ntftry`,
newest first. Every entry corresponds to a git commit — use `git log` or
`git show <hash>` for the exact diff, and `git revert <hash>` to undo any
single one without affecting the others.

## True clean URLs on GitHub Pages — no `.dc.html` anywhere, ever

You asked to get rid of `.dc.html` in the address bar entirely, not just on
first load. GitHub Pages can't rewrite URLs server-side the way Netlify or
Vercel can — it only serves exact file paths — so the only way to make
`/about` actually BE the About page (not redirect to it) is to publish it at
that literal path. Did that with a real build step rather than hand-maintained
duplicate files, so `*.dc.html` stays the single source of truth:

- **`<base href="/portfolio/">`** added to every page's `<head>`. This anchors
  every relative link/asset/script reference to the site root regardless of
  how deep the actual served file lives, so the same rewritten source can be
  copied to any folder depth without any path math.
- **Every internal link and asset/script reference rewritten** across all six
  pages (127 individual replacements) — `./about.dc.html` → `about/`,
  `../assets/foo.svg` → `assets/foo.svg`, `../index.dc.html#work` → `./#work`,
  and so on. Also promoted `projects/support.js` (a newer build with deck-
  rendering support the root copy lacked) to be the one canonical `support.js`
  everyone now resolves to, rather than silently downgrading the project pages.
- **`.github/workflows/pages.yml` added** — on every push to `main`, copies
  `index.dc.html` → `index.html`, `about.dc.html` → `about/index.html`,
  `projects/edge.dc.html` → `projects/edge/index.html` (and so on for the
  other three case studies), plus `_ds/`, `assets/`, and the scripts, into a
  `_site/` build output, and publishes that via GitHub's official Pages
  actions. `_source/` is never copied — it doesn't just go unlinked anymore,
  it's genuinely excluded from what gets deployed.
- Removed the redirect-based `index.html` stub from an earlier pass — no
  longer needed now that the workflow generates a real one.

**Verified for real, not just visually**: built a byte-identical local mirror
of what the workflow produces (same folder structure, served with the same
`/portfolio/` path prefix a GitHub Pages project site actually uses), and
ran a full click-through — home → About → back via the brand link → Work
anchor → Edge case study → Resume (opens the PDF in a new tab) → next-project
card into Crafting Sandbox. Every step landed on a clean URL; `.dc.html`
never appeared once. Re-ran the 320–1024px overflow sweep against that same
mirror too — zero overflow on all six pages.

**One tradeoff, as discussed before doing this**: Claude Design's own canvas
editor expects `*.dc.html` extensions in cross-page links, so its live
preview won't be able to follow these new extensionless links between pages
if you go back to editing there. Editing any single page's own content still
works fine — it's only navigating *between* pages inside that tool that's
affected.

**Still needed from you**: this switches how Pages builds the site, so in
Settings → Pages, change **Source** from "Deploy from a branch" to
**"GitHub Actions."** The workflow runs automatically on the next push (or
you can trigger it manually from the Actions tab).

## Edge thumbnail: white body fills to the bottom, tags moved to their subjects

After the thumbnail grew to 4:3, the mock browser's white content area no
longer reached the bottom — it kept its old fixed height and left a grey
band underneath. Made the window a flex column so the white body stretches
to fill it. Also re-anchored two of the token tags, which had been
positioned as percentages of the whole thumbnail and drifted away from what
they label when the proportions changed: `backgroundOmniboxRest` now sits
on the address-bar row and `backgroundCtrlBrandRest` beside the Primary
action button. Both are anchored with the window's own fixed row heights
now rather than free-floating percentages, so they track their subjects at
any thumbnail size (checked at 900px and 1440px).

## Symmetry diagram redrawn properly + homepage lead card aligned

**Symmetry diagram, second attempt.** My first redraw dropped almost all
the facial detail — it was a blank oval with two dots for eyes, no
eyebrows, no nose, no mouth — which didn't match your reference at all.
Rebuilt it reusing the face geometry from the original version (eyebrows,
almond eyes with pupils, the drawn nose, the mouth, ears), laid out as
the two panels your reference showed. Bumped the cache-bust to `?v=3`.

**Homepage lead card.** The Edge thumbnail's left edge didn't line up
with the NaSYMSurgical card directly below it — the lead row used a
different column split and a different gap than the card grid beneath
it. Set the lead row to two equal columns with the card grid's gap, so
the thumbnail now matches that card exactly (verified: 0px difference on
both edges at 900/1024/1200/1440px). Also switched the lead row from
top-aligned to vertically centered, so the text block centers against
the taller thumbnail instead of hugging its top.

## Homepage Edge thumbnail sized up to match the "main" card role

The Edge lead-card thumbnail was smaller than the two secondary
"imagetop" mini cards below it (Crafting Sandbox, NaSYMSurgical) —
backwards for the card meant to be the primary one. Two contributing
causes: the `.lead` grid gave the image column less width than text
(6fr/5fr), and the thumbnail used a shorter 16:10 aspect ratio versus
the mini cards' 4:3. Flipped the grid split to 5fr/6fr (favoring the
image) and matched the aspect ratio to 4:3. Now measures larger in
both dimensions than the two cards below it.

## Small fixes: slider color match, tag overlap, cache-bust

- Recolored the Crafting Sandbox "Outcome" before/after slider (`.cba-line`/
  `.cba-knob`) from white back to red (`var(--color-accent)`), to match the
  NaSYMSurgical before/after slider's styling, at your request.
- Repositioned the "Tested"/"Revised" tags on the NaSYMSurgical before/after
  slider — they were sitting at a fixed 24% down the phone screen, which
  landed right on top of the "Pinch to Zoom In & Out" instruction text.
  Moved to the empty space between the face model and the toggle controls
  below (65%).

## Resume link added to the nav, all six pages

Added a third nav item, "Resume", between "About" and "Get in touch",
opening `assets/resume.pdf` (the file you sent) in a new tab
(`target="_blank" rel="noopener"`). Added to all six pages' nav markup
(it's duplicated per page, not a shared include) — verified the link
attributes are correct on each and re-checked all six pages at all five
widths for overflow now that the nav carries one more item; none found.

## NaSYMSurgical symmetry-line diagram — redrawn to match your reference

You sent a reference image (pasted in chat, not attached as a file — same
limitation as before: this sandbox can't pull raw bytes out of a chat
paste) showing a cleaner two-panel version of the "Four ways to read
symmetry" concept diagram: separate Intrinsic and Eccentric panels, each
with its own caption, rather than the original's single face with both
lines overlaid plus a shared legend. Redrew `nasym-symlines-concept.svg`
from scratch to match — same two-panel structure, plain white face
outlines instead of the filled gray from before, dot eyes, small ears, a
curved solid line for the nose's own midline (both panels) and a dashed
straight line for the facial midline (Eccentric panel only). Updated the
figcaption too, since the old one ("on the same scan") no longer described
a two-panel layout.

## Crafting Sandbox "Outcome" section — nav tab visuals + video walkthrough

You sent an updated `crafting-inc.dc.html` export with instructions to apply
visual updates only to the Outcome section's "Left menu & top bar" tab and
the interactive video walkthrough, and to leave everything else alone
(including the other four before/after tabs — Workspace card, Home page,
New workspace flow, Workspace detail — which the export also updated new
assets for, but weren't asked for).

**"Left menu & top bar" before/after slider**: swapped from PNG to new SVG
before/after art (`craft-ba-nav-before.svg` / `craft-ba-nav-after.svg`),
with a per-tab CSS override (`.cba-view[data-tab="1"]`) so only this tab's
aspect ratio and image-fit changed — the other four tabs stay on their
original 1600×978 PNG sizing untouched, verified by clicking through each
one after the change.

**Video walkthrough**: converted from static PNG frames to inline SVG
frames fetched and injected at runtime, adding real hover → press micro-
interactions on the buttons the cursor "clicks" through the walkthrough
(brand-blue highlight on hover, darker on press, before the screen
advances) — a genuine visual upgrade over the previous straight PNG swap.
Updated cursor coordinates to match the new SVGs' actual button positions.

**Skipped, staying with what you already have**: the other four before/after
tabs' new PNG assets (not asked for), the meta/Open Graph tag removal the
export included (would've reverted earlier work), and a stale reversion of
a mobile-overflow fix (`.panel` collapsing to one column under 800px) that
was also bundled into that export.

**Left un-optimized, deliberately**: the new prototype-walkthrough SVGs
(~13MB across 13 files) use custom `data-hit="..."` attributes that the
hover/press CSS depends on to find the right shape to recolor. Ran `svgo`
as a test on one file and it rendered with a small (non-zero) pixel
difference — safe for a static illustration, but I didn't want to risk
subtly resizing or merging a hit-region shape on an interactive control
without being able to verify pixel-for-pixel losslessness. Left them as
exported; happy to revisit if the extra weight matters to you.

## About page portrait — filled in with your real photo

The earlier autonomous pass had tried to fetch a LinkedIn profile photo and
got blocked by network policy, leaving the About page's portrait slot empty.
You sent the actual photo (a mountain-summit hiking shot) this session — it
had to come through as a pushed file rather than a chat paste, since this
sandbox can't read either your local disk or raw chat image bytes directly.
Wired it into the `about-portrait` image-slot, and resized/re-compressed it
for web (3072×4096 original → 1400px wide, quality-80 progressive JPEG,
981KB → 576KB). Verified it renders well at the default center-crop framing
and checked for overflow regressions at all five widths — none found.

## Edge case study — merged illustration upgrades from your Claude Design export

You sent an updated `edge.dc.html` exported from Claude Design with instructions
to apply illustration changes only and leave the "same interface, two themes"
demo alone. Diffed your export against the live file line by line and applied
only the visual/illustration side; **verified after merging that the theme
demo still shows the warm palette and black button exactly as before** —
clicked through to the Theme 2 state and screenshotted it to confirm.

**Applied:**
- New hero figure: a real before/after comparison (hard-coded hex values →
  semantic token names) with a dark-terminal code panel, replacing the older
  placeholder hero art. Realistic token names throughout
  (`backgroundLayerApp`, `foregroundCtrlNeutralPrimaryRest`,
  `strokeDividerDefault`, `backgroundCtrlBrandRest`).
- The design-system-audit code panel (`#source`) is now live HTML text (a
  real Chromium-style source excerpt) instead of a static SVG image — same
  dark editor-window styling, but it's real, selectable text now. This
  needed a workaround: the site's renderer mangles raw text matching
  `k`+Uppercase (e.g. `kGoogleBlue600`) into garbage when written as live
  HTML, so a zero-width non-joiner is inserted after each `k` — invisible,
  and confirmed via an isolated test that it doesn't affect ordinary
  camelCase names.
- "Sequencing the rollout" section: replaced two empty image placeholders
  with a working mock of a browser DevTools "Styles" pane, showing the
  actual-looking custom-property names (`--smtc-background-ctrl-brand-rest`,
  etc.) the way they'd really appear mid-audit.
- "Craft" section: replaced an empty image placeholder with your real
  `edge-craft-before-sharp.png` screenshot, annotated with three callout
  labels pointing at the three different hard-coded blues on screen.
- "Shipped" section: replaced the empty payoff placeholder with a working
  3-state interactive slider (auto-advances, click-to-jump) showing the
  favorites flyout across hard-coded → Theme 1 → Theme 2, using three new
  SVGs you provided (`edge-flyout-pretoken.svg`, `edge-flyout-theme1.svg`,
  `edge-flyout-theme2.svg`).
- Shared chrome-mockup polish: slightly larger corner radius, plus a small
  CSS detail where an active browser tab now visually "bites into" the
  window-chrome corner instead of sitting as a flat rectangle.
- Found and fixed two new mobile-overflow bugs introduced by the above (both
  at 320px only): the DevTools-pane mock wasn't shrinking inside its grid
  cell (same root cause as an earlier fix — grid items don't shrink below
  content width without `min-width: 0`), and one comment line in the new
  audit code was a single unbroken file path with nowhere to wrap. Both
  fixed and re-verified at 320/480/768/900/1024px across all six pages —
  zero overflow anywhere.

**Explicitly NOT applied (per your instruction):**
- Your export's version of the theme-demo colors, chrome background, and
  primary-action button — it was a stale snapshot from before your later
  "make the button black," "keep the tab background warm," and hex-value
  requests, so applying it would have silently reverted that work. Kept the
  current warm-palette/black-button version untouched, and verified this
  after the merge by clicking to the Theme 2 state and confirming it still
  matches.
- A few other things your export would have reverted for the same
  stale-snapshot reason: the address-bar text-overflow-ellipsis fix, the
  `.panel > * { min-width: 0 }` mobile-overflow fix, the "two rendering
  worlds" diagram wrap fix, the page's meta/Open-Graph tags, and the "next
  project" link pointing at Crafting Sandbox.
- A new sentence your export added to the token-mapping section's prose
  ("Concretely, the Theme 1 values were what Fluent had specified...").
  You asked for illustration changes specifically, and didn't ask for a
  copy edit here, so left the existing paragraph as-is.
- Some CSS in your export (`.tok-tree`, `.arch`, `.spec-cards`, `.flip-*`)
  that isn't referenced by any markup in the file you sent — looked like
  leftover exploration from the design canvas. Left it out rather than
  importing dead code.

## Autonomous session — recruiter-lens pass (while you were away)

**All PNG assets losslessly optimized — 8.2MB → 4.9MB (~40% smaller).**
`optipng -o2` across `assets/*.png` plus the three competitive-analysis
screenshots in `projects/nasym/` (found those on a second pass — they live
outside `assets/`, so the first sweep missed them). This is genuinely
lossless, not "looks the same": diffed pixel data against the previous
git-committed bytes for the largest files and got an empty bounding box
(zero differing pixels) every time.

**Noticed, not touched: three more orphaned images.**
`projects/assets/craft-comp-1.png`, `projects/assets/craft-hero.png`, and
`projects/nasym/assets/e04f33be9ec42e47.png` aren't referenced by any page
(same situation as `uploads/`, just smaller). Left them alone for the same
reason — not my call to delete unlinked files I don't have context on.

**All SVG assets losslessly optimized — 6.5MB → 3.0MB (~54% smaller).**
Ran `svgo --multipass` across everything in `assets/`. The three heaviest —
`craft-details.svg` (983KB→403KB), `crafting-sandbox.svg` (772KB→332KB),
`crafting-menu-topbar.svg` (766KB→325KB) — all sit in hero figures loaded
on first paint, so this is real weight off the page for anyone clicking
through on a phone. Verified safety two ways: pixel-diffed the largest
file's before/after render at 1200px (identical apart from antialiasing
noise), then re-screenshotted the actual live pages (crafting-inc's hero
and components section, nasym's phone stage) against earlier screenshots
from this session — no visible difference anywhere.

**Two real mobile bugs found and fixed.** Screenshotted every page at a
390px (iPhone-width) viewport and checked for horizontal overflow — this
is the kind of thing that reads as sloppy to a recruiter clicking through
on their phone.
- `crafting-inc.dc.html`: `.panel` never collapsed to a single column
  below 800px (every other project page does this), and `.cards3` wasn't
  in the mobile grid-collapse list either. Together they squeezed page
  content into a 136px column while a 230px-minimum card grid tried to
  render inside it — 74px of horizontal overflow on phones.
- `edge.dc.html`: a `white-space: nowrap` on a full sentence in the
  "One browser, two rendering worlds" diagram never wrapped, overflowing
  the viewport by 15px on phones.

Both fixed; re-verified all six pages at 390px width with zero overflow.

**Follow-up: tested 320/480/768/900/1024px too, found three more.** All on
small phones (iPhone SE class, 320px):
- The shared nav (`_ds/.../styles.css`, used by all six pages) had no
  `flex-wrap`, so brand + Work + About + the "Get in touch" button
  overflowed by 9px. Fixed once at the shared source.
- `edge.dc.html`'s theme demo: found the actual mechanism behind both this
  and the earlier `.map`/`.dg` near-misses — grid items default to
  `min-width: auto`, so a `1fr` track still won't shrink below its
  content's natural minimum width. Fixed generally with
  `.panel > * { min-width: 0 }` (covers every current and future panel
  child, not just the ones that happened to trigger it), plus
  `text-overflow: ellipsis` on the address-bar URL text specifically.

Re-verified all six pages at all five widths (320 through 1024px): zero
overflow anywhere. Confirmed no desktop regression via screenshot diff.

**Favicon, meta descriptions, Open Graph/Twitter tags — added, all six
pages.** A branded "EL" favicon (`assets/favicon.svg`, your site's accent
color), a `<meta name="description">`, and `og:title`/`og:description`/
`og:type` (plus `og:image` on the two pages with a strong existing
thumbnail — Crafting Sandbox and NaSYMSurgical) on every page. Verified at
runtime, not just in the source, that the `.dc.html` helmet actually
injects these into the live `<head>`. Purely additive — nothing existing
changed.

**robots.txt — added.** Bare `Allow: /`. Didn't add a `sitemap.xml`: the
sitemap spec requires absolute URLs, and I don't know what domain this
will end up published at — a sitemap with a placeholder domain is worse
than no sitemap if you forget to fix it. Tell me the domain once you have
one and I'll generate it in under a minute.

**Content audit — no changes made.** Read every page end to end (`index.dc.html`,
`about.dc.html`, and all four `projects/*.dc.html` case studies) specifically
looking for what a big-tech hiring panel would flag: typos, filler, vague
claims, inconsistent dates/titles, placeholder text. Also ran automated
checks for `TODO`/`Lorem ipsum`/placeholder markers, duplicate-word typos,
and broken internal links or missing image assets — all clean, zero hits.
**Verdict: the writing was already at a strong, specific, recruiter-ready
level** — real metrics, named competitors, honest limitations sections
("One gap stayed open...", "We never tested it in an operating room...").
Rewriting prose that's already working risks making it worse and risks
introducing claims about your work I can't verify, so I left it as-is rather
than editing for the sake of editing. If you want a second pass focused on
something specific (tightening a particular section, cutting length,
changing tone), point me at it and I'll do that pass directly.

**LinkedIn photo — attempted, blocked.** Tried fetching your profile photo
from `linkedin.com/in/e34lin` to fill the empty portrait slot on the About
page. This sandbox's network policy blocks `linkedin.com` outright (likely
because scraping profile pages violates LinkedIn's terms), so the fetch
never got a response to work with. The `about-portrait` image-slot
(`about.dc.html`) is still empty — drop a photo on it yourself, or send me
one and I'll wire it in.

**Clean URLs — infrastructure added, internal links deliberately left alone.**
Added `_redirects` (Netlify) and `vercel.json` (Vercel) at the repo root,
each rewriting `/about`, `/projects/edge`, `/projects/edge-components`,
`/projects/nasym`, `/projects/crafting-inc`, and `/` to their real
`*.dc.html` files with a 200 (rewrite, not redirect) so the address bar
shows the clean path. This means: once deployed to Netlify or Vercel,
typing or sharing `yoursite.com/about` works and shows no `.html`.
**What I did not do:** change the actual `<a href>` values inside the pages
(nav bar, "next project" cards, back-links) to the clean paths. Every one
of those still points at the literal `*.dc.html` file, so clicking through
the site will still show `.dc.html` in the address bar even after
deploying. I held off because:
- The whole site is a `.dc.html` project that Claude Design's own canvas
  editor and this session's local preview both resolve by that literal
  extension — changing ~20 cross-links sitewide to extensionless paths, in
  one unsupervised pass with no way for you to catch a mistake, risked
  quietly breaking navigation or your ability to keep editing this in
  Claude Design, for a cosmetic win that only shows up post-deploy.
- A server-side rewrite (what `_redirects`/`vercel.json` do) can't fix an
  `<a href>` retroactively — only editing the hrefs themselves does that.
- GitHub Pages (a plausible host given this repo lives on GitHub) doesn't
  support rewrites like this at all, so which host you actually deploy to
  changes what's even possible here.
- This is the one item from your instructions that had real, hard-to-reverse
  downside if I guessed wrong, so it's the one I'm flagging rather than
  just doing.

**Noticed, not touched: `uploads/` is 59MB of raw design exports.** Layered
Figma SVGs, iPhone mockup frames, slide exports — your working files, not
referenced by any page (`assets/` is what's actually served). If you deploy
this repo as-is to Netlify/Vercel/GitHub Pages, all 59MB goes along for the
ride and sits at guessable-but-unlisted URLs on your live domain. I didn't
touch it — it's your source material and deleting or moving 59MB of
someone's working files without being asked is not a call I'll make
unsupervised. Two options when you're back: point your host's publish
directory at a subfolder that excludes `uploads/`, or tell me to move it
somewhere outside the deployed tree (a sibling `_source/` folder, say) and
I'll do that as its own reversible commit.

**Recommendation:** once you've picked a host and confirmed clean internal
links won't fight with your Claude Design workflow, say the word and I'll
do the full href sweep in one pass (fast, mechanical, easy to verify once
you're here to spot-check the result).

---

## Prior session — feedback loop while you were online

*(All individually committed with descriptive messages; summarized here for
convenience — `git log --oneline` has the full list.)*

- Imported the crafting-inc.dc.html design project and verified it renders
  correctly (all assets present, all template bindings resolve).
- Hid the "Edge design systems" case study from the homepage (temporary,
  reversible — see the `<sc-if value="{{ false }}">` wrapper in
  `index.dc.html`); renumbered the remaining homepage cards 01/02/03.
- Added a draft symmetry-line concept diagram (original SVG illustration)
  to `nasym.dc.html`'s empty image-slot.
- Added a "hardcoded values" code box (SVG, styled as an editor window) to
  `edge.dc.html`'s design-system audit section, after discovering the
  `.dc.html` template engine mangles raw camelCase text if written as live
  HTML.
- Updated theme-two token-mapping colors in `edge.dc.html`'s "Before → in
  code" table (primary/foreground → `#272320`, subtle → `#FFFFFFB3`), and
  replaced the "swaps" label with the actual resolved value.
- Recolored the "same interface, two themes" demo (`edge.dc.html`) from
  purple to a muted warm-neutral palette per your direction, with the
  primary-action button set to black and the tab/chrome background kept
  warm rather than neutral gray.
- Built and then removed (per your request) a "then vs now" hero image for
  `edge.dc.html`'s Favorite-added flyout — a real screenshot of current
  Microsoft Edge (installed live in this sandbox) paired with a redrawn
  recreation of the 2020-era flyout you shared as a reference. Removed at
  your request; you're supplying the real hero image later.
- Pointed `edge.dc.html`'s "next project" card at Crafting Sandbox instead
  of the now-hidden Edge design-systems page, for now.
