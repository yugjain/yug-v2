#!/usr/bin/env node
/**
 * Demo-link safety check.
 *
 * Two different promises are being kept here:
 *
 *   - A URL typed into content/lab-overrides.json is a deliberate claim, so a
 *     404 or 410 fails the build. Remove the override or fix the URL.
 *   - A URL scraped from a repo's Homepage field is published unattended, so a
 *     404 or 410 drops the link from the card and warns. One stale homepage
 *     must not stop every future project from deploying.
 *
 * Every other failure (timeouts, DNS, 403 bot walls, 5xx) is a warning: a flaky
 * network should not block a deploy, but it should be visible in the log.
 *
 * Reads the generated Lab data, so run `node scripts/lab.mjs` first.
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { GENERATED_JSON, writeLabData } from './lab-write.mjs';

const DATA = GENERATED_JSON;
const OVERRIDES = resolve('content/lab-overrides.json');
const TIMEOUT_MS = 12_000;

if (!existsSync(DATA)) {
  console.error(`✗ ${DATA} is missing — run node scripts/lab.mjs before the link check.`);
  process.exit(1);
}

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const projects = Array.isArray(data.projects) ? data.projects : [];

const overrides = existsSync(OVERRIDES)
  ? JSON.parse(readFileSync(OVERRIDES, 'utf8')).projects ?? {}
  : {};
const curatedUrls = new Set(
  Object.values(overrides)
    .map((entry) => entry?.demoUrl)
    .filter((url) => typeof url === 'string' && url.trim()),
);

const urls = [
  ...new Set(
    projects
      .map((project) => project.demoUrl)
      .filter((url) => typeof url === 'string' && /^https?:\/\//i.test(url)),
  ),
];

function summarise(line) {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${line}\n`);
}

async function probe(url, method) {
  return fetch(url, {
    method,
    redirect: 'follow',
    headers: { 'User-Agent': 'yug-lab-link-check' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

async function check(url) {
  try {
    let response = await probe(url, 'HEAD');
    // Some hosts reject HEAD. Ask again with GET before judging the URL.
    if (response.status === 405 || response.status === 501 || response.status === 403) {
      response = await probe(url, 'GET');
    }
    return { status: response.status, finalUrl: response.url || url };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

if (urls.length === 0) {
  console.log('✓ no demo links to check');
  process.exit(0);
}

const dead = [];
const dropped = [];
const warnings = [];

for (const url of urls) {
  const result = await check(url);
  if (result.error) {
    warnings.push(`${url} — ${result.error}`);
    console.warn(`⚠ could not read ${url} (${result.error})`);
    continue;
  }
  if (result.status === 404 || result.status === 410) {
    if (curatedUrls.has(url)) {
      dead.push(`${url} — ${result.status}`);
      console.error(`✗ ${url} returned ${result.status} (curated in lab-overrides.json)`);
    } else {
      dropped.push(`${url} — ${result.status}`);
      console.warn(`⚠ ${url} returned ${result.status} — dropping the Demo link from its card`);
      for (const project of projects) {
        if (project.demoUrl === url) project.demoUrl = null;
      }
    }
    continue;
  }
  if (result.status >= 400) {
    warnings.push(`${url} — ${result.status}`);
    console.warn(`⚠ ${url} returned ${result.status} (not a hard failure)`);
    continue;
  }
  console.log(`✓ ${result.status} ${url}`);
}

if (dropped.length) {
  writeLabData(data);
  summarise(`\n### Demo links dropped (404/410)\n`);
  for (const line of dropped) summarise(`- ${line}`);
  summarise(`\nThe repo homepage URL is stale. Update it on GitHub; the card shows Repo only until then.`);
}

if (warnings.length) {
  console.log(`  ${warnings.length} link warning${warnings.length === 1 ? '' : 's'}`);
}

if (dead.length) {
  console.error(
    `\n✗ ${dead.length} curated demo link${dead.length === 1 ? '' : 's'} returned 404/410. ` +
      'Fix the override or remove the URL.\n',
  );
  summarise(`\n### Curated demo links broken\n`);
  for (const line of dead) summarise(`- ${line}`);
  process.exit(1);
}

console.log(
  `✓ ${urls.length} demo link${urls.length === 1 ? '' : 's'} checked` +
    (dropped.length ? ` · ${dropped.length} dropped` : ''),
);
