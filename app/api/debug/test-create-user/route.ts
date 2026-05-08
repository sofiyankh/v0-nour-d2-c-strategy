import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    
    console.log('[v0] Testing user creation with admin client...')
    
    // Test creating a single user
    const testEmail = `test-${Date.now()}@example.com`
    
    const { data, error: createError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: 'Test@123456',
      email_confirm: true,
      user_metadata: {
        name: 'Test User',
      },
    })

    if (createError) {
      console.error('[v0] Auth error:', createError)
      return NextResponse.json({
        success: false,
        stage: 'auth_user_creation',
        error: createError.message,
        details: createError,
      })
    }

    console.log('[v0] Auth user created:', data.user?.id)

    // Test creating profile
    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: testEmail,
          full_name: 'Test User',
          phone: '+216 XX XXX XXX',
          address: 'Tunisia',
          city: 'Tunis',
          is_admin: false,
        })
        .select()

      if (profileError) {
        console.error('[v0] Profile error:', profileError)
        return NextResponse.json({
          success: false,
          stage: 'profile_creation',
          authUserId: data.user.id,
          error: profileError.message,
          details: profileError,
        })
      }

      console.log('[v0] Profile created:', profileData)
    }

    return NextResponse.json({
      success: true,
      message: 'Test user created successfully',
      userId: data.user?.id,
      email: testEmail,
    })
  } catch (error: any) {
    console.error('[v0] Unexpected error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Unknown error',
        details: error,
      },
      { status: 500 }
    )
  }
}
