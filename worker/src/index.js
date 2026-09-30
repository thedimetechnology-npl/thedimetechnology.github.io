const COLLECTIONS = ["posts", "testimonials", "clients", "team", "careers", "courses"];
const ALLOWED_ORIGINS = [
  "https://thedimetechnology.com.np",
  "https://thedimetechnology-npl.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function corsHeaders(req) {
  const origin = req.headers.get("Origin") || "";
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (ALLOWED_ORIGINS.includes(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(req, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(req) },
  });
}

function creds(env) {
  return {
    username: env.ADMIN_USERNAME || "",
    password: env.ADMIN_PASSWORD || "",
  };
}

function sessionSecret(env) {
  return env.ADMIN_SESSION_SECRET || "";
}

function b64url(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlJson(obj) {
  return b64url(new TextEncoder().encode(JSON.stringify(obj)));
}

function fromB64url(str) {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

async function hmacSign(payload, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return b64url(new Uint8Array(sig));
}

async function createToken(env) {
  const payload = b64urlJson({ user: creds(env).username, exp: Date.now() + 12 * 60 * 60 * 1000 });
  const sig = await hmacSign(payload, sessionSecret(env));
  return `${payload}.${sig}`;
}

async function verifyToken(req, env) {
  const header = req.headers.get("Authorization") || "";
  if (!header.startsWith("Bearer ")) return null;
  const token = header.slice(7).trim();
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const secret = sessionSecret(env);
  if (!secret) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmacSign(payload, secret);
  if (sig !== expected) return null;
  try {
    const data = JSON.parse(fromB64url(payload));
    if (!data.user || !data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const BLOG_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "–", mdash: "—", hellip: "…", lsquo: "‘", rsquo: "’",
  ldquo: "“", rdquo: "”", copy: "©", reg: "®", trade: "™",
  middot: "·", bull: "•", rarr: "→", larr: "←",
};

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      try { return String.fromCodePoint(parseInt(hex, 16)); } catch { return ""; }
    })
    .replace(/&#(\d+);/g, (_, num) => {
      try { return String.fromCodePoint(Number(num)); } catch { return ""; }
    })
    .replace(/&([a-z]+);/gi, (m, name) => BLOG_ENTITIES[name.toLowerCase()] ?? m);
}

