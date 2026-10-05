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
  { name: "Energy Improvements", logo: "/assets/clients/energyimprovements.jpg" },
  { name: "Clinical Talent Australia", logo: "/assets/clients/clinicaltalent.jpg" },
  { name: "SapSG", logo: "/assets/clients/SapSG.jpg" },
  { name: "SIGASYS-Chinaway", logo: "/assets/clients/SIGASYS-Chinaway.jpg" },
  { name: "Awwal Tech", logo: "/assets/clients/awwaltech.jpg" },
  { name: "ATIT Solutionz", logo: "/assets/clients/atitsolutionz.jpg" },
];

export default function Clients() {
  const [items, setItems] = useState(clients);
  const [offset, setOffset] = useState(0);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    apiFetch("/api/content/clients")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  const doubled = [...items, ...items];

  const CARD = 196;
  const cycle = CARD * items.length;

  const go = (dir: number) => {
    const raw = offset + dir * CARD;
    let norm = raw % cycle;
    if (norm > 0) norm -= cycle;
    if (norm !== raw) {
      setAnimated(false);
      setOffset(norm);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
    } else {
      setOffset(raw);
    }
  };

  return (
    <section id="clients" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Trusted by Clients</h2>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Previous clients"
            className="shrink-0 w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#065cc2] hover:bg-[#065cc2]/10 transition-all cursor-pointer"
          >
            ←
          </button>

          <div
            className="flex-1 min-w-0 overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <div
              style={{
                transform: `translateX(${offset}px)`,
                transition: animated ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
              }}
            >
              <div className="flex gap-5 animate-marquee">
                {doubled.map((client, i) => (
                  <div
                    key={i}
                    className="client-card flex-shrink-0 bg-[#1a1a2e] border border-white/5 rounded-lg px-6 py-4 flex items-center justify-center h-20 w-44 transition-all duration-300 hover:border-[#065cc2]/30 hover:-translate-y-1 group"
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

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Next clients"
            className="shrink-0 w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#065cc2] hover:bg-[#065cc2]/10 transition-all cursor-pointer"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
