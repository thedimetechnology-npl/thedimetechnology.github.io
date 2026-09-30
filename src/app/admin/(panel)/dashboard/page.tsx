"use client";

import { API_BASE, apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = { id: string; title: string; date: string; category: string };

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ posts: 0, testimonials: 0, clients: 0, team: 0, careers: 0, courses: 0 });
  const [recent, setRecent] = useState<Post[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all(
      [
        "/api/admin/posts",
        "/api/admin/testimonials",
        "/api/admin/clients",
        "/api/admin/team",
        "/api/admin/careers",
        "/api/admin/courses",
      ].map((url) => apiFetch(url).then((r) => (r.ok ? r.json() : [])))
    )
      .then(([posts, testimonials, clients, team, careers, courses]) => {
        setCounts({
          posts: posts.length,
          testimonials: testimonials.length,
          clients: clients.length,
          team: team.length,
          careers: careers.length,
          courses: courses.length,
        });
        setRecent(posts.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  const sync = async () => {
    setSyncing(true);
    setMessage("");
    const res = await apiFetch("/api/admin/sync", { method: "POST" });
    setSyncing(false);
    setMessage(res.ok ? `Blog regenerated with ${(await res.json()).count} posts.` : "Sync failed");
  };

  const stats = [
    { label: "Blog Posts", value: counts.posts, href: "/admin/posts" },
    { label: "Testimonials", value: counts.testimonials, href: "/admin/testimonials" },
    { label: "Clients", value: counts.clients, href: "/admin/clients" },
    { label: "Team Members", value: counts.team, href: "/admin/team" },
    { label: "Job Openings", value: counts.careers, href: "/admin/careers" },
    { label: "Courses", value: counts.courses, href: "/admin/courses" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#5a5a72] mt-1">Manage your site content</p>
        </div>
        {!API_BASE && (
          <button
            onClick={sync}
            disabled={syncing}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
            style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
          >
            {syncing ? "Syncing…" : "Sync Blog Pages"}
          </button>
        )}
      </div>

      {message && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-[#065cc2]/10 border border-[#065cc2]/25 text-[#2b7de0] text-sm">
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-[#065cc2]/30"
          >
            <span className="block text-3xl font-extrabold gradient-text">{stat.value}</span>
            <span className="block text-xs text-[#5a5a72] mt-1.5 font-medium">{stat.label}</span>
          </Link>
        ))}
      </div>

      <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6">
        <h2 className="text-sm font-bold mb-4">Recent Posts</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-[#5a5a72]">No posts yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-white/5">
            {recent.map((post) => (
              <Link
                key={post.id}
                href="/admin/posts"
                className="flex items-center justify-between py-3 group"
              >
                <span className="text-sm font-medium group-hover:text-[#2b7de0] transition-colors truncate mr-4">
                  {post.title}
                </span>
                <span className="text-xs text-[#5a5a72] shrink-0">{post.date}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
