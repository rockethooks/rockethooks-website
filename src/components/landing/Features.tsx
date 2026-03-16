import { SectionHeading } from '@components/shared/SectionHeading';
import { CTAButton } from '@components/shared/CTAButton';
import { FeatureCard } from './FeatureCard';
import { features } from '@data/features';

function Features() {
  return (
    <section className="bg-dot-grid py-16 sm:py-24">
      <div className="animate-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Features"
          title="Everything you need to transform APIs into event streams"
          subtitle="From change detection to reliable event delivery, RocketHooks handles the entire pipeline."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <CTAButton href="/features" variant="secondary" size="md">
            Explore All Features
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export { Features };
