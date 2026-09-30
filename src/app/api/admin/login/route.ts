import { NextRequest, NextResponse } from "next/server";
import { buildSessionCookie, getCredentials } from "@/lib/admin-auth";
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    username?: string;
    password?: string;
  };
  const { username, password } = getCredentials();

  if (body.username !== username || body.password !== password) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", buildSessionCookie());
  return res;
}
