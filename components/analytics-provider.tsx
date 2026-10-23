'use client'

import { useSyncExternalStore } from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const emptySubscribe = () => () => {}

function useIsNonLocal() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const host = window.location.hostname
      return !['localhost', '127.0.0.1'].includes(host) && !host.endsWith('.local')
    },
    () => false
  )
}

export function AnalyticsProvider() {
  const isNonLocal = useIsNonLocal()

  if (!isNonLocal) {
    return null
  }

  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  )
} 