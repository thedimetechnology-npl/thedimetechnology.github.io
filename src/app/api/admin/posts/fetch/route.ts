import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";

type Section = { heading: string; paragraphs: string[] };

type FeedLink = { rel?: string; href?: string };
type FeedEntry = {
  title?: { $t?: string };
  content?: { $t?: string };
  summary?: { $t?: string };
  published?: { $t?: string };
  updated?: { $t?: string };
  category?: { term?: string }[];
  link?: FeedLink[];
};
type FeedResponse = {
  feed?: {
    entry?: FeedEntry[];
    openSearch$totalResults?: { $t?: string };
  };
};

const BLOG_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "–", mdash: "—", hellip: "…", lsquo: "‘", rsquo: "’",
  ldquo: "“", rdquo: "”", copy: "©", reg: "®", trade: "™",
  middot: "·", bull: "•", rarr: "→", larr: "←",
};

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      try { return String.fromCodePoint(parseInt(hex, 16)); } catch { return ""; }
    })
    .replace(/&#(\d+);/g, (_, num) => {
      try { return String.fromCodePoint(Number(num)); } catch { return ""; }
    })
    .replace(/&([a-z]+);/gi, (m, name) => BLOG_ENTITIES[name.toLowerCase()] ?? m);
}

function cleanText(fragment: string): string {
  return decodeEntities(
    fragment
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function splitBlocks(fragment: string): string[] {
  return fragment
    .split(/<br\s*\/?>|<\/div>|<\/p>|<\/tr>|<\/h[1-6]>|<hr\s*\/?>/i)
    .map(cleanText)
    .filter((text) => text && text.length > 1);
}

function htmlToSections(html: string): Section[] {
  const sections: Section[] = [];
  let current: Section = { heading: "", paragraphs: [] };
  let lastIndex = 0;

  const flush = () => {
    if (current.heading || current.paragraphs.length) sections.push(current);
    current = { heading: "", paragraphs: [] };
  };

  const pushGap = (gapHtml: string) => {
    current.paragraphs.push(...splitBlocks(gapHtml));
  };

  const re = /<(h[1-4])[^>]*>([\s\S]*?)<\/\1>|<p[^>]*>([\s\S]*?)<\/p>|<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    pushGap(html.slice(lastIndex, match.index));
    lastIndex = re.lastIndex;

    if (match[1]) {
      flush();
      current = { heading: cleanText(match[2]), paragraphs: [] };
    } else if (match[3] !== undefined) {
      current.paragraphs.push(...splitBlocks(match[3]));
    } else if (match[4] !== undefined) {
      for (const text of splitBlocks(match[4])) current.paragraphs.push(`• ${text}`);
    }
  }
  pushGap(html.slice(lastIndex));

  return sections
    .concat(current.paragraphs.length || current.heading ? [current] : [])
    .filter((s) => s.paragraphs.length > 0);
}

function firstImageUrl(html: string): string {
  const m = (html || "").match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!m) return "";
  let src = m[1];
  if (src.startsWith("//")) src = `https:${src}`;
  else if (src.startsWith("http://")) src = `https:${src.slice(7)}`;
  return src;
}

