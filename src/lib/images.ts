import images from '../data/images.json';

type Variant = { w: number; src: string; bytes: number };
export type ImageEntry = {
  status: 'ok' | 'missing';
  group: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  objectPosition: string;
  decorative: boolean;
  graphicWithText: boolean;
  person?: { name: string | null; role: string; team: string; region?: string };
  publication?: { title: string; pdf: string };
  variants: { avif: Variant[]; webp: Variant[] };
};

const all = images as Record<string, ImageEntry>;

export function getImage(id: string): ImageEntry {
  const entry = all[id];
  if (!entry) throw new Error(`Unknown image id "${id}". Add it to assets/manifest.json and run npm run assets:optimise.`);
  return entry;
}

export const hasImage = (id: string) => all[id]?.status === 'ok';

export const srcset = (variants: Variant[]) => variants.map((v) => `${v.src} ${v.w}w`).join(', ');

/** The variant a slot of this CSS width would pick at 1× density, for preload hints. */
export function pick(entry: ImageEntry, format: 'avif' | 'webp', slotWidth: number) {
  const list = entry.variants[format];
  return list.find((v) => v.w >= slotWidth) ?? list.at(-1);
}

/**
 * CLAUDE.md 3.6: never show an image wider than 1.25× its original width.
 * Throws at build time so an oversized slot cannot ship.
 */
export function assertNoUpscale(id: string, entry: ImageEntry, maxSlotWidth: number) {
  if (maxSlotWidth > entry.width * 1.25) {
    throw new Error(`Image "${id}" is ${entry.width}px wide but its slot can reach ${maxSlotWidth}px (limit ${Math.floor(entry.width * 1.25)}px).`);
  }
}
