import fs from "node:fs/promises";

const BLOG = "https://freelancer-shahid.blogspot.com";
const OUT = new URL("../src/data/posts.ts", import.meta.url);

async function fetchAllEntries() {
  const entries = [];
  let start = 1;
  for (let page = 0; page < 20; page++) {
    const url = `${BLOG}/feeds/posts/default?alt=json&max-results=500&start-index=${start}`;
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`feed request failed: ${res.status}`);
    const data = await res.json();
    const feed = data.feed || {};
    const batch = feed.entry || [];
    entries.push(...batch);
    const total = Number(feed.openSearch$totalResults?.$t || 0);
    if (batch.length === 0 || entries.length >= total) break;
    start += batch.length;
  }
  return entries;
}

const NAMED = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "–", mdash: "—", hellip: "…", lsquo: "‘", rsquo: "’",
  ldquo: "“", rdquo: "”", copy: "©", reg: "®", trade: "™",
  middot: "·", bull: "•", rarr: "→", larr: "←",
};

function decode(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      try { return String.fromCodePoint(parseInt(hex, 16)); } catch { return ""; }
    })
    .replace(/&#(\d+);/g, (_, num) => {
      try { return String.fromCodePoint(Number(num)); } catch { return ""; }
    })
    .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m);
}

function clean(fragment) {
  return decode(
    fragment
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function splitBlocks(fragment) {
  return fragment
    .split(/<br\s*\/?>|<\/div>|<\/p>|<\/tr>|<\/h[1-6]>|<hr\s*\/?>/i)
    .map(clean)
    .filter((text) => text && text.length > 1);
}

function htmlToSections(html) {
  const sections = [];
  let current = { heading: "", paragraphs: [] };
  let lastIndex = 0;

  const flush = () => {
    if (current.heading || current.paragraphs.length) sections.push(current);
    current = { heading: "", paragraphs: [] };
  };

  const pushGap = (gapHtml) => {
    current.paragraphs.push(...splitBlocks(gapHtml));
  };

  const re = /<(h[1-4])[^>]*>([\s\S]*?)<\/\1>|<p[^>]*>([\s\S]*?)<\/p>|<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    pushGap(html.slice(lastIndex, match.index));
    lastIndex = re.lastIndex;

    if (match[1]) {
      flush();
      current = { heading: clean(match[2]), paragraphs: [] };
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

function plainText(html) {
  return clean(html.replace(/<[^>]+>/g, " "));
}

function slugFrom(entry) {
  const link = (entry.link || []).find((l) => l.rel === "alternate");
  if (!link?.href) return "";
  const last = link.href.split("?")[0].split("#")[0].split("/").filter(Boolean).pop() || "";
  return decodeURIComponent(last).replace(/\.html?$/i, "");
}

function firstImage(html) {
  const m = (html || "").match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : "";
}

function makeExcerpt(entry, sections) {
  const summary = entry.summary?.$t ? plainText(entry.summary.$t) : "";
  const firstParagraph = sections
    .flatMap((s) => s.paragraphs)
    .find((p) => !p.startsWith("• "));
  const source = summary || firstParagraph || "";
  if (source.length <= 200) return source;
  const cut = source.slice(0, 200);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function readTime(sections) {
  const words = sections
    .flatMap((s) => s.paragraphs)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
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

function pickCategory(tags) {
  const topical = tags.find((tag) => !NON_TOPIC_LABELS.has(tag.toLowerCase()));
  return topical || tags[0] || "General";
}

const entries = await fetchAllEntries();

const seen = new Set();
const posts = entries
  .map((entry) => {
    const title = clean(entry.title?.$t || "Untitled");
    const rawSlug = slugFrom(entry) || slugify(title);
    let slug = rawSlug;
    let n = 2;
    while (seen.has(slug)) slug = `${rawSlug}-${n++}`;
    seen.add(slug);

    const html = entry.content?.$t || entry.summary?.$t || "";
    let sections = htmlToSections(html);
    const tags = (entry.category || []).map((c) => c.term).filter(Boolean);
    const excerpt = makeExcerpt(entry, sections);
    if (sections.length === 0) sections = [{ heading: "", paragraphs: [excerpt] }];
    const altLink = (entry.link || []).find((l) => l.rel === "alternate");

    return {
      slug,
      title,
      excerpt,
      date: (entry.published?.$t || entry.updated?.$t || "").slice(0, 10),
      readTime: readTime(sections),
      category: pickCategory(tags),
      tags: tags.length ? tags : ["General"],
      url: altLink?.href || "",
      image: firstImage(html),
      sections,
    };
  })
  .filter((p) => p.date)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const file = `// Auto-generated by scripts/import-blog.mjs from ${BLOG}
export type PostSection = {
  heading: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url?: string;
  image?: string;
  sections: PostSection[];
};

export const posts: Post[] = ${JSON.stringify(posts, null, 2)};

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
`;

await fs.writeFile(OUT, file, "utf8");
console.log(`Imported ${posts.length} posts -> src/data/posts.ts`);
