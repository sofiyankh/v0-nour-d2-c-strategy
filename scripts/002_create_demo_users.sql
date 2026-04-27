-- Demo Admin User
-- Email: admin@nour.tn
-- Password: Admin@123456
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@nour.tn',
  crypt('Admin@123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "Admin NOUR", "role": "admin"}'::jsonb
) ON CONFLICT DO NOTHING;

-- Add admin user to admin_users table
INSERT INTO public.admin_users (user_id, email, name, role, created_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@nour.tn',
  'Admin NOUR',
  'admin',
  now()
) ON CONFLICT DO NOTHING;

-- Demo Customer User 1
-- Email: customer@example.com
-- Password: Customer@123456
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  'customer@example.com',
  crypt('Customer@123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "Sarah Ahmed"}'::jsonb
) ON CONFLICT DO NOTHING;

-- Add customer profile
INSERT INTO public.profiles (id, name, email, phone, address)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Sarah Ahmed',
  'customer@example.com',
  '+216 95 123 456',
  'Tunis, Tunisia'
) ON CONFLICT DO NOTHING;

-- Demo Customer User 2
-- Email: demo@nour.tn
-- Password: Demo@123456
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  'demo@nour.tn',
  crypt('Demo@123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "Leila Ben Ahmed"}'::jsonb
) ON CONFLICT DO NOTHING;

-- Add customer profile
INSERT INTO public.profiles (id, name, email, phone, address)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'Leila Ben Ahmed',
  'demo@nour.tn',
  '+216 97 456 789',
  'Sousse, Tunisia'
) ON CONFLICT DO NOTHING;

-- Demo Admin User 2
-- Email: support@nour.tn
-- Password: Support@123456
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '44444444-4444-4444-4444-444444444444',
  'support@nour.tn',
  crypt('Support@123456', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"name": "Support Team", "role": "admin"}'::jsonb
) ON CONFLICT DO NOTHING;

-- Add admin user to admin_users table
INSERT INTO public.admin_users (user_id, email, name, role, created_at)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'support@nour.tn',
  'Support Team',
  'admin',
  now()
) ON CONFLICT DO NOTHING;
