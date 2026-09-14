# Modernist design system

Modernist is round, glassy and clean, set entirely in Archivo: a soft warm-white ground with faint accent glows, translucent glass surfaces with backdrop blur, soft corner radii (8px controls, 6px small) and hairline rules. Red stays the single accent, spent sparingly on primary actions and small emphasis.

## How to use this

- Link the one stylesheet from every page — `<link rel="stylesheet" href="styles.css">` (adjust the relative path) — and take every color, font, spacing, radius and shadow from its variables (`var(--color-*)`, `var(--font-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--shadow-*)`, `var(--glass-*)`). Never hard-code a hex, a font name or a px value the tokens already carry.
- Build with the classes below rather than inventing parallel ones; the component pages are plain HTML, so view source and copy the markup.
- `templates/` holds starting points a consuming project can copy whole.
- The whole system was derived from `theme.json`. To change the look, edit the tokens at the top of `styles.css` — every page, the thumbnail and this guide read from them — and keep `theme.json` and the written guidance in step so they don't drift from what the CSS actually does.

## Direction

Soft, layered, luminous. The body carries faint accent-tinted glows on a warm white ground; content floats above it on glass panels (`--glass-bg` + `--glass-blur` + a bright `--glass-border`, packaged as the `.glass` utility and baked into `.card`, `.nav`, `.dialog`, `.input`, `.seg` and `.btn-secondary`). Corners are softly rounded — `--radius-sm` 6px for small controls (tags), `--radius-md` 8px for default controls (buttons, inputs, cards), `--radius-lg` 24px for large panels (dialogs). Rules are 1px hairlines (`--color-divider`); depth comes from soft diffuse shadows (`--shadow-sm/md/lg`), never hard edges. Photography runs full color in rounded frames.

## Color

A cool light ground (`--color-bg` #f2f3f6, lit by subtle accent glows in the body background) with `--color-text` #26282e and a single indigo accent #4a5fd6 (a mono scheme: the `--color-accent-2-*` variables mirror the accent ramp exactly; treat them as one role). Each role carries a 100–900 tonal ramp (`--color-neutral-100` … `--color-accent-2-900`) generated in OKLCH on a shared perceptual lightness scale. Use the light steps (100–300) for tinted fills, hovers and subtle borders, 500 as the role's base, and the dark steps (700–900) for text on tinted fills and for pressed states; prefer ramp steps over ad-hoc `color-mix()`. For elevation use `--shadow-sm/md/lg` (already tuned to the ground) rather than ad-hoc box-shadows.

## Type

Archivo for headings over Archivo for body text, loaded as `--font-heading` / `--font-body`; headings sit at weight 600 (`--font-heading-weight`) — confident, not heavy. Density 1.00× is baked into the `--space-*` scale — use the variables, not raw numbers.

## Icons

Use Lucide icons (https://lucide.dev) throughout.

## Interaction states

Interactive states are themed, never browser defaults: give every interactive element a `:hover` tint and a pressed state from the accent ramp (one step past the base — `--color-accent-600` on a light ground, or a `color-mix()` tint for glass/ghost variants), and style keyboard focus with `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }` — never leave the default blue focus ring.

## Components

| Class | What it is | Shown in |
| --- | --- | --- |
| `.btn` with `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-icon`, `.btn-block` | Softly rounded actions — primary is a solid accent fill with a soft glow, secondary is glass | components/buttons.html |
| `.tag` with `.tag-accent`, `.tag-accent-2`, `.tag-neutral`, `.tag-outline` | Small rounded labels tinted from the ramps (mono palette: accent-2 reads the same as accent) | components/buttons.html |
| `.field` + `label`, `.input`, `.radio` + `.dot`, `.seg` + `.seg-opt` | Form fields and choices on native elements — inputs and the segmented control sit on glass | components/forms.html |
| `.card` with `.card-kicker`, `.card-title`, `.card-body`, `.card-meta`; `.elev-sm/md/lg` | Glass content cards; elevation utilities | components/cards.html |
| `.nav` + `.nav-brand` | The glass header bar | components/navigation.html |
| `.table` | Data tables with hairline row rules | components/table.html |
| `.dialog-backdrop` + `.dialog` (+ `.dialog-title/-body/-actions`) | A glass modal over a blurred backdrop | components/dialog.html |
| `.hr` | A hairline horizontal rule | foundations/layout.html |
| `.glass` | The glass surface utility — translucent fill, backdrop blur, bright border | styles.css |

States are built in: hovers and pressed states come from the accent ramp, keyboard focus is the 2px accent `:focus-visible` ring, `::selection` is an accent tint, and disabled controls drop to 45% opacity. Don't restyle them per page. The accent-to-ground pair is tuned to at least 3:1 — enough for icons, large text and interface chrome, not for body copy — so for paragraph-size text in the accent use a deep ramp step (`--color-accent-700` on this ground) rather than the accent itself.

## Do

- Layer content on glass panels above the glowing ground; let blur and soft shadow do the separating.
- Round every corner from the radius scale; controls use a soft 6–8px radius, not full pills.
- Use the accent sparingly, for the primary action and small emphasis; the system is mostly ink on soft light.
- Run photography full color in rounded frames.

## Don't

- Do not draw hard edges — no square corners, no 2px rules, no borders heavier than a hairline.
- Do not stack glass on glass more than two layers deep; it turns to fog.
- Do not use opaque flat gray panels where a glass surface is expected.
- Do not desaturate or tint imagery (`.grayscale` remains only as a legacy no-op).

## Files

- `styles.css` — the only stylesheet: the token sheet (`:root` variables, ramps, glass tokens, base type) plus the component layer. Link it from every page.
- `readme.md` — this guide.
- `theme.json` — the parameters these files were derived from (a machine-readable record of the theme).
- `thumbnail.html` — the project cover (brand mark + swatches).
- `foundations/type.html` — the type scale and the heading/body pairing at real sizes.
- `foundations/color.html` — color roles and the 100-900 tonal ramps, with usage notes.
- `foundations/layout.html` — the spacing scale, the radius scale and elevation.
- `foundations/icons.html` — the icon set at interface sizes, inline and in buttons.
- `foundations/image.html` — how photographs and figures are treated.
- `components/buttons.html` — buttons, icon buttons and tags in every variant and state.
- `components/forms.html` — text fields, radios and the segmented control on native elements.
- `components/cards.html` — glass cards and the elevation steps.
- `components/navigation.html` — the glass header bar pattern.
- `components/table.html` — a data table with hairline rules.
- `components/dialog.html` — a glass modal over its blurred backdrop.
- `theme.html` — the theme's parameters rendered as a reference sheet.
- `templates/landing/` — a starter page consuming the system the intended way (`index.html`, its `ds-base.js` loader, and the vendored `image-slot.js` its photograph mounts).
- `assets/photo.jpg` — the reference photograph the imagery page treats.
