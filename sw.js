// Etern Spire: serve a/ files (content-hashed, never change) from the cache the loading screen filled
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{ const u=new URL(e.request.url); if(e.request.method!=='GET'||u.origin!==location.origin||!/\/a\/[0-9a-f]{16}\./.test(u.pathname)) return;
  e.respondWith(caches.open('etern-assets').then(async c=>{ const r=await c.match(u.href); if(r) return r; const n=await fetch(u.href); if(n.status===200) c.put(u.href,n.clone()); return n; })); });
