import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import type { AdminCourse } from "@/lib/admin-types";

const FILE = path.join(process.cwd(), "data", "admin", "courses.json");

export async function GET() {
  try {
    const items = JSON.parse(await fs.readFile(FILE, "utf8")) as AdminCourse[];
    return NextResponse.json(items.filter((i) => i.active !== false));
  } catch {
    return NextResponse.json([]);
  }
}
