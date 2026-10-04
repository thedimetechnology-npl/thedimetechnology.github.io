"use client";

import { useEffect, useRef, useState } from "react";
import { faqs } from "@/data/faqs";

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
