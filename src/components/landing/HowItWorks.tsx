import { cn } from '@lib/utils';
import { SectionHeading } from '@components/shared/SectionHeading';
import { ProcessStep } from './ProcessStep';
import { processSteps } from '@data/process-steps';

interface HowItWorksProps {
  className?: string;
}

function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className={cn('animate-section bg-white py-16 sm:py-24', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="How It Works"
          title="From REST API to real-time events in 5 steps"
          subtitle="No infrastructure changes. No code modifications to your existing systems. Just connect and go."
        />

        <div className="mx-auto max-w-2xl">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { HowItWorks };
export type { HowItWorksProps };
