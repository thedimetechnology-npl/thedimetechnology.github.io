"use client";

import { apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";
import type { AdminCourse } from "@/lib/admin-types";

const emptyForm = {
  title: "",
  category: "",
  level: "Beginner",
  duration: "",
  mode: "Online",
  price: "",
  description: "",
  topics: "",
  enrollUrl: "",
  active: true,
};

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const MODES = ["Online", "In-person", "Self-paced"];

const inputClass =
  "w-full px-4 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-sm text-white outline-none focus:border-[#065cc2] transition-colors";
const labelClass = "block text-xs font-semibold text-[#9898b0] mb-1.5";

export default function AdminCourses() {
  const [items, setItems] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | { mode: "create" } | { mode: "edit"; item: AdminCourse }>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () =>
    apiFetch("/api/admin/courses")
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setModal({ mode: "create" });
  };

  const openEdit = (item: AdminCourse) => {
    setForm({ ...item, topics: item.topics.join("\n") });
    setModal({ mode: "edit", item });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    const payload = {
      ...form,
      topics: form.topics
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const res =
      modal?.mode === "edit"
        ? await apiFetch(`/api/admin/courses/${modal.item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await apiFetch("/api/admin/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

    if (res.ok) {
      setModal(null);
      setMessage("Course saved.");
      load();
    } else {
      setMessage((await res.json().catch(() => ({}))).error || "Save failed");
    }
    setSaving(false);
  };

  const remove = async (item: AdminCourse) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await apiFetch(`/api/admin/courses/${item.id}`, { method: "DELETE" });
    load();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Courses</h1>
          <p className="text-sm text-[#5a5a72] mt-1">{items.length} courses</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          + New Course
        </button>
      </div>

      {message && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-[#065cc2]/10 border border-[#065cc2]/25 text-[#2b7de0] text-sm">
          {message}
        </div>
      )}

      <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="p-8 text-sm text-[#5a5a72]">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-sm text-[#5a5a72]">No courses yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#5a5a72] uppercase tracking-wider border-b border-white/5">
                  <th className="px-5 py-3.5 font-semibold">Title</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Level</th>
                  <th className="px-5 py-3.5 font-semibold">Duration</th>
                  <th className="px-5 py-3.5 font-semibold">Price</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-medium">{item.title}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{item.category || "—"}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{item.level}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{item.duration || "—"}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{item.price || "—"}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.active !== false
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                            : "bg-white/5 text-[#5a5a72] border border-white/10"
                        }`}
                      >
                        {item.active !== false ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(item)}
                        className="text-[#2b7de0] hover:text-white font-medium mr-4 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(item)}
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
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#12121c] border border-white/10 rounded-2xl p-7">
            <h2 className="text-lg font-extrabold mb-5">
              {modal.mode === "create" ? "New Course" : "Edit Course"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <label className={labelClass}>Course Title *</label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Full-Stack Web Development"
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <input
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Web Development"
                />
              </div>
              <div>
                <label className={labelClass}>Level</label>
                <select
                  className={inputClass}
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Duration</label>
                <input
                  className={inputClass}
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  placeholder="12 weeks"
                />
              </div>
              <div>
                <label className={labelClass}>Mode</label>
                <select
                  className={inputClass}
                  value={form.mode}
                  onChange={(e) => setForm({ ...form, mode: e.target.value })}
                >
                  {MODES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Price</label>
                <input
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Free or NPR 4,999"
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  className={`${inputClass} min-h-[80px] resize-y`}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Topics (one per line)</label>
                <textarea
                  className={`${inputClass} min-h-[100px] resize-y`}
                  value={form.topics}
                  onChange={(e) => setForm({ ...form, topics: e.target.value })}
                  placeholder={"React and Next.js\nREST APIs with Node.js\nDeployment and hosting"}
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Enroll URL</label>
                <input
                  className={inputClass}
                  value={form.enrollUrl}
                  onChange={(e) => setForm({ ...form, enrollUrl: e.target.value })}
                  placeholder="https://… (leave empty to link to the contact form)"
                />
              </div>
              <label className="col-span-2 flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 accent-[#065cc2]"
                />
                <span className="text-sm text-[#9898b0]">Visible on the website</span>
              </label>
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
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
