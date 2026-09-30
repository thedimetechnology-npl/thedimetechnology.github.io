import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src", "app", "api");
const disabledDir = path.join(root, ".api-disabled");
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dime-api.info-thedimetechnology.workers.dev";

function restore() {
  if (fs.existsSync(disabledDir) && !fs.existsSync(apiDir)) {
    fs.renameSync(disabledDir, apiDir);
    console.log("API routes restored");
  }
}

restore();

if (!fs.existsSync(apiDir)) {
  console.error("src/app/api not found");
  process.exit(1);
}

for (const sig of ["SIGINT", "SIGTERM", "exit"]) {
  process.on(sig, restore);
}

async function fetchList(col) {
  const res = await fetch(`${API_BASE}/api/content/${col}`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`${col}: HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error(`${col}: unexpected payload`);
  return data;
}

async function fetchItem(col, id) {
  const res = await fetch(`${API_BASE}/api/content/${col}/${encodeURIComponent(id)}`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`${col}/${id}: HTTP ${res.status}`);
  return res.json();
}

function postsFile(posts) {
  return `// Synced from the admin panel — do not edit directly.
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

export const posts: Post[] = ${JSON.stringify(
    posts,
    (key, value) => (key === "id" ? undefined : value),
    2
  )};

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
`;
}

// Refresh build seeds from the live backend so the static HTML matches what the
// client-side content fetch returns (otherwise lists visibly swap on page load).
async function syncSeedsFromApi() {
  try {
    const careers = await fetchList("careers");
    if (careers.length > 0) {
      fs.writeFileSync(
        path.join(root, "data", "admin", "careers.json"),
        JSON.stringify(careers, null, 2) + "\n"
      );
      console.log(`Seed synced from API: careers (${careers.length})`);
    } else {
      console.warn("API returned no careers — keeping existing careers seed");
    }
  } catch (err) {
    console.warn(`Careers seed sync failed (${err.message}) — keeping existing seed`);
  }

  try {
    const list = await fetchList("posts");
    if (list.length > 0) {
      const full = await Promise.all(list.map((p) => fetchItem("posts", p.id)));
      const clean = full.filter((p) => p && p.slug);
      fs.writeFileSync(
        path.join(root, "data", "admin", "posts.json"),
        JSON.stringify(clean, null, 2) + "\n"
      );
      fs.writeFileSync(path.join(root, "src", "data", "posts.ts"), postsFile(clean));
      console.log(`Seed synced from API: posts (${clean.length})`);
    } else {
      console.warn("API returned no posts — keeping existing posts seed");
    }
  } catch (err) {
    console.warn(`Posts seed sync failed (${err.message}) — keeping existing seed`);
  }
}

await syncSeedsFromApi();

fs.renameSync(apiDir, disabledDir);
console.log("API routes excluded from static export (admin panel is dev-only)");

// Stale dev-server type definitions reference the moved API routes
fs.rmSync(path.join(root, ".next"), { recursive: true, force: true });

try {
  execSync("npx next build", {
    stdio: "inherit",
    cwd: root,
    env: { ...process.env, NEXT_OUTPUT: "export" },
  });
} finally {
  restore();
}
