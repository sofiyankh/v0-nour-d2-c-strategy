'use client'

import { Card } from '@/components/ui/card'
import { Droplet, Leaf, Flower, Gem, Check } from 'lucide-react'

const ingredients = [
  {
    name: 'زيت الصبار',
    arabic: 'Prickly Pear Oil',
    description: 'مليء بمضادات الأكسدة والفيتامينات، يحارب الشيخوخة ويعيد الإشراق',
    icon: Leaf,
    benefits: ['مكافحة الشيخوخة', 'ترطيب عميق', 'إصلاح البشرة'],
  },
  {
    name: 'الزيتون التونسي',
    arabic: 'Tunisian Olive Oil',
    description: 'سكوالان طبيعي من زيتون البحر المتوسط، ينعم ويحمي',
    icon: Droplet,
    benefits: ['حماية طبيعية', 'تنعيم الجلد', 'مرطب قوي'],
  },
  {
    name: 'ماء الورد',
    arabic: 'Rose Water',
    description: 'مقتطف من وردة دمشق التونسية، ينقي ويرطب في نفس الوقت',
    icon: Flower,
    benefits: ['تنقية لطيفة', 'توازن الرطوبة', 'رائحة طبيعية'],
  },
  {
    name: 'الغسول الطبيعي',
    arabic: 'Ghassoul Clay',
    description: 'طين تقليدي من الصحراء التونسية، تنظيف عميق دون تقسية',
    icon: Gem,
    benefits: ['تنظيف عميق', 'إزالة السموم', 'لا تجفف الجلد'],
  },
]

export default function Ingredients() {
  return (
    <section id="ingredients" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-lg flex items-center justify-center gap-2"><Leaf className="w-5 h-5" /> المكونات النجمية</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            مكونات تونسية <br />
            <span className="text-primary">مُختارة بعناية</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            كل مكون مصدره محلي، معروف، ومثبوت علمياً. لا نستخدم شيء إلا إذا كان الأفضل
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ingredients.map((ingredient, idx) => (
            <Card
              key={idx}
              className="overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="p-6 space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ingredient.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Name */}
                <div>
                  <h3 className="font-bold text-foreground text-lg">{ingredient.name}</h3>
                  <p className="text-xs text-primary font-semibold">{ingredient.arabic}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{ingredient.description}</p>

                {/* Benefits */}
                <div className="space-y-2 pt-4 border-t border-border">
                  {ingredient.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust section */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</p>
              <p className="text-foreground font-semibold">طبيعية</p>
              <p className="text-sm text-muted-foreground mt-1">بدون إضافات صناعية</p>
            </div>
            <div className="text-center border-l border-r border-border">
              <p className="text-3xl md:text-4xl font-bold text-secondary mb-2">تونسية</p>
              <p className="text-foreground font-semibold">مصدرها محلي</p>
              <p className="text-sm text-muted-foreground mt-1">دعماً للاقتصاد المحلي</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">موثوقة</p>
              <p className="text-foreground font-semibold">معامل معتمدة</p>
              <p className="text-sm text-muted-foreground mt-1">ISO و ECOCERT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
