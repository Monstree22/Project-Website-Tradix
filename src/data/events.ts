// Daftar event. Data diambil dari poster resmi.
// Event baru: tambahkan objek di paling atas, isi `date` format YYYY-MM-DD.
// Event dengan tanggal >= hari ini otomatis tampil di bagian "Event mendatang" saat build.
// Alamat: cukup nama tempat + kelurahan/kota (tanpa nomor rumah).

export type TradixEvent = {
  slug: string;
  title: string;
  type: 'Webinar' | 'Meetup' | 'Seminar' | 'Talkshow' | 'Partnership';
  date?: string; // YYYY-MM-DD
  time?: string;
  place: string;
  city?: string;
  poster: string;
  posterRatio: '1/1' | '4/5';
  speakers: { name: string; role: string }[];
  partners?: string[];
  registerUrl?: string;
};

export const events: TradixEvent[] = [
  {
    slug: 'bgb-builder-bogor',
    title: 'Forex & Crypto Trading Strategies: From Fundamental to Technical Analysis',
    type: 'Seminar',
    date: '2026-07-25',
    time: '17.00–21.00 WIB',
    place: 'Javano Signature',
    city: 'Bogor',
    poster: '/images/events/bgb-bogor.webp',
    posterRatio: '1/1',
    speakers: [
      { name: 'Rafi', role: 'BGB Builder' },
      { name: 'Faaris', role: 'Web3 Enthusiast' },
      { name: 'Kenzo', role: 'Founder Tradix' },
      { name: 'Koh', role: 'Technical Analyst Tradix' },
    ],
    partners: ['BGB Builder', 'UEX Global Alpha'],
  },
  {
    slug: 'webinar-paham-makro',
    title: 'Paham Makro, Kuasai Teknikal',
    type: 'Webinar',
    date: '2026-06-21',
    time: '20.00 WIB',
    place: 'Google Meet',
    city: 'Online',
    poster: '/images/events/webinar-makro.webp',
    posterRatio: '4/5',
    speakers: [
      { name: 'Ihza', role: 'CEO Tradix · Moderator' },
      { name: 'Kenzo', role: 'Founder Tradix · Technical Analysis' },
      { name: 'Iqbal', role: 'Crypto Cuan Madiun · Macro Outlook 2026' },
    ],
    partners: ['BingX', 'Web3 Enthusiast', 'Crypto Cuan Madiun'],
  },
  {
    slug: 'meetup-trader-disiplin',
    title: 'Dari Trader Spekulatif Menjadi Trader Disiplin',
    type: 'Meetup',
    date: '2026-06-19',
    time: '17.00–20.00 WIB',
    place: 'Agreya Coffee, Tanah Baru',
    city: 'Bogor',
    poster: '/images/events/meetup-bogor.webp',
    posterRatio: '4/5',
    speakers: [
      { name: 'Sandi', role: 'Founder Kompaschain' },
      { name: 'Kenzo', role: 'Founder Tradix' },
      { name: 'Andra Dimas', role: 'Host TRIV' },
    ],
    partners: ['TRIV', 'Cryptowave', 'Kompaschain'],
  },
  {
    slug: 'idbw-2026',
    title: 'Indonesia Blockchain Week 2026',
    type: 'Partnership',
    place: 'Partner Squad IDBW 2026',
    poster: '/images/events/idbw-2026.webp',
    posterRatio: '4/5',
    speakers: [],
    partners: ['Indonesia Blockchain Week'],
  },
  {
    slug: 'trivtalks-bekasi',
    title: 'Market Kripto di Tengah Perang AS vs Iran: Opportunity atau Risiko?',
    type: 'Talkshow',
    date: '2026-04-10',
    place: 'Temu Kamu Coffee & Eatery',
    city: 'Bekasi',
    poster: '/images/events/trivtalks-bekasi.webp',
    posterRatio: '4/5',
    speakers: [
      { name: 'Kenzo', role: 'Founder Tradix' },
      { name: 'Ihza', role: 'Tradix' },
      { name: 'Andra Dimas', role: 'Host TRIV' },
    ],
    partners: ['TRIV', 'Cryptowave'],
  },
];

const today = new Date().toISOString().slice(0, 10);
export const upcomingEvents = events
  .filter((e) => e.date && e.date >= today)
  .sort((a, b) => a.date!.localeCompare(b.date!));
export const pastEvents = events.filter((e) => !e.date || e.date < today);

export function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
