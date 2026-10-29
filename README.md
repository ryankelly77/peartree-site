# peartreecompanies.com

The PearTree Companies site, rebuilt off WordPress. Next.js 16 (App Router, Cache Components), Tailwind CSS 4, TypeScript. Every page is prerendered to static HTML.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in SLACK_WEBHOOK_URL
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

Logos go in `public/logos/` as WebP with a transparent background, sized about 2x their display height. Every company is on `plate: "light"` (a white panel) today; set `plate: "dark"` instead for a mark drawn in white, which would otherwise disappear.

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

Both forms post to the `submitInquiry` server action, which validates with zod, drops honeypot submissions, and posts a Block Kit message to the Slack incoming webhook at `SLACK_WEBHOOK_URL`. It gives up after 10 seconds.

The message is built in `src/lib/slack-inquiry.ts`:

- a header, `New inquiry: home page` or `New inquiry: partner page`
- a fields block with name and email (as a `mailto:` link), plus company, industry, goal and stage when the visitor supplied them
- the message in its own section, cut to Slack's 3,000-character section limit
- a context line with the submit time in Central
- a `text` fallback, `New inquiry from <name> (<email>)`, for notifications and clients that don't render blocks

Goal and stage print the labels the form shows, not the stored values. Those labels, the values and the zod enums all come from `src/content/inquiry.ts`, so a label can't drift out of sync with what arrives in Slack.

Everything the visitor typed runs through `escapeSlack` first, which encodes `&`, `<` and `>`. That is what keeps a submitted `<!channel>` or `<https://example.com|click>` rendering as plain text instead of a mention or a link.

Without `SLACK_WEBHOOK_URL` the action logs the message it would have sent and reports success in development, and fails with a visitor-facing message in production.

On a successful submit the client pushes one GTM event per submission:

```js
window.dataLayer?.push({ event: "inquiry_submitted", form_source: "home" | "partner" })
```

`dataLayer` only exists when `NEXT_PUBLIC_GTM_ID` is set, so the push is a no-op otherwise. Use `inquiry_submitted` as the trigger for the conversion tag in GTM.

## Next 16 specifics worth knowing

- `cacheComponents` and `partialPrefetching` are on (see `next.config.ts`). Calling `new Date()` during prerender is a build error, which is why the footer year is a `"use cache"` component.
- The header takes the active nav item as a prop from each page instead of reading the pathname in the layout. That would need a Suspense boundary.
- `src/proxy.ts` is the Next 16 name for middleware.
- Read `node_modules/next/dist/docs/` before using an API from memory (see `AGENTS.md`).

## Placeholders

None remain. Facts that were still unknown were taken out rather than written as bracketed text, so the copy reads as finished:

| Was | Now | To restore it |
| --- | --- | --- |
| Tracie's bio | Her card shows name and role only | Add `bio` back to her entry in `src/content/site.ts`; it is optional on `TeamMember` |
| Cristian's last name | Raptor's "Relationship" fact reads "Co-founded with Cristian" | Add the surname to that value in `story.facts` |
| Year Raptor started | The "Started" fact is gone | Add `{ label: "Started", value: "<year>" }` to `story.facts` |
| Mitch's years coaching | "Mitch Hardt coaches dealership service advisors" | Reword with the number in `src/components/home/field-notes.tsx` |
| EDIAGD launch date | The card footer shows one item instead of two | Add `{ text: "Launching <date>" }` to its `footer`, which takes one or two items |
| Raptor lobby photo | No photo block renders | Set `story.photo.src`; the block appears on its own |

### The guard

`scripts/check-placeholders.mjs` runs as npm's `prebuild` step and fails the build when bracketed copy like `[YEAR]` or `[ONE-LINE BIO FOR TRACIE]` is still in a `.ts` or `.tsx` file under `src/`.

It only exits non-zero when `VERCEL_ENV` is `production`. Local and preview builds print the same list as a warning and carry on, so work in progress is never blocked. Whole-line and block comments are skipped, and the pattern requires an all-caps opening word so it doesn't trip on array indexes, TypeScript tuples or Tailwind arbitrary values like `text-[13px]`. Run it on its own any time:

```bash
node scripts/check-placeholders.mjs
```

## Launch checklist

### Environment variables to set in Vercel

Set all three for Production, Preview and Development. Values come from `.env.example`.

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://peartreecompanies.com` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-WLHPDWV7` (the container already on the WordPress site) |
| `SLACK_WEBHOOK_URL` | *blank until the Slack incoming webhook is created* |

`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GTM_ID` are read at build time, so changing either needs a redeploy. `SLACK_WEBHOOK_URL` is read per request, so setting it takes effect on the next deploy without a rebuild. Until it is set, production form submissions fail with a message to the visitor, so fill it before announcing the site.

### Remaining steps

- [x] Clear the bracketed placeholders - done, and `prebuild` now keeps them from coming back
- [ ] Set the three environment variables
- [ ] Add an `inquiry_submitted` trigger and conversion tag in GTM container `GTM-WLHPDWV7`
- [x] Crawl the WordPress site for URLs worth redirecting - done, and there are none. That site is a one-pager; its only other URLs are dummy posts, category archives, the feed, attachment pages and three unlisted pages, none of it indexed. The homepage keeps its URL, so no `redirects()` entry is needed.
- [ ] The WordPress site is set to noindex; this one is indexable, so check robots.txt and the sitemap after the DNS switch
- [x] Add an Open Graph image - `src/app/opengraph-image.tsx`
- [ ] After the DNS switch, re-check the share card with a scraper (LinkedIn Post Inspector, X card validator) so the old WordPress preview isn't cached
