"use client";

export default function ReadMore({ text, onClick }: { text: string; onClick: () => void }) {
  if (!text || text.length <= 220) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
      style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
    >
      Read More
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}
