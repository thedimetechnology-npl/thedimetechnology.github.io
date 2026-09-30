"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminCareer } from "@/lib/admin-types";

const chipClass = "px-3 py-1 rounded-full text-xs font-medium border";
const neutralChip = "bg-white/5 text-[#9898b0] border-white/10";
const typeChip = "bg-[#065cc2]/10 text-[#2b7de0] border-[#065cc2]/25";
const applyBtnClass =
  "inline-flex items-center gap-2 mt-auto self-start px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5";

export default function CareerList({ initial }: { initial: AdminCareer[] }) {
  const [items, setItems] = useState(initial);

  useEffect(() => {
    apiFetch("/api/content/careers")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  const open = items.filter((i) => i.active !== false);

  return (
    <>
      {open.length === 0 ? (
        <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-bold mb-2">No open positions right now</h2>
          <p className="text-sm text-[#9898b0] mb-6">
            We don&apos;t have any openings at the moment — but we&apos;d still love to hear
            from you.
          </p>
          <Link
            href="/#contact"
            className="inline-flex px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
          >
            Get in Touch
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {open.map((job) => (
            <div
              key={job.id}
              className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 hover:border-[#065cc2]/30"
            >
              <h2 className="text-lg font-bold mb-3">{job.title}</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.department && (
                  <span className={`${chipClass} ${neutralChip}`}>{job.department}</span>
                )}
                {job.location && (
                  <span className={`${chipClass} ${neutralChip}`}>{job.location}</span>
                )}
                <span className={`${chipClass} ${typeChip}`}>{job.type}</span>
                {job.experience && (
                  <span className={`${chipClass} ${neutralChip}`}>{job.experience}</span>
                )}
              </div>

              {job.description && (
                <p className="text-sm text-[#9898b0] leading-relaxed mb-4">
                  {job.description}
                </p>
              )}

              {job.requirements.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-[#9898b0]">
                      <span className="text-[#2b7de0] mt-0.5">▸</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              )}

              {job.applyUrl.startsWith("http") ? (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={applyBtnClass}
                  style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
                >
                  Apply Now →
                </a>
              ) : (
                <Link
                  href="/#contact"
                  className={applyBtnClass}
                  style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
                >
                  Apply Now →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 bg-[#1a1a2e] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h2 className="text-lg font-bold mb-1.5">Don&apos;t see your role?</h2>
          <p className="text-sm text-[#9898b0]">
            We&apos;re always looking for talented people. Send us a message and tell us how
            you can help.
          </p>
        </div>
        <Link
          href="/#contact"
          className="shrink-0 inline-flex px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          Get in Touch
        </Link>
      </div>
    </>
  );
}
