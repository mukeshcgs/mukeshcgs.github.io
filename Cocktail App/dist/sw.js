self.addEventListener("install", e => {
    console.log("Installed decode 22");
    e.waitUntil(caches.open("static").then(cache => {
        return cache.addAll(["./", "./css/main.min.css", "./js/app.min.js"])
    }))
})
//activate event
self.addEventListener('activate', e => {
    console.log('Service worker has been activated');
})

self.addEventListener("fetch", e => {
    console.log(`Intercepting fetch request for : ${e.request.url}`);
    e.respondWith(
        cashes.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})