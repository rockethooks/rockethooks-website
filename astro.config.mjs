// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import remarkToc from 'remark-toc';
import { remarkReadingTime } from './src/utils/reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://www.rockethooks.com',
  output: 'static',

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Inter',
        cssVariable: '--font-inter',
        weights: ['100 900'],
        styles: ['normal', 'italic'],
        subsets: ['latin', 'latin-ext'],
        fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      },
      {
        provider: fontProviders.google(),
        name: 'JetBrains Mono',
        cssVariable: '--font-jetbrains-mono',
        weights: [400, 500, 600, 700],
        styles: ['normal'],
        subsets: ['latin'],
        fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    ],
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'es'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    // CRITICAL: expressiveCode MUST come before mdx()
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        borderRadius: '0.375rem',
      },
    }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          fr: 'fr-FR',
          de: 'de-DE',
          es: 'es-ES',
        },
      },
    }),
    icon({
      include: {
        lucide: ['*'],
      },
    }),
    robotsTxt({
      sitemap: true,
      sitemapBaseFileName: 'sitemap-index',
      policy: [
        { userAgent: '*', allow: '/' },
        { userAgent: 'GPTBot', allow: '/' },
        { userAgent: 'ChatGPT-User', allow: '/' },
        { userAgent: 'Google-Extended', allow: '/' },
        { userAgent: 'anthropic-ai', allow: '/' },
        { userAgent: 'ClaudeBot', allow: '/' },
        { userAgent: 'PerplexityBot', allow: '/' },
        { userAgent: 'Bytespider', allow: '/' },
      ],
    }),
  ],

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
    remarkPlugins: [
      remarkReadingTime,
      [remarkToc, { heading: 'table[ -]of[ -]contents?|toc', tight: true }],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
    },
  },

  adapter: cloudflare(),
});