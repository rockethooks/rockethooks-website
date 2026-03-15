import type { LucideIcon } from 'lucide-react';
import {
  Contact,
  Tag,
  Cpu,
  ShoppingCart,
  Server,
  Truck,
  Plug,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@lib/utils';

const iconMap: Record<string, LucideIcon> = {
  'lucide:contact': Contact,
  'lucide:tag': Tag,
  'lucide:cpu': Cpu,
  'lucide:shopping-cart': ShoppingCart,
  'lucide:server': Server,
  'lucide:truck': Truck,
  'lucide:plug': Plug,
};

interface UseCaseCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  className?: string;
}

function UseCaseCard({ icon, title, description, href, className }: UseCaseCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <a
      href={href}
      className={cn(
        'animate-card group flex flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-xs transition-all hover:border-brand-200 hover:shadow-sm',
        className,
      )}
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-md bg-brand-50 p-2.5 text-brand-600 transition-colors group-hover:bg-brand-100">
        {IconComponent ? <IconComponent size={22} /> : null}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-brand-700">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
        Learn more
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export { UseCaseCard };
export type { UseCaseCardProps };
