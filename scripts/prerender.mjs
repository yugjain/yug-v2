#!/usr/bin/env node
/**
 * Bakes each app's first render into its built HTML file so the hero, copy and
 * illustrations paint without waiting for the JS bundle. React hydrates the
 * existing markup on load.
 *
 * Vite builds two entries: the home page and the Lab page. Both are
 * prerendered; a missing output file is a build error, not a silent skip.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const pages = [
  { file: 'dist/index.html', renderer: 'renderHome', label: 'home' },
  { file: 'dist/lab/index.html', renderer: 'renderLab', label: 'lab' },
];

const server = await import(pathToFileURL('dist-ssr/entry-server.js').href);
const marker = '<div id="root"></div>';

for (const page of pages) {
  if (!existsSync(page.file)) {
    console.error(`✗ ${page.file} is missing — did the ${page.label} client build run?`);
    process.exit(1);
  }

  const html = readFileSync(page.file, 'utf8');
  if (!html.includes(marker)) {
    console.error(`✗ ${page.file} has no empty #root — did the client build run?`);
    process.exit(1);
  }

  const render = server[page.renderer];
  if (typeof render !== 'function') {
    console.error(`✗ dist-ssr entry has no ${page.renderer}()`);
    process.exit(1);
  }

  const app = render();
  writeFileSync(page.file, html.replace(marker, `<div id="root">${app}</div>`));
  console.log(
    `✓ prerendered ${app.length.toLocaleString()} characters into ${page.file}`,
  );
}
