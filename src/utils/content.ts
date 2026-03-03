import { getCollection, type CollectionEntry } from 'astro:content';

/** Breadcrumb item for structured navigation */
interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Returns all non-draft blog posts sorted by pubDate descending (newest first).
 *
 * @returns Array of published blog posts
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Finds related articles by matching category, excluding the current article.
 * Falls back to most recent posts if no category match or insufficient results.
 *
 * @param currentId - ID of the current article to exclude
 * @param category - Optional category to filter by (educational, problem-aware, comparison)
 * @param limit - Maximum number of related articles to return (default: 3)
 * @returns Array of related blog posts
 */
export async function getRelatedArticles(
  currentId: string,
  category?: string,
  limit = 3
): Promise<CollectionEntry<'blog'>[]> {
  const published = await getPublishedPosts();
  const others = published.filter((post) => post.id !== currentId);

  if (!category) {
    return others.slice(0, limit);
  }

  const matched = others.filter((post) => post.data.category === category);

  // If enough category matches, return those; otherwise pad with recent posts
  if (matched.length >= limit) {
    return matched.slice(0, limit);
  }

  const remaining = others.filter((post) => post.data.category !== category);
  return [...matched, ...remaining].slice(0, limit);
}

/**
 * Generates breadcrumb items from a URL pathname.
 * Always starts with Home (/). Segments are title-cased and hyphen-separated
 * words are joined with spaces.
 *
 * @param pathname - URL pathname (e.g., "/blog/my-article")
 * @returns Array of breadcrumb items with label and href
 *
 * @example
 * getBreadcrumbs('/blog/my-first-post')
 * // => [
 * //   { label: 'Home', href: '/' },
 * //   { label: 'Blog', href: '/blog' },
 * //   { label: 'My First Post', href: '/blog/my-first-post' }
 * // ]
 */
export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];
  const segments = pathname.split('/').filter(Boolean);

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    items.push({ label, href: currentPath });
  }

  return items;
}

/**
 * Formats a Date object into a human-readable string (e.g., "March 3, 2026").
 * Uses en-US locale for consistent formatting across environments.
 *
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
