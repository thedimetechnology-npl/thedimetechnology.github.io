"use client";

import { useEffect, useRef, useState } from "react";
import ScrollLink from "./ScrollLink";

export default function Pricing() {
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
    <section id="pricing" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
          >
            See Exactly What You&apos;d Save
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Smart Pricing, Real Savings
          </h2>
          <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
            Compare what it costs to hire with The Dime Technology against the cost of hiring
            locally.
          </p>
        </div>

        <div
          className={`max-w-lg mx-auto ${
            visible ? "animate-fade-in-up" : ""
          }`}
        >
          <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden card-hover">
            <div
              className="p-8 text-center border-b border-white/5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6, 92, 194, 0.15), rgba(43, 125, 224, 0.1))",
              }}
            >
              <div className="text-sm font-bold text-[#2b7de0] uppercase tracking-wider mb-3">
                The Dime Technology
              </div>
              <div className="text-5xl font-black">
                £25 <span className="text-base font-medium text-[#5a5a72]">/hr</span>
              </div>
              <div className="text-sm text-[#5a5a72] mt-2">All-in rate, no hidden fees</div>
            </div>
            <ul className="p-8 flex flex-col gap-3.5 border-b border-white/5">
              {[
                "Dedicated Account Manager & Support",
                "Complete vetting & onboarding",
                "HR admin & payroll handled",
                "Performance management & compliance",
                "Continuous training & support",
                "One simple all-inclusive monthly invoice",
              ].map((item) => (
                <li key={item} className="text-sm text-[#9898b0] flex items-center gap-2.5">
                  <span className="text-[#2b7de0] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="p-6 text-center border-b border-white/5">
              <div className="text-sm text-[#5a5a72] mb-2">
                Equivalent to <strong className="text-white">4,333 £/month</strong> all-in rate
              </div>
              <div
                className="text-2xl font-extrabold gradient-text"
              >
                Save ~£37,296/year
              </div>
            </div>
            <ScrollLink
              section="contact"
              className="block w-full text-center text-white font-semibold py-4 transition-all hover:shadow-lg hover:shadow-[#065cc2]/30"
              style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
            >
              Hire Now
            </ScrollLink>
          </div>

          <div className="flex justify-center items-center gap-8 mt-10 flex-wrap">
            <div className="text-center">
              <div className="text-sm font-semibold text-[#5a5a72] mb-2">Local Hiring in UK</div>
              <div className="text-2xl font-extrabold text-[#9898b0]">
                £40 <span className="text-sm text-[#5a5a72]">/hr</span>
              </div>
              <div className="text-xs text-[#5a5a72] mt-1">
                £6,933/month + agency fees, NI, pension
              </div>
            </div>
            <div className="text-lg font-extrabold text-[#5a5a72] px-4 py-2 border border-white/5 rounded-full">
              VS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
