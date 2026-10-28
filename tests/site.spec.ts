import { expect, test } from '@playwright/test';

const locales = ['en','pt','es','it'];

test('root defaults to Portuguese and declares it as the default locale', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();
  expect(response.ok()).toBeTruthy();
  expect(html).toContain('<html lang="pt-BR">');
  expect(html).toContain('http-equiv="refresh" content="0; url=/pt/"');
  expect(html).toContain('hreflang="x-default" href="/pt/"');
});

test('all locale homes and direct section routes resolve', async ({ page }) => {
  for (const locale of locales) {
    for (const route of ['', 'about/', 'book/', 'research/', 'briefs/', 'evidence-lab/', 'newsletter/', 'writing/', 'teaching/', 'cv/', 'contact/']) {
      const response = await page.goto(`${locale}/${route}`);
      expect(response?.ok(), `${locale}/${route}`).toBeTruthy();
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
    }
  }
});

test('LinkedIn metrics are consistent on the newsletter and writing pages', async ({ page }) => {
  await page.goto('pt/newsletter/');
  await page.locator('.verified-scale').scrollIntoViewIfNeeded();
  await expect(page.locator('.verified-scale [data-li-count]:not([data-done])')).toHaveCount(0);
  const homeMetrics = await page.locator('.verified-scale').innerText();
  await page.goto('pt/writing/');
  await page.locator('.verified-scale').scrollIntoViewIfNeeded();
  await expect(page.locator('.verified-scale [data-li-count]:not([data-done])')).toHaveCount(0);
  const writingMetrics = await page.locator('.verified-scale').innerText();
  expect(homeMetrics).toBe(writingMetrics);
  expect(writingMetrics).toContain('4,969');
  expect(writingMetrics).toMatch(/21 jul\. 2026/i);
  expect(writingMetrics).not.toContain('93+');
});

test('the public YouTube channel is consistent across every locale', async ({ page }) => {
  const channelUrl = 'https://www.youtube.com/@eduardocnalencar';
  for (const locale of locales) {
    await page.goto(`${locale}/contact/`);
    await expect(page.locator(`a[href="${channelUrl}"]`).first()).toHaveText(/youtube\.com\/@eduardocnalencar/i);
    await expect(page.locator('footer a').filter({ hasText: 'YouTube' })).toHaveAttribute('href', channelUrl);
  }
});

test('lean home: hero, three explained numbers, evidence story, book, newsletter and recent posts', async ({ page }) => {
  await page.goto('pt/');
  await expect(page.locator('h1')).toHaveText('Ajudo instituições a descobrir se o que elas fazem funciona.');
  await expect(page.locator('.impact-tile')).toHaveCount(3);
  for (const tile of await page.locator('.impact-tile').all()) await expect(tile.locator('p')).not.toBeEmpty();
  await expect(page.locator('.evidence-cell')).toHaveCount(70);
  await expect(page.locator('[data-story-beat]')).toHaveCount(4);
  await expect(page.locator('#book-home a[href*="editorajuspodivm"]')).toHaveCount(1);
  await expect(page.locator('#newsletter iframe[src="https://eduardocnalencar.substack.com/embed"]')).toHaveCount(1);
  await expect(page.locator('.feed-item a[href^="https://"]').first()).toBeVisible();
  await expect(page.locator('.protobar nav a')).toHaveCount(7);
});

