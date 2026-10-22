#!/usr/bin/env python3
"""Terra Live road data: full closures, chain controls and cameras from open DOT feeds -> closures.json, cameras.json.
Runs every 10 min in GitHub Actions and force-pushes the `data` branch; the app reads the two files. Stdlib only.
Sources: Caltrans CWWP2 (open JSON, 12 districts) and every WZDx feed in the USDOT registry that needs no key."""
import json, sys, os, time, hashlib, datetime as dt, urllib.request, concurrent.futures as cf

UA = {"User-Agent": "TerraLive/0.1 (road data aggregator; yauhenistatuyeu1996@yahoo.com)"}
NOW = time.time(); SOON = NOW + 24 * 3600   # closures starting within a day are worth warning about

def get(url, timeout=25):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8", "replace"))

def num(x):
    try: return float(x)
    except (TypeError, ValueError): return None

def iso(s):
    if not s: return None
    try: return dt.datetime.fromisoformat(str(s).replace("Z", "+00:00")).timestamp()
    except ValueError: return None

def caltrans(d):
    base, out, cams = f"https://cwwp2.dot.ca.gov/data/d{d}/", [], []
    try:
        for e in get(base + f"lcs/lcsStatusD{d:02d}.json")["data"]:
            c = e["lcs"]; cl = c["closure"]; ts = cl["closureTimestamp"]; loc = c["location"]; b, en = loc["begin"], loc["end"]
            if cl.get("typeOfClosure") != "Full" or cl.get("facility") not in ("Mainline", "Connector"): continue  # lane and ramp closures are noise for a trip planner
            if cl["code1098"]["isCode1098"] == "true" or cl["code1022"]["isCode1022"] == "true": continue  # finished / cancelled
            start, end, forever = num(ts.get("closureStartEpoch")), num(ts.get("closureEndEpoch")), ts.get("isClosureEndIndefinite") == "true"
            if (start and start > SOON) or (end and end < NOW and not forever): continue
            out.append({"id": "ca-lcs-" + c["index"], "src": "Caltrans", "state": "CA", "kind": "closed", "route": b.get("beginRoute", ""),
                        "title": f'{b.get("beginRoute", "")} {loc.get("travelFlowDirection", "")}: full closure {b.get("beginLocationName", "")} → {en.get("endLocationName", "")} ({cl.get("typeOfWork", "")})',
                        "lat": num(b["beginLatitude"]), "lon": num(b["beginLongitude"]), "lat2": num(en["endLatitude"]), "lon2": num(en["endLongitude"]),
                        "start": start, "end": None if forever else end})
    except Exception as ex: print("caltrans lcs", d, ex, file=sys.stderr)
    try:
        for e in get(base + f"cc/ccStatusD{d:02d}.json")["data"]:
            c = e["cc"]; st = c["statusData"]; l = c["location"]; s = st.get("status") or ""
            if c.get("inService") != "true" or not s.startswith("R-") or s == "R-0": continue
            out.append({"id": "ca-cc-" + c["index"], "src": "Caltrans", "state": "CA", "kind": "chain", "route": l.get("route", ""),
                        "title": f'{l.get("route", "")} {l.get("locationName", "")}: chain control {s} — {st.get("statusDescription", "")}',
                        "lat": num(l["latitude"]), "lon": num(l["longitude"]), "lat2": None, "lon2": None, "start": None, "end": None})
    except Exception as ex: print("caltrans cc", d, ex, file=sys.stderr)
    try:
        for e in get(base + f"cctv/cctvStatusD{d:02d}.json")["data"]:
            c = e["cctv"]; l = c["location"]; img = c.get("imageData", {}).get("static", {}).get("currentImageURL")
            if c.get("inService") != "true" or not img: continue
            cams.append({"id": f"ca-{d}-{c['index']}", "src": "Caltrans", "state": "CA", "name": l.get("locationName", ""), "route": l.get("route", ""),
                         "lat": num(l["latitude"]), "lon": num(l["longitude"]), "img": img})
    except Exception as ex: print("caltrans cctv", d, ex, file=sys.stderr)
    return out, cams

def wzdx_feeds():
    reg = get("https://data.transportation.gov/resource/69qe-yiui.json?$limit=500")
    return [(r.get("state") or r.get("feedname") or "?", r["url"]["url"]) for r in reg
            if r.get("active") in (True, "true") and r.get("needapikey") not in (True, "true")
            and str(r.get("format", "")).lower().startswith("geojson") and str(r.get("version", ""))[:1] in "34"]

def wzdx(state, url):
    out = []
    try: fc = get(url)
    except Exception as ex: print("wzdx", state, ex, file=sys.stderr); return out
    for ft in fc.get("features") or []:
        p = ft.get("properties") or {}; core = p.get("core_details") or p          # v4 nests core_details, v3 is flat
        if (p.get("vehicle_impact") or "").lower() != "all-lanes-closed": continue
        start, end = iso(p.get("start_date")), iso(p.get("end_date"))
        if (start and start > SOON) or (end and end < NOW): continue
        g = ft.get("geometry") or {}; cs = g.get("coordinates") or []
        if g.get("type") == "LineString" and cs: a, b = cs[0], cs[-1]
        elif g.get("type") == "MultiLineString" and cs and cs[0]: a, b = cs[0][0], cs[-1][-1]
        elif g.get("type") == "Point" and cs: a = b = cs
        else: continue
        road = ", ".join(core.get("road_names") or [])[:40]; d = core.get("direction") or ""; desc = (core.get("description") or "")[:90]
        key = str(ft.get("id") or hashlib.md5(f"{road}{a}".encode()).hexdigest()[:10])
        out.append({"id": f"wz-{state}-{key}", "src": "WZDx " + str(state), "state": str(state), "kind": "closed", "route": road,
                    "title": f"{road} {d}: all lanes closed — {desc}".strip(), "lat": num(a[1]), "lon": num(a[0]), "lat2": num(b[1]), "lon2": num(b[0]),
                    "start": start, "end": end})
    return out

def main(outdir):
    closures, cams = [], []
    with cf.ThreadPoolExecutor(12) as ex:
        for c, k in ex.map(caltrans, range(1, 13)): closures += c; cams += k
        for c in ex.map(lambda s: wzdx(*s), wzdx_feeds()): closures += c
    closures = [x for x in closures if x["lat"] is not None and x["lon"] is not None]
    cams = [x for x in cams if x["lat"] is not None and x["lon"] is not None]
    assert all(-90 <= x["lat"] <= 90 and -180 <= x["lon"] <= 180 for x in closures + cams), "bad coordinates"
    os.makedirs(outdir, exist_ok=True)
    stamp = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    for name, items in (("closures.json", closures), ("cameras.json", cams)):
        json.dump({"at": stamp, "items": items}, open(os.path.join(outdir, name), "w"), ensure_ascii=False, separators=(",", ":"))
    print(f"closures {len(closures)} (chain {sum(1 for x in closures if x['kind']=='chain')}), cameras {len(cams)}")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "out")
