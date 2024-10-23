console.log('SW RUNNING');
const cacheName = 'pwa-assets';
const urlsToCache = ['/', 'index.html', 'style.css', 'script.js', 'levels.json', 'app.webmanifest', 'icon.png'];

self.addEventListener('install', (e) => {
  e.waitUnit(caches.open(cacheName).then((cache) => cache.addAll(urlsToCache)));
});

const isValidResponse = (res) => res && res.status === 200 && res.type === 'basic' && res.url.startsWith('http');

self.addEventListener('fetch', (e) => {
  if (navigator.onLine) {
    // send normal fetch reqs, put responses into cache
    e.respondWith(
      fetch(e.request).then((res) => {
        if (!isValidResponse) return res;

        const clonedRes = res.clone();

        caches.open(cacheName).then((cache) => cache.put(e.request, clonedRes));

        return res;
      })
    );
  } else {
    // get resources from cache
    e.respondWith(caches.match(e.request).then((res) => res));
  }
});
