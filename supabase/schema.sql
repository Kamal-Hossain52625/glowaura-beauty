-- ==============================================================================
-- Ayat & Amat (Fashion & Lifestyle) Complete Database Schema & Seed Data
-- Project URL: https://mefckadtnwygvcfpgyod.supabase.co
--
-- Instructions:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/mefckadtnwygvcfpgyod/sql
-- 2. Click "New Query"
-- 3. Paste this entire code and click "Run" (CMD+Enter or CTRL+Enter)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sku TEXT,
  brand TEXT DEFAULT 'Ayat & Amat',
  category TEXT NOT NULL,
  subcategory TEXT,
  regular_price NUMERIC(10, 2) NOT NULL,
  discount_price NUMERIC(10, 2) DEFAULT 0,
  stock_quantity INTEGER DEFAULT 50,
  stock_status TEXT DEFAULT 'in_stock',
  is_featured BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  short_description TEXT,
  description TEXT,
  ingredients TEXT,
  usage_instructions TEXT,
  specifications JSONB DEFAULT '{}'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  volume_or_size TEXT,
  country_of_origin TEXT DEFAULT 'Bangladesh',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  item_count INTEGER DEFAULT 0,
  subcategories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  district TEXT NOT NULL,
  city_area TEXT NOT NULL,
  full_address TEXT NOT NULL,
  delivery_note TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  delivery_charge NUMERIC(10, 2) DEFAULT 70,
  total NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'unpaid',
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  tracking_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  district TEXT,
  address TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Coupons Table
