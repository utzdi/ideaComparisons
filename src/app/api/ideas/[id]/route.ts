import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idea = await prisma.idea.findUnique({ where: { id } });
  if (!idea) return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  return NextResponse.json(idea);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { title, problem, solution, audience, revenue, resources, risks, notes } = body;

  if (!title || !problem || !solution || !audience) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  const idea = await prisma.idea.update({
    where: { id },
    data: { title, problem, solution, audience, revenue: revenue ?? "", resources: resources ?? "", risks: risks ?? "", notes: notes ?? "" },
  });
  return NextResponse.json(idea);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.idea.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
