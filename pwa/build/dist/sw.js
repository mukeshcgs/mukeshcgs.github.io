self.addEventListener("install", e => {
    console.log("Installed decode 22");
    e.waitUntil(caches.open("static").then(cache => {
            return cache.addAll(["./", "./css/main.min.css"])
        }

    ))
})
self.addEventListener("fetch", e => {
    console.log(`Intercepting fetch request for : ${e.request.url}`);
    e.respondWith(
        cashes.match(e.request).then(response => {
            return response || fetch(e.request)
        })
    )
})