function makeExcerpt(entry: FeedEntry, sections: Section[]): string {
  const summary = entry.summary?.$t
    ? cleanText(entry.summary.$t.replace(/<[^>]+>/g, " "))
    : "";
  const firstParagraph = sections
    .flatMap((s) => s.paragraphs)
    .find((p) => !p.startsWith("• "));
  const source = summary || firstParagraph || "";
  if (source.length <= 200) return source;
  const cut = source.slice(0, 200);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function readTimeFor(sections: Section[]): string {
  const words = sections
    .flatMap((s) => s.paragraphs)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

const NON_TOPIC_LABELS = new Set(
  [
    "Australia", "Canada", "Chile", "Croatia", "Cyprus", "India", "Jordan",
    "Kazakhstan", "Malaysia", "Nepal", "Russia", "Saudi Arabia", "UAE", "USA",
    "United States", "United Arab Emirates", "United Kingdom", "UK", "New Zealand",
    "Al Yousuf Motors", "Awwal Tech", "Energy Improvement", "Fortytwo Labs",
    "Infonet Communication", "Keam Softwares", "Mazenet Solution", "Permi Tech",
    "SapSG & Siga Sys", "SharePro", "TI Systems", "ZKTEco", "Zoho",
  ].map((s) => s.toLowerCase())
);

function pickCategory(tags: string[]): string {
  const topical = tags.find((tag) => !NON_TOPIC_LABELS.has(tag.toLowerCase()));
  return topical || tags[0] || "General";
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function isBlogspotUrl(u: string): boolean {
  try {
    const x = new URL(u);
    return (
      (x.protocol === "https:" || x.protocol === "http:") &&
      /\.blogspot\./i.test(x.hostname)
    );
  } catch {
    return false;
  }
}

function normalizeUrlKey(u: string): string {
  try {
    const x = new URL(u);
    const path = x.pathname.replace(/\/+$/, "");
    const host = x.hostname.toLowerCase().replace(/^www\./, "");
    return host + path;
  } catch {
    return "";
  }
}

function slugFromUrl(href: string): string {
  try {
    const p = new URL(href).pathname.split("/").filter(Boolean).pop() || "";
    return decodeURIComponent(p).replace(/\.html?$/i, "");
  } catch {
    return "";
  }
}

function buildPostFromEntry(entry: FeedEntry) {
  const title = cleanText(entry.title?.$t || "Untitled");
  const alt = (entry.link || []).find((l) => l.rel === "alternate");
  const url = alt?.href || "";
  const html = entry.content?.$t || entry.summary?.$t || "";
  let sections = htmlToSections(html);
  const tags = (entry.category || []).map((c) => c.term).filter(Boolean) as string[];
  const excerpt = makeExcerpt(entry, sections);
  if (sections.length === 0) sections = [{ heading: "", paragraphs: [excerpt] }];
  return {
    slug: slugFromUrl(url) || slugify(title),
    title,
    excerpt,
    date: (entry.published?.$t || entry.updated?.$t || "").slice(0, 10),
    readTime: readTimeFor(sections),
    category: pickCategory(tags),
    tags: tags.length ? tags : ["General"],
    url,
    image: firstImageUrl(html),
    sections,
  };
}

async function importBlogPost(rawUrl: string) {
  if (!rawUrl || !isBlogspotUrl(rawUrl)) {
    throw new Error("Enter a valid blogspot post URL (https://...blogspot.com/...)");
  }
  const target = normalizeUrlKey(rawUrl);
  const host = new URL(rawUrl).hostname;
  const feedBase = `https://${host}/feeds/posts/default`;
  let start = 1;
  for (let page = 0; page < 10; page++) {
    const res = await fetch(
      `${feedBase}?alt=json&max-results=500&start-index=${start}`,
      { headers: { accept: "application/json" }, signal: AbortSignal.timeout(20000) }
    );
    if (!res.ok) throw new Error(`Blog feed request failed (${res.status})`);
    const data = (await res.json().catch(() => null)) as FeedResponse | null;
    const feed = data?.feed || {};
    const entries = feed.entry || [];
    if (!entries.length) break;
    for (const entry of entries) {
      const alt = (entry.link || []).find((l) => l.rel === "alternate");
      if (alt?.href && normalizeUrlKey(alt.href) === target) {
        return buildPostFromEntry(entry);
      }
    }
    const total = Number(feed.openSearch$totalResults?.$t || 0);
    start += entries.length;
    if (start > total) break;
  }
  throw new Error("Post not found on this blog");
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { url?: string };
  try {
    return NextResponse.json(await importBlogPost(String(body.url || "")));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Import failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
