# Tradix Community — Website

Situs resmi Tradix Community: komunitas edukasi trading crypto & forex.
Dibangun dengan [Astro](https://astro.build) sebagai **situs statis**: hasil build hanya file HTML/CSS/gambar, jadi bisa di-hosting di server mana pun (VPS + Nginx, cPanel, Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Halaman

| URL | Isi |
|---|---|
| `/` | Beranda: hero, ticker harga live, benefit, roadmap, tim, event, FAQ singkat |
| `/tentang/` | Ringkasan + link ke 4 sub-halaman |
| `/tentang/komunitas/` | Siapa Tradix, ritme kegiatan, partner |
| `/tentang/founder/` | Profil founder + daftar sesi yang dibawakan |
| `/tentang/mentorship/` | Cara kerja mentorship, mentor, format bimbingan |
| `/tentang/eksekutif/` | Tim eksekutif & analis |
| `/materi/` | Roadmap belajar 8 minggu, lengkap dengan sub-topik |
| `/performa/` | Screenshot PnL dengan status realized/unrealized + peringatan risiko |
| `/event/` | Event mendatang (otomatis dari tanggal) + arsip |
| `/faq/` | FAQ per kategori (+ structured data untuk Google) |

## Menjalankan di komputer

Butuh Node.js 22+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # hasil di folder dist/
npm run preview   # cek hasil build
```

## Mengubah konten

Semua konten ada di `src/data/`. Halaman otomatis mengikuti.

| Mau ubah | File |
|---|---|
| Link WhatsApp/Instagram, angka member, menu | `src/data/site.ts` |
| Event | `src/data/events.ts` (+ poster di `public/images/events/`) |
| Founder / eksekutif / mentor | `src/data/team.ts` (+ foto di `public/images/team/`) |
| Screenshot PnL | `src/data/performa.ts` (+ gambar di `public/images/pnl/`) |
| Roadmap materi | `src/data/materi.ts` |
| FAQ | `src/data/faq.ts` |

Siapkan gambar dengan `python3 scripts/prep-image.py` (butuh `pip install pillow`); jalankan tanpa argumen untuk melihat cara pakai.

Kalau pakai Claude Code di repo ini, skill **`tradix-konten`** (`.claude/skills/tradix-konten/`) sudah berisi seluruh aturan ini. Cukup minta misalnya *"tambah event meetup tanggal …"*.

## Deploy ke server sendiri (VPS + Nginx)

1. Build dengan domain final:
   ```bash
   SITE_URL=https://domainkamu.com npm run build
   ```
2. Upload isi folder `dist/` ke server, misalnya `/var/www/tradix`:
   ```bash
   rsync -avz --delete dist/ user@server:/var/www/tradix/
   ```
3. Konfigurasi Nginx:
   ```nginx
   server {
     server_name domainkamu.com www.domainkamu.com;
     root /var/www/tradix;
     index index.html;

     location / {
       try_files $uri $uri/ =404;
     }
     error_page 404 /404.html;

     location ~* \.(webp|png|jpg|css|js|woff2)$ {
       expires 30d;
       add_header Cache-Control "public, immutable";
     }
   }
   ```
4. Pasang HTTPS: `sudo certbot --nginx -d domainkamu.com -d www.domainkamu.com`.

Hosting statis lain (Netlify, Vercel, Cloudflare Pages): build command `npm run build`, output folder `dist`, plus environment variable `SITE_URL`.

## Catatan

- Ticker harga di beranda memakai widget gratis TradingView (data live, tanpa API key).
- Grafik besar di hero beranda (`src/components/TerminalHero.astro`) menampilkan **BTC/USDT 1 menit asli**,
  diambil langsung dari browser pengunjung: Binance (mirror publik `data-api.binance.vision`), cadangan OKX.
  Kalau keduanya gagal, grafik otomatis memakai data simulasi berlabel "Ilustrasi".
  BingX belum bisa dipakai langsung karena API-nya menolak permintaan dari browser (CORS); kalau nanti mau,
  tambahkan proxy di server sendiri, misalnya di Nginx:
  ```nginx
  location /api/bingx/ {
    proxy_pass https://open-api.bingx.com/;
    proxy_set_header Host open-api.bingx.com;
    proxy_ssl_server_name on;
  }
  ```
  lalu tambahkan sumber `/api/bingx/openApi/spot/v2/market/kline?symbol=BTC-USDT&interval=1m&limit=…` di `SOURCES`.
- Gambar share sosial media: `public/og-image.jpg`, dibuat dari `scripts/og-image.html` lewat `node scripts/make-og.cjs`.
- Foto tim saat ini dipotong dari poster event. Ganti dengan foto asli resolusi lebih tinggi bila ada.
