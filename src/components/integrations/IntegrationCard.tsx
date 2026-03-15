import { Puzzle, ArrowRight } from 'lucide-react';
import { cn } from '@lib/utils';
import type { IntegrationProps } from '../../types/content';

interface IntegrationCardProps extends IntegrationProps {
  /** The URL slug used for linking (e.g., the collection entry id). */
  slug: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  CRM: 'bg-blue-50 text-blue-700',
  'E-commerce': 'bg-emerald-50 text-emerald-700',
  DevOps: 'bg-purple-50 text-purple-700',
  Payments: 'bg-amber-50 text-amber-700',
  Notifications: 'bg-rose-50 text-rose-700',
  ERP: 'bg-teal-50 text-teal-700',
};

function IntegrationCard({
  slug,
  title,
  description,
  platform,
  logo,
  category,
  className,
}: IntegrationCardProps) {
  const badgeClass = categoryColors[category] ?? 'bg-neutral-50 text-neutral-700';

  return (
    <a
      href={`/integrations/${slug}`}
      className={cn(
        'group flex flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-xs transition-all hover:border-brand-200 hover:shadow-sm',
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        {logo ? (
          <img
            src={logo}
            alt={`${platform} logo`}
            width={40}
            height={40}
            className="size-10 rounded-md object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
            <Puzzle size={22} />
          </div>
        )}
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-medium',
            badgeClass,
          )}
        >
          {category}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-brand-700">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
        {description}
      </p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
        Learn more
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}

export { IntegrationCard };
export type { IntegrationCardProps };
