#!/usr/bin/env python3
"""Write the human-readable asset map from asset-map.json:
  asset-map.md                  master catalog (summary + every group + image)
  assets/<group>/README.md      per-folder provenance + image list

Reads actual on-disk dimensions/sizes for downloaded files (no deps).
"""
import os, json, struct

ROOT = os.path.join(os.path.dirname(__file__), "..")
amap = json.load(open(os.path.join(ROOT, "asset-map.json")))

def img_dims(path):
    try:
        with open(path, "rb") as f:
            head = f.read(26)
            if head[:8] == b"\x89PNG\r\n\x1a\n":
                w, h = struct.unpack(">II", head[16:24]); return w, h
            if head[:6] in (b"GIF87a", b"GIF89a"):
                w, h = struct.unpack("<HH", head[6:10]); return w, h
            if head[:2] == b"\xff\xd8":               # jpeg: scan markers
                f.seek(2); b = f.read(1)
                while b and b != b"":
                    while b != b"\xff":
                        b = f.read(1)
                    while b == b"\xff":
                        b = f.read(1)
                    if 0xC0 <= b[0] <= 0xCF and b[0] not in (0xC4, 0xC8, 0xCC):
                        f.read(3); h, w = struct.unpack(">HH", f.read(4)); return w, h
                    seg = struct.unpack(">H", f.read(2))[0]; f.seek(seg - 2, 1)
                    b = f.read(1)
    except Exception:
        pass
    return None, None

def disk(dest):
    p = os.path.join(ROOT, dest)
    if os.path.exists(p) and os.path.getsize(p) > 0:
        w, h = img_dims(p)
        return os.path.getsize(p), w, h
    return None, None, None

SCOPE_EMOJI = {"in-scope": "✅", "out-of-scope": "🚫", "review": "🔎", "reference": "📎"}
TYPE_NOTE = {
    "booth-exhibition": "Trade-show booth / exhibition stand (X-Board build).",
    "conference": "Conference / corporate event branding.",
    "event-activation": "Event activation / branded experience.",
    "activity-compound": "Mall / activity compound installation.",
    "office-branding": "Office / lobby branding & inauguration.",
    "xboard-product": "X-Board product / furniture / structure.",
    "sticker-decal": "Stickers / decals / window graphics (off eco-structure strategy).",
    "point-of-sale": "Point-of-sale / retail display (out of redesign scope).",
    "client-logo": "Client logo (low-res 2018 PNG; re-source SVG).",
    "brand-chrome": "Picpong logo / favicon / site chrome.",
    "other": "Misc 2018 job-archive item — needs human triage.",
    "uncategorised": "Unattached media — needs human triage.",
}

def md_escape(s):
    return (s or "").replace("|", "\\|").replace("\n", " ").strip()

# ---- per-folder READMEs + collect disk stats --------------------------------
for g in amap["groups"]:
    folder = os.path.join(ROOT, "assets", g["key"])
    present = 0
    for a in g["assets"]:
        sz, w, h = disk(a["dest"])
        a["_disk"], a["_w"], a["_h"] = sz, w or a.get("w"), h or a.get("h")
        if sz:
            present += 1
    g["_present"] = present
    if not os.path.isdir(folder):
        continue
    lines = [f"# {g['label']}", ""]
    lines += [f"- **Group:** `{g['key']}`",
              f"- **Type:** {g['type']} — {TYPE_NOTE.get(g['type'],'')}",
              f"- **Scope:** {SCOPE_EMOJI.get(g['scope'],'')} {g['scope']}",
              f"- **Source generation:** {g['generation']}"]
    if g.get("url"):
        lines.append(f"- **Source page:** {g['url']}")
    if g.get("categories"):
        lines.append(f"- **WP categories:** {', '.join(g['categories'])}")
    lines += [f"- **Images:** {present}/{g['count']} downloaded", "",
              "| file | dims | size | represents (title / alt / caption) |",
              "|---|---|---|---|"]
    for a in g["assets"]:
        dims = f"{a['_w']}×{a['_h']}" if a.get("_w") else "—"
        size = f"{a['_disk']//1024} KB" if a.get("_disk") else "—"
        rep = md_escape(a.get("title") or a.get("alt") or a.get("caption") or "—")
        lines.append(f"| `{a['file']}` | {dims} | {size} | {rep} |")
    lines += ["", "_Provenance: picpong.biz WordPress media. "
              f"Source = {g['generation']}._", ""]
    open(os.path.join(folder, "README.md"), "w").write("\n".join(lines))

