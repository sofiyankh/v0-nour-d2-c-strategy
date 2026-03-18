'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="glass dark:glass-dark rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
            <h1 className="text-3xl font-bold text-center text-foreground mb-2">
              تسجيل الدخول
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              Log in to your NOUR account
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                  كلمة المرور
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-primary-foreground font-semibold rounded-xl transition-all"
              >
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              ليس لديك حساب؟{' '}
              <Link href="/register" className="text-primary hover:text-primary/90 font-medium">
                إنشاء حساب جديد
              </Link>
            </p>

            <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              <p className="font-medium mb-2">Demo Credentials (للاختبار):</p>
              <p>Email: demo@nour.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
