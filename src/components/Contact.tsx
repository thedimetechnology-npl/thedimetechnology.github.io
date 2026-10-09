"use client";

import { useEffect, useRef, useState } from "react";

const CONTACT_ENDPOINT = "https://formspree.io/f/mnpjakwb";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const fields = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (fields._gotcha) {
      form.reset();
      setStatus({ ok: true, text: "Thank you! Your message has been sent." });
      setTimeout(() => setStatus(null), 6000);
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          _subject: "New Contact Message — The Dime Technology",
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        errors?: { message: string }[];
        message?: string;
      } | null;
      if (res.ok) {
        const name = fields.name || "";
        setStatus({
          ok: true,
          text: `Thank you, ${name}! Your message has been sent. We will get back to you soon.`,
        });
        form.reset();
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
    <section id="contact" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
          >
            Get In Touch
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Ask Us Anything</h2>
          <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
            Are you a company or brand seeking tech services? An agency looking to scale? Let&apos;s
            connect.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-14 ${
            visible ? "animate-fade-in-up" : ""
          }`}
        >
          <div className="flex flex-col gap-7">
            {[
              { icon: "https://cdn-icons-png.flaticon.com/128/14025/14025691.png", label: "Location", value: "Imadol, Lalitpur, Nepal" },
              { icon: "https://cdn-icons-png.flaticon.com/128/724/724664.png", label: "Phone", value: "+977 9801024024, +977 9851212025" },
              { icon: "https://cdn-icons-png.flaticon.com/128/9068/9068642.png", label: "Email", value: "info@thedimetechnology.com.np" },
              { icon: "https://cdn-icons-png.flaticon.com/128/1827/1827336.png", label: "Working Hours", value: "Sun - Sat: 9AM - 9PM" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt={item.label} className="w-5 h-5 mt-0.5" />
                <div>
                  <strong className="block text-sm mb-1">{item.label}</strong>
                  <p className="text-[#9898b0] text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

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
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-semibold text-[#9898b0] mb-2">
                  Full Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#9898b0] mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#9898b0] mb-2">
                Organization
              </label>
              <input
                name="organization"
                placeholder="Your company"
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-semibold text-[#9898b0] mb-2">Country</label>
                <select
                  name="country"
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Nepal">🇳🇵 Nepal</option>
                  <option value="India">🇮🇳 India</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="USA">🇺🇸 United States</option>
                  <option value="Australia">🇦🇺 Australia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#9898b0] mb-2">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+977..."
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#9898b0] mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white focus:border-[#065cc2] focus:outline-none transition-colors resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="btn-primary btn-glow w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Sending…" : "Send Message"}
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
        </div>
      </div>
    </section>
  );
}
