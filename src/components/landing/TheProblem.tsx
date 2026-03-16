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
  iconBg: string;
  borderAccent: string;
}

const problems: ProblemCard[] = [
  {
    icon: Clock,
    title: 'Wasted Engineering Time',
    description:
      'Teams build the same retry logic, rate limiting, and error handling for every API integration. It is undifferentiated work that slows down product delivery.',
    iconBg: 'bg-error-light text-error',
    borderAccent: 'border-t-red-300',
  },
  {
    icon: AlertTriangle,
    title: 'Fragile Infrastructure',
    description:
      'Custom polling scripts break silently. Rate limits get hit. Auth tokens expire. Changes go undetected for hours, or even days, before anyone notices.',
    iconBg: 'bg-warning-light text-warning',
    borderAccent: 'border-t-amber-300',
  },
  {
    icon: Layers,
    title: 'Integration Sprawl',
    description:
      'Each API gets its own polling setup, its own monitoring, its own alerting. The operational burden grows linearly with every new integration.',
    iconBg: 'bg-warning-light text-warning',
    borderAccent: 'border-t-amber-300',
  },
  {
    icon: DollarSign,
    title: 'Hidden Costs',
    description:
      'Unnecessary compute, excessive API calls, on-call rotations for polling failures. The true cost of DIY polling is far higher than it appears.',
    iconBg: 'bg-error-light text-error',
    borderAccent: 'border-t-red-300',
  },
];

function TheProblem({ className }: TheProblemProps) {
  return (
    <section
      className={cn('animate-section bg-neutral-50 py-16 sm:py-24', className)}
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
                className={cn(
                  'animate-card rounded-lg border border-neutral-200 border-t-2 bg-white p-6 shadow-xs hover-lift',
                  problem.borderAccent
                )}
              >
                <div
                  className={cn(
                    'mb-4 inline-flex items-center justify-center rounded-md p-2.5',
                    problem.iconBg
                  )}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
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
