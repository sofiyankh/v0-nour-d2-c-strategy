'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TestUserCreationPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testUserCreation = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/debug/test-create-user', {
        method: 'POST',
      })

      const data = await response.json()
      setResult(data)

      if (!data.success) {
        setError(data.error || 'Failed to create test user')
      }
    } catch (err: any) {
      setError(err?.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="glass dark:glass-dark rounded-2xl p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Test User Creation</h1>

          <p className="text-muted-foreground mb-6">
            This endpoint tests the full user creation flow and shows detailed error messages.
          </p>

          <Button
            onClick={testUserCreation}
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground mb-6"
          >
            {loading ? 'Testing...' : 'Test User Creation'}
          </Button>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-700 dark:text-red-200 font-mono text-sm whitespace-pre-wrap">
                {JSON.stringify(error, null, 2)}
              </p>
            </div>
          )}

          {result && (
            <div className={`rounded-lg p-4 mb-6 ${result.success ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
              <p className={`${result.success ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'} font-mono text-sm whitespace-pre-wrap`}>
                {JSON.stringify(result, null, 2)}
              </p>
            </div>
          )}

          <Link href="/setup-demo">
            <Button variant="outline" className="w-full">
              Back to Setup Demo Users
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
