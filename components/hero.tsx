'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-nour-cream to-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-semibold text-lg">
                ✨ نور جلدك
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                نهضة جمالك <br />
                <span className="text-primary">من تونس</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                مستحضرات طبيعية 100% تُصنع من مكونات تونسية مختارة بعناية لبشرتك المتوسطية. ما أنتِ بحاجة إليه موجود هنا.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/shop">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all">
                  اكتشفي المنتجات
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 h-auto rounded-lg"
                >
                  اقرأي قصتنا
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">مكونات طبيعية</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">تونسية</p>
                <p className="text-sm text-muted-foreground">مصنوعة بفخر</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">65-75%</p>
                <p className="text-sm text-muted-foreground">جودة عالية</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">ضمان</p>
                <p className="text-sm text-muted-foreground">رضاك أولاً</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
              {/* Glass effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 backdrop-blur-md z-10" />
              
              {/* Hero image */}
              <Image
                src="/images/hero-illustration.jpg"
                alt="NOUR Beauty - Mediterranean Beauty"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay text */}
              <div className="absolute inset-0 flex items-end justify-center p-8 z-20">
                <div className="text-center space-y-4">
                  <p className="text-white font-semibold text-lg drop-shadow-lg">
                    Grown here. Made for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
