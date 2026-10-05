"use client";

import { useState } from "react";
import { services } from "@/data/services";

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-[#111118]">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
          >
            What We Do
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Our Tech Services</h2>
          <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
            We help businesses transform with cutting-edge technology solutions across every stage
            of the transformation process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative bg-[#1a1a2e] border border-white/5 rounded-2xl p-8 transition-all duration-500 cursor-pointer overflow-hidden group"
              style={{
                transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                boxShadow:
                  hovered === i
                    ? "0 20px 40px rgba(6, 92, 194, 0.15), 0 0 0 1px rgba(6, 92, 194, 0.3), 0 0 30px rgba(6, 92, 194, 0.1)"
                    : "0 4px 16px rgba(0, 0, 0, 0.2)",
                borderColor: hovered === i ? "rgba(6, 92, 194, 0.4)" : "rgba(255, 255, 255, 0.05)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(6, 92, 194, 0.15) 0%, transparent 100%)",
                  opacity: hovered === i ? 1 : 0,
                }}
              />
              <div className="relative z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-10 h-10 mb-5 transition-transform duration-500"
                  style={{
                    transform: hovered === i ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <h3 className="text-lg font-bold mb-3 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#9898b0] text-sm leading-relaxed">{service.desc}</p>
              </div>
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
                style={{
                  background: "linear-gradient(90deg, transparent, #065cc2, transparent)",
                  opacity: hovered === i ? 1 : 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
