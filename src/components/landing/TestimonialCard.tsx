import { Star } from 'lucide-react';
import { cn } from '@lib/utils';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating?: number;
  className?: string;
}

function TestimonialCard({ quote, name, role, company, rating = 5, className }: TestimonialCardProps) {
  return (
    <blockquote
      className={cn(
        'relative flex min-w-0 flex-col justify-between rounded-lg border-0 border-l-4 border-l-brand-200 bg-white p-6 shadow-xs',
        className
      )}
    >
      <span className="absolute -top-2 -left-1 text-6xl leading-none text-brand-100 select-none pointer-events-none">
        {'\u201C'}
      </span>
      <p className="text-sm leading-relaxed text-neutral-700">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-3 mb-1 flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < rating
                ? 'fill-brand-500 text-brand-500'
                : 'fill-neutral-200 text-neutral-200'
            )}
          />
        ))}
      </div>
      <footer className="mt-4 border-t border-neutral-100 pt-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
            {name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold text-neutral-900">{name}</p>
            <p className="text-xs text-neutral-500">
              {role}, {company}
            </p>
          </div>
        </div>
      </footer>
    </blockquote>
  );
}

export { TestimonialCard };
export type { TestimonialCardProps };
