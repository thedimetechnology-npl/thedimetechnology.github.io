import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import type { AdminCourse } from "@/lib/admin-types";
import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "admin", "courses.json");

async function readItems(): Promise<AdminCourse[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeItems(items: AdminCourse[]) {
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
  const item: AdminCourse = {
    id: `crs${Date.now()}`,
    title: body.title.slice(0, 150),
    category: String(body.category || "").slice(0, 80),
    level: String(body.level || "Beginner").slice(0, 50),
    duration: String(body.duration || "").slice(0, 50),
    mode: String(body.mode || "Online").slice(0, 50),
    price: String(body.price || "").slice(0, 50),
    description: String(body.description || "").slice(0, 2000),
    topics: Array.isArray(body.topics)
      ? body.topics.map((t) => String(t).slice(0, 200)).slice(0, 30)
      : [],
    enrollUrl: String(body.enrollUrl || ""),
    active: body.active !== false,
  };

  items.unshift(item);
  await writeItems(items);
  return NextResponse.json(item, { status: 201 });
}
