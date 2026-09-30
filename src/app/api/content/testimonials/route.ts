import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "admin", "testimonials.json");
export async function GET() {
  try {
    return NextResponse.json(JSON.parse(await fs.readFile(FILE, "utf8")));
  } catch {
    return NextResponse.json([]);
  }
}
