"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ScrollLink from "@/components/ScrollLink";

const chipClass = "px-3 py-1 rounded-full text-xs font-medium border bg-white/5 text-[#9898b0] border-white/10";

type DetailModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  chips: string[];
  description: string;
  listLabel?: string;
  list?: string[];
  ctaLabel: string;
  ctaHref: string;
};

export default function DetailModal({
  open,
  onClose,
  title,
  chips,
  description,
  listLabel,
  list,
  ctaLabel,
  ctaHref,
}: DetailModalProps) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const paragraphs = description.split("\n").filter((p) => p.trim());

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="modal-box relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 p-6 sm:p-8"
        style={{ background: "linear-gradient(135deg, #15152a, #1a1a2e)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 text-[#9898b0] hover:text-white hover:border-[#065cc2] hover:bg-[#065cc2]/10 transition-all flex items-center justify-center text-lg"
        >
          ×
        </button>

        <h2 className="text-2xl font-extrabold tracking-tight mb-4 pr-10">{title}</h2>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {chips.map((chip, i) => (
              <span key={i} className={chipClass}>
                {chip}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-4 mb-6">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm text-[#9898b0] leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {list && list.length > 0 && listLabel && (
          <div className="mb-7">
            <h3 className="text-sm font-bold mb-3">{listLabel}</h3>
            <ul className="space-y-2">
              {list.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-[#9898b0]">
                  <span className="text-[#2b7de0] mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {ctaHref.startsWith("http") ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
          >
            {ctaLabel}
          </a>
        ) : (
          <ScrollLink
            section="contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
          >
            {ctaLabel}
          </ScrollLink>
        )}
      </div>
    </div>,
    document.body
  );
}
