import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getPublishedPosts } from '@utils/content';

interface RSSItem {
  title: string;
  pubDate: Date;
  description: string;
  link: string;
}

/**
 * RSS feed endpoint for RocketHooks content.
 * Combines blog posts, use cases, and integrations in reverse-chronological order.
 *
 * @param context - Astro API context providing the site URL
 * @returns RSS XML response
 */
export async function GET(context: APIContext) {
  const [posts, useCases, integrations] = await Promise.all([
    getPublishedPosts(),
    getCollection('use-cases'),
    getCollection('integrations'),
  ]);

  const blogItems: RSSItem[] = posts.map((post) => ({
    title: post.data.title,
    pubDate: post.data.pubDate,
    description: post.data.description,
    link: `/blog/${post.id}/`,
  }));

  // Use cases and integrations lack pubDate; use a stable fallback date
  const fallbackDate = new Date('2026-03-01');

  const useCaseItems: RSSItem[] = useCases.map((uc) => ({
    title: uc.data.title,
    pubDate: fallbackDate,
    description: uc.data.description,
    link: `/use-cases/${uc.id}/`,
  }));

  const integrationItems: RSSItem[] = integrations.map((integration) => ({
    title: integration.data.title,
    pubDate: fallbackDate,
    description: integration.data.description,
    link: `/integrations/${integration.id}/`,
  }));

  const allItems = [...blogItems, ...useCaseItems, ...integrationItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: 'RocketHooks',
    description:
      'Articles about API transformation, webhook automation, real-time event streams, use cases, and integration guides.',
    site: context.site!.toString(),
    items: allItems,
    customData: '<language>en-us</language>',
  });
}
