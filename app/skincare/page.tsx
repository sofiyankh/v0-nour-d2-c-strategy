'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductGrid from '@/components/product-grid'
import { getProductsByCategory } from '@/lib/products'

const skincareProducts = getProductsByCategory('skincare')

export default function SkincarePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 via-background to-primary/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
                  العناية بالبشرة الطبيعية
                </h1>
                <p className="text-xl text-muted-foreground">
                  منتجات عناية بالبشرة مصنوعة من أفضل المكونات التونسية الطبيعية. مصممة خصيصاً لبشرة البحر المتوسط.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">100% طبيعي</p>
                    <p className="text-sm text-muted-foreground">مكونات طبيعية نقية بدون مواد كيميائية ضارة</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">صُنع محلياً</p>
                    <p className="text-sm text-muted-foreground">من قبل نساء تونسيات بخبرة وعناية</p>
                  </div>
                </div>
              </div>
              <div className="h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center border border-primary/10">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌿</div>
                  <p className="text-muted-foreground">منتجات العناية بالبشرة الفاخرة</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">منتجاتنا</h2>
            <ProductGrid products={skincareProducts} showFilters={false} />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-secondary/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">فوائد منتجاتنا</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'ترطيب عميق',
                  description: 'صيغ غنية توفر ترطيباً عميقاً وطويل الأمد للبشرة',
                },
                {
                  title: 'مضادات الأكسدة',
                  description: 'مكونات غنية بمضادات الأكسدة تحمي البشرة من الضرر',
                },
                {
                  title: 'مضادة للشيخوخة',
                  description: 'تقلل من الخطوط الدقيقة والتجاعيد بشكل طبيعي',
                },
              ].map((benefit, index) => (
                <div key={index} className="bg-card rounded-lg p-6 border border-border hover:border-primary/30 transition-all">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
