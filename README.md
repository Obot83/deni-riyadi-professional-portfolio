# Aplikasi Web Portofolio

Aplikasi web portofolio ini dibangun menggunakan React, TypeScript, Tailwind CSS, dan dihubungkan dengan layanan Firebase (Database dan Storage).

## Cara Menjalankan Website ini di Local (Laptop/PC Anda)

Agar dapat menjalankan dan memodifikasi aplikasi portofolio ini di komputer lokal Anda, ikuti langkah-langkah di bawah ini:

### 1. Persiapan (Prerequisites)
Pastikan Anda sudah menginstal program berikut di komputer Anda:
- **Node.js** (Versi 18 ke atas disarankan). Anda dapat mengunduhnya di [https://nodejs.org/](https://nodejs.org/).
- Code editor seperti **Visual Studio Code (VS Code)**.

### 2. Buka Folder Project
- Jika Anda mendownload kode dalam bentuk `ZIP` file, pastikan untuk mengekstrak (unzip) foldernya terlebih dahulu.
- Buka folder aplikasi tersebut di VS Code.
- Buka Terminal di VS Code melalui menu `Terminal > New Terminal`.

### 3. Install Dependensi (Library)
Di dalam terminal (pastikan lokasinya sama dengan lokasi file `package.json`), ketikkan perintah berikut untuk mengunduh semua pustaka (library) yang dibutuhkan aplikasi:
```bash
npm install
```
Tunggu hingga proses instalasi library selesai.

### 4. Konfigurasi Firebase
Karena aplikasi ini terhubung ke Firebase, pastikan konfigurasi Firebase tetap tersedia di project (seperti file `firebase-applet-config.json`). Jika kode sudah berjalan di environment ini, konfigurasi tersebut seharusnya sudah tersimpan dalam proyek saat Anda mendownloadnya.

### 5. Menjalankan Aplikasi
Setelah berhasil menginstal seluruh library, Anda bisa menjalankan server web lokal untuk aplikasi portofolio ini dengan perintah:
```bash
npm run dev
```

### 6. Buka di Browser
Jika perintah sebelumnya berhasil dijalankan, informasi server local akan muncul di terminal (biasanya berada di port 3000).
- Buka web browser kesayangan Anda (misal Google Chrome atau Safari)
- Pergi ke alamat URL berikut:
  **http://localhost:3000**

Sekarang aplikasi portofolio akan muncul dan berjalan secara interaktif di laptop Anda! Setiap perubahan file kode yang Anda simpan akan secara instan mengubah tampilan pada browser tersebut.
