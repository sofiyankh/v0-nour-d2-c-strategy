'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group h-full flex flex-col glass dark:glass-dark rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.isNew && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              جديد
            </div>
          )}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full">
              -{product.discount}%
            </div>
          )}
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute bottom-3 right-3 p-2 glass backdrop-blur-lg rounded-full transition-colors shadow-lg hover:shadow-xl"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-4 gap-3">
          {/* Category */}
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({product.reviews} تقييم)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-primary">{product.price.toFixed(2)} د.ت</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice.toFixed(2)} د.ت
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className={`w-full transition-all duration-300 ${
              isAdded
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            <ShoppingCart className="w-4 h-4 ml-2" />
            {isAdded ? 'تم الإضافة' : 'أضف للسلة'}
          </Button>
        </div>
      </div>
    </Link>
  )
}
