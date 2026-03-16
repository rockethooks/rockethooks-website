import { cn } from '@lib/utils';
import { SectionHeading } from '@components/shared/SectionHeading';
import { Plug, ScanSearch, Send, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface OurApproachProps {
  className?: string;
}

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    icon: Plug,
    title: 'Connect to Any API',
    description:
      'No SDKs. No provider cooperation needed. If a service exposes an HTTP endpoint, RocketHooks can monitor it for changes. OAuth, API keys, and custom headers are all supported out of the box.',
  },
  {
    icon: ScanSearch,
    title: 'Intelligent Change Detection',
    description:
      'Field-level monitoring with JSONPath, XPath, and regex expressions. Know exactly what changed, when, and by how much. Visual diff comparisons make changes instantly clear.',
  },
  {
    icon: Send,
    title: 'Reliable Event Delivery',
    description:
      'Every notification includes an HMAC-SHA256 signature for verification. Automatic retries with exponential backoff and dead letter queues ensure nothing is lost. Slack, email, and SMS channels are coming soon.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Reliability',
    description:
      'Built on AWS serverless infrastructure with two-tier circuit breakers for sub-second failure detection. Your events are delivered, even when downstream systems are temporarily unavailable.',
  },
];

function OurApproach({ className }: OurApproachProps) {
  return (
    <section
      className={cn('animate-section bg-neutral-50 py-16 sm:py-24', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="The Solution"
          title="Zero-Code API Transformation"
          subtitle="RocketHooks sits between the APIs you depend on and your systems. Point it at any API endpoint and it handles the rest: polling, change detection, and event delivery."
        />

        <div className="mx-auto max-w-3xl space-y-8">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div key={capability.title} className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-neutral-900">
                    {capability.title}
                  </h3>
                  <p className="leading-relaxed text-neutral-600">
                    {capability.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { OurApproach };
export type { OurApproachProps };
