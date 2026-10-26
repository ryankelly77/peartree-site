# peartreecompanies.com

The PearTree Companies site, rebuilt off WordPress. Next.js 16 (App Router, Cache Components), Tailwind CSS 4, TypeScript. Every page is prerendered to static HTML.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in INQUIRY_WEBHOOK_URL
npm run dev                  # http://localhost:3000
npm run build && npm run start
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Portfolio companies (cards, company pages, footer, sitemap, structured data) | `src/content/companies.ts` |
| Site settings, main nav, team | `src/content/site.ts` |
| Home page sections | `src/components/home/*` |
| How we partner page | `src/app/partner/page.tsx` |
| Company page template | `src/app/portfolio/[slug]/page.tsx` |
| Inquiry form (client) and server action | `src/components/inquiry-form.tsx`, `src/app/actions.ts` |
| Design tokens, type scale, base styles | `src/app/globals.css` |
| Fonts (self-hosted Archivo variable + IBM Plex Mono) | `src/fonts/`, `src/app/fonts.ts` |
| Logos | `public/brand/`, `public/logos/` |
| 404 handling for unknown company slugs | `src/proxy.ts` |

### Add or change a company

Edit `src/content/companies.ts`. A company appears as a card on the home page and in the footer. Add a `story` to give it its own page at `/portfolio/<slug>`; the page, the sitemap entry and the 404 guard pick it up automatically.

Logos go in `public/logos/` as WebP sized about 2x their display height. Set `plate: "dark"` for a logo made for a dark background (Raptor's is white).

## Design notes

- Palette comes from the logo: bark brown `#4e3c11`, ink `#211b0f`, pear gold `#c9a13f` on paper `#f6f2e9`. All tokens are in `globals.css` under `@theme`.
- Headlines use Archivo's width axis: `stretch-118` and friends set `font-stretch`. Display sizes are `text-display-xl`, `-lg`, `-md`, `-cta` and `-company`.
- Section labels use `<Eyebrow>`, section titles `<SectionHeader>`, buttons `<ButtonLink>` (all in `src/components/ui.tsx`).
- The original design canvas is the source of truth for layout and copy.

## Forms

Both forms post to the `submitInquiry` server action, which validates with zod, drops honeypot submissions, and forwards JSON to `INQUIRY_WEBHOOK_URL`:

```json
{ "source": "home" | "partner", "name": "", "email": "", "company": "", "industry": "",
  "goal": "launch|build|sell|buy|other", "stage": "idea|customers|prototype|live",
  "message": "", "site": "peartreecompanies.com", "submittedAt": "ISO date" }
```

## Next 16 specifics worth knowing

- `cacheComponents` and `partialPrefetching` are on (see `next.config.ts`). Calling `new Date()` during prerender is a build error, which is why the footer year is a `"use cache"` component.
- The header takes the active nav item as a prop from each page instead of reading the pathname in the layout. That would need a Suspense boundary.
- `src/proxy.ts` is the Next 16 name for middleware.
- Read `node_modules/next/dist/docs/` before using an API from memory (see `AGENTS.md`).

## Placeholders to fill

Search the repo for `[` to find them: Tracie's bio, Cristian's last name, Raptor's start year, Mitch's years coaching, the EDIAGD launch date, and the Raptor lobby photo (`story.photo.src` in `companies.ts`).

## Launch checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GTM_ID` and `INQUIRY_WEBHOOK_URL` in Vercel
- [ ] Fill the placeholders above
- [ ] Crawl the current WordPress site and add 301 redirects in `next.config.ts` for any URLs worth keeping
- [ ] The WordPress site is set to noindex; this one is indexable, so check robots.txt and the sitemap after the DNS switch
- [ ] Add an Open Graph image (`src/app/opengraph-image.png`)
