"""Subset Noto Sans Ethiopic to the characters used in src/i18n/am.json.

The full font is about 200 KB; the subset keeps Amharic pages fast on slow
connections. Re-run after editing am.json (requires: pip install fonttools brotli):

    python scripts/subset-ethiopic.py
"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets-src/fonts/noto-sans-ethiopic-full.woff2"
TARGET = ROOT / "public/fonts/noto-sans-ethiopic.woff2"


def strings(node):
    if isinstance(node, str):
        yield node
    elif isinstance(node, dict):
        for value in node.values():
            yield from strings(value)


text = "".join(strings(json.loads((ROOT / "src/i18n/am.json").read_text(encoding="utf-8"))))
ethiopic = sorted({c for c in text if 0x1200 <= ord(c) <= 0x139F or 0x2D80 <= ord(c) <= 0x2DDF})
# Always keep Ethiopic punctuation (U+1360–U+1368).
codepoints = sorted({ord(c) for c in ethiopic} | set(range(0x1360, 0x1369)))
unicodes = ",".join(f"U+{cp:04X}" for cp in codepoints)

subprocess.run(
    [sys.executable, "-m", "fontTools.subset", str(SOURCE), f"--unicodes={unicodes}",
     "--flavor=woff2", "--layout-features=*", f"--output-file={TARGET}"],
    check=True,
)
print(f"{len(codepoints)} characters, {TARGET.stat().st_size / 1024:.1f} KB -> {TARGET.relative_to(ROOT)}")
