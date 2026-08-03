#!/usr/bin/env python3
"""Génère les icônes PWA PNG depuis le favicon.svg (dessiné avec PIL)."""
from PIL import Image, ImageDraw

def make_icon(size: int, path: str) -> None:
    scale = size / 64
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # rect arrondi fond #1a1a1a
    radius = int(14 * scale)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill="#1a1a1a")
    # grand cercle #f7f8fa
    r_big = int(14 * scale)
    cx = cy = size // 2
    d.ellipse([cx - r_big, cy - r_big, cx + r_big, cy + r_big], fill="#f7f8fa")
    # petit cercle #1a1a1a
    r_small = int(4 * scale)
    d.ellipse([cx - r_small, cy - r_small, cx + r_small, cy + r_small], fill="#1a1a1a")
    img.save(path, "PNG")
    print(f"OK {path} ({size}x{size})")

make_icon(192, "public/icons/icon-192.png")
make_icon(512, "public/icons/icon-512.png")
make_icon(180, "public/icons/apple-touch-icon.png")
