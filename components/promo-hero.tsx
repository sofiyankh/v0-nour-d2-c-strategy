'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { useState } from 'react'

export default function PromoHero() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Promo Banner */}
      <div className="glass dark:glass-dark backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="font-amiri text-2xl font-bold text-primary mb-2">
                عرض خاص محدود الوقت
              </h2>
              <p className="text-foreground text-lg">
                احصلي على <span className="font-bold text-secondary">30% خصم</span> على جميع منتجات العناية بالبشرة
              </p>
            </div>
            <Link href="/shop" className="hidden sm:block">
              <button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                تسوقي الآن
              </button>
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Promotions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Promo 1 */}
          <Link href="/skincare">
            <div className="glass dark:glass-dark backdrop-blur-lg p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="font-amiri text-xl font-bold text-primary mb-2">
                العناية بالبشرة
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                أفضل منتجات الترطيب والعناية الطبيعية
              </p>
              <div className="text-primary font-bold">اكتشفي المزيد →</div>
            </div>
          </Link>

          {/* Promo 2 */}
          <Link href="/makeup">
            <div className="glass dark:glass-dark backdrop-blur-lg p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="font-amiri text-xl font-bold text-primary mb-2">
                المكياج الطبيعي
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                لون دافئ وتألق طبيعي على مدار اليوم
              </p>
              <div className="text-primary font-bold">اكتشفي المزيد →</div>
            </div>
          </Link>

          {/* Promo 3 */}
          <Link href="/about">
            <div className="glass dark:glass-dark backdrop-blur-lg p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
              <h3 className="font-amiri text-xl font-bold text-primary mb-2">
                قصتنا
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                تعرفي على رحلتنا من تونس إلى العالم
              </p>
              <div className="text-primary font-bold">اقرأي المزيد →</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
