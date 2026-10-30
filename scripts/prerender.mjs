#!/usr/bin/env node
/**
 * Bakes the app's first render into dist/index.html so the hero, copy and
 * illustrations paint without waiting for the JS bundle. React hydrates the
 * existing markup on load.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const htmlPath = resolve('dist/index.html');
const html = readFileSync(htmlPath, 'utf8');
const marker = '<div id="root"></div>';

if (!html.includes(marker)) {
  console.error('✗ dist/index.html has no empty #root — did the client build run?');
  process.exit(1);
}

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const app = render();

writeFileSync(htmlPath, html.replace(marker, `<div id="root">${app}</div>`));
console.log(`✓ prerendered ${app.length.toLocaleString()} characters into dist/index.html`);
