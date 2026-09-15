# Changelog

Running log of changes made by Claude on branch `claude/charming-cori-ntftry`,
newest first. Every entry corresponds to a git commit — use `git log` or
`git show <hash>` for the exact diff, and `git revert <hash>` to undo any
single one without affecting the others.

## Edge case study — merged illustration upgrades from your Claude Design export

You sent an updated `edge.dc.html` exported from Claude Design with instructions
to apply illustration changes only and leave the "same interface, two themes"
demo alone. Diffed your export against the live file line by line and applied
only the visual/illustration side; **verified after merging that the theme
demo still shows the warm palette and black button exactly as before** —
clicked through to the MAI state and screenshotted it to confirm.

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
  favorites flyout across hard-coded → Phoenix → MAI, using three new SVGs
  you provided (`edge-flyout-pretoken.svg`, `edge-flyout-phoenix.svg`,
  `edge-flyout-mai.svg`).
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
  after the merge by clicking to the MAI state and confirming it still
  matches.
- A few other things your export would have reverted for the same
  stale-snapshot reason: the address-bar text-overflow-ellipsis fix, the
  `.panel > * { min-width: 0 }` mobile-overflow fix, the "two rendering
  worlds" diagram wrap fix, the page's meta/Open-Graph tags, and the "next
  project" link pointing at Crafting Sandbox.
- A new sentence your export added to the token-mapping section's prose
  ("Concretely, the Phoenix theme's values were what Fluent had
  specified..."). You asked for illustration changes specifically, and
  didn't ask for a copy edit here, so left the existing paragraph as-is.
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
