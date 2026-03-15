import { cn } from '@lib/utils';
import { ArrowRight } from 'lucide-react';
import { CTAButton } from '@components/shared/CTAButton';
import { getAppUrl } from '@utils/urls';

interface HeroProps {
  className?: string;
}

function Hero({ className }: HeroProps) {
  return (
    <section className={cn('animate-section relative overflow-hidden bg-hero-mesh', className)}>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-32 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-600">
            API Transformation Platform
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Turn Any REST API Into
            <span className="text-brand-600"> Real-Time Events</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Intelligent polling, change detection, and multi-channel notifications --
            without touching your existing infrastructure. Deploy in 5 minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={getAppUrl()} variant="primary" size="lg" className="px-8 py-3.5 group">
              Start Monitoring Free
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:animate-[bounce-x_0.6s_ease-in-out_infinite]"
                aria-hidden="true"
              />
            </CTAButton>
            <a
              href="#how-it-works"
              className="hidden text-sm font-medium text-neutral-600 underline-offset-4 transition-colors hover:text-brand-600 hover:underline sm:inline-flex sm:items-center sm:text-base"
            >
              See How It Works
            </a>
          </div>
          <a
            href="#how-it-works"
            className="mt-3 inline-flex text-xs font-medium text-neutral-500 underline-offset-4 transition-colors hover:text-brand-600 hover:underline sm:hidden"
          >
            See How It Works
          </a>
          <p className="mt-4 text-sm text-neutral-500">
            No credit card required. Free plan available forever.
          </p>
        </div>
      </div>
    </section>
  );
}

export { Hero };
export type { HeroProps };
