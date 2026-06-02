#!/usr/bin/env python3
"""Build the Picpong asset map.

Inputs (all in ../):
  media-raw.json        WP REST attachments (Gen-1 full batches; rich metadata)
  posts-map.json        portfolio pages + WP pages (titles, categories, onpage imgs)
  parents-resolved.json titles/permalinks for media parents not in posts-map

Sources unioned:
  A) media attachments  -> grouped by parent post (Gen-1 booth/job galleries)
  B) portfolio on-page  -> Gen-2 brand-event heroes/top banners (not in REST)
  C) page-attached media-> product/section pages
Dedup by normalized filename. Classify each group by type + reuse scope.

Outputs:
  asset-map.json        machine index
  download-list.tsv     dest<TAB>url<TAB>fallback_url
Stats + a flat group table to stdout.
"""
import json, os, re, collections
from urllib.parse import unquote

ROOT = os.path.join(os.path.dirname(__file__), "..")
def load(n): return json.load(open(os.path.join(ROOT, n)))
media = load("media-raw.json")
posts = load("posts-map.json")
presolved = load("parents-resolved.json")

SIZE = re.compile(r"-\d{2,4}x\d{2,4}(?=\.[a-z0-9]+$)", re.I)
IDXN = re.compile(r"[-_](\d{1,3})$")            # trailing batch index
CHROME = re.compile(r"(logo-n|PP_Logo|logo-favicon|favicon|placeholder|"
                    r"1524759_1420874141530940)", re.I)  # shared CTA/footer bg
LOGO = re.compile(r"(logo|_logo|biglogo|sitenewlogo|brinks|clalit|electra|"
                  r"microsoft_logo|mifold|logo-hot|download-1)", re.I)

def norm_path(f):                # strip WP size suffix -> original upload path
    return SIZE.sub("", f or "")
def fname(p): return (p or "").split("/")[-1]
def stem(fn):                    # filename minus ext, size, trailing index
    s = SIZE.sub("", fn)
    s = re.sub(r"\.[a-z0-9]+$", "", s, flags=re.I)
    s = IDXN.sub("", s)
    return re.sub(r"[-_](top|hd|scaled)$", "", s, flags=re.I)
def clean_title(t):
    t = re.sub(r"\s*[-–|]\s*www\.picpong\.biz\.?$", "", t or "", flags=re.I)
    t = t.replace("&quot;", '"').replace("&amp;", "&").replace("&#8217;", "'")
    return t.strip(" .-–")
def ascii_slug(s):
    s = unquote(s or "")
    s = re.sub(r"[^A-Za-z0-9\s-]", "", s).strip().lower()
    s = re.sub(r"[\s_-]+", "-", s).strip("-")
    return "" if s.isdigit() else s
def proj_slug(url_slug, title, n):
    return ascii_slug(url_slug) or ascii_slug(clean_title(title)) or f"project-{n}"

# ---- type / scope classifier -------------------------------------------------
def classify(label, cats, files):
    blob = (label + " " + " ".join(cats) + " " + " ".join(files)).lower()
    def has(*ws): return any(w in blob for w in ws)
    # ordered: most specific first
    if has("מדבק", "sticker", "decal", "ויטרינ", "satin"):
        return ("sticker-decal", "out-of-scope")
    if has("דוכן", "booth", "stand", "ביתן", "pavilion", "milan", "expo", "exhibition", "trade-show"):
        return ("booth-exhibition", "in-scope")
    if has("כנס", "conference", "hackathon", "synamedia", "ibm", "amdocs"):
        return ("conference", "in-scope")
    if has("אירוע", "event", "party", "מסיב", "festiv", "queen", "winter", "family"):
        return ("event-activation", "in-scope")
    if has("מתחם", "compound", "mall", "azrieli", "activity", "מתח"):
        return ("activity-compound", "in-scope")
    if has("משרד", "office", "חנוכת", "inaugurat", "lobby"):
        return ("office-branding", "in-scope")
    if has("xboard", "x-board", "modular", "מודולרי", "counter", "shelf", "furniture", "gate", "wall", "קיר", "מדף"):
        return ("xboard-product", "in-scope")
    if has("pos", "point-of-sale", "fsu", "floor", "desktop", "retail"):
        return ("point-of-sale", "out-of-scope")
    return ("other", "review")

