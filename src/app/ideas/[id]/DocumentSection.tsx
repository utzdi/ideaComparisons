"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Document {
  id: string;
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

export default function DocumentSection({ ideaId }: { ideaId: string }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadDocuments = useCallback(async () => {
    const res = await fetch(`/api/ideas/${ideaId}/documents`);
    const data = await res.json();
    setDocuments(data);
  }, [ideaId]);

  useEffect(() => { loadDocuments(); }, [loadDocuments]);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`/api/ideas/${ideaId}/documents`, { method: "POST", body: formData });
    await loadDocuments();
    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDelete = async (docId: string) => {
    if (!confirm("Dokument wirklich löschen?")) return;
    await fetch(`/api/ideas/${ideaId}/documents/${docId}`, { method: "DELETE" });
    setDocuments((d) => d.filter((doc) => doc.id !== docId));
  };

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Dokumente</h2>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragOver ? "border-indigo-500 bg-indigo-950/30" : "border-gray-700 hover:border-gray-500"
        }`}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />
        {uploading ? (
          <p className="text-gray-400 text-sm">Wird hochgeladen...</p>
        ) : (
          <>
            <p className="text-gray-400 text-sm">Datei hierher ziehen oder <span className="text-indigo-400">auswählen</span></p>
            <p className="text-gray-600 text-xs mt-1">PDF, Word, Excel, Bilder, ...</p>
          </>
        )}
      </div>

      {documents.length > 0 && (
        <ul className="mt-4 space-y-2">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
              <FileIcon />
              <div className="flex-1 min-w-0">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:text-indigo-400 transition-colors truncate block"
                >
                  {doc.name}
                </a>
                <p className="text-xs text-gray-600 mt-0.5">
                  {formatSize(doc.size)} · {new Date(doc.createdAt).toLocaleDateString("de-DE")}
                </p>
              </div>
              <button
                onClick={() => handleDelete(doc.id)}
                className="text-gray-600 hover:text-red-400 transition-colors text-xs shrink-0"
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
