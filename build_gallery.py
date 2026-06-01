"""Optimize EVERY source photo in the project folder into photos/gallery/
and write a manifest the website reads to build the gallery grid."""
import os
import json
from pathlib import Path
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None  # allow very large upscaled images


def safe_print(s):
    print(s.encode("ascii", "replace").decode("ascii"))


BASE = Path(r"M:\CR7\CR7 Website Building Demo (Testing)")
OUT = BASE / "photos" / "gallery"
OUT.mkdir(parents=True, exist_ok=True)

EXTS = {".jpg", ".jpeg", ".png", ".webp"}

# Collect every image in the project root (not the photos/ subfolder)
sources = sorted(
    [p for p in BASE.iterdir()
     if p.is_file() and p.suffix.lower() in EXTS],
    key=lambda p: p.name.lower()
)

manifest = []
for i, src in enumerate(sources, start=1):
    try:
        img = Image.open(src)
        img = ImageOps.exif_transpose(img)
        if img.mode != "RGB":
            img = img.convert("RGB")
        w, h = img.size
        scale = min(1.0, 1500 / max(w, h))
        if scale < 1.0:
            img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
        name = f"g{i:02d}.jpg"
        img.save(OUT / name, "JPEG", quality=82, optimize=True)
        manifest.append({
            "src": f"photos/gallery/{name}",
            "w": img.size[0],
            "h": img.size[1],
        })
        kb = (OUT / name).stat().st_size // 1024
        safe_print(f"{name}  {img.size[0]}x{img.size[1]}  {kb} KB  <- {src.name}")
    except Exception as e:
        safe_print(f"SKIP {src.name}: {e}")

with open(OUT / "manifest.json", "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print(f"\nDone. {len(manifest)} photos in gallery manifest.")
