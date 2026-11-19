// Diagram untuk halaman kiri modul buku. Dipanggil dari markdown dengan:
//   <!-- visual: nama-diagram -->
// Semua diagram digambar sebagai SVG (lihat src/components/Diagram.astro) dan
// dianimasikan saat halamannya terbuka.

export type Tone = 'up' | 'down' | 'accent' | 'ink' | 'muted' | 'warn';
export type CandleIn = number | { o: number; h: number; l: number; c: number };
export type Mark = { i: number; label: string; pos?: 'above' | 'below'; tone?: Tone };
export type HLine = { p: number; label: string; tone?: Tone; dash?: boolean };
export type Zone = { p1: number; p2: number; label: string; tone?: Tone };
export type PathPoint = { x: number; p: number; label?: string; pos?: 'above' | 'below' };
export type Series = { points: PathPoint[]; tone?: Tone; label?: string };

export type Diagram =
  | {
      type: 'chart';
      title: string;
      candles?: CandleIn[];
      series?: Series[];
      xMax?: number; // untuk chart tanpa candle
      marks?: Mark[];
      lines?: HLine[];
      zones?: Zone[];
    }
  | { type: 'bars'; title: string; unit?: string; bars: { label: string; value: number; display: string; tone?: Tone }[] }
  | { type: 'book'; title: string; asks: [number, number][]; bids: [number, number][] }
  | { type: 'timeline'; title: string; note?: string; events: { t: string; s: string; dim?: boolean }[] }
  | { type: 'table'; title: string; head?: string[]; rows: (string | { text: string; tone: Tone })[][] }
  | { type: 'anatomy'; title: string };

