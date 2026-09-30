import { cookies } from "next/headers";

export const ADMIN_COOKIE = "dime_admin";

export function getCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "",
    password: process.env.ADMIN_PASSWORD || "",
  };
}

export async function getSession() {
  const store = await cookies();
  const raw = store.get(ADMIN_COOKIE)?.value;
  if (!raw) return null;
  try {
    const data = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as {
      user?: string;
      exp?: number;
    };
    if (!data.user || !data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function isAuthed() {
  return (await getSession()) !== null;
}

export function buildSessionCookie(): string {
  const { username } = getCredentials();
  const payload = Buffer.from(
    JSON.stringify({ user: username, exp: Date.now() + 12 * 60 * 60 * 1000 })
  ).toString("base64url");
  return `${ADMIN_COOKIE}=${payload}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${12 * 60 * 60}`;
}
