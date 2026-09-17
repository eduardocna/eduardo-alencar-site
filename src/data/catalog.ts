import catalogJson from './catalog-public.json';
import type { Locale } from './site';

export type LocalizedText = Record<Locale, string>;
export type WorkKind = 'article' | 'brief' | 'working-paper' | 'thesis' | 'presentation' | 'tool' | 'system' | 'profile' | 'teaching';
export type WorkStatus = 'published' | 'presented' | 'under-review' | 'in-preparation' | 'internal' | 'updating' | 'summary-pending';
export type WorkCategory = 'research' | 'policy' | 'tools' | 'profile';
const l = (en: string, pt: string, es: string, it: string): LocalizedText => ({ en, pt, es, it });

export interface VerifiedLink {
  kind: 'doi' | 'repository' | 'app' | 'report' | 'download';
  href: string;
  label: LocalizedText;
}
interface WorkEditorial {
  kind: WorkKind;
  status: WorkStatus;
  category: WorkCategory;
  summary: LocalizedText;
  methods: LocalizedText;
  links?: VerifiedLink[];
}

const editorial: Record<string, WorkEditorial> = {
  'synthetic-control-lava-jato': {
    kind: 'article', status: 'published', category: 'research',
    summary: l('Uses the Synthetic Control Method to examine associations between Operation Lava Jato and Brazil’s Worldwide Governance Indicators.', 'Aplica o Método de Controle Sintético para examinar associações entre a Operação Lava Jato e os Indicadores Mundiais de Governança do Brasil.', 'Aplica el Método de Control Sintético para examinar asociaciones entre la Operación Lava Jato y los Indicadores Mundiales de Gobernanza de Brasil.', 'Applica il metodo del controllo sintetico per esaminare le associazioni tra l’operazione Lava Jato e gli indicatori mondiali di governance del Brasile.'),
    methods: l('Synthetic Control Method', 'Método de Controle Sintético', 'Método de Control Sintético', 'Metodo del controllo sintetico'),
    links: [{ kind: 'doi', href: 'https://doi.org/10.1177/2631309X211017874', label: l('Open DOI', 'Abrir DOI', 'Abrir DOI', 'Apri DOI') }]
  },
  'white-collar-times-oversight': {
    kind: 'article', status: 'published', category: 'policy',
    summary: l('An essay on anti-corruption oversight organized around measurable consequences rather than activity counts.', 'Ensaio sobre fiscalização anticorrupção orientada por consequências mensuráveis, não por contagem de atividades.', 'Ensayo sobre control anticorrupción orientado por consecuencias mensurables, no por recuentos de actividad.', 'Saggio sul controllo anticorruzione orientato a conseguenze misurabili, non al conteggio delle attività.'),
    methods: l('Oversight analytics', 'Analítica de fiscalização', 'Analítica de control', 'Analisi del controllo')
  },
  'formal-replies-substantive-evasion': {
    kind: 'working-paper', status: 'under-review', category: 'research',
    summary: l('Examines 13,042 parliamentary request–reply pairs to distinguish formal delivery from substantive executive engagement.', 'Examina 13.042 pares de requerimento e resposta para distinguir entrega formal de resposta substantiva do Executivo.', 'Examina 13.042 pares de solicitud y respuesta para distinguir la entrega formal del compromiso sustantivo del Ejecutivo.', 'Esamina 13.042 coppie richiesta-risposta per distinguere la consegna formale dall’impegno sostanziale dell’esecutivo.'),
    methods: l('Text-as-data and response analysis', 'Text-as-data e análise de resposta', 'Text-as-data y análisis de respuesta', 'Text-as-data e analisi delle risposte')
  },
  'evasion-as-a-signal': {
    kind: 'working-paper', status: 'in-preparation', category: 'research',
    summary: l('A working-paper proposal treating substantive evasion as a diagnostic signal of institutional risk.', 'Proposta de working paper que trata a evasão substantiva como sinal diagnóstico de risco institucional.', 'Propuesta de working paper que trata la evasión sustantiva como señal diagnóstica de riesgo institucional.', 'Proposta di working paper che considera l’evasione sostanziale un segnale diagnostico di rischio istituzionale.'),
    methods: l('Text-as-data and institutional analysis', 'Text-as-data e análise institucional', 'Text-as-data y análisis institucional', 'Text-as-data e analisi istituzionale')
  },
  'phd-procurement-fraud': {
    kind: 'thesis', status: 'published', category: 'research',
    summary: l('Assesses the potential to identify procurement-risk patterns in Brazilian public procurement using latent class analysis.', 'Avalia o potencial de identificar padrões de risco em compras públicas brasileiras por análise de classes latentes.', 'Evalúa el potencial de identificar patrones de riesgo en la contratación pública brasileña mediante análisis de clases latentes.', 'Valuta il potenziale di identificare schemi di rischio negli appalti pubblici brasiliani mediante analisi delle classi latenti.'),
    methods: l('Latent class analysis', 'Análise de classes latentes', 'Análisis de clases latentes', 'Analisi delle classi latenti'),
    links: [{ kind: 'repository', href: 'https://escholarship.org/uc/item/0b2363z1', label: l('Institutional repository', 'Repositório institucional', 'Repositorio institucional', 'Repository istituzionale') }]
  },
  'masters-corruption-trust': {
    kind: 'thesis', status: 'published', category: 'research',
    summary: l('Models the relationships among corruption, institutional trust and Operation Lava Jato in Brazil and Mexico.', 'Modela as relações entre corrupção, confiança institucional e a Operação Lava Jato no Brasil e no México.', 'Modela las relaciones entre corrupción, confianza institucional y la Operación Lava Jato en Brasil y México.', 'Modella le relazioni tra corruzione, fiducia istituzionale e operazione Lava Jato in Brasile e Messico.'),
    methods: l('Structural equation modelling', 'Modelagem de equações estruturais', 'Modelado de ecuaciones estructurales', 'Modellazione di equazioni strutturali')
  },
  'lava-jato-corruption-trust-policy-brief': {
    kind: 'brief', status: 'published', category: 'policy',
    summary: l('A policy brief on the effects of Lava Jato on corruption and institutional trust.', 'Policy brief sobre os efeitos da Lava Jato na corrupção e na confiança institucional.', 'Policy brief sobre los efectos de Lava Jato en la corrupción y la confianza institucional.', 'Policy brief sugli effetti di Lava Jato sulla corruzione e sulla fiducia istituzionale.'),
    methods: l('Structural modelling', 'Modelagem estrutural', 'Modelado estructural', 'Modellazione strutturale')
  },
  'anti-corruption-sdg4-asc2025': {
    kind: 'presentation', status: 'presented', category: 'research',
    summary: l('Conference research on anti-corruption reforms and education outcomes in Brazil, Kenya and Rwanda.', 'Pesquisa apresentada em congresso sobre reformas anticorrupção e resultados educacionais no Brasil, Quênia e Ruanda.', 'Investigación presentada en congreso sobre reformas anticorrupción y resultados educativos en Brasil, Kenia y Ruanda.', 'Ricerca presentata a un congresso sulle riforme anticorruzione e i risultati educativi in Brasile, Kenya e Ruanda.'),
    methods: l('Causal inference', 'Inferência causal', 'Inferencia causal', 'Inferenza causale')
  },
  'radar-aberto-integridade': {
    kind: 'tool', status: 'published', category: 'tools',
    summary: l('A public-procurement risk dashboard covering 30,304 federal contracts and 32 automated tests, designed for prioritisation with human verification.', 'Painel de risco em compras públicas que cobre 30.304 contratações federais e 32 testes automatizados, desenhado para priorização com verificação humana.', 'Panel de riesgo en contratación pública que cubre 30.304 contratos federales y 32 pruebas automatizadas, diseñado para priorización con verificación humana.', 'Dashboard di rischio negli appalti pubblici che copre 30.304 contratti federali e 32 test automatizzati, progettato per la prioritizzazione con verifica umana.'),
    methods: l('Red flags and risk analysis', 'Red flags e análise de risco', 'Banderas rojas y análisis de riesgo', 'Red flag e analisi del rischio'),
    links: [
      { kind: 'app', href: 'https://radar-aberto-integridade.streamlit.app/', label: l('Open application', 'Abrir aplicação', 'Abrir aplicación', 'Apri applicazione') },
      { kind: 'repository', href: 'https://github.com/eduardocna/radar-aberto-integridade', label: l('Code and documentation', 'Código e documentação', 'Código y documentación', 'Codice e documentazione') }
    ]
  },
  'indice-governanca-2026': {
    kind: 'tool', status: 'published', category: 'tools',
    summary: l('A comparison of 13 official government-plan documents focused on monitorability, accountability and implementation capacity.', 'Comparação de 13 documentos oficiais de programas de governo, com foco em monitorabilidade, responsabilização e capacidade de implementação.', 'Comparación de 13 documentos oficiales de programas de gobierno centrada en monitoreo, rendición de cuentas y capacidad de implementación.', 'Confronto tra 13 documenti ufficiali di programma di governo incentrato su monitoraggio, responsabilità e capacità di attuazione.'),
    methods: l('Document analysis and governance rubric', 'Análise documental e rubrica de governança', 'Análisis documental y rúbrica de gobernanza', 'Analisi documentale e rubrica di governance'),
    links: [
      { kind: 'app', href: 'https://indicegovernanca2026.base44.app', label: l('Open application', 'Abrir aplicação', 'Abrir aplicación', 'Apri applicazione') },
      { kind: 'report', href: 'https://drive.google.com/file/d/149Q8440qbRi2VDdT1EoLm106_Cf7bzFW/view?usp=sharing', label: l('Read report', 'Ler relatório', 'Leer informe', 'Leggi rapporto') }
    ]
  },
  'ai-parliamentary-oversight-audit': {
    kind: 'system', status: 'internal', category: 'tools',
    summary: l('A human-reviewed pipeline assessing completeness, objectivity, timeliness, evidence and irregularity signals in executive replies.', 'Pipeline com revisão humana que avalia completude, objetividade, tempestividade, evidência e sinais de irregularidade em respostas do Executivo.', 'Pipeline con revisión humana que evalúa completitud, objetividad, oportunidad, evidencia y señales de irregularidad en respuestas del Ejecutivo.', 'Pipeline con revisione umana che valuta completezza, obiettività, tempestività, evidenza e segnali di irregolarità nelle risposte dell’esecutivo.'),
    methods: l('Human-validated language models and text-as-data', 'Modelos de linguagem com validação humana e text-as-data', 'Modelos lingüísticos con validación humana y text-as-data', 'Modelli linguistici con validazione umana e text-as-data')
  },
  'cv-eduardo-alencar': {
    kind: 'profile', status: 'published', category: 'profile',
    summary: l('Academic and professional record covering public service, research, teaching, awards and professional service.', 'Trajetória acadêmica e profissional cobrindo serviço público, pesquisa, docência, prêmios e serviço profissional.', 'Trayectoria académica y profesional que abarca servicio público, investigación, docencia, premios y servicio profesional.', 'Percorso accademico e professionale che comprende servizio pubblico, ricerca, didattica, premi e servizio professionale.'),
    methods: l('Verified curriculum record', 'Currículo verificável', 'Currículum verificable', 'Curriculum verificabile'),
    links: [
      { kind: 'download', href: '/downloads/cv-eduardo-alencar-en.pdf', label: l('Download CV (English, PDF)', 'Baixar CV (inglês, PDF)', 'Descargar CV (inglés, PDF)', 'Scarica CV (inglese, PDF)') },
      { kind: 'download', href: '/downloads/cv-eduardo-alencar-pt.pdf', label: l('Download CV (Portuguese, PDF)', 'Baixar CV (português, PDF)', 'Descargar CV (portugués, PDF)', 'Scarica CV (portoghese, PDF)') }
    ]
  },
  'uci-teaching-evidence': {
    kind: 'teaching', status: 'summary-pending', category: 'profile',
    summary: l('An aggregate, privacy-reviewed account of UC Irvine student feedback on clarity, accessibility and quantitative learning support.', 'Síntese agregada e revisada quanto à privacidade das avaliações discentes da UC Irvine sobre clareza, disponibilidade e apoio à aprendizagem quantitativa.', 'Síntesis agregada y revisada en materia de privacidad de evaluaciones estudiantiles de UC Irvine sobre claridad, accesibilidad y apoyo al aprendizaje cuantitativo.', 'Sintesi aggregata e sottoposta a revisione della privacy delle valutazioni degli studenti UC Irvine su chiarezza, disponibilità e supporto all’apprendimento quantitativo.'),
    methods: l('Aggregated teaching evidence', 'Evidência docente agregada', 'Evidencia docente agregada', 'Evidenza didattica aggregata')
  },
  'supremo-autojulgamento-pet16662': {
    kind: 'brief', status: 'published', category: 'policy',
    summary: l('An institutional analysis of the Brazilian Supreme Court’s extraordinary session of 15 September 2026 concerning Petition 16,662.', 'Análise institucional da sessão extraordinária do STF de 15 de setembro de 2026 sobre a PET 16.662.', 'Análisis institucional de la sesión extraordinaria del Supremo Tribunal Federal de Brasil del 15 de septiembre de 2026 sobre la Petición 16.662.', 'Analisi istituzionale della sessione straordinaria della Corte Suprema Federale brasiliana del 15 settembre 2026 sulla Petizione 16.662.'),
    methods: l('Institutional and transcript analysis', 'Análise institucional e de transcrição', 'Análisis institucional y de transcripción', 'Analisi istituzionale e della trascrizione'),
    links: [{ kind: 'download', href: '/downloads/o-supremo-julga-um-dos-seus-2026.pdf', label: l('Download policy brief (PDF, Portuguese)', 'Baixar policy brief (PDF)', 'Descargar policy brief (PDF, portugués)', 'Scarica policy brief (PDF, portoghese)') }]
  }
};

