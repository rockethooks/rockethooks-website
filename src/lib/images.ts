import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/**
 * Props returned by `getResponsiveImageProps` -- ready to spread onto an
 * `<img>` element or pass to a React image component.
 */
export interface ResponsiveImageProps {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

const DEFAULT_WIDTHS = [480, 768, 1024, 1280] as const;

/**
 * Generate responsive image props from an Astro `ImageMetadata` source.
 *
 * Calls `getImage()` at each requested width, builds a `srcSet` string,
 * and returns a props object suitable for `<img>` or React components.
 *
 * @param source  - Imported image metadata (e.g. `import hero from './hero.png'`)
 * @param alt     - Accessible alt text
 * @param widths  - Breakpoint widths to generate (defaults to 480, 768, 1024, 1280)
 */
export async function getResponsiveImageProps(
  source: ImageMetadata,
  alt: string,
  widths: number[] = [...DEFAULT_WIDTHS],
): Promise<ResponsiveImageProps> {
  const results = await Promise.all(
    widths.map((w) => getImage({ src: source, width: w })),
  );

  const srcSet = results
    .map((result, i) => `${result.src} ${widths[i]}w`)
    .join(', ');

  // Use the largest generated image as the default src
  const largest = results[results.length - 1];

  return {
    src: largest.src,
    srcSet,
    width: largest.attributes.width as number,
    height: largest.attributes.height as number,
    alt,
  };
}
