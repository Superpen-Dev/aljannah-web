
-- Insert the admin user into auth.users table
-- Note: This is a special case for seeding an admin user
-- In production, users would normally sign up through the app

-- First, let's insert the user with a hashed password
-- The password 'iamfirdaus' will be hashed by Supabase
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'sani@adminaljannah.com',
  crypt('iamfirdaus', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Sani Admin"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- The trigger we created earlier (handle_new_user) will automatically
-- create a profile entry for this user
