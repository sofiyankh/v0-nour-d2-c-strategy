'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Trash2, CheckCircle, Clock, Truck } from 'lucide-react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const statusLabels: Record<string, string> = {
    pending: 'قيد الانتظار',
    processing: 'قيد المعالجة',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغى',
  }
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    processing: 'bg-blue-50 text-blue-700 border-blue-200',
    shipped: 'bg-purple-50 text-purple-700 border-purple-200',
    delivered: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)

      if (error) throw error
      loadOrders()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return

    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId)

      if (error) throw error
      loadOrders()
    } catch (error) {
      console.error('Error deleting order:', error)
    }
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin/dashboard">
            <ArrowLeft className="w-5 h-5 text-foreground cursor-pointer hover:text-primary" />
          </Link>
          <h1 className="font-amiri text-2xl font-bold text-foreground">إدارة الطلبات</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا توجد طلبات</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-foreground">#{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary">{order.total_amount.toFixed(2)} د.ت</p>
                </div>

                <div className="space-y-3 mb-4 text-sm">
                  <p className="text-foreground"><strong>الزبون:</strong> {order.customer_name}</p>
                  <p className="text-foreground"><strong>البريد:</strong> {order.customer_email}</p>
                  <p className="text-foreground"><strong>الهاتف:</strong> {order.customer_phone}</p>
                  <p className="text-foreground"><strong>العنوان:</strong> {order.customer_address}</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`px-3 py-2 rounded-lg border ${statusColors[order.status]}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
