import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL dipakai untuk canonical URL, og:url dan sitemap.
// Saat pindah ke server sendiri, build dengan: SITE_URL=https://domainkamu.com npm run build
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://tradix-community.vercel.app',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