# ---- parent label index ------------------------------------------------------
page_by_id = {k: v for k, v in posts.items() if k.isdigit() and v["type"] == "page"}
def parent_label(pid):
    pid = str(pid)
    if pid in page_by_id:
        v = page_by_id[pid]; return (v["title"] or v["slug"], "page", v.get("url"), [])
    if pid in presolved:
        r = presolved[pid]
        t = r["title"]
        t = clean_title(t)
        return (t or r["slug"], "portfolio", r["permalink"], r.get("categories", []))
    return (f"post-{pid}", "unknown", None, [])

PAGE_BUCKET = {"x-board": "products", "exhibition-design": "products",
    "conferences-and-events": "products", "activity-compounds": "products",
    "picpong-products-for-businesses": "products", "point-of-sale": "products",
    "interior-and-space-design": "products", "about-us": "brand",
    "picpong": "brand", "contact-us": "brand", "home-design": "brand"}

# =============================================================================
# Pass 1: media attachments grouped by parent  (Gen-1 + page galleries)
# =============================================================================
groups = collections.OrderedDict()   # gkey -> group dict
seen_files = {}                       # norm filename -> gkey (dedup owner)

def ensure_group(gkey, label, bucket, url, cats, lang, gen):
    if gkey not in groups:
        groups[gkey] = {"key": gkey, "label": label, "bucket": bucket,
                        "url": url, "categories": cats, "lang": lang,
                        "generation": gen, "assets": []}
    return groups[gkey]

byparent = collections.defaultdict(list)
orphans = []
for m in media:
    if m["mime"].startswith("video"):
        continue
    (byparent[str(m["parent"])] if m.get("parent") else orphans).append(m)

for pid, items in byparent.items():
    label, ptype, url, cats = parent_label(pid)
    pslug = page_by_id[pid]["slug"] if pid in page_by_id else (
        presolved[pid]["slug"] if pid in presolved else f"post-{pid}")
    if ptype == "page":
        bucket = PAGE_BUCKET.get(pslug, "products")
        gkey = f"{bucket}/{pslug}"
    else:
        bucket = "projects"
        sl = ascii_slug(label) or ascii_slug(stem(fname(items[0]["url"]))) or f"job-{pid}"
        gkey = f"projects/{sl}"
    g = ensure_group(gkey, label, bucket, url, cats, "he", "gen1-rest")
    for m in items:
        nf = norm_path(m["file"])
        if nf in seen_files:
            continue
        seen_files[nf] = gkey
        g["assets"].append({
            "file": fname(m["file"]), "src_path": m["file"],
            "download": m["url_best"] or m["url"], "fallback": m["url"],
            "w": m["w"], "h": m["h"], "filesize": m["filesize"],
            "title": m["title"], "alt": m["alt"],
            "caption": re.sub("<[^>]+>", "", m["caption"] or "").strip(),
            "date": m["date"], "media_id": m["id"], "source": "rest-attachment",
        })

# =============================================================================
# Pass 2: portfolio on-page images  (Gen-2 brand events: hero + top)
# =============================================================================
pf_pages = [v for v in posts.values()
            if v["type"] == "portfolio" and v["lang"] == "en"
            and 0 < len(v["onpage"]) <= 60]      # skip archive-index (690) pages
# prefer EN; also fold HE-only pages with no EN twin
for i, v in enumerate(pf_pages):
    v["_slug"] = proj_slug(v["slug"], v["title"], i)
seen_proj_slug = {v["_slug"] for v in pf_pages}
he_extra = []
for j, v in enumerate(v2 for v2 in posts.values()
        if v2["type"] == "portfolio" and v2["lang"] == "he" and 0 < len(v2["onpage"]) <= 60):
    sl = proj_slug(v["slug"], v["title"], 1000 + j)
    if sl not in seen_proj_slug:
        v["_slug"] = sl; seen_proj_slug.add(sl); he_extra.append(v)

