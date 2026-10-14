// Download every image in assets/manifest.json into assets-src/<group>/, then
// collect the Board Ready cohort portraits from the cohort page (CLAUDE.md 6.4).
//
//   npm run assets:fetch            # skip files that already exist
//   npm run assets:fetch -- --force # download again
//
// Behind a proxy, run with NODE_USE_ENV_PROXY=1 so Node's fetch uses HTTPS_PROXY.
import { readFile, writeFile, mkdir, access, stat } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'assets-src');
const force = process.argv.includes('--force');
const manifest = JSON.parse(await readFile(join(ROOT, 'assets/manifest.json'), 'utf8'));

const results = { ok: [], skipped: [], failed: [] };

const exists = (p) => access(p).then(() => true, () => false);

async function download(url, dest, { retries = 2 } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'FSD-Ethiopia-prototype asset fetch (Digital Tailor Agency)' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get('content-type') ?? '';
      if (!/^image\//.test(type)) throw new Error(`not an image (${type || 'no content-type'})`);
      const body = Buffer.from(await res.arrayBuffer());
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, body);
      return body.length;
    } catch (err) {
      const reason = err.cause?.code ?? err.cause?.message ?? err.message;
      if (attempt >= retries || /^HTTP 4/.test(err.message)) throw new Error(reason);
      await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
    }
  }
}

async function fetchItem(item) {
  const dest = join(SRC, item.group, basename(new URL(item.url).pathname));
  if (!force && (await exists(dest))) {
    results.skipped.push(item.id);
    return dest;
  }
  try {
    const bytes = await download(item.url, dest);
    results.ok.push({ id: item.id, bytes });
    return dest;
  } catch (err) {
    results.failed.push({ id: item.id, url: item.url, reason: err.message });
    return null;
  }
}

async function pool(items, size, fn) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (queue.length) await fn(queue.shift());
    }),
  );
}

// Cohort: names and portraits only. Emails and bios on the page are never stored.
async function collectCohort(collection) {
  const out = join(SRC, collection.group, 'cohort.json');
  let html;
  try {
    const res = await fetch(collection.page, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
  } catch (err) {
    results.failed.push({ id: `collection:${collection.id}`, url: collection.page, reason: err.cause?.code ?? err.message });
    return;
  }

  const members = [];
  const imgRe = /<img\b[^>]*?\bsrc="([^"]+?wp-content\/uploads\/[^"]+?)"[^>]*>/gi;
  for (const match of html.matchAll(imgRe)) {
    const tag = match[0];
    const src = match[1];
    if (!src.includes(collection.suffix)) continue;
    // Name: the next heading after the image, falling back to its alt text.
    const after = html.slice(match.index + tag.length, match.index + tag.length + 2000);
    const heading = after.match(/<h[2-6][^>]*>([\s\S]*?)<\/h[2-6]>/i);
    const alt = tag.match(/\balt="([^"]*)"/i)?.[1];
    const clean = (s) => s?.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#8217;/g, '’').replace(/\s+/g, ' ').trim();
    const name = clean(heading?.[1]) || clean(alt) || null;
    const original = src.replace(collection.suffix, '');
    members.push({ name, original, fallback: src });
  }

  const seen = new Set();
  const unique = members.filter((m) => !seen.has(m.original) && seen.add(m.original));
  for (const m of unique) {
    const file = join(SRC, collection.group, basename(new URL(m.original).pathname));
    if (!force && (await exists(file))) {
      m.file = file;
      continue;
    }
    try {
      await download(m.original, file, { retries: 1 });
      m.file = file;
    } catch {
      try {
        const fb = join(SRC, collection.group, basename(new URL(m.fallback).pathname));
        await download(m.fallback, fb, { retries: 1 });
        m.file = fb;
        m.usedFallback = true;
      } catch (err) {
        results.failed.push({ id: `cohort:${m.name ?? m.original}`, url: m.original, reason: err.message });
      }
    }
  }
  await writeFile(out, JSON.stringify(unique.map(({ name, original, file, usedFallback }) => ({ name, original, file: file && file.replace(ROOT + '/', ''), usedFallback: !!usedFallback })), null, 2));
  console.log(`Cohort: ${unique.length} members found (expected ${collection.expected}), list in ${out.replace(ROOT + '/', '')}`);
  if (unique.length !== collection.expected) {
    results.failed.push({ id: 'collection:cohort-count', url: collection.page, reason: `found ${unique.length}, expected ${collection.expected}` });
  }
}

await pool(manifest.items, 4, fetchItem);
for (const c of manifest.collections ?? []) await collectCohort(c);

const report = { ranAt: new Date().toISOString(), ...results };
await writeFile(join(SRC, 'fetch-report.json'), JSON.stringify(report, null, 2));

console.log(`\nDownloaded ${results.ok.length}, skipped ${results.skipped.length} (already present), failed ${results.failed.length}.`);
if (results.failed.length) {
  const byReason = Object.groupBy(results.failed, (f) => f.reason);
  console.log('\nFailures by reason:');
  for (const [reason, list] of Object.entries(byReason)) {
    console.log(`  ${reason}: ${list.length}`);
    for (const f of list.slice(0, 5)) console.log(`    - ${f.id}  ${f.url}`);
    if (list.length > 5) console.log(`    … and ${list.length - 5} more (see assets-src/fetch-report.json)`);
  }
  process.exitCode = 1;
}
