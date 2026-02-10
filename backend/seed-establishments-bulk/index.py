"""Массовое наполнение базы заведениями (200+ объектов)"""
import json
import os
import psycopg2

# Генераторы названий для разных категорий
RESTAURANT_NAMES = [
    'Белый Кролик', 'Twins Garden', 'Selfie', 'Сахалин', 'Аист', 'Гранд Кафе',
    'Кухня', 'Баран-Рапан', 'Марсель', 'Жан-Жак', 'Честная кухня', 'Грабли',
    'Му-Му', 'Теремок', 'Чайхона №1', 'Шашлыкофф', 'Ёлки-Палки', 'Андерсон',
    'Ил Патио', 'Якитория', 'Планета Суши', 'Тануки', 'Сыроварня', 'Вареничная №1',
    'Хачапури и вино', 'Кинза', 'Генацвале', 'Баkinskiy Boulevard', 'Урюк',
    'Пхали-Хинкали', 'БарашкаНаМангале', 'Коза', 'Брынза', 'МамаМанана',
    'Il Forno', 'Mozzarella Bar', 'Vapiano', 'La Bottega', 'Settebello'
]

CAFE_NAMES = [
    'Шоколадница', 'Кофе Хауз', 'Прайм', 'Даблби', 'Costa Coffee', 'Traveler\'s Coffee',
    'Coffeeshop Company', 'Кофемания', 'Surf Coffee', 'Skuratov Coffee', 'Riers',
    'One Price Coffee', 'Cofix', 'Сбербанк Кофе', 'Starbucks Reserve', 'Black Star Burger',
    'Krispy Kreme', 'Cinnabon', 'Paul', 'Brioche Dorée', 'Штолле', 'Теремок Кафе'
]

BAR_NAMES = [
    'Simach Rooftop', 'Sixty', 'Matrёshka', 'Bar BQ Café', 'Backstage', 'Icon',
    'Pourquoi Pas', 'Noor Bar', 'Time Out Bar', 'Forecast', 'Rolling Stone Bar',
    '16 Tons', 'Китайский Лётчик Джао Да', 'Beergeek', 'Craft Republic', 'Пивная №1'
]

BEAUTY_NAMES = [
    'Natura Siberica', 'Моне', 'Локон', 'Браво', 'Студия Ольги Романовой',
    'Бьюти Бар', 'Подружка', 'Jolly Plaza', 'Цирюльня', 'Art Beauty', 'La Beauté',
    'Dessange', 'Toni&Guy', 'Жак Дессанж', 'Beautyhack', 'Studio 7', 'Облака',
    'Chop-Chop', 'Frisor', 'Aldo Coppola', 'Сахар', 'Шико', 'Mr.Barber'
]

HEALTH_NAMES = [
    'Медси', 'СМ-Клиника', 'Альфа Центр Здоровья', 'ОнКлиник', 'Чайка',
    'Скандинавия', 'Мать и дитя', 'Доктор рядом', 'Инвитро', 'Гемотест',
    'KDL', 'Хеликс', 'Будь Здоров', 'Лаборатория Гемотест', 'МРТ24',
    'ДентоЛюкс', 'Smile-at-Once', 'Имплант Сити', 'Дантист', '32 Дент'
]

FITNESS_NAMES = [
    'Gold\'s Gym', 'World Gym', 'Orange Fitness', 'Alex Fitness', 'FizKult',
    'X-Fit', 'Dr.Loder', 'Fitness House', 'Zupre', 'Natura Fitness', 'Pride',
    'Территория Фитнеса', 'ФизКульт', 'Планета Фитнес', 'Biosfera', 'YogaDOM'
]

EDUCATION_NAMES = [
    'Skyeng', 'EnglishDom', 'Foxford', 'Алгоритмика', 'Pixel', 'Coddy',
    'GeekSchool', 'Kodland', 'ProgKids', 'Тетрика', 'Учи.ру Центр', 'Умназия',
    'Автошкола МОСавто', 'Автошкола ДОСААФ', 'Автошкола Престиж'
]

