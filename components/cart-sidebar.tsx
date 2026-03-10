'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  const { user } = useAuth()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">سلتك</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">سلتك فارغة</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-muted rounded-lg p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">${item.price}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-background rounded hover:bg-border transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-background rounded hover:bg-border transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>

            {!user ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 mb-4">
                يجب عليك تسجيل الدخول لإتمام الشراء
              </div>
            ) : null}

            <Link href={user ? '/checkout' : '/login'} className="w-full block">
              <Button
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {user ? 'انتقل للدفع' : 'تسجيل الدخول'}
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full"
            >
              متابعة التسوق
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
