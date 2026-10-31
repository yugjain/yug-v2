#!/usr/bin/env node
/**
 * Did the refreshed Lab snapshot actually change?
 *
 * `fetchedAt` moves on every run, so a raw diff would commit and redeploy every
 * few hours even when nothing a visitor can see has changed. This compares the
 * project list only and reports `changed=true|false` for the workflow to use.
 */
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';

const PATH = 'content/lab-snapshot.json';

function normalize(snapshot) {
  const projects = Array.isArray(snapshot?.projects) ? snapshot.projects : [];
  return JSON.stringify(
    [...projects].sort((a, b) => String(a.fullName).localeCompare(String(b.fullName))),
  );
}

let before = null;
try {
  before = JSON.parse(execFileSync('git', ['show', `HEAD:${PATH}`], { encoding: 'utf8' }));
} catch {
  before = null;
}

const after = JSON.parse(readFileSync(PATH, 'utf8'));
const changed = before === null || normalize(before) !== normalize(after);

console.log(changed ? '✓ Lab snapshot changed' : '· Lab snapshot unchanged (only fetchedAt moved)');
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
