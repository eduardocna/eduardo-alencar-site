import type { Locale } from './site';

// Página "Sobre" (27/10/2026). Fonte primária: memory/CV_Eduardo_Alencar_2025 detailed6.docx.
// Mudança de fato (cargo, data, formação) entra primeiro no CV mestre e depois aqui.

export interface AboutSection { title: string; paragraphs: string[]; }
export interface AboutCopy {
  nav: string; meta: string; eyebrow: string; title: string; lede: string;
  sections: AboutSection[];
  bioTitle: string; bioNote: string; shortLabel: string; shortBio: string; longLabel: string; longBio: string;
  languages: string; ctaCv: string; ctaContact: string; photoAlt: string;
}

export const about: Record<Locale, AboutCopy> = {
  pt: {
    nav: 'Sobre',
    meta: 'Quem é Eduardo Alencar: trajetória no serviço público, formação, pesquisa e bios para eventos e imprensa.',
    eyebrow: 'Sobre',
    title: 'Eduardo Alencar',
    lede: 'Trabalho para que o Estado decida com evidência, e não por intuição. Faço isso de dentro do setor público, com dados, pesquisa e fiscalização.',
    sections: [
      { title: 'Quem sou', paragraphs: [
        'Sou servidor público federal de carreira, com mais de 20 anos de atuação na administração pública. Desde dezembro de 2024 sou Assessor Legislativo Sênior na Câmara dos Deputados, onde trabalho com fiscalização do Poder Executivo, integridade pública, transformação digital e inteligência artificial.',
        'Antes, passei pelo Ipea, pela Anatel, pela Presidência da República, pela Controladoria-Geral da União, pelo Ministério do Planejamento, pela Secretaria-Executiva da Camex e pelo Conselho de Administração do Serviço Geológico do Brasil. Fui chefe de governança do Inep e chefe de gestão estratégica do Ministério da Infraestrutura.'
      ] },
      { title: 'Formação', paragraphs: [
        'Sou economista pela Universidade de Brasília, com MBA Executivo Internacional pela Fundação Getulio Vargas. Fiz mestrado e doutorado em Social Ecology na University of California, Irvine, onde concluí o doutorado em 2022 com uma tese sobre detecção de fraude em compras públicas brasileiras com análise de classes latentes. Na UC Irvine, fui fellow do Center for the Study of Democracy.'
      ] },
      { title: 'O que pesquiso', paragraphs: [
        'Minha pergunta central é se a fiscalização pública funciona de fato. Estudo como o Executivo responde aos requerimentos de informação do Congresso, com uma base de 13.042 pares de pedido e resposta de 2019 a 2024, e como sinais de risco em compras públicas podem orientar a auditoria sem virar veredito.',
        'Também desenvolvo, em coautoria, um sistema com inteligência artificial que avalia a qualidade das respostas do Executivo à fiscalização parlamentar. Em 2026 publiquei o livro Governança em Tempo Real: como o Brasil pode parar de fingir que governa (Juspodivm), com prefácio de Henry Pontell.'
      ] },
      { title: 'Docência e redes', paragraphs: [
        'Leciono governança pública na Enap e cursos de liderança, governança, regulação e inteligência artificial na Unyleya e na Gran Faculdade. Contribuo com grupos de trabalho da iniciativa U4SSC, da União Internacional de Telecomunicações, colaboro com o Fraud Research Group da Aston University e atuo como parecerista do Journal of White Collar and Corporate Crime.'
      ] }
    ],
    bioTitle: 'Bios para eventos e imprensa',
    bioNote: 'Pode copiar e usar sem pedir autorização.',
    shortLabel: 'Bio curta',
    shortBio: 'Eduardo Alencar é doutor em Social Ecology pela University of California, Irvine, e servidor público federal há mais de 20 anos. Assessor Legislativo Sênior na Câmara dos Deputados, pesquisa integridade pública, fiscalização e uso de dados e IA no governo. É autor de Governança em Tempo Real (Juspodivm, 2026).',
    longLabel: 'Bio longa',
    longBio: 'Eduardo Alencar é doutor e mestre em Social Ecology pela University of California, Irvine, economista pela Universidade de Brasília e MBA pela Fundação Getulio Vargas. Servidor público federal há mais de 20 anos, atuou no Ipea, na Anatel, na Presidência da República, na Controladoria-Geral da União, no Inep e no Ministério da Infraestrutura. Desde 2024 é Assessor Legislativo Sênior na Câmara dos Deputados. Pesquisa integridade pública, risco de fraude em compras públicas e a qualidade das respostas do Executivo à fiscalização do Congresso, com métodos quantitativos e inteligência artificial. É professor na Enap, na Unyleya e na Gran Faculdade e autor de Governança em Tempo Real: como o Brasil pode parar de fingir que governa (Juspodivm, 2026).',
    languages: 'Idiomas: português (nativo), inglês e italiano (fluentes), espanhol (intermediário).',
    ctaCv: 'Ver currículo', ctaContact: 'Contato', photoAlt: 'Retrato de Eduardo Alencar'
  },
  en: {
    nav: 'About',
    meta: 'About Eduardo Alencar: public-service career, education, research and bios for events and press.',
    eyebrow: 'About',
    title: 'Eduardo Alencar',
    lede: 'I work so that government decides with evidence, not intuition. I do it from inside the public sector, with data, research and oversight.',
    sections: [
      { title: 'Who I am', paragraphs: [
        'I am a career federal civil servant with more than 20 years in Brazil’s public administration. Since December 2024 I have served as Senior Legislative Advisor at the Chamber of Deputies, working on executive oversight, public integrity, digital transformation and artificial intelligence.',
        'Before that I worked at Ipea, Anatel, the Presidency of the Republic, the Office of the Comptroller General, the Ministry of Planning, the Secretariat of the Foreign Trade Council (Camex) and the Board of the Geological Survey of Brazil. I was Chief of Governance at Inep and Chief of Strategic Management at the Ministry of Infrastructure.'
      ] },
      { title: 'Education', paragraphs: [
        'I hold a degree in economics from the University of Brasília and an International Executive MBA from Fundação Getulio Vargas. I earned an M.A. and a Ph.D. in Social Ecology from the University of California, Irvine, completing the Ph.D. in 2022 with a dissertation on detecting fraud in Brazilian public procurement with Latent Class Analysis. At UC Irvine I was a fellow of the Center for the Study of Democracy.'
      ] },
      { title: 'What I research', paragraphs: [
        'My core question is whether public oversight actually works. I study how the Executive answers congressional information requests, using 13,042 request-response pairs from 2019 to 2024, and how risk signals in public procurement can guide audits without becoming verdicts.',
        'I also co-develop an AI-based system that assesses the quality of Executive replies to parliamentary oversight. In 2026 I published the book Governança em Tempo Real: como o Brasil pode parar de fingir que governa (Real-Time Governance, Juspodivm), with a preface by Henry Pontell.'
      ] },
      { title: 'Teaching and networks', paragraphs: [
        'I teach public governance at ENAP, Brazil’s National School of Public Administration, and courses on leadership, governance, regulation and AI at Unyleya and Gran Faculdade. I contribute to working groups of the ITU’s U4SSC initiative, collaborate with the Fraud Research Group at Aston University and review for the Journal of White Collar and Corporate Crime.'
      ] }
    ],
    bioTitle: 'Bios for events and press',
    bioNote: 'Feel free to copy and use them without asking.',
    shortLabel: 'Short bio',
    shortBio: 'Eduardo Alencar holds a Ph.D. in Social Ecology from the University of California, Irvine, and has served in Brazil’s federal government for more than 20 years. A Senior Legislative Advisor at the Chamber of Deputies, he researches public integrity, oversight and the use of data and AI in government. He is the author of Governança em Tempo Real (Juspodivm, 2026).',
    longLabel: 'Long bio',
    longBio: 'Eduardo Alencar holds a Ph.D. and an M.A. in Social Ecology from the University of California, Irvine, a degree in economics from the University of Brasília and an MBA from Fundação Getulio Vargas. A federal civil servant for more than 20 years, he has worked at Ipea, Anatel, the Presidency of the Republic, the Office of the Comptroller General, Inep and the Ministry of Infrastructure. Since 2024 he has been Senior Legislative Advisor at Brazil’s Chamber of Deputies. His research covers public integrity, fraud risk in public procurement and the quality of Executive replies to congressional oversight, using quantitative methods and artificial intelligence. He teaches at ENAP, Unyleya and Gran Faculdade and is the author of Governança em Tempo Real: como o Brasil pode parar de fingir que governa (Juspodivm, 2026).',
    languages: 'Languages: Portuguese (native), English and Italian (fluent), Spanish (intermediate).',
    ctaCv: 'View CV', ctaContact: 'Contact', photoAlt: 'Portrait of Eduardo Alencar'
  },
  es: {
    nav: 'Sobre mí',
    meta: 'Sobre Eduardo Alencar: trayectoria en el servicio público, formación, investigación y biografías para eventos y prensa.',
    eyebrow: 'Sobre mí',
    title: 'Eduardo Alencar',
    lede: 'Trabajo para que el Estado decida con evidencia y no por intuición. Lo hago desde dentro del sector público, con datos, investigación y fiscalización.',
    sections: [
      { title: 'Quién soy', paragraphs: [
        'Soy servidor público federal de carrera, con más de 20 años en la administración pública brasileña. Desde diciembre de 2024 soy Asesor Legislativo Sénior en la Cámara de Diputados, donde trabajo en fiscalización del Poder Ejecutivo, integridad pública, transformación digital e inteligencia artificial.',
        'Antes trabajé en el Ipea, la Anatel, la Presidencia de la República, la Contraloría General de la Unión, el Ministerio de Planificación, la Secretaría Ejecutiva de la Camex y el Consejo de Administración del Servicio Geológico de Brasil. Fui jefe de gobernanza del Inep y jefe de gestión estratégica del Ministerio de Infraestructura.'
      ] },
      { title: 'Formación', paragraphs: [
        'Soy economista por la Universidad de Brasilia, con un MBA Ejecutivo Internacional de la Fundação Getulio Vargas. Hice la maestría y el doctorado en Social Ecology en la University of California, Irvine, donde terminé el doctorado en 2022 con una tesis sobre detección de fraude en las compras públicas brasileñas con análisis de clases latentes. En la UC Irvine fui fellow del Center for the Study of Democracy.'
      ] },
      { title: 'Qué investigo', paragraphs: [
        'Mi pregunta central es si la fiscalización pública funciona de verdad. Estudio cómo el Ejecutivo responde a los pedidos de información del Congreso, con 13.042 pares de pedido y respuesta de 2019 a 2024, y cómo las señales de riesgo en compras públicas pueden orientar la auditoría sin convertirse en veredicto.',
        'También desarrollo, en coautoría, un sistema con inteligencia artificial que evalúa la calidad de las respuestas del Ejecutivo a la fiscalización parlamentaria. En 2026 publiqué el libro Governança em Tempo Real: como o Brasil pode parar de fingir que governa (Gobernanza en Tiempo Real, Juspodivm), con prefacio de Henry Pontell.'
      ] },
      { title: 'Docencia y redes', paragraphs: [
        'Enseño gobernanza pública en la Enap, la escuela nacional de administración pública de Brasil, y cursos de liderazgo, gobernanza, regulación e IA en Unyleya y Gran Faculdade. Contribuyo a grupos de trabajo de la iniciativa U4SSC de la Unión Internacional de Telecomunicaciones, colaboro con el Fraud Research Group de la Aston University y soy revisor del Journal of White Collar and Corporate Crime.'
      ] }
    ],
    bioTitle: 'Biografías para eventos y prensa',
    bioNote: 'Puede copiarlas y usarlas sin pedir autorización.',
    shortLabel: 'Biografía corta',
    shortBio: 'Eduardo Alencar es doctor en Social Ecology por la University of California, Irvine, y servidor público federal en Brasil desde hace más de 20 años. Asesor Legislativo Sénior en la Cámara de Diputados, investiga integridad pública, fiscalización y uso de datos e IA en el gobierno. Es autor de Governança em Tempo Real (Juspodivm, 2026).',
    longLabel: 'Biografía larga',
    longBio: 'Eduardo Alencar es doctor y magíster en Social Ecology por la University of California, Irvine, economista por la Universidad de Brasilia y MBA por la Fundação Getulio Vargas. Servidor público federal desde hace más de 20 años, trabajó en el Ipea, la Anatel, la Presidencia de la República, la Contraloría General de la Unión, el Inep y el Ministerio de Infraestructura. Desde 2024 es Asesor Legislativo Sénior en la Cámara de Diputados de Brasil. Investiga integridad pública, riesgo de fraude en compras públicas y la calidad de las respuestas del Ejecutivo a la fiscalización del Congreso, con métodos cuantitativos e inteligencia artificial. Es profesor en la Enap, Unyleya y Gran Faculdade y autor de Governança em Tempo Real: como o Brasil pode parar de fingir que governa (Juspodivm, 2026).',
    languages: 'Idiomas: portugués (nativo), inglés e italiano (fluidos), español (intermedio).',
    ctaCv: 'Ver CV', ctaContact: 'Contacto', photoAlt: 'Retrato de Eduardo Alencar'
  },
  it: {
    nav: 'Chi sono',
    meta: 'Chi è Eduardo Alencar: carriera nel servizio pubblico, formazione, ricerca e biografie per eventi e stampa.',
    eyebrow: 'Chi sono',
    title: 'Eduardo Alencar',
    lede: 'Lavoro perché lo Stato decida con l’evidenza e non per intuizione. Lo faccio dall’interno del settore pubblico, con dati, ricerca e controllo.',
    sections: [
      { title: 'Chi sono', paragraphs: [
        'Sono un funzionario pubblico federale di carriera, con oltre 20 anni nella pubblica amministrazione brasiliana. Da dicembre 2024 sono Consigliere Legislativo Senior presso la Camera dei Deputati, dove mi occupo di controllo sul potere esecutivo, integrità pubblica, trasformazione digitale e intelligenza artificiale.',
        'In precedenza ho lavorato all’Ipea, all’Anatel, alla Presidenza della Repubblica, alla Controladoria-Geral da União, al Ministero della Pianificazione, alla Segreteria Esecutiva della Camex e nel Consiglio di Amministrazione del Servizio Geologico del Brasile. Sono stato responsabile della governance dell’Inep e della gestione strategica del Ministero delle Infrastrutture.'
      ] },
      { title: 'Formazione', paragraphs: [
        'Sono laureato in economia all’Università di Brasília e ho un MBA Executive Internazionale della Fundação Getulio Vargas. Ho conseguito il master e il dottorato in Social Ecology alla University of California, Irvine, concludendo il dottorato nel 2022 con una tesi sul rilevamento delle frodi negli appalti pubblici brasiliani tramite analisi delle classi latenti. Alla UC Irvine sono stato fellow del Center for the Study of Democracy.'
      ] },
      { title: 'Di cosa mi occupo nella ricerca', paragraphs: [
        'La mia domanda centrale è se il controllo pubblico funzioni davvero. Studio come l’Esecutivo risponde alle richieste di informazione del Congresso, con 13.042 coppie di richiesta e risposta dal 2019 al 2024, e come i segnali di rischio negli appalti pubblici possano orientare l’audit senza diventare un verdetto.',
        'Sviluppo inoltre, in coautoria, un sistema basato sull’intelligenza artificiale che valuta la qualità delle risposte dell’Esecutivo al controllo parlamentare. Nel 2026 ho pubblicato il libro Governança em Tempo Real: como o Brasil pode parar de fingir que governa (Governance in tempo reale, Juspodivm), con prefazione di Henry Pontell.'
      ] },
      { title: 'Didattica e reti', paragraphs: [
        'Insegno governance pubblica all’Enap, la scuola nazionale di pubblica amministrazione del Brasile, e corsi di leadership, governance, regolazione e IA presso Unyleya e Gran Faculdade. Contribuisco ai gruppi di lavoro dell’iniziativa U4SSC dell’Unione Internazionale delle Telecomunicazioni, collaboro con il Fraud Research Group della Aston University e sono revisore del Journal of White Collar and Corporate Crime.'
      ] }
    ],
    bioTitle: 'Biografie per eventi e stampa',
    bioNote: 'Si possono copiare e usare liberamente.',
    shortLabel: 'Biografia breve',
    shortBio: 'Eduardo Alencar ha un dottorato in Social Ecology alla University of California, Irvine, ed è funzionario pubblico federale in Brasile da oltre 20 anni. Consigliere Legislativo Senior presso la Camera dei Deputati, si occupa di integrità pubblica, controllo e uso dei dati e dell’IA nella pubblica amministrazione. È autore di Governança em Tempo Real (Juspodivm, 2026).',
    longLabel: 'Biografia estesa',
    longBio: 'Eduardo Alencar ha conseguito dottorato e master in Social Ecology alla University of California, Irvine, la laurea in economia all’Università di Brasília e un MBA alla Fundação Getulio Vargas. Funzionario pubblico federale da oltre 20 anni, ha lavorato all’Ipea, all’Anatel, alla Presidenza della Repubblica, alla Controladoria-Geral da União, all’Inep e al Ministero delle Infrastrutture. Dal 2024 è Consigliere Legislativo Senior presso la Camera dei Deputati del Brasile. Studia l’integrità pubblica, il rischio di frode negli appalti e la qualità delle risposte dell’Esecutivo al controllo del Congresso, con metodi quantitativi e intelligenza artificiale. Insegna all’Enap, a Unyleya e alla Gran Faculdade ed è autore di Governança em Tempo Real: como o Brasil pode parar de fingir que governa (Juspodivm, 2026).',
    languages: 'Lingue: portoghese (madrelingua), inglese e italiano (fluenti), spagnolo (intermedio).',
    ctaCv: 'Vedi CV', ctaContact: 'Contatti', photoAlt: 'Ritratto di Eduardo Alencar'
  }
};
