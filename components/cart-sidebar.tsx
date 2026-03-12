'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react'
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

      {/* Full Screen Cart Slide Sheet */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-card border-l border-border shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ${
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
              <div key={item.id} className="flex gap-3 bg-muted rounded-lg p-3 hover:bg-muted/80 transition-colors">
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-background">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-sm font-bold text-primary mt-1">{item.price.toFixed(2)} د.ت</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 bg-background rounded hover:bg-border transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-background rounded hover:bg-border transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      aria-label="Remove item"
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
          <div className="border-t border-border p-4 space-y-4 bg-card">
            {/* Subtotal */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">المجموع:</span>
                <span className="text-foreground">{total.toFixed(2)} د.ت</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">الشحن:</span>
                <span className="text-foreground">مجاني</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="font-semibold text-foreground">الإجمالي:</span>
              <span className="text-xl font-bold text-primary">{total.toFixed(2)} د.ت</span>
            </div>

            {!user ? (
              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 text-sm text-secondary">
                يجب عليك تسجيل الدخول لإتمام الشراء
              </div>
            ) : null}

            <Link href={user ? '/checkout' : '/login'} className="w-full block">
              <Button
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {user ? 'انتقل للدفع' : 'تسجيل الدخول'}
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-primary text-primary hover:bg-primary/5"
            >
              متابعة التسوق
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
