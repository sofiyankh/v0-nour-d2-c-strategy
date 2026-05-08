'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, Loader } from 'lucide-react'

interface DemoUser {
  email: string
  password: string
  name: string
  isAdmin: boolean
}

const DEMO_USERS: DemoUser[] = [
  {
    email: 'admin@nour.tn',
    password: 'Admin@123456',
    name: 'Admin NOUR',
    isAdmin: true,
  },
  {
    email: 'support@nour.tn',
    password: 'Support@123456',
    name: 'Support Team',
    isAdmin: true,
  },
  {
    email: 'customer@example.com',
    password: 'Customer@123456',
    name: 'Sarah Ahmed',
    isAdmin: false,
  },
  {
    email: 'demo@nour.tn',
    password: 'Demo@123456',
    name: 'Leila Ben Ahmed',
    isAdmin: false,
  },
]

export default function SetupDemoPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ email: string; success: boolean; message: string }[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const setupDemoUsers = async () => {
    setLoading(true)
    setResults([])
    setError(null)

    try {
      console.log('[v0] Starting demo user setup...')
      const response = await fetch('/api/setup-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.success) {
        console.log('[v0] Setup successful:', data.results)
        setResults(data.results)
      } else {
        console.error('[v0] Setup failed:', data.message)
        setError(data.message)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to setup demo users')
      console.error('[v0] Setup failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="glass dark:glass-dark rounded-2xl p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Setup Demo Users</h1>
              <p className="text-muted-foreground">Create test accounts for NOUR</p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
            <p className="text-amber-700 dark:text-amber-200 text-sm">
              ⚡ This creates 4 demo accounts with full Supabase authentication. After setup, use these credentials to login.
            </p>
          </div>

          <Button
            onClick={setupDemoUsers}
            disabled={loading}
            className="w-full mb-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Setting up users...
              </>
            ) : (
              'Create Demo Users'
            )}
          </Button>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-200">{error}</p>
              </div>
            </div>
          )}

          {results.length === 0 && !error && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700 dark:text-blue-200">
                  <p className="font-semibold mb-2">Demo Users Created:</p>
                  <ul className="space-y-1 text-xs">
                    <li>👤 admin@nour.tn / Admin@123456 (Admin)</li>
                    <li>👤 support@nour.tn / Support@123456 (Admin)</li>
                    <li>👤 customer@example.com / Customer@123456 (Customer)</li>
                    <li>👤 demo@nour.tn / Demo@123456 (Customer)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-semibold text-foreground mb-4">Setup Results:</h2>
              {results.map((result) => (
                <div
                  key={result.email}
                  className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                >
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-mono text-sm font-medium">{result.email}</p>
                    <p className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                      {result.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.length > 0 && results.every((r) => r.success) && (
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-700 dark:text-green-200 font-semibold mb-4">
                  ✓ All demo users created successfully!
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-mono text-xs">📧 customer@example.com / Customer@123456</p>
                  <p className="font-mono text-xs">📧 admin@nour.tn / Admin@123456</p>
                </div>
              </div>
              <Link href="/login">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                  Go to Login →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
