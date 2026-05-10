"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Idee wirklich löschen?")) return;
    await fetch(`/api/ideas/${id}`, { method: "DELETE" });
    router.push("/");
  };

  return (
    <button
      onClick={handleDelete}
      className="px-5 py-2.5 rounded-lg font-medium border border-red-800 text-red-400 hover:bg-red-950 transition-colors text-sm"
    >
      Löschen
    </button>
  );
}
