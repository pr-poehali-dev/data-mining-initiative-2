export interface District {
  id: string
  name: string
  type: "moscow" | "mo"
  areas?: string[]
}

export interface Attraction {
  id: string
  name: string
  category: string
  district: string
  description: string
  isPremium?: boolean
}

export interface Establishment {
  id: string
  name: string
  category: "restaurant" | "cafe" | "bar" | "entertainment"
  district: string
  description: string
  isPremium?: boolean
}

export const MOSCOW_DISTRICTS: District[] = [
  { id: "cao", name: "Центральный АО", type: "moscow", areas: ["Арбат", "Басманный", "Замоскворечье", "Красносельский", "Мещанский", "Пресненский", "Таганский", "Тверской", "Хамовники", "Якиманка"] },
  { id: "sao", name: "Северный АО", type: "moscow", areas: ["Аэропорт", "Беговой", "Бескудниковский", "Войковский", "Головинский", "Дмитровский", "Коптево", "Левобережный", "Молжаниновский", "Савёловский", "Сокол", "Тимирязевский", "Ховрино", "Хорошёвский"] },
  { id: "svao", name: "Северо-Восточный АО", type: "moscow", areas: ["Алексеевский", "Алтуфьевский", "Бабушкинский", "Бибирево", "Бутырский", "Лианозово", "Лосиноостровский", "Марфино", "Марьина Роща", "Останкинский", "Отрадное", "Ростокино", "Свиблово", "Северное Медведково", "Северный", "Южное Медведково", "Ярославский"] },
  { id: "vao", name: "Восточный АО", type: "moscow", areas: ["Богородское", "Вешняки", "Восточное Измайлово", "Восточный", "Гольяново", "Ивановское", "Измайлово", "Косино-Ухтомский", "Метрогородок", "Новогиреево", "Новокосино", "Перово", "Преображенское", "Соколиная Гора", "Сокольники"] },
  { id: "uvao", name: "Юго-Восточный АО", type: "moscow", areas: ["Выхино-Жулебино", "Капотня", "Кузьминки", "Лефортово", "Люблино", "Марьино", "Некрасовка", "Нижегородский", "Печатники", "Рязанский", "Текстильщики", "Южнопортовый"] },
  { id: "uao", name: "Южный АО", type: "moscow", areas: ["Бирюлёво Восточное", "Бирюлёво Западное", "Братеево", "Даниловский", "Донской", "Зябликово", "Москворечье-Сабурово", "Нагатино-Садовники", "Нагатинский Затон", "Нагорный", "Орехово-Борисово Северное", "Орехово-Борисово Южное", "Царицыно", "Чертаново Северное", "Чертаново Центральное", "Чертаново Южное"] },
  { id: "uzao", name: "Юго-Западный АО", type: "moscow", areas: ["Академический", "Гагаринский", "Зюзино", "Коньково", "Котловка", "Ломоносовский", "Обручевский", "Северное Бутово", "Тёплый Стан", "Черёмушки", "Южное Бутово", "Ясенево"] },
  { id: "zao", name: "Западный АО", type: "moscow", areas: ["Внуково", "Дорогомилово", "Крылатское", "Кунцево", "Можайский", "Ново-Переделкино", "Очаково-Матвеевское", "Проспект Вернадского", "Раменки", "Солнцево", "Тропарёво-Никулино", "Филёвский Парк", "Фили-Давыдково"] },
  { id: "szao", name: "Северо-Западный АО", type: "moscow", areas: ["Куркино", "Митино", "Покровское-Стрешнево", "Строгино", "Тушино Северное", "Тушино Южное", "Хорошёво-Мнёвники", "Щукино"] },
  { id: "zao-new", name: "Зеленоградский АО", type: "moscow", areas: ["Крюково", "Матушкино", "Савёлки", "Силино", "Старое Крюково"] },
  { id: "nao", name: "Новомосковский АО", type: "moscow", areas: ["Внуковское", "Воскресенское", "Десёновское", "Киевский", "Кокошкино", "Марушкинское", "Московский", "Филимонковское", "Щербинка"] },
  { id: "tao", name: "Троицкий АО", type: "moscow", areas: ["Вороновское", "Десёновское", "Киевский", "Кокошкино", "Краснопахорское", "Марушкинское", "Михайлово-Ярцевское", "Мосрентген", "Новофёдоровское", "Первомайское", "Роговское", "Рязановское", "Сосенское", "Троицк", "Щаповское"] },
]

export const MO_CITIES: District[] = [
  { id: "balashiha", name: "Балашиха", type: "mo" },
  { id: "khimki", name: "Химки", type: "mo" },
  { id: "podolsk", name: "Подольск", type: "mo" },
  { id: "korolev", name: "Королёв", type: "mo" },
  { id: "mytischi", name: "Мытищи", type: "mo" },
  { id: "lyubertsy", name: "Люберцы", type: "mo" },
  { id: "krasnogorsk", name: "Красногорск", type: "mo" },
  { id: "elektrostal", name: "Электросталь", type: "mo" },
  { id: "domodedovo", name: "Домодедово", type: "mo" },
  { id: "odintsovo", name: "Одинцово", type: "mo" },
  { id: "sergiev-posad", name: "Сергиев Посад", type: "mo" },
  { id: "serpukhov", name: "Серпухов", type: "mo" },
  { id: "shchelkovo", name: "Щёлково", type: "mo" },
  { id: "reutov", name: "Реутов", type: "mo" },
  { id: "zhukovsky", name: "Жуковский", type: "mo" },
]

