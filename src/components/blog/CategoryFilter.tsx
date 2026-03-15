import { cn } from '@lib/utils';

interface CategoryPill {
  label: string;
  value: string | undefined;
  href: string;
}

interface CategoryFilterProps {
  currentCategory?: string;
  className?: string;
}

const categories: CategoryPill[] = [
  { label: 'All', value: undefined, href: '/blog/' },
  { label: 'Educational', value: 'educational', href: '/blog/?category=educational' },
  { label: 'Problem-Aware', value: 'problem-aware', href: '/blog/?category=problem-aware' },
  { label: 'Comparison', value: 'comparison', href: '/blog/?category=comparison' },
];

function CategoryFilter({ currentCategory, className }: CategoryFilterProps) {
  return (
    <nav aria-label="Filter articles by category" className={cn('mb-10', className)}>
      <ul className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.value;
          return (
            <li key={cat.label}>
              <a
                href={cat.href}
                className={cn(
                  'inline-block rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'border border-neutral-200 bg-white text-neutral-600 hover:border-brand-200 hover:text-brand-700',
                )}
                {...(isActive ? { 'aria-current': 'page' as const } : {})}
              >
                {cat.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { CategoryFilter };
export type { CategoryFilterProps };
