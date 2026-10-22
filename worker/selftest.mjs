// node selftest.mjs — the cron copies real files from GitHub into a fake KV, then a phone request reads them back
import worker from './index.js';
const kv = new Map();
const env = { DATA: {
  get: async (k, o) => kv.has(k) ? ((o?.type ?? o) === 'arrayBuffer' ? kv.get(k) : new TextDecoder().decode(kv.get(k))) : null,
  put: async (k, v) => kv.set(k, typeof v === 'string' ? new TextEncoder().encode(v).buffer : v) } };
await worker.scheduled({}, env);
const r = await worker.fetch(new Request('https://x/closures.json'), env);
const j = await r.json();
console.assert(r.status === 200 && Array.isArray(j.items) && j.at, 'closures served from KV');
console.assert((await worker.fetch(new Request('https://x/secrets.txt'), env)).status === 404, 'only known files');
const writes = kv.size; await worker.scheduled({}, env);
console.log('files', [...kv.keys()].filter(k => !k.startsWith('etag:')), 'closures items', j.items.length, 'max-age', r.headers.get('cache-control'), 'keys', writes, '→', kv.size);
