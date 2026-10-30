#!/usr/bin/env node
/**
 * Regenerates the social card and the touch icon from the real page.
 *
 *   npm run preview -- --port 4173 --strictPort   # in one terminal
 *   node scripts/og.mjs
 *
 * The sticker art is captured from the live preview, so the card cannot drift
 * from the hero. The composition around it is intentionally theme-neutral:
 * cream page, ink type, one lime mark. `$1.0M` stays as approved.
 */
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const URL = process.env.OG_URL ?? 'http://localhost:4173/yug-v2/';
const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = resolve('public/og.png');
const ICON = resolve('public/apple-touch-icon.png');

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

try {
  /* ---------------------------------------------------- sticker artwork */
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 3,
  });
  await page.goto(URL, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Let the banner settle at the end of its transition.
    document.documentElement.style.background = 'transparent';
    document.body.style.background = 'transparent';
    const sheet = document.querySelector('.sheet');
    if (sheet) sheet.style.background = 'transparent';
  });
  await page.waitForTimeout(600);
  const banner = page.locator('#top > div').first();
  const art = await banner.screenshot({ omitBackground: true });
  await page.close();

  /* ------------------------------------------------------- social card */
  const data = `data:image/png;base64,${art.toString('base64')}`;
  const card = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await card.setContent(`<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; }
  body {
    background: #f1f1ea;
    background-image: radial-gradient(rgba(18,18,15,.10) 1px, transparent 1px);
    background-size: 20px 20px;
    color: #12120f;
    font-family: 'DM Sans', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .frame { position: relative; display: grid; grid-template-columns: 620px 580px; height: 100%; }
  .left { display: flex; flex-direction: column; justify-content: center; padding: 64px 0 56px 72px; }
  .eyebrow { font-family: 'Geist Mono', monospace; font-size: 15px; letter-spacing: .15em; text-transform: uppercase; color: #55554e; }
  h1 { margin: 20px 0 0; max-width: 540px; font-size: 56px; line-height: 1.06; letter-spacing: -.035em; font-weight: 600; }
  h1 em { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; letter-spacing: -.01em; }
  .facts { display: flex; gap: 30px; margin-top: 34px; padding-top: 20px; border-top: 1px dashed #c9c9bd; max-width: 540px; }
  .fact b { display: block; font-family: 'Geist Mono', monospace; font-size: 22px; letter-spacing: -.02em; }
  .fact span { display: block; margin-top: 4px; font-family: 'Geist Mono', monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: #6c6c64; }
  .foot { margin-top: auto; padding-top: 36px; font-family: 'Geist Mono', monospace; font-size: 13px; letter-spacing: .04em; color: #55554e; }
  .dot { display: inline-block; width: 7px; height: 7px; margin-right: 8px; border-radius: 999px; background: #a3e635; vertical-align: 1px; }
  .art { position: relative; display: flex; align-items: center; justify-content: center; }
  .art img { width: 560px; height: auto; }
  .rule { position: absolute; top: 0; bottom: 0; left: 620px; border-left: 1px dashed #c9c9bd; }
</style></head>
<body>
  <div class="frame">
    <div class="left">
      <div class="eyebrow"><span class="dot"></span>Enterprise Client Partner · Mumbai</div>
      <h1>I keep <em>$1.0M+</em> enterprise SaaS portfolios renewing and growing.</h1>
      <div class="facts">
        <div class="fact"><b>+30%</b><span>ARR growth</span></div>
        <div class="fact"><b>80%+</b><span>Gross retention</span></div>
        <div class="fact"><b>10 yrs</b><span>Experience</span></div>
      </div>
      <div class="foot">yugjain.github.io/yug-v2</div>
    </div>
    <div class="rule"></div>
    <div class="art"><img src="${data}" alt="" /></div>
  </div>
</body></html>`);
  await card.evaluate(() => document.fonts.ready);
  await card.waitForTimeout(400);
  await card.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await card.close();

  /* ------------------------------------------------------- touch icon */
  const icon = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
  const svg = readFileSync(resolve('public/favicon.svg'), 'utf8')
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/width="64" height="64"/, 'width="180" height="180"');
  await icon.setContent(
    `<body style="margin:0;width:180px;height:180px;overflow:hidden;background:transparent">${svg}</body>`,
  );
  await icon.waitForTimeout(200);
  await icon.screenshot({ path: ICON, omitBackground: true });
  await icon.close();

  console.log(`✓ ${OUT}`);
  console.log(`✓ ${ICON}`);
} finally {
  await browser.close();
}
