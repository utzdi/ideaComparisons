import { prisma } from "@/lib/db";
import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string; docId: string }> }) {
  const { docId } = await params;

  const document = await prisma.document.findUnique({ where: { id: docId } });
  if (!document) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });

  await del(document.url);
  await prisma.document.delete({ where: { id: docId } });

  return NextResponse.json({ success: true });
}