test('about holds the career timeline and research holds the explorer', async ({ page }) => {
  await page.goto('en/research/');
  await expect(page.locator('[data-explorer-tab]')).toHaveCount(4);
  await page.locator('[data-explorer-tab="2"]').click();
  await expect(page.locator('[data-explorer-tab="2"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('[data-explorer-panel="2"]')).toBeVisible();
  await expect(page.locator('[data-explorer-panel="2"] a')).toHaveAttribute('href', 'https://planosgov2026.online/');
  await page.goto('en/about/');
  await expect(page.locator('[data-gantt]')).toHaveCount(14);
  await page.locator('#career-timeline').scrollIntoViewIfNeeded();
  await expect(page.locator('#career-timeline')).toHaveClass(/is-visible/);
  await page.locator('[data-gantt]').first().click();
  await expect(page.locator('#timelineModal')).toBeVisible();
  await expect(page.locator('#timelineModalTitle')).toContainText('Ipea');
  await page.locator('[data-close-timeline]').click();
  await page.locator('#themebtn').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#themebtn')).toHaveAttribute('aria-pressed', 'true');
});

test('English interface does not expose Portuguese catalogue codes', async ({ page }) => {
  await page.goto('en/');
  const text = await page.locator('body').innerText();
  expect(text).not.toContain('Artigo revisado por pares');
  expect(text).not.toContain('Aplicação e dataset');
  expect(text).not.toContain('Em avaliação');
  expect(text).not.toContain('Em preparação');
});

test('scroll narrative advances through all four evidence states', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  await page.goto('en/');
  for (const step of [1, 2, 3, 4]) {
    await page.locator(`[data-story-beat="${step}"]`).scrollIntoViewIfNeeded();
    await expect(page.locator('[data-story-stage]')).toHaveAttribute('data-step', String(step));
  }
  await expect(page.locator('[data-story-stage]')).toBeVisible();
  const stickyTop = await page.locator('[data-story-stage]').evaluate((node) => node.getBoundingClientRect().top);
  expect(stickyTop).toBeGreaterThanOrEqual(120);
  expect(stickyTop).toBeLessThanOrEqual(170);
});

test('research and policy brief catalogues are separate and filterable', async ({ page }) => {
  await page.goto('en/research/');
  const research = page.locator('#research .work-catalog').first();
  await expect(research.locator('[data-category="research"]').first()).toBeVisible();
  await expect(research.locator('[data-category="policy"]')).toHaveCount(0);
  const briefs = page.locator('#briefs .work-catalog');
  await expect(briefs.locator('[data-category="policy"]').first()).toBeVisible();
  await briefs.locator('[data-work-filter="policy"]').click();
  await expect(briefs.locator('[data-category="policy"]').first()).toBeVisible();
  await briefs.locator('[data-work-filter="all"]').click();
  await expect(briefs.locator('[data-category="policy"]').first()).toBeVisible();
});

test('catalogue cards open the document directly in a new tab', async ({ page }) => {
  await page.goto('pt/research/');
  const card = page.locator('#briefs a[href*="o-supremo-julga-um-dos-seus-2026.pdf"]').first();
  await expect(card).toHaveAttribute('target', '_blank');
});

test('explorer opens the real destination and work pages no longer exist', async ({ page }) => {
  await page.goto('pt/research/');
  const radar = page.locator('#explorer-panel-0 a.cta');
  await expect(radar).toHaveAttribute('href', 'https://radar-aberto-integridade.streamlit.app/');
  await expect(radar).toHaveAttribute('target', '_blank');
  await expect(page.locator('#explorer-panel-1 a.cta')).toHaveCount(0);
  await expect(page.locator('#explorer-panel-2 a.cta')).toHaveAttribute('href', 'https://planosgov2026.online/');
  await expect(page.locator('#explorer-panel-3 a.cta')).toHaveAttribute('href', 'https://doi.org/10.1177/2631309X211017874');
  await expect(page.locator('a[href*="/work/"]')).toHaveCount(0);
  const response = await page.goto('en/work/radar-aberto-integridade/');
  expect(response?.status()).toBe(404);
});

test('White Collar Times card opens the article PDF', async ({ page, request }) => {
  await page.goto('pt/briefs/');
  const card = page.locator('a.worklink[href*="white-collar-times-2026-evidence-based-oversight.pdf"]').first();
  await expect(card).toHaveAttribute('target', '_blank');
  const pdf = await request.get(await card.getAttribute('href') as string);
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()['content-type']).toContain('pdf');
});