SHOPPING_NAMES = [
    'Ашан', 'Перекрёсток', 'Пятёрочка', 'Магнит', 'Дикси', 'ВкусВилл',
    'Лента', 'Окей', 'Метро', 'Billa', 'Globus', 'Виктория',
    'М.Видео', 'Эльдорадо', 'DNS', 'Связной', 'Евросеть', 'Ситилинк',
    'Wildberries ПВЗ', 'Ozon ПВЗ', 'Яндекс.Маркет ПВЗ', 'PickPoint',
    'Спортмастер', 'Декатлон', 'Кант', 'Кроссы и Кеды', 'Rendez-Vous'
]

HOTEL_NAMES = [
    'Холидей Инн', 'Рэдиссон', 'Новотель', 'Ибис', 'Меркюр', 'Марриотт',
    'Шератон', 'Хилтон', 'Краун Плаза', 'Арарат Парк Хаятт', 'Swissôtel',
    'Lotte Hotel', 'Кортъярд Марриотт', 'Хэмптон', 'Парк Инн'
]

AUTO_NAMES = [
    'Автомир', 'Авилон', 'Рольф', 'Атлант-М', 'АвтоСпецЦентр',
    'Major Auto', 'БорисХоф', 'Favorit Motors', 'MAXIMUM', 'Авто-Премьер',
    'Шинсервис', 'Колёса Даром', 'Автосервис АвтоМакс', 'Express Шиномонтаж'
]

BANK_NAMES = [
    'Тинькофф', 'Альфа-Банк', 'ВТБ', 'Сбербанк', 'Газпромбанк',
    'Райффайзенбанк', 'Росбанк', 'МКБ', 'Открытие', 'Совкомбанк',
    'Промсвязьбанк', 'Ак Барс Банк', 'Россельхозбанк', 'Почта Банк'
]

PHARMACY_NAMES = [
    '36.6', 'Ригла', 'Будь Здоров', 'Аптека.ру', 'Горздрав', 'Столички',
    'Планета Здоровья', 'Фармакор', 'Самсон-Фарма', 'Доктор Столетов',
    'Вита', 'Невис', 'Озерки', 'Живика', 'Классика'
]

PETSHOP_NAMES = [
    'Четыре Лапы', 'Бетховен', 'Зоогалерея', 'Любимчик', 'Старая Ферма',
    'ZooExpress', 'Зоомаг', 'Pets & Love', 'PetShop.ru', 'E-ZOO',
    'Ветклиника Белый Клык', 'Ветцентр Лаки', 'Ветеринар+', 'ВетМир'
]

CULTURE_NAMES = [
    'Кинотеатр Москва', 'Каро Фильм', 'Синема Парк', 'Формула Кино', 'Киномакс',
    'Пионер', 'Иллюзион', 'Художественный', 'Октябрь', '35 мм',
    'Третьяковка', 'ГМИИ', 'Манеж', 'Гараж', 'Мультимедиа Арт Музей',
    'Библиотека №1', 'Библиотека им. Гоголя', 'Центральная городская библиотека'
]

KIDS_NAMES = [
    'Бэби-клуб', 'Созвездие', 'Умка', 'Любознайка', 'Ладушки', 'Карапуз',
    'Солнышко', 'Радуга', 'Почемучки', 'Маленький принц', 'Звёздочка',
    'Kidburg', 'KidsWill', 'Бэби Клаб', 'Монтессори Центр', 'IQша'
]

REPAIR_NAMES = [
    'Мастер+', 'Ремонт 24', 'Быстрый Сервис', 'Мастерок', 'Техник на дом',
    'Химчистка Диана', 'ЭкоЧистка', 'Прачечная №1', 'Белые Облака', 'Диана',
    'Ремонт Всего', 'Мастер Плюс', 'iХелп', 'Сервис 365', 'МастерОК'
]

