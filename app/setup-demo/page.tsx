'use client'

import { useState } from 'react'
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
      const setupResults = []

      for (const user of DEMO_USERS) {
        try {
          console.log('[v0] Setting up user:', user.email)

          // First, delete if exists
          try {
            await supabase.auth.admin.deleteUser(user.email)
          } catch (e) {
            // Ignore if user doesn't exist
          }

          // Create user with Supabase admin API
          const { data, error: signUpError } = await supabase.auth.admin.createUser({
            email: user.email,
            password: user.password,
            email_confirm: true,
            user_metadata: {
              name: user.name,
              is_admin: user.isAdmin,
            },
          })

          if (signUpError) {
            console.error('[v0] Signup error:', signUpError)
            setupResults.push({
              email: user.email,
              success: false,
              message: `Error: ${signUpError.message}`,
            })
            continue
          }

          // Create profile
          if (data?.user) {
            const { error: profileError } = await supabase.from('profiles').upsert({
              id: data.user.id,
              email: user.email,
              full_name: user.name,
              is_admin: user.isAdmin,
              created_at: new Date().toISOString(),
            })

            if (profileError) {
              console.error('[v0] Profile error:', profileError)
              setupResults.push({
                email: user.email,
                success: false,
                message: `User created but profile failed: ${profileError.message}`,
              })
            } else {
              console.log('[v0] User setup success:', user.email)
              setupResults.push({
                email: user.email,
                success: true,
                message: `Successfully created`,
              })
            }
          }
        } catch (err: any) {
          console.error('[v0] Setup error for', user.email, err)
          setupResults.push({
            email: user.email,
            success: false,
            message: `Error: ${err?.message || 'Unknown error'}`,
          })
        }
      }

      setResults(setupResults)
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
          <h1 className="text-3xl font-bold mb-6 text-foreground">Setup Demo Users</h1>

          <p className="text-muted-foreground mb-6">
            This will create 4 demo user accounts (2 admin, 2 customer) with proper Supabase authentication.
          </p>

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
            <div className="mt-8 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <p className="text-green-700 dark:text-green-200 font-semibold">
                ✓ All demo users created successfully! You can now login with the credentials.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
