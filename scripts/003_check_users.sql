-- Check all auth users
SELECT id, email, email_confirmed_at, created_at FROM auth.users;

-- Check all profiles
SELECT id, email, full_name, is_admin FROM public.profiles;
