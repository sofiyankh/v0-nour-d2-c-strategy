'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getProductsByCategory } from '@/lib/products'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function SkincareePage() {
  const products = getProductsByCategory('skincare')
  const [wishlist, setWishlist] = useState<string[]>([])

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-primary to-primary/70 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
          </div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">منتجات العناية بالبشرة</h1>
              <p className="text-xl text-white/90">
                Discover our premium skincare collection crafted for Mediterranean beauty
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                <div className="relative h-64 bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-muted transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.nameAr}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <Link href={`/product/${product.id}`}>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        عرض التفاصيل
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
