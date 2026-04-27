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

-- Add admin profile
INSERT INTO public.profiles (id, email, full_name, phone, address, city, is_admin, created_at)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@nour.tn',
  'Admin NOUR',
  '+216 20 000 000',
  'Tunis Center',
  'Tunis',
  true,
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
INSERT INTO public.profiles (id, email, full_name, phone, address, city, is_admin, created_at)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'customer@example.com',
  'Sarah Ahmed',
  '+216 95 123 456',
  'Tunis, Tunisia',
  'Tunis',
  false,
  now()
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
INSERT INTO public.profiles (id, email, full_name, phone, address, city, is_admin, created_at)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'demo@nour.tn',
  'Leila Ben Ahmed',
  '+216 97 456 789',
  'Sousse, Tunisia',
  'Sousse',
  false,
  now()
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

-- Add support admin profile
INSERT INTO public.profiles (id, email, full_name, phone, address, city, is_admin, created_at)
VALUES (
  '44444444-4444-4444-4444-444444444444',
  'support@nour.tn',
  'Support Team',
  '+216 70 000 000',
  'Tunis Center',
  'Tunis',
  true,
  now()
) ON CONFLICT DO NOTHING;
