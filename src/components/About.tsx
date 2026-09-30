"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
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
    <section id="about" className="py-24 bg-[#111118]">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${
            visible ? "animate-fade-in-up" : ""
          }`}
        >
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              About Us
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mb-5">
              At The Dime Technology, we are driven by a passion for digital excellence.
            </h2>
            <p className="text-[#9898b0] leading-relaxed mb-5">
              Our team is dedicated to creating innovative digital solutions that propel businesses
              forward and set new standards in quality and performance. We believe in delivering
              outstanding experiences through continuous improvement, creativity, and cutting-edge
              technology.
            </p>
            <p className="text-[#9898b0] leading-relaxed mb-8">
              With every project, our goal is to exceed expectations by combining strategic
              thinking, user-centered design, and technical expertise. We embrace new ideas and adapt
              quickly to the evolving digital landscape, ensuring our clients stay ahead of their
              competition.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: "💡", title: "Innovation", desc: "Innovation and creativity at every turn" },
                { icon: "🎯", title: "Quality", desc: "Relentless pursuit of quality and improvement" },
                { icon: "🤝", title: "Strategy", desc: "Strategic solutions tailored to each client" },
                { icon: "🛡️", title: "Reliability", desc: "Reliable support and transparent communication" },
              ].map((v) => (
                <div key={v.title} className="flex gap-3.5 items-start">
                  <span className="text-xl mt-0.5">{v.icon}</span>
                  <div>
                    <strong className="block text-sm mb-1">{v.title}</strong>
                    <p className="text-[#5a5a72] text-xs leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative group">
              <div
                className="about-glow absolute -inset-3 rounded-[28px] blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(6,92,194,0.5), rgba(10,138,238,0.28) 50%, rgba(43,125,224,0.4))",
                }}
              />
              <div
                className="relative rounded-2xl p-[1.5px] transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(6,92,194,0.75), rgba(255,255,255,0.12) 35%, rgba(10,138,238,0.55) 70%, rgba(43,125,224,0.7))",
                }}
              >
                <div className="relative overflow-hidden rounded-[14px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about.png"
                    alt="About The Dime Technology"
                    className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.14) 50%, transparent 58%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0a0a0f]/70 via-[#0a0a0f]/20 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.06] to-transparent" />
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-6 p-6 bg-[#1a1a2e] border border-white/5 rounded-2xl">
              <div className="text-center flex-1">
                <span className="block text-2xl font-extrabold gradient-text">50+</span>
                <span className="text-xs text-[#5a5a72]">Projects</span>
              </div>
              <div className="text-center flex-1">
                <span className="block text-2xl font-extrabold gradient-text">98%</span>
                <span className="text-xs text-[#5a5a72]">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
