import { CTAButton } from './CTAButton';
import { cn } from '@lib/utils';

interface FinalCTAProps {
  headline?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

/**
 * Note: The .astro version uses `getAppUrl()` which reads `import.meta.env.PUBLIC_APP_URL`.
 * In React components, `import.meta.env` is still available at build time in Astro islands.
 * However, the default fallback URL is hardcoded here for safety. When this component is
 * used as an Astro island, the parent .astro page should pass `ctaHref` explicitly
 * using `getAppUrl()` from `@utils/urls`.
 */
const DEFAULT_APP_URL = 'https://app.rockethooks.com';

function FinalCTA({
  headline = 'Ready to transform your APIs?',
  subtitle = 'Start receiving real-time events from any API in minutes. No credit card required.',
  ctaLabel = 'Get Started Free',
  ctaHref = DEFAULT_APP_URL,
  className,
}: FinalCTAProps) {
  return (
    <section className={cn('bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500', className)}>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-100">
          {subtitle}
        </p>
        <div className="mt-8">
          <CTAButton
            href={ctaHref}
            variant="secondary"
            size="lg"
            className="border-white/20 bg-white text-brand-700 hover:bg-brand-50"
          >
            {ctaLabel}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export { FinalCTA };
export type { FinalCTAProps };
