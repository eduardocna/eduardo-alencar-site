import type { APIRoute } from 'astro';
import { works } from '../data/catalog';
import { workPath, localePath } from '../data/paths';
const esc = (value:string) => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export const GET: APIRoute = () => {
  const origin = import.meta.env.SITE;
  const entries = works.map((item) => {
    const link = new URL(workPath('en',item.slug),origin).href;
    return `<item><title>${esc(item.title)}</title><link>${link}</link><guid>${link}</guid><description>${esc(item.localizedSummary.en)}</description><pubDate>${new Date(`${item.last_checked}T12:00:00Z`).toUTCString()}</pubDate></item>`;
  }).join('');
  const home = new URL(localePath('en'),origin).href;
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Eduardo Alencar — Evidence notebook</title><link>${home}</link><description>Research, tools and public evidence.</description>${entries}</channel></rss>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
