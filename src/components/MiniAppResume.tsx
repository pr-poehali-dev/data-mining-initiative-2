export function MiniAppResume() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Резюме</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">Опыт</h3>

          <div className="space-y-4">
            <div className="border-l-[4px] border-[#FF2E63] pl-4">
              <h4 className="text-xl font-bold">Ведущий креативный разработчик</h4>
              <p className="text-gray-600 font-medium">Stellar Analytics - 2022 - настоящее время</p>
              <p className="mt-2">
                Руковожу разработкой инновационных веб-продуктов на React, TypeScript и современных дизайн-системах.
              </p>
            </div>

            <div className="border-l-[4px] border-[#FF2E63] pl-4">
              <h4 className="text-xl font-bold">Full Stack разработчик</h4>
              <p className="text-gray-600 font-medium">Nova Industries - 2020 - 2022</p>
              <p className="mt-2">
                Создавал масштабируемые веб-приложения от концепта до деплоя, работая со всем технологическим стеком.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">Проекты</h3>

          <div className="grid gap-4">
            <div className="p-4 bg-gray-50 border-[2px] border-black">
              <h4 className="text-lg font-bold">AI-инструмент для дизайна</h4>
              <p className="text-sm text-gray-600 mb-2">React, Python, OpenAI API</p>
              <p>Интеллектуальный помощник для генерации и итерации креативных концептов.</p>
            </div>

            <div className="p-4 bg-gray-50 border-[2px] border-black">
              <h4 className="text-lg font-bold">Платформа совместной работы</h4>
              <p className="text-sm text-gray-600 mb-2">Next.js, WebSockets, PostgreSQL</p>
              <p>Платформа для бесшовной совместной работы распределенных команд в реальном времени.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
