import { test, expect } from '@playwright/test';

const ARTICLE_URL = '/articles/sr-11-7-for-non-bankers';

test('renders an article page successfully', async ({ page }) => {
  const resp = await page.goto(ARTICLE_URL);
  expect(resp?.status()).toBe(200);

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('SR 11-7');
});

test('article body contains rendered paragraphs and headings', async ({ page }) => {
  await page.goto(ARTICLE_URL);

  const paragraphs = page.locator('article p, section p');
  expect(await paragraphs.count()).toBeGreaterThan(0);
});

test('includes JSON-LD structured data (Organization, WebSite, Article)', async ({ page }) => {
  await page.goto(ARTICLE_URL);

  const scripts = page.locator('script[type="application/ld+json"]');
  await expect(scripts).toHaveCount(3);

  const articleLd = await scripts.evaluateAll((nodes) =>
    nodes.map((n) => JSON.parse(n.textContent || '{}')).filter((o) => o['@type'] === 'Article')
  );
  expect(articleLd).toHaveLength(1);
  expect(articleLd[0].headline).toBeTruthy();
});
