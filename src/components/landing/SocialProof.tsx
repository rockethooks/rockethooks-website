import { cn } from '@lib/utils';

interface SocialProofProps {
  className?: string;
}

interface StatItem {
  value: string;
  label: string;
  countTarget?: number;
  countPrefix?: string;
  countSuffix?: string;
  countDecimals?: number;
}

const stats: StatItem[] = [
  { value: '< 5 min', label: 'setup time', countTarget: 5, countPrefix: '< ', countSuffix: ' min' },
  { value: '99.9%', label: 'uptime SLA', countTarget: 99.9, countSuffix: '%', countDecimals: 1 },
  { value: '< 2s', label: 'avg. webhook delivery', countTarget: 2, countPrefix: '< ', countSuffix: 's' },
  { value: '5', label: 'auth types supported', countTarget: 5 },
];

function SocialProof({ className }: SocialProofProps) {
  return (
    <section className={cn('bg-gradient-to-b from-brand-50/50 to-white', className)}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => {
            const isAnimated = stat.countTarget !== undefined;

            return (
              <div key={stat.label} className="text-center">
                <p
                  className={cn(
                    'text-2xl font-semibold text-brand-600 sm:text-3xl',
                    isAnimated && 'animate-counter'
                  )}
                  aria-label={stat.value}
                  {...(isAnimated && {
                    'data-count-target': String(stat.countTarget),
                    ...(stat.countPrefix && { 'data-count-prefix': stat.countPrefix }),
                    ...(stat.countSuffix && { 'data-count-suffix': stat.countSuffix }),
                    ...(stat.countDecimals && { 'data-count-decimals': String(stat.countDecimals) }),
                  })}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { SocialProof };
export type { SocialProofProps };