test('LinkedIn metrics count up to the verified values', async ({ page }) => {
  await page.goto('pt/writing/');
  await page.locator('.verified-scale').scrollIntoViewIfNeeded();
  const first = page.locator('.verified-scale [data-li-count]').first();
  await expect(first).toHaveAttribute('data-done', '1');
  await expect(first).toHaveText('4,969');
});

test('research map highlights the work linked to a selected axis', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 1000 });
  await page.goto('pt/research/');
  const map = page.locator('[data-research-map]');
  await expect(map.locator('svg path')).toHaveCount(11);
  await map.locator('button[data-axis="oversight"]').click();
  await expect(map.locator('button[data-axis="oversight"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(map.locator('li[data-work="evasion-as-a-signal"]')).toHaveClass(/is-on/);
  await expect(map.locator('li[data-work="phd-procurement-fraud"]')).toHaveClass(/is-dim/);
});

test('reduced motion keeps the visual content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('en/');
  await expect(page.locator('.story-stage')).toHaveAttribute('data-step', '4');
  await page.goto('en/about/');
  await expect(page.locator('.gantt-bar').first()).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
});

test('mobile Gantt retains a proportional horizontal scale', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile');
  await page.goto('en/about/');
  const sizes = await page.locator('.gantt-scroll').evaluate((node) => ({ client: node.clientWidth, scroll: node.scrollWidth }));
  expect(sizes.scroll).toBeGreaterThan(sizes.client);
});

test('every internal link across all locales resolves', async ({ page, baseURL, request }) => {
  const basePath = new URL(baseURL!).pathname;
  const routes = ['', 'about/', 'book/', 'research/', 'briefs/', 'evidence-lab/', 'newsletter/', 'writing/', 'teaching/', 'cv/', 'contact/', 'publications/'];
  const toCheck = new Set<string>();
  for (const locale of locales) {
    for (const route of routes) {
      const response = await page.goto(`${locale}/${route}`);
      expect(response?.ok(), `${locale}/${route}`).toBeTruthy();
      const hrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href') || ''));
      for (const href of hrefs) {
        if (!href || href.startsWith('mailto:') || href.startsWith('#')) continue;
        let url: URL;
        try { url = new URL(href, baseURL); } catch { continue; }
        if (url.origin !== new URL(baseURL!).origin) continue;
        if (!url.pathname.startsWith(basePath)) continue;
        toCheck.add(url.pathname + url.search);
      }
    }
  }
  expect(toCheck.size).toBeGreaterThan(0);
  for (const pathname of toCheck) {
    const response = await request.get(pathname);
    expect(response.ok(), pathname).toBeTruthy();
  }
});

test('language switch preserves the current section instead of jumping to the top', async ({ page }) => {
  await page.goto('en/');
  await page.evaluate(() => document.querySelector('#evidence-story')!.scrollIntoView({ behavior: 'instant', block: 'start' }));
  const href = await page.evaluate(() => {
    const link = document.querySelector('a[hreflang="pt"]') as HTMLAnchorElement;
    const preventNav = (event: Event) => event.preventDefault();
    link.addEventListener('click', preventNav, { capture: true, once: true });
    link.click();
    return link.href;
  });
  expect(href).toContain('/pt/#evidence-story');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('content, anchors and explorer remain available', async ({ page }) => {
    await page.goto('en/research/');
    await expect(page.locator('#research')).toBeVisible();
    await expect(page.locator('[data-explorer-panel]')).toHaveCount(4);
    await expect(page.locator('.protobar a[href$="/en/research/"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://radar-aberto-integridade.streamlit.app/"]').first()).toBeAttached();
  });
});

