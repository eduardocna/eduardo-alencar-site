import type { Locale } from './site';

type LocalizedText = Record<Locale, string>;

export interface LinkedInMetric {
  value: string;
  label: LocalizedText;
}

export const linkedInMetrics: LinkedInMetric[] = [
  {
    value: '4,969',
    label: {
      en: 'LinkedIn connections (exported 29 Sep 2026)',
      pt: 'conexões no LinkedIn (export de 29 set. 2026)',
      es: 'conexiones en LinkedIn (exportación del 29 sep. 2026)',
      it: 'collegamenti su LinkedIn (export del 29 set. 2026)'
    }
  },
  {
    value: '5,096',
    label: {
      en: 'followers (LinkedIn Analytics, 21 Jul 2026)',
      pt: 'seguidores (LinkedIn Analytics, 21 jul. 2026)',
      es: 'seguidores (LinkedIn Analytics, 21 jul. 2026)',
      it: 'follower (LinkedIn Analytics, 21 lug. 2026)'
    }
  },
  {
    value: '50,507',
    label: {
      en: 'impressions (LinkedIn Analytics, 22 Jul 2025–21 Jul 2026)',
      pt: 'impressões (LinkedIn Analytics, 22 jul. 2025–21 jul. 2026)',
      es: 'impresiones (LinkedIn Analytics, 22 jul. 2025–21 jul. 2026)',
      it: 'impression (LinkedIn Analytics, 22 lug. 2025–21 lug. 2026)'
    }
  },
  {
    value: 'LinkedIn',
    label: {
      en: 'selected writing, organised by theme',
      pt: 'textos selecionados, organizados por tema',
      es: 'textos seleccionados, organizados por tema',
      it: 'testi selezionati, organizzati per tema'
    }
  }
];
