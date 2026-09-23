import type { APIRoute } from 'astro';
import { locales } from '../data/site';
import { works } from '../data/catalog';
import { localePath, workPath, withBase } from '../data/paths';
export const GET: APIRoute = () => {
  const origin=import.meta.env.SITE; const pages=['','book/','research/','briefs/','evidence-lab/','publications/','writing/','teaching/','cv/','contact/'];
  const paths=[...locales.flatMap((locale)=>[...pages.map((page)=>localePath(locale,page)),...works.map((item)=>workPath(locale,item.slug))]),withBase('indice-governanca-2026/')];
  const urls=paths.map((path)=>`<url><loc>${new URL(path,origin).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};