export const SAMPLE_ATTRACTIONS: Attraction[] = [
  { id: "1", name: "Красная площадь", category: "Исторический памятник", district: "cao", description: "Главная площадь Москвы и всей России" },
  { id: "2", name: "Московский Кремль", category: "Исторический комплекс", district: "cao", description: "Крепость в центре Москвы, официальная резиденция Президента РФ", isPremium: true },
  { id: "3", name: "Храм Василия Блаженного", category: "Религиозный памятник", district: "cao", description: "Православный храм на Красной площади, памятник русской архитектуры" },
  { id: "4", name: "Третьяковская галерея", category: "Музей", district: "cao", description: "Крупнейший музей русского изобразительного искусства", isPremium: true },
  { id: "5", name: "ВДНХ", category: "Парк", district: "svao", description: "Выставочный комплекс и парк развлечений" },
  { id: "6", name: "Парк Горького", category: "Парк", district: "cao", description: "Центральный парк культуры и отдыха" },
  { id: "7", name: "Останкинская башня", category: "Архитектура", district: "svao", description: "Телевизионная башня, одна из самых высоких в Европе" },
  { id: "8", name: "Большой театр", category: "Театр", district: "cao", description: "Один из крупнейших в мире театров оперы и балета", isPremium: true },
]

export const SAMPLE_ESTABLISHMENTS: Establishment[] = [
  { id: "1", name: "Кафе Пушкинъ", category: "restaurant", district: "cao", description: "Ресторан русской кухни в историческом особняке", isPremium: true },
  { id: "2", name: "Белуга", category: "restaurant", district: "cao", description: "Ресторан современной русской кухни", isPremium: true },
  { id: "3", name: "Турандот", category: "restaurant", district: "cao", description: "Роскошный ресторан в дворцовых интерьерах", isPremium: true },
  { id: "4", name: "Мясницкий ряд", category: "restaurant", district: "cao", description: "Стейк-хаус с мраморным мясом" },
  { id: "5", name: "Пряности & Радости", category: "restaurant", district: "svao", description: "Уютный семейный ресторан грузинской кухни" },
  { id: "6", name: "Корчма Тарас Бульба", category: "restaurant", district: "sao", description: "Сеть украинских ресторанов" },
  
  { id: "7", name: "Кофемания", category: "cafe", district: "cao", description: "Сеть демократичных кафе-кондитерских" },
  { id: "8", name: "Starbucks", category: "cafe", district: "cao", description: "Международная сеть кофеен", isPremium: true },
  { id: "9", name: "Буше", category: "cafe", district: "vao", description: "Французская пекарня-кондитерская" },
  { id: "10", name: "Андерсон", category: "cafe", district: "zao", description: "Семейное кафе с детской зоной" },
  { id: "11", name: "Coffee Bean", category: "cafe", district: "uzao", description: "Specialty coffee и авторские десерты" },
  { id: "12", name: "Цех85", category: "cafe", district: "cao", description: "Пекарня с авторским хлебом" },
  
  { id: "13", name: "32.05", category: "bar", district: "cao", description: "Бар на 85-м этаже башни ОКО с панорамным видом", isPremium: true },
  { id: "14", name: "Небо", category: "bar", district: "cao", description: "Ресторан-бар на крыше с видом на Москву", isPremium: true },
  { id: "15", name: "Noor", category: "bar", district: "cao", description: "Коктейльный бар в восточном стиле" },
  { id: "16", name: "Lawson's Bar", category: "bar", district: "cao", description: "Крафтовый бар с авторскими коктейлями" },
  { id: "17", name: "Simach", category: "bar", district: "svao", description: "Демократичный бар с живой музыкой" },
  
  { id: "18", name: "Москвариум", category: "entertainment", district: "svao", description: "Океанариум на ВДНХ с шоу дельфинов", isPremium: true },
  { id: "19", name: "Парк Горького", category: "entertainment", district: "cao", description: "Центральный парк культуры и отдыха" },
  { id: "20", name: "ВДНХ", category: "entertainment", district: "svao", description: "Выставочный комплекс и парк развлечений", isPremium: true },
  { id: "21", name: "Зарядье", category: "entertainment", district: "cao", description: "Современный парк с уникальными ландшафтами" },
  { id: "22", name: "Киноцентр Октябрь", category: "entertainment", district: "cao", description: "Исторический кинотеатр на Новом Арбате" },
  { id: "23", name: "Dream Island", category: "entertainment", district: "uao", description: "Крытый тематический парк развлечений" },
]

export const TRANSPORT_INFO = {
  metro: {
    lines: 15,
    stations: 250,
    description: "Московский метрополитен — один из крупнейших в мире"
  },
  mck: {
    stations: 31,
    description: "Московское центральное кольцо — наземная линия метро"
  },
  mcd: {
    lines: 5,
    description: "Московские центральные диаметры — городская электричка"
  }
}