'use client'

import { useEffect } from 'react'

/**
 * Komponen pembersih Service Worker.
 * Berfungsi mencabut registrasi Service Worker lama dan menghapus cache lokal peramban
 * guna mencegah penyajian konten HTML basi (stale content) pada Next.js App Router.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().catch(() => {
            // Abaikan kegagalan unregister peramban
          })
        }
      })

      if ('caches' in window) {
        caches.keys().then((keys) => {
          for (const key of keys) {
            caches.delete(key).catch(() => {
              // Abaikan kegagalan penghapusan cache
            })
          }
        })
      }
    }
  }, [])

  return null
}
