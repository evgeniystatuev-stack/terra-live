// Terra Live data mirror. The app reads road closures, the camera list, the cloud map and satellite orbits from here,
// not from GitHub: since 2025 GitHub limits anonymous downloads per IP, and phones on one carrier share an IP.
// A cron copies each file from the public GitHub repo into KV when it changes; phone requests only read KV.
const GH = 'https://raw.githubusercontent.com/evgeniystatuev-stack/terra-live/';
export const FILES = {   // name: [branch, seconds a phone may keep it]
  'closures.json': ['data', 300], 'cameras.json': ['data', 6 * 3600],
  'clouds.jpg': ['clouds', 1800], 'stations.tle': ['clouds', 7200], 'visual.tle': ['clouds', 7200],
};
const TYPE = n => n.endsWith('.jpg') ? 'image/jpeg' : n.endsWith('.json') ? 'application/json' : 'text/plain; charset=utf-8';

export default {
  async fetch(req, env) {
    const name = new URL(req.url).pathname.slice(1), f = FILES[name];
    if (!f || req.method !== 'GET') return new Response('not found', { status: 404 });
    const body = await env.DATA.get(name, { type: 'arrayBuffer', cacheTtl: 300 });
    if (!body) return Response.redirect(GH + f[0] + '/' + name, 302);   // not copied yet: the phone gets it from GitHub
    return new Response(body, { headers: { 'content-type': TYPE(name), 'cache-control': `public, max-age=${f[1]}`, 'access-control-allow-origin': '*' } });
  },
  // one writer, and only when GitHub has a new version (ETag): about 300 KV writes a day, the free plan allows 1000
  async scheduled(ev, env) {
    if (env.GH_TOKEN) {   // start the road-data build on GitHub: its own */10 schedule fires every 2–3 hours at best, this clock is exact
      const t = new Date(ev.scheduledTime), job = t.getUTCHours() % 3 === 0 && t.getUTCMinutes() < 10 ? 'all' : 'roads';   // clouds + orbits every 3 h (CelesTrak: once per 2 h)
      const r = await fetch('https://api.github.com/repos/evgeniystatuev-stack/terra-live/actions/workflows/roads.yml/dispatches', { method: 'POST',
        headers: { authorization: 'Bearer ' + env.GH_TOKEN, accept: 'application/vnd.github+json', 'user-agent': 'terra-live-worker' },
        body: JSON.stringify({ ref: 'main', inputs: { job } }) }).catch(e => ({ status: String(e) }));
      if (r.status !== 204) console.log('dispatch failed', r.status);
    }
    for (const [name, [branch]] of Object.entries(FILES)) {
      const etag = await env.DATA.get('etag:' + name);
      const r = await fetch(GH + branch + '/' + name, { headers: etag ? { 'if-none-match': etag } : {} });
      if (r.status !== 200) continue;   // 304 = unchanged; an error keeps the copy we have
      await env.DATA.put(name, await r.arrayBuffer());
      await env.DATA.put('etag:' + name, r.headers.get('etag') || '');
    }
  },
};
