// Static search index for the header search (Fuse.js), one per language, built from src/data.
import news from '../data/news.json';
import featured from '../data/featured.json';
import images from '../data/images.json';
import { t, localePath, type Lang } from '../i18n';

type Entry = { title: string; url: string; type: 'page' | 'news' | 'publication'; summary: string };

export function searchIndex(lang: Lang): Entry[] {
  const home = localePath(lang, '/');
  const page = (titleKey: string, summaryKey: string, anchor: string): Entry => ({
    title: t(lang, titleKey),
    summary: t(lang, summaryKey),
    url: `${home}#${anchor}`,
    type: 'page',
  });
  return [
    page('home.focus.title', 'home.hero.work.lead', 'focus'),
    page('home.how.title', 'home.how.intro', 'how'),
    page('home.featured.title', 'home.hero.work.lead', 'featured'),
    page('home.data.title', 'home.data.chartTitle', 'data-snapshot'),
    page('home.boards.title', 'home.boards.body', 'board-ready'),
    page('home.pubs.title', 'home.pubs.library', 'publications'),
    page('home.opps.title', 'home.opps.procurementBody', 'opportunities'),
    ...featured.map((f) => ({ title: f.title, url: f.url, type: 'news' as const, summary: f.summary })),
    ...news.map((n) => ({ title: n.title, url: n.url, type: 'news' as const, summary: n.excerpt })),
    ...Object.values(images)
      .filter((i) => 'publication' in i && i.publication)
      .map((i) => {
        const pub = (i as { publication: { title: string; pdf: string } }).publication;
        return { title: pub.title, url: pub.pdf, type: 'publication' as const, summary: t(lang, 'search.publicationSummary') };
      }),
  ];
}
