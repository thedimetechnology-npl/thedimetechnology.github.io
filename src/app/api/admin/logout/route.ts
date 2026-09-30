import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-auth";
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
  return res;
}
