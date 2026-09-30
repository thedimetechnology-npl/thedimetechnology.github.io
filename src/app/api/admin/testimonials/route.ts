import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import type { AdminTestimonial } from "@/lib/admin-types";
import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "admin", "testimonials.json");

async function readItems(): Promise<AdminTestimonial[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeItems(items: AdminTestimonial[]) {
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
    id: `t${Date.now()}`,
    name: body.name.slice(0, 100),
    location: String(body.location || ""),
    rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
    feedback: String(body.feedback || "").slice(0, 1000),
    image: String(body.image || ""),
    company: String(body.company || ""),
    designation: String(body.designation || ""),
  };

  items.unshift(item);
  await writeItems(items);
  return NextResponse.json(item, { status: 201 });
}
