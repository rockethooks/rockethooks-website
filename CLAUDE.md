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

**Note:** Use `yarn`, not `npm`. No test or lint scripts configured yet -- add them as integrations are set up.

## Tech Stack

- **Astro 5.17.1** -- Static site generator with island architecture (zero JS baseline)
- **TypeScript** -- Strict mode (`astro/tsconfigs/strict`)
- **ES Modules** -- `"type": "module"` in package.json
- **Cloudflare Pages** -- Edge hosting (330+ PoPs, unlimited bandwidth)

### Planned Integrations (from PRD)

| Integration      | Package             | Purpose                             |
| ---------------- | ------------------- | ----------------------------------- |
| Tailwind CSS 3.4 | `@astrojs/tailwind` | Utility-first styling               |
| MDX              | `@astrojs/mdx`      | Content collections with components |
| Sitemap          | `@astrojs/sitemap`  | XML sitemap generation              |
| RSS              | `@astrojs/rss`      | RSS feed generation                 |
| astro-icon       | `astro-icon`        | Inline SVG icons (zero JS)          |

## Architecture

### Zero-JS-by-Default Strategy

The site ships pure HTML with no JavaScript baseline. This is a deliberate architectural choice:

- AI crawlers cannot execute JavaScript -- raw HTML is mandatory for GEO
- Pages with FCP < 0.4s get 3x more AI citations
- Interactive components (pricing calculator, code examples) use **React islands** via `client:*` directives

### Content Collections

Content is managed as code (MDX/Git, no headless CMS). Collections planned:

| Collection     | Type    | Schema Highlights                                                                 |
| -------------- | ------- | --------------------------------------------------------------------------------- |
| `blog`         | content | `geoTargetQuery`, `category` (educational/problem-aware/comparison), `author` ref |
| `use-cases`    | content | `industry` enum, `order`, `featured`                                              |
| `integrations` | content | `platform`, `logo`, `category`                                                    |
| `authors`      | data    | `name`, `bio`, `linkedin`, `github` (E-E-A-T signals)                             |
| `changelog`    | content | Release notes                                                                     |

All schemas validated with Zod via Astro's Content Collections API.

### Planned Directory Structure

```
src/
  components/
    seo/          # JSON-LD schema generators (Organization, Article, FAQ, Breadcrumb, Person)
    landing/      # Homepage sections (Hero, HowItWorks, Features, UseCases, PricingPreview)
    blog/         # ArticleCard, AuthorBio, TableOfContents, RelatedArticles
    shared/       # Header, Footer, CTA, Newsletter
    interactive/  # React islands (PricingCalculator.tsx, CodeExample.tsx)
  layouts/
    BaseLayout.astro       # Head, meta, analytics injection
    BlogLayout.astro       # Blog listing with pagination
    BlogPostLayout.astro   # Individual articles with ToC, author bio, related articles
    LandingLayout.astro    # Marketing pages with full-width sections
  content/                 # Content collections (blog/, use-cases/, integrations/, authors/)
  pages/                   # File-based routing
  styles/                  # Global styles, design tokens
  utils/
    content.ts             # getRelatedArticles(), getBreadcrumbs()
```

### Hub-and-Spoke Content Model

Three interconnected content hubs, each with 15-25 cluster articles:

| Hub         | URL           | Purpose                                               |
| ----------- | ------------- | ----------------------------------------------------- |
| Use Cases   | `/use-cases/` | Industry-specific solutions (CRM, ecommerce, DevOps)  |
| Comparisons | `/compare/`   | Decision-stage content (vs Zapier, vs custom polling) |
| Blog        | `/blog/`      | Educational + problem-aware articles                  |

Every spoke links back to its hub; hubs link to all spokes. No orphan pages.

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

Use Wrangler CLI to check deployment status:

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
