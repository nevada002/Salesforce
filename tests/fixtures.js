import { test as base, expect } from '@playwright/test';
import { LoginasSalesPage } from '../pages/LoginasSalesPage.js';

export const test = base.extend({
  loginasSalesPage: async ({ page }, use) => {
    await use(new LoginasSalesPage(page));
  },
});

export { expect };
