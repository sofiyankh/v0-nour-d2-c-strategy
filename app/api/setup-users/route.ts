import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const DEMO_USERS = [
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

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const results = []

    for (const user of DEMO_USERS) {
      try {
        console.log('[v0] Processing user:', user.email)

        // First try to delete existing user if they exist
        try {
          const { data: listData } = await supabase.auth.admin.listUsers()
          const existingUser = listData?.users?.find((u) => u.email === user.email)
          if (existingUser) {
            console.log('[v0] Deleting existing user:', user.email)
            await supabase.auth.admin.deleteUser(existingUser.id)
          }
        } catch (deleteErr) {
          console.log('[v0] Could not delete existing user (may not exist):', user.email)
        }

        console.log('[v0] Creating auth user:', user.email)

        // Create user with admin API
        const { data, error: createError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: {
            name: user.name,
            is_admin: user.isAdmin,
          },
        })

        if (createError) {
          console.error('[v0] Error creating user:', createError)
          results.push({
            email: user.email,
            success: false,
            message: createError.message,
          })
          continue
        }

        // Create profile
        if (data.user) {
          // First delete existing profile if it exists
          await supabase.from('profiles').delete().eq('id', data.user.id)

          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: user.email,
              full_name: user.name,
              is_admin: user.isAdmin,
              phone: user.email === 'admin@nour.tn' ? '+216 20 000 000' : '+216 XX XXX XXX',
              address: user.email === 'admin@nour.tn' ? 'Tunis Center' : 'Tunisia',
              city: user.email === 'admin@nour.tn' ? 'Tunis' : 'Tunis',
            })

          if (profileError) {
            console.error('[v0] Error creating profile:', profileError)
            results.push({
              email: user.email,
              success: false,
              message: `User created but profile error: ${profileError.message}`,
            })
          } else {
            console.log('[v0] User created successfully:', user.email)
            results.push({
              email: user.email,
              success: true,
              message: 'User created successfully',
            })
          }
        }
      } catch (error: any) {
        console.error('[v0] Unexpected error for user:', user.email, error)
        results.push({
          email: user.email,
          success: false,
          message: error?.message || 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Setup complete. ${results.filter((r) => r.success).length}/${DEMO_USERS.length} users created.`,
    })
  } catch (error: any) {
    console.error('[v0] Setup error:', error)
    return NextResponse.json(
      { success: false, message: error?.message || 'Setup failed' },
      { status: 500 }
    )
  }
}
