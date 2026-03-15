import type { LucideIcon } from 'lucide-react';
import {
  Repeat,
  Timer,
  Workflow,
  ScanSearch,
  Diff,
  Activity,
  Webhook,
  MessageSquare,
  Mail,
  ShieldCheck,
  KeyRound,
  CircuitBoard,
} from 'lucide-react';
import { cn } from '@lib/utils';

const iconMap: Record<string, LucideIcon> = {
  'lucide:repeat': Repeat,
  'lucide:timer': Timer,
  'lucide:workflow': Workflow,
  'lucide:scan-search': ScanSearch,
  'lucide:diff': Diff,
  'lucide:activity': Activity,
  'lucide:webhook': Webhook,
  'lucide:message-square': MessageSquare,
  'lucide:mail': Mail,
  'lucide:shield-check': ShieldCheck,
  'lucide:key-round': KeyRound,
  'lucide:circuit-board': CircuitBoard,
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <div
      className={cn(
        'animate-card rounded-lg border border-neutral-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-sm',
        className,
      )}
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-md bg-brand-50 p-2.5 text-brand-600">
        {IconComponent ? <IconComponent size={22} /> : null}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
    </div>
  );
}

export { FeatureCard };
export type { FeatureCardProps };
