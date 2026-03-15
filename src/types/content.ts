/**
 * Serialized content collection types for React component props.
 *
 * These interfaces mirror the Zod schemas in src/content.config.ts but use
 * plain TypeScript types with Date fields serialized to strings. They are
 * intended for passing content data as props to React island components.
 */

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

/** Category values matching the blog collection enum. */
export type BlogCategory = 'educational' | 'problem-aware' | 'comparison';

export interface BlogPostImage {
  src: string;
  alt: string;
}

/**
 * Serialized blog post props.
 *
 * `pubDate` and `updatedDate` are ISO strings (serialized from `Date`).
 * `readingTime` is computed at render time, not part of the collection schema.
 */
export interface BlogPostProps {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  featured: boolean;
  draft: boolean;
  image?: BlogPostImage;
  geoTargetQuery?: string;
  seoKeywords: string[];
  /** Computed at render time -- not stored in the collection. */
  readingTime?: number;
}

// ---------------------------------------------------------------------------
// Use Cases
// ---------------------------------------------------------------------------

/** Industry values matching the use-cases collection enum. */
export type UseCaseIndustry = 'crm' | 'ecommerce' | 'devops' | 'erp' | 'general';

export interface UseCaseProps {
  title: string;
  description: string;
  industry: UseCaseIndustry;
  icon?: string;
  order: number;
  featured: boolean;
}

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------

export interface IntegrationProps {
  title: string;
  description: string;
  platform: string;
  logo?: string;
  category: string;
  featured: boolean;
  documentationUrl?: string;
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export interface AuthorProps {
  name: string;
  title?: string;
  bio?: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}
