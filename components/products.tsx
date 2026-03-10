'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'

const products = [
  {
    id: 1,
    name: 'مصل الصبار المتوهج',
    arabic: 'Prickly Pear Glow Serum',
    ingredient: 'زيت بذور الصبار العضوي',
    claim: 'مكافحة الشيخوخة والإشراق',
    price: '65 دينار',
    image: 'linear-gradient(135deg, #C4714A 0%, #D4945A 100%)',
    badge: 'الأكثر طلباً',
  },
  {
    id: 2,
    name: 'مرطب الزيتون وماء الورد',
    arabic: 'Olive & Rose Water Moisturizer',
    ingredient: 'سكوالان الزيتون + ماء الورد',
    claim: 'ترطيب 24 ساعة',
    price: '45 دينار',
    image: 'linear-gradient(135deg, #9B8B7E 0%, #B8A89C 100%)',
    badge: null,
  },
  {
    id: 3,
    name: 'نقاب الغسول المنقي',
    arabic: 'Ghassoul Purifying Ritual Mask',
    ingredient: 'الغسول التونسي الطبيعي',
    claim: 'تنظيف عميق وإشراق',
    price: '35 دينار',
    image: 'linear-gradient(135deg, #4A5E3A 0%, #6B8456 100%)',
    badge: null,
  },
  {
    id: 4,
    name: 'واقي البحر المتوسط',
    arabic: 'Mediterranean SPF Skin Veil',
    ingredient: 'حماية SPF30 + النياسينأميد',
    claim: 'حماية من الأشعة فوق البنفسجية',
    price: '55 دينار',
    image: 'linear-gradient(135deg, #D4A574 0%, #E8C5A0 100%)',
    badge: null,
  },
  {
    id: 5,
    name: 'زيت شفاه الصبار',
    arabic: 'Prickly Pear Lip Glow Oil',
    ingredient: 'زيت بذور الصبار النقي',
    claim: 'ترطيب وإشراق طبيعي',
    price: '20 دينار',
    image: 'linear-gradient(135deg, #C4714A 0%, #A85C45 100%)',
    badge: 'الأقل سعراً',
  },
]

export default function Products() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <section id="products" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-lg">مجموعتنا المميزة</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            خمسة منتجات <br />
            <span className="text-primary">تغير حياتك</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            كل منتج مصمم بدقة لحل احتياج معين، باستخدام أفضل المكونات الطبيعية التونسية
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-card h-48 md:h-56">
                <div
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  style={{ background: product.image }}
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {product.badge}
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
                >
                  <Heart
                    className="w-4 h-4"
                    fill={favorites.has(product.id) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-primary font-semibold mb-1">{product.ingredient}</p>
                  <h3 className="font-bold text-foreground text-sm">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.arabic}</p>
                </div>

                <p className="text-xs text-foreground italic">{product.claim}</p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-bold text-primary text-lg">{product.price}</span>
                  <Button
                    size="sm"
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <ShoppingCart className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg"
          >
            استكشفي كل المنتجات
          </Button>
        </div>
      </div>
    </section>
  )
}
