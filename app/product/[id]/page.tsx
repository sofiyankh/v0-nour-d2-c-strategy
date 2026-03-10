'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Star, Heart, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getProductById, products } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const { addToCart } = useCart()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Back to Shop
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted px-4 py-3 border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`/${product.category}`}
              className="text-primary hover:underline capitalize"
            >
              {product.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden h-96">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {product.name}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-4">{product.nameAr}</p>
                  </div>
                  <button
                    onClick={() => setWishlist(!wishlist)}
                    className="p-3 bg-muted rounded-lg hover:bg-border transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        wishlist ? 'fill-primary text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="text-4xl font-bold text-primary mb-2">${product.price}</div>
                  <p className="text-green-600 font-medium">In Stock</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground mb-2">{product.description}</p>
                  <p className="text-muted-foreground">{product.descriptionAr}</p>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-2">Key Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 border-0 text-center"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 px-4 bg-muted">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="h-48 bg-muted overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{relatedProduct.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">${relatedProduct.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="text-sm text-muted-foreground">{relatedProduct.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
