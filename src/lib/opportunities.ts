import opportunities from '../data/opportunities.json';

export type Opportunity = { id: string; title: string; shortTitle: string; kind: string; deadline: string; url: string };

/** Deadlines close at the end of the day in Addis Ababa (UTC+3). Worked out at build time. */
const closesAt = (o: Opportunity) => new Date(`${o.deadline}T23:59:59+03:00`);
const now = new Date();

export const isOpen = (o: Opportunity) => closesAt(o) >= now;
const byDeadline = (a: Opportunity, b: Opportunity) => closesAt(a).getTime() - closesAt(b).getTime();

export const openProcurement = (opportunities.procurement as Opportunity[]).filter(isOpen).sort(byDeadline);
export const openCareers = (opportunities.careers as Opportunity[]).filter(isOpen).sort(byDeadline);
export const nextOpen = [...openProcurement, ...openCareers].sort(byDeadline)[0] ?? null;

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Addis_Ababa' }).format(new Date(`${iso}T12:00:00+03:00`));

export { opportunities };
