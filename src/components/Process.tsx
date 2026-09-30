"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery & Planning",
    desc: "We start by understanding your vision, goals, and requirements through in-depth consultations.",
  },
  {
    num: "02",
    title: "Design & Architecture",
    desc: "Our team creates detailed designs and technical architecture that align with your business objectives.",
  },
  {
    num: "03",
    title: "Development & Testing",
    desc: "We build your solution using best practices, with rigorous testing at every stage.",
  },
  {
    num: "04",
    title: "Launch & Support",
    desc: "We deploy your solution and provide ongoing support to ensure continued success.",
  },
];

export default function Process() {
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
    <section id="process" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
          >
            How We Work
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Simple. Structured. Fast.</h2>
          <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
            A streamlined approach to delivering exceptional results, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div
            className="hidden lg:block absolute top-9 left-16 right-16 h-0.5 opacity-30"
            style={{ background: "linear-gradient(90deg, #065cc2, #2b7de0, transparent)" }}
          />
          {steps.map((step, i) => (
            <div
              key={i}
              className={`text-center relative z-10 ${
                visible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div
                className="w-18 h-18 rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-5 shadow-lg shadow-[#065cc2]/30"
                style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)", width: 72, height: 72 }}
              >
                {step.num}
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-[#9898b0] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
