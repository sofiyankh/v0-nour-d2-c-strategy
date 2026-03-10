'use client'

import { useEffect } from 'react'
import { AuthProvider } from '@/lib/auth-context'
import { CartProvider } from '@/lib/cart-context'
import { setupDemoData } from '@/lib/setup-demo'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupDemoData()
  }, [])

  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  )
}