test('book section embeds the launch video without autoplay', async ({ page, request }) => {
  await page.goto('pt/book/');
  const video = page.locator('#book video');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute('preload', 'none');
  const src = await page.locator('#book video source').getAttribute('src');
  const response = await request.get(new URL(src!, page.url()).toString());
  expect(response.ok()).toBeTruthy();
});

test('boxes move under the mouse on home, about and research', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  for (const [route, selector] of [['pt/', '.impact-tile'], ['pt/', '.feed-item'], ['pt/about/', '.about-scene figure'], ['pt/research/', '.publication-card']]) {
    await page.goto(route);
    const box = page.locator(selector).first();
    await box.scrollIntoViewIfNeeded();
    await box.hover({ position: { x: 30, y: 30 } });
    await expect(box, `${route} ${selector}`).toHaveClass(/tilting/);
  }
});

test('home infographics animate once visible and stay static with reduced motion', async ({ page }) => {
  await page.goto('pt/');
  await page.locator('.impact-tile').first().scrollIntoViewIfNeeded();
  await expect(page.locator('.impact-tile').first()).toHaveClass(/is-visible/);
  expect(await page.locator('.ig-grow').first().evaluate((n) => getComputedStyle(n).animationName)).toBe('ig-grow');
  expect(await page.locator('.ig-scan').first().evaluate((n) => getComputedStyle(n).animationName)).toBe('ig-scan');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  expect(await page.locator('.ig-grow').first().evaluate((n) => getComputedStyle(n).animationName)).toBe('none');
});

test('every policy brief card shows its cover; about uses one launch photo and three infographics', async ({ page, request }) => {
  await page.goto('pt/research/');
  const briefs = page.locator('#briefs .publication-card');
  const covers = page.locator('#briefs .card-cover img');
  await expect(covers).toHaveCount(await briefs.count());
  const src = await covers.first().getAttribute('src');
  expect((await request.get(src!)).ok()).toBeTruthy();
  await page.goto('pt/about/');
  const scenes = await page.locator('.about-scene img').evaluateAll((imgs) => imgs.map((i) => i.getAttribute('src') || ''));
  expect(scenes).toEqual(['/images/sobre-formacao.webp']);
  await expect(page.locator('.about-scene .about-infographic svg')).toHaveCount(3);
  for (const logo of ['unb.svg', 'fgv.png', 'uc-irvine.png']) {
    const href = await page.locator(`.about-infographic image[href$="${logo}"]`).getAttribute('href');
    expect((await request.get(href!)).ok(), logo).toBeTruthy();
  }
  await expect(page.locator('.about-infographic').nth(2)).toContainText('Fraud Research Group');
});

test('page navigation uses a cross-document view transition', async ({ page }) => {
  await page.goto('pt/');
  const declared = await page.evaluate(() => [...document.styleSheets].some((sheet) => { try { return [...sheet.cssRules].some((rule) => rule.cssText.includes('view-transition')); } catch { return false; } }));
  expect(declared).toBeTruthy();
  await page.locator('.protobar nav a[href$="/pt/about/"]').click();
  await expect(page).toHaveURL(/\/pt\/about\/$/);
  await expect(page.locator('h1')).toHaveText('Eduardo Alencar');
});

test('contact hub lists every channel once and FIT panels link to all four dashboards', async ({ page }) => {
  await page.goto('pt/contact/');
  await expect(page.locator('.contact-card')).toHaveCount(9);
  await expect(page.locator('.contact-card [data-copy="eduardocna@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('main .lede')).toHaveCount(0);
  await page.goto('pt/evidence-lab/');
  for (const panel of ['patrocinios-itaipu', 'transferencias-voluntarias', 'emendas-pix', 'agenda-das-autoridades']) {
    await expect(page.locator(`main a[href="https://www.frentefit.com.br/${panel}/"]`).first()).toBeAttached();
  }
  await expect(page.locator('.publication-card a.worklink[href$="patrocinios-itaipu/"]')).toContainText('Itaipu');
});
