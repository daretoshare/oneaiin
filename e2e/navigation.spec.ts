import { test, expect } from '@playwright/test';

test('defaults to dark theme and toggles to light', async ({ page }) => {
  await page.goto('/');

  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);

  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(html).not.toHaveClass(/dark/);

  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(html).toHaveClass(/dark/);
});

test('search modal opens and returns results', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Search' }).click();
  const input = page.getByPlaceholder('Search articles & knowledge base…');
  await expect(input).toBeVisible();
  await input.fill('model risk');

  // Results render as <h3> links inside the modal.
  await expect(page.locator('h3').first()).toBeVisible();
});

test('clearing the search query shows empty-state hint', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search' }).click();
  const input = page.getByPlaceholder('Search articles & knowledge base…');
  await input.fill('model risk');
  await input.fill('');

  await expect(page.getByText(/search titles, excerpts/i)).toBeVisible();
});
