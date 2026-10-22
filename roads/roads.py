#!/usr/bin/env python3
"""Terra Live road data: full closures, chain controls and cameras from open DOT feeds -> closures.json, cameras.json.
Runs every 10 min in GitHub Actions and force-pushes the `data` branch; the app reads the two files. Stdlib only.
Sources: Caltrans CWWP2 (open JSON, 12 districts), every WZDx feed in the USDOT registry that needs no key, and the
camera lists of state 511 sites on the IBI platform (the list their own public map loads; pictures load straight from the state)."""
import json, re, sys, os, time, hashlib, datetime as dt, urllib.request, urllib.error, urllib.parse, socket, ipaddress, concurrent.futures as cf

UA = {"User-Agent": "TerraLive/0.1 (road data aggregator; yauhenistatuyeu1996@yahoo.com)"}
NOW = time.time(); SOON = NOW + 24 * 3600   # closures starting within a day are worth warning about

MAX_BYTES = 40 * 1024 * 1024   # a feed bigger than this is broken, not useful

def public_https(url):
    """Registry entries are third-party data: only https, only public hosts (no localhost, LAN or link-local targets)."""
    u = urllib.parse.urlparse(url)
    if u.scheme != "https" or not u.hostname: raise ValueError("https only: " + url[:60])
    for info in socket.getaddrinfo(u.hostname, 443, proto=socket.IPPROTO_TCP):
        ip = ipaddress.ip_address(info[4][0])
        if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved: raise ValueError("private host: " + u.hostname)
    return url

class _SafeRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return super().redirect_request(req, fp, code, msg, headers, public_https(newurl))

OPENER = urllib.request.build_opener(_SafeRedirect())

def get(url, timeout=25):
    with OPENER.open(urllib.request.Request(public_https(url), headers=UA), timeout=timeout) as r:
        return json.loads(r.read(MAX_BYTES).decode("utf-8", "replace"))

def num(x):
    try: return float(x)
    except (TypeError, ValueError): return None

def iso(s):
    if not s: return None
    try: return dt.datetime.fromisoformat(str(s).replace("Z", "+00:00")).timestamp()
    except ValueError: return None

def nsew(d):
    """'North' / 'northbound' / 'NB' -> 'N'; anything else -> '' (unknown: applies to both directions)"""
    d = (d or "").strip().upper()
    return d[0] if d and d[0] in "NSEW" and not d.startswith("UN") else ""

