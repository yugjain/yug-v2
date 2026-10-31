# yug-v2

A quiet, single-column portfolio for Yug Jain — built as the B-side to
[yugjain.github.io](https://yugjain.github.io). Same facts, different posture: editorial instead of
bento, disposable instead of stacked.

**Live:** https://yugjain.github.io/yug-v2/

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (tokens in `src/index.css`)
- No router, no animation library, no analytics SDK
- Self-hosted DM Sans / Geist Mono / Instrument Serif / Caveat subsets

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173/yug-v2/
npm run build    # → dist/ (home + /lab/)
npm run preview
```

`npm run dev` and `npm run build` first generate the Lab data from
`content/lab-snapshot.json` and `content/lab-overrides.json`. Run
`npm run lab:refresh` to update the snapshot from the public GitHub API; the deploy
workflow also does this weekly. No token is needed locally, and none is shipped to
the browser.

The production build is served from `/yug-v2/`, so `base` is set in `vite.config.ts`. Any new asset
path must go through `import.meta.env.BASE_URL` (exported as `BASE` in `src/content.ts`).

## Structure

```
src/
  content.ts          all copy, roles, dossiers, essays, play data
  useTheme.ts         light/dark with localStorage + system default
  App.tsx             home page order
  LabApp.tsx          /lab/ search, filters and incremental list
  lab/                project types, card, derived data
  entry-server.tsx    prerenderers for both pages
  components/
    TopBar · BottomNav · Hero · Stickers · Work · HowIWork · Advisory
    Proof · Writing · Reader · Synthesizer
    OffClock          silent fingerstyle sequencer, draggable ball, draggable press
    SideProjects      home Lab strip
    Closing · Elsewhere · Footer · Section · Reveal · Marginalia · Lamp · Icons
content/
  lab-overrides.json  status, featured, demo URL, screenshot, one-liner
  lab-snapshot.json   committed last-good public GitHub data
lab/index.html        second Vite entry, prerendered to dist/lab/index.html
scripts/lab.mjs       public GitHub fetch + override merge + generated data
scripts/check-links.mjs  fails on 404/410 demo URLs
```

## Editing content

Everything a recruiter reads lives in `src/content.ts`. Nothing else needs touching to update a
number, a role, a dossier or an essay. Lab projects are different: they come from public GitHub
repos tagged `showcase`, with optional metadata in `content/lab-overrides.json`. See
[`OPEN_ITEMS.md`](OPEN_ITEMS.md) for the field list and the five projects currently shipped.

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` refreshes the public GitHub Lab
data, builds both pages and publishes to GitHub Pages. It also runs weekly and commits the
refreshed snapshot with `[skip ci]`.

First-time repo setup:

```bash
gh repo create yug-v2 --public --source=. --remote=origin --push
```

Then in **Settings → Pages**, set **Source** to **GitHub Actions** (once).

## A/B note

This build intentionally uses its own Google Calendar link so bookings can be attributed to v2.
`og.png` is a separate 1200×630 raster so shared links preview correctly.
