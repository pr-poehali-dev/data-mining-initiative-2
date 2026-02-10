"""API для получения списка заведений с фильтрацией по категории и округу"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    query_params = event.get('queryStringParameters') or {}
    city_slug = query_params.get('city', 'москва')
    category = query_params.get('category', 'all')
    district = query_params.get('district', 'all')
    search = query_params.get('search', '')

    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Базовый запрос
        query = """
            SELECT 
                e.id,
                e.name,
                e.slug,
                e.description,
                e.address,
                e.phone,
                e.website,
                e.rating,
                e.price_level,
                e.is_premium,
                e.premium_until,
                e.image_url,
                ec.slug as category_slug,
                ec.name as category_name,
                ec.icon as category_icon,
                d.slug as district_slug,
                d.name as district_name
            FROM establishments e
            INNER JOIN cities c ON e.city_id = c.id
            INNER JOIN establishment_categories ec ON e.category_id = ec.id
            LEFT JOIN districts d ON e.district_id = d.id
            WHERE c.slug = %s
        """
        params = [city_slug]

        # Фильтр по категории
        if category != 'all':
            query += " AND ec.slug = %s"
            params.append(category)

        # Фильтр по округу
        if district != 'all':
            query += " AND d.slug = %s"
            params.append(district)

        # Поиск по названию
        if search:
            query += " AND LOWER(e.name) LIKE %s"
            params.append(f'%{search.lower()}%')

        # Сортировка: премиум сначала, потом по рейтингу
        query += " ORDER BY e.is_premium DESC, e.rating DESC NULLS LAST, e.name ASC"

        cursor.execute(query, params)
        establishments = cursor.fetchall()

        # Преобразуем в обычные словари
        result = []
        for row in establishments:
            item = dict(row)
            # Проверяем актуальность премиум статуса
            if item['is_premium'] and item['premium_until']:
                from datetime import datetime
                if datetime.now() > item['premium_until']:
                    item['is_premium'] = False
            result.append(item)

        cursor.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'establishments': result,
                'total': len(result),
                'filters': {
                    'city': city_slug,
                    'category': category,
                    'district': district,
                    'search': search
                }
            }, default=str)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
