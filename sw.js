const CACHE="ai-lam-net-anh-v4";
const STATIC_ASSETS=["./manifest.json","./icon.svg"];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(STATIC_ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

async function networkFirst(request){
  try{
    const response=await fetch(request,{cache:"no-store"});
    if(response&&response.ok){
      const cache=await caches.open(CACHE);
      cache.put(request,response.clone());
    }
    return response;
  }catch(error){
    const cached=await caches.match(request);
    return cached||Response.error();
  }
}

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  const isAppPage=event.request.mode==="navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/");
  if(isAppPage){
    event.respondWith(networkFirst(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached)return cached;
      return fetch(event.request).then(response=>{
        if(response&&response.ok && url.origin===self.location.origin){
          caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));
        }
        return response;
      });
    })
  );
});