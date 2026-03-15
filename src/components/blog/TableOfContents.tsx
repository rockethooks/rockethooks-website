import { useState, useEffect, useCallback } from 'react';
import { cn } from '@lib/utils';

interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: TocHeading[];
  className?: string;
}

function TableOfContents({ headings, className }: TableOfContentsProps) {
  const tocHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3);
  const [activeSlug, setActiveSlug] = useState<string>('');

  const initScrollSpy = useCallback(() => {
    const headingElements = tocHeadings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [tocHeadings]);

  useEffect(() => {
    const cleanup = initScrollSpy();

    // Re-initialize after Astro View Transitions
    const handleSwap = () => {
      cleanup?.();
      // Small delay to let new DOM settle after view transition
      requestAnimationFrame(() => {
        initScrollSpy();
      });
    };

    document.addEventListener('astro:after-swap', handleSwap);

    return () => {
      cleanup?.();
      document.removeEventListener('astro:after-swap', handleSwap);
    };
  }, [initScrollSpy]);

  if (tocHeadings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav
        className={cn('hidden lg:sticky lg:top-24 lg:block', className)}
        aria-label="Table of contents"
      >
        <p className="mb-3 text-sm font-semibold text-neutral-900">On this page</p>
        <ul className="space-y-1 border-l border-neutral-200">
          {tocHeadings.map((heading) => {
            const isActive = activeSlug === heading.slug;
            return (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className={cn(
                    'block border-l-2 py-1 text-sm leading-snug transition-colors hover:border-brand-300 hover:text-neutral-900',
                    heading.depth === 2 ? 'pl-4' : 'pl-7',
                    isActive
                      ? 'border-brand-600 font-medium text-neutral-900'
                      : 'border-transparent text-neutral-500',
                  )}
                  data-toc-slug={heading.slug}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: collapsible details */}
      <details className="mb-8 rounded-lg border border-neutral-200 bg-neutral-50 lg:hidden">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-neutral-900">
          Table of contents
        </summary>
        <ul className="space-y-1 px-4 pb-4">
          {tocHeadings.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                className={cn(
                  'block py-1 text-sm text-neutral-600 hover:text-brand-600',
                  heading.depth === 3 ? 'pl-4' : '',
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

export { TableOfContents };
export type { TableOfContentsProps, TocHeading };
