import { Check } from 'lucide-react';
import { cn } from '@lib/utils';
import type { PricingTier as PricingTierType } from '@data/types';

interface PricingTierProps {
  tier: PricingTierType;
  className?: string;
}

function PricingTier({ tier, className }: PricingTierProps) {
  return (
    <div
      className={cn(
        'animate-card relative flex flex-col rounded-lg border p-6 shadow-xs',
        tier.highlighted
          ? 'z-10 border-brand-600 bg-brand-50/30 shadow-lg ring-1 ring-brand-600'
          : 'border-neutral-200 bg-white',
        className,
      )}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-sm font-semibold text-white">
          {tier.badge}
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">{tier.name}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight text-neutral-900">
            {tier.price}
          </span>
          {tier.priceNote && (
            <span className="text-sm text-neutral-500">{tier.priceNote}</span>
          )}
        </div>
        <p className="mt-3 text-sm text-neutral-600">{tier.description}</p>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-700">
            <Check size={16} className="mt-0.5 shrink-0 text-brand-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={tier.cta.href}
        className={cn(
          'block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors',
          tier.highlighted
            ? 'bg-brand-600 text-white shadow-md hover:bg-brand-700 hover:shadow-lg'
            : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50',
        )}
      >
        {tier.cta.label}
      </a>

      {tier.price === '$0' && (
        <p className="mt-3 text-center text-xs text-neutral-500">
          No credit card required
        </p>
      )}
    </div>
  );
}

export { PricingTier };
export type { PricingTierProps };
