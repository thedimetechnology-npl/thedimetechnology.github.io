"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  {
    name: "Roman",
    role: "ASP.NET Developer",
    experience: "5+ Years experience",
    tech: ["C#", ".NET Core", "SQL Server", "Azure"],
    photo: "/assets/team/roman.jpg",
    category: "software",
  },
  {
    name: "Josheph",
    role: "Java Developer",
    experience: "4+ Years experience",
    tech: ["Java", "Spring Boot", "Microservices"],
    photo: "/assets/team/josheph.jpg",
    category: "software",
  },
  {
    name: "Bibek",
    role: "Mobile App Developer",
    experience: "4+ Years experience",
    tech: ["Flutter", "React Native", "Kotlin"],
    photo: "/assets/team/bibek.jpg",
    category: "mobile",
  },
  {
    name: "Pratik",
    role: "Cyber Security Engineer",
    experience: "5+ Years experience",
    tech: ["Penetration Testing", "SIEM", "SOC"],
    photo: "/assets/team/pratik.jpg",
    category: "security",
  },
  {
    name: "Susant",
    role: "Network Security Engineer",
    experience: "6+ Years experience",
    tech: ["Cisco", "Juniper", "Firewalls", "VPN"],
    photo: "/assets/team/susant.jpg",
    category: "security",
  },
  {
    name: "Shahid Alam",
    role: "Founder & CEO",
    experience: "10+ Years experience",
    tech: ["Tech Strategy", "Cloud", "Architecture"],
    photo: "/assets/team/shahid.jpg",
    category: "founder",
    founder: true,
  },
  {
    name: "Balkrishna",
    role: "WordPress Developer",
    experience: "4+ Years experience",
    tech: ["WordPress", "PHP", "WooCommerce"],
    photo: "/assets/team/balkrishna.jpg",
    category: "web",
  },
  {
    name: "Roshan",
    role: "Full-Stack Developer",
    experience: "5+ Years experience",
    tech: ["React", "Node.js", "MongoDB", "AWS"],
    photo: "/assets/team/roshan.jpg",
    category: "software",
  },
];

const tabs = [
  { label: "All", filter: "all" },
  { label: "Software", filter: "software" },
  { label: "Mobile", filter: "mobile" },
  { label: "Security", filter: "security" },
  { label: "Web", filter: "web" },
  { label: "Leadership", filter: "founder" },
];

export default function Team() {
  const [activeTab, setActiveTab] = useState("all");
  const [hovered, setHovered] = useState<number | null>(null);
  const [items, setItems] = useState(teamMembers);
  const touchActive = useRef(false);

  useEffect(() => {
    apiFetch("/api/content/team")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (hovered === null) return;
    const clear = () => {
      if (touchActive.current) setHovered(null);
    };
    window.addEventListener("scroll", clear, { passive: true });
    return () => window.removeEventListener("scroll", clear);
  }, [hovered]);

  const filtered = items.filter(
    (m) => activeTab === "all" || m.category === activeTab
  );

  return (
    <section id="team" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.12)", color: "#2b7de0" }}
          >
            Meet the Experts
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            A Diverse Group of Dedicated Professionals
          </h2>
          <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
            Our team brings passion, innovation, and excellence to every project.
          </p>
        </div>

        <div className="flex gap-2 mb-10 flex-wrap border-b border-white/5 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.filter}
              onClick={() => {
                setActiveTab(tab.filter);
                setHovered(null);
              }}
              className={`px-5 py-3 text-sm font-medium transition-all relative flex items-center gap-2 rounded-t-lg ${
                activeTab === tab.filter
                  ? "text-white bg-[#065cc2]/10"
                  : "text-[#9898b0] hover:text-white"
              }`}
            >
              {tab.label}
              {activeTab === tab.filter && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#065cc2" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((member, i) => (
            <div
              key={member.name}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") {
                  touchActive.current = false;
                  setHovered(i);
                }
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setHovered(null);
              }}
              onPointerDown={(e) => {
                if (e.pointerType === "touch") {
                  touchActive.current = true;
                  setHovered((h) => (h === i ? null : i));
                }
              }}
              className="rounded-xl overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                background:
                  hovered === i
                    ? "rgba(20, 20, 30, 0.6)"
                    : "rgba(20, 20, 30, 0.4)",
                backdropFilter: "blur(12px)",
                border:
                  hovered === i
                    ? "1px solid rgba(6, 92, 194, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.05)",
                transform:
                  hovered === i ? "translateY(-6px)" : "translateY(0)",
                boxShadow:
                  hovered === i
                    ? "0 20px 40px rgba(6, 92, 194, 0.15), 0 0 0 1px rgba(6, 92, 194, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                    : "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
              }}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "2/3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter:
                      hovered === i
                        ? "brightness(1) saturate(1)"
                        : "brightness(0.35) saturate(0.3)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, transparent 30%, transparent 50%, rgba(0, 0, 0, 0.85) 100%)",
                  }}
                />
                <div className="absolute top-0 left-0 right-0 p-4">
                  <h3 className="text-base font-bold" style={{ color: "#065cc2" }}>
                    {member.name}
                  </h3>
                </div>
                <div
                  className="absolute left-0 right-0 p-4 transition-all duration-500"
                  style={{
                    background: "rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(8px)",
                    bottom: "12px",
                    borderRadius: "0 0 12px 12px",
                  }}
                >
                  <div className="text-xs text-white/90 mb-1 flex items-start gap-1.5">
                    <span className="text-[#065cc2] font-bold text-[10px] mt-0.5 shrink-0">&gt;_</span>
                    {member.role}
                  </div>
                  <div className="text-xs text-white/80 mb-1 flex items-start gap-1.5">
                    <span className="text-[#065cc2] font-bold text-[10px] mt-0.5 shrink-0">&gt;_</span>
                    {member.experience}
                  </div>
                  <div className="text-xs text-white/70 mb-2 flex items-start gap-1.5">
                    <span className="text-[#065cc2] font-bold text-[10px] mt-0.5 shrink-0">&gt;_</span>
                    {member.tech.join(", ")}
                  </div>
                  <div
                    className="flex gap-1.5 flex-wrap transition-all duration-500"
                    style={{
                      opacity: hovered === i ? 1 : 0,
                      transform: hovered === i ? "translateY(0)" : "translateY(8px)",
                      maxHeight: hovered === i ? "50px" : "0px",
                      overflow: "hidden",
                    }}
                  >
                    {member.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded border border-white/20 text-white/80"
                        style={{ background: "rgba(255, 255, 255, 0.05)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {member.founder && (
                    <div className="flex gap-2 mt-3">
                      <a
                        href="https://www.linkedin.com/in/shahidalam-nepal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#065cc2]/25 text-[#2b7de0] hover:bg-[#065cc2]/15 hover:text-white transition-all"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://github.com/azhashmi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#065cc2]/25 text-[#2b7de0] hover:bg-[#065cc2]/15 hover:text-white transition-all"
                      >
                        GitHub
                      </a>
                      <a
                        href="mailto:afrozhashmi@hotmail.com"
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#065cc2]/25 text-[#2b7de0] hover:bg-[#065cc2]/15 hover:text-white transition-all"
                      >
                        Email
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
