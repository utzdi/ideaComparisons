import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const ideas = await prisma.idea.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      problem: true,
      audience: true,
      createdAt: true,
    },
  });
  return NextResponse.json(ideas);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, problem, solution, audience, revenue, resources, risks, notes } = body;

  if (!title || !problem || !solution || !audience) {
    return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
  }

  const idea = await prisma.idea.create({
    data: { title, problem, solution, audience, revenue: revenue ?? "", resources: resources ?? "", risks: risks ?? "", notes: notes ?? "" },
  });

  return NextResponse.json(idea, { status: 201 });
}
