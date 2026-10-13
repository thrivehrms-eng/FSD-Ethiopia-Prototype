// Turn the downloaded originals in assets-src/ into AVIF and WebP variants in
// public/images/, and write src/data/images.json for the <Img> component.
//
//   npm run assets:optimise
//
// Variants are 400, 800, 1200 and 1600px wide but never wider than the original
// (CLAUDE.md 3.6). Images that have not been downloaded yet are written to
// images.json with status "missing", so pages render the gradient fallback.
import { readFile, writeFile, mkdir, access, stat } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'assets-src');
const OUT = join(ROOT, 'public/images');
const WIDTHS = [400, 800, 1200, 1600];
const FORMATS = {
  avif: (img) => img.avif({ quality: 50, effort: 4 }),
  webp: (img) => img.webp({ quality: 74 }),
};

const exists = (p) => access(p).then(() => true, () => false);
const manifest = JSON.parse(await readFile(join(ROOT, 'assets/manifest.json'), 'utf8'));
await mkdir(OUT, { recursive: true });

// Cohort members collected by fetch-assets.mjs join the manifest here.
const cohortList = join(SRC, 'cohort/cohort.json');
const items = [...manifest.items];
if (await exists(cohortList)) {
  const known = new Set(items.map((i) => basename(new URL(i.url).pathname)));
  for (const m of JSON.parse(await readFile(cohortList, 'utf8'))) {
    if (!m.file) continue;
    const file = basename(m.file);
    const existing = items.find((i) => i.group === 'cohort' && basename(new URL(i.url).pathname) === file);
    if (existing) {
      existing.person = { ...existing.person, name: m.name };
      continue;
    }
    if (known.has(file)) continue;
    const slug = file.replace(/\.[a-z]+$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    items.push({
      id: `cohort-${slug}`,
      group: 'cohort',
      url: m.original,
      uses: ['Board Ready pages only'],
      credit: 'Photo: FSD Ethiopia',
      alt: m.name ? `Portrait of ${m.name}, Board Ready Program cohort member` : 'Portrait of a Board Ready Program cohort member',
      objectPosition: '50% 22%',
      person: { name: m.name, role: 'Board Ready Program cohort member', team: 'Cohort' },
    });
  }
}

const images = {};
const counts = { optimised: 0, upToDate: 0, missing: 0 };
const warnings = [];

for (const item of items) {
  const source = join(SRC, item.group, basename(new URL(item.url).pathname));
  const entry = {
    group: item.group,
    alt: item.alt,
    credit: item.credit,
    objectPosition: item.objectPosition ?? '50% 50%',
    decorative: !!item.decorative,
    graphicWithText: !!item.graphicWithText,
    ...(item.person && { person: item.person }),
    ...(item.publication && { publication: item.publication }),
  };

  if (!(await exists(source))) {
    images[item.id] = { status: 'missing', width: item.width, height: item.height, ...entry, variants: { avif: [], webp: [] } };
    counts.missing++;
    continue;
  }

  const meta = await sharp(source).metadata();
  const width = meta.autoOrient?.width ?? meta.width;
  const height = meta.autoOrient?.height ?? meta.height;
  if (item.width && Math.abs(item.width - width) > 2) {
    warnings.push(`${item.id}: manifest says ${item.width}px wide, file is ${width}px`);
  }

  const widths = WIDTHS.filter((w) => w <= width);
  if (!widths.length || widths.at(-1) < width) widths.push(width);
  const variants = { avif: [], webp: [] };
  const srcTime = (await stat(source)).mtimeMs;
  let wrote = false;

  for (const w of widths) {
    for (const [fmt, encode] of Object.entries(FORMATS)) {
      const name = `${item.id}-${w}.${fmt}`;
      const dest = join(OUT, name);
      const fresh = (await exists(dest)) && (await stat(dest)).mtimeMs >= srcTime;
      if (!fresh) {
        await encode(sharp(source).rotate().resize({ width: w, withoutEnlargement: true })).toFile(dest);
        wrote = true;
      }
      const { size } = await stat(dest);
      variants[fmt].push({ w, src: `/images/${name}`, bytes: size });
    }
  }
  wrote ? counts.optimised++ : counts.upToDate++;
  images[item.id] = { status: 'ok', width, height, ...entry, variants };
}

await writeFile(join(ROOT, 'src/data/images.json'), JSON.stringify(images, null, 2) + '\n');
console.log(
  `images.json: ${Object.keys(images).length} images (${counts.optimised} optimised, ${counts.upToDate} up to date, ${counts.missing} missing originals).`,
);
if (counts.missing) console.log('Missing originals render as the gradient panel with the three-stroke mark. Run npm run assets:fetch first.');
for (const w of warnings) console.warn(`warning: ${w}`);
