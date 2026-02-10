"""Скрипт для наполнения базы заведениями (запускать вручную)"""
import json
import os
import psycopg2

ESTABLISHMENTS_DATA = [
    # Салоны красоты
    {'category': 'beauty', 'district': 'cao', 'name': 'Студия красоты "Шарм"', 'slug': 'studio-sharm', 'description': 'Профессиональные услуги парикмахера, маникюра, педикюра', 'is_premium': True, 'rating': 4.8},
    {'category': 'beauty', 'district': 'sao', 'name': 'Салон "Локон"', 'slug': 'salon-lokon', 'description': 'Стрижки, окрашивание, укладки', 'rating': 4.6},
    {'category': 'beauty', 'district': 'svao', 'name': 'Барбершоп "Бритва"', 'slug': 'barbershop-britva', 'description': 'Мужские стрижки и бритьё', 'rating': 4.7},
    {'category': 'beauty', 'district': 'vao', 'name': 'Beauty Lab', 'slug': 'beauty-lab', 'description': 'Инновационные процедуры по уходу', 'is_premium': True, 'rating': 4.9},
    {'category': 'beauty', 'district': 'uzao', 'name': 'Nail Studio', 'slug': 'nail-studio', 'description': 'Маникюр премиум класса', 'rating': 4.5},
    
    # Медицина
    {'category': 'health', 'district': 'cao', 'name': 'Клиника "Здоровье+"', 'slug': 'klinika-zdorovie', 'description': 'Многопрофильная клиника', 'is_premium': True, 'rating': 4.8},
    {'category': 'health', 'district': 'sao', 'name': 'Стоматология "Белый Клык"', 'slug': 'stomatologia-beliy-klyk', 'description': 'Современная стоматология', 'rating': 4.7},
    {'category': 'health', 'district': 'svao', 'name': 'Медцентр "Семейный доктор"', 'slug': 'medcentr-semeiniy-doktor', 'description': 'Приём терапевта, педиатра', 'rating': 4.6},
    {'category': 'health', 'district': 'vao', 'name': 'ЕвроМед Клиника', 'slug': 'euromed-klinika', 'description': 'Европейский уровень медуслуг', 'is_premium': True, 'rating': 4.9},
    
    # Фитнес
    {'category': 'fitness', 'district': 'cao', 'name': 'World Class', 'slug': 'world-class', 'description': 'Премиум фитнес-клуб', 'is_premium': True, 'rating': 4.8},
    {'category': 'fitness', 'district': 'sao', 'name': 'FitnessPro', 'slug': 'fitnesspro', 'description': 'Тренажёрный зал', 'rating': 4.5},
    {'category': 'fitness', 'district': 'svao', 'name': 'Йога "Прана"', 'slug': 'yoga-prana', 'description': 'Йога для всех уровней', 'rating': 4.7},
    {'category': 'fitness', 'district': 'vao', 'name': 'CrossFit Zone', 'slug': 'crossfit-zone', 'description': 'Кроссфит тренировки', 'rating': 4.6},
    
    # Образование
    {'category': 'education', 'district': 'cao', 'name': 'Языковая школа "Полиглот"', 'slug': 'school-poliglot', 'description': 'Изучение языков', 'is_premium': True, 'rating': 4.8},
    {'category': 'education', 'district': 'sao', 'name': 'IT-школа "Кодерс"', 'slug': 'it-school-koders', 'description': 'Программирование для детей', 'rating': 4.7},
    {'category': 'education', 'district': 'svao', 'name': 'Автошкола "Профи"', 'slug': 'autoschool-profi', 'description': 'Обучение вождению', 'rating': 4.5},
    
    # Магазины
    {'category': 'shopping', 'district': 'cao', 'name': 'ТЦ "Европейский"', 'slug': 'tc-evropeyskiy', 'description': 'Крупный торговый центр', 'is_premium': True, 'rating': 4.7},
    {'category': 'shopping', 'district': 'sao', 'name': '"Азбука Вкуса"', 'slug': 'azbuka-vkusa', 'description': 'Премиальные продукты', 'rating': 4.6},
    {'category': 'shopping', 'district': 'svao', 'name': 'Книжный "Москва"', 'slug': 'knizhniy-moskva', 'description': 'Книги и канцтовары', 'rating': 4.5},
    {'category': 'shopping', 'district': 'vao', 'name': 'Электроника "Техносила"', 'slug': 'technosila', 'description': 'Бытовая техника', 'rating': 4.4},
    
    # Отели
    {'category': 'hotel', 'district': 'cao', 'name': 'Отель "Метрополь"', 'slug': 'hotel-metropol', 'description': '5-звёздочный отель', 'is_premium': True, 'rating': 4.9},
    {'category': 'hotel', 'district': 'sao', 'name': 'Гостиница "Cosmos"', 'slug': 'hotel-cosmos', 'description': 'Комфортабельные номера', 'rating': 4.5},
    {'category': 'hotel', 'district': 'svao', 'name': 'Хостел "Друзья"', 'slug': 'hostel-druzya', 'description': 'Бюджетное размещение', 'rating': 4.3},
    
    # Автосервисы
    {'category': 'auto', 'district': 'cao', 'name': 'Автосервис "Бош"', 'slug': 'autoservice-bosch', 'description': 'Официальный сервис', 'is_premium': True, 'rating': 4.8},
    {'category': 'auto', 'district': 'sao', 'name': 'СТО "Автопрофи"', 'slug': 'sto-autoprofi', 'description': 'Ремонт всех марок', 'rating': 4.6},
    {'category': 'auto', 'district': 'svao', 'name': 'Шиномонтаж "Колесо"', 'slug': 'shinomontazh-koleso', 'description': 'Замена резины', 'rating': 4.5},
    
    # Банки
    {'category': 'bank', 'district': 'cao', 'name': 'Сбербанк', 'slug': 'sberbank', 'description': 'Крупнейший банк', 'is_premium': True, 'rating': 4.5},
    {'category': 'bank', 'district': 'sao', 'name': 'ВТБ', 'slug': 'vtb', 'description': 'Банковские услуги', 'rating': 4.4},
    {'category': 'bank', 'district': 'svao', 'name': 'Альфа-Банк', 'slug': 'alfabank', 'description': 'Инновационный банк', 'rating': 4.6},
    
    # Аптеки
    {'category': 'pharmacy', 'district': 'cao', 'name': 'Аптека "36.6"', 'slug': 'apteka-366', 'description': 'Круглосуточно', 'rating': 4.5},
    {'category': 'pharmacy', 'district': 'sao', 'name': 'Ригла', 'slug': 'rigla', 'description': 'Доставка лекарств', 'rating': 4.4},
    {'category': 'pharmacy', 'district': 'svao', 'name': '"Будь Здоров"', 'slug': 'apteka-bud-zdorov', 'description': 'Консультации фармацевтов', 'is_premium': True, 'rating': 4.7},
    
    # Зоотовары
    {'category': 'petshop', 'district': 'cao', 'name': 'Зоомагазин "Четыре лапы"', 'slug': 'zoomagazin-4lapy', 'description': 'Товары для животных', 'rating': 4.6},
    {'category': 'petshop', 'district': 'sao', 'name': 'Ветклиника "Айболит"', 'slug': 'vetklinika-aybolit', 'description': 'Ветеринария, стационар', 'is_premium': True, 'rating': 4.8},
    {'category': 'petshop', 'district': 'svao', 'name': 'Груминг "PetStyle"', 'slug': 'grooming-petstyle', 'description': 'Стрижка питомцев', 'rating': 4.7},
    
    # Культура
    {'category': 'culture', 'district': 'cao', 'name': 'Пушкинский музей', 'slug': 'pushkinskiy-muzey', 'description': 'Музей искусств', 'is_premium': True, 'rating': 4.9},
    {'category': 'culture', 'district': 'sao', 'name': 'Кинотеатр "Каро"', 'slug': 'kinoteatr-karo', 'description': 'Премьеры фильмов', 'rating': 4.5},
    {'category': 'culture', 'district': 'svao', 'name': 'Библиотека им. Ленина', 'slug': 'biblioteka-lenina', 'description': 'Госбиблиотека', 'rating': 4.7},
    
    # Детские центры
    {'category': 'kids', 'district': 'cao', 'name': 'Детский центр "Сёма"', 'slug': 'detskiy-centr-sema', 'description': 'Развивающие занятия', 'is_premium': True, 'rating': 4.8},
    {'category': 'kids', 'district': 'sao', 'name': 'Игровая "Кидзания"', 'slug': 'igrovaya-kidzaniya', 'description': 'Город профессий', 'rating': 4.7},
    {'category': 'kids', 'district': 'svao', 'name': 'Детсад "Солнышко"', 'slug': 'detskiy-sad-solnyshko', 'description': 'Частный детсад', 'rating': 4.6},
    
    # Ремонт
    {'category': 'repair', 'district': 'cao', 'name': '"Ремонт всего"', 'slug': 'masterskaya-remont-vsego', 'description': 'Ремонт техники', 'rating': 4.5},
    {'category': 'repair', 'district': 'sao', 'name': 'Мастер на час', 'slug': 'master-na-chas', 'description': 'Мелкий ремонт', 'is_premium': True, 'rating': 4.7},
    {'category': 'repair', 'district': 'svao', 'name': 'Химчистка "Диана"', 'slug': 'himchistka-diana', 'description': 'Чистка одежды', 'rating': 4.6},
    
    # Транспорт
    {'category': 'transport', 'district': 'cao', 'name': 'Такси "Яндекс"', 'slug': 'taxi-yandex', 'description': 'Вызов через приложение', 'rating': 4.6},
    {'category': 'transport', 'district': 'sao', 'name': 'Каршеринг "Делимобиль"', 'slug': 'carsharing-delimobil', 'description': 'Аренда авто', 'is_premium': True, 'rating': 4.5},
    {'category': 'transport', 'district': 'svao', 'name': 'Велопрокат "Велобайк"', 'slug': 'prokat-velobike', 'description': 'Прокат велосипедов', 'rating': 4.4},
]

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor()

        inserted = 0
        skipped = 0

        for est in ESTABLISHMENTS_DATA:
            try:
                cursor.execute("""
                    INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
                    SELECT 
                        c.id,
                        d.id,
                        ec.id,
                        %s, %s, %s, %s, %s
                    FROM cities c
                    CROSS JOIN districts d
                    CROSS JOIN establishment_categories ec
                    WHERE c.slug = 'москва' AND d.slug = %s AND ec.slug = %s
                    ON CONFLICT (city_id, slug) DO NOTHING
                    RETURNING id
                """, (
                    est['name'],
                    est['slug'],
                    est['description'],
                    est.get('is_premium', False),
                    est.get('rating'),
                    est['district'],
                    est['category']
                ))
                
                if cursor.fetchone():
                    inserted += 1
                else:
                    skipped += 1
                    
            except Exception as e:
                skipped += 1
                print(f"Error inserting {est['slug']}: {str(e)}")

        conn.commit()
        cursor.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'inserted': inserted,
                'skipped': skipped,
                'total': len(ESTABLISHMENTS_DATA)
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
