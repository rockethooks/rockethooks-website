import { cn } from '@lib/utils';
import {
  ShieldCheck,
  Lock,
  Gauge,
  KeyRound,
  RefreshCcw,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TrustBarProps {
  className?: string;
}

interface TrustSignal {
  icon: LucideIcon;
  label: string;
  sublabel: string;
}

const trustSignals: TrustSignal[] = [
  {
    icon: ShieldCheck,
    label: 'HMAC-SHA256 Signed',
    sublabel: 'Standard Webhooks spec',
  },
  {
    icon: Lock,
    label: 'KMS Encryption',
    sublabel: 'AES-256 at rest',
  },
  {
    icon: Gauge,
    label: '99.9% Uptime SLA',
    sublabel: 'Enterprise-grade reliability',
  },
  {
    icon: KeyRound,
    label: '5 Auth Methods',
    sublabel: 'OAuth, API keys, Bearer, Basic, Custom',
  },
  {
    icon: RefreshCcw,
    label: 'Automatic Retries',
    sublabel: 'Exponential backoff + DLQ',
  },
];

function TrustBar({ className }: TrustBarProps) {
  return (
    <section
      className={cn('animate-section bg-neutral-50 py-10 sm:py-12', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Enterprise-Ready Infrastructure
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {trustSignals.map((signal) => {
            const Icon = signal.icon;
            return (
              <div key={signal.label} className="text-center">
                <Icon
                  size={20}
                  className="mx-auto mb-2 text-brand-600"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-neutral-700">
                  {signal.label}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {signal.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { TrustBar };
export type { TrustBarProps };
