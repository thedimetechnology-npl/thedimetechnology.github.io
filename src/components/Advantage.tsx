"use client";

import { useEffect, useRef, useState } from "react";

const advantages = [
  {
    num: "5",
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    title: "5 Days, Not 10 Weeks",
    desc: "Most hiring processes move at the pace of job boards. Ours moves at the pace your business actually needs. Brief to shortlist in less than 5 working days.",
  },
  {
    num: "1%",
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    title: "The Top Talent Only",
    desc: "We're obsessed with quality. Each candidate is run through rigorous screening, expert technical interviews, live coding assessments, and communication tests.",
  },
  {
    num: "∞",
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    title: "Remote, Yet Feels In-House",
    desc: "No more disconnected workforces. Our developers work your hours, join your meetings, live in your Slack — fully managed, so you can focus on growing your business.",
  },
];

export default function Advantage() {
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
    <section className="py-24 bg-[#111118]">
      <div className="max-w-screen-2xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
          >
            Why Choose Us
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Your Dime Advantage</h2>
          <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
            Three things that make us different from every other tech partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <div
              key={i}
              className={`text-center p-10 bg-[#1a1a2e] border border-white/5 rounded-2xl card-hover relative ${
                visible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="absolute -top-4 right-6 text-6xl font-black gradient-text opacity-15 leading-none">
                {adv.num}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={adv.icon} alt={adv.title} className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-bold mb-3">{adv.title}</h3>
              <p className="text-[#9898b0] text-sm leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
