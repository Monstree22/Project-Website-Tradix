---
name: tradix-konten
description: Update the content of the Tradix Community website (this Astro repo) — add or edit events, team members (founder, eksekutif, mentor), PnL/performa screenshots, FAQ, the 8-week materi roadmap, member stats or WhatsApp/Instagram links, including preparing posters and photos as WebP. Use this skill whenever the user wants to change what the Tradix site says or shows, even if they phrase it casually ("ada event baru minggu depan", "tambah mentor", "ganti angka member jadi 500", "masukin screenshot profit ini", "update FAQ"), and before touching anything in src/data/ or public/images/.
---

# Tradix: updating site content

The site is a static Astro build. Almost every content change is an edit to one file in `src/data/` plus, sometimes, an image in `public/images/`. Pages read the data files, so you rarely need to touch `src/pages/` or components for a content update; doing so risks breaking layout for no gain.

| Content | File | Images |
|---|---|---|
| Links (WhatsApp, Instagram), tagline, member stats, navigation | `src/data/site.ts` | — |
| Events (webinar, meetup, seminar, talkshow, partnership) | `src/data/events.ts` | `public/images/events/` |
| Founder, eksekutif, mentor | `src/data/team.ts` | `public/images/team/` |
| PnL screenshots (Performa page) | `src/data/performa.ts` | `public/images/pnl/` |
| 8-week roadmap (Materi page) | `src/data/materi.ts` | — |
| FAQ (grouped) | `src/data/faq.ts` | — |

Site copy is Indonesian, casual but clear ("kamu", not "Anda"). Match the tone of the entries already in the file you're editing.

## Workflow

1. **Read the target data file first.** Each file opens with a comment that explains its fields. Copy the shape of an existing entry rather than inventing fields; TypeScript types will fail the build if a field is wrong.
2. **Prepare images** with `python3 scripts/prep-image.py` (see "Images" below).
3. **Edit the data.**
4. **Build and check**: `npm run build`. It must end with `Complete!` and no errors. If the user is around, `npm run dev` lets them preview at http://localhost:4321.
5. **Report** what changed, which pages show it, and anything you had to leave out or assume (see "Honesty rules").

## Events (`events.ts`)

- Put the new event **at the top** of the `events` array.
- `date` is `YYYY-MM-DD`. Any event dated today or later appears automatically under "Event berikutnya" on `/event/` and as "Event mendatang" on the home page at build time. Past events move to the archive by themselves. So after an event date passes, the site only reorganises if it is **rebuilt**. Mention this if the user expects it to change on its own.
- `posterRatio` must match the real poster (`'1/1'` square or `'4/5'` portrait); `prep-image.py` prints the ratio. A wrong value distorts the card's reserved space.
- `place`: venue name plus district/city only, e.g. `'Agreya Coffee, Tanah Baru'`. Drop street numbers. Posters often include a full address, but the site deliberately keeps it short.
- `speakers`: copy names and roles exactly as written on the poster. The founder page lists every event where `name === 'Kenzo'`, so keep his name spelled the same.
- `registerUrl` is optional. Only set it if the user gives a real link.

## Team (`team.ts`)

- `group` is `'eksekutif'` (shown on `/tentang/eksekutif/`) or `'mentor'` (shown on `/tentang/mentorship/` and eksekutif).
- `bio` describes what the person does at Tradix, in one or two sentences. If the user gives no bio, write a neutral one from facts you do have (role, sessions they spoke at) and say so in your report. Do not invent credentials, years of experience or trading results.
- Photos are 4:5 head-and-shoulders crops, 600px wide. If the only source is an event poster, crop the person out with the optional crop box in `prep-image.py`, then look at the result before using it.

## Performa (`performa.ts`)

This page exists to show results **honestly**, because the old site lost credibility by showing only big unrealized wins. So:

- `status` comes from the screenshot itself. "Realized PnL", "Harga Tutup" or "closed" means `'realized'`. "Unrealized PnL", "PnL yang belum terealisasi" or "Harga Terbaru/Terakhir" means `'unrealized'`. If you can't tell, ask; never default to realized.
- Copy `pair`, `side`, `leverage`, `pnl`, `entry` and `last` from the screenshot. `owner` is whose account it is ("Tradix Community", "Member Tradix", ...).
- Losses are welcome. Use `result: 'loss'` and a negative `pnl`. Encourage the user to add them, since a loss makes the page more believable.
- The disclaimer text calculates realized/unrealized counts automatically. Don't edit it to remove the warning.

## FAQ and Materi

- `faq.ts`: add `{ q, a }` to the right group. Answers are short (1–3 sentences) and never promise profit. The FAQ page also emits FAQ structured data automatically.
- `materi.ts`: the 8 weeks are the official curriculum. Change titles or summaries only when the user says the syllabus changed. `topics` are sub-points, 3–5 per week.

## Images

```bash
python3 scripts/prep-image.py poster ~/Downloads/poster.jpg meetup-jakarta-2027
python3 scripts/prep-image.py pnl    ~/Downloads/pnl.jpg   btcusdt-2027-01
python3 scripts/prep-image.py team   ~/Downloads/poster.jpg raka 355 110 765 560   # optional crop box
```

- Output goes to the right folder as `<slug>.webp`. Use lowercase-hyphen slugs and reference them as `/images/<folder>/<slug>.webp`.
- Posters and PnL screenshots are **never cropped**. The site shows them whole with `object-fit: contain`, because cropping cut off titles and speaker names on the old site.
- Keep each image under ~150 KB. The script's defaults land there.
- Delete the original source file if you copied it into the repo; only the `.webp` belongs in `public/`.

## Honesty rules (why they matter)

The site's promise is "edukasi, tanpa hype". Content that looks fabricated undoes that faster than anything else, and promoting leveraged trading carries regulatory risk in Indonesia. So:

- **No invented testimonials, quotes, member counts, partner logos or results.** If the user wants testimonials, they must come from real members (with permission). Ask for the source.
- **Stats** (`site.ts > stats`) change only when the user gives a new number.
- **No profit promises** in any copy ("pasti profit", "cuan konsisten", "balik modal").
- When a field is unknown, leave it out (most are optional) rather than guessing, and list what's missing in your report.

## Things outside a content update

- Changing the domain: build with `SITE_URL=https://domain npm run build`. Canonical tags, sitemap and robots.txt follow.
- Share image: edit `scripts/og-image.html`, then `node scripts/make-og.cjs` (needs Playwright).
- Layout or design changes are not content updates. Say so and treat them as normal development work.