export const kindLabels: Record<WorkKind, LocalizedText> = {
  article: l('Article', 'Artigo', 'Artículo', 'Articolo'), brief: l('Policy brief', 'Policy brief', 'Policy brief', 'Policy brief'),
  'working-paper': l('Working paper', 'Working paper', 'Working paper', 'Working paper'), thesis: l('Thesis or dissertation', 'Tese ou dissertação', 'Tesis', 'Tesi'),
  presentation: l('Conference presentation', 'Apresentação em congresso', 'Presentación en congreso', 'Presentazione a congresso'), tool: l('Tool and data', 'Ferramenta e dados', 'Herramienta y datos', 'Strumento e dati'),
  system: l('Applied system', 'Sistema aplicado', 'Sistema aplicado', 'Sistema applicato'), profile: l('Professional profile', 'Perfil profissional', 'Perfil profesional', 'Profilo professionale'),
  teaching: l('Teaching evidence', 'Evidência docente', 'Evidencia docente', 'Evidenza didattica')
};
export const statusLabels: Record<WorkStatus, LocalizedText> = {
  published: l('Published', 'Publicado', 'Publicado', 'Pubblicato'), presented: l('Presented', 'Apresentado', 'Presentado', 'Presentato'),
  'under-review': l('Under review', 'Em avaliação', 'En evaluación', 'In valutazione'), 'in-preparation': l('In preparation', 'Em preparação', 'En preparación', 'In preparazione'),
  internal: l('Internal operational system', 'Sistema operacional interno', 'Sistema operativo interno', 'Sistema operativo interno'), updating: l('Update in progress', 'Atualização em andamento', 'Actualización en curso', 'Aggiornamento in corso'),
  'summary-pending': l('Public summary in preparation', 'Resumo público em preparação', 'Resumen público en preparación', 'Sintesi pubblica in preparazione')
};
export const categoryLabels: Record<WorkCategory | 'all', LocalizedText> = {
  all: l('All work', 'Todos os trabalhos', 'Todos los trabajos', 'Tutti i lavori'), research: l('Research', 'Pesquisa', 'Investigación', 'Ricerca'),
  policy: l('Policy', 'Políticas públicas', 'Política pública', 'Politiche pubbliche'), tools: l('Tools & data', 'Ferramentas e dados', 'Herramientas y datos', 'Strumenti e dati'),
  profile: l('Profile & teaching', 'Perfil e docência', 'Perfil y docencia', 'Profilo e didattica')
};

type RawItem = (typeof catalogJson.items)[number];
export type WorkItem = RawItem & {
  kind: WorkKind;
  statusCode: WorkStatus;
  category: WorkCategory;
  localizedSummary: LocalizedText;
  localizedMethods: LocalizedText;
  verifiedLinks: VerifiedLink[];
};
export const works: WorkItem[] = catalogJson.items.filter((item) => item.access !== 'interno').map((item) => {
  const copy = editorial[item.slug];
  if (!copy) throw new Error(`Missing localized catalogue copy for ${item.slug}`);
  return { ...item, kind: copy.kind, statusCode: copy.status, category: copy.category, localizedSummary: copy.summary, localizedMethods: copy.methods, verifiedLinks: copy.links ?? [] };
});
export const publicItems = works;
export const workBySlug = (slug: string) => works.find((item) => item.slug === slug);
export const typeLabel = (item: WorkItem, lang: Locale) => kindLabels[item.kind][lang];
export const statusLabel = (item: WorkItem, lang: Locale) => statusLabels[item.statusCode][lang];
