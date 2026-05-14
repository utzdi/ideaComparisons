import { prisma } from "@/lib/db";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const documents = await prisma.document.findMany({
    where: { ideaId: id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(documents);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "Keine Datei" }, { status: 400 });

  const blob = await put(`ideas/${id}/${file.name}`, file, { access: "public" });

  const document = await prisma.document.create({
    data: {
      ideaId: id,
      name: file.name,
      url: blob.url,
      size: file.size,
    },
  });

  return NextResponse.json(document, { status: 201 });
}
