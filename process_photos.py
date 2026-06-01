"""Optimize selected CR7 photos for web use into the photos/ folder."""
import os
from PIL import Image, ImageOps

BASE = r"M:\CR7\CR7 Website Building Demo (Testing)"
OUT = os.path.join(BASE, "photos")
os.makedirs(OUT, exist_ok=True)

# source filename -> (web name, max dimension)
JOBS = {
    "cr7.jpg":                                              ("hero.jpg", 1920),
    "ebe492696317fa2524f1f4d65e816be9.jpg":                 ("era-manutd.jpg", 1100),
    "cristiano-ronaldo-5120x2880-9622.jpg":                 ("era-manutd-return.jpg", 1500),
    "1666561f2af20138d0473b6e529c0a79.jpg":                 ("era-madrid.jpg", 1100),
    "skysports-ronaldo-real-madrid-bayern-munich_3933872.jpg": ("madrid-action.jpg", 1400),
    "1a1beb063467fa54da743d31f6fc499f.jpg":                 ("era-juventus.jpg", 1100),
    "97a0d1e886013edfa49f7906f9fe9a48.jpg":                 ("era-alnassr.jpg", 1100),
    "cristiano-ronaldo-4k-2018-1z.jpg":                     ("era-portugal.jpg", 1500),
    "CR7 WALLPAPERS.jpg":                                   ("gallery-1.jpg", 1400),
    "cristiano-ronaldo-4757x3171-9685.jpg":                 ("gallery-2.jpg", 1400),
    "gettyimages-2218687117-2048x2048.jpg":                 ("gallery-3.jpg", 1300),
    "Cristiano Ronaldo (1).jpg":                            ("gallery-4.jpg", 1400),
    "wp15508648-cristiano-ronaldo-2025-portugal-wallpapers.jpg": ("gallery-5.jpg", 1400),
    "gettyimages-2221226293-2048x2048.jpg":                 ("gallery-6.jpg", 1300),
    "download (1).jpg":                                     ("gallery-7.jpg", 1300),
    "f1f2ea50376043.58cf6e04d4bd5.webp":                    ("gallery-8.jpg", 1100),
}

for src, (dst, maxdim) in JOBS.items():
    src_path = os.path.join(BASE, src)
    if not os.path.exists(src_path):
        print(f"MISSING: {src}")
        continue
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)  # apply EXIF rotation
    if img.mode in ("RGBA", "P", "LA"):
        img = img.convert("RGB")
    w, h = img.size
    scale = min(1.0, maxdim / max(w, h))
    if scale < 1.0:
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    out_path = os.path.join(OUT, dst)
    img.save(out_path, "JPEG", quality=84, optimize=True)
    kb = os.path.getsize(out_path) // 1024
    print(f"{dst:28s} {img.size[0]}x{img.size[1]}  {kb} KB")

print("Done.")