export const diagrams: Record<string, Diagram> = {
  // ---------- minggu 1 ----------
  'supply-demand': {
    type: 'chart',
    title: 'Harga = tarik-menarik pembeli dan penjual',
    candles: [20, 21, 23, 22, 25, 27, 26, 29, 31, 30, 28, 26, 27, 24, 22, 21],
    marks: [
      { i: 8, label: 'Pembeli dominan', pos: 'above', tone: 'up' },
      { i: 14, label: 'Penjual dominan', pos: 'below', tone: 'down' },
    ],
  },
  'order-types': {
    type: 'chart',
    title: 'Tiga jenis order di satu chart',
    candles: [50, 51, 50.5, 52, 51, 52.5, 51.5, 52, 51],
    lines: [
      { p: 55.5, label: 'Stop buy (masuk saat breakout)', tone: 'accent', dash: true },
      { p: 51, label: 'Harga sekarang (market order)', tone: 'ink' },
      { p: 47.5, label: 'Limit buy (menunggu harga turun)', tone: 'up', dash: true },
      { p: 45, label: 'Stop loss', tone: 'down', dash: true },
    ],
  },
  orderbook: {
    type: 'book',
    title: 'Order book BTC/USDT (contoh)',
    asks: [
      [64012, 1.8],
      [64008, 0.9],
      [64005, 2.6],
      [64002, 1.2],
    ],
    bids: [
      [63998, 1.5],
      [63995, 2.9],
      [63991, 1.1],
      [63987, 2.2],
    ],
  },
  leverage: {
    type: 'bars',
    title: 'Leverage 10x: untung dan rugi ikut membesar',
    unit: '$',
    bars: [
      { label: 'Modal (margin)', value: 100, display: '$100', tone: 'ink' },
      { label: 'Posisi dengan 10x', value: 1000, display: '$1.000', tone: 'accent' },
      { label: 'Harga naik 10% → untung', value: 100, display: '+$100', tone: 'up' },
      { label: 'Harga turun 10% → rugi', value: 100, display: '−$100 (margin habis)', tone: 'down' },
    ],
  },

  // ---------- minggu 2 ----------
  'candle-anatomy': { type: 'anatomy', title: 'Anatomi candlestick' },
  hammer: {
    type: 'chart',
    title: 'Hammer setelah penurunan',
    candles: [40, 38.5, 39, 37, 35.5, 36, 34, 32.5, { o: 32.3, h: 33.1, l: 29.4, c: 32.9 }, 34.5, 36, 35.5, 37.5],
    marks: [{ i: 8, label: 'Hammer: wick bawah panjang', pos: 'below', tone: 'up' }],
  },
  engulfing: {
    type: 'chart',
    title: 'Bullish engulfing',
    candles: [31, 30.2, 30.6, 29.4, 28.6, 28, { o: 28, h: 28.2, l: 27, c: 27.2 }, { o: 27, h: 29.4, l: 26.8, c: 29.1 }, 30, 30.8, 30.4, 31.6],
    marks: [{ i: 7, label: 'Body hijau menelan body merah', pos: 'below', tone: 'up' }],
  },
  'candle-context': {
    type: 'chart',
    title: 'Pola yang sama, lokasi berbeda',
    candles: [30, 29, { o: 29, h: 29.6, l: 27.4, c: 29.3 }, 28, 27, 25, 24, 22.5, { o: 22.2, h: 22.9, l: 20.3, c: 22.7 }, 24, 25.5, 25, 27],
    zones: [{ p1: 20.2, p2: 21.6, label: 'Zona support', tone: 'up' }],
    marks: [
      { i: 2, label: 'Di tengah: lemah', pos: 'above', tone: 'muted' },
      { i: 8, label: 'Di support: kuat', pos: 'below', tone: 'up' },
    ],
  },

  // ---------- minggu 3 ----------
  'sr-range': {
    type: 'chart',
    title: 'Harga memantul di antara dua zona',
    candles: [22, 25, 28, 29.5, 27, 24, 21, 20.6, 23, 26, 29, 29.8, 26, 23, 20.8, 22.5, 25],
    zones: [
      { p1: 29.2, p2: 30.6, label: 'Resistance', tone: 'down' },
      { p1: 19.8, p2: 21.2, label: 'Support', tone: 'up' },
    ],
  },
  swings: {
    type: 'chart',
    title: 'Menarik level dari swing high dan swing low',
    candles: [20, 23, 26, 24, 22, 25, 28, 31, 29, 27, 28.5, 30.5, 33, 31],
    lines: [{ p: 31.3, label: 'Level dari swing high', tone: 'accent', dash: true }],
    marks: [
      { i: 7, label: 'Swing high', pos: 'above', tone: 'down' },
      { i: 4, label: 'Swing low', pos: 'below', tone: 'up' },
      { i: 9, label: 'Swing low', pos: 'below', tone: 'up' },
    ],
  },
  zone: {
    type: 'chart',
    title: 'Zona menangkap wick yang menusuk',
    candles: [58, 56.5, 55, 53, 52, { o: 52, h: 52.6, l: 49.2, c: 51.8 }, 54, 55, 53.5, { o: 53.5, h: 54, l: 49.7, c: 52.6 }, 55, 57],
    zones: [{ p1: 49.1, p2: 51.2, label: 'Zona support', tone: 'up' }],
    lines: [{ p: 47.6, label: 'Stop loss di luar zona', tone: 'down', dash: true }],
  },
  fakeout: {
    type: 'chart',
    title: 'Fakeout: tembus sebentar, lalu kembali',
    candles: [33, 35, 37, 39, 40.4, 38, 36, 38.5, 40, { o: 40, h: 44, l: 39.8, c: 42.5 }, { o: 42.5, h: 43, l: 38.4, c: 38.9 }, 36.5, 35],
    zones: [{ p1: 40, p2: 41.5, label: 'Resistance', tone: 'down' }],
    marks: [
      { i: 9, label: 'Tembus', pos: 'above', tone: 'accent' },
      { i: 11, label: 'Kembali ke range', pos: 'below', tone: 'down' },
    ],
  },
  'role-flip': {
    type: 'chart',
    title: 'Break and retest',
    candles: [24, 26, 28, 30.5, 28.5, 27, 29, 30.8, { o: 30.8, h: 34.5, l: 30.6, c: 34 }, 35, 33.5, { o: 33.5, h: 33.8, l: 31, c: 32.6 }, 35, 37, 38.5],
    zones: [{ p1: 30, p2: 31.5, label: 'Resistance → support', tone: 'accent' }],
    marks: [{ i: 11, label: 'Retest', pos: 'below', tone: 'up' }],
  },

  // ---------- minggu 4 ----------
  uptrend: {
    type: 'chart',
    title: 'Uptrend: HH dan HL',
    xMax: 8,
    series: [
      {
        tone: 'up',
        points: [
          { x: 0, p: 20 },
          { x: 1, p: 28, label: 'HH', pos: 'above' },
          { x: 2, p: 24, label: 'HL', pos: 'below' },
          { x: 3.5, p: 32, label: 'HH', pos: 'above' },
          { x: 4.5, p: 27.5, label: 'HL', pos: 'below' },
          { x: 6, p: 36, label: 'HH', pos: 'above' },
          { x: 7, p: 31, label: 'HL', pos: 'below' },
          { x: 8, p: 39 },
        ],
      },
    ],
  },
  downtrend: {
    type: 'chart',
    title: 'Downtrend: LH dan LL',
    xMax: 8,
    series: [
      {
        tone: 'down',
        points: [
          { x: 0, p: 39 },
          { x: 1, p: 31, label: 'LL', pos: 'below' },
          { x: 2, p: 35, label: 'LH', pos: 'above' },
          { x: 3.5, p: 27, label: 'LL', pos: 'below' },
          { x: 4.5, p: 31.5, label: 'LH', pos: 'above' },
          { x: 6, p: 23, label: 'LL', pos: 'below' },
          { x: 7, p: 27, label: 'LH', pos: 'above' },
          { x: 8, p: 20 },
        ],
      },
    ],
  },
  bos: {
    type: 'chart',
    title: 'Break of structure ke atas',
    xMax: 9,
    lines: [{ p: 31, label: 'Lower high terakhir', tone: 'muted', dash: true }],
    series: [
      {
        tone: 'accent',
        points: [
          { x: 0, p: 40 },
          { x: 1, p: 30, label: 'LL', pos: 'below' },
          { x: 2, p: 35, label: 'LH', pos: 'above' },
          { x: 3, p: 26, label: 'LL', pos: 'below' },
          { x: 4, p: 31, label: 'LH', pos: 'above' },
          { x: 5, p: 23.5, label: 'LL', pos: 'below' },
          { x: 6.5, p: 34, label: 'BOS', pos: 'above' },
          { x: 7.5, p: 29, label: 'HL', pos: 'below' },
          { x: 9, p: 37 },
        ],
      },
    ],
  },
  phases: {
    type: 'chart',
    title: 'Empat fase market',
    xMax: 20,
    series: [
      {
        tone: 'accent',
        points: [
          { x: 0, p: 31 },
          { x: 1, p: 29, label: 'Akumulasi', pos: 'below' },
          { x: 2, p: 31.5 },
          { x: 3, p: 29.5 },
          { x: 4, p: 31 },
          { x: 5.5, p: 37 },
          { x: 6.5, p: 35 },
          { x: 8, p: 42, label: 'Markup', pos: 'above' },
          { x: 9, p: 40 },
          { x: 10.5, p: 48 },
          { x: 11.5, p: 46 },
          { x: 12.5, p: 49, label: 'Distribusi', pos: 'above' },
          { x: 13.5, p: 46.5 },
          { x: 14.5, p: 48.5 },
          { x: 16, p: 41 },
          { x: 17, p: 43 },
          { x: 18.5, p: 35, label: 'Markdown', pos: 'below' },
          { x: 19.2, p: 36.5 },
          { x: 20, p: 31 },
        ],
      },
    ],
  },

  // ---------- minggu 5 ----------
  recovery: {
    type: 'bars',
    title: 'Kenaikan yang dibutuhkan untuk balik modal',
    bars: [
      { label: 'Rugi 10%', value: 11.1, display: 'butuh +11%', tone: 'warn' },
      { label: 'Rugi 25%', value: 33.3, display: 'butuh +33%', tone: 'warn' },
      { label: 'Rugi 50%', value: 100, display: 'butuh +100%', tone: 'down' },
      { label: 'Rugi 75%', value: 300, display: 'butuh +300%', tone: 'down' },
    ],
  },
  'risk-streak': {
    type: 'bars',
    title: 'Sisa modal setelah 10 kali rugi beruntun',
    bars: [
      { label: 'Risiko 1% per posisi', value: 90.4, display: '90%', tone: 'up' },
      { label: 'Risiko 2% per posisi', value: 81.7, display: '82%', tone: 'up' },
      { label: 'Risiko 5% per posisi', value: 59.9, display: '60%', tone: 'warn' },
      { label: 'Risiko 10% per posisi', value: 34.9, display: '35%', tone: 'down' },
    ],
  },
  'stop-placement': {
    type: 'chart',
    title: 'Stop loss di bawah higher low',
    candles: [20, 22, 24, 23, 21.6, { o: 21.6, h: 22.6, l: 20.4, c: 22.4 }, 24, 25.5, 25, 26.5],
    lines: [
      { p: 22.4, label: 'Entry', tone: 'accent' },
      { p: 19.5, label: 'Stop loss: di bawah higher low', tone: 'down', dash: true },
    ],
    marks: [{ i: 5, label: 'Higher low', pos: 'below', tone: 'up' }],
  },
  'risk-reward': {
    type: 'chart',
    title: 'Risk-to-reward 1:2',
    candles: [52, 51, 50.5, 49.6, 50.2, 51, 52, 53.5, 55, 56.2],
    zones: [
      { p1: 50, p2: 56, label: 'Target: 2R', tone: 'up' },
      { p1: 47, p2: 50, label: 'Risiko: 1R', tone: 'down' },
    ],
    lines: [{ p: 50, label: 'Entry', tone: 'ink' }],
  },
  liquidation: {
    type: 'bars',
    title: 'Jarak harga sampai likuidasi (kira-kira)',
    bars: [
      { label: 'Leverage 10x', value: 10, display: '±10%', tone: 'up' },
      { label: 'Leverage 20x', value: 5, display: '±5%', tone: 'warn' },
      { label: 'Leverage 50x', value: 2, display: '±2%', tone: 'down' },
      { label: 'Leverage 100x', value: 1, display: '±1%', tone: 'down' },
    ],
  },

  // ---------- minggu 6 ----------
  calendar: {
    type: 'table',
    title: 'Contoh isi kalender ekonomi',
    head: ['Data', 'Negara', 'Dampak'],
    rows: [
      ['CPI (inflasi)', 'AS', { text: 'Tinggi', tone: 'down' }],
      ['FOMC (suku bunga)', 'AS', { text: 'Tinggi', tone: 'down' }],
      ['NFP (tenaga kerja)', 'AS', { text: 'Tinggi', tone: 'down' }],
      ['PMI manufaktur', 'AS', { text: 'Sedang', tone: 'warn' }],
      ['Klaim pengangguran', 'AS', { text: 'Sedang', tone: 'warn' }],
    ],
  },
  rates: {
    type: 'chart',
    title: 'Suku bunga naik, aset berisiko tertekan',
    xMax: 8,
    series: [
      {
        tone: 'down',
        label: 'Suku bunga',
        points: [
          { x: 0, p: 20 },
          { x: 2, p: 22 },
          { x: 4, p: 30 },
          { x: 6, p: 36 },
          { x: 8, p: 37 },
        ],
      },
      {
        tone: 'accent',
        label: 'Aset berisiko',
        points: [
          { x: 0, p: 40 },
          { x: 2, p: 41 },
          { x: 3.5, p: 35 },
          { x: 5, p: 30 },
          { x: 6.5, p: 27 },
          { x: 8, p: 28 },
        ],
      },
    ],
  },
  'news-spike': {
    type: 'chart',
    title: 'Lonjakan saat rilis data',
    candles: [50, 50.3, 49.9, 50.2, 50, { o: 50, h: 53.6, l: 47.1, c: 52.6 }, 52, 53, 52.4, 53.5],
    marks: [{ i: 5, label: 'Rilis CPI', pos: 'above', tone: 'accent' }],
  },

  // ---------- minggu 7 ----------
  halving: {
    type: 'timeline',
    title: 'Halving Bitcoin',
    note: 'Hadiah per blok: 50 → 25 → 12,5 → 6,25 → 3,125 BTC',
    events: [
      { t: '2012', s: 'Halving 1' },
      { t: '2016', s: 'Halving 2' },
      { t: '2020', s: 'Halving 3' },
      { t: '2024', s: 'April 2024' },
      { t: '±2028', s: 'Berikutnya', dim: true },
    ],
  },
  dominance: {
    type: 'chart',
    title: 'Rotasi uang: BTC dulu, altcoin belakangan',
    xMax: 10,
    series: [
      {
        tone: 'warn',
        label: 'Dominasi BTC',
        points: [
          { x: 0, p: 40 },
          { x: 2, p: 44, label: '1. BTC naik', pos: 'above' },
          { x: 4, p: 47 },
          { x: 6, p: 44, label: '2. ETH menyusul', pos: 'above' },
          { x: 8, p: 38 },
          { x: 10, p: 33 },
        ],
      },
      {
        tone: 'up',
        label: 'Altcoin',
        points: [
          { x: 0, p: 22 },
          { x: 3, p: 23 },
          { x: 6, p: 27 },
          { x: 8.5, p: 36, label: '3. Altseason', pos: 'above' },
          { x: 10, p: 40 },
        ],
      },
    ],
  },

  // ---------- minggu 8 ----------
  'emotion-cycle': {
    type: 'chart',
    title: 'Siklus emosi trader',
    xMax: 10,
    series: [
      {
        tone: 'accent',
        points: [
          { x: 0, p: 22 },
          { x: 1.5, p: 27, label: 'Harapan', pos: 'below' },
          { x: 3, p: 34 },
          { x: 4.2, p: 41, label: 'Euforia', pos: 'above' },
          { x: 5.4, p: 35, label: 'Cemas', pos: 'above' },
          { x: 6.6, p: 27, label: 'Panik', pos: 'above' },
          { x: 7.8, p: 20, label: 'Menyerah', pos: 'below' },
          { x: 9, p: 23 },
          { x: 10, p: 26 },
        ],
      },
    ],
  },
  journal: {
    type: 'table',
    title: 'Contoh satu baris jurnal',
    rows: [
      ['Aset', 'BTC/USDT · 4H'],
      ['Setup', 'Rejection di support, uptrend'],
      ['Entry / SL / TP', '63.200 / 62.400 / 64.800'],
      ['Risiko', '1% modal'],
      ['Hasil', { text: '+2R', tone: 'up' }],
      ['Ikut rencana?', { text: 'Ya', tone: 'up' }],
      ['Emosi', 'Tenang, sempat ragu di tengah'],
    ],
  },
};
