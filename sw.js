const CACHE_NAME = "habit-tracker-v39";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
    "./splash.png",
    "./sw.js",
    "./contact-config.js"
];


// نصب Service Worker
self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

});


// حذف کش‌های قدیمی
self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(keys => {

            return Promise.all(
                keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );

        })
    );

});


// کار با فایل‌های کش شده
self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request).then(response => {

            return response || fetch(event.request);

        })
    );

});
