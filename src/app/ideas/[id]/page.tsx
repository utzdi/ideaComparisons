import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import DocumentSection from "./DocumentSection";

export const dynamic = "force-dynamic";

type IdeaKey = "problem" | "solution" | "audience" | "revenue" | "resources" | "risks" | "notes";

const sections: { label: string; key: IdeaKey; color: string }[] = [
  { label: "Problem", key: "problem", color: "border-red-500" },
  { label: "Lösung", key: "solution", color: "border-green-500" },
  { label: "Zielgruppe", key: "audience", color: "border-blue-500" },
  { label: "Geschäftsmodell", key: "revenue", color: "border-yellow-500" },
  { label: "Benötigte Ressourcen", key: "resources", color: "border-purple-500" },
  { label: "Risiken", key: "risks", color: "border-orange-500" },
  { label: "Notizen", key: "notes", color: "border-gray-500" },
];

export default async function IdeaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idea = await prisma.idea.findUnique({ where: { id } });
  if (!idea) notFound();

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Zurück zur Übersicht
          </Link>
          <div className="flex items-start justify-between mt-3 gap-4">
            <h1 className="text-3xl font-bold tracking-tight">{idea.title}</h1>
            <span className="text-sm text-gray-500 whitespace-nowrap pt-1">
              {new Date(idea.createdAt).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map(({ label, key, color }) => {
            const value = idea[key];
            if (!value) return null;
            return (
              <div key={key} className={`bg-gray-900 border-l-4 ${color} rounded-r-xl p-5`}>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{label}</h2>
                <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">{value}</p>
              </div>
            );
          })}

          {idea.furtherPlanning && (
            <div className="bg-gray-900 border-l-4 border-teal-500 rounded-r-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Weitere Planung</h2>
                <Link
                  href={`/ideas/${idea.id}/planning`}
                  className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                >
                  Separat ansehen →
                </Link>
              </div>
              <p className="text-gray-100 leading-relaxed whitespace-pre-wrap line-clamp-4">{idea.furtherPlanning}</p>
            </div>
          )}
        </div>

        <DocumentSection ideaId={idea.id} />

        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg font-medium border border-gray-700 hover:bg-gray-800 transition-colors text-sm"
          >
            ← Alle Ideen
          </Link>
          <Link
            href={`/ideas/${idea.id}/edit`}
            className="px-5 py-2.5 rounded-lg font-medium border border-indigo-700 text-indigo-400 hover:bg-indigo-950 transition-colors text-sm"
          >
            Bearbeiten
          </Link>
          {idea.furtherPlanning && (
            <Link
              href={`/ideas/${idea.id}/planning`}
              className="px-5 py-2.5 rounded-lg font-medium border border-teal-700 text-teal-400 hover:bg-teal-950 transition-colors text-sm"
            >
              Planung
            </Link>
          )}
          <DeleteButton id={idea.id} />
        </div>
      </div>
    </main>
  );
}
