const CACHE_NAME = 'wb-warehouses-sec-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Никогда не кэшируем POST-запросы и обращения к Google Apps Script / Яндекс.Картам
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) {
    return;
  }

  // Стратегия Network-First для мгновенного получения обновлений интерфейса
  event.respondWith(
    fetch(req)
      .then((networkResp) => {
        const copy = networkResp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return networkResp;
      })
      .catch(() => caches.match(req))
  );
});self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Пустой обработчик для активации PWA в Chrome
});
