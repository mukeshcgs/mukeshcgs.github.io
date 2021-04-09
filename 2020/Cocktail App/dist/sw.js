const staticCacheName = 'static-assets-v2';
const dynamicCacheName = 'dynamic-assets-v1';
const assets = [
    '/',
    '/index.html',
    '/drink-list.html',
    '/drink-details.html',
    '/fallback.html',
    './css/main.min.css',
    './js/app.min.js'
];

//cache size limit
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}


self.addEventListener("install", e => {
    console.log("Installed decode 22");
    e.waitUntil(caches.open(staticCacheName).then(cache => {
        cache.addAll(assets)
    }))
})
//activate event
self.addEventListener('activate', e => {
    console.log('Service worker has been activated');
    e.waitUntil(
        caches.keys().then(keys => {
            console.log(keys);
            return Promise.all(
                keys.filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener("fetch", e => {
    //console.log(`Intercepting fetch request for : ${e.request.url}`);
    // e.respondWith(
    //     caches.match(e.request).then(casheResponse => {
    //         return casheResponse || fetch(e.request).then(fetchRes => {
    //             return caches.open(dynamicCacheName).then(cache => {
    //                 cache.put(e.request.url, fetchRes.clone());
    //                 limitCacheSize(dynamicCacheName, 12)
    //                 return fetchRes;
    //             })
    //         })
    //     }).catch(() => {
    //         if (e.request.url.indexOf('.html') > -1) {
    //             return caches.match('/fallback.html')
    //         }
    //     })
    // )
})