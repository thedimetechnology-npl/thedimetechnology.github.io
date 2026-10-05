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
      <div className="max-w-screen-2xl mx-auto px-6" ref={ref}>
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
                {
                  title: "Innovation",
                  desc: "Innovation and creativity at every turn",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18h6M10 21h4" />
                      <path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.6 1 2.5h6c0-.9.2-1.7 1-2.5A6 6 0 0 0 12 3z" />
                    </svg>
                  ),
                },
                {
                  title: "Quality",
                  desc: "Relentless pursuit of quality and improvement",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  title: "Strategy",
                  desc: "Strategic solutions tailored to each client",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="m14.8 9.2-1.9 4.3-4.3 1.9 1.9-4.3z" />
                    </svg>
                  ),
                },
                {
                  title: "Reliability",
                  desc: "Reliable support and transparent communication",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                },
              ].map((v) => (
                <div key={v.title} className="flex gap-3.5 items-start">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[#065cc2]/25 bg-[#065cc2]/10 text-[#2b7de0] shadow-[0_0_20px_rgba(6,92,194,0.15)]">
                    {v.icon}
                  </span>
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
              <div className="relative rounded-2xl">
                <div className="animate-earth-float">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about.png"
                    alt="About The Dime Technology"
                    className="w-3/5 mx-auto animate-earth-spin"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0a0a0f]/70 via-[#0a0a0f]/20 to-transparent pointer-events-none" />
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
