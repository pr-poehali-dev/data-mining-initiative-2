export function MiniAppWritings() {
  const posts = [
    {
      title: "Будущее креативного AI",
      date: "Дек 2024",
      excerpt:
        "Как искусственный интеллект меняет креативную индустрию и что это значит для художников и дизайнеров.",
    },
    {
      title: "Создаем дизайн-системы правильно",
      date: "Ноя 2024",
      excerpt: "Уроки из опыта создания масштабируемых дизайн-систем, которые реально работают для команд разработки.",
    },
    {
      title: "Искусство кода",
      date: "Окт 2024",
      excerpt: "Почему программирование — это творческое занятие и как писать код как форму художественного самовыражения.",
    },
  ]

  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl font-black mb-6 border-b-[3px] border-black pb-2">Статьи</h2>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <article
            key={i}
            className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-black">{post.title}</h3>
              <span className="text-sm font-bold bg-[#FF2E63] text-white px-2 py-1 border-[2px] border-black">
                {post.date}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-[#FF2E63] text-white px-6 py-3 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black text-lg">
          Все статьи
        </button>
      </div>
    </div>
  )
}
