import catalogJson from './catalog-public.json';

export type CatalogItem = (typeof catalogJson.items)[number];
export const catalog = catalogJson.items as CatalogItem[];
export const publicItems = catalog.filter((item) => item.access !== 'interno');

export const statusLabel = (status: string, lang = 'en') => {
  const labels: Record<string, [string, string]> = {
    publicado: ['Published', 'Publicado'],
    apresentado: ['Presented', 'Apresentado'],
    'em avaliacao': ['Under review', 'Em avaliação'],
    'em preparacao': ['In preparation', 'Em preparação'],
    'operacional interno': ['Internal operational system', 'Sistema operacional interno'],
    'atualizacao necessaria': ['Update in progress', 'Atualização em andamento'],
    'resumo publico a produzir': ['Public summary in preparation', 'Resumo público em preparação']
  };
  return labels[status]?.[lang === 'pt' ? 1 : 0] ?? status;
};
