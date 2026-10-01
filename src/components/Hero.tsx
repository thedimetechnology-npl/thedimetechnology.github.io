"use client";

import { useEffect, useRef, useState } from "react";
import ScrollLink from "./ScrollLink";

export default function Hero() {
  const [counters, setCounters] = useState({ projects: 0, satisfaction: 0, years: 0, professionals: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const targets = [
          { key: "projects" as const, target: 50 },
          { key: "satisfaction" as const, target: 98 },
          { key: "years" as const, target: 10 },
          { key: "professionals" as const, target: 15 },
        ];

        targets.forEach(({ key, target }) => {
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCounters((prev) => ({ ...prev, [key]: target }));
              clearInterval(timer);
            } else {
              setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }));
            }
          }, 30);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 100px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    const fallback = setTimeout(() => {
      setCounters({ projects: 50, satisfaction: 98, years: 10, professionals: 15 });
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", `${(x * 46).toFixed(1)}px`);
    el.style.setProperty("--my", `${(y * 36).toFixed(1)}px`);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        sectionRef.current?.style.setProperty("--mx", "0px");
        sectionRef.current?.style.setProperty("--my", "0px");
      }}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-16"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 92, 194, 0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(43, 125, 224, 0.1) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 hero-parallax">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 hero-ring" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div
          className="inline-block px-5 py-2 rounded-full text-xs font-semibold mb-6 animate-hero-reveal"
          style={{
            background: "rgba(6, 92, 194, 0.12)",
            border: "1px solid rgba(6, 92, 194, 0.25)",
            color: "#2b7de0",
            animationDelay: "0.05s",
          }}
        >
          Your Freelance Tech Partner
        </div>

        <h1
          className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-5 animate-hero-reveal"
          style={{ animationDelay: "0.15s" }}
        >
          Turn Your Project Into <span className="shimmer-text">Reality</span>
        </h1>

        <p
          className="text-lg text-[#9898b0] leading-relaxed mb-9 max-w-2xl mx-auto animate-hero-reveal"
          style={{ animationDelay: "0.3s" }}
        >
          From concept to completion, we bring the technical expertise and project experience needed
          to build successful digital solutions. Our team works closely with you to understand your
          goals, choose the right technology, and deliver a solution that is scalable, reliable, and
          built for your business.
        </p>

        <div
          className="flex gap-4 justify-center mb-14 animate-hero-reveal"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="https://www.truelancer.com/freelancer/shahidalam7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Start a Project
          </a>
          <ScrollLink
            section="about"
            className="inline-block px-9 py-3.5 rounded-full text-base font-semibold border border-white/20 text-white hover:border-[#065cc2] hover:bg-[#065cc2]/10 transition-all"
          >
            Learn More
          </ScrollLink>
        </div>

        <div
          ref={ref}
          className="inline-flex justify-center items-center animate-hero-reveal px-6 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            { value: counters.projects, suffix: "+", label: "Projects Delivered" },
            { value: counters.satisfaction, suffix: "%", label: "Satisfaction Rate" },
            { value: counters.years, suffix: "+", label: "Years Experience" },
            { value: counters.professionals, suffix: "+", label: "IT Professionals" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-extrabold">{stat.value}</span>
                <span className="text-lg font-bold text-[#2b7de0]">{stat.suffix}</span>
                <span className="text-xs text-[#5a5a72] font-medium ml-1">{stat.label}</span>
              </div>
              {i < 3 && <div className="w-px h-8 bg-white/10 mx-4" />}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2.5">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#5a5a72]">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-[#065cc2] to-transparent scroll-line" />
      </div>
    </section>
  );
}
