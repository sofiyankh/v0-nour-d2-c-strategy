'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Check, AlertCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    customer_name: user?.name || '',
    customer_email: user?.email || '',
    customer_phone: '',
    customer_address: '',
    customer_city: '',
    postal_code: '',
  })

  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <h1 className="font-amiri text-3xl font-bold text-foreground">يجب تسجيل الدخول</h1>
            <p className="text-muted-foreground">يجب عليك تسجيل الدخول لإتمام عملية الشراء</p>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                اذهب إلى تسجيل الدخول
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <h1 className="font-amiri text-3xl font-bold text-foreground">سلتك فارغة</h1>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                متابعة التسوق
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data: authUser } = await supabase.auth.getUser()
      if (!authUser.user) throw new Error('User not authenticated')

      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: authUser.user.id,
            customer_name: formData.customer_name,
            customer_email: formData.customer_email,
            customer_phone: formData.customer_phone,
            customer_address: formData.customer_address,
            customer_city: formData.customer_city,
            postal_code: formData.postal_code,
            total_amount: total,
            status: 'pending',
            items_data: JSON.stringify(items),
          }
        ])
        .select()

      if (orderError) throw orderError

      if (order && order[0]) {
        setOrderId(order[0].id)
        setOrderPlaced(true)
        clearCart()
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء معالجة الطلب')
      console.error('Order error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-secondary" />
            </div>
            <div className="space-y-2">
              <h1 className="font-amiri text-3xl font-bold text-foreground">تم الطلب بنجاح!</h1>
              <p className="text-muted-foreground">
                رقم طلبك: <span className="font-semibold text-foreground">{orderId.slice(0, 8)}</span>
              </p>
            </div>
            <p className="text-muted-foreground">
              سيتم إرسال تأكيد الطلب إلى بريدك الإلكتروني قريباً
            </p>
            <Link href="/account">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11">
                عرض طلباتي
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" className="w-full h-11">
                متابعة التسوق
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-amiri text-3xl font-bold text-foreground mb-8">إتمام الشراء</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="font-semibold text-lg text-foreground">معلومات التسليم</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">الاسم الكامل</label>
                        <Input
                          name="customer_name"
                          value={formData.customer_name}
                          onChange={handleInputChange}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">البريد الإلكتروني</label>
                        <Input
                          type="email"
                          name="customer_email"
                          value={formData.customer_email}
                          onChange={handleInputChange}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">رقم الهاتف</label>
                        <Input
                          type="tel"
                          name="customer_phone"
                          value={formData.customer_phone}
                          onChange={handleInputChange}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">المدينة</label>
                        <Input
                          name="customer_city"
                          value={formData.customer_city}
                          onChange={handleInputChange}
                          required
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">العنوان</label>
                      <textarea
                        name="customer_address"
                        value={formData.customer_address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-lg"
                        placeholder="الشارع والحي والعنوان التفصيلي"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">الرمز البريدي</label>
                      <Input
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg"
                  >
                    {loading ? 'جاري المعالجة...' : 'تأكيد الطلب'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-4">
                <h2 className="font-semibold text-lg text-foreground mb-6">ملخص الطلب</h2>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b border-border">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground ml-4">
                        {(item.price * item.quantity).toFixed(2)} د.ت
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-border pt-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>المجموع:</span>
                    <span>{total.toFixed(2)} د.ت</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>الشحن:</span>
                    <span>مجاني</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                    <span>الإجمالي:</span>
                    <span className="text-primary">{total.toFixed(2)} د.ت</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
