-- Create admin user using Supabase's auth functions
-- We need to use the auth.signup function or create via Supabase dashboard

-- First, let's check if we can create a function to handle admin user creation
CREATE OR REPLACE FUNCTION public.create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create a profile for the admin user manually
  -- The user will need to be created via Supabase dashboard or signup flow
  INSERT INTO public.profiles (
    user_id,
    email,
    full_name,
    role
  ) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'sani@adminaljannah.com',
    'Sani Admin',
    'admin'
  ) ON CONFLICT (user_id) DO NOTHING;
END;
$$;

-- Call the function to create the profile
SELECT public.create_admin_user();