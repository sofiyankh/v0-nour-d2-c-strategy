'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestAuthPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [testResult, setTestResult] = useState<any>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/debug/users')
        const data = await response.json()
        setTestResult(data)
      } catch (error) {
        console.error('[v0] Error fetching debug data:', error)
        setTestResult({ error: error })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const testLogin = async (email: string, password: string) => {
    console.log(`[v0] Testing login with ${email}`)
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('[v0] Login result:', { 
        success: !error, 
        error: error?.message,
        userId: data?.user?.id 
      })

      alert(`Login ${error ? 'FAILED' : 'SUCCESS'}: ${error?.message || 'User authenticated'}`)
    } catch (err: any) {
      console.error('[v0] Login error:', err)
      alert(`Login ERROR: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-background">
      <h1 className="text-4xl font-bold mb-6">Authentication Debug & Test</h1>

      {/* Database Users */}
      <section className="mb-12 p-6 bg-card rounded-lg border border-border">
        <h2 className="text-2xl font-bold mb-4">Database Users</h2>
        {loading ? (
          <p>Loading...</p>
        ) : testResult?.database?.profiles ? (
          <div>
            <p className="mb-4 text-green-600">✓ Connected to database</p>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Admin</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testResult.database.profiles.map((profile: any) => (
                    <tr key={profile.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-2 font-mono">{profile.email}</td>
                      <td className="p-2">{profile.full_name}</td>
                      <td className="p-2">{profile.is_admin ? '✓ Yes' : 'No'}</td>
                      <td className="p-2">
                        <button
                          onClick={() => testLogin(profile.email, 
                            profile.is_admin ? 'Admin@123456' : 'Customer@123456'
                          )}
                          className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs"
                        >
                          Test Login
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-red-600">✗ Failed to load profiles: {testResult?.database?.profilesError}</p>
        )}
      </section>

      {/* Raw Debug Data */}
      <section className="p-6 bg-card rounded-lg border border-border">
        <h2 className="text-2xl font-bold mb-4">Raw Debug Data</h2>
        <pre className="bg-muted p-4 rounded overflow-auto text-xs">
          {JSON.stringify(testResult, null, 2)}
        </pre>
      </section>
    </div>
  )
}
