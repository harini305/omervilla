"""
Builds web derivatives of the original Omer Villa media.

Reads   source-assets/uploads/YYYY/MM/<file>   (originals are never modified)
Writes  public/media/<file-stem>-<width>.webp  (480, 960 and full width)
        public/media/brand/*.png               (logos, padding trimmed only)
        src/data/media-manifest.json           (intrinsic sizes, used for aspect ratios)

Run with:  python scripts/prepare-media.py
Requires Pillow. Videos are transcoded separately with ffmpeg (see README).
"""
import json
import os
import re
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source-assets" / "uploads"
OUT = ROOT / "public" / "media"
BRAND = OUT / "brand"
MANIFEST = ROOT / "src" / "data" / "media-manifest.json"

WIDTHS = (480, 960)
QUALITY = 80


def used_stems():
    """Photo names the site's source actually references (media.js only holds
    alt text, so it does not count). Unused photos are not built or deployed."""
    text = ""
    for f in (ROOT / "src").rglob("*.js"):
        if f.name != "media.js":
            text += f.read_text(encoding="utf-8")
    return {m for m in re.findall(r"[\"']([\w.-]+)[\"']", text)}


def build_photos(manifest):
    used = used_stems()
    for path in sorted(SRC.rglob("*")):
        if path.suffix.lower() not in (".jpg", ".jpeg"):
            continue
        stem = path.stem
        if stem not in used:
            continue
        if stem in manifest:
            # 2024/09 and 2024/10 hold byte-identical duplicates of two MATANAI files.
            continue
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        w, h = im.size
        variants = []
        for target in WIDTHS:
            if target >= w:
                continue
            resized = im.resize((target, round(h * target / w)), Image.LANCZOS)
            resized.save(OUT / f"{stem}-{target}.webp", "WEBP", quality=QUALITY, method=6)
            variants.append(target)
        im.save(OUT / f"{stem}-{w}.webp", "WEBP", quality=QUALITY, method=6)
        variants.append(w)
        manifest[stem] = {
            "source": path.relative_to(SRC).as_posix(),
            "width": w,
            "height": h,
            "widths": variants,
        }


def build_brand():
    BRAND.mkdir(parents=True, exist_ok=True)
    for rel in (
        "2024/09/Omer-Logo-clear-black.png",
        "2024/09/Omer-Logo-clear-white.png",
        "2024/10/Omer-Logo-Footer.png",
    ):
        im = Image.open(SRC / rel).convert("RGBA")
        # Trim the transparent padding only; the mark itself is not altered or resized.
        im = im.crop(im.getbbox())
        im.save(BRAND / Path(rel).name, "PNG", optimize=True)
    for rel in ("2024/10/Ig-icon.png", "2024/10/facebook-icon.png"):
        Image.open(SRC / rel).save(BRAND / Path(rel).name, "PNG", optimize=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {}
    build_photos(manifest)
    build_brand()
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    total = sum(f.stat().st_size for f in OUT.glob("*.webp"))
    print(f"{len(manifest)} photos, {total / 1e6:.1f} MB of WebP in {OUT}")


if __name__ == "__main__":
    main()
