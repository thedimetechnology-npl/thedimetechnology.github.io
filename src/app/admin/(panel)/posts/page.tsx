"use client";

import { API_BASE, apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";

type Section = { heading: string; paragraphs: string[] };
type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  sections: Section[];
};

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: "3 min read",
  category: "General",
  tags: "",
  content: "",
};

function parseContent(content: string): Section[] {
  const sections: Section[] = [];
  let current: Section = { heading: "", paragraphs: [] };
  let buffer: string[] = [];

  const flushParagraph = () => {
    if (buffer.length) {
      current.paragraphs.push(buffer.join(" "));
      buffer = [];
    }
  };
  const flushSection = () => {
    flushParagraph();
    if (current.heading || current.paragraphs.length) sections.push(current);
  };

  for (const line of content.split("\n")) {
    const t = line.trim();
    if (t.startsWith("## ")) {
      flushSection();
      current = { heading: t.slice(3).trim(), paragraphs: [] };
    } else if (t === "") {
      flushParagraph();
    } else {
      buffer.push(t);
    }
  }
  flushSection();
  return sections;
}

function serializeContent(sections: Section[]): string {
  return sections
    .map((s) => `## ${s.heading}\n${s.paragraphs.join("\n\n")}`)
    .join("\n\n");
}

const inputClass =
  "w-full px-4 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-sm text-white outline-none focus:border-[#065cc2] transition-colors";
const labelClass = "block text-xs font-semibold text-[#9898b0] mb-1.5";

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | { mode: "create" } | { mode: "edit"; post: Post }>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [syncing, setSyncing] = useState(false);

  const load = () =>
    apiFetch("/api/admin/posts")
      .then((r) => (r.ok ? r.json() : []))
      .then(setPosts)
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setModal({ mode: "create" });
  };

  const openEdit = (post: Post) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      category: post.category,
      tags: post.tags.join(", "),
      content: serializeContent(post.sections),
    });
    setModal({ mode: "edit", post });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      sections: parseContent(form.content),
    };
    const res =
      modal?.mode === "edit"
        ? await apiFetch(`/api/admin/posts/${modal.post.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await apiFetch("/api/admin/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

    if (res.ok) {
      setModal(null);
      setMessage("Post saved.");
      load();
    } else {
      setMessage((await res.json().catch(() => ({}))).error || "Save failed");
    }
    setSaving(false);
  };

  const remove = async (post: Post) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    await apiFetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    load();
  };

  const sync = async () => {
    setSyncing(true);
    setMessage("");
    const res = await apiFetch("/api/admin/sync", { method: "POST" });
    setSyncing(false);
    setMessage(res.ok ? "Blog pages regenerated." : "Sync failed");
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-[#5a5a72] mt-1">{posts.length} posts</p>
        </div>
        <div className="flex gap-3">
          {!API_BASE && (
            <button
              onClick={sync}
              disabled={syncing}
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-[#065cc2]/40 text-[#2b7de0] hover:bg-[#065cc2]/10 transition-all disabled:opacity-50"
            >
              {syncing ? "Syncing…" : "Sync Blog Pages"}
            </button>
          )}
          <button
            onClick={openCreate}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
          >
            + New Post
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[#065cc2]/10 border border-[#065cc2]/25 text-[#2b7de0] text-sm">
          {message}
        </div>
      )}

      <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="p-8 text-sm text-[#5a5a72]">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="p-8 text-sm text-[#5a5a72]">No posts yet. Create your first one.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#5a5a72] uppercase tracking-wider border-b border-white/5">
                  <th className="px-5 py-3.5 font-semibold">Title</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Date</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-medium max-w-[320px] truncate">{post.title}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{post.category}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{post.date}</td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(post)}
                        className="text-[#2b7de0] hover:text-white font-medium mr-4 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(post)}
                        className="text-red-400 hover:text-red-300 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#12121c] border border-white/10 rounded-2xl p-7">
            <h2 className="text-lg font-extrabold mb-5">
              {modal.mode === "create" ? "New Post" : "Edit Post"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <label className={labelClass}>Title</label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className={labelClass}>Slug</label>
                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-generated"
                />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <input
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Read Time</label>
                <input
                  className={inputClass}
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Tags (comma separated)</label>
                <input
                  className={inputClass}
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Flutter, Mobile App, India"
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Excerpt</label>
                <textarea
                  className={`${inputClass} min-h-[70px] resize-y`}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Short summary shown on cards and search results"
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>
                  Content — use{" "}
                  <code className="text-[#2b7de0]">## Heading</code> for section headings, blank
                  line between paragraphs
                </label>
                <textarea
                  className={`${inputClass} min-h-[220px] resize-y font-mono text-[13px]`}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder={"## Project Overview\nParagraph text here.\n\n## What We Did\nMore text."}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModal(null)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/10 text-[#9898b0] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
              >
                {saving ? "Saving…" : "Save Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
