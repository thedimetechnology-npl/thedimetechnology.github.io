"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReadMore from "@/components/ReadMore";
import DetailModal from "@/components/DetailModal";
import type { AdminCareer } from "@/lib/admin-types";

const chipClass = "px-3 py-1 rounded-full text-xs font-medium border";
const neutralChip = "bg-white/5 text-[#9898b0] border-white/10";
const typeChip = "bg-[#065cc2]/10 text-[#2b7de0] border-[#065cc2]/25";
const applyBtnClass =
  "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5";

export default function CareerList({ initial }: { initial: AdminCareer[] }) {
  const [items, setItems] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(null);

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
              <h2 className="text-lg font-bold mb-3 line-clamp-2">{job.title}</h2>

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
                <div className="space-y-4 line-clamp-4 mb-1">
                  {job.description
                    .split("\n")
                    .filter((p) => p.trim())
                    .map((para, i) => (
                      <p key={i} className="text-sm text-[#9898b0] leading-relaxed">
                        {para}
                      </p>
                    ))}
                </div>
              )}

              <div className="mt-auto flex items-center justify-between gap-3">
                <ReadMore text={job.description} onClick={() => setOpenId(job.id)} />

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

              <DetailModal
                open={openId === job.id}
                onClose={() => setOpenId(null)}
                title={job.title}
                chips={[job.department, job.location, job.type, job.experience].filter(
                  (c): c is string => !!c
                )}
                description={job.description}
                listLabel="Requirements"
                list={job.requirements}
                ctaLabel="Apply Now →"
                ctaHref={job.applyUrl}
              />
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
