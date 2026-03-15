import { cn } from '@lib/utils';

interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

function SectionHeading({
  overline,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 max-w-3xl', centered && 'mx-auto text-center', className)}>
      {overline && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
          {overline}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-neutral-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };
export type { SectionHeadingProps };
