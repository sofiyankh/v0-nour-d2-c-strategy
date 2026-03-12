'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const promos = [
  {
    id: 1,
    title: 'خصم 30% على العناية بالبشرة',
    subtitle: 'استمتعي بأفضل الأسعار على منتجات العناية',
    cta: 'تسوقي الآن',
    link: '/skincare',
    bgColor: 'from-primary/20 to-primary/5',
    textColor: 'text-primary',
  },
  {
    id: 2,
    title: 'العرض الحصري للمشتركات الجدد',
    subtitle: 'احصلي على هدية مع أول طلبك',
    cta: 'انضمي الآن',
    link: '/register',
    bgColor: 'from-secondary/20 to-secondary/5',
    textColor: 'text-secondary',
  },
  {
    id: 3,
    title: 'شحن مجاني على جميع الطلبات',
    subtitle: 'بدون حد أدنى للشراء',
    cta: 'تعرفي أكثر',
    link: '/shop',
    bgColor: 'from-accent/20 to-accent/5',
    textColor: 'text-accent',
  },
]

export default function PromoBanner() {
  const [currentPromo, setCurrentPromo] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay || !isVisible) return

    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, isVisible])

  const goToPromo = (index: number) => {
    setCurrentPromo(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 7000)
  }

  const nextPromo = () => {
    setCurrentPromo((prev) => (prev + 1) % promos.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 7000)
  }

  if (!isVisible) return null

  const promo = promos[currentPromo]

  return (
    <div className={`w-full bg-gradient-to-r ${promo.bgColor} border-b border-border relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-primary/20 -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 relative">
        <div className="flex items-center justify-between gap-4">
          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <div className="space-y-1">
              <h3 className={`font-bold text-lg md:text-xl text-foreground truncate ${promo.textColor}`}>
                {promo.title}
              </h3>
              <p className="text-sm text-muted-foreground hidden md:block">
                {promo.subtitle}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Link href={promo.link}>
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap text-sm md:text-base flex items-center gap-2"
              >
                {promo.cta}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
            aria-label="إغلاق الإعلان"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-3 md:hidden">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPromo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentPromo ? 'bg-primary w-6' : 'bg-primary/30 w-1.5'
              }`}
              aria-label={`الإعلان ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Auto-play indicator on desktop */}
      <div className="hidden md:block absolute bottom-1 right-4">
        <div className="flex gap-1">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPromo(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentPromo ? 'bg-primary/80 w-8' : 'bg-primary/30 w-2'
              }`}
              aria-label={`الإعلان ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
