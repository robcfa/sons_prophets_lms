-- Location: supabase/migrations/20241216120000_user_profiles_with_auth.sql
-- User Profile Management Module - Authentication and Profile System

-- 1. Types and Enums
CREATE TYPE public.user_role AS ENUM ('admin', 'coach', 'member');
CREATE TYPE public.account_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.plan_type AS ENUM ('free', 'plus', 'premium');

-- 2. Core Tables
-- Critical intermediary table for PostgREST compatibility
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

-- Profile views tracking
CREATE TABLE public.profile_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    viewed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);
CREATE INDEX idx_user_profiles_plan ON public.user_profiles(plan);
CREATE INDEX idx_user_profiles_coaching ON public.user_profiles(is_available_for_coaching);
CREATE INDEX idx_profile_views_profile_id ON public.profile_views(profile_id);
CREATE INDEX idx_profile_views_viewer_id ON public.profile_views(viewer_id);

-- 4. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;

-- 5. Helper Functions
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

-- Function for automatic profile creation
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

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 6. Triggers
-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 7. RLS Policies
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

-- Profile views policies
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

-- 8. Complete Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    coach1_uuid UUID := gen_random_uuid();
    coach2_uuid UUID := gen_random_uuid();
    member_uuid UUID := gen_random_uuid();
BEGIN
    -- Create complete auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@sonsprophets.org', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "role": "admin", "plan": "premium"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (coach1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'coach.david@sonsprophets.org', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Pastor David Williams", "role": "coach", "plan": "plus"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (coach2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'coach.maria@sonsprophets.org', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Maria Rodriguez", "role": "coach", "plan": "premium"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (member_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'member.john@sonsprophets.org', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Smith", "role": "member", "plan": "free"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Update profiles with detailed information (profiles created automatically via trigger)
    UPDATE public.user_profiles SET
        bio = 'Platform administrator with years of experience in spiritual leadership and technology.',
        avatar_url = 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=200',
        phone = '+1-555-0101',
        location = 'Nashville, TN',
        ministry_focus = 'Leadership Development',
        spiritual_gifts = ARRAY['Leadership', 'Administration', 'Teaching']
    WHERE id = admin_uuid;

    UPDATE public.user_profiles SET
        bio = 'Experienced pastor and spiritual coach with over 15 years in ministry. Specializing in prophetic development and leadership mentoring.',
        coaching_bio = 'I help emerging leaders discover their prophetic gifts and develop them within a biblical framework. My approach combines practical mentoring with deep spiritual insight.',
        avatar_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        phone = '+1-555-0102',
        location = 'Atlanta, GA',
        website = 'https://pastordavid.org',
        ministry_focus = 'Prophetic Ministry',
        spiritual_gifts = ARRAY['Prophecy', 'Teaching', 'Pastor'],
        years_experience = 15,
        is_available_for_coaching = true,
        coaching_rate = 75.00
    WHERE id = coach1_uuid;

    UPDATE public.user_profiles SET
        bio = 'Bilingual ministry leader passionate about worship and intercession. Dedicated to helping others grow in their relationship with God.',
        coaching_bio = 'Enfocada en el desarrollo del don de intercesión y la adoración profética. Te ayudo a crecer en intimidad con Dios y desarrollar tu llamado.',
        avatar_url = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
        phone = '+1-555-0103',
        location = 'Miami, FL',
        ministry_focus = 'Worship & Intercession',
        spiritual_gifts = ARRAY['Intercession', 'Worship', 'Prophecy'],
        years_experience = 8,
        is_available_for_coaching = true,
        coaching_rate = 60.00
    WHERE id = coach2_uuid;

    UPDATE public.user_profiles SET
        bio = 'New believer passionate about learning and growing in faith. Currently exploring spiritual gifts and seeking mentorship.',
        avatar_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        phone = '+1-555-0104',
        location = 'Dallas, TX',
        ministry_focus = 'Personal Growth',
        spiritual_gifts = ARRAY['Helps']
    WHERE id = member_uuid;

    -- Add some profile views
    INSERT INTO public.profile_views (profile_id, viewer_id, viewed_at) VALUES
        (coach1_uuid, member_uuid, now() - interval '1 day'),
        (coach2_uuid, member_uuid, now() - interval '2 hours'),
        (coach1_uuid, admin_uuid, now() - interval '3 days');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 9. Cleanup Function
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@sonsprophets.org';

    -- Delete in dependency order (children first, then auth.users last)
    DELETE FROM public.profile_views WHERE profile_id = ANY(auth_user_ids_to_delete) OR viewer_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth.users last (after all references are removed)
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;