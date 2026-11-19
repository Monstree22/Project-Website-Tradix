// Membaca modul belajar dari src/content/modul/minggu-*.md dan memecahnya menjadi halaman buku.
// Aturan: setiap "## Judul" = satu halaman; satu "> kutipan" per halaman = catatan di halaman kiri;
// "<!-- visual: nama -->" = diagram di halaman kiri (lihat src/data/diagrams.ts).

export type ModulPage = { heading: string; html: string; note?: string; visual?: string };
export type Modul = {
  week: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  pages: ModulPage[];
};

type MdModule = {
  frontmatter: { week: number; title: string; subtitle: string; duration: string };
  compiledContent: () => string | Promise<string>;
};

const files = import.meta.glob<MdModule>('../content/modul/minggu-*.md', { eager: true });

function splitPages(html: string): ModulPage[] {
  const parts = html.split(/<h2[^>]*>/).slice(1);
  return parts.map((part) => {
    const end = part.indexOf('</h2>');
    const heading = part.slice(0, end).replace(/<[^>]+>/g, '').trim();
    let body = part.slice(end + 5);
    let visual: string | undefined;
    body = body.replace(/<!--\s*visual:\s*([\w-]+)\s*-->/, (_, name) => {
      visual = name;
      return '';
    });
    let note: string | undefined;
    body = body.replace(/<blockquote>([\s\S]*?)<\/blockquote>/, (_, inner) => {
      note = inner.trim();
      return '';
    });
    return { heading, html: body.trim(), note, visual };
  });
}

let cache: Modul[] | null = null;
export async function getModules(): Promise<Modul[]> {
  if (cache) return cache;
  const list: Modul[] = [];
  for (const f of Object.values(files)) {
    const html = await f.compiledContent();
    const fm = f.frontmatter;
    list.push({ ...fm, slug: `minggu-${fm.week}`, pages: splitPages(html) });
  }
  cache = list.sort((a, b) => a.week - b.week);
  return cache;
}
