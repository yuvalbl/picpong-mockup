#!/usr/bin/env python3
"""Resolve WP post/page IDs -> slug/title/categories so media parents can be
named. Crawls portfolio-sitemap.xml (HE+EN) page HTML, plus pages REST list.

Outputs:
  posts-map.json   {post_id: {type, slug, title, lang, url, categories, onpage}}
"""
import json, re, time, urllib.request, os, sys
from urllib.parse import unquote

ROOT = os.path.join(os.path.dirname(__file__), "..")
SITEMAP = "https://www.picpong.biz/portfolio-sitemap.xml"
PAGES = "https://www.picpong.biz/wp-json/wp/v2/pages?orderby=id&order=asc&per_page=100&page={}"

def get(url, raw=False, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 asset-audit"})
            with urllib.request.urlopen(req, timeout=60) as r:
                b = r.read().decode("utf-8", "replace")
                return b if raw else json.loads(b)
        except Exception as e:
            sys.stderr.write(f"  retry {i+1} {url}: {e}\n")
            time.sleep(1.5 * (i + 1))
    sys.stderr.write(f"FAILED {url}\n")
    return "" if raw else None

posts = {}

# --- pages (REST) ---
page = 1
while True:
    batch = get(PAGES.format(page))
    if not isinstance(batch, list) or not batch:
        break
    for p in batch:
        posts[str(p["id"])] = {
            "type": "page", "slug": p.get("slug"),
            "title": re.sub("<[^>]+>", "", (p.get("title") or {}).get("rendered", "")).strip(),
            "lang": "?", "url": p.get("link"), "categories": [], "onpage": [],
        }
    page += 1
sys.stderr.write(f"pages: {len([v for v in posts.values() if v['type']=='page'])}\n")

# --- portfolio pages (HTML crawl) ---
xml = get(SITEMAP, raw=True)
locs = re.findall(r"<loc>([^<]+)</loc>", xml)
sys.stderr.write(f"portfolio sitemap locs: {len(locs)}\n")
for i, url in enumerate(locs):
    html = get(url, raw=True)
    if not html:
        continue
    m = re.search(r"postid-(\d+)", html)
    pid = m.group(1) if m else None
    title = ""
    mt = re.search(r'<meta property="og:title" content="([^"]+)"', html)
    if mt:
        title = mt.group(1).replace(" - Picpong", "").replace(" – Picpong", "").strip()
    if not title:
        mt = re.search(r"<title>([^<]+)</title>", html)
        title = (mt.group(1).split("-")[0].strip() if mt else "")
    cats = sorted(set(re.findall(r"categories-([a-z0-9-]+)", html)))
    imgs = sorted(set(re.findall(r"uploads/(\d{4}/\d{2}/[^\"'?) ]+\.(?:jpg|jpeg|png|gif|webp))", html, re.I)))
    # drop site chrome from on-page list
    chrome = ("logo-n", "PP_Logo", "logo-favicon", "favicon")
    imgs = [x for x in imgs if not any(c in x for c in chrome)]
    lang = "en" if "/en/" in url else "he"
    slug = unquote(url.rstrip("/").split("/")[-1])
    rec = {"type": "portfolio", "slug": slug, "title": title, "lang": lang,
           "url": url, "categories": cats, "onpage": imgs}
    if pid:
        # keep richest record if id seen twice
        if pid not in posts or len(imgs) > len(posts[pid].get("onpage", [])):
            posts[pid] = rec
    else:
        posts[f"noid::{slug}::{lang}"] = rec
    if (i + 1) % 25 == 0:
        sys.stderr.write(f"  crawled {i+1}/{len(locs)}\n")
    time.sleep(0.15)

out = os.path.join(ROOT, "posts-map.json")
with open(out, "w") as f:
    json.dump(posts, f, ensure_ascii=False, indent=1)
print(f"wrote {len(posts)} posts -> {os.path.relpath(out)}")