TRANSPORT_NAMES = [
    'Ситимобил', 'Яндекс Такси', 'Максим', 'Везёт', 'Uber',
    'Делимобиль', 'Яндекс Драйв', 'Белка Кар', 'Карусель', 'Матрёшкар',
    'Велобайк', 'Velobike', 'Whoosh', 'Urent', 'Kaршеринг'
]

DISTRICTS = ['cao', 'sao', 'svao', 'vao', 'uvao', 'uao', 'uzao', 'zao', 'szao']

def generate_establishments():
    """Генерируем массив заведений"""
    establishments = []
    id_counter = 1000  # Начинаем с 1000 чтобы не конфликтовать
    
    # Рестораны (120 объектов)
    for i in range(120):
        name = RESTAURANT_NAMES[i % len(RESTAURANT_NAMES)]
        if i >= len(RESTAURANT_NAMES):
            name = f'{name} #{i // len(RESTAURANT_NAMES) + 1}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'restaurant',
            'district': district,
            'name': name,
            'slug': f'restaurant-{id_counter}',
            'description': f'Ресторан {name} - авторская кухня и уютная атмосфера',
            'is_premium': is_premium,
            'rating': round(4.0 + (i % 10) / 10, 1)
        })
        id_counter += 1
    
    # Кафе (100 объектов)
    for i in range(100):
        name = CAFE_NAMES[i % len(CAFE_NAMES)]
        if i >= len(CAFE_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 5 == 0
        establishments.append({
            'id': id_counter,
            'category': 'cafe',
            'district': district,
            'name': name,
            'slug': f'cafe-{id_counter}',
            'description': f'Кофейня {name} - свежеобжаренный кофе и десерты',
            'is_premium': is_premium,
            'rating': round(4.0 + (i % 10) / 10, 1)
        })
        id_counter += 1
    
    # Бары (60 объектов)
    for i in range(60):
        name = BAR_NAMES[i % len(BAR_NAMES)]
        if i >= len(BAR_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'bar',
            'district': district,
            'name': name,
            'slug': f'bar-{id_counter}',
            'description': f'Бар {name} - авторские коктейли и живая музыка',
            'is_premium': is_premium,
            'rating': round(4.0 + (i % 10) / 10, 1)
        })
        id_counter += 1
    
    # Салоны красоты (80 объектов)
    for i in range(80):
        name = BEAUTY_NAMES[i % len(BEAUTY_NAMES)]
        if i >= len(BEAUTY_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 5 == 0
        establishments.append({
            'id': id_counter,
            'category': 'beauty',
            'district': district,
            'name': name,
            'slug': f'beauty-{id_counter}',
            'description': f'{name} - стрижки, окрашивание, маникюр, педикюр',
            'is_premium': is_premium,
            'rating': round(4.2 + (i % 8) / 10, 1)
        })
        id_counter += 1
    
    # Медицина (70 объектов)
    for i in range(70):
        name = HEALTH_NAMES[i % len(HEALTH_NAMES)]
        if i >= len(HEALTH_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'health',
            'district': district,
            'name': name,
            'slug': f'health-{id_counter}',
            'description': f'{name} - медицинский центр, диагностика и лечение',
            'is_premium': is_premium,
            'rating': round(4.3 + (i % 7) / 10, 1)
        })
        id_counter += 1
    
    # Фитнес (60 объектов)
    for i in range(60):
        name = FITNESS_NAMES[i % len(FITNESS_NAMES)]
        if i >= len(FITNESS_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 5 == 0
        establishments.append({
            'id': id_counter,
            'category': 'fitness',
            'district': district,
            'name': name,
            'slug': f'fitness-{id_counter}',
            'description': f'{name} - тренажёрный зал, групповые программы, бассейн',
            'is_premium': is_premium,
            'rating': round(4.1 + (i % 9) / 10, 1)
        })
        id_counter += 1
    
    # Образование (50 объектов)
    for i in range(50):
        name = EDUCATION_NAMES[i % len(EDUCATION_NAMES)]
        if i >= len(EDUCATION_NAMES):
            name = f'{name} филиал {i // len(EDUCATION_NAMES) + 1}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'education',
            'district': district,
            'name': name,
            'slug': f'education-{id_counter}',
            'description': f'{name} - обучение для детей и взрослых',
            'is_premium': is_premium,
            'rating': round(4.4 + (i % 6) / 10, 1)
        })
        id_counter += 1
    
    # Магазины (120 объектов)
    for i in range(120):
        name = SHOPPING_NAMES[i % len(SHOPPING_NAMES)]
        if i >= len(SHOPPING_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 6 == 0
        establishments.append({
            'id': id_counter,
            'category': 'shopping',
            'district': district,
            'name': name,
            'slug': f'shopping-{id_counter}',
            'description': f'{name} - большой выбор товаров, доступные цены',
            'is_premium': is_premium,
            'rating': round(4.0 + (i % 10) / 10, 1)
        })
        id_counter += 1
    
    # Отели (50 объектов)
    for i in range(50):
        name = HOTEL_NAMES[i % len(HOTEL_NAMES)]
        if i >= len(HOTEL_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 3 == 0
        establishments.append({
            'id': id_counter,
            'category': 'hotel',
            'district': district,
            'name': name,
            'slug': f'hotel-{id_counter}',
            'description': f'{name} - комфортабельные номера, завтрак включён',
            'is_premium': is_premium,
            'rating': round(4.2 + (i % 8) / 10, 1)
        })
        id_counter += 1
    
    # Автосервисы (50 объектов)
    for i in range(50):
        name = AUTO_NAMES[i % len(AUTO_NAMES)]
        if i >= len(AUTO_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'auto',
            'district': district,
            'name': name,
            'slug': f'auto-{id_counter}',
            'description': f'{name} - ремонт и обслуживание автомобилей',
            'is_premium': is_premium,
            'rating': round(4.1 + (i % 9) / 10, 1)
        })
        id_counter += 1
    
    # Банки (70 объектов)
    for i in range(70):
        name = BANK_NAMES[i % len(BANK_NAMES)]
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 5 == 0
        establishments.append({
            'id': id_counter,
            'category': 'bank',
            'district': district,
            'name': f'{name} на {district.upper()}',
            'slug': f'bank-{id_counter}',
            'description': f'Отделение {name} - банковские услуги для физлиц',
            'is_premium': is_premium,
            'rating': round(4.0 + (i % 10) / 10, 1)
        })
        id_counter += 1
    
    # Аптеки (80 объектов)
    for i in range(80):
        name = PHARMACY_NAMES[i % len(PHARMACY_NAMES)]
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 6 == 0
        establishments.append({
            'id': id_counter,
            'category': 'pharmacy',
            'district': district,
            'name': f'Аптека {name} на {district.upper()}',
            'slug': f'pharmacy-{id_counter}',
            'description': f'{name} - лекарства по рецептам и без, круглосуточно',
            'is_premium': is_premium,
            'rating': round(4.2 + (i % 8) / 10, 1)
        })
        id_counter += 1
    
    # Зоотовары (40 объектов)
    for i in range(40):
        name = PETSHOP_NAMES[i % len(PETSHOP_NAMES)]
        if i >= len(PETSHOP_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'petshop',
            'district': district,
            'name': name,
            'slug': f'petshop-{id_counter}',
            'description': f'{name} - товары для животных и ветуслуги',
            'is_premium': is_premium,
            'rating': round(4.3 + (i % 7) / 10, 1)
        })
        id_counter += 1
    
    # Культура (60 объектов)
    for i in range(60):
        name = CULTURE_NAMES[i % len(CULTURE_NAMES)]
        if i >= len(CULTURE_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 5 == 0
        establishments.append({
            'id': id_counter,
            'category': 'culture',
            'district': district,
            'name': name,
            'slug': f'culture-{id_counter}',
            'description': f'{name} - культурные мероприятия и искусство',
            'is_premium': is_premium,
            'rating': round(4.4 + (i % 6) / 10, 1)
        })
        id_counter += 1
    
    # Детские центры (50 объектов)
    for i in range(50):
        name = KIDS_NAMES[i % len(KIDS_NAMES)]
        if i >= len(KIDS_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'kids',
            'district': district,
            'name': name,
            'slug': f'kids-{id_counter}',
            'description': f'{name} - развивающие занятия для детей',
            'is_premium': is_premium,
            'rating': round(4.5 + (i % 5) / 10, 1)
        })
        id_counter += 1
    
    # Ремонт (40 объектов)
    for i in range(40):
        name = REPAIR_NAMES[i % len(REPAIR_NAMES)]
        if i >= len(REPAIR_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 5 == 0
        establishments.append({
            'id': id_counter,
            'category': 'repair',
            'district': district,
            'name': name,
            'slug': f'repair-{id_counter}',
            'description': f'{name} - ремонт техники и бытовые услуги',
            'is_premium': is_premium,
            'rating': round(4.2 + (i % 8) / 10, 1)
        })
        id_counter += 1
    
    # Транспорт (40 объектов)
    for i in range(40):
        name = TRANSPORT_NAMES[i % len(TRANSPORT_NAMES)]
        if i >= len(TRANSPORT_NAMES):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'transport',
            'district': district,
            'name': name,
            'slug': f'transport-{id_counter}',
            'description': f'{name} - транспортные услуги',
            'is_premium': is_premium,
            'rating': round(4.1 + (i % 9) / 10, 1)
        })
        id_counter += 1
    
    # Развлечения (50 объектов)
    entertainment_names = [
        'Парк аттракционов', 'Боулинг', 'Бильярд', 'Квеструм', 'Антикафе',
        'Караоке', 'Кинотеатр IMAX', 'Планетарий', 'Аквапарк', 'Роллердром',
        'Картинг', 'Лазертаг', 'Батутный центр', 'Скалодром', 'VR-клуб'
    ]
    for i in range(50):
        name = entertainment_names[i % len(entertainment_names)]
        if i >= len(entertainment_names):
            name = f'{name} на {DISTRICTS[i % len(DISTRICTS)].upper()}'
        district = DISTRICTS[i % len(DISTRICTS)]
        is_premium = i % 4 == 0
        establishments.append({
            'id': id_counter,
            'category': 'entertainment',
            'district': district,
            'name': f'{name} "{chr(65 + i % 26)}"',
            'slug': f'entertainment-{id_counter}',
            'description': f'{name} - отличное место для отдыха',
            'is_premium': is_premium,
            'rating': round(4.3 + (i % 7) / 10, 1)
        })
        id_counter += 1
    
    return establishments

def handler(event: dict, context) -> dict:
    """API для массового добавления заведений"""
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

        establishments = generate_establishments()
        inserted = 0
        skipped = 0
        errors = []

        for est in establishments:
            try:
                cursor.execute("""
                    INSERT INTO establishments (city_id, district_id, category_id, name, slug, description, is_premium, rating)
                    SELECT 
                        c.id, d.id, ec.id, %s, %s, %s, %s, %s
                    FROM cities c
                    CROSS JOIN districts d
                    CROSS JOIN establishment_categories ec
                    WHERE c.slug = 'москва' AND d.slug = %s AND ec.slug = %s
                    ON CONFLICT (city_id, slug) DO NOTHING
                    RETURNING id
                """, (
                    est['name'], est['slug'], est['description'],
                    est['is_premium'], est['rating'],
                    est['district'], est['category']
                ))
                
                if cursor.fetchone():
                    inserted += 1
                else:
                    skipped += 1
                    
            except Exception as e:
                skipped += 1
                errors.append(f"{est['slug']}: {str(e)}")

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
                'total': len(establishments),
                'errors': errors[:10] if errors else []
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }