import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import type { AdminPost } from "@/lib/admin-types";
import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "admin", "posts.json");

async function readPosts(): Promise<AdminPost[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writePosts(posts: AdminPost[]) {
  await fs.writeFile(FILE, JSON.stringify(posts, null, 2));
}

type Ctx = { params: Promise<{ id: string }> };
export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const posts = await readPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  posts[index] = { ...posts[index], ...body, id };
  await writePosts(posts);
  return NextResponse.json(posts[index]);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const posts = await readPosts();
  const next = posts.filter((p) => p.id !== id);
  if (next.length === posts.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writePosts(next);
  return NextResponse.json({ ok: true });
}
