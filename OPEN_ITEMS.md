# OPEN ITEMS

Everything the site is waiting on you for. Each slot below is `null` in
[`src/claims.ts`](src/claims.ts), which means the component renders **nothing at all** — no empty
label, no gap. Fill the string and the element appears in place.

The literal marker `{{VERIFY: …}}` exists only in this file. It is never imported, never bundled,
and the build fails if it ever appears in `dist/` (`scripts/check-placeholders.mjs`).

---

## 1. Copy slots

| # | Marker | Field | Renders at | Effect once filled |
|---|---|---|---|---|
| 1 | `{{VERIFY: net revenue retention % if I want it shown}}` | `pending.nrr` | Hero fact row, after gross retention | Adds a 6th fact and switches the row to six columns |
| 2 | `{{VERIFY: target role, e.g. Client Partner / Enterprise Account Director at Series B-D SaaS or a Salesforce SI}}` | `pending.seeking` | Under the hero tagline | Adds a `Seeking:` line; nothing renders while empty |
| 3 | `{{VERIFY: sponsorship status and/or overlap hours}}` | `pending.workAuth` | Beside the status chips (`Open to US · UK · Ireland`) | Adds one chip; the protected chips are untouched |

Example:

```ts
// src/claims.ts
export const pending = {
  nrr: '112%',
  seeking: 'Client Partner at a Series B–D SaaS company',
  workAuth: 'Requires sponsorship in the US',
};
```

## 2. Testimonial attribution

Three quotes are on the page with roles and companies but **no names**. I did not invent any. Each
figure keeps its quote and its descriptor; a name line appears only when you add one.

| # | Quote starts | Field to fill | Marker |
|---|---|---|---|
| 4 | "Yug holds the room with enterprise VPs…" | `testimonials[0].name` + consent | `{{VERIFY: who said this, and do they consent to being named}}` |
| 5 | "He replaced reactive check-ins with telemetry-backed QBRs…" | `testimonials[1].name` + consent | `{{VERIFY: who said this, and do they consent to being named}}` |
| 6 | "Most CSMs manage tickets; Yug builds systems…" | `testimonials[2].name` + consent | `{{VERIFY: who said this, and do they consent to being named}}` |

Consent matters for all three: a named executive quote on a public page is a claim about a
third party, not just about you. If consent is unclear, leaving the name empty is the correct
state — the quote still works anonymously.

> Note: quote 3 contains "50% faster onboarding" verbatim. It is the one place the de-duplicated
> claim still repeats, because editing a testimonial would falsify it.

## 3. Decisions I made on your behalf

| Decision | What I did | Why |
|---|---|---|
| Sticker theming | Neutral surfaces (`ink`, `paper`, `cream`, `halo`) moved to CSS variables; wood, coffee and lime stay fixed; the white die-cut halo becomes a warm off-white in dark mode | Keeps the printed-sticker identity; satisfies "illustrations use variables" without turning stickers into UI cards |
| Mobile gutters | `20px → 16px` at <640px | Your call was "you take call"; 16px is the requested spec and visually negligible |
| Shelf labels | Size-only bump to 12px, wording and layout untouched | The only protected section that failed the 12px rule; you allowed a size-only fix |
| De-duplication | Canonical homes: **50% → Proof metric**, **25+ → Work row 03 impact**. Removed from role impact/stat, testimonial badge, Elsewhere bio | Strongest visible placement for each. Full diff in the Phase 2 commit |
| "80%+" ordering | Retention now sits second with `multi-year` attached | A bare 80% invites "80% of what?" before the reader reaches context |

## 4. Still yours to answer (not blocking)

These are in [`CLAIMS.md`](CLAIMS.md) with locations; none are rendered as placeholders because
they are existing prose, not empty slots.

1. Is "Present" still accurate for NTT DATA?
2. What period does `$1.0M → $1.3M` cover?
3. What is the 50% onboarding baseline — days before and after?
4. How was `−65%` QBR prep effort measured?
5. Should `80%+` retention carry a period or a calculation note?
6. Are the advisory outcome figures okay to be anonymous (no dates, no metrics beyond −65%)?

## 5. Follow-ups after this pass

- Pages is configured to deploy from **GitHub Actions** (`build_type=workflow`). Keep it there:
  the repo root is source, so a branch-based Pages build would serve `index.html` with
  `/src/main.tsx` instead of the built site. Every push to `main` triggers the workflow; use
  `workflow_dispatch` to re-run it without a commit.
- The build now prerenders the first paint into `dist/index.html`
  (`vite build --ssr src/entry-server.tsx` → `node scripts/prerender.mjs` → React hydrates on
  load). `dist-ssr/` is generated and gitignored. If a component ever branches on `window` during
  its first render, hydration will warn — move that branch into an effect.
- The IST clock is stamped by a tiny inline script in `index.html` before paint, then read back
  during hydration. Keeping the stamp and `Hero.tsx` in sync avoids a first-paint flash.
- OG image is regenerated from the sticker hero at 1200×630. If you change the hero art, run
  `npm run preview -- --port 4173 --strictPort` in one terminal and `node scripts/og.mjs` in
  another. The same script also writes `public/apple-touch-icon.png`.
- `scripts/og.mjs` uses the system Chrome through `playwright-core` (a devDependency only). On a
  machine without Chrome at the default macOS path, set `CHROME_PATH`.
- Fonts are self-hosted latin subsets in `src/assets/fonts/` so the critical path has no
  `fonts.googleapis.com` request. If you add non-latin copy, add the matching subset or the
  glyphs will fall back to the system font.
- Lighthouse is not a dependency; it was run with `npx lighthouse@12` and is not shipped.
