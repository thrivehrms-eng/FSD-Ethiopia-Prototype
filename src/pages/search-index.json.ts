// Static search index for the header search (Fuse.js), built from src/data.
import type { APIRoute } from 'astro';
import news from '../data/news.json';
import featured from '../data/featured.json';
import images from '../data/images.json';

type Entry = { title: string; url: string; type: 'page' | 'news' | 'publication'; summary: string };

export const GET: APIRoute = () => {
  const entries: Entry[] = [
    { title: 'Our work: Financial Inclusion, Access to Capital and Climate Finance', url: '/#our-work', type: 'page', summary: 'Where FSD Ethiopia focuses its programmes.' },
    { title: 'Board Ready Women', url: '/#board-ready', type: 'page', summary: 'Corporate governance training with IFC for women preparing for board seats.' },
    { title: 'Data snapshot', url: '/#data-snapshot', type: 'page', summary: 'Mobile money accounts and account ownership by gender, with sources.' },
    { title: 'Opportunities', url: '/#opportunities', type: 'page', summary: 'Careers and procurement at FSD Ethiopia.' },
    ...featured.map((f) => ({ title: f.title, url: f.url, type: 'news' as const, summary: f.summary })),
    ...news.map((n) => ({ title: n.title, url: n.url, type: 'news' as const, summary: n.excerpt })),
    ...Object.values(images)
      .filter((i) => 'publication' in i && i.publication)
      .map((i) => {
        const pub = (i as { publication: { title: string; pdf: string } }).publication;
        return { title: pub.title, url: pub.pdf, type: 'publication' as const, summary: 'PDF publication from the FSD Ethiopia resource library.' };
      }),
  ];
  return new Response(JSON.stringify(entries), { headers: { 'content-type': 'application/json' } });
};
