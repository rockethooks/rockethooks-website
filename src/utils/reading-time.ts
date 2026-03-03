import { toString } from 'mdast-util-to-string';
import type { Root } from 'mdast';
import type { VFile } from 'vfile';

const WORDS_PER_MINUTE = 200;

/**
 * Remark plugin that calculates reading time and injects it into frontmatter.
 * Accessible in Astro components via `remarkPluginFrontmatter.readingTime`
 * after rendering a content entry.
 *
 * @example
 * // In astro.config.mjs:
 * markdown: { remarkPlugins: [remarkReadingTime] }
 *
 * // In an Astro component:
 * const { remarkPluginFrontmatter } = await render(entry);
 * const readingTime = remarkPluginFrontmatter.readingTime; // "3 min read"
 */
export function remarkReadingTime() {
  return (tree: Root, file: VFile) => {
    const text = toString(tree);
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

    // Astro injects the `astro` property on VFile.data during markdown processing
    const astroData = file.data as Record<string, Record<string, Record<string, unknown>>>;
    if (astroData.astro?.frontmatter) {
      astroData.astro.frontmatter.readingTime = `${minutes} min read`;
    }
  };
}
