import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Test 1: Check if we can connect to database
    console.log('[v0] Testing Supabase connection...')

    // Test 2: Get all users from profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name, is_admin, created_at')
      .limit(10)

    console.log('[v0] Profiles query:', { 
      hasError: !!profilesError,
      errorMessage: profilesError?.message,
      profileCount: profiles?.length || 0
    })

    // Test 3: Try to get auth users (if service role is available)
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    console.log('[v0] Auth users query:', {
      hasError: !!authError,
      errorMessage: authError?.message,
      userCount: authUsers?.users?.length || 0
    })

    return NextResponse.json({
      status: 'success',
      database: {
        connected: true,
        profiles: profiles || [],
        profilesError: profilesError?.message,
      },
      auth: {
        users: authUsers?.users?.map(u => ({
          id: u.id,
          email: u.email,
          emailConfirmedAt: u.email_confirmed_at,
        })) || [],
        authError: authError?.message,
      }
    })
  } catch (error: any) {
    console.error('[v0] Debug API error:', error)
    return NextResponse.json({
      status: 'error',
      message: error.message,
      details: error.toString()
    }, { status: 500 })
  }
}
