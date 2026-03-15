import { cn } from '@lib/utils';

interface SocialProofProps {
  className?: string;
}

const stats = [
  { value: '10,000+', label: 'API monitors active' },
  { value: '99.9%', label: 'uptime SLA' },
  { value: '<2s', label: 'avg. webhook delivery' },
  { value: '60-80%', label: 'cost reduction' },
] as const;

function SocialProof({ className }: SocialProofProps) {
  return (
    <section className={cn('bg-gradient-to-b from-brand-50/50 to-white', className)}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold text-brand-600 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { SocialProof };
export type { SocialProofProps };
