// Hasil trading yang dibagikan di komunitas.
// `status` WAJIB jujur: 'realized' (posisi sudah ditutup) atau 'unrealized' (posisi masih terbuka).
// Disarankan juga menambahkan hasil yang loss supaya gambaran risikonya utuh.

export type Trade = {
  pair: string;
  side: 'Long' | 'Short';
  leverage: string;
  pnl: string;
  result: 'profit' | 'loss';
  status: 'realized' | 'unrealized';
  entry: string;
  last: string;
  date: string;
  owner: string;
  image: string;
};

export const trades: Trade[] = [
  {
    pair: 'ORBIOUSDT',
    side: 'Short',
    leverage: '20x',
    pnl: '+1.059,66%',
    result: 'profit',
    status: 'realized',
    entry: '0.072627',
    last: '0.034147',
    date: '13 Okt',
    owner: 'Monstree',
    image: '/images/pnl/orbiousdt.webp',
  },
  {
    pair: 'MOVRUSDT',
    side: 'Short',
    leverage: '25x',
    pnl: '+426,79%',
    result: 'profit',
    status: 'realized',
    entry: '3.0399',
    last: '2.521',
    date: '2 Okt',
    owner: 'Monstree',
    image: '/images/pnl/movrusdt.webp',
  },
  {
    pair: 'ONUSDT',
    side: 'Short',
    leverage: '20x',
    pnl: '+303,38%',
    result: 'profit',
    status: 'realized',
    entry: '0.34238',
    last: '0.29045',
    date: '29 Juli',
    owner: 'Tradix Community',
    image: '/images/pnl/onusdt.webp',
  },
  {
    pair: 'FETUSDT',
    side: 'Long',
    leverage: '75x',
    pnl: '+325,47%',
    result: 'profit',
    status: 'realized',
    entry: '0.2143',
    last: '0.2236',
    date: '26 Mei',
    owner: 'Monstree',
    image: '/images/pnl/fetusdt.webp',
  },
  {
    pair: 'ZECUSDT',
    side: 'Short',
    leverage: '75x',
    pnl: '+217,77%',
    result: 'profit',
    status: 'realized',
    entry: '297.54',
    last: '288.91',
    date: '17 Feb',
    owner: 'Monstree',
    image: '/images/pnl/zecusdt-0217.webp',
  },
  {
    pair: 'ZECUSDT',
    side: 'Short',
    leverage: '75x',
    pnl: '+257,33%',
    result: 'profit',
    status: 'realized',
    entry: '292.02',
    last: '282.01',
    date: '3 Feb',
    owner: 'Monstree',
    image: '/images/pnl/zecusdt-0203.webp',
  },
];
