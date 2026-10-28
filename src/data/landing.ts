import type { Locale } from './site';

// Home enxuta (27/10/2026): título definido por Eduardo; números com contexto
// conferido no catálogo (13.042 pares RIC-resposta 2019-2024; 30.304 compras no
// Radar Aberto; 13 planos de governo do TSE). Fonte de fatos: CV detailed6 e catalog-public.json.

export interface Tile { figure: string; title: string; text: string; cta: string; href: string; external?: boolean; svg: 'oversight' | 'procurement' | 'plans'; }
export interface Landing {
  heroTitle: string; heroText: string; ctaNewsletter: string; ctaBook: string;
  tilesEyebrow: string; tilesTitle: string; tilesText: string; tiles: Tile[]; photoCredit: string;
  storyLede: string;
  bookEyebrow: string; bookTitle: string; bookText: string; bookBuy: string; bookMore: string; bookPhotoAlt: string;
  nlEyebrow: string; nlTitle: string; nlText: string; nlAlt: string; nlFrame: string;
  feedEyebrow: string; feedTitle: string; feedText: string; follow: string; channels: Record<string, string>;
}

const radar = 'https://radar-aberto-integridade.streamlit.app/';
const planos = 'https://planosgov2026.online/';
export const bookUrl = 'https://www.editorajuspodivm.com.br/governanca-em-tempo-real-como-o-brasil-pode-parar-de-fingir-que-governa-2027-alencar';
export const substackEmbed = 'https://eduardocnalencar.substack.com/embed';
export const substackUrl = 'https://eduardocnalencar.substack.com/subscribe';
export const linkedinNewsletter = 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7347441938133848064';
export const profiles = [
  { canal: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/eduardocna' },
  { canal: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@eduardocnalencar' },
  { canal: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/eduardocna/' },
  { canal: 'x', label: 'X', href: 'https://x.com/eduardo_cna' },
];

export const landing: Record<Locale, Landing> = {
  pt: {
    heroTitle: 'Ajudo instituições a descobrir se o que elas fazem funciona.',
    heroText: 'Servidor público há mais de 20 anos e doutor pela Universidade da Califórnia, uso dados e inteligência artificial para mostrar onde o governo erra, a tempo de corrigir.',
    ctaNewsletter: 'Assine a newsletter', ctaBook: 'Conheça o livro',
    tilesEyebrow: 'O que eu faço', tilesTitle: 'Três exemplos do trabalho, com os números explicados.',
    tilesText: 'Cada número abaixo é uma base real, aberta à conferência.',
    tiles: [
      { figure: '13.042', title: 'Perguntas do Congresso, respostas do governo', text: 'Reuni 13.042 perguntas que deputados fizeram ao governo federal de 2019 a 2024, com as respostas recebidas, para medir se o governo respondeu de verdade ou só cumpriu tabela.', cta: 'Ver a pesquisa', href: 'research/', svg: 'oversight' },
      { figure: '30.304', title: 'Compras públicas com sinal de risco', text: 'Um painel público examina 30.304 compras do governo federal e aponta sinais de risco de fraude para revisão humana. Sinal não é acusação: é prioridade de auditoria.', cta: 'Abrir o Radar Aberto', href: radar, external: true, svg: 'procurement' },
      { figure: '13', title: 'Promessas que dá para cobrar', text: 'Avaliei os 13 planos de governo registrados no TSE pelos candidatos à Presidência em 2026 para saber quais promessas podem ser acompanhadas e cobradas.', cta: 'Ver o índice', href: planos, external: true, svg: 'plans' }
    ],
    photoCredit: 'Foto: Senado Federal, CC BY 2.0, via Wikimedia Commons',
    storyLede: 'Veja, passo a passo, como documentos públicos viram evidência que dá para conferir.',
    bookEyebrow: 'Livro', bookTitle: 'Governança em Tempo Real',
    bookText: 'Como o Brasil pode parar de fingir que governa. Um livro sobre decidir com evidência, e não por intuição (Juspodivm, 2026).',
    bookBuy: 'Comprar na Juspodivm', bookMore: 'Saiba mais', bookPhotoAlt: 'Eduardo Alencar com o livro no lançamento, na Livraria Leitura',
    nlEyebrow: 'Newsletter', nlTitle: 'Uma análise curta por semana, no seu e-mail.',
    nlText: 'Toda terça, sobre governo, dados e integridade, com material extra só para quem assina por e-mail.',
    nlAlt: 'Prefere o LinkedIn? Siga a newsletter por lá.', nlFrame: 'Formulário de inscrição na newsletter',
    feedEyebrow: 'Publicações recentes', feedTitle: 'O que saiu nas últimas semanas.',
    feedText: 'Cada item leva ao post original.', follow: 'Acompanhe',
    channels: { linkedin: 'LinkedIn', youtube: 'YouTube', instagram: 'Instagram', x: 'X', newsletter: 'Newsletter' }
  },
  en: {
    heroTitle: 'I help institutions find out whether what they do actually works.',
    heroText: 'A public servant for more than 20 years with a Ph.D. from the University of California, I use data and artificial intelligence to show where government goes wrong, in time to fix it.',
    ctaNewsletter: 'Subscribe to the newsletter', ctaBook: 'Discover the book',
    tilesEyebrow: 'What I do', tilesTitle: 'Three examples of the work, with the numbers explained.',
    tilesText: 'Each number below is a real dataset, open to checking.',
    tiles: [
      { figure: '13,042', title: 'Questions from Congress, answers from government', text: 'I assembled 13,042 questions that Brazilian deputies sent to the federal government from 2019 to 2024, with the answers received, to measure whether government really answered or just went through the motions.', cta: 'See the research', href: 'research/', svg: 'oversight' },
      { figure: '30,304', title: 'Public purchases with a risk signal', text: 'A public dashboard screens 30,304 federal government purchases and flags fraud-risk signals for human review. A signal is not an accusation: it is an audit priority.', cta: 'Open Radar Aberto', href: radar, external: true, svg: 'procurement' },
      { figure: '13', title: 'Promises that can be held to account', text: 'I assessed the 13 government plans that Brazil’s 2026 presidential candidates filed with the electoral court, to see which promises can be tracked and enforced.', cta: 'See the index', href: planos, external: true, svg: 'plans' }
    ],
    photoCredit: 'Photo: Brazilian Federal Senate, CC BY 2.0, via Wikimedia Commons',
    storyLede: 'See, step by step, how public documents become evidence anyone can check.',
    bookEyebrow: 'Book', bookTitle: 'Governança em Tempo Real',
    bookText: 'How Brazil can stop pretending to govern. A book about deciding with evidence, not intuition (Juspodivm, 2026, in Portuguese).',
    bookBuy: 'Buy from Juspodivm', bookMore: 'Learn more', bookPhotoAlt: 'Eduardo Alencar with the book at the launch, Livraria Leitura',
    nlEyebrow: 'Newsletter', nlTitle: 'One short analysis a week, in your inbox.',
    nlText: 'Every Tuesday, on government, data and integrity, with extra material only for email subscribers.',
    nlAlt: 'Prefer LinkedIn? Follow the newsletter there.', nlFrame: 'Newsletter sign-up form',
    feedEyebrow: 'Recent posts', feedTitle: 'What came out in the last few weeks.',
    feedText: 'Each item links to the original post.', follow: 'Follow',
    channels: { linkedin: 'LinkedIn', youtube: 'YouTube', instagram: 'Instagram', x: 'X', newsletter: 'Newsletter' }
  },
  es: {
    heroTitle: 'Ayudo a las instituciones a descubrir si lo que hacen funciona.',
    heroText: 'Servidor público desde hace más de 20 años y doctor por la Universidad de California, uso datos e inteligencia artificial para mostrar dónde se equivoca el gobierno, a tiempo de corregirlo.',
    ctaNewsletter: 'Suscríbete a la newsletter', ctaBook: 'Conoce el libro',
    tilesEyebrow: 'Qué hago', tilesTitle: 'Tres ejemplos del trabajo, con los números explicados.',
    tilesText: 'Cada número es una base real, abierta a verificación.',
    tiles: [
      { figure: '13.042', title: 'Preguntas del Congreso, respuestas del gobierno', text: 'Reuní 13.042 preguntas que diputados brasileños enviaron al gobierno federal entre 2019 y 2024, con las respuestas recibidas, para medir si el gobierno respondió de verdad o solo cumplió el trámite.', cta: 'Ver la investigación', href: 'research/', svg: 'oversight' },
      { figure: '30.304', title: 'Compras públicas con señal de riesgo', text: 'Un panel público examina 30.304 compras del gobierno federal y señala riesgos de fraude para revisión humana. Una señal no es una acusación: es una prioridad de auditoría.', cta: 'Abrir Radar Aberto', href: radar, external: true, svg: 'procurement' },
      { figure: '13', title: 'Promesas que se pueden exigir', text: 'Evalué los 13 planes de gobierno que los candidatos a la Presidencia de Brasil registraron en 2026 ante el tribunal electoral, para saber qué promesas se pueden seguir y exigir.', cta: 'Ver el índice', href: planos, external: true, svg: 'plans' }
    ],
    photoCredit: 'Foto: Senado Federal de Brasil, CC BY 2.0, vía Wikimedia Commons',
    storyLede: 'Mira, paso a paso, cómo los documentos públicos se convierten en evidencia verificable.',
    bookEyebrow: 'Libro', bookTitle: 'Governança em Tempo Real',
    bookText: 'Cómo Brasil puede dejar de fingir que gobierna. Un libro sobre decidir con evidencia y no por intuición (Juspodivm, 2026, en portugués).',
    bookBuy: 'Comprar en Juspodivm', bookMore: 'Saber más', bookPhotoAlt: 'Eduardo Alencar con el libro en el lanzamiento, Livraria Leitura',
    nlEyebrow: 'Newsletter', nlTitle: 'Un análisis breve por semana, en tu correo.',
    nlText: 'Cada martes, sobre gobierno, datos e integridad, con material extra solo para quien se suscribe por correo.',
    nlAlt: '¿Prefieres LinkedIn? Sigue la newsletter allí.', nlFrame: 'Formulario de suscripción a la newsletter',
    feedEyebrow: 'Publicaciones recientes', feedTitle: 'Lo que salió en las últimas semanas.',
    feedText: 'Cada elemento lleva a la publicación original.', follow: 'Sígueme',
    channels: { linkedin: 'LinkedIn', youtube: 'YouTube', instagram: 'Instagram', x: 'X', newsletter: 'Newsletter' }
  },
  it: {
    heroTitle: 'Aiuto le istituzioni a scoprire se ciò che fanno funziona davvero.',
    heroText: 'Funzionario pubblico da oltre 20 anni e dottore di ricerca all’Università della California, uso dati e intelligenza artificiale per mostrare dove il governo sbaglia, in tempo per correggere.',
    ctaNewsletter: 'Iscriviti alla newsletter', ctaBook: 'Scopri il libro',
    tilesEyebrow: 'Cosa faccio', tilesTitle: 'Tre esempi del lavoro, con i numeri spiegati.',
    tilesText: 'Ogni numero è una base dati reale, verificabile.',
    tiles: [
      { figure: '13.042', title: 'Domande del Congresso, risposte del governo', text: 'Ho raccolto 13.042 domande che i deputati brasiliani hanno rivolto al governo federale dal 2019 al 2024, con le risposte ricevute, per misurare se il governo ha risposto davvero o solo per forma.', cta: 'Vedi la ricerca', href: 'research/', svg: 'oversight' },
      { figure: '30.304', title: 'Appalti pubblici con segnali di rischio', text: 'Un pannello pubblico esamina 30.304 acquisti del governo federale e segnala rischi di frode per la revisione umana. Un segnale non è un’accusa: è una priorità di audit.', cta: 'Apri Radar Aberto', href: radar, external: true, svg: 'procurement' },
      { figure: '13', title: 'Promesse che si possono esigere', text: 'Ho valutato i 13 programmi di governo depositati presso il tribunale elettorale dai candidati alla Presidenza del Brasile nel 2026, per capire quali promesse si possono seguire ed esigere.', cta: 'Vedi l’indice', href: planos, external: true, svg: 'plans' }
    ],
    photoCredit: 'Foto: Senato Federale del Brasile, CC BY 2.0, via Wikimedia Commons',
    storyLede: 'Guarda, passo dopo passo, come i documenti pubblici diventano evidenza verificabile.',
    bookEyebrow: 'Libro', bookTitle: 'Governança em Tempo Real',
    bookText: 'Come il Brasile può smettere di fingere di governare. Un libro sul decidere con l’evidenza e non per intuizione (Juspodivm, 2026, in portoghese).',
    bookBuy: 'Acquista su Juspodivm', bookMore: 'Scopri di più', bookPhotoAlt: 'Eduardo Alencar con il libro alla presentazione, Livraria Leitura',
    nlEyebrow: 'Newsletter', nlTitle: 'Un’analisi breve a settimana, nella tua email.',
    nlText: 'Ogni martedì, su governo, dati e integrità, con materiale extra solo per chi si iscrive via email.',
    nlAlt: 'Preferisci LinkedIn? Segui la newsletter lì.', nlFrame: 'Modulo di iscrizione alla newsletter',
    feedEyebrow: 'Pubblicazioni recenti', feedTitle: 'Cosa è uscito nelle ultime settimane.',
    feedText: 'Ogni elemento porta al post originale.', follow: 'Seguimi',
    channels: { linkedin: 'LinkedIn', youtube: 'YouTube', instagram: 'Instagram', x: 'X', newsletter: 'Newsletter' }
  }
};
