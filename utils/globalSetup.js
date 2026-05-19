import { chromium, expect } from '@playwright/test';
import 'dotenv/config';

export default async function saveSession() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n>>> Membuka halaman login Salesforce...');
  await page.goto(process.env.SF_URL);
  await page.getByLabel('Username').fill(process.env.SF_USERNAME);
  await page.getByLabel('Password').fill(process.env.SF_PASSWORD);
  await page.getByRole('button', { name: 'Log In to Sandbox', exact: true }).click();

  console.log('>>> Login terkirim. Selesaikan verifikasi OTP di browser...');
  console.log('>>> Menunggu redirect ke halaman utama Salesforce...\n');

  await page.waitForURL(/lightning|home/, { timeout: 120000 });
  await expect(page.locator('#oneHeader')).toBeVisible({ timeout: 15000 });

  await context.storageState({ path: 'auth.json' });
  await browser.close();

  console.log('>>> Session berhasil disimpan ke auth.json');
  console.log('>>> Sekarang kamu bisa jalankan: npm test\n');
}

saveSession().catch((err) => {
  console.error('Gagal menyimpan session:', err.message);
  process.exit(1);
});
