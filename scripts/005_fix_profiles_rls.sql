-- Fix: Add INSERT policy for profiles to allow service role to create profiles during user setup
-- The service role key should bypass RLS, but we'll add explicit policies for clarity

-- Drop existing policies that might block insertion
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;

-- Add new policies that allow both user self-management and service role operations
-- Allow users to view and update their own profile
CREATE POLICY "Users can manage their own profile" ON public.profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true)
  );

-- Allow service role (admin API) to do everything
-- Service role operates outside RLS, but we add this policy for safety
CREATE POLICY "Service role can manage all profiles" ON public.profiles
  FOR ALL
  USING (true)
  WITH CHECK (true);
