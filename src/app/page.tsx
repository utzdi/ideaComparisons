import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, problem: true, audience: true, createdAt: true },
  });

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Unsere Ideen</h1>
            <p className="text-gray-400 mt-1">{ideas.length} Idee{ideas.length !== 1 ? "n" : ""} gespeichert</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dachdecker"
              className="border border-gray-800 hover:border-gray-700 hover:bg-gray-900 text-gray-300 hover:text-white transition-colors px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-1.5"
            >
              🏠 Dachdecker-Verzeichnis
            </Link>
            <Link
              href="/new"
              className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center"
            >
              + Neue Idee
            </Link>
          </div>
        </div>

        {ideas.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-lg">Noch keine Ideen vorhanden.</p>
            <Link href="/new" className="text-indigo-400 hover:underline mt-2 inline-block">
              Erste Idee hinzufügen →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ideas.map((idea) => (
              <Link key={idea.id} href={`/ideas/${idea.id}`} className="group block">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-full hover:border-indigo-600 transition-colors">
                  <h2 className="font-semibold text-lg group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {idea.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-3">{idea.problem}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
                      {idea.audience}
                    </span>
                    <span className="text-xs text-gray-600">
                      {new Date(idea.createdAt).toLocaleDateString("de-DE")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
