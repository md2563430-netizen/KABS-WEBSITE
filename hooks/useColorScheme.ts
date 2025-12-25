'use client'

import { useEffect, useState } from 'react'

export type ColorScheme = 'light' | 'dark'

export function useColorScheme(): ColorScheme {
  const [scheme, setScheme] = useState<ColorScheme>('dark')

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    const apply = () => setScheme(mq?.matches ? 'dark' : 'light')
    apply()

    if (!mq) return
    const handler = () => apply()

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }

    const legacyMq = mq as unknown as {
      addListener?: (cb: () => void) => void
      removeListener?: (cb: () => void) => void
    }

    legacyMq.addListener?.(handler)
    return () => legacyMq.removeListener?.(handler)
  }, [])

  return scheme
}
