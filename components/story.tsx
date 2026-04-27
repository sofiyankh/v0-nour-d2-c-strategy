'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Microscope, Heart, Globe } from 'lucide-react'

export default function Story() {
  return (
    <section id="story" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Visual */}
          <div className="relative hidden md:flex">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
              {/* Image - NO BLUR */}
              <Image
                src="/images/story-new.jpg"
                alt="Tunisian Women Creating NOUR"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-semibold text-lg flex items-center gap-2"><Heart className="w-5 h-5" /> قصتنا</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                نحن بنينا ما تمنيّا <span className="text-primary">أن نجده</span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              المرأة التونسية المعاصرة تستحق علامة تجارية تفهمها حقاً. ليست مقلدة من أوروبا، وليست رخيصة محلية. 
              بل هي ماركة تُحتفي ببشرتها المتوسطية، بثقافتها، وطموحاتها.
            </p>

            <div className="space-y-4 py-8 border-y border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">مصنوعة محلياً</h3>
                  <p className="text-muted-foreground text-sm">
                    كل منتج يُصنع في تونس باستخدام معامل تونسية موثوقة مع أعلى معايير الجودة العالمية
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                    <Microscope className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">مُختبرة علمياً</h3>
                  <p className="text-muted-foreground text-sm">
                    كل صيغة مصممة خصيصاً لبشرتك المتوسطية: مستويات UV عالية، رطوبة معتدلة، أصباغ طبيعية
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">100% طبيعية</h3>
                  <p className="text-muted-foreground text-sm">
                    بدون كيماويات ضارة. بدون اختبار على الحيوانات. بدون تنازلات على الجودة
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              تحت قيادة فريق تونسي متخصص في الجمال والعلوم، وبشراكة مع أفضل المعامل المحلية، 
              أطلقنا NOUR — ليس فقط مستحضر عناية، بل حركة تقول: <span className="text-primary font-semibold">أنتِ تستحقين الأفضل.</span>
            </p>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto rounded-lg">
              اقرأي قصتنا الكاملة
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
