#!/usr/bin/env python3
"""Fetch the full WP media library manifest from picpong.biz REST API.

Output: docs/analysis/picpong/media-raw.json
The default orderby=date returns [] (server quirk on attachments), so we use
orderby=id&order=asc which returns all rows reliably.
"""
import json, time, urllib.request, urllib.error, os, sys

BASE = "https://www.picpong.biz/wp-json/wp/v2/media"
OUT = os.path.join(os.path.dirname(__file__), "..", "media-raw.json")
PER = 100

def get(url, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 asset-audit"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode())
        except Exception as e:
            sys.stderr.write(f"  retry {i+1} {url}: {e}\n")
            time.sleep(2 * (i + 1))
    raise RuntimeError(f"failed: {url}")

def biggest(m):
    """Pick the largest available rendition (full vs -scaled)."""
    sizes = (m.get("media_details") or {}).get("sizes") or {}
    best = m.get("source_url")
    bw = (m.get("media_details") or {}).get("width") or 0
    for s in sizes.values():
        w = s.get("width") or 0
        if w > bw:
            bw, best = w, s.get("source_url")
    return best

def main():
    items, page = [], 1
    while True:
        url = f"{BASE}?orderby=id&order=asc&per_page={PER}&page={page}"
        batch = get(url)
        if not isinstance(batch, list) or not batch:
            break
        for m in batch:
            md = m.get("media_details") or {}
            items.append({
                "id": m.get("id"),
                "slug": m.get("slug"),
                "title": (m.get("title") or {}).get("rendered", ""),
                "alt": m.get("alt_text", ""),
                "caption": (m.get("caption") or {}).get("rendered", ""),
                "date": m.get("date"),
                "parent": m.get("post"),
                "mime": m.get("mime_type"),
                "url": m.get("source_url"),
                "url_best": biggest(m),
                "w": md.get("width"),
                "h": md.get("height"),
                "filesize": (md.get("filesize") if isinstance(md.get("filesize"), int) else None),
                "file": (m.get("source_url") or "").split("/uploads/")[-1],
            })
        sys.stderr.write(f"page {page}: +{len(batch)} (total {len(items)})\n")
        page += 1
        time.sleep(0.3)
    with open(OUT, "w") as f:
        json.dump(items, f, ensure_ascii=False, indent=1)
    print(f"wrote {len(items)} media items -> {os.path.relpath(OUT)}")

if __name__ == "__main__":
    main()
