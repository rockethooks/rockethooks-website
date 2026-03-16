import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog collection -- educational articles, comparisons, and problem-aware content.
 * Uses GEO-optimized fields (geoTargetQuery, seoKeywords) for AI search citation.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum(['educational', 'problem-aware', 'comparison']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    geoTargetQuery: z.string().optional(),
    seoKeywords: z.array(z.string()).default([]),
  }),
});

/**
 * Use cases collection -- industry-specific solutions (CRM, ecommerce, DevOps, etc.).
 * Part of the hub-and-spoke content model under /use-cases/.
 */
const useCases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/use-cases' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.enum(['crm', 'ecommerce', 'devops', 'erp', 'general']),
    icon: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

/**
 * Integrations collection -- platform-specific integration guides.
 * Documents how RocketHooks connects with third-party services.
 */
const integrations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/integrations' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    platform: z.string(),
    logo: z.string().optional(),
    category: z.string(),
    featured: z.boolean().default(false),
    documentationUrl: z.string().url().optional(),
  }),
});

/**
 * Authors collection -- team member data for E-E-A-T signals.
 * Uses file loader (JSON) instead of glob (markdown).
 */
const authors = defineCollection({
  loader: file('src/content/authors/authors.json'),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }),
});

export const collections = { blog, 'use-cases': useCases, integrations, authors };
