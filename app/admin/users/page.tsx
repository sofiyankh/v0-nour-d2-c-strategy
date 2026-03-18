'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
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
          <h1 className="font-amiri text-2xl font-bold text-foreground">إدارة المستخدمين</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا توجد مستخدمون</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4">
                  {user.first_name} {user.last_name}
                </h3>
                <div className="space-y-3 text-sm">
                  {user.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {user.phone}
                    </div>
                  )}
                  {user.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {user.address}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  انضم: {new Date(user.created_at).toLocaleDateString('ar-SA')}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
