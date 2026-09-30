import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import type { AdminCareer } from "@/lib/admin-types";
import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "admin", "careers.json");

async function readItems(): Promise<AdminCareer[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeItems(items: AdminCareer[]) {
  await fs.writeFile(FILE, JSON.stringify(items, null, 2));
}
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readItems());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body?.title || typeof body.title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const items = await readItems();
  const item: AdminCareer = {
    id: `car${Date.now()}`,
    title: body.title.slice(0, 150),
    department: String(body.department || "").slice(0, 80),
    location: String(body.location || "").slice(0, 100),
    type: String(body.type || "Full-time").slice(0, 50),
    experience: String(body.experience || "").slice(0, 50),
    description: String(body.description || "").slice(0, 2000),
    requirements: Array.isArray(body.requirements)
      ? body.requirements.map((r) => String(r).slice(0, 200)).slice(0, 20)
      : [],
    applyUrl: String(body.applyUrl || ""),
    active: body.active !== false,
  };

  items.unshift(item);
  await writeItems(items);
  return NextResponse.json(item, { status: 201 });
}
