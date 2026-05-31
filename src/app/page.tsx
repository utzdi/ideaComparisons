import Link from "next/link";

const CATEGORIES = [
  {
    title: "Dachdecker",
    emoji: "🏠",
    description: "Dachdeckerfachbetriebe, Zimmereien & Meisterbetriebe",
    leadCount: 57,
    href: "/dachdecker",
    gradient: "from-teal-500/20 to-indigo-500/20",
    borderHover: "hover:border-teal-500/60",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
    countColor: "text-teal-400",
  },
  {
    title: "Architektur",
    emoji: "🏛️",
    description: "Architekturbüros, Planungsbüros & Innenarchitekten",
    leadCount: 50,
    href: "/architektur",
    gradient: "from-violet-500/20 to-rose-500/20",
    borderHover: "hover:border-violet-500/60",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    countColor: "text-violet-400",
  },
];

export default function HomePage() {
  const totalLeads = CATEGORIES.reduce((sum, c) => sum + c.leadCount, 0);

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10 flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="mb-16 pt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-black shadow-lg shadow-indigo-950/50">
              L
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                LeadBase
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-xl">
            Ihre zentrale Plattform für Branchen-Leads im Raum Bonn & Rhein-Sieg.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-3">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Gesamt-Leads
              </div>
              <div className="text-2xl font-bold text-white mt-0.5">{totalLeads}</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-3">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Branchen
              </div>
              <div className="text-2xl font-bold text-indigo-400 mt-0.5">
                {CATEGORIES.length}
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-3">
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Region
              </div>
              <div className="text-2xl font-bold text-purple-400 mt-0.5">Bonn</div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">Branchen-Kategorien</h2>
          <p className="text-gray-500 text-sm mt-1">
            Wählen Sie eine Branche, um die zugehörigen Leads einzusehen.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CATEGORIES.map((category) => (
            <Link key={category.href} href={category.href} className="group block">
              <div
                className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} bg-gray-900 border border-gray-800 ${category.borderHover} rounded-2xl p-7 h-full transition-all duration-300 hover:shadow-xl hover:shadow-gray-950/50 hover:-translate-y-0.5`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${category.iconBg} rounded-xl flex items-center justify-center text-2xl mb-5 border border-gray-800 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.emoji}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {category.description}
                </p>

                {/* Lead Count + Arrow */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-bold ${category.countColor}`}
                    >
                      {category.leadCount}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">Leads</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-gray-800/60 border border-gray-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full mt-20 pt-8 border-t border-gray-900">
        <p className="text-xs text-gray-600 text-center">
          LeadBase — Lead-Verwaltung für den Raum Bonn & Rhein-Sieg
        </p>
      </footer>
    </main>
  );
}
