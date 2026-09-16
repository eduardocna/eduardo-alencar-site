import enRaw from '../content/site-en.md?raw';
import ptRaw from '../content/site-pt.md?raw';
import esRaw from '../content/site-es.md?raw';
import itRaw from '../content/site-it.md?raw';

export const locales = ['en', 'pt', 'es', 'it'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string | undefined): value is Locale => locales.includes(value as Locale);

export const sectionIds = ['home', 'research', 'tools', 'writing', 'teaching', 'cv', 'contact'] as const;

export interface MarkdownSection { title: string; blocks: string[]; }
export interface SiteDocument { title: string; sections: MarkdownSection[]; }

function parse(raw: string): SiteDocument {
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').trim();
  const pages = body.split(/^# /m).filter(Boolean);
  const [first, ...rest] = pages;
  const toSection = (page: string): MarkdownSection => {
    const [title, ...parts] = page.trim().split(/^## /m);
    return { title: title.trim(), blocks: parts.map((part) => part.trim()) };
  };
  return { title: first.split('\n')[0].trim(), sections: [toSection(first), ...rest.map(toSection)] };
}

export const documents: Record<Locale, SiteDocument> = {
  en: parse(enRaw), pt: parse(ptRaw), es: parse(esRaw), it: parse(itRaw)
};

export const copy: Record<Locale, {
  nav: string[]; read: string; tools: string; cv: string; theme: string; source: string;
  metrics: string; timeline: string; explorer: string; close: string; table: string;
}> = {
  en: { nav: ['Home', 'Research', 'Tools & data', 'Writing', 'Teaching', 'CV', 'Contact'], read: 'Read the research', tools: 'See the tools', cv: 'Download CV', theme: 'Light view', source: 'Source and method', metrics: 'Evidence desk', timeline: 'Career timeline', explorer: 'Explore the work', close: 'Close', table: 'View data table' },
  pt: { nav: ['Início', 'Pesquisa', 'Ferramentas e dados', 'Textos', 'Docência', 'Currículo', 'Contato'], read: 'Ler a pesquisa', tools: 'Ver as ferramentas', cv: 'Baixar CV', theme: 'Modo claro', source: 'Fonte e método', metrics: 'Mesa de evidência', timeline: 'Linha do tempo profissional', explorer: 'Explorar o trabalho', close: 'Fechar', table: 'Ver tabela de dados' },
  es: { nav: ['Inicio', 'Investigación', 'Herramientas y datos', 'Textos', 'Docencia', 'CV', 'Contacto'], read: 'Conoce la investigación', tools: 'Ve las herramientas', cv: 'Descarga el CV', theme: 'Vista clara', source: 'Fuente y método', metrics: 'Mesa de evidencia', timeline: 'Trayectoria profesional', explorer: 'Explora el trabajo', close: 'Cerrar', table: 'Ver tabla de datos' },
  it: { nav: ['Home', 'Ricerca', 'Strumenti e dati', 'Scritti', 'Didattica', 'CV', 'Contatti'], read: 'Leggi la ricerca', tools: 'Vedi gli strumenti', cv: 'Scarica il CV', theme: 'Vista chiara', source: 'Fonte e metodo', metrics: 'Tavolo dell’evidenza', timeline: 'Percorso professionale', explorer: 'Esplora il lavoro', close: 'Chiudi', table: 'Vedi tabella dati' }
};

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function inline(value: string) {
  return escape(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
