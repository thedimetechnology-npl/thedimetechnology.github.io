"use client";

import { useState } from "react";
import { services } from "@/data/services";

const INQUIRY_ENDPOINT = "https://formspree.io/f/mgavdrrz";

export default function ProductInquiry() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  const toggle = (title: string) =>
    setSelected((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fields = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (fields._gotcha) {
      form.reset();
      setSelected([]);
      setStatus({ ok: true, text: "Thank you! Your inquiry has been sent." });
      setTimeout(() => setStatus(null), 6000);
      return;
    }

    if (selected.length === 0) {
      setStatus({ ok: false, text: "Please select at least one product from the list." });
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          products: selected.join(", "),
          _subject: "New Product Inquiry — The Dime Technology",
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        errors?: { message: string }[];
        message?: string;
      } | null;
      if (res.ok) {
        setStatus({
          ok: true,
          text: "Thank you! Your inquiry has been sent. We will get back to you soon.",
        });
        form.reset();
        setSelected([]);
        setTimeout(() => setStatus(null), 6000);
      } else {
        setStatus({
          ok: false,
          text:
            data?.errors?.map((err) => err.message).join(", ") ||
            (typeof data?.message === "string"
              ? data.message
              : "Something went wrong. Please try again."),
        });
      }
    } catch {
      setStatus({ ok: false, text: "Network error. Please try again." });
    }
    setSending(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-8"
    >
      <input
        type="text"
        name="_gotcha"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="flex items-center justify-between mb-4">
        <label className="text-xs font-semibold text-[#9898b0]">
          1. Select from the product list <span className="text-[#5a5a72]">(choose one or more)</span>
        </label>
        {selected.length > 0 && (
          <span className="text-xs font-semibold" style={{ color: "#2b7de0" }}>
            {selected.length} selected
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
        {services.map((service) => {
          const on = selected.includes(service.title);
          return (
            <button
              type="button"
              key={service.title}
              onClick={() => toggle(service.title)}
              aria-pressed={on}
              className="relative text-left rounded-xl p-4 border transition-all duration-300 cursor-pointer"
              style={{
                background: on ? "rgba(6, 92, 194, 0.12)" : "#0a0a0f",
                borderColor: on ? "rgba(6, 92, 194, 0.6)" : "rgba(255, 255, 255, 0.05)",
              }}
            >
              <div className="flex gap-3 items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.icon} alt={service.title} className="w-8 h-8 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-bold mb-1 pr-6">{service.title}</p>
                  <p className="text-[#9898b0] text-xs leading-relaxed">{service.desc}</p>
                </div>
              </div>
              <span
                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                style={{
                  background: on ? "linear-gradient(135deg, #065cc2, #2b7de0)" : "transparent",
                  border: on ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                }}
                aria-hidden="true"
              >
                {on ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>

      <label className="block text-xs font-semibold text-[#9898b0] mb-4">
        2. Enter your email so we can reach you
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <input
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors"
        />
        <input
          name="name"
          placeholder="Your name (optional)"
          className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors"
        />
      </div>
      <div className="mb-5">
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your project (optional)..."
          className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors resize-y"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Sending…" : "Send Inquiry"}
      </button>
      {status && (
        <p
          className={`mt-3 text-sm font-semibold ${
            status.ok ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {status.text}
        </p>
      )}
    </form>
  );
}
