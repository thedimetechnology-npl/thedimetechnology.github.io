"use client";

import { useState } from "react";

const techItems = [
  { name: "PHP", category: "languages", icon: "php" },
  { name: "Java", category: "languages", icon: "java" },
  { name: "Python", category: "languages", icon: "python" },
  { name: ".NET", category: "languages", icon: "dot-net" },
  { name: "JavaScript", category: "languages", icon: "javascript" },
  { name: "TypeScript", category: "languages", icon: "typescript" },
  { name: "C#", category: "languages", icon: "csharp" },
  { name: "React", category: "fullstack", icon: "react" },
  { name: "Node.js", category: "fullstack", icon: "nodejs" },
  { name: "Vue.js", category: "fullstack", icon: "vuejs" },
  { name: "Angular", category: "fullstack", icon: "angular" },
  { name: "Flutter", category: "mobile", icon: "flutter" },
  { name: "React Native", category: "mobile", icon: "react" },
  { name: "Kotlin", category: "mobile", icon: "kotlin" },
  { name: "Swift", category: "mobile", icon: "swift" },
  { name: "WordPress", category: "cms", icon: "wordpress" },
  { name: "Shopify", category: "cms", icon: "shopify" },
  { name: "WooCommerce", category: "cms", icon: "woocommerce" },
  { name: "Magento", category: "cms", icon: "magento" },
  { name: "AWS", category: "infra", icon: "amazonwebservices" },
  { name: "Azure", category: "infra", icon: "azure" },
  { name: "Docker", category: "infra", icon: "docker" },
  { name: "Kubernetes", category: "infra", icon: "kubernetes" },
  { name: "Terraform", category: "infra", icon: "terraform" },
  { name: "GraphQL", category: "infra", icon: "graphql" },
  { name: "MongoDB", category: "infra", icon: "mongodb" },
  { name: "PostgreSQL", category: "infra", icon: "postgresql" },
  { name: "Cyber Security", category: "security", icon: "linux" },
  { name: "Network Security", category: "security", icon: "bash" },
];

const tabs = [
  { label: "Languages", filter: "languages" },
  { label: "Full-Stack", filter: "fullstack" },
  { label: "Mobile", filter: "mobile" },
  { label: "E-commerce & CMS", filter: "cms" },
  { label: "Infrastructure", filter: "infra" },
  { label: "Security", filter: "security" },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("languages");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = techItems.filter((t) => t.category === activeTab);

  return (
    <section id="tech" className="py-24 bg-[#111118]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
          >
            Technologies
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Our Tech Stack</h2>
          <p className="text-[#9898b0] text-lg max-w-2xl mx-auto">
            We work with a wide range of cutting-edge technologies to deliver the best solutions for
            your needs.
          </p>
        </div>

        <div className="relative z-10 flex gap-2.5 justify-center mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.filter}
              onClick={() => setActiveTab(tab.filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.filter
                  ? "text-white shadow-lg shadow-[#065cc2]/30"
                  : "bg-[#1a1a2e] border border-white/5 text-[#9898b0] hover:border-[#065cc2] hover:text-white"
              }`}
              style={
                activeTab === tab.filter
                  ? { background: "linear-gradient(135deg, #065cc2, #2b7de0)" }
                  : {}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((tech, i) => (
            <div
              key={tech.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-xl p-4 text-center cursor-pointer transition-all duration-500"
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
              <div
                className="w-9 h-9 mx-auto mb-2 flex items-center justify-center rounded-lg transition-transform duration-500"
                style={{
                  background: "rgba(6, 92, 194, 0.1)",
                  transform: hovered === i ? "scale(1.1)" : "scale(1)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                  alt={tech.name}
                  className="w-4.5 h-4.5"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <span className="text-xs font-semibold">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
