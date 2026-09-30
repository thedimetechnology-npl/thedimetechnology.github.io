import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import type { AdminPost } from "@/lib/admin-types";
import fs from "node:fs/promises";
import path from "node:path";

const POSTS_FILE = path.join(process.cwd(), "data", "admin", "posts.json");
const BLOG_FILE = path.join(process.cwd(), "src", "data", "posts.ts");
export async function POST() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts: AdminPost[] = JSON.parse(await fs.readFile(POSTS_FILE, "utf8"));

  const file = `// Synced from the admin panel — do not edit directly.
export type PostSection = {
  heading: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url?: string;
  image?: string;
  sections: PostSection[];
};

export const posts: Post[] = ${JSON.stringify(
    posts,
    (key, value) => (key === "id" ? undefined : value),
    2
  )};

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
`;

  await fs.writeFile(BLOG_FILE, file, "utf8");
  return NextResponse.json({ ok: true, count: posts.length });
}
