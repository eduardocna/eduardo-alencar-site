#!/usr/bin/env python3
"""Validate the public catalogue before an Astro build."""
from __future__ import annotations
import json, re, sys
from datetime import date
from pathlib import Path
from urllib.parse import urlparse
ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'src' / 'data' / 'catalog-public.json'
REQUIRED = {'slug','title','authors','year','type','languages','summary','themes','methods','status','canonical_source','public_url','rights','last_checked','access'}
VALID_ACCESS = {'publico','resumo_publico','interno'}
def fail(message: str) -> None:
    print(f'ERROR: {message}', file=sys.stderr); raise SystemExit(1)
def main() -> None:
    data = json.loads(CATALOG.read_text(encoding='utf-8'))
    if data.get('schema_version') != 2: fail('Unsupported or missing schema_version.')
    items = data.get('items')
    if not isinstance(items, list) or not items: fail('Catalogue has no items.')
    slugs: set[str] = set()
    for item in items:
        missing = REQUIRED - item.keys()
        if missing: fail(f"{item.get('slug', '<unknown>')}: missing {', '.join(sorted(missing))}")
        slug = item['slug']
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug): fail(f'{slug}: slug must be lowercase kebab-case.')
        if slug in slugs: fail(f'{slug}: duplicate slug.')
        slugs.add(slug)
        if item['access'] not in VALID_ACCESS: fail(f'{slug}: invalid access classification.')
        if not item['authors'] or not item['languages'] or not item['summary'].strip(): fail(f'{slug}: authors, languages and summary must be present.')
        public_url = item['public_url']
        if public_url:
            parsed = urlparse(public_url)
            if not ((parsed.scheme == 'https' and parsed.netloc) or public_url.startswith('/downloads/')):
                fail(f'{slug}: public_url must be HTTPS, an approved download, or empty for a summary-only record.')
            if 'eduardocnalencar.com' in public_url:
                fail(f'{slug}: placeholder custom-domain URL is not allowed before cutover.')
        try: checked = date.fromisoformat(item['last_checked'])
        except ValueError: fail(f'{slug}: last_checked must be ISO date.')
        if checked > date.today(): fail(f'{slug}: last_checked cannot be in the future.')
        if item['access'] == 'publico' and not item.get('public_file') and not item.get('repository_url') and not public_url: fail(f'{slug}: public items need a public file, approved URL, or repository URL.')
        if item['access'] == 'resumo_publico' and not item['rights'].strip(): fail(f'{slug}: summary-only record must state a publication boundary in rights.')
    localized = (ROOT / 'src' / 'data' / 'catalog.ts').read_text(encoding='utf-8')
    for slug in slugs:
        if f"'{slug}':" not in localized: fail(f'{slug}: missing localized catalogue entry.')
    print(f'OK: {len(items)} catalogue records and localized entries validated.')
if __name__ == '__main__': main()
