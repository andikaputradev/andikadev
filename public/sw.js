// Service Worker Cleanup Script
// Berfungsi untuk mencabut pendaftaran Service Worker lama dan menghapus cache basi di peramban pengguna

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then((clients) => {
        clients.forEach((client) => {
          if (client.url && 'navigate' in client) {
            client.navigate(client.url)
          }
        })
      })
  )
})
