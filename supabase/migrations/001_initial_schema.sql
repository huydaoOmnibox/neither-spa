-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  category TEXT,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id SERIAL PRIMARY KEY,
  service_name TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Home content table
CREATE TABLE IF NOT EXISTS home_content (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_sort_order ON gallery(sort_order);
CREATE INDEX IF NOT EXISTS idx_pricing_active ON pricing(is_active);
CREATE INDEX IF NOT EXISTS idx_pricing_category ON pricing(category);
CREATE INDEX IF NOT EXISTS idx_pricing_sort_order ON pricing(sort_order);
CREATE INDEX IF NOT EXISTS idx_home_content_section ON home_content(section);
CREATE INDEX IF NOT EXISTS idx_home_content_active ON home_content(is_active);

-- Insert sample data for products
INSERT INTO products (name, description, price, category, image, is_active, sort_order) VALUES
('Premium Nail Polish', 'High-quality gel polish', '€25', 'Polish', '', true, 1),
('Nail Care Kit', 'Complete nail care set', '€45', 'Kit', '', true, 2)
ON CONFLICT DO NOTHING;

-- Insert sample data for gallery
INSERT INTO gallery (title, description, image, category, is_active, sort_order) VALUES
('French Manicure', 'Classic french style', '', 'Manicure', true, 1),
('Nail Art Design', 'Creative nail art', '', 'Nail Art', true, 2)
ON CONFLICT DO NOTHING;

-- Insert sample data for pricing
INSERT INTO pricing (service_name, price, category, description, duration, is_active, sort_order) VALUES
('Gellak handen', '€35', 'gellak', 'Basic gel polish for hands', '45 min', true, 1),
('BIAB naturel', '€50', 'biab', 'Builder in a bottle natural', '60 min', true, 2)
ON CONFLICT DO NOTHING;

-- Insert sample data for home content
INSERT INTO home_content (section, title, subtitle, description, content, image, is_active) VALUES
('hero', 'NAILS OF THE NETHERLANDS', 'Een moderne nagelsalon in Leeuwarden', 'Kwaliteit – Prestige – Verantwoordelijkheid definiëren ons merk', null, '', true),
('about', 'OVER ONS', '', 'Welkom bij Nails of The Netherlands...', null, '', true)
ON CONFLICT (section) DO NOTHING; 