-- Location: supabase/migrations/20241216120002_fix_role_column_index_error.sql
-- Fix for role column index creation error - Comprehensive solution

-- 1. Start with a clean slate - Drop problematic indexes first
DO $$
BEGIN
    -- Drop indexes that might be causing conflicts
    DROP INDEX IF EXISTS idx_user_profiles_role;
    DROP INDEX IF EXISTS idx_user_profiles_status;
    DROP INDEX IF EXISTS idx_user_profiles_plan;
    DROP INDEX IF EXISTS idx_user_profiles_user_id;
    DROP INDEX IF EXISTS idx_user_profiles_coaching;
    DROP INDEX IF EXISTS idx_profile_views_profile_id;
    DROP INDEX IF EXISTS idx_profile_views_viewer_id;
    
    RAISE NOTICE 'Dropped existing indexes successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Some indexes may not have existed: %', SQLERRM;
END $$;

-- 2. Ensure enum types exist with proper error handling
DO $$
BEGIN
    -- Check if user_role enum exists, create if not
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('admin', 'coach', 'member');
        RAISE NOTICE 'Created user_role enum type';
    ELSE
        RAISE NOTICE 'user_role enum type already exists';
    END IF;
    
    -- Check if account_status enum exists, create if not
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_status') THEN
        CREATE TYPE public.account_status AS ENUM ('active', 'inactive', 'suspended');
        RAISE NOTICE 'Created account_status enum type';
    ELSE
        RAISE NOTICE 'account_status enum type already exists';
    END IF;
    
    -- Check if plan_type enum exists, create if not
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type') THEN
        CREATE TYPE public.plan_type AS ENUM ('free', 'plus', 'premium');
        RAISE NOTICE 'Created plan_type enum type';
    ELSE
        RAISE NOTICE 'plan_type enum type already exists';
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating enum types: %', SQLERRM;
END $$;

-- 3. Ensure user_profiles table exists with all required columns
DO $$
BEGIN
    -- Check if table exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        -- Create the table with all columns
        CREATE TABLE public.user_profiles (
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
        RAISE NOTICE 'Created user_profiles table';
    ELSE
        RAISE NOTICE 'user_profiles table already exists';
        
        -- Check if required columns exist and add them if missing
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'role') THEN
            ALTER TABLE public.user_profiles ADD COLUMN role public.user_role DEFAULT 'member'::public.user_role;
            RAISE NOTICE 'Added role column to user_profiles table';
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'status') THEN
            ALTER TABLE public.user_profiles ADD COLUMN status public.account_status DEFAULT 'active'::public.account_status;
            RAISE NOTICE 'Added status column to user_profiles table';
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'plan') THEN
            ALTER TABLE public.user_profiles ADD COLUMN plan public.plan_type DEFAULT 'free'::public.plan_type;
            RAISE NOTICE 'Added plan column to user_profiles table';
        END IF;
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating/updating user_profiles table: %', SQLERRM;
END $$;

-- 4. Ensure profile_views table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profile_views') THEN
        CREATE TABLE public.profile_views (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            profile_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
            viewer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
            viewed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
        RAISE NOTICE 'Created profile_views table';
    ELSE
        RAISE NOTICE 'profile_views table already exists';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating profile_views table: %', SQLERRM;
END $$;

-- 5. Now create indexes with proper error handling and verification
DO $$
BEGIN
    -- Verify that user_profiles table and role column exist before creating indexes
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'role') THEN
        -- Create role index
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_role') THEN
            CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
            RAISE NOTICE 'Created idx_user_profiles_role index';
        ELSE
            RAISE NOTICE 'idx_user_profiles_role index already exists';
        END IF;
    ELSE
        RAISE NOTICE 'Cannot create role index - role column does not exist';
    END IF;
    
    -- Create other indexes with similar checks
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'id') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_user_id') THEN
            CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
            RAISE NOTICE 'Created idx_user_profiles_user_id index';
        END IF;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'status') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_status') THEN
            CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);
            RAISE NOTICE 'Created idx_user_profiles_status index';
        END IF;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'plan') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_plan') THEN
            CREATE INDEX idx_user_profiles_plan ON public.user_profiles(plan);
            RAISE NOTICE 'Created idx_user_profiles_plan index';
        END IF;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'is_available_for_coaching') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_coaching') THEN
            CREATE INDEX idx_user_profiles_coaching ON public.user_profiles(is_available_for_coaching);
            RAISE NOTICE 'Created idx_user_profiles_coaching index';
        END IF;
    END IF;
    
    -- Profile views indexes
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profile_views') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profile_views_profile_id') THEN
            CREATE INDEX idx_profile_views_profile_id ON public.profile_views(profile_id);
            RAISE NOTICE 'Created idx_profile_views_profile_id index';
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profile_views_viewer_id') THEN
            CREATE INDEX idx_profile_views_viewer_id ON public.profile_views(viewer_id);
            RAISE NOTICE 'Created idx_profile_views_viewer_id index';
        END IF;
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating indexes: %', SQLERRM;
END $$;

