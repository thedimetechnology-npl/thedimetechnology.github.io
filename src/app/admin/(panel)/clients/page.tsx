"use client";

import { apiFetch } from "@/lib/api";

import { useEffect, useState } from "react";

type Client = { id: string; name: string; logo: string };

const inputClass =
  "w-full px-4 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-sm text-white outline-none focus:border-[#065cc2] transition-colors";
const labelClass = "block text-xs font-semibold text-[#9898b0] mb-1.5";

export default function AdminClients() {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | { mode: "create" } | { mode: "edit"; item: Client }>(null);
  const [form, setForm] = useState({ name: "", logo: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () =>
    apiFetch("/api/admin/clients")
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm({ name: "", logo: "" });
    setModal({ mode: "create" });
  };

  const openEdit = (item: Client) => {
    setForm({ name: item.name, logo: item.logo });
    setModal({ mode: "edit", item });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    const res =
      modal?.mode === "edit"
        ? await apiFetch(`/api/admin/clients/${modal.item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await apiFetch("/api/admin/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

    if (res.ok) {
      setModal(null);
      setMessage("Client saved.");
      load();
    } else {
      setMessage((await res.json().catch(() => ({}))).error || "Save failed");
    }
    setSaving(false);
  };

  const remove = async (item: Client) => {
    if (!window.confirm(`Remove client "${item.name}"?`)) return;
    await apiFetch(`/api/admin/clients/${item.id}`, { method: "DELETE" });
    load();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Clients</h1>
          <p className="text-sm text-[#5a5a72] mt-1">{items.length} clients</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          + New Client
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
          <p className="p-8 text-sm text-[#5a5a72]">No clients yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#5a5a72] uppercase tracking-wider border-b border-white/5">
                  <th className="px-5 py-3.5 font-semibold">Logo</th>
                  <th className="px-5 py-3.5 font-semibold">Name</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3">
                      {item.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="h-8 w-16 object-contain rounded bg-white/5 px-1"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      ) : (
                        <span className="text-[#5a5a72]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-medium">{item.name}</td>
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
          <div className="w-full max-w-md bg-[#12121c] border border-white/10 rounded-2xl p-7">
            <h2 className="text-lg font-extrabold mb-5">
              {modal.mode === "create" ? "New Client" : "Edit Client"}
            </h2>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Logo URL</label>
                <input
                  className={inputClass}
                  value={form.logo}
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  placeholder="/assets/clients/example.jpg"
                />
              </div>
              {form.logo && (
                <div className="flex justify-center py-3 bg-white/5 rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.logo}
                    alt="preview"
                    className="h-10 object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}
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
