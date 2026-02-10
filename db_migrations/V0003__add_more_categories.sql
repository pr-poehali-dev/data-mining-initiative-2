-- Добавляем новые категории заведений
INSERT INTO establishment_categories (slug, name, icon) VALUES
  ('beauty', 'Салоны красоты', 'Scissors'),
  ('health', 'Медицина', 'Heart'),
  ('fitness', 'Фитнес и спорт', 'Dumbbell'),
  ('education', 'Образование', 'GraduationCap'),
  ('shopping', 'Магазины', 'ShoppingBag'),
  ('hotel', 'Отели и гостиницы', 'Hotel'),
  ('auto', 'Автосервисы', 'Car'),
  ('bank', 'Банки и финансы', 'Landmark'),
  ('pharmacy', 'Аптеки', 'Pill'),
  ('petshop', 'Зоотовары и ветеринария', 'Dog'),
  ('culture', 'Культура и искусство', 'Palette'),
  ('kids', 'Детские центры', 'Baby'),
  ('repair', 'Ремонт и быт', 'Wrench'),
  ('transport', 'Транспорт', 'Bus')
ON CONFLICT (slug) DO NOTHING;