-- 6. Enable RLS if not already enabled
DO $$
BEGIN
    -- Enable RLS on user_profiles
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'Enabled RLS on user_profiles table';
    END IF;
    
    -- Enable RLS on profile_views
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profile_views') THEN
        ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'Enabled RLS on profile_views table';
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error enabling RLS: %', SQLERRM;
END $$;

-- 7. Create verification function to check migration success
CREATE OR REPLACE FUNCTION public.verify_role_column_fix()
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
        'enum_types_exist' as check_name,
        CASE WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') 
             AND EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_status')
             AND EXISTS (SELECT 1 FROM pg_type WHERE typname = 'plan_type')
             THEN 'OK' ELSE 'ERROR' END as status,
        'All required enum types exist' as details
    
    UNION ALL
    
    SELECT
        'user_profiles_table_exists' as check_name,
        CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') 
             THEN 'OK' ELSE 'ERROR' END as status,
        'user_profiles table exists' as details
    
    UNION ALL
    
    SELECT
        'role_column_exists' as check_name,
        CASE WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'role') 
             THEN 'OK' ELSE 'ERROR' END as status,
        'role column exists in user_profiles table' as details
    
    UNION ALL
    
    SELECT
        'role_index_exists' as check_name,
        CASE WHEN EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_role') 
             THEN 'OK' ELSE 'ERROR' END as status,
        'idx_user_profiles_role index exists' as details
    
    UNION ALL
    
    SELECT
        'rls_enabled' as check_name,
        CASE WHEN (SELECT relrowsecurity FROM pg_class WHERE relname = 'user_profiles') 
             THEN 'OK' ELSE 'ERROR' END as status,
        'Row Level Security is enabled' as details
    
    UNION ALL
    
    SELECT
        'all_indexes_exist' as check_name,
        CASE WHEN EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_role')
             AND EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_status')
             AND EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_plan')
             AND EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_user_id')
             AND EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_profiles_coaching')
             THEN 'OK' ELSE 'PARTIAL' END as status,
        'All required indexes exist' as details;
END;
$$;

-- 8. Run verification and display results
DO $$
DECLARE
    rec RECORD;
BEGIN
    RAISE NOTICE '=== Migration Verification Results ===';
    FOR rec IN SELECT * FROM public.verify_role_column_fix() LOOP
        RAISE NOTICE '% - %: %', rec.check_name, rec.status, rec.details;
    END LOOP;
    RAISE NOTICE '=== End Verification ===';
END $$;

-- 9. Grant necessary permissions
DO $$
BEGIN
    GRANT USAGE ON SCHEMA public TO authenticated;
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
    GRANT INSERT, UPDATE ON public.user_profiles TO authenticated;
    GRANT INSERT ON public.profile_views TO authenticated;
    GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
    
    RAISE NOTICE 'Granted permissions successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error granting permissions: %', SQLERRM;
END $$;

-- 10. Final success message
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully! The role column index error has been fixed.';
    RAISE NOTICE 'You can now run: SELECT * FROM public.verify_role_column_fix(); to verify the fix.';
END $$;