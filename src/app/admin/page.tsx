"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, saveToken } from "@/lib/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await apiFetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}) as { token?: string });
      if (data.token) saveToken(data.token);
      router.push("/admin/dashboard");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="w-10 h-10" />
          <div>
            <span className="block text-lg font-extrabold">The Dime Technology</span>
            <span className="block text-[10px] text-[#5a5a72] uppercase tracking-wider">
              Admin Panel
            </span>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-8"
        >
          <h1 className="text-xl font-extrabold mb-1">Sign in</h1>
          <p className="text-sm text-[#5a5a72] mb-6">
            Default credentials: <code className="text-[#2b7de0]">admin / admin123</code>
          </p>

          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
              {error}
            </div>
          )}

          <label className="block text-xs font-semibold text-[#9898b0] mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="w-full mb-4 px-4 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-sm text-white outline-none focus:border-[#065cc2] transition-colors"
          />

          <label className="block text-xs font-semibold text-[#9898b0] mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full mb-6 px-4 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-sm text-white outline-none focus:border-[#065cc2] transition-colors"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
            style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
