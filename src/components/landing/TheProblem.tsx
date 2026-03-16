import { cn } from '@lib/utils';
import { SectionHeading } from '@components/shared/SectionHeading';
import { Clock, AlertTriangle, Layers, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TheProblemProps {
  className?: string;
}

interface ProblemCard {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const problems: ProblemCard[] = [
  {
    icon: Clock,
    title: 'Wasted Engineering Time',
    description:
      'Teams build the same retry logic, rate limiting, and error handling for every API integration. It is undifferentiated work that slows down product delivery.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: AlertTriangle,
    title: 'Fragile Infrastructure',
    description:
      'Custom polling scripts break silently. Rate limits get hit. Auth tokens expire. Changes go undetected for hours, or even days, before anyone notices.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Layers,
    title: 'Integration Sprawl',
    description:
      'Each API gets its own polling setup, its own monitoring, its own alerting. The operational burden grows linearly with every new integration.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: DollarSign,
    title: 'Hidden Costs',
    description:
      'Unnecessary compute, excessive API calls, on-call rotations for polling failures. The true cost of DIY polling is far higher than it appears.',
    color: 'bg-red-50 text-red-600',
  },
];

function TheProblem({ className }: TheProblemProps) {
  return (
    <section
      className={cn('animate-section bg-white py-16 sm:py-24', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="The Problem"
          title="Polling Is a Solved Problem That Nobody Solved"
          subtitle="Developers spend thousands of hours building and maintaining custom polling infrastructure. The pattern is identical every time. Only the API changes."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="rounded-lg border border-neutral-200 bg-white p-6"
              >
                <div
                  className={cn(
                    'mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full',
                    problem.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                  {problem.title}
                </h3>
                <p className="leading-relaxed text-neutral-600">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { TheProblem };
export type { TheProblemProps };
