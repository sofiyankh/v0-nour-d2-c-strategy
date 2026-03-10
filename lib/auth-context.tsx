'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('nour_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user:', error)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Demo: Check against stored users
    const users = JSON.parse(localStorage.getItem('nour_users') || '[]')
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    localStorage.setItem('nour_user', JSON.stringify(userWithoutPassword))
  }

  const register = async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem('nour_users') || '[]')
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already registered')
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      password, // Note: In production, this would be hashed
    }

    users.push(newUser)
    localStorage.setItem('nour_users', JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem('nour_user', JSON.stringify(userWithoutPassword))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nour_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
