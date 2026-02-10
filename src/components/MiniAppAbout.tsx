export function MiniAppAbout() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">История городов</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">От древних летописей до современности</h3>
          <p className="text-lg leading-relaxed mb-4">
            Здесь собрана полная история всех городов России. От основания и развития до современных событий —
            каждый факт, документ и архивный материал.
          </p>
          <p className="text-lg leading-relaxed">
            Уникальная коллекция исторических фотографий, летописей и документов, собранных из
            всех доступных интернет-источников.
          </p>
        </div>

        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">Разделы истории</h3>
          <div className="flex flex-wrap gap-2">
            {["Основание городов", "Исторические события", "Архитектура", "Культура", "Известные личности", "Фотоархивы", "Летописи", "Хроники"].map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-[#FF2E63] text-white px-3 py-1 border-[2px] border-black font-bold text-sm"
                >
                  {skill}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}