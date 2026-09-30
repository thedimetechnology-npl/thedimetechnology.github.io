"use client";

import { apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";

type Member = {
  id: string;
  name: string;
  role: string;
  experience: string;
  tech: string[];
  photo: string;
  category: string;
  founder: boolean;
};

const emptyForm = {
  name: "",
  role: "",
  experience: "",
  tech: "",
  photo: "",
  category: "software",
  founder: false,
};

const inputClass =
  "w-full px-4 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-sm text-white outline-none focus:border-[#065cc2] transition-colors";
const labelClass = "block text-xs font-semibold text-[#9898b0] mb-1.5";

export default function AdminTeam() {
  const [items, setItems] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | { mode: "create" } | { mode: "edit"; item: Member }>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () =>
    apiFetch("/api/admin/team")
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

  const openEdit = (item: Member) => {
    setForm({
      name: item.name,
      role: item.role,
      experience: item.experience,
      tech: item.tech.join(", "),
      photo: item.photo,
      category: item.category,
      founder: item.founder,
    });
    setModal({ mode: "edit", item });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    const payload = {
      ...form,
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res =
      modal?.mode === "edit"
        ? await apiFetch(`/api/admin/team/${modal.item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await apiFetch("/api/admin/team", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

    if (res.ok) {
      setModal(null);
      setMessage("Team member saved.");
      load();
    } else {
      setMessage((await res.json().catch(() => ({}))).error || "Save failed");
    }
    setSaving(false);
  };

  const remove = async (item: Member) => {
    if (!window.confirm(`Remove "${item.name}" from the team?`)) return;
    await apiFetch(`/api/admin/team/${item.id}`, { method: "DELETE" });
    load();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Team</h1>
          <p className="text-sm text-[#5a5a72] mt-1">{items.length} members</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          + New Member
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
          <p className="p-8 text-sm text-[#5a5a72]">No team members yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#5a5a72] uppercase tracking-wider border-b border-white/5">
                  <th className="px-5 py-3.5 font-semibold">Photo</th>
                  <th className="px-5 py-3.5 font-semibold">Name</th>
                  <th className="px-5 py-3.5 font-semibold">Role</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3">
                      {item.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-9 h-9 rounded-full object-cover"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      ) : (
                        <span className="text-[#5a5a72]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-medium">
                      {item.name}
                      {item.founder && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-[#2b7de0]">
                          Founder
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{item.role}</td>
                    <td className="px-5 py-3.5 text-[#9898b0]">{item.category}</td>
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
              {modal.mode === "create" ? "New Team Member" : "Edit Team Member"}
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
                <label className={labelClass}>Role</label>
                <input
                  className={inputClass}
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Experience</label>
                <input
                  className={inputClass}
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  placeholder="5+ Years experience"
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="software">Software</option>
                  <option value="mobile">Mobile</option>
                  <option value="security">Security</option>
                  <option value="web">Web</option>
                  <option value="founder">Leadership</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Photo URL</label>
                <input
                  className={inputClass}
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                  placeholder="/assets/team/example.jpg"
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2.5 text-sm text-[#9898b0] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.founder}
                    onChange={(e) => setForm({ ...form, founder: e.target.checked })}
                    className="w-4 h-4 accent-[#065cc2]"
                  />
                  Founder (shows social links)
                </label>
              </div>
              <div className="col-span-2">
                <label className={labelClass}>Tech (comma separated)</label>
                <input
                  className={inputClass}
                  value={form.tech}
                  onChange={(e) => setForm({ ...form, tech: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
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
