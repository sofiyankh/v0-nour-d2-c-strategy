'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { products } from '@/lib/products'
import ProductCard from '@/components/product-card'

const featuredProducts = products.slice(0, 4)

export default function Products() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <p className="text-primary font-semibold text-lg uppercase tracking-wider">مجموعتنا المميزة</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            منتجات فاخرة <br />
            <span className="text-primary">من تونس</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            كل منتج مصمم بدقة لحل احتياج معين، باستخدام أفضل المكونات الطبيعية التونسية المختارة
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/shop">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold flex items-center gap-2 mx-auto">
              تصفحي جميع المنتجات
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
