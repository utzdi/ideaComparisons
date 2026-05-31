import ArchitekturClient from "./ArchitekturClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architektur-Verzeichnis Bonn & Rhein-Sieg – LeadBase",
  description:
    "50 Architekturbüros und Planungsbüros im Großraum Bonn und Rhein-Sieg-Kreis. Suchen und filtern Sie qualifizierte Architekten.",
};

export default function ArchitekturPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10 flex flex-col justify-start">
      <ArchitekturClient />
    </main>
  );
}
