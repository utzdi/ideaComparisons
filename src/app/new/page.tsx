"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const fields = [
  { name: "title", label: "Titel", placeholder: "Name der Idee", required: true, type: "input" },
  { name: "problem", label: "Problem", placeholder: "Welches Problem löst diese Idee?", required: true, type: "textarea" },
  { name: "solution", label: "Lösung", placeholder: "Wie wird das Problem gelöst?", required: true, type: "textarea" },
  { name: "audience", label: "Zielgruppe", placeholder: "Wer ist die Zielgruppe?", required: true, type: "input" },
  { name: "revenue", label: "Geschäftsmodell", placeholder: "Wie wird Geld verdient?", required: false, type: "textarea" },
  { name: "resources", label: "Benötigte Ressourcen", placeholder: "Was wird gebraucht? (Zeit, Geld, Skills...)", required: false, type: "textarea" },
  { name: "risks", label: "Risiken", placeholder: "Mögliche Risiken oder Herausforderungen", required: false, type: "textarea" },
  { name: "notes", label: "Notizen", placeholder: "Weitere Gedanken...", required: false, type: "textarea" },
  { name: "furtherPlanning", label: "Weitere Planung", placeholder: "Nächste Schritte, Meilensteine, offene Fragen...", required: false, type: "textarea" },
] as const;

type FieldName = typeof fields[number]["name"];

export default function NewIdeaPage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<FieldName, string>>({
    title: "", problem: "", solution: "", audience: "",
    revenue: "", resources: "", risks: "", notes: "", furtherPlanning: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Fehler beim Speichern");
      }
      const idea = await res.json();
      router.push(`/ideas/${idea.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Zurück zur Übersicht
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mt-3">Neue Idee</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                {field.label}
                {field.required && <span className="text-indigo-400 ml-1">*</span>}
              </label>
              {field.type === "input" ? (
                <input
                  type="text"
                  value={form[field.name]}
                  onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              ) : (
                <textarea
                  value={form[field.name]}
                  onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              )}
            </div>
          ))}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-6 py-2.5 rounded-lg font-medium"
            >
              {loading ? "Wird gespeichert..." : "Idee speichern"}
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-lg font-medium border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              Abbrechen
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
