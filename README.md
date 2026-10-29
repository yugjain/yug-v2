# yug-v2

A quiet, single-column portfolio for Yug Jain — built as the B-side to
[yugjain.github.io](https://yugjain.github.io). Same facts, different posture: editorial instead of
bento, disposable instead of stacked.

**Live:** https://yugjain.github.io/yug-v2/

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (tokens in `src/index.css`)
- No router, no animation library, no analytics SDK
- DM Sans / Geist Mono / Instrument Serif via Google Fonts

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173/yug-v2/
npm run build    # → dist/
npm run preview
```

The production build is served from `/yug-v2/`, so `base` is set in `vite.config.ts`. Any new asset
path must go through `import.meta.env.BASE_URL` (exported as `BASE` in `src/content.ts`).

## Structure

```
src/
  content.ts          all copy, roles, dossiers, essays, play data
  useTheme.ts         light/dark with localStorage + system default
  App.tsx             page order
  components/
    TopBar · Hero · Work · Advisory · Proof · Writing · Reader
    Synthesizer       the QBR widget (deterministic, no API)
    OffClock          guitar synth, pitch positions, AeroPress stepper
    Elsewhere · Footer · Section · Icons
```

## Editing content

Everything a recruiter reads lives in `src/content.ts`. Nothing else needs touching to update a
number, a role, a dossier or an essay.

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.

First-time repo setup:

```bash
gh repo create yug-v2 --public --source=. --remote=origin --push
```

Then in **Settings → Pages**, set **Source** to **GitHub Actions** (once).

## A/B note

This build intentionally uses its own Google Calendar link so bookings can be attributed to v2.
`og.png` is a separate 1200×630 raster so shared links preview correctly.
