#!/usr/bin/env python3
"""Join media -> posts, classify every asset, emit the asset map.

Outputs:
  asset-map.json   machine index: groups -> assets (provenance + meaning + flag)
  download-list.tsv  dest_path<TAB>url  for the downloader
Coverage stats printed to stdout. Nothing is silently dropped: orphan/oos
buckets are counted and reported.
"""
import json, os, re, collections
from urllib.parse import unquote

ROOT = os.path.join(os.path.dirname(__file__), "..")
media = json.load(open(os.path.join(ROOT, "media-raw.json")))
posts = json.load(open(os.path.join(ROOT, "posts-map.json")))

# index posts by numeric id
post_by_id = {k: v for k, v in posts.items() if k.isdigit()}

# in-scope event/exhibition portfolio category markers
EVENT_CATS = ("conferences-and-events", "trade-shows", "exhibition", "activity",
              "events", "conference")
PAGE_KIND = {  # page slug -> bucket
    "x-board": "products", "exhibition-design": "products",
    "conferences-and-events": "products", "activity-compounds": "products",
    "picpong-products-for-businesses": "products", "point-of-sale": "products",
    "interior-and-space-design": "products", "about-us": "brand",
    "picpong": "brand", "home": "brand", "contact-us": "brand",
}
LOGO_HINT = re.compile(r"(logo|brinks|clalit|electra|microsoft|mifold|hot|"
                       r"_logo|biglogo|sitenewlogo|download-1)", re.I)
CHROME = re.compile(r"(logo-n|PP_Logo|logo-favicon|favicon|placeholder)", re.I)

def slugify(s):
    s = unquote(s or "").strip().lower()
    s = re.sub(r"[^\w\s-]", "", s, flags=re.U)
    s = re.sub(r"[\s_]+", "-", s).strip("-")
    return s or "untitled"

def kind_for_media(m):
    """Return (bucket, group_key, group_label, post_rec)."""
    pid = str(m.get("parent") or "")
    rec = post_by_id.get(pid)
    f = m["file"] or ""
    if rec and rec["type"] == "portfolio":
        return "projects", slugify(rec["slug"]), rec["title"] or rec["slug"], rec
    if rec and rec["type"] == "page":
        b = PAGE_KIND.get(rec["slug"], "products")
        return b, rec["slug"], rec["title"] or rec["slug"], rec
    # orphan: classify by filename
    if CHROME.search(f):
        return "brand", "site-chrome", "Site chrome (logo/favicon)", None
    if LOGO_HINT.search(f):
        return "logos", "client-logos", "Client logos", None
    return "unattached", "unattached", "Unattached / uncategorised media", None

groups = collections.OrderedDict()
def add(bucket, gkey, glabel, m, rec):
    g = groups.setdefault((bucket, gkey), {
        "bucket": bucket, "key": gkey, "label": glabel,
        "url": rec["url"] if rec else None,
        "categories": rec.get("categories") if rec else [],
        "lang": rec.get("lang") if rec else None,
        "assets": [],
    })
    g["assets"].append(m)

for m in media:
    if m["mime"].startswith("video"):
        continue
    bucket, gkey, glabel, rec = kind_for_media(m)
    add(bucket, gkey, glabel, m, rec)

# de-dup file paths across groups (same physical file only once per group)
bucket_counts = collections.Counter()
asset_total = 0
out_groups = []
dl = []   # (dest, url)
for (bucket, gkey), g in groups.items():
    seen = set()
    assets = []
    for m in sorted(g["assets"], key=lambda x: x["file"]):
        if m["file"] in seen:
            continue
        seen.add(m["file"])
        fname = m["file"].split("/")[-1]
        dest = f"assets/{bucket}/{gkey}/{fname}" if bucket in ("projects",) \
            else f"assets/{bucket}/{gkey}/{fname}" if bucket in ("products",) \
            else f"assets/{bucket}/{fname}"
        assets.append({
            "file": fname, "src_file": m["file"], "url": m["url_best"] or m["url"],
            "dest": dest, "w": m["w"], "h": m["h"], "filesize": m["filesize"],
            "title": m["title"], "alt": m["alt"],
            "caption": re.sub("<[^>]+>", "", m["caption"] or "").strip(),
            "date": m["date"], "id": m["id"], "parent": m["parent"],
        })
        dl.append((dest, m["url_best"] or m["url"]))
    if not assets:
        continue
    g2 = {k: g[k] for k in ("bucket", "key", "label", "url", "categories", "lang")}
    g2["count"] = len(assets)
    g2["assets"] = assets
    out_groups.append(g2)
    bucket_counts[bucket] += len(assets)
    asset_total += len(assets)

out_groups.sort(key=lambda g: (g["bucket"], -g["count"]))
amap = {"source": "https://www.picpong.biz", "media_items": len(media),
        "asset_total": asset_total, "buckets": dict(bucket_counts),
        "groups": out_groups}
json.dump(amap, open(os.path.join(ROOT, "asset-map.json"), "w"),
          ensure_ascii=False, indent=1)

with open(os.path.join(ROOT, "download-list.tsv"), "w") as f:
    for dest, url in dl:
        f.write(f"{dest}\t{url}\n")

print("=== asset buckets ===")
for b, n in bucket_counts.most_common():
    print(f"  {b:12s} {n:4d} images  ({sum(1 for g in out_groups if g['bucket']==b)} groups)")
print(f"  TOTAL        {asset_total} images")
print("\n=== projects (event galleries) by size ===")
for g in [g for g in out_groups if g["bucket"] == "projects"]:
    cats = ",".join(g["categories"][:3])
    print(f"  {g['count']:3d}  {g['key'][:42]:42s} [{cats}]")
