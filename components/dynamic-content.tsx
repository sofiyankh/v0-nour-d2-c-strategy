'use client'

import { ReactNode } from 'react'
import { useHydrated } from '@/hooks/use-hydrated'

interface DynamicContentProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function DynamicContent({ children, fallback }: DynamicContentProps) {
  const isHydrated = useHydrated()

  if (!isHydrated) {
    return fallback || null
  }

  return <>{children}</>
}
