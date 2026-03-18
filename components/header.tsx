'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, LogOut, LogIn, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import CartSidebar from '@/components/cart-sidebar'
import ThemeToggle from '@/components/theme-toggle'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              نور
            </Link>
            <p className="text-xs text-muted-foreground">NOUR</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <div className="relative group">
              <Link href="/shop" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                منتجات
                <span className="text-xs">▼</span>
              </Link>
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/skincare" className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary rounded-t-lg">
                  العناية بالبشرة
                </Link>
                <Link href="/makeup" className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary rounded-b-lg border-t border-border">
                  المكياج
                </Link>
              </div>
            </div>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              قصتنا
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              تواصل معنا
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-foreground hover:text-primary transition-colors hidden md:block"
            >
              <ShoppingBag className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary transition-colors">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                  <span className="text-xs">▼</span>
                </button>
                <div className="absolute right-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/account" className="block px-4 py-3 text-foreground hover:bg-muted hover:text-primary rounded-t-lg">
                    حسابي
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-3 text-foreground hover:bg-muted hover:text-primary rounded-b-lg border-t border-border flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-primary/10 border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <LogIn className="w-4 h-4" />
                  تسجيل الدخول
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/skincare" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded">
              العناية بالبشرة
            </Link>
            <Link href="/makeup" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded">
              المكياج
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded">
              قصتنا
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded">
              تواصل معنا
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="w-full flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>السلة ({items.length})</span>
            </button>
            {user ? (
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded"
              >
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </button>
            ) : (
              <Link href="/login" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 justify-center">
                  <LogIn className="w-4 h-4" />
                  تسجيل الدخول
                </Button>
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
