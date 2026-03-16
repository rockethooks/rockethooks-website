import { cn } from '@lib/utils';
import { SectionHeading } from '@components/shared/SectionHeading';

interface MissionProps {
  className?: string;
}

function Mission({ className }: MissionProps) {
  return (
    <section
      className={cn('animate-section bg-white py-16 sm:py-24', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Our Mission"
          title="Make Every API Real-Time"
        />

        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-lg leading-relaxed text-neutral-600">
            We believe developers should spend their time building products, not
            plumbing. The gap between &ldquo;this API has data&rdquo; and
            &ldquo;my system reacts to changes&rdquo; should be measured in
            minutes, not sprints.
          </p>
          <p className="text-lg leading-relaxed text-neutral-600">
            RocketHooks is an API transformation platform built by developers,
            for developers. We handle the undifferentiated heavy lifting of
            polling, change detection, and event delivery so you can focus on
            what makes your product unique.
          </p>
        </div>
      </div>
    </section>
  );
}

export { Mission };
export type { MissionProps };
