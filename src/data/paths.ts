import type { Locale } from './site';

export const withBase = (path = '') => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
};

export const localePath = (locale: Locale, path = '') =>
  withBase(`${locale}/${path.replace(/^\//, '')}`);


const sectionByCategory = { research: 'research/', policy: 'briefs/', tools: 'evidence-lab/', profile: 'cv/' } as const;

/** Public destination of a catalogue item: its first verified link, or the section page of its category. */
export const workDestination = (locale: Locale, item: { category: keyof typeof sectionByCategory; verifiedLinks: { href: string }[] }) => {
  const link = item.verifiedLinks[0]?.href;
  if (link) return link.startsWith('/') ? withBase(link) : link;
  return localePath(locale, sectionByCategory[item.category]);
};
