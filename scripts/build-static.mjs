import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src", "app", "api");
const disabledDir = path.join(root, ".api-disabled");

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
