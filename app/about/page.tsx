'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/20 to-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            قصة نور
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            من أرض تونس الخصبة إلى جمالك. NOUR هي أكثر من مجرد علامة تجارية - إنها حركة لتمكين النساء التونسيات من خلال الجمال الطبيعي
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">من نحن</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                NOUR (النور) وُلدت من رؤية بسيطة: تمكين النساء التونسيات بمنتجات تجميل طبيعية حقيقية مصنوعة محلياً. 
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                في عام 2019، بدأ فريقنا برحلة استكشاف أغنى موارد تونس الطبيعية - من زيت الأرغان النقي في الجنوب إلى ماء أزهار البرتقال في الشمال. اكتشفنا أن بشرتنا المتوسطية لديها احتياجات فريدة، واحتاجت إلى حل فريد.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                اليوم، نفتخر بأن نكون علامة تجارية تونسية 100% مملوكة للنساء، بقيادة نساء، وللنساء اللواتي يستحققن أفضل ما في الطبيعة.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg h-96 flex items-center justify-center border border-primary/20">
              <div className="text-center">
                <p className="text-6xl font-bold text-primary mb-4">2019</p>
                <p className="text-foreground font-semibold">تأسيس NOUR</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">قيمنا الأساسية</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'الطبيعية المطلقة',
                description: 'جميع منتجاتنا مصنوعة من المكونات الطبيعية 100%. لا مواد كيماوية قاسية، لا الزيوت المعدنية، لا الحيل التسويقية.',
                icon: '🌿',
              },
              {
                title: 'تمكين النساء',
                description: 'نحن مملوكة للنساء ومصنوعة من قبل النساء. جزء من أرباحنا يذهب إلى برامج تمكين النساء في تونس.',
                icon: '👩',
              },
              {
                title: 'الاستدامة',
                description: 'نحن نشتري من المزارعين المحليين بشكل أخلاقي، نستخدم تغليفاً قابلاً لإعادة التدوير، ونحافظ على بيئتنا.',
                icon: '♻️',
              },
            ].map((value, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">تأثيرنا</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'عميلة سعيدة' },
              { number: '500+', label: 'عامل محلي مستخدم' },
              { number: '100%', label: 'مكونات طبيعية' },
              { number: '95%', label: 'رضا العملاء' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl font-bold text-primary mb-3">{stat.number}</p>
                <p className="text-foreground text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">مصدر المكونات من تونس</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                region: 'تطاوين (الجنوب)',
                products: ['زيت الأرغان النقي', 'التمر والعسل', 'البخور الطبيعي'],
              },
              {
                region: 'منطقة نابل (الشرق)',
                products: ['البرتقال وأزهاره', 'الحمضيات الطازجة', 'ماء الورد'],
              },
              {
                region: 'صفاقس (الجنوب)',
                products: ['الزيتون والزيت', 'الرومان الحمراء', 'الأعشاب الطبيعية'],
              },
              {
                region: 'القصرين (الوسط)',
                products: ['الشيا والبذور', 'الأعشاب البرية', 'الأزهار المجففة'],
              },
            ].map((region, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">{region.region}</h3>
                <ul className="space-y-2">
                  {region.products.map((product, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">انضمي إلى حركة النور</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            اكتشفي قوة المكونات الطبيعية من تونس وانضمي إلى آلاف النساء اللواتي غيرن حياتهن جمالياً
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">
            تسوق الآن
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
