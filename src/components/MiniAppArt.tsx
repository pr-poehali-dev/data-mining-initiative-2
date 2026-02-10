export function MiniAppArt() {
  const artworks = [
    { title: "Исторические фото", medium: "Архивные снимки", year: "XIX-XX век" },
    { title: "Архитектура", medium: "Современные фото", year: "2020-2026" },
    { title: "Городские панорамы", medium: "Виды с высоты", year: "2024-2026" },
    { title: "Природа и парки", medium: "Ландшафты", year: "2023-2026" },
    { title: "Памятники и скульптуры", medium: "Культурное наследие", year: "2022-2026" },
    { title: "Городская жизнь", medium: "Улицы и люди", year: "2021-2026" },
  ]

  return (
    <div className="max-w-4xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Фотогалерея</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork, i) => (
          <div
            key={i}
            className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          >
            <div className="aspect-square bg-gradient-to-br from-[#FF2E63] to-[#FF6B9D] border-b-[3px] border-black flex items-center justify-center">
              <span className="text-white font-black text-lg">ФОТО</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-black mb-1">{artwork.title}</h3>
              <p className="text-sm text-gray-600 font-medium">{artwork.medium}</p>
              <p className="text-sm font-bold">{artwork.year}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-[#FF2E63] text-white px-6 py-3 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black text-lg">
          Все фото
        </button>
      </div>
    </div>
  )
}