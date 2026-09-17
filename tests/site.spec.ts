import { expect, test } from '@playwright/test';

const locales = ['en','pt','es','it'];

test('all locale homes and direct section routes resolve', async ({ page }) => {
  for (const locale of locales) {
    for (const route of ['', 'book/', 'research/', 'evidence-lab/', 'writing/', 'teaching/', 'cv/', 'contact/']) {
      const response = await page.goto(`${locale}/${route}`);
      expect(response?.ok(), `${locale}/${route}`).toBeTruthy();
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
    }
  }
});

test('home exposes the complete narrative and verified interactions', async ({ page }) => {
  await page.goto('en/');
  await expect(page.locator('.evidence-cell')).toHaveCount(70);
  await expect(page.locator('[data-story-beat]')).toHaveCount(4);
  await expect(page.locator('[data-gantt]')).toHaveCount(18);
  await expect(page.locator('[data-explorer-tab]')).toHaveCount(4);
  await page.locator('[data-explorer-tab="2"]').click();
  await expect(page.locator('[data-explorer-tab="2"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('[data-explorer-panel="2"]')).toBeVisible();
  await expect(page.locator('[data-explorer-panel="2"] a')).toHaveAttribute('href', /work\/indice-governanca-2026/);
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

test('catalogue filters expose the selected work type', async ({ page }) => {
  await page.goto('en/');
  const catalogue = page.locator('#research .work-catalog');
  await catalogue.locator('[data-work-filter="policy"]').click();
  await expect(catalogue.locator('[data-category="policy"]').first()).toBeVisible();
  await expect(catalogue.locator('[data-category="research"]').first()).toBeHidden();
  await catalogue.locator('[data-work-filter="all"]').click();
  await expect(catalogue.locator('[data-category="research"]').first()).toBeVisible();
});

test('work pages use internal routes and verified sources', async ({ page }) => {
  let response = await page.goto('en/work/radar-aberto-integridade/');
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('link', { name: /Open application/ })).toHaveAttribute('href', 'https://radar-aberto-integridade.streamlit.app/');
  response = await page.goto('pt/work/supremo-autojulgamento-pet16662/');
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole('link', { name: /Baixar policy brief/ })).toHaveAttribute('href', /downloads\/o-supremo-julga-um-dos-seus-2026.pdf/);
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
  const routes = ['', 'book/', 'research/', 'evidence-lab/', 'writing/', 'teaching/', 'cv/', 'contact/', 'publications/'];
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

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('content, anchors and explorer remain available', async ({ page }) => {
    await page.goto('en/');
    await expect(page.locator('#research')).toBeVisible();
    await expect(page.locator('[data-explorer-panel]')).toHaveCount(4);
    await expect(page.locator('a[href$="#research"]').first()).toBeVisible();
    await expect(page.locator('a[href*="/work/radar-aberto-integridade/"]').first()).toBeVisible();
  });
});
