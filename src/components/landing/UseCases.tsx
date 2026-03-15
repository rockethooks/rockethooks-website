import { SectionHeading } from '@components/shared/SectionHeading';
import { UseCaseCard } from './UseCaseCard';
import { useCasePreviews } from '@data/use-cases-preview';

function UseCases() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="animate-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Use Cases"
          title="Built for the integrations that matter"
          subtitle="See how teams use RocketHooks to turn legacy APIs into real-time event sources across industries."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCasePreviews.map((useCase) => (
            <UseCaseCard
              key={useCase.title}
              icon={useCase.icon}
              title={useCase.title}
              description={useCase.description}
              href={useCase.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { UseCases };
