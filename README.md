# Salesforce Automation

Automation testing untuk aplikasi Salesforce menggunakan [Playwright](https://playwright.dev/).

## Struktur Project

```
├── pages/                  # Page Object Model
│   ├── LoginPage.js        # Halaman login Salesforce
│   └── LoginasSalesPage.js # Login as sales user via Setup
├── tests/                  # Test scripts
│   ├── fixtures.js         # Custom fixtures Playwright
│   ├── login.spec.js       # Validasi session login
│   └── loginAsSales.spec.js# Test login as sales user
├── utils/
│   └── globalSetup.js      # Script simpan session login
├── .env.example            # Template environment variables
└── playwright.config.js    # Konfigurasi Playwright
```

## Prasyarat

- Node.js v18+
- npm

## Instalasi

```bash
npm install
npx playwright install chromium
```

## Konfigurasi

Salin file `.env.example` menjadi `.env` lalu isi dengan credential Salesforce:

```bash
cp .env.example .env
```

```env
SF_URL=https://your-instance.sandbox.my.salesforce.com/
SF_USERNAME=your.email@domain.com
SF_PASSWORD=yourpassword
```

## Cara Menjalankan

### 1. Simpan session login (wajib sebelum pertama kali test)

```bash
npm run setup
```

Browser akan terbuka → login manual → selesaikan verifikasi OTP → browser otomatis tertutup dan session tersimpan ke `auth.json`.

> Ulangi langkah ini jika session expired.

### 2. Jalankan semua test

```bash
npm test
```

### 3. Jalankan dengan browser terlihat

```bash
npm run test:headed
```

### 4. Lihat laporan hasil test

```bash
npm run test:report
```

## Test yang Tersedia

| File | Nama Test | Deskripsi |
|------|-----------|-----------|
| `login.spec.js` | session Salesforce masih valid | Memvalidasi session login masih aktif |
| `loginAsSales.spec.js` | berhasil login as sales user | Login as Kintan Pasha via Setup > Users |

## Teknologi

- [Playwright](https://playwright.dev/) - Framework automation testing
- [dotenv](https://github.com/motdotla/dotenv) - Manajemen environment variables
