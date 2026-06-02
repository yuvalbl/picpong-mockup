#!/usr/bin/env python3
"""Resolve media parent post IDs that aren't already in posts-map.json.
For each id: ?p=ID -> permalink; fetch HTML for og:title + category slugs +
the English (WPML) alternate; fetch that for an English title.

Output: parents-resolved.json  {id: {permalink, slug, title_he, title_en,
                                      title, categories, lang}}
"""
import json, re, time, os, sys, urllib.request, collections
from urllib.parse import unquote

ROOT = os.path.join(os.path.dirname(__file__), "..")
media = json.load(open(os.path.join(ROOT, "media-raw.json")))
posts = json.load(open(os.path.join(ROOT, "posts-map.json")))
known = set(k for k, v in posts.items() if k.isdigit())

parents = collections.Counter(str(m["parent"]) for m in media if m.get("parent"))
todo = [p for p in parents if p not in known]
sys.stderr.write(f"resolving {len(todo)} parent ids\n")

def fetch(url, redirect=True):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 asset-audit"})
        with urllib.request.urlopen(req, timeout=45) as r:
            return r.geturl(), r.read().decode("utf-8", "replace")
    except Exception as e:
        sys.stderr.write(f"  fail {url}: {e}\n")
        return None, ""

def og_title(html):
    m = re.search(r'<meta property="og:title" content="([^"]+)"', html)
    t = m.group(1) if m else ""
    for suf in (" - Picpong", " – Picpong", " | Picpong", " - PicPong"):
        t = t.replace(suf, "")
    return t.strip()

def categories(html):
    return sorted(set(re.findall(r"categories-([a-z0-9-]+)", html)))

def en_alt(html):
    # WPML emits <link rel="alternate" hreflang="en-..." href="...">
    m = re.search(r'<link rel="alternate" hreflang="en[^"]*" href="([^"]+)"', html)
    return m.group(1) if m else None

out = {}
for i, pid in enumerate(todo):
    permalink, html = fetch(f"https://www.picpong.biz/?p={pid}")
    if not permalink:
        continue
    slug = unquote(permalink.rstrip("/").split("/")[-1])
    th = og_title(html)
    cats = categories(html)
    en_url = en_alt(html)
    te = ""
    if en_url and "/en/" in en_url:
        _, ehtml = fetch(en_url)
        te = og_title(ehtml)
        if not cats:
            cats = categories(ehtml)
    out[pid] = {
        "permalink": permalink, "slug": slug,
        "title_he": th, "title_en": te,
        "title": te or th, "categories": cats,
        "lang": "he" if "/en/" not in permalink else "en",
        "n_images": parents[pid],
    }
    if (i + 1) % 20 == 0:
        sys.stderr.write(f"  {i+1}/{len(todo)}\n")
    time.sleep(0.15)

json.dump(out, open(os.path.join(ROOT, "parents-resolved.json"), "w"),
          ensure_ascii=False, indent=1)
print(f"resolved {len(out)} parents")
# quick preview
for pid, r in list(out.items())[:12]:
    print(f"  {pid:6s} n={r['n_images']:2d} [{','.join(r['categories'][:2])}] {r['title'][:45]}")
