import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

export type LegalBlock = { p: string } | { ul: string[] };
export type LegalSection = { num: string; heading: string; blocks: LegalBlock[] };

export default function LegalPage({
  badge,
  lead,
  gradient,
  intro,
  effectiveDate,
  sections,
  cta,
}: {
  badge: string;
  lead: string;
  gradient: string;
  intro: ReactNode;
  effectiveDate: string;
  sections: LegalSection[];
  cta: { heading: string; text: string };
}) {
  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ background: "rgba(6, 92, 194, 0.1)", color: "#2b7de0" }}
            >
              {badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
              {lead} <span className="gradient-text">{gradient}</span>
            </h1>
            <div className="text-[#9898b0] text-base leading-relaxed space-y-4 max-w-3xl">
              {intro}
            </div>
            <p className="text-xs text-[#5a5a72] mt-5">
              Effective Date: {effectiveDate}
            </p>
          </div>

          <div>
            {sections.map((s) => (
              <section key={s.num} className="mb-10">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-2xl font-extrabold gradient-text shrink-0">
                    {s.num}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    {s.heading}
                  </h2>
                </div>
                {s.blocks.map((block, i) =>
                  "p" in block ? (
                    <p
                      key={i}
                      className="text-[15px] text-[#9898b0] leading-relaxed mb-4"
                    >
                      {block.p}
                    </p>
                  ) : (
                    <ul key={i} className="space-y-2.5 mb-4">
                      {block.ul.map((item, j) => (
                        <li key={j} className="flex gap-2.5 text-[15px] text-[#9898b0]">
                          <span className="text-[#2b7de0] mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 bg-[#1a1a2e] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#2b7de0] mb-2">
                Get in touch
              </span>
              <h2 className="text-lg font-bold mb-1.5">{cta.heading}</h2>
              <p className="text-sm text-[#9898b0]">{cta.text}</p>
            </div>
            <Link
              href="/#contact"
              className="shrink-0 inline-flex px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
