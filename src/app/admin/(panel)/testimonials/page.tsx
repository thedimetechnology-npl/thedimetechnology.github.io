"use client";

import { apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";

type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  feedback: string;
  image: string;
  company: string;
  designation: string;
};

const emptyForm = {
  name: "",
  location: "",
  rating: 5,
  feedback: "",
  image: "",
  company: "",
  designation: "",
};

const inputClass =
  "w-full px-4 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-sm text-white outline-none focus:border-[#065cc2] transition-colors";
const labelClass = "block text-xs font-semibold text-[#9898b0] mb-1.5";

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | { mode: "create" } | { mode: "edit"; item: Testimonial }>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () =>
    apiFetch("/api/admin/testimonials")
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

  const openEdit = (item: Testimonial) => {
    setForm({ ...item });
    setModal({ mode: "edit", item });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    const res =
      modal?.mode === "edit"
        ? await apiFetch(`/api/admin/testimonials/${modal.item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await apiFetch("/api/admin/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

    if (res.ok) {
      setModal(null);
      setMessage("Testimonial saved.");
      load();
    } else {
      setMessage((await res.json().catch(() => ({}))).error || "Save failed");
    }
    setSaving(false);
  };

  const remove = async (item: Testimonial) => {
    if (!window.confirm(`Delete testimonial from "${item.name}"?`)) return;
    await apiFetch(`/api/admin/testimonials/${item.id}`, { method: "DELETE" });
    load();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Testimonials</h1>
          <p className="text-sm text-[#5a5a72] mt-1">{items.length} testimonials</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          + New Testimonial
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
          <p className="p-8 text-sm text-[#5a5a72]">No testimonials yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#5a5a72] uppercase tracking-wider border-b border-white/5">
                  <th className="px-5 py-3.5 font-semibold">Name</th>
                  <th className="px-5 py-3.5 font-semibold">Location</th>
                  <th className="px-5 py-3.5 font-semibold">Rating</th>
                  <th className="px-5 py-3.5 font-semibold">Company</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-medium">{item.name}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{item.location}</td>
                    <td className="px-5 py-3.5 text-[#fbbf24]">{"★".repeat(item.rating)}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{item.company || "—"}</td>
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
              {modal.mode === "create" ? "New Testimonial" : "Edit Testimonial"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Company</label>
                <input
                  className={inputClass}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Designation</label>
                <input
                  className={inputClass}
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Rating (1–5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className={inputClass}
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input
                  className={inputClass}
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/assets/testimonials/…"
                />
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Feedback</label>
                <textarea
                  className={`${inputClass} min-h-[100px] resize-y`}
                  value={form.feedback}
                  onChange={(e) => setForm({ ...form, feedback: e.target.value })}
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
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