CREATE TABLE IF NOT EXISTS public.coupons (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL,
  discount_value NUMERIC(10, 2) NOT NULL,
  min_order_amount NUMERIC(10, 2) DEFAULT 0,
  max_discount NUMERIC(10, 2),
  expiry_date TEXT,
  usage_limit INTEGER DEFAULT 1000,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- 8. Policies: Public Read
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read on products') THEN
    CREATE POLICY "Allow public read on products" ON public.products FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read on categories') THEN
    CREATE POLICY "Allow public read on categories" ON public.categories FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read on coupons') THEN
    CREATE POLICY "Allow public read on coupons" ON public.coupons FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert on orders') THEN
    CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public select on orders') THEN
    CREATE POLICY "Allow public select on orders" ON public.orders FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public update on orders') THEN
    CREATE POLICY "Allow public update on orders" ON public.orders FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert on customers') THEN
    CREATE POLICY "Allow public insert on customers" ON public.customers FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- ==============================================================================
-- 9. INITIAL SEED DATA: CATEGORIES
-- ==============================================================================
INSERT INTO public.categories (id, name, slug, image, item_count, subcategories) VALUES
('cat-mens', 'Men''s Collection', 'mens-collection', 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600', 12, '["Shirt", "T-Shirt", "Pant", "Clock"]'::jsonb),
('cat-womens', 'Women''s Collection', 'womens-collection', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', 10, '["Three Piece", "Kurtis & Tops", "Sarees", "Clock & Jewelry"]'::jsonb),
('cat-baby', 'Baby Collection', 'baby-collection', 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600', 6, '["Baby Boys Clothing", "Baby Girls Clothing", "Baby Clock & Toys"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 10. INITIAL SEED DATA: COUPONS
-- ==============================================================================
INSERT INTO public.coupons (id, code, discount_type, discount_value, min_order_amount, max_discount, expiry_date, usage_limit, used_count, is_active) VALUES
('coup-1', 'AYAT10', 'percentage', 10, 1000, 300, '2026-12-31', 500, 24, true),
('coup-2', 'EID2026', 'fixed', 200, 2000, NULL, '2026-06-30', 200, 18, true),
('coup-3', 'FREESHIP', 'fixed', 70, 1500, NULL, '2026-12-31', 1000, 52, true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 11. INITIAL SEED DATA: PRODUCTS (MEN''S, WOMEN''S, BABY)
-- ==============================================================================
INSERT INTO public.products (
  id, name, slug, sku, brand, category, subcategory, regular_price, discount_price, 
  stock_quantity, stock_status, is_featured, is_best_seller, is_new_arrival, is_active, 
  rating, review_count, short_description, description, specifications, images
) VALUES
-- Men's Shirts
(
  'prod-m-shirt-1',
  'Executive Oxford Cotton Formal Shirt - Crisp White',
  'executive-oxford-cotton-formal-shirt-white',
  'MSHRT-001-WHT',
  'Ayat & Amat',
  'Men''s Collection',
  'Shirt',
  2250.00,
  1850.00,
  35,
  'in_stock',
  true,
  true,
  false,
  true,
  4.9,
  42,
  'Premium 100% combed Oxford cotton shirt tailored for executive boardrooms and semi-formal elegance.',
  'Crafted from 100% Egyptian long-staple combed cotton, this Oxford button-down shirt delivers unparalleled breathability and crisp silhouette for Bangladeshi weather.',
  '{"Fabric": "100% Combed Egyptian Oxford Cotton", "Fit": "Slim Contemporary Fit", "Collar": "Semi-Spread Reinforced", "Cuff": "Convertible French / Button", "Wash Care": "Machine wash cold"}'::jsonb,
  '["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800"]'::jsonb
),
(
  'prod-m-shirt-2',
  'Pure French Linen Casual Long-Sleeve Shirt - Sky Blue',
  'pure-french-linen-casual-shirt-blue',
  'MSHRT-002-BLU',
  'Ayat & Amat',
  'Men''s Collection',
  'Shirt',
  2650.00,
  2200.00,
  24,
  'in_stock',
  true,
  false,
  true,
  true,
  4.8,
  29,
  'Breathable natural French flax linen shirt. Lightweight comfort for warm tropical climates.',
  'Natural French linen with effortless drape and pre-washed softness. Natural temperature regulating properties.',
  '{"Fabric": "100% Pure Flax French Linen", "Fit": "Relaxed Regular Fit", "Pockets": "Single Chest Patch Pocket", "Buttons": "Natural River Shell Buttons"}'::jsonb,
  '["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800"]'::jsonb
),

-- Men's T-Shirts
(
  'prod-m-tshirt-1',
  'Organic Pima Cotton Crewneck T-Shirt - Pitch Black',
  'organic-pima-cotton-crewneck-tshirt-black',
  'MTSH-001-BLK',
  'Ayat & Amat',
  'Men''s Collection',
  'T-Shirt',
  1100.00,
  850.00,
  80,
  'in_stock',
  true,
  true,
  false,
  true,
  4.9,
  95,
  'Super-soft 220 GSM combed Supima cotton t-shirt with anti-fade Reactive dye technology.',
  'Engineered with durable ribbed neckline that maintains its shape after hundreds of washes.',
  '{"Fabric": "100% Organic Peruvian Pima Cotton (220 GSM)", "Neckline": "Ribbed Spandex Crewneck", "Dyeing": "Eco-friendly Color-Fast"}'::jsonb,
  '["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800"]'::jsonb
),
(
  'prod-m-tshirt-2',
  'Pique Knit Mercerized Cotton Polo Shirt - Olive Green',
  'pique-knit-mercerized-cotton-polo-shirt-olive',
  'MTSH-002-OLV',
  'Ayat & Amat',
  'Men''s Collection',
  'T-Shirt',
  1600.00,
  1250.00,
  45,
  'in_stock',
  false,
  false,
  true,
  true,
  4.8,
  34,
  'Classic polo shirt with tipping contrast collar and two-button pearl placket.',
  'Mercerized double-knit pique structure provides luxurious sheen and soft touch.',
  '{"Fabric": "100% Mercerized Pique Cotton (240 GSM)", "Collar": "Jacquard Ribbed Collar", "Fit": "Regular Tailored"}'::jsonb,
  '["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800"]'::jsonb
),

-- Men's Pants
(
  'prod-m-pant-1',
  'Smart Flex Stretch Cotton Chino Trousers - Khaki Beige',
  'smart-flex-stretch-chino-trousers-khaki',
  'MPNT-001-KHK',
  'Ayat & Amat',
  'Men''s Collection',
  'Pant',
  2450.00,
  1950.00,
  40,
  'in_stock',
  true,
  true,
  false,
  true,
  4.9,
  53,
  'Versatile tailored chino pants with 3% Lycra stretch for 360-degree flexibility and comfort.',
  'Designed with inner waistband grip and reinforced pockets for smartphones and wallets.',
  '{"Fabric": "97% Twill Cotton, 3% Elastane", "Closure": "YKK Brass Zipper + Horn Button", "Cut": "Slim-Tapered Leg"}'::jsonb,
  '["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800"]'::jsonb
),
(
  'prod-m-pant-2',
  '13.5oz Raw Indigo Selvedge Denim Jeans',
  '13-5oz-raw-indigo-selvedge-denim-jeans',
  'MPNT-002-DNM',
  'Ayat & Amat',
  'Men''s Collection',
  'Pant',
  3200.00,
  2650.00,
  30,
  'in_stock',
  true,
  false,
  true,
  true,
  4.9,
  38,
  'Authentic red-line selvedge denim crafted on traditional shuttle looms. Develops unique fades.',
  'Non-stretch 100% pure cotton raw denim that molds to your silhouette over time.',
  '{"Fabric": "100% Cotton Shuttle-Loomed Selvedge Denim", "Weight": "13.5 oz Raw", "Fly": "Antique Copper Button Fly"}'::jsonb,
  '["https://images.unsplash.com/photo-1542272604-780c96856592?w=800"]'::jsonb
),

-- Men's Clocks & Watches
(
  'prod-m-clock-1',
  'Royal Chronograph Sapphire Automatic Watch - Emerald Dial',
  'royal-chronograph-sapphire-automatic-watch-emerald',
  'MCLK-001-EMR',
  'Ayat & Amat Watches',
  'Men''s Collection',
  'Clock',
  7500.00,
  5800.00,
  15,
  'in_stock',
  true,
  true,
  false,
  true,
  5.0,
  64,
  'Luxury automatic mechanical chronograph timepiece with scratch-resistant sapphire crystal and sunburst emerald dial.',
  'Features a precision 24-jewel automatic movement with 41-hour power reserve and 100m water resistance.',
  '{"Movement": "24-Jewel Self-Winding Automatic Caliber", "Glass": "Anti-Reflective Sapphire Crystal", "Case Material": "316L Solid Surgical Grade Stainless Steel", "Water Resistance": "10 ATM / 100 Meters", "Warranty": "2 Years Official Warranty"}'::jsonb,
  '["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"]'::jsonb
),
(
  'prod-m-clock-2',
  'Minimalist Bauhaus Leather Watch - Matte Obsidian',
  'minimalist-bauhaus-leather-watch-obsidian',
  'MCLK-002-BLK',
  'Ayat & Amat Watches',
  'Men''s Collection',
  'Clock',
  4200.00,
  3450.00,
  22,
  'in_stock',
  false,
  false,
  true,
  true,
  4.8,
  31,
  'Clean Bauhaus design with ultra-slim 7mm case profile and Italian genuine calfskin leather strap.',
  'Japanese Miyota quartz movement ensures pinpoint accuracy.',
  '{"Movement": "Japanese Miyota Quartz", "Strap": "Full-Grain Italian Calfskin Leather", "Case Diameter": "40 mm", "Thickness": "7.2 mm Ultra-Slim"}'::jsonb,
  '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"]'::jsonb
),

-- Women's Collection
(
  'prod-w-threepiece-1',
  'Royal Organza Embroidered 3-Piece Festive Set - Dusty Rose',
  'royal-organza-embroidered-3piece-festive-set',
  'W3PC-001-ROS',
  'Ayat & Amat Couture',
  'Women''s Collection',
  'Three Piece',
  5200.00,
  3850.00,
  18,
  'in_stock',
  true,
  true,
  false,
  true,
  4.9,
  47,
  'Exquisite festive 3-piece ensemble featuring zari thread embroidery on pure organza dupatta and cotton silk kameez.',
  'Includes embroidered kameez with hand-beaded neckline, matching dyed cambric trousers, and heavily bordered digital embroidered organza dupatta.',
  '{"Kameez Fabric": "Fine Cotton Silk with Zari Embroidery", "Dupatta": "Pure Organza Digital Floral with Scallop Border", "Trouser": "Raw Silk Dyed Trouser", "Occasion": "Festive / Wedding / Eid"}'::jsonb,
  '["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"]'::jsonb
),
(
  'prod-w-saree-1',
  'Traditional Dhakai Jamdani Handloom Saree - Royal Maroon & Gold',
  'traditional-dhakai-jamdani-handloom-saree-maroon',
  'WSAR-001-MRN',
  'Ayat & Amat Heritage',
  'Women''s Collection',
  'Sarees',
  8500.00,
  6500.00,
  12,
  'in_stock',
  true,
  true,
  false,
  true,
  5.0,
  58,
  'Authentic handwoven 84-count Dhakai Jamdani masterpiece by artisan weavers of Rupganj, Narayanganj.',
  'Woven on pit looms over 3 weeks using traditional supplementary weft technique with fine golden zari florets.',
  '{"Weave": "Handloom Supplementary Weft Jamdani", "Thread Count": "84 Count Fine Cotton", "Zari": "Gold Metallic Tested Zari", "Length": "6.3 Meters with Blouse Piece"}'::jsonb,
  '["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800"]'::jsonb
),
(
  'prod-w-clock-1',
  'Rose Gold Diamond Dial Watch & Bracelet Jewelry Gift Set',
  'rose-gold-diamond-dial-watch-bracelet-set',
  'WCLK-001-RGD',
  'Ayat & Amat Watches',
  'Women''s Collection',
  'Clock & Jewelry',
  5500.00,
  4200.00,
  20,
  'in_stock',
  true,
  true,
  false,
  true,
  4.9,
  39,
  'Stunning rose gold timepiece with mother-of-pearl dial and Austrian crystal bezel, paired with 2 matching bracelets.',
  'Water-resistant stainless steel case with jewelry clasp and interchangeable links.',
  '{"Case Coating": "18K PVD Rose Gold Ion Plating", "Dial": "Natural Iridescent Mother of Pearl", "Stones": "Hand-set Cubic Zirconia Crystals", "Set Includes": "Watch + 2 Adjustable Bangle Bracelets"}'::jsonb,
  '["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800"]'::jsonb
),

-- Baby Collection
(
  'prod-b-boy-1',
  '100% Organic Cotton Baby Boy Bowtie Romper & Suspender Set',
  'organic-cotton-baby-boy-bowtie-romper-set',
  'BBYB-001-SET',
  'Ayat & Amat Kids',
  'Baby Collection',
  'Baby Boys Clothing',
  1650.00,
  1250.00,
  35,
  'in_stock',
  true,
  true,
  false,
  true,
  4.9,
  41,
  'Ultra-soft GOTS certified organic cotton formal baby set with detachable bowtie and adjustable suspenders.',
  'Nickel-free bottom snaps for swift diaper changes. Gentle against baby delicate sensitive skin.',
  '{"Fabric": "100% GOTS Certified Organic Combed Cotton", "Age Group": "0 to 24 Months", "Features": "Hypoallergenic, Snap Bottom Closure, Detachable Bowtie"}'::jsonb,
  '["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800"]'::jsonb
),
(
  'prod-b-clock-1',
  'Montessori Wooden Geometric Learning Clock & Shape Sorter',
  'montessori-wooden-geometric-learning-clock-toy',
  'BCLK-001-TOY',
  'Ayat & Amat Kids',
  'Baby Collection',
  'Baby Clock & Toys',
  1150.00,
  850.00,
  40,
  'in_stock',
  true,
  false,
  true,
  true,
  4.9,
  32,
  'Educational non-toxic natural wood clock puzzle teaching numbers, geometric shapes, and time.',
  'Polished rounded edges with non-toxic water-based child-safe paint. Ideal for sensory development.',
  '{"Material": "Natural Beechwood + Non-toxic Water-based Paint", "Recommended Age": "1 to 5 Years", "Skills": "Fine Motor Skills, Number Recognition, Spatial Awareness"}'::jsonb,
  '["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
