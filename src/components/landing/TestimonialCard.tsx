import { cn } from '@lib/utils';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  className?: string;
}

function TestimonialCard({ quote, name, role, company, className }: TestimonialCardProps) {
  return (
    <blockquote
      className={cn(
        'flex min-w-0 flex-col justify-between rounded-lg border border-neutral-200 bg-white p-6 shadow-xs',
        className
      )}
    >
      <p className="text-sm leading-relaxed text-neutral-700">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-4 border-t border-neutral-100 pt-4">
        <p className="text-sm font-semibold text-neutral-900">{name}</p>
        <p className="text-xs text-neutral-500">
          {role}, {company}
        </p>
      </footer>
    </blockquote>
  );
}

export { TestimonialCard };
export type { TestimonialCardProps };
