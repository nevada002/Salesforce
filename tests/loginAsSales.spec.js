import { test, expect } from './fixtures.js';

test('berhasil login as sales user', async ({ page, loginasSalesPage }) => {
  await page.goto('/');
  await loginasSalesPage.loginAsUser('Kintan Pasha');
  await expect(page.locator('#oneHeader')).toBeVisible();
});
