-- Таблица городов
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  population INTEGER,
  founded_year INTEGER,
  area_km2 DECIMAL(10,2),
  timezone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица округов/районов
CREATE TABLE IF NOT EXISTS districts (
  id SERIAL PRIMARY KEY,
  city_id INTEGER NOT NULL REFERENCES cities(id),
  slug VARCHAR(100) NOT NULL,
  name VARCHAR(200) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('moscow', 'mo', 'district')),
  areas TEXT[], -- массив районов внутри округа
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(city_id, slug)
);

-- Таблица категорий заведений
CREATE TABLE IF NOT EXISTS establishment_categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заведений
CREATE TABLE IF NOT EXISTS establishments (
  id SERIAL PRIMARY KEY,
  city_id INTEGER NOT NULL REFERENCES cities(id),
  district_id INTEGER REFERENCES districts(id),
  category_id INTEGER NOT NULL REFERENCES establishment_categories(id),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  description TEXT,
  address VARCHAR(300),
  phone VARCHAR(50),
  website VARCHAR(200),
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  price_level INTEGER CHECK (price_level >= 1 AND price_level <= 5),
  is_premium BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMP,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(city_id, slug)
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_establishments_city ON establishments(city_id);
CREATE INDEX IF NOT EXISTS idx_establishments_district ON establishments(district_id);
CREATE INDEX IF NOT EXISTS idx_establishments_category ON establishments(category_id);
CREATE INDEX IF NOT EXISTS idx_establishments_premium ON establishments(is_premium, premium_until);
CREATE INDEX IF NOT EXISTS idx_establishments_name ON establishments(name);

-- Таблица достопримечательностей
CREATE TABLE IF NOT EXISTS attractions (
  id SERIAL PRIMARY KEY,
  city_id INTEGER NOT NULL REFERENCES cities(id),
  district_id INTEGER REFERENCES districts(id),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  address VARCHAR(300),
  is_premium BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMP,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(city_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_attractions_city ON attractions(city_id);
CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category);
CREATE INDEX IF NOT EXISTS idx_attractions_premium ON attractions(is_premium);

COMMENT ON TABLE establishments IS 'Заведения (рестораны, кафе, бары, развлечения)';
COMMENT ON TABLE attractions IS 'Достопримечательности городов';
COMMENT ON TABLE cities IS 'Города России';
COMMENT ON TABLE districts IS 'Округа и районы городов';
COMMENT ON COLUMN establishments.is_premium IS 'Премиум размещение (платное от рекламодателей)';
COMMENT ON COLUMN establishments.premium_until IS 'Дата окончания премиум размещения';
