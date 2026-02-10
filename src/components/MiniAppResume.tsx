export function MiniAppResume() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Достопримечательности</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">Куда сходить</h3>

          <div className="space-y-4">
            <div className="border-l-[4px] border-[#FF2E63] pl-4">
              <h4 className="text-xl font-bold">Исторические памятники</h4>
              <p className="text-gray-600 font-medium">Кремли, церкви, монастыри, усадьбы</p>
              <p className="mt-2">
                Уникальные архитектурные памятники, сохранившие дух веков. Полная информация о режиме работы, стоимости и как добраться.
              </p>
            </div>

            <div className="border-l-[4px] border-[#FF2E63] pl-4">
              <h4 className="text-xl font-bold">Музеи и выставки</h4>
              <p className="text-gray-600 font-medium">Краеведческие, художественные, современные</p>
              <p className="mt-2">
                Полный список музеев с описанием экспозиций, актуальными выставками и расписанием.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-4">Популярные маршруты</h3>

          <div className="grid gap-4">
            <div className="p-4 bg-gray-50 border-[2px] border-black">
              <h4 className="text-lg font-bold">Обзорная экскурсия по центру</h4>
              <p className="text-sm text-gray-600 mb-2">2-3 часа, пешком, для всей семьи</p>
              <p>Классический маршрут по главным достопримечательностям с подробным описанием.</p>
            </div>

            <div className="p-4 bg-gray-50 border-[2px] border-black">
              <h4 className="text-lg font-bold">Скрытые жемчужины</h4>
              <p className="text-sm text-gray-600 mb-2">4-5 часов, для любителей истории</p>
              <p>Малоизвестные места, которые хранят удивительные истории и легенды.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}