def caltrans(d):
    base, out, cams = f"https://cwwp2.dot.ca.gov/data/d{d}/", [], []
    try:
        for e in get(base + f"lcs/lcsStatusD{d:02d}.json")["data"]:
            c = e["lcs"]; cl = c["closure"]; ts = cl["closureTimestamp"]; loc = c["location"]; b, en = loc["begin"], loc["end"]
            if cl.get("typeOfClosure") != "Full" or cl.get("facility") not in ("Mainline", "Connector"): continue  # lane and ramp closures are noise for a trip planner
            if cl["code1098"]["isCode1098"] == "true" or cl["code1022"]["isCode1022"] == "true": continue  # finished / cancelled
            start, end, forever = num(ts.get("closureStartEpoch")), num(ts.get("closureEndEpoch")), ts.get("isClosureEndIndefinite") == "true"
            if (start and start > SOON) or (end and end < NOW and not forever): continue
            out.append({"id": "ca-lcs-" + c["index"], "src": "Caltrans", "state": "CA", "kind": "closed", "route": b.get("beginRoute", ""), "dir": nsew(loc.get("travelFlowDirection")),
                        "title": f'{b.get("beginRoute", "")} {loc.get("travelFlowDirection", "")}: full closure {b.get("beginLocationName", "")} → {en.get("endLocationName", "")} ({cl.get("typeOfWork", "")})',
                        "lat": num(b["beginLatitude"]), "lon": num(b["beginLongitude"]), "lat2": num(en["endLatitude"]), "lon2": num(en["endLongitude"]),
                        "start": start, "end": None if forever else end})
    except Exception as ex: print("caltrans lcs", d, ex, file=sys.stderr)
    try:
        for e in get(base + f"cc/ccStatusD{d:02d}.json")["data"]:
            c = e["cc"]; st = c["statusData"]; l = c["location"]; s = st.get("status") or ""
            if c.get("inService") != "true" or not s.startswith("R-") or s == "R-0": continue
            out.append({"id": "ca-cc-" + c["index"], "src": "Caltrans", "state": "CA", "kind": "chain", "route": l.get("route", ""), "dir": nsew(l.get("direction")),
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

# State 511 sites on one platform (IBI): /List/GetData/Cameras gives every camera with its picture, no key needed
IBI = [("udottraffic.utah.gov", "UT", "UDOT"), ("511.idaho.gov", "ID", "Idaho 511"), ("az511.com", "AZ", "AZ511"), ("www.nvroads.com", "NV", "NDOT"),
       ("newengland511.org", "NEW-ENG", "New England 511"), ("511ga.org", "GA", "511GA"), ("fl511.com", "FL", "FL511"), ("511pa.com", "PA", "511PA"),
       ("511wi.gov", "WI", "511WI"), ("511la.org", "LA", "511LA"), ("ctroads.org", "CT", "CTroads"), ("511.alaska.gov", "AK", "Alaska 511"),
       ("511.alberta.ca", "AB", "Alberta 511"), ("511on.ca", "ON", "Ontario 511")]
POINT = re.compile(r"POINT \(([-\d.]+) ([-\d.]+)\)")

def ibi(host, st, src):
    cams, start, total = [], 0, 1
    while start < min(total, 20000):
        q = json.dumps({"columns": [{"data": None, "name": ""}, {"name": "sortOrder", "s": True}, {"name": "roadway", "s": True}],
                        "order": [{"column": 1, "dir": "asc"}, {"column": 2, "dir": "asc"}], "start": start, "length": 100, "search": {"value": ""}})
        d = None
        for attempt in range(2):   # a page with one broken record answers 500 every time (511GA): skip that page, keep the rest
            try: d = get(f"https://{host}/List/GetData/Cameras?" + urllib.parse.urlencode({"query": q, "lang": "en-US"})); break
            except urllib.error.HTTPError as ex:
                if start == 0 and attempt == 1 or ex.code < 500: raise
                time.sleep(2)
        if d is None: print("511", host, "skipped page", start, file=sys.stderr); start += 100; continue
        total = int(d.get("recordsTotal") or 0)
        for r in d.get("data") or []:
            m = POINT.match(((r.get("latLng") or {}).get("geography") or {}).get("wellKnownText") or "")
            img = next((i["imageUrl"] for i in r.get("images") or [] if i.get("imageUrl") and not i.get("disabled") and not i.get("blocked")), None)
            if not m or not img: continue
            img = img if img.startswith("https://") else f"https://{host}{img}" if img.startswith("/") else None
            if img: cams.append({"id": f"{st.lower()}-{r.get('id')}", "src": src, "state": st, "name": (r.get("location") or "")[:80],
                                 "route": (r.get("roadway") or "")[:30], "lat": num(m.group(2)), "lon": num(m.group(1)), "img": img})
        start += 100
    return cams

# States on the Castle Rock CARS platform: <st>tg.carsprogram.org/cameras_v1/api/cameras lists public cameras with snapshots
CARS = [("ia", "Iowa 511"), ("in", "INDOT"), ("mn", "511MN"), ("ks", "KanDrive"), ("ne", "Nebraska 511"), ("co", "COtrip"), ("sd", "SD511"), ("ma", "Mass511")]

def cars(st, src):
    cams = []
    for c in get(f"https://{st}tg.carsprogram.org/cameras_v1/api/cameras"):
        loc = c.get("location") or {}
        img = next((v.get("videoPreviewUrl") or v.get("url") for v in c.get("views") or []
                    if v.get("videoPreviewUrl") or v.get("type") == "STILL_IMAGE"), None)   # a still picture; video-only views are skipped
        if not c.get("public") or not img or not img.startswith("https://"): continue
        cams.append({"id": f"{st}-{c.get('id')}", "src": src, "state": st.upper(), "name": (c.get("name") or "")[:80],
                     "route": (loc.get("routeId") or "")[:30], "lat": num(loc.get("latitude")), "lon": num(loc.get("longitude")), "img": img})
    return cams

def cams511(stamp):
    """Camera lists hardly change: fetch them once a day, reuse yesterday's copy from the data branch in between.
    A site that is down keeps its old list."""
    prev = {"at": None, "items": []}
    try: prev = get("https://raw.githubusercontent.com/evgeniystatuev-stack/terra-live/data/cameras-511.json")
    except Exception as ex: print("cameras-511 cache", ex, file=sys.stderr)
    sources = sorted([st for _, st, _ in IBI] + [st.upper() for st, _ in CARS])   # a new state in the code refreshes the cache at once
    if prev.get("items") and prev.get("sources") == sources and NOW - (iso(prev.get("at")) or 0) < 20 * 3600: return prev
    jobs = [(st, lambda h=h, st=st, src=src: ibi(h, st, src)) for h, st, src in IBI] + [(st.upper(), lambda st=st, src=src: cars(st, src)) for st, src in CARS]
    def one(job):
        try: return job[0], job[1]()
        except Exception as ex: print("511", job[0], ex, file=sys.stderr); return job[0], None
    items = []
    with cf.ThreadPoolExecutor(6) as ex:
        for st, got in ex.map(one, jobs): items += got if got is not None else [x for x in prev.get("items") or [] if x.get("state") == st]
    return {"at": stamp, "sources": sources, "items": items}

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
        src = "WZDx" if str(state).lower() in ("n/a", "?") else f"{str(state).title()} DOT (WZDx)"
        out.append({"id": f"wz-{state}-{key}", "src": src, "state": str(state), "kind": "closed", "route": road, "dir": nsew(d),
                    "title": f"{road} {d}: all lanes closed — {desc}".strip(), "lat": num(a[1]), "lon": num(a[0]), "lat2": num(b[1]), "lon2": num(b[0]),
                    "start": start, "end": end})
    return out

def main(outdir):
    closures, cams = [], []
    stamp = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    with cf.ThreadPoolExecutor(12) as ex:
        c511 = ex.submit(cams511, stamp)
        for c, k in ex.map(caltrans, range(1, 13)): closures += c; cams += k
        for c in ex.map(lambda s: wzdx(*s), wzdx_feeds()): closures += c
        c511 = c511.result()
    ok = lambda x: x["lat"] is not None and x["lon"] is not None and -90 <= x["lat"] <= 90 and -180 <= x["lon"] <= 180
    closures, cams = [x for x in closures if ok(x)], [x for x in cams + c511["items"] if ok(x)]   # one bad record must not sink the whole file
    os.makedirs(outdir, exist_ok=True)
    for name, data in (("closures.json", {"at": stamp, "items": closures}), ("cameras.json", {"at": stamp, "items": cams}), ("cameras-511.json", c511)):
        json.dump(data, open(os.path.join(outdir, name), "w"), ensure_ascii=False, separators=(",", ":"))
    print(f"closures {len(closures)} (chain {sum(1 for x in closures if x['kind']=='chain')}), cameras {len(cams)} (511: {len(c511['items'])})")

assert POINT.match("POINT (-113.57482 37.10654)").groups() == ("-113.57482", "37.10654")
assert nsew("North") == "N" and nsew("southbound") == "S" and nsew("Both") == "" and nsew("undefined") == "" and nsew(None) == ""

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "out")
