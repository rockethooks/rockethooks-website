import { SectionHeading } from '@components/shared/SectionHeading';
import { PricingTier } from './PricingTier';
import { pricingTiers } from '@data/pricing';

function PricingPreview() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="animate-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Pricing"
          title="Simple, transparent pricing"
          subtitle="14-day free trial on all plans. Scale as your integration needs grow. No hidden fees."
        />

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <PricingTier key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { PricingPreview };
