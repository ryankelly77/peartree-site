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
| Open Graph / Twitter share image | `src/app/opengraph-image.tsx` |
| 404 handling for unknown company slugs | `src/proxy.ts` |

### Add or change a company

Edit `src/content/companies.ts`. A company appears as a card on the home page and in the footer. Add a `story` to give it its own page at `/portfolio/<slug>`; the page, the sitemap entry and the 404 guard pick it up automatically.

Logos go in `public/logos/` as WebP sized about 2x their display height. Set `plate: "dark"` for a logo made for a dark background (Raptor's is white).

## Design notes

- Palette comes from the logo: bark brown `#4e3c11`, ink `#211b0f`, pear gold `#c9a13f` on paper `#f6f2e9`. All tokens are in `globals.css` under `@theme`.
- Headlines use Archivo's width axis: `stretch-118` and friends set `font-stretch`. Display sizes are `text-display-xl`, `-lg`, `-md`, `-cta` and `-company`.
- Section labels use `<Eyebrow>`, section titles `<SectionHeader>`, buttons `<ButtonLink>` (all in `src/components/ui.tsx`).
- The original design canvas is the source of truth for layout and copy.

### The share image

`src/app/opengraph-image.tsx` renders the 1200x630 card at build time with `ImageResponse`, and the root layout's metadata picks it up for every route as both `og:image` and `twitter:image`.

Satori, which backs `ImageResponse`, only parses TTF, OTF and WOFF fonts, and it draws PNG and JPEG but skips WebP without erroring. The site's own `archivo-latin-wdth.woff2` and `peartree-companies-logo.webp` can't be used there, so the route reads two assets built for it alone:

- `src/fonts/archivo-og-bold.ttf` - Archivo pinned to the headline's axes (`wght` 750, `wdth` 118), so the card matches the hero's `font-[750] stretch-118`. Satori can't apply variable axes itself, and the full variable font crashes its parser.
- `public/brand/peartree-companies-logo.png` - a PNG copy of the brand logo.

Regenerate both from the originals if the brand assets change; everything else on the card is styled inline in the route.

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

| Placeholder | File | Line |
| --- | --- | --- |
| `[ONE-LINE BIO FOR TRACIE]` | `src/content/site.ts` | 31 |
| `Co-founded with Cristian [LAST NAME]` | `src/content/companies.ts` | 131 |
| `[YEAR]` - the year Raptor Vending started | `src/content/companies.ts` | 133 |
| `[PHOTO: Raptor fridge and meal display in a building lobby]` - set `story.photo.src` to replace the placeholder tile | `src/content/companies.ts` | 138 |
| `Launching [DATE]` - EDIAGD launch date | `src/content/companies.ts` | 201 |
| `[YEARS]` - how long Mitch Hardt has coached service advisors | `src/components/home/field-notes.tsx` | 8 |

## Launch checklist

### Environment variables to set in Vercel

Set all three for Production, Preview and Development. Values come from `.env.example`.

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://peartreecompanies.com` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-WLHPDWV7` (the container already on the WordPress site) |
| `INQUIRY_WEBHOOK_URL` | *blank until the HighLevel inbound webhook URL is ready* |

`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GTM_ID` are read at build time, so changing either needs a redeploy. Until `INQUIRY_WEBHOOK_URL` is set, production form submissions fail with a message to the visitor, so fill it before announcing the site.

### Remaining steps

- [ ] Fill the placeholders above
- [ ] Set the three environment variables
- [x] Crawl the WordPress site for URLs worth redirecting - done, and there are none. That site is a one-pager; its only other URLs are dummy posts, category archives, the feed, attachment pages and three unlisted pages, none of it indexed. The homepage keeps its URL, so no `redirects()` entry is needed.
- [ ] The WordPress site is set to noindex; this one is indexable, so check robots.txt and the sitemap after the DNS switch
- [x] Add an Open Graph image - `src/app/opengraph-image.tsx`
- [ ] After the DNS switch, re-check the share card with a scraper (LinkedIn Post Inspector, X card validator) so the old WordPress preview isn't cached
