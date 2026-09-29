# Design

How drewpaine.net should look. Follow this when adding pages, posts or styles. The full brand guide with live component previews is at https://claude.ai/artifact/1XDByMx9r6S2Ce45dt72Pe.

The site should feel like a well-kept lab notebook: calm sage paper, forest-green ink, and a few precise marks of color where something matters.

> **Status:** `src/css/style.css` implements this system. Add new styles through the tokens it defines.

## Palette

Five brand colors, from `palette.pdf`. Forest is the primary anchor; the background is Sage, lightened.

| Brand color | Hex | Role |
| --- | --- | --- |
| Forest | `#103900` | Primary: headings, links, nav, buttons |
| Sage | `#B8BDB5` | The ground: page background (lightened), sidebars, rules |
| Navy | `#052F5F` | Supporting information, focus ring |
| Oxblood | `#6B0F1A` | Callouts only |
| Orange | `#FB6107` | Signal accent, in small amounts |

## Tokens

Copy these into the top of `src/css/style.css` and style everything through them. Never hard-code a hex value in a rule.

```css
:root {
  /* Color: light theme (default) */
  --surface: #e3e5e1;         /* page background: Sage tinted 60% toward white */
  --surface-raised: #f1f2f0;  /* author bio, raised blocks */
  --sage: #b8bdb5;            /* sidebar ground, strong dividers */
  --line: var(--sage);        /* hairline rules */
  --ink: #16200f;             /* body text */
  --ink-muted: #434b3f;       /* bylines, dates, captions */
  --forest: #103900;          /* primary anchor */
  --forest-soft: #d8e2d0;     /* highlighted row ground */
  --on-forest: #f1f2f0;       /* text on a forest fill */
  --orange: #fb6107;          /* accent marks */
  --oxblood: #6b0f1a;         /* callout border and title */
  --oxblood-soft: #f2e4e5;    /* callout ground */
  --navy: #052f5f;            /* sidebar titles */
  --focus: #052f5f;           /* keyboard focus ring */

  /* Type */
  --font-serif: "Newsreader", Georgia, "Times New Roman", serif;
  --font-sans: "Inter", "Segoe UI", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;

  /* Spacing (4px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radius */
  --radius-sm: 2px;
  --radius-md: 6px;
  --radius-round: 50%;

  /* Layout */
  --content-width: 70%;
  --content-width-narrow: 90%;
  --measure: 68ch;
}

/* Dark theme: same roles, lifted hues */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --surface: #121710;
    --surface-raised: #1b2218;
    --sage: #3b4337;
    --ink: #e4e8e0;
    --ink-muted: #a9b1a4;
    --forest: #9fcb80;
    --forest-soft: #1d2c14;
    --on-forest: #121710;
    --oxblood: #e8939c;
    --oxblood-soft: #2e1417;
    --navy: #93b8e6;
    --focus: #fb6107;
  }
}
```

The dark theme is optional. If it isn't added, the site stays light for everyone.

## Color rules

- Paint the page with `--surface`. Never use pure white or pure black.
- Body text is `--ink`; bylines and captions are `--ink-muted`.
- Forest is the dominant hue: every title, heading and link is `--forest`. A primary button is a `--forest` fill with `--on-forest` text.
- Use `--sage` at full strength only for sidebar grounds and rules. It's too close to `--surface` to separate things on its own.
- Use `--oxblood` only in callouts, and use at most one callout per screen.
- Use `--navy` for sidebar titles and the focus ring.
- **Orange is never text on a light background.** It's only 2.4:1 against `--surface`. Use it for underlines, the active-nav bar and small rule marks. It can be large text (24px+) on a `--forest` fill, or any text in the dark theme.
- Pair Forest with at most one other hue per component.

### Checked contrast pairs

All text pairs meet WCAG AA (4.5:1) in both themes. Re-check any new pair before using it.

| Text | Background | Light | Dark |
| --- | --- | --- | --- |
| `--ink` | `--surface` | 13.3:1 | 14.6:1 |
| `--ink` | `--sage` | 8.8:1 | 8.3:1 |
| `--ink-muted` | `--surface` | 7.2:1 | 8.2:1 |
| `--ink-muted` | `--sage` | 4.7:1 | 4.65:1 |
| `--forest` | `--surface` | 10.3:1 | 9.8:1 |
| `--oxblood` | `--oxblood-soft` | 9.9:1 | 7.4:1 |
| `--navy` | `--sage` | 7.0:1 | 5.0:1 |
| `--on-forest` | `--forest` | 11.6:1 | 9.8:1 |
| `--orange` | `--surface` | 2.4:1 ✗ | 5.9:1 |
| `--orange` | `--forest` | 4.2:1 (large text only) | ✗ |

## Type

