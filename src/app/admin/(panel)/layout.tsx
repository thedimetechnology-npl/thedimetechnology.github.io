"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiFetch, clearToken } from "@/lib/api";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/posts", label: "Blog Posts" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/careers", label: "Careers" },
  { href: "/admin/courses", label: "Courses" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    apiFetch("/api/admin/me")
      .then((r) => {
        if (r.ok) setAuthed(true);
        else router.replace("/admin");
      })
      .catch(() => router.replace("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  const logout = async () => {
    await apiFetch("/api/admin/logout", { method: "POST" });
    clearToken();
    router.replace("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-[#9898b0] text-sm">
        Loading…
      </div>
    );
  }

  if (!authed) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <aside className="w-60 shrink-0 border-r border-white/5 bg-[#0d0d14] p-5 flex flex-col gap-1 sticky top-0 h-screen">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="w-8 h-8" />
          <div>
            <span className="block text-sm font-extrabold">The Dime</span>
            <span className="block text-[10px] text-[#5a5a72] uppercase tracking-wider">
              Admin Panel
            </span>
          </div>
        </Link>

        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname.startsWith(item.href)
                ? "bg-[#065cc2]/15 text-white border border-[#065cc2]/25"
                : "text-[#9898b0] hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {item.label}
          </Link>
        ))}

        <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-white/5">
          <Link
            href="/"
            className="px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#9898b0] hover:text-white hover:bg-white/5 transition-colors"
          >
            ← View Site
          </Link>
          <button
            onClick={logout}
            className="px-3.5 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 min-w-0">{children}</main>
    </div>
  );
}
