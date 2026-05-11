import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PlanningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idea = await prisma.idea.findUnique({ where: { id } });
  if (!idea) notFound();

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href={`/ideas/${id}`} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Zurück zur Idee
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mt-3">{idea.title}</h1>
          <p className="text-teal-400 font-medium mt-1">Weitere Planung</p>
        </div>

        {idea.furtherPlanning ? (
          <div className="bg-gray-900 border border-teal-800 rounded-xl p-6">
            <p className="text-gray-100 leading-relaxed whitespace-pre-wrap text-base">{idea.furtherPlanning}</p>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>Noch keine Planung eingetragen.</p>
            <Link href={`/ideas/${id}/edit`} className="text-indigo-400 hover:underline mt-2 inline-block">
              Jetzt hinzufügen →
            </Link>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <Link
            href={`/ideas/${id}`}
            className="px-5 py-2.5 rounded-lg font-medium border border-gray-700 hover:bg-gray-800 transition-colors text-sm"
          >
            ← Zur Idee
          </Link>
          <Link
            href={`/ideas/${id}/edit`}
            className="px-5 py-2.5 rounded-lg font-medium border border-indigo-700 text-indigo-400 hover:bg-indigo-950 transition-colors text-sm"
          >
            Bearbeiten
          </Link>
        </div>
      </div>
    </main>
  );
}
