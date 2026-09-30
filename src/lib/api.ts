export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

const TOKEN_KEY = "dime_token";

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function saveToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // storage unavailable
  }
}

export function clearToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage unavailable
  }
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers);
  const token = readToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(API_BASE + path, { ...init, headers });
}
