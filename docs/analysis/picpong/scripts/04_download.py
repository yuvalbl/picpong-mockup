#!/usr/bin/env python3
"""Download every asset in download-list.tsv into docs/analysis/picpong/<dest>.
Tries the original (full-res) URL first, falls back to the sized/exact URL on
404. Skips files already present. Writes download-report.json.
"""
import os, sys, json, time, socket, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
socket.setdefaulttimeout(12)

ROOT = os.path.join(os.path.dirname(__file__), "..")
TSV = os.path.join(ROOT, "download-list.tsv")
HDR = {"User-Agent": "Mozilla/5.0 asset-audit"}

def fetch(url):
    req = urllib.request.Request(url, headers=HDR)
    with urllib.request.urlopen(req, timeout=12) as r:
        return r.read()

def one(row):
    dest, url, fb = row
    out = os.path.join(ROOT, dest)
    if os.path.exists(out) and os.path.getsize(out) > 0:
        return ("skip", dest, os.path.getsize(out))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    for u in [url, fb]:
        if not u:
            continue
        for attempt in range(2):
            try:
                data = fetch(u)
                if data and len(data) > 200:
                    with open(out, "wb") as f:
                        f.write(data)
                    return ("ok", dest, len(data))
            except urllib.error.HTTPError as e:
                if e.code == 404:
                    break          # try fallback url
                time.sleep(1.0)
            except Exception:
                time.sleep(1.0)
    return ("fail", dest, 0)

def main():
    rows = []
    for line in open(TSV):
        parts = line.rstrip("\n").split("\t")
        if len(parts) >= 2:
            rows.append((parts[0], parts[1], parts[2] if len(parts) > 2 else ""))
    res = {"ok": 0, "skip": 0, "fail": 0, "bytes": 0, "failures": []}
    done = 0
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs = [ex.submit(one, r) for r in rows]
        for fut in as_completed(futs):
            status, dest, n = fut.result()
            res[status] += 1
            res["bytes"] += n
            if status == "fail":
                res["failures"].append(dest)
            done += 1
            if done % 100 == 0:
                sys.stderr.write(f"  {done}/{len(rows)} ok={res['ok']} "
                                 f"skip={res['skip']} fail={res['fail']} "
                                 f"{res['bytes']/1e6:.0f}MB\n")
    json.dump(res, open(os.path.join(ROOT, "download-report.json"), "w"), indent=1)
    print(f"DONE ok={res['ok']} skip={res['skip']} fail={res['fail']} "
          f"size={res['bytes']/1e6:.1f}MB; failures={len(res['failures'])}")

if __name__ == "__main__":
    main()
