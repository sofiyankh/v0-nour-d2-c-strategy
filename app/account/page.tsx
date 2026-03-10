'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Please Log In</h1>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Go to Login
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const orders = JSON.parse(localStorage.getItem('nour_orders') || '[]').filter(
    (order: any) => order.userId === user.id
  )

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">حسابي</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  تسجيل الخروج
                </Button>
              </div>
            </div>

            {/* Orders Section */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">طلباتي</h2>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">لا توجد طلبات حتى الآن</p>
                    <Link href="/shop">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        ابدأ التسوق
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div
                        key={order.id}
                        className="border border-border rounded-lg p-4 hover:bg-muted transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              Order #{order.id}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString('ar-TN')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status === 'pending' && 'قيد الانتظار'}
                            {order.status === 'shipped' && 'تم الشحن'}
                            {order.status === 'completed' && 'مكتمل'}
                          </span>
                        </div>

                        <div className="space-y-2 py-3 border-y border-border">
                          {order.items.map((item: any) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-foreground">{item.name}</span>
                              <span className="text-muted-foreground">
                                {item.quantity}x ${item.price}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-semibold text-foreground">
                            Total: ${order.total.toFixed(2)}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-primary border-primary hover:bg-primary/10"
                          >
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
