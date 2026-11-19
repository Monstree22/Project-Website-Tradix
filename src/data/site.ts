// Data umum situs. Ubah link & angka di sini, semua halaman ikut berubah.

export const site = {
  name: 'Tradix Community',
  tagline: 'Belajar Trading Bersama. Bertumbuh Bersama.',
  description:
    'Komunitas edukasi trading crypto dan forex untuk pemula Indonesia. Gratis, roadmap 8 minggu, webinar, sharing analisa dan meetup offline.',
  whatsapp: 'https://chat.whatsapp.com/CGpNtgEn2gi8q2oRtxJFFy',
  instagram: 'https://www.instagram.com/tradixcommunity/',
  instagramHandle: '@tradixcommunity',
};

// Angka resmi komunitas. Perbarui saat angka berubah.
export const stats = [
  { value: '350+', label: 'member aktif' },
  { value: '20+', label: 'webinar' },
  { value: '200+', label: 'peserta event' },
  { value: '10+', label: 'speaker' },
];

export type NavItem = { label: string; href: string; desc?: string; children?: NavItem[] };

export const nav: NavItem[] = [
  {
    label: 'Tentang',
    href: '/tentang/',
    children: [
      { label: 'Komunitas', href: '/tentang/komunitas/', desc: 'Siapa kami, cara belajar, partner' },
      { label: 'Founder', href: '/tentang/founder/', desc: 'Kenzo, pendiri Tradix' },
      { label: 'Mentorship', href: '/tentang/mentorship/', desc: 'Belajar dibimbing trader aktif' },
      { label: 'Eksekutif', href: '/tentang/eksekutif/', desc: 'Tim yang menjalankan Tradix' },
    ],
  },
  { label: 'Materi', href: '/materi/' },
  { label: 'Performa', href: '/performa/' },
  { label: 'Event', href: '/event/' },
  { label: 'FAQ', href: '/faq/' },
];
