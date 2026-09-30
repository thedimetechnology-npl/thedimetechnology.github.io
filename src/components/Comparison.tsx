"use client";

import { useState } from "react";

export default function Comparison() {
  const [hovered, setHovered] = useState<number | null>(null);

  const oldWay = [
    "Weeks of searching for the right technical expertise",
    "Generic talent that may not match your technology stack",
    "Limited technical alignment with your project requirements",
    "Fragmented communication between clients and developers",
    "Unclear pricing and unpredictable project costs",
    "Limited support once development begins",
  ];

  const dimeWay = [
    "Access the right technical expertise for your project",
    "Matched to your technology stack and requirements",
    "Experienced developers across 30+ technologies",
    "Seamless collaboration with your existing team and workflow",
    "Transparent pricing with clear project expectations",
    "Ongoing support and accountability from development to delivery",
  ];

  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
          >
            The Problem
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Traditional Hiring Is Broken
          </h2>
          <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
            The old way of hiring developers is slow, expensive, and unpredictable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
            className="bg-[#1a1a2e] border border-red-500/15 rounded-2xl p-8 transition-all duration-500 relative overflow-hidden"
            style={{
              transform: hovered === 0 ? "translateY(-4px)" : "translateY(0)",
              boxShadow:
                hovered === 0
                  ? "0 20px 40px rgba(239, 68, 68, 0.1), 0 0 0 1px rgba(239, 68, 68, 0.2)"
                  : "0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 className="text-lg font-bold text-red-400 mb-6">The Old Way</h3>
            <ul className="flex flex-col gap-3.5">
              {oldWay.map((item) => (
                <li key={item} className="text-sm text-[#9898b0] flex items-center gap-2.5">
                  <span className="text-red-400 font-bold">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
            className="bg-[#1a1a2e] border border-[#065cc2]/20 rounded-2xl p-8 transition-all duration-500 relative overflow-hidden"
            style={{
              transform: hovered === 1 ? "translateY(-4px)" : "translateY(0)",
              boxShadow:
                hovered === 1
                  ? "0 20px 40px rgba(6, 92, 194, 0.15), 0 0 0 1px rgba(6, 92, 194, 0.3), 0 0 30px rgba(6, 92, 194, 0.1)"
                  : "0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(6, 92, 194, 0.12) 0%, transparent 100%)",
                opacity: hovered === 1 ? 1 : 0,
              }}
            />
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-[#2b7de0] mb-6">The Dime Way</h3>
              <ul className="flex flex-col gap-3.5">
                {dimeWay.map((item) => (
                  <li key={item} className="text-sm text-[#9898b0] flex items-center gap-2.5">
                    <span className="text-[#2b7de0] font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
          className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-8 text-center transition-all duration-500 relative overflow-hidden"
          style={{
            transform: hovered === 2 ? "translateY(-4px)" : "translateY(0)",
            boxShadow:
              hovered === 2
                ? "0 20px 40px rgba(6, 92, 194, 0.12), 0 0 0 1px rgba(6, 92, 194, 0.25)"
                : "0 4px 16px rgba(0, 0, 0, 0.2)",
            borderColor: hovered === 2 ? "rgba(6, 92, 194, 0.3)" : "rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6, 92, 194, 0.1) 0%, transparent 100%)",
              opacity: hovered === 2 ? 1 : 0,
            }}
          />
          <h3 className="text-2xl font-extrabold tracking-tight mb-4 relative z-10">
            From idea to delivery — <span className="gradient-text">one trusted technology partner</span>
          </h3>
          <p className="text-[#9898b0] text-sm max-w-2xl mx-auto relative z-10">
            We handle the entire journey — from understanding your vision to delivering, deploying, and
            supporting your solution — so you can focus on growing your business.
          </p>
        </div>
      </div>
    </section>
  );
}
