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
    for (const route of ['', 'book/', 'research/', 'briefs/', 'evidence-lab/', 'writing/', 'teaching/', 'cv/', 'contact/']) {
      const response = await page.goto(`${locale}/${route}`);
      expect(response?.ok(), `${locale}/${route}`).toBeTruthy();
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
    }
  }
});

test('LinkedIn metrics are consistent on the home and direct writing pages', async ({ page }) => {
  await page.goto('pt/');
  const homeMetrics = await page.locator('#writing .verified-scale').innerText();
  await page.goto('pt/writing/');
  const writingMetrics = await page.locator('.verified-scale').innerText();
  expect(homeMetrics).toBe(writingMetrics);
  expect(writingMetrics).toContain('4,969');
  expect(writingMetrics).toMatch(/21 jul\. 2026/i);
  expect(writingMetrics).not.toContain('93+');
});

test('home exposes the complete narrative and verified interactions', async ({ page }) => {
  await page.goto('en/');
  await expect(page.locator('.evidence-cell')).toHaveCount(70);
  await expect(page.locator('[data-story-beat]')).toHaveCount(4);
  await expect(page.locator('[data-gantt]')).toHaveCount(14);
  await expect(page.locator('[data-explorer-tab]')).toHaveCount(4);
  await page.locator('[data-explorer-tab="2"]').click();
  await expect(page.locator('[data-explorer-tab="2"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('[data-explorer-panel="2"]')).toBeVisible();
  await expect(page.locator('[data-explorer-panel="2"] a')).toHaveAttribute('href', 'https://planosgov2026.online/');
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
  await page.goto('en/');
  const research = page.locator('#research .work-catalog');
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
  await page.goto('pt/');
  const card = page.locator('#briefs a[href*="o-supremo-julga-um-dos-seus-2026.pdf"]').first();
  await expect(card).toHaveAttribute('target', '_blank');
});

test('explorer opens the real destination and work pages no longer exist', async ({ page }) => {
  await page.goto('pt/');
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

test('research map highlights the work linked to a selected axis', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 1000 });
  await page.goto('pt/research/');
  const map = page.locator('[data-research-map]');
  await expect(map.locator('svg path')).toHaveCount(12);
  await map.locator('button[data-axis="oversight"]').click();
  await expect(map.locator('button[data-axis="oversight"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(map.locator('li[data-work="formal-replies-substantive-evasion"]')).toHaveClass(/is-on/);
  await expect(map.locator('li[data-work="phd-procurement-fraud"]')).toHaveClass(/is-dim/);
});

test('reduced motion keeps the visual content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('en/');
  await expect(page.locator('.story-stage')).toHaveAttribute('data-step', '4');
  await expect(page.locator('.gantt-bar').first()).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
});

test('mobile Gantt retains a proportional horizontal scale', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile');
  await page.goto('en/');
  const sizes = await page.locator('.gantt-scroll').evaluate((node) => ({ client: node.clientWidth, scroll: node.scrollWidth }));
  expect(sizes.scroll).toBeGreaterThan(sizes.client);
});

test('every internal link across all locales resolves', async ({ page, baseURL, request }) => {
  const basePath = new URL(baseURL!).pathname;
  const routes = ['', 'book/', 'research/', 'briefs/', 'evidence-lab/', 'writing/', 'teaching/', 'cv/', 'contact/', 'publications/'];
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
  await page.evaluate(() => document.querySelector('#book')!.scrollIntoView({ behavior: 'instant', block: 'start' }));
  const href = await page.evaluate(() => {
    const link = document.querySelector('a[hreflang="pt"]') as HTMLAnchorElement;
    const preventNav = (event: Event) => event.preventDefault();
    link.addEventListener('click', preventNav, { capture: true, once: true });
    link.click();
    return link.href;
  });
  expect(href).toContain('/pt/#book');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('content, anchors and explorer remain available', async ({ page }) => {
    await page.goto('en/');
    await expect(page.locator('#research')).toBeVisible();
    await expect(page.locator('[data-explorer-panel]')).toHaveCount(4);
    await expect(page.locator('a[href$="#research"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://radar-aberto-integridade.streamlit.app/"]').first()).toBeAttached();
  });
});

test('book section embeds the launch video without autoplay', async ({ page, request }) => {
  await page.goto('pt/');
  const video = page.locator('#book video');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute('preload', 'none');
  const src = await page.locator('#book video source').getAttribute('src');
  const response = await request.get(new URL(src!, page.url()).toString());
  expect(response.ok()).toBeTruthy();
});
