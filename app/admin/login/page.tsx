'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, LogIn, Lock } from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      if (data.user) {
        // Check if user is admin
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('user_id', data.user.id)
          .single()

        if (adminError || !adminUser) {
          setError('You do not have admin access')
          await supabase.auth.signOut()
          return
        }

        // Hide URL and silently redirect without showing navigation
        setLoginSuccess(true)
        setTimeout(() => {
          window.location.href = '/admin/dashboard'
        }, 1000)
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-secondary/20 dark:to-primary/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h2 className="font-amiri text-2xl font-bold text-foreground">جاري التحويل...</h2>
          <p className="text-muted-foreground">تم التحقق بنجاح من بيانات الدخول</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-secondary/10 dark:via-background dark:to-primary/10" />
      
      {/* Animated background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-md">
          {/* Glass card with blur effect */}
          <div className="glass dark:glass-dark rounded-2xl p-8 space-y-6 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="font-amiri text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                لوحة التحكم
              </h1>
              <p className="text-muted-foreground">تسجيل دخول المسؤول الآمن</p>
            </div>

            {error && (
              <div className="bg-destructive/20 backdrop-blur-md border border-destructive/50 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">البريد الإلكتروني</label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="admin@nour.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 bg-white/10 dark:bg-black/20 border-white/30 dark:border-white/10 backdrop-blur-md text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-white/20 dark:focus:bg-black/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">كلمة المرور</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 bg-white/10 dark:bg-black/20 border-white/30 dark:border-white/10 backdrop-blur-md text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-white/20 dark:focus:bg-black/30 transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <LogIn className="w-4 h-4 ml-2" />
                {loading ? 'جاري التحقق...' : 'دخول آمن'}
              </Button>
            </form>

            <div className="pt-4 border-t border-white/20 dark:border-white/10">
              <p className="text-center text-xs text-muted-foreground">
                هذه المنطقة محمية ومخصصة للمسؤولين فقط
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
