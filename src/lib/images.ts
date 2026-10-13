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
 * With object-fit: cover a slot taller than the image's own ratio scales it up
 * vertically too, so the check uses the slot's aspect ratio when given.
 * Throws at build time so an oversized slot cannot ship.
 */
export function assertNoUpscale(id: string, entry: ImageEntry, maxSlotWidth: number, slotAspect?: number) {
  const byWidth = maxSlotWidth / entry.width;
  const byHeight = slotAspect ? maxSlotWidth / slotAspect / entry.height : 0;
  const scale = Math.max(byWidth, byHeight);
  if (scale > 1.25) {
    throw new Error(
      `Image "${id}" (${entry.width}×${entry.height}) would be scaled ${scale.toFixed(2)}× in a slot up to ${maxSlotWidth}px wide` +
        (slotAspect ? ` at aspect ${slotAspect.toFixed(3)}` : '') +
        ' (limit 1.25×).',
    );
  }
}
