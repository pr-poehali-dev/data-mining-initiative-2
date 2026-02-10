import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { EstablishmentsSection } from "@/components/EstablishmentsSection"
import {
  MOSCOW_DISTRICTS,
  MO_CITIES,
  SAMPLE_ATTRACTIONS,
  SAMPLE_ESTABLISHMENTS,
  TRANSPORT_INFO,
} from "@/data/moscow-data"

export default function CityPage() {
  const { citySlug } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"moscow" | "mo">("moscow")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const cityName = citySlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const isMoscow = citySlug === "москва"

  const filteredAttractions =
    selectedCategory === "all"
      ? SAMPLE_ATTRACTIONS
      : SAMPLE_ATTRACTIONS.filter((a) => a.category === selectedCategory)

  const premiumAttractions = filteredAttractions.filter((a) => a.isPremium)
  const regularAttractions = filteredAttractions.filter((a) => !a.isPremium)

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
        }}
      />

      <div className="relative z-10">
        <header className="bg-white border-b-[3px] border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              onClick={() => navigate("/")}
              className="bg-white text-black border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
            <h1 className="text-3xl font-black">{cityName}</h1>
            <div className="w-32" />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {isMoscow && (
            <div className="mb-8 flex gap-3">
              <Button
                onClick={() => setActiveTab("moscow")}
                className={`flex-1 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold ${
                  activeTab === "moscow"
                    ? "bg-[#FF2E63] text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                Москва
              </Button>
              <Button
                onClick={() => setActiveTab("mo")}
                className={`flex-1 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold ${
                  activeTab === "mo"
                    ? "bg-[#FF2E63] text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                Московская область
              </Button>
            </div>
          )}

          <div className="mb-8 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="aspect-video bg-gradient-to-br from-[#FF2E63] to-[#FF6B9D] border-[3px] border-black flex items-center justify-center mb-4">
              <span className="text-white font-black text-4xl">МОСКВА</span>
            </div>
            <h2 className="text-2xl font-black mb-2">О столице</h2>
            <p className="text-lg leading-relaxed mb-4">
              Москва — столица Российской Федерации, крупнейший город России и Европы. Основана в 1147 году.
              Население более 13 миллионов человек. Город федерального значения.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 border-[2px] border-black bg-gray-50">
                <p className="text-sm font-medium text-gray-600">Население</p>
                <p className="text-xl font-black">13+ млн</p>
              </div>
              <div className="p-3 border-[2px] border-black bg-gray-50">
                <p className="text-sm font-medium text-gray-600">Год основания</p>
                <p className="text-xl font-black">1147</p>
              </div>
              <div className="p-3 border-[2px] border-black bg-gray-50">
                <p className="text-sm font-medium text-gray-600">Площадь</p>
                <p className="text-xl font-black">2561 км²</p>
              </div>
              <div className="p-3 border-[2px] border-black bg-gray-50">
                <p className="text-sm font-medium text-gray-600">Часовой пояс</p>
                <p className="text-xl font-black">UTC+3</p>
              </div>
            </div>
          </div>

          {isMoscow && activeTab === "moscow" && (
            <>
              <div className="mb-8 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <Icon name="MapPin" size={28} />
                  Административные округа
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MOSCOW_DISTRICTS.map((district) => (
                    <div
                      key={district.id}
                      className="p-4 border-[2px] border-black bg-gray-50 hover:bg-[#FF2E63] hover:text-white transition-colors cursor-pointer"
                    >
                      <h4 className="font-bold mb-2">{district.name}</h4>
                      <p className="text-sm opacity-80">{district.areas?.length || 0} районов</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <Icon name="Train" size={28} />
                  Транспортная система
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border-[2px] border-black bg-gray-50">
                    <h4 className="text-lg font-bold mb-2">Метрополитен</h4>
                    <p className="text-sm text-gray-700 mb-2">{TRANSPORT_INFO.metro.description}</p>
                    <div className="flex gap-4 text-sm font-bold">
                      <span>{TRANSPORT_INFO.metro.lines} линий</span>
                      <span>{TRANSPORT_INFO.metro.stations} станций</span>
                    </div>
                  </div>
                  <div className="p-4 border-[2px] border-black bg-gray-50">
                    <h4 className="text-lg font-bold mb-2">МЦК</h4>
                    <p className="text-sm text-gray-700 mb-2">{TRANSPORT_INFO.mck.description}</p>
                    <div className="text-sm font-bold">{TRANSPORT_INFO.mck.stations} станций</div>
                  </div>
                  <div className="p-4 border-[2px] border-black bg-gray-50">
                    <h4 className="text-lg font-bold mb-2">МЦД</h4>
                    <p className="text-sm text-gray-700 mb-2">{TRANSPORT_INFO.mcd.description}</p>
                    <div className="text-sm font-bold">{TRANSPORT_INFO.mcd.lines} диаметров</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {isMoscow && activeTab === "mo" && (
            <div className="mb-8 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                <Icon name="Building2" size={28} />
                Города Московской области
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {MO_CITIES.map((city) => (
                  <div
                    key={city.id}
                    className="p-4 border-[2px] border-black bg-gray-50 hover:bg-[#FF2E63] hover:text-white transition-colors cursor-pointer font-bold text-center"
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              <Icon name="Landmark" size={28} />
              Достопримечательности
            </h3>

            <div className="mb-4 flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedCategory("all")}
                className={`border-[2px] border-black font-bold text-sm ${
                  selectedCategory === "all"
                    ? "bg-[#FF2E63] text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                Все
              </Button>
              {["Исторический памятник", "Музей", "Парк", "Архитектура", "Театр"].map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`border-[2px] border-black font-bold text-sm ${
                    selectedCategory === cat
                      ? "bg-[#FF2E63] text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              {premiumAttractions.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold mb-3 text-[#FF2E63]">⭐ Рекомендуемые</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {premiumAttractions.map((attr) => (
                      <div
                        key={attr.id}
                        className="p-4 border-[3px] border-[#FF2E63] bg-[#FFF5F7] shadow-[3px_3px_0px_0px_rgba(255,46,99,1)] hover:shadow-[1px_1px_0px_0px_rgba(255,46,99,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="text-lg font-black">{attr.name}</h5>
                          <span className="text-xs bg-[#FF2E63] text-white px-2 py-1 font-bold border-[2px] border-black">
                            PREMIUM
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{attr.category}</p>
                        <p className="text-sm">{attr.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {regularAttractions.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold mb-3">Остальные места</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {regularAttractions.map((attr) => (
                      <div
                        key={attr.id}
                        className="p-4 border-[2px] border-black bg-gray-50 hover:bg-white transition-colors cursor-pointer"
                      >
                        <h5 className="text-lg font-bold mb-1">{attr.name}</h5>
                        <p className="text-sm text-gray-600 mb-1">{attr.category}</p>
                        <p className="text-sm">{attr.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <EstablishmentsSection />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FF2E63] border-[3px] border-black flex items-center justify-center">
                  <Icon name="BookOpen" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black">История</h3>
              </div>
              <p className="text-gray-700 mb-4">
                От основания в 1147 году до современности — полная история города с архивными материалами.
              </p>
              <Button className="w-full bg-[#FF2E63] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold">
                Открыть раздел
              </Button>
            </div>

            <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FF2E63] border-[3px] border-black flex items-center justify-center">
                  <Icon name="Camera" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black">Фотогалерея</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Исторические и современные фотографии Москвы — от XIX века до наших дней.
              </p>
              <Button className="w-full bg-[#FF2E63] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold">
                Открыть раздел
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              <Icon name="MapPinned" size={28} />
              Популярные маршруты
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border-[2px] border-black">
                <h4 className="text-lg font-bold mb-2">Золотое кольцо Москвы</h4>
                <p className="text-sm text-gray-600 mb-2">3-4 часа, пешком + метро</p>
                <p>Кремль → Красная площадь → ГУМ → Храм Василия Блаженного → Александровский сад</p>
              </div>
              <div className="p-4 bg-gray-50 border-[2px] border-black">
                <h4 className="text-lg font-bold mb-2">Культурный день</h4>
                <p className="text-sm text-gray-600 mb-2">Полный день</p>
                <p>Третьяковская галерея → Парк Горького → Музеон → Большой театр</p>
              </div>
              <div className="p-4 bg-gray-50 border-[2px] border-black">
                <h4 className="text-lg font-bold mb-2">Современная Москва</h4>
                <p className="text-sm text-gray-600 mb-2">4-5 часов</p>
                <p>Москва-Сити → Красный Октябрь → Зарядье → ВДНХ → Останкинская башня</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}