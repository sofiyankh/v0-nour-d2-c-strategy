'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductGrid from '@/components/product-grid'
import { getProductsByCategory } from '@/lib/products'

const makeupProducts = getProductsByCategory('makeup')

export default function MakeupPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
                  المكياج الفاخر
                </h1>
                <p className="text-xl text-muted-foreground">
                  منتجات مكياج مصنوعة من أفضل المكونات الطبيعية. لون دائم وملمس ناعم مثالي لكل بشرة.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">ألوان حيوية</p>
                    <p className="text-sm text-muted-foreground">ألوان غنية وحيوية تدوم طول اليوم</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">سهل الاستخدام</p>
                    <p className="text-sm text-muted-foreground">تركيبة سلسة سهلة الدمج والتطبيق</p>
                  </div>
                </div>
              </div>
              <div className="h-96 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center border border-secondary/10">
                <div className="text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <p className="text-muted-foreground">منتجات المكياج الفاخرة</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">منتجاتنا</h2>
            <ProductGrid products={makeupProducts} showFilters={false} />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">لماذا تختارين NOUR؟</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'تطبيق سلس',
                  description: 'تركيبة احترافية تضمن تطبيق سلس وموحد',
                },
                {
                  title: 'ألوان مذهلة',
                  description: 'ألوان مصنوعة من صبغات طبيعية آمنة وجميلة',
                },
                {
                  title: 'طويلة الأمد',
                  description: 'صيغ مقاومة للماء تدوم حتى 12 ساعة',
                },
              ].map((feature, index) => (
                <div key={index} className="bg-card rounded-lg p-6 border border-border hover:border-secondary/30 transition-all">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
