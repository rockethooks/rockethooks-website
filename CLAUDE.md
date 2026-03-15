# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RocketHooks marketing website -- a static site built with **Astro 5** and deployed on **Cloudflare Pages**. The site is designed as a GEO-first (Generative Engine Optimization) content platform optimized for AI search citation (ChatGPT, Perplexity, Claude, Gemini) alongside traditional SEO.

RocketHooks is an **API transformation platform** (not just webhooks). It transforms REST API endpoints into real-time event streams via intelligent polling, change detection, and multi-channel notifications.

## Commands

| Command        | Purpose                           |
| -------------- | --------------------------------- |
| `yarn dev`     | Start dev server (localhost:4321) |
| `yarn build`   | Type-check + build to `dist/`     |
| `yarn preview` | Preview production build locally  |
| `yarn astro`   | Access Astro CLI directly         |

**Note:** Use `yarn`, not `npm`.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| SSG | Astro 5 | Static site generator, file-based routing, content collections |
| UI Components | React 19 + TypeScript | All UI components are `.tsx`, rendered to static HTML at build time |
| UI Primitives | shadcn/ui (base-nova) | Uses `@base-ui/react`, installed via `npx shadcn@latest add` |
| Styling | Tailwind CSS 4 | Via `@tailwindcss/vite`, design tokens in `src/styles/global.css` |
| Icons | lucide-react | Tree-shakeable, replaces astro-icon for all React components |
| Animation | motion (vanilla JS) | Scroll-triggered animations via `<script>` in layouts |
| Forms | React Hook Form + Zod | ContactForm with validation, Sonner toasts for feedback |
| Carousel | Embla Carousel | Testimonials component with autoplay |
| Cross-island state | Nano Stores | `nanostores` + `@nanostores/react` (Astro-recommended) |
| Analytics | Partytown | GA4 offloaded to web worker |
| Content | MDX + Astro Content Collections | Zod-validated schemas |
| Deployment | Cloudflare Pages | Edge hosting (330+ PoPs) |

## Architecture

### SSR React with Opt-In Hydration

All UI components are React `.tsx` files. Without a `client:*` directive, Astro renders them to **static HTML at build time** -- zero JS shipped. Interactive components selectively hydrate:

| Component | Directive | JS Cost | Reason |
|-----------|-----------|---------|--------|
| Header | `client:idle` | ~5KB | Mobile menu toggle |
| Testimonials | `client:visible` | ~5KB | Embla carousel |
| TableOfContents | `client:idle` | ~2KB | Scroll spy |
| ContactForm | `client:load` | ~15KB | Form validation (primary page purpose) |
| Toaster (Sonner) | `client:load` | ~5KB | Toast notifications |
| Everything else | **none** | 0KB | Static HTML only |

**Hydration discipline:** Adding `client:*` to any component requires explicit justification.

### What Stays as `.astro`

- **Pages** (`src/pages/*.astro`) -- file-based routing, content collection data fetching
- **Layouts** (`src/layouts/*.astro`) -- `<head>` management, analytics, Motion vanilla `<script>` tags
- **SEO schema components** (`src/components/seo/*.astro`) -- JSON-LD injection into `<head>`

### Directory Structure

```
src/
  components/
    ui/             # shadcn/ui components (button, input, textarea, select, card, badge, sonner)
    shared/         # Header, Footer, Logo, Breadcrumbs, SectionHeading, CTAButton, FinalCTA
    landing/        # Hero, SocialProof, HowItWorks, Features, UseCases, Pricing, FAQ, Testimonials
    blog/           # ArticleCard, ArticleList, AuthorBio, TableOfContents, CategoryFilter, etc.
    integrations/   # IntegrationCard
    forms/          # ContactForm, NewsletterForm, FormField
    seo/            # JSON-LD schema generators (.astro) -- 11 components
  layouts/          # BaseLayout, LandingLayout, BlogLayout, BlogPostLayout (.astro)
  types/
    content.ts      # Serialized interfaces for React props (BlogPostProps, AuthorProps, etc.)
  lib/
    utils.ts        # shadcn cn() utility (clsx + tailwind-merge)
    images.ts       # getResponsiveImageProps() helper
  content/          # Content collections (blog/, use-cases/, integrations/, authors/)
  data/             # Static data (features, pricing, testimonials, faqs, process-steps)
  pages/            # File-based routing (.astro)
  styles/
    global.css      # Tailwind theme, design tokens, shadcn CSS variables, animations
  utils/
    content.ts      # getRelatedArticles(), getBreadcrumbs(), getPostsByCategory()
    urls.ts         # getAppUrl() -- uses PUBLIC_APP_URL
```

