// node selftest.mjs — the cron copies real files from GitHub into a fake KV, then a phone request reads them back
import worker from './index.js';
const kv = new Map(), meta = new Map();
let writes = 0;
const env = { DATA: {
  get: async (k, o) => kv.has(k) ? ((o?.type ?? o) === 'arrayBuffer' ? kv.get(k) : new TextDecoder().decode(kv.get(k))) : null,
  put: async (k, v, o) => { writes++; meta.set(k, o?.metadata); kv.set(k, typeof v === 'string' ? new TextEncoder().encode(v).buffer : v); },
  list: async () => ({ keys: [...kv.keys()].map(name => ({ name, metadata: meta.get(name) })) }) } };
await worker.scheduled({}, env);
const r = await worker.fetch(new Request('https://x/closures.json'), env);
const j = await r.json();
console.assert(r.status === 200 && Array.isArray(j.items) && j.at, 'closures served from KV');
console.assert(writes === 5 && meta.get('closures.json')?.etag, 'one write per file, ETag kept as metadata');
console.assert((await worker.fetch(new Request('https://x/secrets.txt'), env)).status === 404, 'only known files');
const asked = [], realFetch = fetch;
globalThis.fetch = (u, o) => (asked.push(String(u)), realFetch(u, o));
await worker.scheduled({ scheduledTime: Date.UTC(2026, 9, 23, 18, 25) }, env);   // not the top of the hour
console.assert(!asked.some(u => u.endsWith('cameras.json')) && asked.some(u => u.endsWith('closures.json')), 'cameras copied once an hour');
console.log('files', [...kv.keys()], 'closures items', j.items.length, 'writes', writes, 'second run asked', asked.length);
