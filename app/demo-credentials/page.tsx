'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Copy, LogIn, Shield, Users } from 'lucide-react'

export default function DemoCredentialsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const credentials = [
    {
      type: 'Admin',
      icon: Shield,
      users: [
        {
          name: 'Admin NOUR',
          email: 'admin@nour.tn',
          password: 'Admin@123456',
          description: 'Full admin access to dashboard'
        },
        {
          name: 'Support Team',
          email: 'support@nour.tn',
          password: 'Support@123456',
          description: 'Support admin access'
        }
      ]
    },
    {
      type: 'Customer',
      icon: Users,
      users: [
        {
          name: 'Sarah Ahmed',
          email: 'customer@example.com',
          password: 'Customer@123456',
          description: 'Regular customer account'
        },
        {
          name: 'Leila Ben Ahmed',
          email: 'demo@nour.tn',
          password: 'Demo@123456',
          description: 'Demo customer account'
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">Demo Credentials</h1>
          <p className="text-lg text-muted-foreground">Use these accounts to test the NOUR application</p>
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {credentials.map((section) => {
            const IconComponent = section.icon
            return (
              <div key={section.type} className="space-y-6">
                <div className="flex items-center gap-3">
                  <IconComponent className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">{section.type} Accounts</h2>
                </div>

                <div className="space-y-4">
                  {section.users.map((user, idx) => (
                    <div key={idx} className="glass dark:glass-dark rounded-2xl p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{user.description}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-foreground block">Email</label>
                          <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-3">
                            <code className="text-sm text-foreground flex-1">{user.email}</code>
                            <button
                              onClick={() => copyToClipboard(user.email)}
                              className="p-2 hover:bg-muted/50 rounded transition-colors"
                              title="Copy email"
                            >
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-sm font-semibold text-foreground block">Password</label>
                          <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-3">
                            <code className="text-sm text-foreground flex-1">{user.password}</code>
                            <button
                              onClick={() => copyToClipboard(user.password)}
                              className="p-2 hover:bg-muted/50 rounded transition-colors"
                              title="Copy password"
                            >
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border">
                        {section.type === 'Admin' ? (
                          <Link href="/admin/login" className="block">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                              <LogIn className="w-4 h-4 ml-2" />
                              Go to Admin Login
                            </Button>
                          </Link>
                        ) : (
                          <Link href="/login" className="block">
                            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg">
                              <LogIn className="w-4 h-4 ml-2" />
                              Go to Customer Login
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Links */}
        <div className="glass dark:glass-dark rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/">
              <Button className="w-full bg-background hover:bg-muted border border-border rounded-lg text-foreground">
                Home Page
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                Admin Login
              </Button>
            </Link>
            <Link href="/login">
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg">
                Customer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="glass dark:glass-dark rounded-2xl p-8 space-y-4">
          <h3 className="text-xl font-bold text-foreground">How to Use</h3>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">1.</span>
              <span>Copy the email and password credentials from the sections above</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">2.</span>
              <span>Click "Go to Admin Login" for admin accounts or "Go to Customer Login" for customer accounts</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">3.</span>
              <span>Paste the credentials and log in</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary flex-shrink-0">4.</span>
              <span>Explore the admin dashboard or customer features</span>
            </li>
          </ol>
        </div>
      </div>
    </main>
  )
}
