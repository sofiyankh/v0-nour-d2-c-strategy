-- Delete existing demo users from auth.users and profiles
DELETE FROM public.profiles WHERE email IN ('admin@nour.tn', 'customer@example.com', 'demo@nour.tn', 'support@nour.tn');
DELETE FROM auth.users WHERE email IN ('admin@nour.tn', 'customer@example.com', 'demo@nour.tn', 'support@nour.tn');

-- Note: New users should be created through Supabase Auth API or client signUp
-- This will be done via a manual setup page or API endpoint
