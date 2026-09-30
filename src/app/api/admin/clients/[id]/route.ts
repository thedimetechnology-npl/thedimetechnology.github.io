import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import type { AdminClient } from "@/lib/admin-types";
import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "admin", "clients.json");

async function readItems(): Promise<AdminClient[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeItems(items: AdminClient[]) {
  await fs.writeFile(FILE, JSON.stringify(items, null, 2));
}

type Ctx = { params: Promise<{ id: string }> };
export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const items = await readItems();
  const index = items.findIndex((i) => i.id === id);
  if (index < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  items[index] = { ...items[index], ...body, id };
  await writeItems(items);
  return NextResponse.json(items[index]);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const items = await readItems();
  const next = items.filter((i) => i.id !== id);
  if (next.length === items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeItems(next);
  return NextResponse.json({ ok: true });
}
