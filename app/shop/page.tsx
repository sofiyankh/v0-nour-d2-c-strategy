'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingBag } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Argan Oil Face Serum',
    nameAr: 'سيروم زيت الأرغان للوجه',
    price: 450,
    category: 'Serums',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop',
    description: 'Luxurious serum with pure Tunisian argan oil for radiant skin',
    ingredients: ['Argan Oil', 'Vitamin E', 'Rose Water'],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Pomegranate Hydrating Cream',
    nameAr: 'كريم الرمان المرطب',
    price: 380,
    category: 'Moisturizers',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop',
    description: 'Rich moisturizer with pomegranate extract from southern Tunisia',
    ingredients: ['Pomegranate Extract', 'Shea Butter', 'Aloe Vera'],
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Olive Leaf Face Mask',
    nameAr: 'قناع أوراق الزيتون',
    price: 280,
    category: 'Masks',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop',
    description: 'Detoxifying mask with antioxidant olive leaf extract',
    ingredients: ['Olive Leaf Extract', 'Clay', 'Green Tea'],
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 4,
    name: 'Jasmine Body Lotion',
    nameAr: 'لوشن الياسمين للجسم',
    price: 320,
    category: 'Body Care',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop',
    description: 'Silky body lotion infused with Tunisian jasmine fragrance',
    ingredients: ['Jasmine Extract', 'Coconut Oil', 'Vitamin C'],
    rating: 4.6,
    reviews: 156,
  },
  {
    id: 5,
    name: 'Orange Blossom Cleanser',
    nameAr: 'منظف أزهار البرتقال',
    price: 240,
    category: 'Cleansers',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop',
    description: 'Gentle cleansing gel with orange blossom water',
    ingredients: ['Orange Blossom Water', 'Aloe Vera', 'Chamomile'],
    rating: 4.8,
    reviews: 198,
  },
  {
    id: 6,
    name: 'Carrot Oil Eye Cream',
    nameAr: 'كريم العيون بزيت الجزر',
    price: 390,
    category: 'Eye Care',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=500&fit=crop',
    description: 'Specialized eye cream with beta-carotene rich carrot seed oil',
    ingredients: ['Carrot Seed Oil', 'Vitamin A', 'Peptides'],
    rating: 4.9,
    reviews: 103,
  },
]

const categories = ['All', 'Serums', 'Moisturizers', 'Masks', 'Body Care', 'Cleansers', 'Eye Care']

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            تسوق منتجاتنا
          </h1>
          <p className="text-xl text-muted-foreground">
            جميع منتجات NOUR الطبيعية المصنوعة خصيصاً لبشرتك
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">الفئات</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative h-64 bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
                >
                  <Heart
                    className="w-5 h-5"
                    fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.nameAr}</p>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-muted'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price} دج</span>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    أضف
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