### Content Collections

| Collection     | Type    | Schema Highlights                                                                 |
| -------------- | ------- | --------------------------------------------------------------------------------- |
| `blog`         | content | `geoTargetQuery`, `category` (educational/problem-aware/comparison), `author` ref |
| `use-cases`    | content | `industry` enum, `order`, `featured`                                              |
| `integrations` | content | `platform`, `logo`, `category`                                                    |
| `authors`      | data    | `name`, `bio`, `linkedin`, `github` (E-E-A-T signals)                             |
| `changelog`    | content | Release notes                                                                     |

All schemas validated with Zod via Astro's Content Collections API.

### Hub-and-Spoke Content Model

| Hub         | URL           | Purpose                                               |
| ----------- | ------------- | ----------------------------------------------------- |
| Use Cases   | `/use-cases/` | Industry-specific solutions (CRM, ecommerce, DevOps)  |
| Comparisons | `/compare/`   | Decision-stage content (vs Zapier, vs custom polling) |
| Blog        | `/blog/`      | Educational + problem-aware articles                  |

Every spoke links back to its hub; hubs link to all spokes. No orphan pages.

## Key Patterns and Gotchas

### SEO Schemas Must Be Siblings

`BreadcrumbSchema` and `FAQSchema` **cannot** be rendered inside React components. They must be rendered as siblings in `.astro` pages:

```astro
<!-- CORRECT: schema as sibling in .astro page -->
<BreadcrumbSchema items={breadcrumbItems} />
<Breadcrumbs items={breadcrumbItems} />

<!-- WRONG: schema inside React component (won't work) -->
```

### Content Collection Serialization

`.astro` pages must serialize collection data to plain props before passing to React components. Dates become ISO strings:

```astro
<ArticleList posts={posts.map((p) => ({
  title: p.data.title,
  pubDate: p.data.pubDate.toISOString(),
  slug: p.id,
}))} />
```

Type interfaces for serialized props live in `src/types/content.ts`.

### CSS `var()` Fallback Syntax

`--font-sans` uses `var(--font-inter, <fallbacks>)` with fallbacks **inside** the `var()`. If fallbacks are outside the `var()` and the variable is undefined, the entire declaration becomes invalid (IACVT), causing Times serif rendering.

```css
/* CORRECT */
--font-sans: var(--font-inter, ui-sans-serif, system-ui, sans-serif);

/* WRONG -- if --font-inter is undefined, entire value is invalid */
--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
```

### FAQ Uses Native HTML

FAQ component uses native `<details>/<summary>` elements, NOT shadcn Accordion. This ensures zero JS, full accessibility, and GEO-safe content (visible without hydration).

### View Transitions Compatibility

- Header reads `window.location.pathname` in `useEffect` after mount (prop becomes stale on soft nav)
- TableOfContents listens to `astro:after-swap` event to re-initialize scroll spy
- Motion vanilla `<script>` tags use standard `<script>` (NOT `is:inline`) so they re-execute on view transitions

### Breadcrumbs Require Pre-computed Items

The React `Breadcrumbs` component accepts `items` prop (not `pathname`). Compute in `.astro` frontmatter:

```astro
const breadcrumbItems = getBreadcrumbs(Astro.url.pathname);
<Breadcrumbs items={breadcrumbItems} />
```

