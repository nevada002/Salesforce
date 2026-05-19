import { expect } from '@playwright/test';

export class LoginasSalesPage {
  constructor(page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchBox = page.getByRole('searchbox', { name: 'Search...' });
    this.userDetailButton = page.getByRole('button', { name: 'User Detail' });
    this.loginAsButton = page
      .locator('iframe[name^="vfFrameId"]')
      .contentFrame()
      .getByRole('row', { name: 'User Detail Edit Sharing' })
      .locator('input[name="login"]');
  }

  async loginAsUser(userName) {
    await this.searchButton.click();
    await this.searchBox.fill(userName);
    await this.searchBox.press('Enter');

    await this.page.getByRole('heading', { name: 'People' });
    await this.page.getByRole('link', { name: 'Kintan Pasha' }).click();
    await this.userDetailButton.click();

    await this.page.waitForURL(/ManageUsers/, { timeout: 15000 });
    await this.loginAsButton.click();

    await expect(this.page.getByText(new RegExp(`Logged in as ${userName}`, 'i'))).toBeVisible({ timeout: 15000 });
  }
}