# ---- master asset-map.md ----------------------------------------------------
total_present = sum(g["_present"] for g in amap["groups"])
M = ["# Picpong — Master Asset Map (images)", "",
     f"Every image extracted from **{amap['source']}** and where it lives in "
     "this repo. Downloads sit under `docs/analysis/picpong/assets/<group>/`; "
     "each folder also has a `README.md` describing it.", "",
     f"- **Total catalogued:** {amap['total_assets']} images "
     f"({total_present} downloaded) across {amap['group_count']} groups",
     f"- **By bucket:** " + ", ".join(f"{k} {v}" for k, v in amap['buckets'].items()),
     f"- **By scope:** " + ", ".join(f"{SCOPE_EMOJI.get(k,'')}{k} {v}" for k, v in amap['scope'].items()),
     "", "## How images were sourced", "",
     "- **gen2-page** — 2019–2022 brand-name events. The live site publishes only "
     "a hero + a `top-` banner per project; that is the complete *public* set.",
     "- **gen1-rest** — 2018 job archive. Full multi-image batches exist in the "
     "WordPress media library (attached to `jobNNNN` posts) — richer booth/build "
     "galleries, but lower-res phone photos.",
     "- **products / logos / brand** — page-attached product shots, the client-logo "
     "wall, and Picpong's own brand marks.", "",
     "> Scope legend: ✅ in-scope (events/conferences/booths/X-Board) · "
     "🚫 out-of-scope (POS/decals) · 🔎 needs human triage · 📎 reference asset.", ""]

def section(title, pred, note=""):
    gs = [g for g in amap["groups"] if pred(g)]
    if not gs:
        return
    M.append(f"## {title}  ({sum(g['count'] for g in gs)} imgs / {len(gs)} groups)")
    if note:
        M.append(note)
    M.append("")
    M.append("| event / group | imgs | scope | type | folder | source page |")
    M.append("|---|---|---|---|---|---|")
    for g in sorted(gs, key=lambda z: (z["scope"] != "in-scope", -z["count"])):
        url = f"[link]({g['url']})" if g.get("url") else "—"
        M.append(f"| **{md_escape(g['label'])}** | {g['_present']}/{g['count']} | "
                 f"{SCOPE_EMOJI.get(g['scope'],'')} | {g['type']} | "
                 f"`assets/{g['key']}/` | {url} |")
    M.append("")

section("🎟️ Brand-name events & conferences (2019–2022)",
        lambda g: g["bucket"] == "projects" and "gen2" in g["generation"],
        "The priority set — recognizable clients. Hero + banner each.")
section("🏗️ 2018 job-archive projects (booths, builds, activations)",
        lambda g: g["bucket"] == "projects" and g["generation"] == "gen1-rest",
        "Full photo batches; mixed scope. `jobNNNN` = internal job number.")
section("📦 X-Board products & service pages",
        lambda g: g["bucket"] == "products")
section("🏷️ Client logos", lambda g: g["bucket"] == "logos")
section("🎨 Brand / site chrome", lambda g: g["bucket"] == "brand")
section("❓ Unattached / uncategorised media",
        lambda g: g["bucket"] == "unattached",
        "Older media with no clear parent — triage before reuse.")

M += ["## Reuse guidance (carry-over from inventory.md §7)", "",
      "- **2021–2022 brand heroes** (Landa, Synamedia, Deep Instinct, King Solomon, "
      "Microsoft new office, Priority/Maccabi): acceptable web-res — **reuse/curate**.",
      "- **2018–2019 phone-grade JPEGs** (Intel, Hackathon, Google Cloud, Carmel, "
      "Amdocs Milan booth): **re-shoot** for hero/retina; fine as proof thumbnails.",
      "- **Client logos / brand marks**: tiny 2018 PNGs — **re-source SVG** with permission.",
      "- **Stickers/decals/POS groups**: 🚫 off the eco/X-Board strategy — de-emphasise.",
      "", "_Generated by `scripts/05_write_catalog.py` from `asset-map.json`._"]
open(os.path.join(ROOT, "asset-map.md"), "w").write("\n".join(M))
print(f"wrote asset-map.md ({total_present}/{amap['total_assets']} on disk) + "
      f"{sum(1 for g in amap['groups'] if os.path.isdir(os.path.join(ROOT,'assets',g['key'])))} folder READMEs")
