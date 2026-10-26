<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes: peartreecompanies.com

- Copy rules: US English spelling, no em dashes, and no filler or invented facts. Unknown facts stay as bracketed placeholders like `[YEAR]`.
- Content lives in `src/content/` (companies, site settings, team). Page sections are in `src/components/home/` and the page files.
- Style with the tokens in `src/app/globals.css` (`text-ink`, `bg-paper`, `border-rule`, `text-display-lg`, `stretch-118`, `section-y`, `shell`, `gutter`). Don't add raw hex colors.
- Keep pages prerenderable: no `new Date()`, `Math.random()`, cookies or headers in Server Components without `"use cache"` or a Suspense boundary.
- Run `npm run build` and `npm run lint` before committing; both must pass clean.
