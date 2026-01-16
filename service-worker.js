const cacheName = 'vikram-portfolio-v1';

const assetsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install
self.addEventListener('install', event => {
  console.log('[SW] Installing');
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assetsToCache))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
