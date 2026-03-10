'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            تواصلي معنا
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            أسئلة أو اقتراحات؟ نحن هنا للاستماع إليك. تواصلي معنا وسنرد عليك في أسرع وقت ممكن
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                title: 'الهاتف',
                content: '+216 71 123 456',
                subtext: 'من السبت إلى الأربعاء 9 صباحاً - 6 مساءً',
              },
              {
                icon: Mail,
                title: 'البريد الإلكتروني',
                content: 'hello@nour.tn',
                subtext: 'نرد عليك في غضون 24 ساعة',
              },
              {
                icon: MapPin,
                title: 'الموقع',
                content: 'تونس العاصمة',
                subtext: 'منطقة برج الخندق',
              },
              {
                icon: Clock,
                title: 'ساعات العمل',
                content: '9 صباحاً - 6 مساءً',
                subtext: 'السبت إلى الأربعاء',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-background border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground font-semibold mb-2">{item.content}</p>
                  <p className="text-sm text-muted-foreground">{item.subtext}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">أرسلي رسالة</h2>
              
              {submitted && (
                <div className="bg-secondary/10 border border-secondary rounded-lg p-4 mb-6">
                  <p className="text-secondary font-semibold">شكراً! تم استلام رسالتك. سنتواصل معك قريباً.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">الاسم الكامل</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخلي اسمك"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">البريد الإلكتروني</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">رقم الهاتف</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+216 XX XXX XXX"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">الموضوع</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="كيف يمكننا مساعدتك؟"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">الرسالة</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="أخبرينا عن احتياجاتك..."
                    required
                    className="w-full min-h-40"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg"
                >
                  أرسلي الرسالة
                </Button>
              </form>
            </div>

            {/* FAQ or Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">أسئلة شائعة</h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'ما هي مدة التوصيل؟',
                    a: 'يتم التوصيل في غضون 2-5 أيام عمل في تونس. التوصيل مجاني للطلبات فوق 150 دج.',
                  },
                  {
                    q: 'هل يمكنني استرجاع المنتج؟',
                    a: 'نعم، لديك 30 يوم لاسترجاع المنتج إذا كنت غير راضية. لا توجد أسئلة مطروحة.',
                  },
                  {
                    q: 'هل المنتجات آمنة للبشرة الحساسة؟',
                    a: 'جميع منتجاتنا مصنوعة من مكونات طبيعية 100%. لكن ننصحك باختبار على قطعة صغيرة من الجلد أولاً.',
                  },
                  {
                    q: 'هل تقدمون استشارات جمالية مجانية؟',
                    a: 'نعم! تواصلي معنا وسيساعدك فريق خبرائنا في اختيار المنتجات المناسبة لنوع بشرتك.',
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">ابقي على تواصل</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            اشتركي في نشرتنا الإخبارية للحصول على عروض خاصة وأخبار عن المنتجات الجديدة
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="أدخلي بريدك الإلكتروني"
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
              اشتركي
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
