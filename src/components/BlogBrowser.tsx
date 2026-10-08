"use client";

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url?: string;
  image?: string;
};

const COUNTRIES = [
  "Australia", "Canada", "Chile", "Croatia", "Cyprus", "India", "Jordan",
  "Kazakhstan", "Malaysia", "Nepal", "Russia", "Saudi Arabia", "UAE", "USA",
];

const COMPANIES = [
  "Al Yousuf Motors", "Awwal Tech", "Energy Improvement", "Fortytwo Labs",
  "Infonet Communication", "Keam Softwares", "Mazenet Solution", "Permi Tech",
  "SapSG & Siga Sys", "SharePro", "System Canada", "TI Systems",
];

const STATIC_GROUPS = [
  { key: "country", label: "Country", labels: COUNTRIES },
  { key: "company", label: "Company", labels: COMPANIES },
];

const VISIBLE_ROWS = 8;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getMeta(tags: string[]) {
  return {
    country: tags.find((t) => COUNTRIES.includes(t)),
    company: tags.find((t) => COMPANIES.includes(t)),
  };
}

export default function BlogBrowser({ posts }: { posts: PostCard[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ country: true, stacks: true });
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<string[]>([]);
  const [livePosts, setLivePosts] = useState<PostCard[] | null>(null);

  useEffect(() => {
    apiFetch("/api/content/posts")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) setLivePosts(data);
      })
      .catch(() => {});
  }, []);

  const items = livePosts ?? posts;

  const groups = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of items) {
      for (const tag of post.tags) counts[tag] = (counts[tag] || 0) + 1;
    }

    const known = new Set(STATIC_GROUPS.flatMap((g) => g.labels));
    const stackLabels = Object.keys(counts)
      .filter((label) => !known.has(label))
      .sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));

    return [
      ...STATIC_GROUPS.map((group) => ({
        ...group,
        labels: group.labels.filter((label) => counts[label]),
      })),
      { key: "stacks", label: "Stacks", labels: stackLabels },
    ].map((group) => ({
      ...group,
      labels: group.labels.map((label) => ({ label, count: counts[label] || 0 })),
    }));
  }, [items]);

  const labelToGroup = useMemo(() => {
    const map: Record<string, string> = {};
    for (const group of groups) {
      for (const { label } of group.labels) map[label] = group.key;
    }
    return map;
  }, [groups]);

  const visiblePosts = useMemo(() => {
    if (active.length === 0) return items;

    const byGroup: Record<string, string[]> = {};
    for (const label of active) {
      const key = labelToGroup[label] || "stacks";
      (byGroup[key] ||= []).push(label);
    }

    return items.filter((post) =>
      Object.values(byGroup).every((labels) =>
        labels.some((label) => post.tags.includes(label))
      )
    );
  }, [items, active, labelToGroup]);

  const toggleFilter = (label: string) =>
    setActive((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 items-start">
      <aside className="lg:col-start-2 lg:row-start-1 bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 lg:sticky lg:top-24 max-h-[70vh] lg:max-h-[calc(100vh-7rem)] overflow-y-auto filter-scroll">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-extrabold tracking-tight">Filters</h2>
          {active.length > 0 && (
            <button
              onClick={() => setActive([])}
              className="text-xs font-semibold text-[#2b7de0] hover:text-white transition-colors"
            >
              Clear all ({active.length})
            </button>
          )}
        </div>

        {groups.map((group) => {
          const isOpen = !!open[group.key];
          const isExpanded = !!expanded[group.key];
          const labels = isExpanded
            ? group.labels
            : group.labels.slice(0, VISIBLE_ROWS);

          return (
            <div key={group.key} className="border-t border-white/5 first:border-t-0">
              <button
                onClick={() => setOpen((prev) => ({ ...prev, [group.key]: !prev[group.key] }))}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-bold">{group.label}</span>
                <span
                  className="text-[#2b7de0] text-xs transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="pb-4 flex flex-wrap gap-2">
                  {labels.map(({ label, count }) => {
                    const isActive = active.includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleFilter(label)}
                        className="px-3 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wide transition-all"
                        style={{
                          background: isActive ? "#065cc2" : "rgba(6, 92, 194, 0.1)",
                          color: isActive ? "#ffffff" : "#2b7de0",
                          border: `1px solid ${isActive ? "#2b7de0" : "rgba(6, 92, 194, 0.2)"}`,
                        }}
                      >
                        {label} ({count})
                      </button>
                    );
                  })}

                  {group.labels.length > VISIBLE_ROWS && (
                    <button
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [group.key]: !prev[group.key],
                        }))
                      }
                      className="w-full text-left text-[11px] font-bold uppercase tracking-wide text-[#2b7de0] hover:text-white transition-colors mt-1"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </aside>

      <div className="lg:col-start-1 lg:row-start-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#5a5a72]">
            {active.length === 0
              ? `${items.length} projects`
              : `${visiblePosts.length} of ${items.length} projects`}
          </p>
        </div>

        {visiblePosts.length === 0 ? (
          <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-10 text-center">
            <p className="text-[#9898b0] text-sm mb-4">
              No projects match the selected filters.
            </p>
            <button
              onClick={() => setActive([])}
              className="text-sm font-semibold text-[#2b7de0] hover:text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visiblePosts.map((post) => {
              const href = post.url || `/blog/${post.slug}`;
              const meta = getMeta(post.tags);
              return (
                <a
                  key={post.slug}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:border-[#065cc2]/30 hover:shadow-[0_20px_40px_rgba(6,92,194,0.12)]"
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden bg-[#0d0d14] border-b border-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold leading-snug mb-3 group-hover:text-[#2b7de0] transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {post.category && (
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/15"
                          style={{ background: "linear-gradient(135deg, #065cc2, #2b7de0)" }}
                        >
                          {post.category}
                        </span>
                      )}
                      {meta.country && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#9898b0] border border-white/10 bg-white/5">
                          {meta.country}
                        </span>
                      )}
                      {meta.company && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#9898b0] border border-white/10 bg-white/5">
                          {meta.company}
                        </span>
                      )}
                    </div>
                    <time dateTime={post.date} className="text-sm text-[#9898b0] mt-auto">
                      on {formatDate(post.date)}
                    </time>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
