'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Facebook, Music } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 text-foreground py-16 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-border/20">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-bold text-primary">نور</h3>
              <p className="text-sm text-muted-foreground">NOUR</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              مستحضرات جمال طبيعية 100% مصنوعة من المكونات التونسية لبشرتك المتوسطية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  قصتنا
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  المكونات
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">خدمة العملاء</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+216 XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@nour.tn</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <span>تونس</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">تابعينا</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-3 bg-primary hover:bg-primary/90 text-foreground rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-primary hover:bg-primary/90 text-foreground rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-primary hover:bg-primary/90 text-foreground rounded-lg transition-colors"
                aria-label="TikTok"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-background/70">
              تابعينا على التوسائل الاجتماعية للحصول على نصائح حصرية
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="grid md:grid-cols-2 gap-4 text-sm text-background/70">
          <div>
            <p>© 2026 NOUR. جميع الحقوق محفوظة.</p>
          </div>
          <div className="flex gap-4 md:justify-end">
            <Link href="/" className="hover:text-primary transition-colors">
              سياسة الخصوصية
            </Link>
            <span>|</span>
            <Link href="/" className="hover:text-primary transition-colors">
              شروط الاستخدام
            </Link>
            <span>|</span>
            <Link href="/" className="hover:text-primary transition-colors">
              سياسة الإرجاع
            </Link>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-center pt-8 border-t border-background/20">
          <p className="text-lg font-semibold text-primary">
            Grown here. Made for you.
          </p>
          <p className="text-sm text-background/70 mt-2">
            نور جلدك. نور حياتك.
          </p>
        </div>
      </div>
    </footer>
  )
}
