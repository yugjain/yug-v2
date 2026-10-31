#!/usr/bin/env node
/**
 * Demo-link safety check.
 *
 * Fails the build when a project demo/homepage URL returns 404 or 410, the
 * two responses that mean "this link is definitely gone". Every other failure
 * (timeouts, DNS, 403 bot walls, 5xx) is a warning: a flaky network should not
 * block a deploy, but it should be visible in the log.
 *
 * Reads the generated Lab data, so run `node scripts/lab.mjs` first.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DATA = resolve('src/generated/lab.json');
const TIMEOUT_MS = 12_000;

if (!existsSync(DATA)) {
  console.error(`✗ ${DATA} is missing — run node scripts/lab.mjs before the link check.`);
  process.exit(1);
}

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const projects = Array.isArray(data.projects) ? data.projects : [];
const urls = [
  ...new Set(
    projects
      .map((project) => project.demoUrl)
      .filter((url) => typeof url === 'string' && /^https?:\/\//i.test(url)),
  ),
];

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
const warnings = [];

for (const url of urls) {
  const result = await check(url);
  if (result.error) {
    warnings.push(`${url} — ${result.error}`);
    console.warn(`⚠ could not read ${url} (${result.error})`);
    continue;
  }
  if (result.status === 404 || result.status === 410) {
    dead.push(`${url} — ${result.status}`);
    console.error(`✗ ${url} returned ${result.status}`);
    continue;
  }
  if (result.status >= 400) {
    warnings.push(`${url} — ${result.status}`);
    console.warn(`⚠ ${url} returned ${result.status} (not a hard failure)`);
    continue;
  }
  console.log(`✓ ${result.status} ${url}`);
}

if (warnings.length) {
  console.log(`  ${warnings.length} link warning${warnings.length === 1 ? '' : 's'}`);
}

if (dead.length) {
  console.error(
    `\n✗ ${dead.length} demo link${dead.length === 1 ? '' : 's'} returned 404/410. ` +
      'Fix the override or remove the URL.\n',
  );
  process.exit(1);
}

console.log(`✓ ${urls.length} demo link${urls.length === 1 ? '' : 's'} checked`);
