import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { MOSCOW_DISTRICTS } from "@/data/moscow-data"

interface Establishment {
  id: string
  name: string
  slug: string
  description: string
  category_slug: string
  category_name: string
  category_icon: string
  district_slug: string
  district_name: string
  is_premium: boolean
  rating?: number
  address?: string
  phone?: string
  website?: string
}

const CATEGORY_ORDER = [
  'restaurant', 'cafe', 'bar', 'entertainment',
  'beauty', 'health', 'fitness', 'education',
  'shopping', 'hotel', 'auto', 'bank',
  'pharmacy', 'petshop', 'culture', 'kids',
  'repair', 'transport'
]

export function EstablishmentsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [establishments, setEstablishments] = useState<Establishment[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchEstablishments()
  }, [selectedCategory, selectedDistrict, searchQuery])

  const fetchEstablishments = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('city', 'москва')
      if (selectedCategory !== 'all') params.set('category', selectedCategory)
      if (selectedDistrict !== 'all') params.set('district', selectedDistrict)
      if (searchQuery) params.set('search', searchQuery)

      const response = await fetch(`https://functions.poehali.dev/771cd3c7-eb6c-4f01-bc2d-f7ab39d0f0c6?${params}`)
      const data = await response.json()
      setEstablishments(data.establishments || [])

      // Подсчитываем категории для счётчиков (всегда загружаем все для счётчиков)
      if (selectedCategory === 'all' && selectedDistrict === 'all' && !searchQuery) {
        const counts: Record<string, number> = {}
        data.establishments.forEach((est: Establishment) => {
          counts[est.category_slug] = (counts[est.category_slug] || 0) + 1
        })
        setCategoryCounts(counts)
      }
    } catch (error) {
      console.error('Error fetching establishments:', error)
      setEstablishments([])
    } finally {
      setLoading(false)
    }
  }

  const premiumEstablishments = establishments.filter((e) => e.is_premium)
  const regularEstablishments = establishments.filter((e) => !e.is_premium)



  return (
    <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
        <Icon name="UtensilsCrossed" size={32} />
        Заведения Москвы
      </h3>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск заведения..."
            className="w-full p-3 pr-10 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-black font-medium text-sm focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="Search" size={18} />
          </div>
        </div>

        <div>
          <p className="text-sm font-bold mb-2">Категория:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedCategory("all")}
              className={`border-[2px] border-black font-bold text-sm ${
                selectedCategory === "all"
                  ? "bg-[#FF2E63] text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              Все ({establishments.length})
            </Button>
            {CATEGORY_ORDER.map((key) => {
              const count = categoryCounts[key] || 0
              if (count === 0 && selectedCategory !== key) return null
              
              // Получаем название категории из первого заведения с этой категорией
              const categoryName = establishments.find(e => e.category_slug === key)?.category_name || key
              
              return (
                <Button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`border-[2px] border-black font-bold text-sm ${
                    selectedCategory === key
                      ? "bg-[#FF2E63] text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  {categoryName} ({count})
                </Button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold mb-2">Округ:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedDistrict("all")}
              className={`border-[2px] border-black font-bold text-sm ${
                selectedDistrict === "all"
                  ? "bg-[#FF2E63] text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              Все округа
            </Button>
            {MOSCOW_DISTRICTS.slice(0, 6).map((district) => (
              <Button
                key={district.id}
                onClick={() => setSelectedDistrict(district.id)}
                className={`border-[2px] border-black font-bold text-sm ${
                  selectedDistrict === district.id
                    ? "bg-[#FF2E63] text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                {district.name.replace(" АО", "")}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 border-[2px] border-black">
        <p className="text-sm font-bold">
          Найдено: {establishments.length} {establishments.length === 1 ? "заведение" : "заведений"}
          {premiumEstablishments.length > 0 && (
            <span className="text-[#FF2E63]"> (в том числе {premiumEstablishments.length} рекомендуемых)</span>
          )}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
          <p className="mt-4 text-lg font-bold">Загрузка заведений...</p>
        </div>
      ) : (
      <div className="space-y-6">
        {premiumEstablishments.length > 0 && (
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="text-[#FF2E63]">Рекомендуемые заведения</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {premiumEstablishments.map((est) => (
                <div
                  key={est.id}
                  className="p-5 border-[3px] border-[#FF2E63] bg-[#FFF5F7] shadow-[4px_4px_0px_0px_rgba(255,46,99,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,46,99,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#FF2E63] border-[2px] border-black flex items-center justify-center">
                        <Icon name={est.category_icon || 'MapPin'} size={20} className="text-white" />
                      </div>
                      <div>
                        <h5 className="text-lg font-black">{est.name}</h5>
                        <p className="text-xs text-gray-600">
                          {est.category_name}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-[#FF2E63] text-white px-2 py-1 font-bold border-[2px] border-black whitespace-nowrap">
                      PREMIUM
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{est.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {regularEstablishments.length > 0 && (
          <div>
            {premiumEstablishments.length > 0 && (
              <h4 className="text-xl font-bold mb-4">Остальные заведения</h4>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regularEstablishments.map((est) => (
                <div
                  key={est.id}
                  className="p-4 border-[2px] border-black bg-gray-50 hover:bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-black flex items-center justify-center">
                      <Icon name={est.category_icon || 'MapPin'} size={16} className="text-white" />
                    </div>
                    <div>
                      <h5 className="text-base font-bold">{est.name}</h5>
                      <p className="text-xs text-gray-600">
                        {est.category_name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{est.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {establishments.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-bold text-gray-600">Заведения не найдены</p>
            <p className="text-sm text-gray-500 mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </div>
      )}
    </div>
  )
}