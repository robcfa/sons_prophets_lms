-- Location: supabase/migrations/20241216120001_fix_user_role_enum_conflict.sql
-- Fix for user_role enum type conflict - Safe migration handling

-- 1. Drop existing types if they exist (in dependency order)
DROP TYPE IF EXISTS public.user_role CASCADE;
DROP TYPE IF EXISTS public.account_status CASCADE;
DROP TYPE IF EXISTS public.plan_type CASCADE;

-- 2. Recreate types with proper error handling
DO $$
BEGIN
    -- Create user_role enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('admin', 'coach', 'member');
    END IF;
    
    -- Create account_status enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_status') THEN
        CREATE TYPE public.account_status AS ENUM ('active', 'inactive', 'suspended');
    END IF;
    
    -- Create plan_type enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type') THEN
        CREATE TYPE public.plan_type AS ENUM ('free', 'plus', 'premium');
    END IF;
END $$;

-- 3. Ensure user_profiles table exists with proper structure
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    role public.user_role DEFAULT 'member'::public.user_role,
    status public.account_status DEFAULT 'active'::public.account_status,
    plan public.plan_type DEFAULT 'free'::public.plan_type,
    phone TEXT,
    location TEXT,
    website TEXT,
    spiritual_gifts TEXT[],
    ministry_focus TEXT,
    years_experience INTEGER DEFAULT 0,
    is_available_for_coaching BOOLEAN DEFAULT false,
    coaching_rate DECIMAL(10,2),
    coaching_bio TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Ensure profile_views table exists
CREATE TABLE IF NOT EXISTS public.profile_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    viewed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create indexes if they don't exist
DO $$
BEGIN
    -- Check and create indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_user_id') THEN
        CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_role') THEN
        CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_status') THEN
        CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_plan') THEN
        CREATE INDEX idx_user_profiles_plan ON public.user_profiles(plan);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_coaching') THEN
        CREATE INDEX idx_user_profiles_coaching ON public.user_profiles(is_available_for_coaching);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profile_views_profile_id') THEN
        CREATE INDEX idx_profile_views_profile_id ON public.profile_views(profile_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profile_views_viewer_id') THEN
        CREATE INDEX idx_profile_views_viewer_id ON public.profile_views(viewer_id);
    END IF;
END $$;

-- 6. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;

-- 7. Helper Functions (recreate with OR REPLACE)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_coach()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'coach'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_coach_profile(profile_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = profile_uuid 
    AND up.role = 'coach'::public.user_role 
    AND up.is_available_for_coaching = true
)
$$;

CREATE OR REPLACE FUNCTION public.can_view_profile(profile_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT CASE
    WHEN auth.uid() IS NULL THEN 
        -- Public can view coach profiles only
        public.is_coach_profile(profile_uuid)
    WHEN auth.uid() = profile_uuid THEN 
        -- Users can view their own profile
        true
    ELSE 
        -- Authenticated users can view any profile
        true
END
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role, plan)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'member'::public.user_role),
    COALESCE((NEW.raw_user_meta_data->>'plan')::public.plan_type, 'free'::public.plan_type)
  );  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 8. Create triggers if they don't exist
DO $$
BEGIN
    -- Check if trigger exists before creating
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at') THEN
        CREATE TRIGGER update_user_profiles_updated_at
            BEFORE UPDATE ON public.user_profiles
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;

-- 9. Drop and recreate RLS policies to avoid conflicts
DROP POLICY IF EXISTS "public_can_view_coach_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "authenticated_can_view_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "users_manage_own_profile" ON public.user_profiles;
DROP POLICY IF EXISTS "admins_manage_all_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "authenticated_can_view_profile_views" ON public.profile_views;
DROP POLICY IF EXISTS "authenticated_can_create_profile_views" ON public.profile_views;

-- Recreate policies
CREATE POLICY "public_can_view_coach_profiles"
ON public.user_profiles
FOR SELECT
TO public
USING (
    role = 'coach'::public.user_role 
    AND is_available_for_coaching = true 
    AND status = 'active'::public.account_status
);

CREATE POLICY "authenticated_can_view_profiles"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.can_view_profile(id));

CREATE POLICY "users_manage_own_profile"
ON public.user_profiles
FOR ALL
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "admins_manage_all_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "authenticated_can_view_profile_views"
ON public.profile_views
FOR SELECT
TO authenticated
USING (
    viewer_id = auth.uid() OR 
    profile_id = auth.uid() OR
    public.is_admin()
);

CREATE POLICY "authenticated_can_create_profile_views"
ON public.profile_views
FOR INSERT
TO authenticated
WITH CHECK (viewer_id = auth.uid());

-- 10. Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT ON public.user_profiles TO authenticated;
GRANT UPDATE ON public.user_profiles TO authenticated;
GRANT INSERT ON public.profile_views TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- 11. Verification function
CREATE OR REPLACE FUNCTION public.verify_migration_fix()
RETURNS TABLE(
    check_name TEXT,
    status TEXT,
    details TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        'user_role enum exists' as check_name,
        CASE WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') 
             THEN 'OK' ELSE 'ERROR' END as status,
        'Type definition: ' || array_to_string(enum_range(NULL::public.user_role), ', ') as details
    
    UNION ALL
    
    SELECT
        'user_profiles table exists' as check_name,
        CASE WHEN EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_profiles') 
             THEN 'OK' ELSE 'ERROR' END as status,
        'Table created successfully' as details
    
    UNION ALL
    
    SELECT
        'RLS enabled' as check_name,
        CASE WHEN (SELECT relrowsecurity FROM pg_class WHERE relname = 'user_profiles') 
             THEN 'OK' ELSE 'ERROR' END as status,
        'Row Level Security is active' as details;
END;
$$;

-- Test the migration fix
SELECT * FROM public.verify_migration_fix();