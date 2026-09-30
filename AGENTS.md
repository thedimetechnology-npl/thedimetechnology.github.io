<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Workflow (user rule — always follow)

1. **Modify locally first.** Make and verify changes in the local dev environment.
2. **Do NOT commit or push unless the user explicitly says "push to git"** (or equivalent).
3. When told to push: commit → `git push origin main` → the GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the static export and auto-deploys to GitHub Pages → **live at https://thedimetechnology.com.np** in ~2–4 min. Watch the workflow run and verify the live site after every push.

## Project memory

- **Repo:** `themedimetechnology-npl/themedimetechnology.github.io`, branch `main`. Custom domain `thedimetechnology.com.np` on GitHub Pages (DNS: GH A records 185.199.108–111.153, grey cloud, Enforce HTTPS on).
- **Backend:** Cloudflare Worker `dime-api` in `worker/` (https://dime-api.info-thedimetechnology.workers.dev) + D1 `dime-content` (`f45bb347-5456-4d92-90aa-19f4a26f0f6f`). Redeploy: `npx wrangler deploy` (cwd `worker/`). Bearer-token auth (localStorage `dime_token`); admin creds come from wrangler secrets `ADMIN_USERNAME`/`ADMIN_PASSWORD` (cloud) and `ADMIN_USERNAME`/`ADMIN_PASSWORD` in `.env.local` (local Next routes fallback) — never stored in this file. `ADMIN_SESSION_SECRET` is a wrangler secret. Admin panel: `/admin`.
- **Data flow:** every `/api/*` call goes through `src/lib/api.ts` → `apiFetch`. Production base = `NEXT_PUBLIC_API_BASE` (set in deploy.yml). Local dev base = `.env.local` (gitignored) → same cloud Worker; **delete `.env.local` to fall back** to local Next API routes + `data/admin/*.json` (JSON files are also the static-build seed — D1 is the live store, JSON changes only affect the next build).
- **Commands:** dev `npm run dev` (stop it before static build), lint `npm run lint`, types `npx tsc --noEmit`, static build `npm run build:static` (excludes `src/app/api` automatically, restores it after).
- **Content:** blog imported from blogspot via `scripts/import-blog.mjs` (posts carry `url`/`image`; cards open blogspot originals in new tab; blog detail pages are static — post-body edits go live on next deploy). Contact form → Formspree `https://formspree.io/f/mgavdrrz`.
- **Environment notes:** PowerShell 5.1 mangles UTF-8 with Get-Content/Set-Content (`…`/`—`/`★`) — write temp scripts as `.cjs` under `%TEMP%\opencode` instead. `next lint` convention: plain `<img>` needs `{/* eslint-disable-next-line @next/next/no-img-element */}`.
