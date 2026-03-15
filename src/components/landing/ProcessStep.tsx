import { cn } from '@lib/utils';
import {
  UserPlus,
  Link,
  ScanSearch,
  BellRing,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps astro-icon `lucide:*` icon names to lucide-react components.
 * Only includes icons used in process-steps data.
 */
const iconMap: Record<string, LucideIcon> = {
  'lucide:user-plus': UserPlus,
  'lucide:link': Link,
  'lucide:scan-search': ScanSearch,
  'lucide:bell-ring': BellRing,
  'lucide:rocket': Rocket,
};

interface ProcessStepProps {
  number: number;
  icon: string;
  title: string;
  description: string;
  className?: string;
}

function ProcessStep({ number, icon, title, description, className }: ProcessStepProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className={cn('animate-card flex gap-4', className)}>
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
          {number}
        </div>
        <div className="mt-2 h-full w-px bg-neutral-200" aria-hidden="true" />
      </div>
      <div className="pb-10">
        <div className="mb-2 inline-flex items-center gap-2 text-brand-600">
          {IconComponent && <IconComponent size={18} />}
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600">{description}</p>
      </div>
    </div>
  );
}

export { ProcessStep };
export type { ProcessStepProps };
