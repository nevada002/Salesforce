import { chromium, expect } from '@playwright/test';
import 'dotenv/config';
import { LoginPage } from '../pages/LoginPage.js';

export default async function saveSession() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  console.log('\n>>> Membuka halaman login Salesforce...');
  await loginPage.goto();
  await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);

  console.log('>>> Login terkirim. Selesaikan verifikasi OTP di browser...');
  console.log('>>> Menunggu redirect ke halaman utama Salesforce...\n');

  await page.waitForURL(/lightning|home/, { timeout: 120000 });
  await expect(page.getByRole('banner')).toBeVisible();

  await context.storageState({ path: 'auth.json' });
  await browser.close();

  console.log('>>> Session berhasil disimpan ke auth.json');
  console.log('>>> Sekarang kamu bisa jalankan: npm test\n');
}

saveSession().catch((err) => {
  console.error('Gagal menyimpan session:', err.message);
  process.exit(1);
});
