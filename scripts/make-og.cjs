// Render scripts/og-image.html menjadi public/og-image.jpg (1200x630). Butuh Playwright.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('file://' + path.join(__dirname, 'og-image.html'), { waitUntil: 'networkidle' });
  await p.screenshot({ path: path.join(__dirname, '..', 'public', 'og-image.jpg'), type: 'jpeg', quality: 85 });
  await b.close();
})();
