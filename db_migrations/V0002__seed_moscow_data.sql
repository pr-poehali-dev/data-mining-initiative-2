-- Добавляем Москву
INSERT INTO cities (slug, name, description, population, founded_year, area_km2, timezone)
VALUES (
  'москва',
  'Москва',
  'Столица Российской Федерации, крупнейший город России и Европы',
  13000000,
  1147,
  2561.00,
  'UTC+3'
) ON CONFLICT (slug) DO NOTHING;

-- Получаем ID Москвы для дальнейших вставок
-- Добавляем округа Москвы
INSERT INTO districts (city_id, slug, name, type, areas)
SELECT 
  c.id,
  'cao',
  'Центральный АО',
  'moscow',
  ARRAY['Арбат', 'Басманный', 'Замоскворечье', 'Красносельский', 'Мещанский', 'Пресненский', 'Таганский', 'Тверской', 'Хамовники', 'Якиманка']
FROM cities c WHERE c.slug = 'москва'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO districts (city_id, slug, name, type, areas)
SELECT 
  c.id,
  'sao',
  'Северный АО',
  'moscow',
  ARRAY['Аэропорт', 'Беговой', 'Войковский', 'Савёловский', 'Сокол', 'Тимирязевский']
FROM cities c WHERE c.slug = 'москва'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO districts (city_id, slug, name, type, areas)
SELECT 
  c.id,
  'svao',
  'Северо-Восточный АО',
  'moscow',
  ARRAY['Алексеевский', 'Бибирево', 'Марфино', 'Останкинский', 'Отрадное']
FROM cities c WHERE c.slug = 'москва'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO districts (city_id, slug, name, type, areas)
SELECT 
  c.id,
  'vao',
  'Восточный АО',
  'moscow',
  ARRAY['Измайлово', 'Новогиреево', 'Перово', 'Сокольники']
FROM cities c WHERE c.slug = 'москва'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO districts (city_id, slug, name, type, areas)
SELECT 
  c.id,
  'uzao',
  'Юго-Западный АО',
  'moscow',
  ARRAY['Гагаринский', 'Коньково', 'Черёмушки', 'Ясенево']
FROM cities c WHERE c.slug = 'москва'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO districts (city_id, slug, name, type, areas)
SELECT 
  c.id,
  'uao',
  'Южный АО',
  'moscow',
  ARRAY['Братеево', 'Царицыно', 'Чертаново']
FROM cities c WHERE c.slug = 'москва'
ON CONFLICT (city_id, slug) DO NOTHING;

-- Добавляем категории заведений
INSERT INTO establishment_categories (slug, name, icon) VALUES
  ('restaurant', 'Рестораны', 'UtensilsCrossed'),
  ('cafe', 'Кафе', 'Coffee'),
  ('bar', 'Бары', 'Wine'),
  ('entertainment', 'Развлечения', 'PartyPopper')
ON CONFLICT (slug) DO NOTHING;

-- Добавляем заведения
INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Кафе Пушкинъ',
  'cafe-pushkin',
  'Ресторан русской кухни в историческом особняке',
  true,
  4.8
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'restaurant'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Белуга',
  'beluga',
  'Ресторан современной русской кухни',
  true,
  4.7
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'restaurant'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Турандот',
  'turandot',
  'Роскошный ресторан в дворцовых интерьерах',
  true,
  4.9
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'restaurant'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Мясницкий ряд',
  'myasnitsky-ryad',
  'Стейк-хаус с мраморным мясом',
  4.5
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'restaurant'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Пряности & Радости',
  'spices-joy',
  'Уютный семейный ресторан грузинской кухни',
  4.6
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'svao' AND ec.slug = 'restaurant'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Корчма Тарас Бульба',
  'taras-bulba',
  'Сеть украинских ресторанов',
  4.3
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'sao' AND ec.slug = 'restaurant'
ON CONFLICT (city_id, slug) DO NOTHING;

-- Кафе
INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Кофемания',
  'kofemania',
  'Сеть демократичных кафе-кондитерских',
  4.4
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'cafe'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Starbucks',
  'starbucks',
  'Международная сеть кофеен',
  true,
  4.2
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'cafe'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Буше',
  'bushe',
  'Французская пекарня-кондитерская',
  4.5
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'vao' AND ec.slug = 'cafe'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Coffee Bean',
  'coffee-bean',
  'Specialty coffee и авторские десерты',
  4.7
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'uzao' AND ec.slug = 'cafe'
ON CONFLICT (city_id, slug) DO NOTHING;

-- Бары
INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  '32.05',
  '32-05',
  'Бар на 85-м этаже башни ОКО с панорамным видом',
  true,
  4.9
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'bar'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Небо',
  'nebo',
  'Ресторан-бар на крыше с видом на Москву',
  true,
  4.8
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'bar'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Simach',
  'simach',
  'Демократичный бар с живой музыкой',
  4.3
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'svao' AND ec.slug = 'bar'
ON CONFLICT (city_id, slug) DO NOTHING;

-- Развлечения
INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Москвариум',
  'moskvarium',
  'Океанариум на ВДНХ с шоу дельфинов',
  true,
  4.7
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'svao' AND ec.slug = 'entertainment'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'ВДНХ',
  'vdnh',
  'Выставочный комплекс и парк развлечений',
  true,
  4.8
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'svao' AND ec.slug = 'entertainment'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Зарядье',
  'zaryadye',
  'Современный парк с уникальными ландшафтами',
  4.6
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'cao' AND ec.slug = 'entertainment'
ON CONFLICT (city_id, slug) DO NOTHING;

INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, rating)
SELECT 
  c.id,
  d.id,
  ec.id,
  'Dream Island',
  'dream-island',
  'Крытый тематический парк развлечений',
  4.5
FROM cities c
CROSS JOIN districts d
CROSS JOIN establishment_categories ec
WHERE c.slug = 'москва' AND d.slug = 'uao' AND ec.slug = 'entertainment'
ON CONFLICT (city_id, slug) DO NOTHING;
