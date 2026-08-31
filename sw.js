const C='iride-v24';
const A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./xlsx.full.min.js','./dati.xlsx'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; const url=new URL(r.url);
  const isPage = r.mode==='navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
  if(isPage){
    e.respondWith(fetch(new Request(r,{cache:'no-store'})).then(res=>{ const cp=res.clone(); caches.open(C).then(c=>{c.put('./index.html',cp.clone());c.put('./',cp);}); return res; })
      .catch(()=>caches.match('./index.html')));
    return;
  }
  if(url.pathname.endsWith('/dati.xlsx')){
    e.respondWith(fetch(new Request(r,{cache:'no-store'})).then(res=>{ const cp=res.clone(); caches.open(C).then(c=>c.put('./dati.xlsx',cp)); return res; })
      .catch(()=>caches.match('./dati.xlsx')));
    return;
  }
  e.respondWith(caches.match(r).then(x=>x||fetch(r)));
});
