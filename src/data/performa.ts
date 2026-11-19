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
    pair: 'ALLOUSDT',
    side: 'Short',
    leverage: '100x',
    pnl: '+272,69%',
    result: 'profit',
    status: 'unrealized',
    entry: '0.49819',
    last: '0.48481',
    date: '23 Juli',
    owner: 'Tradix Community',
    image: '/images/pnl/allousdt.webp',
  },
  {
    pair: 'ENSOUSDT',
    side: 'Long',
    leverage: '50x',
    pnl: '+327,38%',
    result: 'profit',
    status: 'unrealized',
    entry: '0.7957',
    last: '0.8478',
    date: '28 Juli',
    owner: 'Member Tradix',
    image: '/images/pnl/ensousdt.webp',
  },
];
