# Origin site architecture

The home page is hand-built. Every section, news, model, and event route renders
the same Origin coming-soon experience until its content is written.

## Routes

| Route | Source |
| --- | --- |
| `/` | Hand-built Origin home |
| `/<slug>` | Section routes from `src/content/pages/manifest.json` |
| `/events` | Events coming-soon page |
| `/events/<slug>` | Event routes from `src/content/events.ts` |

`src/app/[...slug]/page.tsx` resolves routes through the manifest. Only the 32
manifest entries are generated; everything else returns 404. The old
`/claude/*` routes were renamed to `/models/*` and `/claude-corps` was renamed
to `/origin-corps`.

## Layers

- **`src/app`** — routing and metadata only.
- **`src/components/home`** — Origin home sections.
- **`src/components/layout`** — header, fullscreen menu, footer, dropdown.
- **`src/components/page`** — coming-soon page shell and body.
- **`src/components/brand.tsx`** — traced Origin wordmark and O mark, plus icons.
  The wordmark uses a mask for the `g` counter so it works on light and dark
  surfaces; `src/styles/brand.css` keeps the orange O from being flattened by
  the captured header rule.
- **`src/content`** — all copy and navigation data, not JSX.
- **`src/content/sections.ts`** — manifest lookup plus per-section coming-soon notes.
- **`src/lib/links.ts`** — live-link checks and `~`/`-` placeholder mapping.
- **`src/types/content.ts`** — shared content interfaces.
- **`src/styles`** — global styles imported by `src/app/globals.css`.

## Home report video

The "Clarity over black boxes" card in `src/components/home/report.tsx` is backed
by two videos in `public/media/`:

- `origin-reveal.mp4` plays first.
- `origin-frame.mp4` plays after the first one has finished, the card leaves the
  viewport, and the user scrolls back.

The video only plays while the card is in view. When it ends, the media layer
gets a light blur and the report copy fades in. The play/pause button replays the
active video from the start and hides the copy again. Hover on fine pointers
lifts and slightly scales the card; reduced-motion users get the blurred poster
frame with the copy already visible. Styles live in `src/styles/home-report.css`
and load after the captured styles.

## Content rules

- Model families keep their names: Haiku, Sonnet, Opus, Mythos, Fable.
- Do not prefix model names with Origin.
- News pages show the press contact `press@origin.com`.
- Dead or unowned links stay visible as placeholders (`https://~.ai` or
  `https://-.ai`) instead of being removed.
- No public benefit corporation claims.
