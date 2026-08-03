/* Service worker — lecteur d'epub krlx
 * Stratégies :
 *  - navigation : network-first, repli sur le cache (offline après 1re visite)
 *  - epub : cache-first, mis en cache à la volée (lecture offline des livres déjà ouverts)
 *  - assets statiques (js/css/images/fonts) : stale-while-revalidate
 */
const CACHE = 'krlx-reader-v1'
const CACHEABLE_EXT = /\.(js|css|svg|png|webp|jpg|jpeg|woff2?|ttf|epub)$/

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.add('/reader').catch(() => { /* app shell non précaché */ }))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Navigation (pages) : réseau d'abord, cache en secours
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/reader')))
    )
    return
  }

  // epub : cache d'abord (une fois ouvert, disponible hors-ligne)
  if (url.pathname.endsWith('.epub')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone()
              caches.open(CACHE).then((cache) => cache.put(request, copy))
            }
            return response
          })
      )
    )
    return
  }

  // Assets statiques : stale-while-revalidate
  if (CACHEABLE_EXT.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone()
              caches.open(CACHE).then((cache) => cache.put(request, copy))
            }
            return response
          })
          .catch(() => cached)
        return cached || network
      })
    )
  }
})
