'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-primary font-semibold text-sm">📬 ابقي على اطلاع</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              نسخة حصرية <br />
              <span className="text-primary">للعاشقات NOUR</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              احصلي على نصائح الجمال، والعروض الخصية، والمنتجات الجديدة أولاً. لا رسائل عشوائية، فقط محتوى يستحق وقتك.
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  placeholder="بريدك الإلكتروني..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 h-12 rounded-lg border-2 border-border focus:border-primary bg-background"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-lg font-semibold"
              >
                {submitted ? 'تم الاشتراك! ✓' : 'اشتركي الآن'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              ✓ سهل إلغاء الاشتراك في أي وقت | لا نشارك بريدك مع أحد
            </p>
          </form>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-border">
            <div className="text-center">
              <p className="font-semibold text-foreground">+5,000</p>
              <p className="text-sm text-muted-foreground">عاشقة NOUR</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border"></div>
            <div className="text-center">
              <p className="font-semibold text-foreground">⭐⭐⭐⭐⭐</p>
              <p className="text-sm text-muted-foreground">تقييم مثالي</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border"></div>
            <div className="text-center">
              <p className="font-semibold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground">دعم العملاء</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
