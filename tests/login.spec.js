import { test, expect } from './fixtures.js';

test('session Salesforce masih valid', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/lightning|home/);
});