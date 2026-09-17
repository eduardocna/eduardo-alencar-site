import type { APIRoute } from 'astro';
import { withBase } from '../data/paths';
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${new URL(withBase('sitemap.xml'),import.meta.env.SITE).href}</loc></sitemap></sitemapindex>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
