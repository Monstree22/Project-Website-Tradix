// Tim Tradix. Foto diambil dari poster event resmi Tradix.
// group: 'founder' (halaman Founder) atau 'eksekutif' (halaman Eksekutif & Mentorship).
// Tambah orang baru: taruh foto (rasio 4:5, min 600px lebar, .webp) di public/images/team/
// lalu tambahkan objek baru di array `team`.

export type Person = {
  slug: string;
  name: string;
  role: string;
  group: 'founder' | 'eksekutif';
  photo: string;
  focus: string[];
  bio: string;
};

export const team: Person[] = [
  {
    slug: 'kenzo',
    name: 'Kenzo',
    role: 'Founder Tradix Community',
    group: 'founder',
    photo: '/images/team/kenzo.webp',
    focus: ['Technical Analysis', 'Market Structure', 'Crypto'],
    bio: 'Mendirikan Tradix sebagai tempat belajar trading tanpa hype. Rutin membawakan sesi technical analysis di webinar dan meetup Tradix.',
  },
  {
    slug: 'iqbal',
    name: 'Iqbal',
    role: 'Eksekutif Tradix',
    group: 'eksekutif',
    photo: '/images/team/iqbal-eksekutif.webp',
    focus: ['Market Outlook', 'Crypto & Forex'],
    bio: 'Membawakan Market Outlook mingguan Tradix, membahas kondisi market crypto dan forex untuk minggu berjalan.',
  },
  {
    slug: 'zean',
    name: 'Zean',
    role: 'Eksekutif Tradix',
    group: 'eksekutif',
    photo: '/images/team/zean-eksekutif.webp',
    focus: ['Market Outlook', 'Crypto & Forex'],
    bio: 'Membawakan Market Outlook mingguan Tradix, membahas kondisi market crypto dan forex untuk minggu berjalan.',
  },
  {
    slug: 'koh',
    name: 'Koh',
    role: 'Eksekutif Tradix',
    group: 'eksekutif',
    photo: '/images/team/koh-eksekutif.webp',
    focus: ['Technical Analysis', 'Bedah chart', 'Market Outlook'],
    bio: 'Membedah chart dan setup bersama member, mengisi sesi teknikal di seminar offline, dan ikut membawakan Market Outlook mingguan.',
  },
];

export const founder = team.find((p) => p.group === 'founder')!;
export const executives = team.filter((p) => p.group === 'eksekutif');
