import { NextResponse } from "next/server";
import { getSession, isAuthed } from "@/lib/admin-auth";
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const session = await getSession();
  return NextResponse.json({ user: session?.user });
}
