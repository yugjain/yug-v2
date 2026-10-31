#!/usr/bin/env node
/**
 * Build-time Lab data pipeline.
 *
 *   node scripts/lab.mjs             # snapshot + overrides -> generated data
 *   node scripts/lab.mjs --refresh   # public GitHub API -> snapshot -> generated data
 *
 * Only public repos owned by yugjain with the "showcase" topic are eligible.
 * If the API fails, the committed snapshot is used and the build continues.
 * A token, when present, comes from the CI environment and is never written
 * anywhere.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OWNER = 'yugjain';
const SNAPSHOT_PATH = resolve(ROOT, 'content/lab-snapshot.json');
const OVERRIDES_PATH = resolve(ROOT, 'content/lab-overrides.json');
const GENERATED_DIR = resolve(ROOT, 'src/generated');
const GENERATED_TS = resolve(GENERATED_DIR, 'lab.ts');
const GENERATED_JSON = resolve(GENERATED_DIR, 'lab.json');

const STATUSES = new Set(['live', 'prototype', 'experiment', 'archived']);
const READABLE_NAME = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

const warnings = [];
const warn = (message) => {
  warnings.push(message);
  console.warn(`⚠ ${message}`);
};

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    warn(`${path} is not valid JSON (${error.message})`);
    return fallback;
  }
}

function clean(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function httpUrl(value) {
  const text = clean(value);
  if (!text) return null;
  try {
    const url = new URL(text);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

function screenshotUrl(value) {
  const text = clean(value);
  if (!text) return null;
  if (/^https?:\/\//i.test(text)) return text;
  if (text.startsWith('/')) return text;
  warn(`screenshot "${text}" must be an http(s) URL or a site-absolute path`);
  return null;
}

function isoDate(value) {
  const text = clean(value);
  if (!text) return null;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function overrideFor(overrides, raw) {
  const map = overrides?.projects ?? {};
  return map[raw.name] ?? map[raw.fullName] ?? {};
}

function statusFor(value, archived) {
  if (value == null) return archived ? 'archived' : null;
  if (STATUSES.has(value)) return value;
  warn(`unknown status "${value}" — expected live, prototype, experiment or archived`);
  return archived ? 'archived' : null;
}

/* ------------------------------------------------------------------ GitHub */

class HttpError extends Error {
  constructor(status, url) {
    super(`${status} ${url}`);
    this.status = status;
  }
}

