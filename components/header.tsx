'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

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
            <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
              منتجات
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              قصتنا
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              تواصل معنا
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link href="/shop">
              <Button
                variant="outline"
                size="icon"
                className="hidden md:flex bg-primary/10 border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </Link>

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
            <Link href="/shop" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded">
              منتجات
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded">
              قصتنا
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded">
              تواصل معنا
            </Link>
            <Link href="/shop" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <ShoppingBag className="w-4 h-4 mr-2" />
                تسوق الآن
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
