import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export default function CityPage() {
  const { citySlug } = useParams()
  const navigate = useNavigate()

  const cityName = citySlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

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
          <div className="mb-8 bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="aspect-video bg-gradient-to-br from-[#FF2E63] to-[#FF6B9D] border-[3px] border-black flex items-center justify-center mb-4">
              <span className="text-white font-black text-4xl">ФОТО</span>
            </div>
            <h2 className="text-2xl font-black mb-2">О городе</h2>
            <p className="text-lg leading-relaxed">
              Здесь будет краткое описание города {cityName} — основные факты, население, год основания.
            </p>
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
                Исторические факты, важные события, архивные материалы и фотографии.
              </p>
              <Button className="w-full bg-[#FF2E63] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold">
                Открыть раздел
              </Button>
            </div>

            <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FF2E63] border-[3px] border-black flex items-center justify-center">
                  <Icon name="Landmark" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black">Достопримечательности</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Главные места для посещения, музеи, памятники архитектуры.
              </p>
              <Button className="w-full bg-[#FF2E63] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold">
                Открыть раздел
              </Button>
            </div>

            <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FF2E63] border-[3px] border-black flex items-center justify-center">
                  <Icon name="UtensilsCrossed" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black">Заведения</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Рестораны, кафе, бары — все места для отдыха и развлечений.
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
                Исторические и современные фотографии города.
              </p>
              <Button className="w-full bg-[#FF2E63] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-bold">
                Открыть раздел
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black mb-4">Популярные маршруты</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border-[2px] border-black">
                <h4 className="text-lg font-bold mb-2">Обзорная экскурсия по центру</h4>
                <p className="text-sm text-gray-600 mb-2">2-3 часа, пешком</p>
                <p>Классический маршрут по главным достопримечательностям города.</p>
              </div>
              <div className="p-4 bg-gray-50 border-[2px] border-black">
                <h4 className="text-lg font-bold mb-2">Исторические кварталы</h4>
                <p className="text-sm text-gray-600 mb-2">4-5 часов, с остановками</p>
                <p>Погружение в историю через старинные улицы и памятники архитектуры.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