async function request(url, token, accept = 'application/vnd.github+json') {
  const response = await fetch(url, {
    headers: {
      Accept: accept,
      'User-Agent': 'yug-lab-build',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new HttpError(response.status, url);
  return response;
}

async function fetchRepos(token) {
  const repos = [];
  for (let page = 1; page <= 20; page += 1) {
    const url =
      `https://api.github.com/users/${OWNER}/repos` +
      `?per_page=100&page=${page}&type=owner&sort=updated`;
    const response = await request(url, token);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('GitHub returned an unexpected repos payload');
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

async function readmeLength(fullName, token) {
  try {
    const response = await request(
      `https://api.github.com/repos/${fullName}/readme`,
      token,
      'application/vnd.github.raw+json',
    );
    return (await response.text()).trim().length;
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) return 0;
    throw error;
  }
}

async function firstRelease(fullName, token) {
  try {
    const response = await request(
      `https://api.github.com/repos/${fullName}/releases?per_page=100`,
      token,
    );
    const releases = await response.json();
    if (!Array.isArray(releases)) return null;
    const dates = releases
      .filter((release) => !release.draft && release.published_at)
      .map((release) => release.published_at)
      .filter(Boolean)
      .sort();
    if (releases.length === 100) {
      warn(`${fullName} returned 100 releases — the earliest may not be in this page`);
    }
    return dates[0] ?? null;
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) return null;
    throw error;
  }
}

async function refresh() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null;
  const overrides = readJson(OVERRIDES_PATH, { projects: {} });
  const repos = await fetchRepos(token);

  const candidates = repos.filter((repo) => {
    if (repo.private || repo.fork) return false;
    if (!Array.isArray(repo.topics) || !repo.topics.includes('showcase')) return false;
    const override = overrideFor(overrides, repo);
    if (repo.archived && !override.includeArchived) return false;
    return true;
  });

  const projects = [];
  for (const repo of candidates) {
    const override = overrideFor(overrides, repo);
    const length = await readmeLength(repo.full_name, token);
    if (!length) {
      warn(`${repo.name}: skipped — no README`);
      continue;
    }
    if (!clean(repo.description) && !clean(override.oneLiner)) {
      warn(`${repo.name}: skipped — no description and no oneLiner override`);
      continue;
    }
    const release = await firstRelease(repo.full_name, token);
    projects.push({
      name: repo.name,
      fullName: repo.full_name,
      description: clean(repo.description),
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      language: clean(repo.language),
      htmlUrl: repo.html_url,
      homepage: clean(repo.homepage),
      createdAt: repo.created_at ?? null,
      firstReleaseAt: release,
      readmeLength: length,
      archived: Boolean(repo.archived),
      fork: Boolean(repo.fork),
      private: Boolean(repo.private),
    });
  }

  const snapshot = {
    fetchedAt: new Date().toISOString(),
    source: 'api',
    projects,
  };
  writeFileSync(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(
    `✓ refreshed Lab snapshot: ${projects.length} showcase project${projects.length === 1 ? '' : 's'}`,
  );
  return snapshot;
}

/* ------------------------------------------------------------------- merge */

function merge(snapshot, overrides) {
  const rawProjects = Array.isArray(snapshot.projects) ? snapshot.projects : [];
  const merged = [];
  const matchedOverrides = new Set();

  for (const raw of rawProjects) {
    const override = overrideFor(overrides, raw);
    if (override && Object.keys(override).length) {
      matchedOverrides.add(raw.name);
      matchedOverrides.add(raw.fullName);
    }

    if (raw.private || raw.fork) continue;
    if (override.hidden) continue;
    if (raw.archived && !override.includeArchived) continue;
    if (!raw.readmeLength) {
      warn(`${raw.name}: excluded — README is missing or empty`);
      continue;
    }
    if (!clean(raw.description) && !clean(override.oneLiner)) {
      warn(`${raw.name}: excluded — no description and no oneLiner override`);
      continue;
    }

    const status = statusFor(override.status, Boolean(raw.archived));
    const oneLiner = clean(override.oneLiner) ?? clean(raw.description);
    const demoUrl = httpUrl(override.demoUrl) ?? httpUrl(raw.homepage);
    const screenshot = screenshotUrl(override.screenshot);
    const shippedAt =
      isoDate(override.shippedDate) ?? isoDate(raw.firstReleaseAt) ?? isoDate(raw.createdAt);

    if (override.demoUrl && !httpUrl(override.demoUrl)) {
      warn(`${raw.name}: demoUrl "${override.demoUrl}" is not an http(s) URL`);
    }
    if (clean(override.shippedDate) && !isoDate(override.shippedDate)) {
      warn(`${raw.name}: shippedDate "${override.shippedDate}" is not a valid date`);
    }

    if (raw.readmeLength < 200) {
      warn(`${raw.name}: README is only ${raw.readmeLength} characters (under 200)`);
    }
    if (!READABLE_NAME.test(raw.name) || raw.name.length > 40) {
      warn(`${raw.name}: repo name does not look like a readable slug`);
    }
    if (!status) warn(`${raw.name}: no status override — the card will omit the chip`);

    merged.push({
      name: raw.name,
      fullName: raw.fullName,
      description: clean(raw.description),
      oneLiner,
      topics: (Array.isArray(raw.topics) ? raw.topics : []).filter((topic) => topic !== 'showcase'),
      language: clean(raw.language),
      htmlUrl: raw.htmlUrl,
      demoUrl,
      screenshot,
      status,
      featured: Boolean(override.featured),
      archived: Boolean(raw.archived),
      shippedAt,
    });
  }

  for (const key of Object.keys(overrides?.projects ?? {})) {
    if (!matchedOverrides.has(key) && rawProjects.length) {
      warn(`override "${key}" does not match a showcase repo in the snapshot`);
    }
  }

  merged.sort((a, b) => {
    const at = a.shippedAt ? Date.parse(a.shippedAt) : -Infinity;
    const bt = b.shippedAt ? Date.parse(b.shippedAt) : -Infinity;
    if (at !== bt) return bt - at;
    return a.name.localeCompare(b.name);
  });

  const featured = merged.filter((project) => project.featured && !project.archived);
  if (featured.length > 3) {
    warn(`${featured.length} projects are marked featured; the site shows the newest 3`);
  }

  return merged;
}

/* ------------------------------------------------------------------ output */

function writeGenerated(data) {
  mkdirSync(GENERATED_DIR, { recursive: true });
  const json = `${JSON.stringify(data, null, 2)}\n`;
  writeFileSync(GENERATED_JSON, json);
  writeFileSync(
    GENERATED_TS,
    `/* Generated by scripts/lab.mjs. Do not edit by hand. */\n` +
      `import type { LabData } from '../lab/types';\n\n` +
      `export const labData: LabData = ${json.trim()};\n`,
  );
}

async function main() {
  const overrides = readJson(OVERRIDES_PATH, { projects: {} });
  let snapshot = readJson(SNAPSHOT_PATH, null);

  if (process.argv.includes('--refresh')) {
    try {
      snapshot = await refresh();
    } catch (error) {
      console.warn(`⚠ Lab refresh failed (${error.message}); using the last-good snapshot`);
      if (!snapshot) {
        console.error(
          '✗ no last-good snapshot exists — refusing to build an empty Lab from an API error.\n' +
            '  Seed it once with a working network: npm run lab:refresh',
        );
        process.exit(1);
      }
    }
  }

  if (!snapshot) {
    console.error(
      '✗ no Lab snapshot found — refusing to build an empty Lab.\n' +
        '  Seed it once with: npm run lab:refresh',
    );
    process.exit(1);
  }

  const projects = merge(snapshot, overrides);
  const data = {
    meta: {
      fetchedAt: snapshot.fetchedAt ?? null,
      source: snapshot.source ?? 'snapshot',
    },
    projects,
  };
  writeGenerated(data);

  console.log(
    `✓ Lab data: ${projects.length} project${projects.length === 1 ? '' : 's'}` +
      ` (${projects.filter((project) => project.featured && !project.archived).length} featured)` +
      ` · snapshot ${snapshot.source ?? 'unknown'}`,
  );
  if (warnings.length) console.log(`  ${warnings.length} warning${warnings.length === 1 ? '' : 's'}`);
}

await main();
