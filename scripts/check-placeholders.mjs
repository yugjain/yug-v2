#!/usr/bin/env node
/**
 * Fails the build if an unresolved placeholder reached the output.
 *
 * Placeholders are written as {{VERIFY: question}} in OPEN_ITEMS.md only.
 * Components read nullable values from src/claims.ts and render nothing.
 * If this script ever finds the marker inside dist/, something has been
 * wired up wrong and the build must stop.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'dist';
const MARKER = '{{VERIFY';
const BINARY = /\.(png|jpe?g|webp|avif|gif|ico|pdf|woff2?|ttf|otf|mp4|zip)$/i;

if (!existsSync(ROOT)) {
  console.error(`✗ ${ROOT}/ does not exist — run vite build first.`);
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else files.push(full);
  }
})(ROOT);

const leaks = [];
for (const file of files) {
  if (BINARY.test(file)) continue;
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (text.includes(MARKER)) leaks.push(relative(ROOT, file));
}

if (leaks.length) {
  console.error(`\n✗ Unresolved ${MARKER}…}} placeholder(s) in the build:\n`);
  for (const file of leaks) console.error(`   ${file}`);
  console.error('\nFix the value in src/claims.ts or remove the slot. See OPEN_ITEMS.md.\n');
  process.exit(1);
}

console.log(`✓ no unresolved placeholders in ${files.length} build files`);