### `@types/*` Path Alias Cannot Be Used in `.tsx`

TypeScript interprets `@types/*` as `node_modules/@types/`. Use relative imports for `src/types/content.ts` from `.tsx` files.

## GEO/SEO Architecture

### Content Structure Pattern (mandatory for all articles)

1. Direct answer first (40-60 words answering primary query)
2. Self-contained passages (127-167 words) for AI extraction
3. Code examples with syntax highlighting per section
4. FAQ section with `FAQPage` schema markup
5. Author bio with E-E-A-T signals (LinkedIn, GitHub links)
6. Visible "Last Updated" date (76.4% of AI-cited content updated <30 days)
7. Related articles linking back to hub

### JSON-LD Schema Strategy

| Page Type        | Schema Types                                       |
| ---------------- | -------------------------------------------------- |
| Homepage         | `Organization`, `WebSite` with `SearchAction`      |
| Pricing          | `WebApplication`, `FAQPage`, `AggregateOffer`      |
| Blog posts       | `TechArticle`, `Person` (author), `BreadcrumbList` |
| Hub pages        | `CollectionPage`, `BreadcrumbList`                 |
| All non-homepage | `BreadcrumbList`                                   |

### Image Rules

- Always use Astro's `<Image>` component (never raw `<img>`)
- LCP (above-fold) images: `loading="eager"` + `fetchpriority="high"` + preload in head
- Below-fold images: `loading="lazy"`
- Explicit `width`/`height` on all images (prevents CLS)
- Output format: WebP (Cloudflare Polish handles AVIF)

## Deployment

### Cloudflare Pages

| Environment | URL                                      | Branch           |
| ----------- | ---------------------------------------- | ---------------- |
| Production  | https://www.rockethooks.com              | `main`           |
| Staging     | https://staging.www.rockethooks.com      | `staging`        |
| Sandbox     | https://sandbox.www.rockethooks.com      | `sandbox`        |
| PR Previews | `[branch].rockethooks-website.pages.dev` | feature branches |

### Environment Variables

| Variable                         | Purpose                                    |
| -------------------------------- | ------------------------------------------ |
| `PUBLIC_SITE_URL`                | Canonical URL generation                   |
| `PUBLIC_CLOUDFLARE_BEACON_TOKEN` | Cloudflare Web Analytics                   |
| `PUBLIC_GA4_MEASUREMENT_ID`      | Google Analytics 4                         |
| `PUBLIC_ENV`                     | Environment detection (production/preview) |
| `PUBLIC_APP_URL`                 | Webapp URL for login/signup links          |

### Build Configuration

```yaml
build:
  command: 'yarn build'
  output_directory: 'dist'
  root_directory: '.'
```

### Verify Deployments

```bash
wrangler deployments list  # List recent deployments with timestamps
```

**Note:** Use `wrangler deployments list` (not `wrangler pages deployment list`) for this project.

## i18n Strategy

URL-prefix pattern with English at root (no prefix):

```
rockethooks.com/     # English (default)
rockethooks.com/fr/  # French
rockethooks.com/de/  # German
rockethooks.com/es/  # Spanish
```

Configured via Astro's `i18n` with `prefixDefaultLocale: false` and fallback to English. Professional translation only (no machine translation -- Google penalizes it).

## Key Specifications

Technical specifications live in the parent `specifications/` directory (symlinked as `.specifications/`):

| Document              | Path                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- |
| Full Technical PRD    | `.specifications/prd-technical/website/rockethooks-website-technical-specification.md` |
| Setup Status          | `.specifications/prd-technical/website/setup-completion-summary.md`                    |
| Architecture Decision | `.specifications/prd-technical/website/docs/website-architecture-ideation.md`          |
| SEO/GEO Research      | `.specifications/prd-technical/website/docs/seo-geo-research-report.md`                |
| Product Positioning   | `.specifications/product-positioning/`                                                 |
| Master PRD            | `.specifications/prd.md`                                                               |
