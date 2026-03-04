# Cloudflare Pages Functions

This directory contains serverless functions that run on Cloudflare's edge network alongside the static Astro site.

## How it Works

- Cloudflare Pages automatically deploys files in `/functions` as edge functions
- File path determines the route: `/functions/api/contact.ts` → `/api/contact`
- Functions use Cloudflare's runtime (not Node.js)
- TypeScript is supported out of the box

## API Endpoints

| Endpoint | File | Description |
|----------|------|-------------|
| `POST /api/contact` | `functions/api/contact.ts` | Contact form submission handler |

## Development

Functions are deployed automatically with `yarn build` when deploying to Cloudflare Pages.

For local testing, you can use:
```bash
npx wrangler pages dev dist --compatibility-date=2026-03-01
```

## Resources

- [Cloudflare Pages Functions Docs](https://developers.cloudflare.com/pages/functions/)
- [Pages Functions Routing](https://developers.cloudflare.com/pages/functions/routing/)
