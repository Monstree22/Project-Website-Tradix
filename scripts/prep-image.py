#!/usr/bin/env python3
"""Siapkan gambar untuk situs Tradix: konversi ke WebP dengan ukuran yang tepat.

Pemakaian:
  python3 scripts/prep-image.py poster  <file-asli> <slug>   -> public/images/events/<slug>.webp (lebar 900)
  python3 scripts/prep-image.py pnl     <file-asli> <slug>   -> public/images/pnl/<slug>.webp    (lebar 900)
  python3 scripts/prep-image.py team    <file-asli> <slug> [x1 y1 x2 y2]
                                                         -> public/images/team/<slug>.webp   (lebar 600, opsional crop)

Poster & screenshot TIDAK di-crop: situs menampilkannya utuh (object-fit: contain).
Untuk foto tim, beri koordinat crop kalau sumbernya poster (ambil kepala-bahu, rasio kira-kira 4:5).
Butuh Pillow: pip install pillow
"""
import os
import sys

from PIL import Image

TARGETS = {
    'poster': ('public/images/events', 900, 80),
    'pnl': ('public/images/pnl', 900, 80),
    'team': ('public/images/team', 600, 85),
}


def main() -> None:
    if len(sys.argv) not in (4, 8) or sys.argv[1] not in TARGETS:
        print(__doc__)
        sys.exit(1)
    kind, src, slug = sys.argv[1:4]
    folder, width, quality = TARGETS[kind]
    im = Image.open(src).convert('RGB')
    if len(sys.argv) == 8:
        im = im.crop(tuple(int(v) for v in sys.argv[4:8]))
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    os.makedirs(folder, exist_ok=True)
    out = os.path.join(folder, f'{slug}.webp')
    im.save(out, 'WEBP', quality=quality, method=6)
    ratio = im.width / im.height
    shape = '1/1' if abs(ratio - 1) < 0.03 else '4/5' if abs(ratio - 0.8) < 0.04 else f'lain ({ratio:.2f})'
    print(f'{out}  {im.width}x{im.height}  {os.path.getsize(out) // 1024} KB  rasio: {shape}')


if __name__ == '__main__':
    main()
