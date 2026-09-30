import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data", "admin");
fs.mkdirSync(DATA_DIR, { recursive: true });

function extractArray(file, marker) {
  const s = fs.readFileSync(path.join(ROOT, file), "utf8");
  const i = s.indexOf(marker);
  if (i < 0) throw new Error(`marker not found in ${file}: ${marker}`);
  const start = s.indexOf("[", i);
  const end = s.indexOf("\n];", start);
  if (end < 0) throw new Error(`array end not found in ${file}`);
  return eval(s.slice(start, end + 3));
}

const posts = extractArray("src/data/posts.ts", "export const posts: Post[] = ");
const testimonials = extractArray("src/components/Testimonials.tsx", "const testimonials = ");
const clients = extractArray("src/components/Clients.tsx", "const clients = ");
const team = extractArray("src/components/Team.tsx", "const teamMembers = ");

const postsOut = posts.map((p) => ({ ...p, id: p.slug }));
const testimonialsOut = testimonials.map((t, i) => ({ ...t, id: `t${i + 1}` }));
const clientsOut = clients.map((c, i) => ({ ...c, id: `c${i + 1}` }));
const teamOut = team.map((m, i) => ({ ...m, id: `m${i + 1}` }));

fs.writeFileSync(path.join(DATA_DIR, "posts.json"), JSON.stringify(postsOut, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "testimonials.json"), JSON.stringify(testimonialsOut, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "clients.json"), JSON.stringify(clientsOut, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "team.json"), JSON.stringify(teamOut, null, 2));

console.log(
  `Seeded: ${postsOut.length} posts, ${testimonialsOut.length} testimonials, ${clientsOut.length} clients, ${teamOut.length} team members`
);
