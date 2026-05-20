import DachdeckerClient from "./DachdeckerClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dachdecker-Verzeichnis Bonn & Rhein-Sieg",
  description: "Die besten Dachdecker- und Meisterbetriebe im Großraum Bonn und Umgebung. Suchen und filtern Sie 50+ verifizierte Betriebe.",
};

export default function DachdeckerPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10 flex flex-col justify-start">
      <DachdeckerClient />
    </main>
  );
}
