// Serve dist/, then capture full-page screenshots and check for horizontal scroll.
// Usage: npm run build && npm run screenshots [-- /path/ ...]
// Uses the Playwright install given by PLAYWRIGHT_MODULE, or the project's own.
import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE ?? 'playwright');

const DIST = new URL('../dist/', import.meta.url).pathname;
const OUT = new URL('../screenshots/', import.meta.url).pathname;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json' };
const SHOTS = [1440, 390];
const CHECK = [390, 768, 1280, 1440];
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/am/'];

const server = http.createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join(DIST, path));
    res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
});
await new Promise((r) => server.listen(4329, r));
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let failed = false;
for (const page of pages) {
  const slug = page === '/' ? 'home' : page.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  for (const width of CHECK) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    // Record a choice so the banner does not cover full-page shots; it gets its own shot below.
    await ctx.addInitScript(() => localStorage.setItem('fsd-consent', JSON.stringify({ version: 1, analytics: false, decidedAt: '2026-01-01' })));
    const p = await ctx.newPage();
    const errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await p.goto(`http://localhost:4329${page}`, { waitUntil: 'networkidle' });
    // Scroll through so lazy content (the chart) renders before capture.
    await p.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await p.waitForTimeout(400);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`${page} @${width}px: horizontal overflow ${overflow}px${errors.length ? `, errors: ${errors.join(' | ')}` : ''}`);
    if (overflow > 0 || errors.length) failed = true;
    if (SHOTS.includes(width)) {
      await p.screenshot({ path: `${OUT}${slug}-${width}.png`, fullPage: true });
    }
    await ctx.close();

    if (SHOTS.includes(width)) {
      const fresh = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const fp = await fresh.newPage();
      await fp.goto(`http://localhost:4329${page}`, { waitUntil: 'networkidle' });
      await fp.waitForTimeout(300);
      await fp.screenshot({ path: `${OUT}${slug}-${width}-consent.png` });
      await fresh.close();
    }
  }
}
await browser.close();
server.close();
process.exit(failed ? 1 : 0);
