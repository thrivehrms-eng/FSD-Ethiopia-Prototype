import en from './en.json';
import am from './am.json';

export type Lang = 'en' | 'am';
export const LANGS: Lang[] = ['en', 'am'];

// Amharic entries carry a review flag: { "text": "...", "review": "native-speaker" }.
type AmEntry = { text: string; review: string };
type Tree = { [key: string]: string | AmEntry | Tree };

function lookup(tree: Tree, key: string): string | undefined {
  let node: unknown = tree;
  for (const part of key.split('.')) {
    if (node && typeof node === 'object' && part in (node as Tree)) {
      node = (node as Tree)[part];
    } else {
      return undefined;
    }
  }
  if (typeof node === 'string') return node;
  if (node && typeof node === 'object' && 'text' in node) return (node as AmEntry).text;
  return undefined;
}

function interpolate(text: string, vars?: Record<string, string | number>) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}

/**
 * Interface text for the given language. Amharic covers navigation, buttons,
 * hero text and section headings only; everything else falls back to English.
 */
export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const value = (lang === 'am' ? lookup(am as Tree, key) : undefined) ?? lookup(en as Tree, key);
  if (value === undefined) throw new Error(`Missing i18n key: ${key}`);
  return interpolate(value, vars);
}

/** The language a key actually renders in, for the element's `lang` attribute. */
export function langOf(lang: Lang, key: string): Lang {
  return lang === 'am' && lookup(am as Tree, key) !== undefined ? 'am' : 'en';
}

/** Path to the same page in another language. */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.replace(/^\/am(?=\/|$)/, '') || '/';
  return lang === 'am' ? `/am${clean === '/' ? '/' : clean}` : clean;
}
