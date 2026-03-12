'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/product-card'
import type { Product } from '@/lib/products'

interface ProductGridProps {
  products: Product[]
  showFilters?: boolean
}

export default function ProductGrid({ products, showFilters = false }: ProductGridProps) {
  const [sortBy, setSortBy] = useState('popular')
  const [filterCategory, setFilterCategory] = useState<string | null>(null)

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Filter by category if selected
    if (filterCategory) {
      result = result.filter((p) => p.category === filterCategory)
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // popular (default order)
        break
    }

    return result
  }, [products, filterCategory, sortBy])

  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-card p-4 rounded-lg border border-border">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterCategory === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg bg-background border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
          >
            <option value="popular">الأكثر شعبية</option>
            <option value="newest">الأحدث</option>
            <option value="price-low">السعر: الأقل أولاً</option>
            <option value="price-high">السعر: الأعلى أولاً</option>
            <option value="rating">التقييم الأعلى</option>
          </select>
        </div>
      )}

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">لا توجد منتجات متاحة</p>
        </div>
      )}
    </div>
  )
}
