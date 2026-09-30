import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import type { AdminTeamMember } from "@/lib/admin-types";
import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "admin", "team.json");

async function readItems(): Promise<AdminTeamMember[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeItems(items: AdminTeamMember[]) {
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
  if (!body?.name || typeof body.name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const items = await readItems();
  const item = {
    id: `m${Date.now()}`,
    name: body.name.slice(0, 100),
    role: String(body.role || ""),
    experience: String(body.experience || ""),
    tech: Array.isArray(body.tech) ? body.tech.map(String).slice(0, 10) : [],
    photo: String(body.photo || ""),
    category: String(body.category || "software"),
    founder: Boolean(body.founder),
  };

  items.unshift(item);
  await writeItems(items);
  return NextResponse.json(item, { status: 201 });
}
