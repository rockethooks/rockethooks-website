/**
 * React Breadcrumbs component.
 *
 * IMPORTANT: This component does NOT render BreadcrumbSchema (JSON-LD).
 * The Astro version (Breadcrumbs.astro) renders <BreadcrumbSchema> inline,
 * but .astro components cannot be rendered inside .tsx files.
 *
 * When using this React component in .astro pages, you MUST render
 * <BreadcrumbSchema> as a sibling component in the page's <head> or body.
 *
 * Usage in .astro pages:
 *
 *   import { getBreadcrumbs } from '@utils/content';
 *   import BreadcrumbSchema from '@components/seo/BreadcrumbSchema.astro';
 *   import { Breadcrumbs } from '@components/shared/Breadcrumbs';
 *
 *   const items = getBreadcrumbs(Astro.url.pathname);
 *
 *   <BreadcrumbSchema items={items.slice(1).map((item) => ({ name: item.label, href: item.href }))} />
 *   <Breadcrumbs items={items} />
 *
 * Note: `getBreadcrumbs()` lives in `@utils/content.ts` which imports from
 * `astro:content`. To avoid pulling Astro-only modules into React, this
 * component accepts pre-computed items instead of a pathname.
 */

import { ChevronRight } from 'lucide-react';
import { cn } from '@lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('mb-6', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="size-3.5 text-neutral-400" aria-hidden="true" />
            )}
            {index === items.length - 1 ? (
              <span className="font-medium text-neutral-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="transition-colors hover:text-neutral-900"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export { Breadcrumbs };
export type { BreadcrumbsProps, BreadcrumbItem };
