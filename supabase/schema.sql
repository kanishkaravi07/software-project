-- =========================================================
-- CAMPUSSHARE DATABASE SCHEMA & SEED SCRIPT FOR SUPABASE
-- =========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLE: PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('STUDENT', 'ADMIN')),
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE TABLE: ITEMS
CREATE TABLE IF NOT EXISTS public.items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Books', 'Electronics', 'Sports Equipment', 'Laboratory Equipment', 'Stationery', 'Other')),
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  available_quantity INTEGER NOT NULL CHECK (available_quantity >= 0),
  location TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('NEW', 'GOOD', 'FAIR')),
  status TEXT NOT NULL CHECK (status IN ('AVAILABLE', 'BORROWED', 'UNAVAILABLE')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE TABLE: BORROW_REQUESTS
CREATE TABLE IF NOT EXISTS public.borrow_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
  request_date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'RETURN_PENDING', 'COMPLETED')),
  borrow_date TIMESTAMPTZ,
  expected_return_date TIMESTAMPTZ,
  return_date TIMESTAMPTZ,
  admin_remark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.borrow_requests ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES FOR PROFILES
CREATE POLICY "Public profiles are readable by authenticated users" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 7. RLS POLICIES FOR ITEMS
CREATE POLICY "Items are readable by all authenticated users" ON public.items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert items" ON public.items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

CREATE POLICY "Admins can update items" ON public.items
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

CREATE POLICY "Admins can delete items" ON public.items
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- 8. RLS POLICIES FOR BORROW REQUESTS
CREATE POLICY "Students can view their own borrow requests, Admins view all" ON public.borrow_requests
  FOR SELECT USING (
    student_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

CREATE POLICY "Students can create borrow requests for themselves" ON public.borrow_requests
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own return requests, Admins update any" ON public.borrow_requests
  FOR UPDATE USING (
    student_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- 9. SEED DATA SAMPLE ITEMS
INSERT INTO public.items (item_name, category, description, image_url, quantity, available_quantity, location, condition, status)
VALUES
('Scientific Calculator (Casio FX-991EX)', 'Electronics', 'High-precision engineering calculator suitable for advanced mathematics, physics, and engineering coursework.', 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e498?w=600&auto=format&fit=crop&q=80', 5, 4, 'Lab 201 - Shelf B', 'GOOD', 'AVAILABLE'),
('Programming in C (ANSI C 8th Ed)', 'Books', 'Essential textbook for computer science foundation courses covering C syntax, pointers, memory allocation, and data structures.', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop&q=80', 10, 8, 'Central Library - Rack 14', 'GOOD', 'AVAILABLE'),
('Spalding Official Basketball', 'Sports Equipment', 'Standard size 7 composite leather basketball suitable for indoor gymnasium and outdoor campus court play.', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop&q=80', 3, 2, 'Sports Complex Room 3', 'GOOD', 'AVAILABLE'),
('Arduino Uno R3 Ultimate Starter Kit', 'Laboratory Equipment', 'Includes Arduino Uno board, breadboard, jumper wires, sensors, LEDs, motors, and step-by-step project manual.', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=600&auto=format&fit=crop&q=80', 4, 3, 'Robotics Workshop - Cabinet 1', 'NEW', 'AVAILABLE'),
('High-Speed 4K HDMI Cable (3 Meters)', 'Electronics', 'Braided HDMI 2.0 cable compatible with projectors, monitors, and laptops for presentations and seminars.', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', 8, 6, 'AV Room Storage', 'GOOD', 'AVAILABLE');
