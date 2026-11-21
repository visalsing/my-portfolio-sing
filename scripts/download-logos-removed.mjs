#!/usr/bin/env node
// scripts/download-logos.mjs
//
// Downloads every tech logo into  src/assets/logotech/<slug>.<ext>
//
//   node scripts/download-logos.mjs            # download only the missing ones
//   node scripts/download-logos.mjs --force    # re-download everything
//
// Needs Node 18+ (built-in fetch). No npm packages.
// Logos that no CDN has are listed at the end → save them by hand in the same folder
// (file name = the slug printed in the list, e.g. navicat.svg, google-workspace.svg).

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../src/assets/logotech');
const DATA_FILE = path.resolve(__dirname, '../src/data/techIconSources.js');
const FORCE = process.argv.includes('--force');
const UA = 'Mozilla/5.0 (portfolio logo downloader)';
const CONCURRENCY = 6;

// Import the ESM data file even if package.json has no "type": "module"
const code = await readFile(DATA_FILE, 'utf8');
const { TECH_ICON_SOURCES, techSlug } = await import(
  'data:text/javascript;base64,' + Buffer.from(code).toString('base64')
);

await mkdir(OUT_DIR, { recursive: true });
const existing = new Set((await readdir(OUT_DIR)).map((f) => path.parse(f).name));

const EXT_BY_TYPE = {
  'image/svg+xml': 'svg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
};

async function fromSource(src) {
  // inline data-URI icons (SQL, REST API, EmailJS) → write as .svg
  if (src.startsWith('data:image/svg+xml')) {
    const svg = decodeURIComponent(src.slice(src.indexOf(',') + 1));
    return { ext: 'svg', data: Buffer.from(svg) };
  }

  const res = await fetch(src, {
    headers: { 'User-Agent': UA },
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const type = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  const data = Buffer.from(await res.arrayBuffer());
  if (!data.length) throw new Error('empty file');

  let ext = EXT_BY_TYPE[type];
  if (!ext) {
    const urlExt = path.extname(new URL(src).pathname).slice(1).toLowerCase();
    ext = ['svg', 'png', 'webp', 'jpg', 'jpeg'].includes(urlExt) ? urlExt : null;
  }
  if (!ext) throw new Error(`not an image (${type || 'unknown type'})`);
  if (ext === 'svg' && !data.toString('utf8', 0, 2000).includes('<svg')) throw new Error('not a valid SVG');

  return { ext, data };
}

async function download(name, sources) {
  const slug = techSlug(name);
  if (!FORCE && existing.has(slug)) return { name, slug, status: 'skipped' };

  for (const src of sources) {
    try {
      const { ext, data } = await fromSource(src);
      const file = `${slug}.${ext}`;
      await writeFile(path.join(OUT_DIR, file), data);
      return { name, slug, status: 'ok', file };
    } catch {
      /* try the next source */
    }
  }
  return { name, slug, status: 'missing' };
}

// small worker pool
const queue = Object.entries(TECH_ICON_SOURCES);
const results = [];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const [name, sources] = queue.shift();
      const r = await download(name, sources);
      results.push(r);
      const mark = { ok: '✔', skipped: '·', missing: '✘' }[r.status];
      console.log(`${mark} ${name.padEnd(18)} ${r.file ?? r.status}`);
    }
  }),
);

const ok = results.filter((r) => r.status === 'ok').length;
const skipped = results.filter((r) => r.status === 'skipped').length;
const missing = results.filter((r) => r.status === 'missing');

console.log(`\nDone: ${ok} downloaded, ${skipped} already there, ${missing.length} missing.`);
if (missing.length) {
  console.log('\nSave these by hand into src/assets/logotech/ (svg, png or webp):');
  for (const m of missing) console.log(`  - ${m.slug}.svg   (${m.name})`);
}