| Family | Token | Used for |
| --- | --- | --- |
| Newsreader | `--font-serif` | Name, titles, headings, lede |
| Inter | `--font-sans` | All running text, nav, buttons |
| IBM Plex Mono | `--font-mono` | Bylines, dates, uppercase labels |

Load them in the `<head>` of `src/_includes/layouts/base.njk`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,700;1,14..32,400&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap">
```

| Style | Family | Size / line height | Weight | Use |
| --- | --- | --- | --- | --- |
| display | serif | 48 / 52px (36px under 600px) | 600 | Reserved for a large name treatment; not currently used |
| h1 | serif | 40 / 46px (32px under 600px) | 600 | Page and post titles |
| h2 | serif | 28 / 34px | 600 | Sections, blog entry titles |
| h3 | serif | 22 / 28px | 600 | Sub-sections, box titles |
| lede | serif | 21 / 32px | 400 italic | Summary under a post title |
| body | sans | 18 / 29px | 400 | Running text |
| body-small | sans | 16 / 24px | 400 | Sidebars, author bio, blog summaries |
| byline | mono | 14 / 20px | 400 | Author and date lines, footer |
| label | mono | 12 / 16px, 0.08em tracking | 500 | UPPERCASE labels |

- Keep running text within `--measure` (68ch).
- Give headings `text-wrap: balance`.
- Use bold for emphasis in body text, not whole italic sentences.

## Layout

- One centered column: `max-width: var(--content-width)`, widening to `var(--content-width-narrow)` at 600px and below. This is the site's only breakpoint.
- Never let the page scroll sideways.
- Separate sections with space and a 1px `--line` rule, not boxes. Only callouts, sidebars and the author bio get a background.
- Spacing: `--space-4` inside boxes on phones, `--space-6` on desktop; `--space-8` around boxes and between blog entries; `--space-12` between page sections.
- Corners: `--radius-md` on boxes, `--radius-sm` on buttons, `--radius-round` on author photos (the home page headshot is a portrait, so it uses `--radius-md`). No shadows.

## Components

Each maps to an existing class or template in the site.

| Component | Where | Spec |
| --- | --- | --- |
| Site header | `.site-header` in `base.njk` | Brand mark (36px tall) and "Drew Paine, PhD" in Newsreader 600 at 22px, `--forest`, linking home, on the left. Nav on the right when the blog is on. `--line` rule below, `--space-12` before the page content. |
| Site nav | `.sitenav` in `.site-header` | Only shown when the blog is on. `--space-6` gaps, bold sans `--forest` links, no underline. Current page: 3px `--orange` bar beneath and `aria-current="page"`. |
| Post header | `.post-header` in `post.njk` | `h1` title, `lede`, then `byline` in `--ink-muted` ("By Drew Paine, PhD · September 28, 2026"), `--line` rule below. |
| Callout | `.callout`, `{% callout %}` | Full width. `--oxblood-soft` ground, 1px `--oxblood` border, `--radius-md`, `--space-6` padding, `h3` title in `--oxblood`, text in `--ink`. |
| Sidebar | `.sidebar`, `{% sidebar %}` | Floats right at 35%, full width under 600px. `--sage` ground, `--radius-md`, optional `label` in `--ink-muted`, `h3` title in `--navy`, `body-small` text. |
| Author bio | `.author-bio` in `post.njk` | `--surface-raised` ground, `--radius-md`, 96px round photo beside the text (stacked, centered under 600px), `label` "About the author", bold name, `body-small` bio, email in `byline` style. |
| Blog entry | `.post-entry` in `blog/index.njk` | `h2` title as an un-underlined `--forest` link, `byline`, `body-small` summary, bold "Read more →". `--line` rule between entries. |

## Links and focus

```css
a {
  color: var(--forest);
  text-decoration: underline;
  text-decoration-color: var(--orange);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
a:hover { text-decoration-color: var(--forest); }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

Never remove the focus outline.

## Writing

- Plain, direct and specific. Write for a researcher from another field.
- Bios are third person ("Drew Paine is…"). Posts may use first person.
- Title Case for page, role and post titles. UPPERCASE only in `label` style.
- Spell out an organization on first use with its linked acronym in parentheses: "Better Scientific Software (BSSw)".
- `&` in role and group names ("Product & User Experience"); "and" in sentences.
- Write emails out (`pained - at - lbl - dot - gov`); never use `mailto:` links.
- The brand mark is the forest block with its dot grid from the brand guide cover: a `--forest` rounded rectangle (24×30, 3px corners) with ten `--surface` dots stepping up to the right. It appears in the site header, left of "Drew Paine, PhD" in Newsreader 600, and links home. Use it only with the name; don't recolor or redraw it.
- No emoji and no other icons.
- Every image needs alt text naming who or what it shows.
