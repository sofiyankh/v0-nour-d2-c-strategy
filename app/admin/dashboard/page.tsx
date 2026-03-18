'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { LogOut, ShoppingCart, Package, Users, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser()
        if (userError || !authUser) {
          router.push('/admin/login')
          return
        }

        setUser(authUser)

        // Load statistics
        const [ordersData, productsData, usersData] = await Promise.all([
          supabase.from('orders').select('*', { count: 'exact' }),
          supabase.from('products').select('*', { count: 'exact' }),
          supabase.from('profiles').select('*', { count: 'exact' }),
        ])

        // Calculate total revenue
        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount')

        const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

        setStats({
          totalOrders: ordersData.count || 0,
          totalRevenue,
          totalProducts: productsData.count || 0,
          totalUsers: usersData.count || 0,
        })
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-amiri text-2xl font-bold text-foreground">لوحة التحكم</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground">الطلبات</h3>
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground">الإيرادات</h3>
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalRevenue.toFixed(2)} د.ت</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground">المنتجات</h3>
              <Package className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalProducts}</p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground">المستخدمون</h3>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/orders">
            <div className="bg-card rounded-lg border border-border hover:border-primary/50 p-6 cursor-pointer transition-all">
              <ShoppingCart className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">إدارة الطلبات</h2>
              <p className="text-muted-foreground text-sm">عرض وتحديث حالة الطلبات</p>
            </div>
          </Link>

          <Link href="/admin/products">
            <div className="bg-card rounded-lg border border-border hover:border-primary/50 p-6 cursor-pointer transition-all">
              <Package className="w-8 h-8 text-secondary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">إدارة المنتجات</h2>
              <p className="text-muted-foreground text-sm">إضافة وتعديل وحذف المنتجات</p>
            </div>
          </Link>

          <Link href="/admin/users">
            <div className="bg-card rounded-lg border border-border hover:border-primary/50 p-6 cursor-pointer transition-all">
              <Users className="w-8 h-8 text-accent mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">إدارة المستخدمين</h2>
              <p className="text-muted-foreground text-sm">عرض وإدارة بيانات المستخدمين</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
