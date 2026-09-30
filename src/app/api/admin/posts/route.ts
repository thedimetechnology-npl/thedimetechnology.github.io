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
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readPosts());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body?.title || typeof body.title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const posts = await readPosts();
  const slug =
    (typeof body.slug === "string" && body.slug.trim()) ||
    body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);

  const post = {
    id: slug,
    slug,
    title: body.title.slice(0, 200),
    excerpt: String(body.excerpt || "").slice(0, 500),
    date: String(body.date || new Date().toISOString().slice(0, 10)),
    readTime: String(body.readTime || "3 min read"),
    category: String(body.category || "General"),
    tags: Array.isArray(body.tags) ? body.tags.map(String).slice(0, 20) : [],
    sections: Array.isArray(body.sections) ? body.sections : [],
  };

  posts.unshift(post);
  await writePosts(posts);
  return NextResponse.json(post, { status: 201 });
}
