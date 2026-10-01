"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import ReadMore from "@/components/ReadMore";
import DetailModal from "@/components/DetailModal";
import ScrollLink from "@/components/ScrollLink";
import type { AdminCourse } from "@/lib/admin-types";

const chipClass = "px-3 py-1 rounded-full text-xs font-medium border";
const neutralChip = "bg-white/5 text-[#9898b0] border-white/10";
const typeChip = "bg-[#065cc2]/10 text-[#2b7de0] border-[#065cc2]/25";
const priceChip = "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
const enrollBtnClass =
  "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5";

export default function CourseList({ initial }: { initial: AdminCourse[] }) {
  const [items, setItems] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/content/courses")
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
          <h2 className="text-xl font-bold mb-2">No courses available right now</h2>
          <p className="text-sm text-[#9898b0] mb-6">
            New courses are announced regularly — get in touch and we&apos;ll let you know
            when the next one starts.
          </p>
          <ScrollLink
            section="contact"
            className="inline-flex px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
          >
            Get in Touch
          </ScrollLink>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {open.map((course) => (
            <div
              key={course.id}
              className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 hover:border-[#065cc2]/30"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-lg font-bold line-clamp-2">{course.title}</h2>
                {course.price && <span className={`${chipClass} ${priceChip} shrink-0`}>{course.price}</span>}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {course.category && (
                  <span className={`${chipClass} ${typeChip}`}>{course.category}</span>
                )}
                <span className={`${chipClass} ${neutralChip}`}>{course.level}</span>
                {course.duration && (
                  <span className={`${chipClass} ${neutralChip}`}>{course.duration}</span>
                )}
                {course.mode && (
                  <span className={`${chipClass} ${neutralChip}`}>{course.mode}</span>
                )}
              </div>

              {course.description && (
                <div className="space-y-4 line-clamp-4 mb-1">
                  {course.description
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
                <ReadMore text={course.description} onClick={() => setOpenId(course.id)} />

                {course.enrollUrl.startsWith("http") ? (
                  <a
                    href={course.enrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={enrollBtnClass}
                    style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
                  >
                    Enroll Now →
                  </a>
                ) : (
                  <ScrollLink
                    section="contact"
                    className={enrollBtnClass}
                    style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
                  >
                    Enroll Now →
                  </ScrollLink>
                )}
              </div>

              <DetailModal
                open={openId === course.id}
                onClose={() => setOpenId(null)}
                title={course.title}
                chips={[course.category, course.level, course.duration, course.mode, course.price].filter(
                  (c): c is string => !!c
                )}
                description={course.description}
                listLabel="Topics"
                list={course.topics}
                ctaLabel="Enroll Now →"
                ctaHref={course.enrollUrl}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 bg-[#1a1a2e] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h2 className="text-lg font-bold mb-1.5">Not sure which course fits?</h2>
          <p className="text-sm text-[#9898b0]">
            Tell us about your background and goals — we&apos;ll help you pick the right
            one.
          </p>
        </div>
        <ScrollLink
          section="contact"
          className="shrink-0 inline-flex px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
        >
          Get in Touch
        </ScrollLink>
      </div>
    </>
  );
}
