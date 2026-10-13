// Image audit for CLAUDE.md 3.6 and 7.5. Serves dist/, then for each page and width:
// - no image scaled past 1.25× its original (width, or height for cropped slots),
// - every <img> has an alt attribute (empty only for decorative images),
// - lists images still showing the gradient fallback (original not fetched),
// - records the homepage transfer size at 1440px against the 1.5 MB budget.
// Usage: npm run build && npm run audit:images [-- /path/ ...]
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const DIST = new URL('../dist/', import.meta.url).pathname;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json' };
const WIDTHS = [390, 768, 1024, 1280, 1440];
const BUDGET = 1.5 * 1024 * 1024;
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];

const server = http.createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join(DIST, path));
    res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(4331, r));
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let problems = 0;

for (const page of pages) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await ctx.addInitScript(() => localStorage.setItem('fsd-consent', JSON.stringify({ version: 1, analytics: false, decidedAt: '2026-01-01' })));
    const p = await ctx.newPage();
    let bytes = 0;
    p.on('response', async (r) => {
      const len = Number(r.headers()['content-length'] ?? 0);
      bytes += len || (await r.body().catch(() => Buffer.alloc(0))).length;
    });
    await p.goto(`http://localhost:4331${page}`, { waitUntil: 'networkidle' });
    const firstLoad = bytes;
    const report = await p.evaluate(() => {
      const upscaled = [];
      for (const el of document.querySelectorAll('[data-image]')) {
        const ow = Number(el.getAttribute('data-original-width'));
        const oh = Number(el.getAttribute('data-original-height'));
        const { width: w, height: h } = el.getBoundingClientRect();
        const visible = el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
        // object-fit: cover scales by the larger ratio; contained images only by width.
        const cover = el.getAttribute('data-fit') !== 'contain';
        const scale = Math.max(w / ow, cover && oh ? h / oh : 0);
        if (visible && ow && w > 0 && scale > 1.25 + 0.005) upscaled.push(`${el.getAttribute('data-image')}: slot ${Math.round(w)}×${Math.round(h)}px, original ${ow}×${oh}px, scale ${scale.toFixed(2)}×`);
      }
      const noAlt = [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.currentSrc || i.src);
      const missing = [...new Set([...document.querySelectorAll('[data-image-missing]')].map((e) => e.getAttribute('data-image')))];
      return { upscaled, noAlt, missing };
    });
    const line = [`${page} @${width}px`, `upscaled: ${report.upscaled.length}`, `no alt: ${report.noAlt.length}`, `fallback panels: ${report.missing.length}`];
    if (width === 1440) line.push(`first load ${(firstLoad / 1024).toFixed(0)} KB of ${(BUDGET / 1024).toFixed(0)} KB budget`);
    console.log(line.join(' | '));
    for (const u of report.upscaled) console.log(`  upscaled: ${u}`);
    for (const n of report.noAlt) console.log(`  no alt: ${n}`);
    if (width === 1440 && report.missing.length) console.log(`  originals not fetched yet: ${report.missing.join(', ')}`);
    problems += report.upscaled.length + report.noAlt.length + (width === 1440 && firstLoad > BUDGET ? 1 : 0);
    await ctx.close();
  }
}
await browser.close();
server.close();
process.exit(problems ? 1 : 0);
