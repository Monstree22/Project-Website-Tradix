// Tim Tradix. Foto diambil dari poster event resmi Tradix.
// Tambah orang baru: taruh foto (rasio 4:5, min 600px lebar, .webp) di public/images/team/
// lalu tambahkan objek baru di array `team`.

export type Person = {
  slug: string;
  name: string;
  role: string;
  group: 'eksekutif' | 'mentor';
  photo: string;
  focus: string[];
  bio: string;
};

export const team: Person[] = [
  {
    slug: 'kenzo',
    name: 'Kenzo',
    role: 'Founder Tradix Community',
    group: 'eksekutif',
    photo: '/images/team/kenzo.webp',
    focus: ['Technical Analysis', 'Market Structure', 'Crypto'],
    bio: 'Mendirikan Tradix sebagai tempat belajar trading tanpa hype. Rutin membawakan sesi technical analysis di webinar dan meetup Tradix.',
  },
  {
    slug: 'ihza',
    name: 'Ihza',
    role: 'CEO Tradix Community',
    group: 'eksekutif',
    photo: '/images/team/ihza.webp',
    focus: ['Operasional komunitas', 'Moderator webinar', 'Partnership'],
    bio: 'Menjalankan operasional harian komunitas dan memandu jalannya webinar serta talkshow bersama partner.',
  },
  {
    slug: 'koh',
    name: 'Koh',
    role: 'Technical Analyst Tradix',
    group: 'mentor',
    photo: '/images/team/koh.webp',
    focus: ['Technical Analysis', 'Bedah chart', 'Setup harian'],
    bio: 'Membedah chart dan setup bersama member di grup, serta mengisi sesi teknikal di seminar offline.',
  },
];

export const founder = team.find((p) => p.slug === 'kenzo')!;
