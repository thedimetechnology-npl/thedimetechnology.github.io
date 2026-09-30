"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

const clients = [
  { name: "Mazenet", logo: "/assets/clients/mazenet.jpg" },
  { name: "FortyTwo Labs", logo: "/assets/clients/fourtytwo.jpg" },
  { name: "Permitech", logo: "/assets/clients/permitech.jpg" },
  { name: "System Canada", logo: "/assets/clients/systemcanada.jpg" },
  { name: "ABS Infosys", logo: "/assets/clients/absinfosys.jpg" },
  { name: "Infonet", logo: "/assets/clients/infonet.jpg" },
  { name: "Sunrise", logo: "/assets/clients/sunrise.jpg" },
  { name: "SharePro", logo: "/assets/clients/sharepro.jpg" },
  { name: "JanaFly", logo: "/assets/clients/janafly.jpg" },
  { name: "Energy Improvements", logo: "/assets/clients/energyimprovements.jpg" },
  { name: "Clinical Talent Australia", logo: "/assets/clients/clinicaltalent.jpg" },
  { name: "SapSG", logo: "/assets/clients/SapSG.jpg" },
  { name: "SIGASYS-Chinaway", logo: "/assets/clients/SIGASYS-Chinaway.jpg" },
];

export default function Clients() {
  const [items, setItems] = useState(clients);

  useEffect(() => {
    apiFetch("/api/content/clients")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  const doubled = [...items, ...items];

  return (
    <section id="clients" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Trusted by Clients</h2>
        </div>

        <div
          className="overflow-hidden animate-fade-in-up"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex gap-5 animate-marquee">
            {doubled.map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-[#1a1a2e] border border-white/5 rounded-lg px-6 py-4 flex items-center justify-center h-20 w-44 transition-all duration-300 hover:border-[#065cc2]/30 hover:-translate-y-1 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-12 object-contain transition-all duration-500 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
