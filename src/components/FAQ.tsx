"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "What exactly is included in the rate?",
    a: "The rate is all-in — no placement fee, no markup, no hidden charges. You pay one rate that covers the developer, vetting, ongoing support, payroll, HR, compliance, and continuous training.",
  },
  {
    q: "What happens if I want to end the engagement?",
    a: "If things change on your end — budget, direction, headcount — you can wind down with a 2-month notice period. We'd rather you come back for the next hire than feel trapped.",
  },
  {
    q: "Is there a minimum contract length?",
    a: "We don't do long lock-ins. There's an initial calibration period of 1 month — where you get to make sure your developer is fitting in well. After this, a 6-month contract period kicks in.",
  },
  {
    q: "Can I run my own technical interview?",
    a: "Yes, and we encourage it. The candidates we send you are prepped and experienced in the tech stacks you need. Most clients do one round of their own to select from the shortlist.",
  },
  {
    q: "How involved do I need to be?",
    a: "One calibration call at the start so we understand exactly what and who you need. Then, you review the shortlist and interview your preferred candidates — that's it.",
  },
  {
    q: "Are your developers timezone-aligned?",
    a: "Yes. Every developer we place works exactly your hours — not a version of your hours. They're in your standups, available on Slack, part of your daily rhythm.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" className="py-24 bg-[#111118]">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
          >
            Questions We Get Asked
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#9898b0] text-lg">
            If you don&apos;t see your question here, feel free to contact us directly.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-[#1a1a2e] border border-white/5 rounded-xl overflow-hidden cursor-pointer transition-all hover:border-[#065cc2]/30 ${
                visible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex justify-between items-center px-6 py-5">
                <span className="font-semibold text-sm">{faq.q}</span>
                <span className="text-[#2b7de0] font-bold text-lg transition-transform duration-300">
                  {open === i ? "−" : "+"}
                </span>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "200px" : "0px" }}
              >
                <p className="px-6 pb-5 text-[#9898b0] text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