function cleanText(fragment) {
  return decodeEntities(
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
    .map(cleanText)
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

function firstImageUrl(html) {
  const m = (html || "").match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!m) return "";
  let src = m[1];
  if (src.startsWith("//")) src = `https:${src}`;
  else if (src.startsWith("http://")) src = `https:${src.slice(7)}`;
  return src;
}

function makeExcerpt(entry, sections) {
  const summary = entry.summary?.$t ? cleanText(entry.summary.$t.replace(/<[^>]+>/g, " ")) : "";
  const firstParagraph = sections
    .flatMap((s) => s.paragraphs)
    .find((p) => !p.startsWith("• "));
  const source = summary || firstParagraph || "";
  if (source.length <= 200) return source;
  const cut = source.slice(0, 200);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function readTimeFor(sections) {
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

function pickCategory(tags) {
  const topical = tags.find((tag) => !NON_TOPIC_LABELS.has(tag.toLowerCase()));
  return topical || tags[0] || "General";
}

function isBlogspotUrl(u) {
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

function normalizeUrlKey(u) {
  try {
    const x = new URL(u);
    const path = x.pathname.replace(/\/+$/, "");
    const host = x.hostname.toLowerCase().replace(/^www\./, "");
    return host + path;
  } catch {
    return "";
  }
}

function slugFromUrl(href) {
  try {
    const p = new URL(href).pathname.split("/").filter(Boolean).pop() || "";
    return decodeURIComponent(p).replace(/\.html?$/i, "");
  } catch {
    return "";
  }
}

function buildPostFromEntry(entry) {
  const title = cleanText(entry.title?.$t || "Untitled");
  const alt = (entry.link || []).find((l) => l.rel === "alternate");
  const url = alt?.href || "";
  const html = entry.content?.$t || entry.summary?.$t || "";
  let sections = htmlToSections(html);
  const tags = (entry.category || []).map((c) => c.term).filter(Boolean);
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

async function importBlogPost(rawUrl) {
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
    const data = await res.json().catch(() => null);
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

function buildItem(col, body) {
  if (col === "posts") {
    if (!body?.title || typeof body.title !== "string") return { error: "Title is required" };
    const slug =
      (typeof body.slug === "string" && body.slug.trim()) || slugify(body.title);
    return {
      item: {
        id: slug,
        slug,
        title: body.title.slice(0, 200),
        excerpt: String(body.excerpt || "").slice(0, 500),
        date: String(body.date || new Date().toISOString().slice(0, 10)),
        readTime: String(body.readTime || "3 min read"),
        category: String(body.category || "General"),
        tags: Array.isArray(body.tags) ? body.tags.map(String).slice(0, 20) : [],
        sections: Array.isArray(body.sections) ? body.sections : [],
        url: String(body.url || ""),
        image: String(body.image || ""),
      },
    };
  }
  if (col === "careers") {
    if (!body?.title || typeof body.title !== "string") return { error: "Title is required" };
    return {
      item: {
        id: `car${Date.now()}`,
        title: body.title.slice(0, 150),
        department: String(body.department || "").slice(0, 80),
        location: String(body.location || "").slice(0, 100),
        type: String(body.type || "Full-time").slice(0, 50),
        experience: String(body.experience || "").slice(0, 50),
        description: String(body.description || "").slice(0, 2000),
        requirements: Array.isArray(body.requirements)
          ? body.requirements.map((r) => String(r).slice(0, 200)).slice(0, 20)
          : [],
        applyUrl: String(body.applyUrl || ""),
        active: body.active !== false,
      },
    };
  }
  if (col === "courses") {
    if (!body?.title || typeof body.title !== "string") return { error: "Title is required" };
    return {
      item: {
        id: `crs${Date.now()}`,
        title: body.title.slice(0, 150),
        category: String(body.category || "").slice(0, 80),
        level: String(body.level || "Beginner").slice(0, 50),
        duration: String(body.duration || "").slice(0, 50),
        mode: String(body.mode || "Online").slice(0, 50),
        price: String(body.price || "").slice(0, 50),
        description: String(body.description || "").slice(0, 2000),
        topics: Array.isArray(body.topics)
          ? body.topics.map((t) => String(t).slice(0, 200)).slice(0, 30)
          : [],
        enrollUrl: String(body.enrollUrl || ""),
        active: body.active !== false,
      },
    };
  }
  if (col === "testimonials") {
    if (!body?.name || typeof body.name !== "string") return { error: "Name is required" };
    return {
      item: {
        id: `t${Date.now()}`,
        name: body.name.slice(0, 100),
        location: String(body.location || ""),
        rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
        feedback: String(body.feedback || "").slice(0, 1000),
        image: String(body.image || ""),
        company: String(body.company || ""),
        designation: String(body.designation || ""),
      },
    };
  }
  if (col === "clients") {
    if (!body?.name || typeof body.name !== "string") return { error: "Name is required" };
    return {
      item: {
        id: `c${Date.now()}`,
        name: body.name.slice(0, 100),
        logo: String(body.logo || ""),
      },
    };
  }
  if (col === "team") {
    if (!body?.name || typeof body.name !== "string") return { error: "Name is required" };
    return {
      item: {
        id: `m${Date.now()}`,
        name: body.name.slice(0, 100),
        role: String(body.role || ""),
        experience: String(body.experience || ""),
        tech: Array.isArray(body.tech) ? body.tech.map(String).slice(0, 10) : [],
        photo: String(body.photo || ""),
        category: String(body.category || "software"),
        founder: Boolean(body.founder),
      },
    };
  }
  return { error: "Unknown collection" };
}

async function listItems(db, col) {
  const rs = await db
    .prepare("SELECT data FROM content WHERE collection = ? ORDER BY sort_order ASC")
    .bind(col)
    .all();
  const items = [];
  for (const row of rs.results || []) {
    try {
      items.push(JSON.parse(row.data));
    } catch {
      // skip malformed rows
    }
  }
  return items;
}

async function nextSort(db, col) {
  const row = await db
    .prepare("SELECT COALESCE(MIN(sort_order), 0) AS m FROM content WHERE collection = ?")
    .bind(col)
    .first();
  return (row?.m ?? 0) - 1;
}

async function getItem(db, col, id) {
  const row = await db
    .prepare("SELECT data FROM content WHERE collection = ? AND id = ?")
    .bind(col, id)
    .first();
  if (!row) return null;
  try {
    return JSON.parse(row.data);
  } catch {
    return null;
  }
}

async function putContent(db, col, id, data, sort) {
  await db
    .prepare(
      "INSERT INTO content (collection, id, sort_order, data) VALUES (?, ?, ?, ?) " +
        "ON CONFLICT(collection, id) DO UPDATE SET data = excluded.data, sort_order = excluded.sort_order"
    )
    .bind(col, id, sort, data)
    .run();
}

async function handleAdmin(req, env, col, id) {
  const session = await verifyToken(req, env);
  if (!session) return json(req, { error: "Unauthorized" }, 401);
  const db = env.DB;

  if (req.method === "GET" && !id) {
    return json(req, await listItems(db, col));
  }

  if (req.method === "POST" && !id) {
    const body = await req.json().catch(() => null);
    const built = buildItem(col, body || {});
    if ("error" in built) return json(req, { error: built.error }, 400);
    const sort = await nextSort(db, col);
    await putContent(db, col, built.item.id, JSON.stringify(built.item), sort);
    return json(req, built.item, 201);
  }

  if (req.method === "PUT" && id) {
    const body = await req.json().catch(() => null);
    if (!body) return json(req, { error: "Invalid body" }, 400);
    const old = await getItem(db, col, id);
    if (!old) return json(req, { error: "Not found" }, 404);
    const merged = { ...old, ...body, id };
    const row = await db
      .prepare("SELECT sort_order FROM content WHERE collection = ? AND id = ?")
      .bind(col, id)
      .first();
    await putContent(db, col, id, JSON.stringify(merged), row?.sort_order ?? 0);
    return json(req, merged);
  }

  if (req.method === "DELETE" && id) {
    const res = await db
      .prepare("DELETE FROM content WHERE collection = ? AND id = ?")
      .bind(col, id)
      .run();
    if (!res.meta?.changes) return json(req, { error: "Not found" }, 404);
    return json(req, { ok: true });
  }

  return json(req, { error: "Not found" }, 404);
}

async function handleContent(req, env, col, id) {
  if (req.method !== "GET") return json(req, { error: "Method not allowed" }, 405);
  const db = env.DB;
  if (!id) {
    let items = await listItems(db, col);
    if (col === "careers" || col === "courses") {
      items = items.filter((i) => i.active !== false);
    }
    if (col === "posts") {
      items = items.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        readTime: p.readTime,
        category: p.category,
        tags: p.tags || [],
        url: p.url || "",
        image: p.image || "",
      }));
    }
    return json(req, items);
  }
  const item = await getItem(db, col, id);
  if (!item) return json(req, { error: "Not found" }, 404);
  return json(req, item);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "");
    const parts = path.split("/").filter(Boolean);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(req) });
    }

    try {
      if (parts.length === 0) return json(req, { ok: true, service: "dime-api" });

      if (path === "/api/admin/login" && req.method === "POST") {
        const body = await req.json().catch(() => ({}));
        const { username, password } = creds(env);
        if (!username || !password || !sessionSecret(env)) {
          return json(req, { error: "Admin login is not configured" }, 500);
        }
        if (body.username !== username || body.password !== password) {
          return json(req, { error: "Invalid username or password" }, 401);
        }
        return json(req, { ok: true, token: await createToken(env) });
      }

      if (path === "/api/admin/logout" && req.method === "POST") {
        return json(req, { ok: true });
      }

      if (path === "/api/admin/me" && req.method === "GET") {
        const session = await verifyToken(req, env);
        if (!session) return json(req, { error: "Unauthorized" }, 401);
        return json(req, { user: session.user });
      }

      if (path === "/api/admin/sync" && req.method === "POST") {
        return json(req, { error: "Sync is not available with the cloud backend" }, 400);
      }

      if (path === "/api/admin/posts/fetch" && req.method === "POST") {
        const session = await verifyToken(req, env);
        if (!session) return json(req, { error: "Unauthorized" }, 401);
        const body = await req.json().catch(() => ({}));
        try {
          return json(req, await importBlogPost(String(body.url || "")));
        } catch (err) {
          return json(req, { error: err?.message || "Import failed" }, 400);
        }
      }

      if (parts[0] === "api" && parts[1] === "admin" && parts[2] && COLLECTIONS.includes(parts[2])) {
        return await handleAdmin(req, env, parts[2], parts[3] ? decodeURIComponent(parts[3]) : undefined);
      }

      if (parts[0] === "api" && parts[1] === "content" && parts[2] && COLLECTIONS.includes(parts[2])) {
        return await handleContent(req, env, parts[2], parts[3] ? decodeURIComponent(parts[3]) : undefined);
      }

      return json(req, { error: "Not found" }, 404);
    } catch (err) {
      return json(req, { error: err?.message || "Internal error" }, 500);
    }
  },
};
