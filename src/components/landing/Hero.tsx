import { cn } from '@lib/utils';
import { CTAButton } from '@components/shared/CTAButton';
import { HeroCodeDemo } from '@components/landing/HeroCodeDemo';
import { getAppUrl } from '@utils/urls';

interface HeroProps {
  className?: string;
}

function Hero({ className }: HeroProps) {
  return (
    <section className={cn('animate-section relative overflow-hidden bg-white', className)}>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-32 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-600">
            API Transformation Platform
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Turn Any API Into
            <span className="text-brand-600"> Real-Time Events</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Every developer has written the same polling loop. Check an API. Compare the response.
            Trigger an action if something changed. We built RocketHooks so you never have to write
            that loop again.
          </p>
          <p className="mx-auto mt-4 text-sm font-medium text-brand-600">
            Set up in 5 minutes. 14-day free trial, no credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={getAppUrl()} variant="primary" size="lg">
              Start Free Trial
            </CTAButton>
            <CTAButton href="#how-it-works" variant="secondary" size="lg">
              See How It Works
            </CTAButton>
          </div>
        </div>

        <HeroCodeDemo className="mt-12 lg:mt-16" />
      </div>
    </section>
  );
}

export { Hero };
export type { HeroProps };
