import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Самара",
  "Омск",
  "Ростов-на-Дону",
]

export function CitySearch() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const filteredCities = CITIES.filter((city) => city.toLowerCase().includes(query.toLowerCase()))

  const handleCitySelect = (city: string) => {
    setQuery("")
    setIsOpen(false)
    navigate(`/city/${city.toLowerCase().replace(/\s+/g, "-")}`)
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Найти город..."
            className="w-full p-3 pr-10 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-black font-medium text-sm focus:outline-none focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="Search" size={18} />
          </div>
        </div>
      </div>

      {isOpen && query && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-64 overflow-y-auto">
          {filteredCities.map((city) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className="w-full text-left px-4 py-3 font-medium hover:bg-[#FF2E63] hover:text-white transition-colors border-b-[2px] border-black last:border-b-0"
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {isOpen && query && filteredCities.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
          <p className="text-gray-600 font-medium text-sm">Город не найден</p>
        </div>
      )}
    </div>
  )
}
