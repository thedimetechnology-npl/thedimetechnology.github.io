"use client";

import { useMemo, useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/mnpjakwb";

const CAPABILITIES = [
  "Custom Software",
  "Web Development",
  "Mobile Apps",
  "AI & Automation",
  "Odoo / ERP",
  "DevOps & Cloud",
  "IT Outsourcing",
  "UI/UX Design",
  "Other",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not Sure",
];

const TIMELINES = [
  "Immediately",
  "Within 2 Weeks",
  "Within 1 Month",
  "1–3 Months",
  "Flexible",
];

const TIME_SLOTS = [
  "9AM", "10AM", "11AM", "12PM",
  "1PM", "2PM", "3PM", "4PM", "5PM",
  "6PM", "7PM", "8PM", "9PM",
];

const STEPS = ["Select Date", "Project Details", "Your Information", "Confirmation"];

type Form = {
  date: string;
  dateLabel: string;
  time: string;
  capability: string;
  budget: string;
  timeline: string;
  brief: string;
  name: string;
  email: string;
  company: string;
  role: string;
  nda: boolean;
};

const EMPTY: Form = {
  date: "",
  dateLabel: "",
  time: "",
  capability: "",
  budget: "",
  timeline: "",
  brief: "",
  name: "",
  email: "",
  company: "",
  role: "",
  nda: false,
};

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
      style={{
        background: active ? "linear-gradient(135deg, #065cc2, #2b7de0)" : "rgba(6, 92, 194, 0.1)",
        color: active ? "#ffffff" : "#2b7de0",
        border: `1px solid ${active ? "#2b7de0" : "rgba(6, 92, 194, 0.25)"}`,
      }}
    >
      {children}
    </button>
  );
}

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const days = useMemo(() => {
    const arr: { iso: string; wd: string; day: string; mon: string }[] = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (arr.length < 14) {
      arr.push({
        iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        wd: d.toLocaleDateString("en-US", { weekday: "short" }),
        day: String(d.getDate()),
        mon: d.toLocaleDateString("en-US", { month: "short" }),
      });
      d.setDate(d.getDate() + 1);
    }
    return arr;
  }, []);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const go = (next: number) => {
    setError("");
    setStep(next);
    if (next > maxStep) setMaxStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validate = (): string => {
    if (step === 0 && (!form.date || !form.time)) return "Please select a date and a time slot.";
    if (step === 1 && !form.capability) return "Please choose a primary capability.";
    if (step === 2) {
      if (!form.name.trim()) return "Please enter your full name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid work email.";
      if (!form.company.trim()) return "Please enter your company name.";
    }
    return "";
  };

  const nextStep = () => {
    const err = validate();
    if (err) return setError(err);
    go(step + 1);
  };

  const submit = async () => {
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "New Consultation Booking — The Dime Technology",
          when: `${form.dateLabel} at ${form.time}`,
          date: form.date,
          time: form.time,
          capability: form.capability,
          budget: form.budget,
          timeline: form.timeline,
          brief: form.brief,
          name: form.name,
          email: form.email,
          company: form.company,
          role: form.role,
          nda: form.nda ? "Yes" : "No",
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        errors?: { message: string }[];
        message?: string;
      } | null;
      if (res.ok) {
        setDone(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus({
          ok: false,
          text:
            data?.errors?.map((e) => e.message).join(", ") ||
            (typeof data?.message === "string" ? data.message : "Something went wrong. Please try again."),
        });
      }
    } catch {
      setStatus({ ok: false, text: "Network error. Please try again." });
    }
    setSending(false);
  };

  if (done) {
    return (
      <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-10 text-center">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          ✓
        </div>
        <h2 className="text-2xl font-extrabold mb-3">Booking Request Received</h2>
        <p className="text-[#9898b0] mb-6 max-w-lg mx-auto">
          Thanks, {form.name.split(" ")[0] || "there"}! Your consultation is reserved for{" "}
          <strong className="text-white">{form.dateLabel} at {form.time}</strong>. Our team will
          confirm within one business day at {form.email}.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/" className="btn-primary">
            Back to Home
          </a>
          <a
            href="/product"
            className="px-7 py-2.5 rounded-full text-sm font-semibold border border-white/10 text-white hover:border-[#065cc2] hover:bg-[#065cc2]/10 transition-all"
          >
            Explore Services
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
      <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 md:p-8">
        <div className="flex items-center mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                onClick={() => i <= maxStep && go(i)}
                className="flex flex-col items-center gap-1.5"
                disabled={i > maxStep}
                style={{ cursor: i <= maxStep ? "pointer" : "default" }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background:
                      i <= step ? "linear-gradient(135deg, #065cc2, #2b7de0)" : "rgba(255,255,255,0.05)",
                    color: i <= step ? "#fff" : "#5a5a72",
                    border: i > step ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wide hidden sm:block"
                  style={{ color: i <= step ? "#2b7de0" : "#5a5a72" }}
                >
                  {label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 mb-5 sm:mb-0"
                  style={{ background: i < step ? "#065cc2" : "rgba(255,255,255,0.08)" }}
                />
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <h2 className="text-xl font-extrabold mb-1">Choose your preferred meeting time.</h2>
            <p className="text-[#9898b0] text-sm mb-6">
              Select a convenient date and time for your free consultation.
            </p>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9898b0] mb-3">
              Date
            </p>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 filter-scroll">
              {days.map((d) => {
                const active = form.date === d.iso;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => {
                      set("date", d.iso);
                      set("dateLabel", `${d.wd}, ${d.day} ${d.mon}`);
                    }}
                    className="shrink-0 w-16 py-3 rounded-xl text-center transition-all"
                    style={{
                      background: active ? "linear-gradient(135deg, #065cc2, #2b7de0)" : "#0a0a0f",
                      border: `1px solid ${active ? "#2b7de0" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    <span className="block text-[10px] font-semibold" style={{ color: active ? "#dbeafe" : "#5a5a72" }}>
                      {d.wd}
                    </span>
                    <span className="block text-lg font-bold" style={{ color: active ? "#fff" : "#9898b0" }}>
                      {d.day}
                    </span>
                    <span className="block text-[10px]" style={{ color: active ? "#dbeafe" : "#5a5a72" }}>
                      {d.mon}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9898b0] mb-3">
              Time slot
            </p>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((t) => (
                <Chip key={t} active={form.time === t} onClick={() => set("time", t)}>
                  {t}
                </Chip>
              ))}
            </div>
            <p className="text-[11px] text-[#5a5a72] mt-3">
              Times are shown in your local timezone (NPT, UTC+5:45).
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-extrabold mb-1">Tell us about your project.</h2>
            <p className="text-[#9898b0] text-sm mb-6">
              Help us understand your project so we can prepare the right solution before the
              meeting.
            </p>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9898b0] mb-3">
              Primary capability
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {CAPABILITIES.map((c) => (
                <Chip key={c} active={form.capability === c} onClick={() => set("capability", c)}>
                  {c}
                </Chip>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9898b0] mb-3">
              Budget range
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {BUDGETS.map((b) => (
                <Chip key={b} active={form.budget === b} onClick={() => set("budget", b)}>
                  {b}
                </Chip>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9898b0] mb-3">
              Timeline
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {TIMELINES.map((t) => (
                <Chip key={t} active={form.timeline === t} onClick={() => set("timeline", t)}>
                  {t}
                </Chip>
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9898b0] mb-3">
              Project brief
            </p>
            <textarea
              rows={4}
              value={form.brief}
              onChange={(e) => set("brief", e.target.value)}
              placeholder="What are you looking to build? Any must-have features, integrations or deadlines?"
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white placeholder:text-[#5a5a72] focus:border-[#065cc2] focus:outline-none transition-colors resize-y"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-extrabold mb-1">Your Information</h2>
            <p className="text-[#9898b0] text-sm mb-6">
              Our team will contact you within one business day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <label className="block">
                <span className="text-xs font-semibold text-[#9898b0]">Full name *</span>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-1.5 w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white placeholder:text-[#5a5a72] focus:border-[#065cc2] focus:outline-none transition-colors"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-[#9898b0]">Work email *</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white placeholder:text-[#5a5a72] focus:border-[#065cc2] focus:outline-none transition-colors"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-[#9898b0]">Company *</span>
                <input
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Acme Inc."
                  className="mt-1.5 w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white placeholder:text-[#5a5a72] focus:border-[#065cc2] focus:outline-none transition-colors"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-[#9898b0]">Role</span>
                <input
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  placeholder="Product Manager"
                  className="mt-1.5 w-full px-4 py-3 bg-[#0a0a0f] border border-white/5 rounded-lg text-sm text-white placeholder:text-[#5a5a72] focus:border-[#065cc2] focus:outline-none transition-colors"
                />
              </label>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.nda}
                onChange={(e) => set("nda", e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#065cc2]"
              />
              <span className="text-sm text-[#9898b0]">
                I would like to sign an NDA before discussing my project.
              </span>
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-extrabold mb-1">Confirm Your Booking</h2>
            <p className="text-[#9898b0] text-sm mb-6">
              Please review your information before submitting your consultation request.
            </p>

            <div className="rounded-xl border border-white/5 overflow-hidden mb-6">
              {[
                ["When", `${form.dateLabel || "—"} ${form.time ? `at ${form.time}` : ""}`],
                ["Capability", form.capability || "—"],
                ["Budget", form.budget || "—"],
                ["Timeline", form.timeline || "—"],
                ["Name", form.name || "—"],
                ["Company", form.company || "—"],
                ["Email", form.email || "—"],
                ["NDA", form.nda ? "Yes" : "No"],
                ["Brief", form.brief || "—"],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className="grid grid-cols-[110px_1fr] gap-3 px-4 py-3 text-sm"
                  style={{
                    background: i % 2 ? "#0a0a0f" : "#12121c",
                  }}
                >
                  <span className="text-[#5a5a72] font-semibold">{label}</span>
                  <span className="text-[#9898b0] break-words">{value}</span>
                </div>
              ))}
            </div>

            {status && (
              <p
                className={`mb-4 text-sm font-semibold ${
                  status.ok ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {status.text}
              </p>
            )}
          </div>
        )}

        {error && <p className="text-red-400 text-sm font-semibold mt-4">{error}</p>}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          <button
            type="button"
            onClick={() => go(Math.max(0, step - 1))}
            className="px-6 py-2.5 rounded-full text-sm font-semibold border border-white/10 text-[#9898b0] hover:text-white hover:border-[#065cc2] transition-all disabled:opacity-40"
            disabled={step === 0}
          >
            Back
          </button>
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="btn-primary btn-shine px-8">
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className="btn-primary px-8 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Confirming…" : "Confirm booking"}
            </button>
          )}
        </div>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-24">
        <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6">
          <h3 className="font-extrabold mb-4">What to expect</h3>
          <ul className="space-y-2.5">
            {[
              "Free 30-minute consultation",
              "Discuss your project requirements",
              "Technology & solution recommendations",
              "Estimated timeline and budget guidance",
              "Q&A with our development experts",
              "No obligation or sales pressure",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#9898b0]">
                <span className="text-[#2b7de0] font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6">
          <h3 className="font-extrabold mb-4">Consultation Summary</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-[#5a5a72]">Date</span>
              <span className="text-[#9898b0] text-right">{form.dateLabel || "—"}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#5a5a72]">Time</span>
              <span className="text-[#9898b0]">{form.time || "—"}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#5a5a72]">Capability</span>
              <span className="text-[#9898b0] text-right">{form.capability || "—"}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#5a5a72]">Budget</span>
              <span className="text-[#9898b0] text-right">{form.budget || "—"}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
