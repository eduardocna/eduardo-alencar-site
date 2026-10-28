#!/usr/bin/env python3
"""Gera a miniatura da capa (primeira página) de cada PDF em public/downloads/.

Saída: public/images/covers/<nome>.webp e src/data/covers.json (lista dos nomes),
lida por PublicationCard.astro. CVs ficam de fora. Rodar depois de acrescentar um PDF:
  python3 scripts/generate_covers.py
Requer PyMuPDF (fitz) e Pillow.
"""
import io
import json
from pathlib import Path

import fitz
from PIL import Image

SITE = Path(__file__).resolve().parents[1]
DOWNLOADS = SITE / "public" / "downloads"
COVERS = SITE / "public" / "images" / "covers"
LISTA = SITE / "src" / "data" / "covers.json"


def main() -> None:
    COVERS.mkdir(parents=True, exist_ok=True)
    nomes = []
    for pdf in sorted(DOWNLOADS.glob("*.pdf")):
        if pdf.stem.startswith("cv-"):
            continue
        pagina = fitz.open(pdf)[0]
        zoom = 900 / pagina.rect.width
        pix = pagina.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        im = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        im.thumbnail((420, 600))
        im.save(COVERS / f"{pdf.stem}.webp", "WEBP", quality=82, method=6)
        nomes.append(f"{pdf.stem}.webp")
    LISTA.write_text(json.dumps(nomes, indent=2) + "\n", encoding="utf-8")
    print(f"{len(nomes)} capa(s) em {COVERS.relative_to(SITE)}")


if __name__ == "__main__":
    main()
