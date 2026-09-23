import enRaw from '../content/site-en.md?raw';
import ptRaw from '../content/site-pt.md?raw';
import esRaw from '../content/site-es.md?raw';
import itRaw from '../content/site-it.md?raw';
import { withBase } from './paths';

export const locales = ['en', 'pt', 'es', 'it'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string | undefined): value is Locale => locales.includes(value as Locale);

export const sectionIds = ['home', 'book', 'research', 'briefs', 'tools', 'writing', 'teaching', 'cv', 'contact'] as const;

export interface MarkdownSection { title: string; intro: string[]; blocks: string[]; }
export interface SiteDocument { title: string; sections: MarkdownSection[]; }

function parse(raw: string): SiteDocument {
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').trim();
  const pages = body.split(/^# /m).filter(Boolean).map((page) => page.replace(/\n+---\s*$/, ''));
  const [first, ...rest] = pages;
  const toSection = (page: string): MarkdownSection => {
    const [title, ...parts] = page.trim().split(/^## /m);
    const [heading, ...intro] = title.trim().split('\n').filter(Boolean);
    return { title: heading, intro, blocks: parts.map((part) => part.trim()) };
  };
  return { title: first.split('\n')[0].trim(), sections: [toSection(first), ...rest.map(toSection)] };
}

export const documents: Record<Locale, SiteDocument> = {
  en: parse(enRaw), pt: parse(ptRaw), es: parse(esRaw), it: parse(itRaw)
};

export const copy: Record<Locale, {
  nav: string[]; read: string; tools: string; cv: string; theme: string; source: string;
  metrics: string; timeline: string; explorer: string; close: string; table: string;
  tagline: string; skip: string; dark: string; light: string; location: string;
}> = {
  en: { nav: ['Home', 'Book', 'Research', 'Policy briefs', 'Tools & data', 'Writing', 'Teaching', 'CV', 'Contact'], read: 'Read the research', tools: 'See the tools', cv: 'View CV', theme: 'Light view', source: 'Source and method', metrics: 'Evidence desk', timeline: 'Career timeline', explorer: 'Explore the work', close: 'Close', table: 'View data table', tagline:'Public integrity, measured', skip:'Skip to content', dark:'Dark view', light:'Light view', location:'Brasília, Brazil' },
  pt: { nav: ['Início', 'Livro', 'Pesquisa', 'Policy briefs', 'Ferramentas e dados', 'Textos', 'Docência', 'Currículo', 'Contato'], read: 'Ler a pesquisa', tools: 'Ver as ferramentas', cv: 'Ver currículo', theme: 'Modo claro', source: 'Fonte e método', metrics: 'Mesa de evidência', timeline: 'Linha do tempo profissional', explorer: 'Explorar o trabalho', close: 'Fechar', table: 'Ver tabela de dados', tagline:'Integridade pública, medida', skip:'Pular para o conteúdo', dark:'Modo escuro', light:'Modo claro', location:'Brasília, Brasil' },
  es: { nav: ['Inicio', 'Libro', 'Investigación', 'Policy briefs', 'Herramientas y datos', 'Textos', 'Docencia', 'CV', 'Contacto'], read: 'Conoce la investigación', tools: 'Ver las herramientas', cv: 'Ver CV', theme: 'Vista clara', source: 'Fuente y método', metrics: 'Mesa de evidencia', timeline: 'Trayectoria profesional', explorer: 'Explorar el trabajo', close: 'Cerrar', table: 'Ver tabla de datos', tagline:'Integridad pública, medida', skip:'Saltar al contenido', dark:'Vista oscura', light:'Vista clara', location:'Brasília, Brasil' },
  it: { nav: ['Home', 'Libro', 'Ricerca', 'Policy brief', 'Strumenti e dati', 'Scritti', 'Didattica', 'CV', 'Contatti'], read: 'Leggi la ricerca', tools: 'Vedi gli strumenti', cv: 'Vedi CV', theme: 'Vista chiara', source: 'Fonte e metodo', metrics: 'Tavolo dell’evidenza', timeline: 'Percorso professionale', explorer: 'Esplora il lavoro', close: 'Chiudi', table: 'Vedi tabella dati', tagline:'Integrità pubblica, misurata', skip:'Vai al contenuto', dark:'Vista scura', light:'Vista chiara', location:'Brasília, Brasile' }
};

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function inline(value: string) {
  return escape(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]+)\)/g, (_match, text: string, url: string) => {
      if (url.startsWith('/')) return `<a href="${withBase(url)}">${text}</a>`;
      if (url.startsWith('mailto:')) return `<a href="${url}">${text}</a>`;
      return `<a href="${url}" target="_blank" rel="noreferrer">${text}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
