import type { Locale } from './site';

export const withBase = (path = '') => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
};

export const localePath = (locale: Locale, path = '') =>
  withBase(`${locale}/${path.replace(/^\//, '')}`);

export const workPath = (locale: Locale, slug: string) =>
  localePath(locale, `work/${slug}/`);

