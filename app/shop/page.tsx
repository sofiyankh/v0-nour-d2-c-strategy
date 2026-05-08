import { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductGrid from '@/components/product-grid'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop - NOUR',
  description: 'Browse our complete collection of premium natural cosmetics',
}

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                متجر NOUR
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                اكتشف مجموعتنا الكاملة من منتجات التجميل الطبيعية الفاخرة المصنوعة من المكونات التونسية الأصلية
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid products={products} showFilters={true} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
