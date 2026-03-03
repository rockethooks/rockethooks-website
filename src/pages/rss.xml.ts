import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '@utils/content';

/**
 * RSS feed endpoint for the RocketHooks blog.
 * Returns all published (non-draft) posts sorted by date descending.
 *
 * @param context - Astro API context providing the site URL
 * @returns RSS XML response
 */
export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'RocketHooks Blog',
    description:
      'Articles about API transformation, webhook automation, real-time event streams, and integration best practices.',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