base = "https://www.picpong.biz"
for v in pf_pages + he_extra:
    sl = v["_slug"]
    gkey = f"projects/{sl}"
    label = clean_title(v["title"]) or sl
    g = ensure_group(gkey, label, "projects", v["url"], v.get("categories", []),
                     v["lang"], "gen2-page")
    if g["generation"] == "gen1-rest":
        g["generation"] = "gen1+gen2"          # batch + page coincide
    for rel in v["onpage"]:
        if CHROME.search(rel) or LOGO.search(rel):
            continue
        nf = norm_path(rel)
        if nf in seen_files:
            continue
        seen_files[nf] = gkey
        orig = base + "/wp-content/" + ("uploads/" + nf.split("uploads/")[-1]
                                        if "uploads/" in nf else nf)
        # nf already includes "YYYY/MM/...": build clean original URL
        orig = f"{base}/wp-content/uploads/{nf.split('uploads/')[-1]}" if "uploads/" in nf \
            else f"{base}/wp-content/uploads/{nf}"
        sized = f"{base}/wp-content/uploads/{rel.split('uploads/')[-1]}" if "uploads/" in rel \
            else f"{base}/wp-content/uploads/{rel}"
        g["assets"].append({
            "file": fname(nf), "src_path": nf, "download": orig, "fallback": sized,
            "w": None, "h": None, "filesize": None, "title": "", "alt": "",
            "caption": "", "date": None, "media_id": None,
            "source": "portfolio-page",
        })

# =============================================================================
# Pass 3: orphan media -> logos / brand-chrome / unattached
# =============================================================================
for m in orphans:
    f = m["file"]; nf = norm_path(f)
    if nf in seen_files:
        continue
    if CHROME.search(f):
        gkey, bucket, label = "brand/site-chrome", "brand", "Site chrome (logo/favicon/CTA bg)"
    elif LOGO.search(f):
        gkey, bucket, label = "logos/client-logos", "logos", "Client logos"
    else:
        gkey, bucket, label = "unattached/uncategorised", "unattached", "Unattached / uncategorised media"
    seen_files[nf] = gkey
    g = ensure_group(gkey, label, bucket, None, [], "?", "gen1-rest")
    g["assets"].append({
        "file": fname(f), "src_path": f, "download": m["url_best"] or m["url"],
        "fallback": m["url"], "w": m["w"], "h": m["h"], "filesize": m["filesize"],
        "title": m["title"], "alt": m["alt"],
        "caption": re.sub("<[^>]+>", "", m["caption"] or "").strip(),
        "date": m["date"], "media_id": m["id"], "source": "rest-attachment"})

# =============================================================================
# Finalise: classify, count, emit
# =============================================================================
out_groups, dl, bucket_counts = [], [], collections.Counter()
type_counts, scope_counts = collections.Counter(), collections.Counter()
for gkey, g in groups.items():
    if not g["assets"]:
        continue
    files = [a["file"] for a in g["assets"]]
    if g["bucket"] == "projects":
        gtype, scope = classify(g["label"], g["categories"], files)
    elif g["bucket"] == "products":
        gtype, scope = "xboard-product", "in-scope"
    elif g["bucket"] == "logos":
        gtype, scope = "client-logo", "reference"
    elif g["bucket"] == "brand":
        gtype, scope = "brand-chrome", "reference"
    else:
        gtype, scope = "uncategorised", "review"
    g["type"], g["scope"] = gtype, scope
    g["count"] = len(g["assets"])
    for a in g["assets"]:
        dest = f"assets/{gkey}/{a['file']}"
        a["dest"] = dest
        dl.append((dest, a["download"], a["fallback"]))
    out_groups.append(g)
    bucket_counts[g["bucket"]] += g["count"]
    type_counts[gtype] += g["count"]
    scope_counts[scope] += g["count"]

order = {"projects": 0, "products": 1, "logos": 2, "brand": 3, "unattached": 4}
out_groups.sort(key=lambda g: (order.get(g["bucket"], 9), -g["count"]))

amap = {"source": base, "generated_from": "WP REST + page HTML",
        "total_assets": sum(bucket_counts.values()),
        "buckets": dict(bucket_counts), "types": dict(type_counts),
        "scope": dict(scope_counts), "group_count": len(out_groups),
        "groups": out_groups}
json.dump(amap, open(os.path.join(ROOT, "asset-map.json"), "w"),
          ensure_ascii=False, indent=1)
with open(os.path.join(ROOT, "download-list.tsv"), "w") as f:
    for dest, url, fb in dl:
        f.write(f"{dest}\t{url}\t{fb}\n")

print("buckets:", dict(bucket_counts), "| total", sum(bucket_counts.values()))
print("scope  :", dict(scope_counts))
print("types  :", dict(type_counts))
print(f"groups : {len(out_groups)}")
print("\n# PROJECT/EVENT GROUPS")
for g in out_groups:
    if g["bucket"] != "projects":
        continue
    print(f"  {g['count']:3d} [{g['scope'][:10]:10s}|{g['type'][:16]:16s}] "
          f"{g['generation']:10s} {g['key'][9:50]}")
