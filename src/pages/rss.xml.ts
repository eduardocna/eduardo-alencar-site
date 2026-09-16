import type { APIRoute } from 'astro';
import { publicItems } from '../data/catalog';
export const GET: APIRoute = () => {
  const entries = publicItems.map((item) => `<item><title><![CDATA[${item.title}]]></title><link>https://eduardocnalencar.com/publications/${item.slug}/</link><guid>https://eduardocnalencar.com/publications/${item.slug}/</guid><description><![CDATA[${item.summary}]]></description><pubDate>${new Date(`${item.last_checked}T12:00:00Z`).toUTCString()}</pubDate></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Eduardo Alencar — Evidence notebook</title><link>https://eduardocnalencar.com/en/</link><description>Research, tools and public evidence.</description>${entries}</channel></rss>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
