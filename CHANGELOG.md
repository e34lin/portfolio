# Changelog

Running log of changes made by Claude on branch `claude/charming-cori-ntftry`,
newest first. Every entry corresponds to a git commit — use `git log` or
`git show <hash>` for the exact diff, and `git revert <hash>` to undo any
single one without affecting the others.

## Autonomous session — recruiter-lens pass (while you were away)

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
