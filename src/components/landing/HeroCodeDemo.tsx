import { cn } from '@lib/utils';
import { ChevronRight } from 'lucide-react';

interface HeroCodeDemoProps {
  className?: string;
}

function HeroCodeDemo({ className }: HeroCodeDemoProps) {
  return (
    <div
      className={cn(
        'mx-auto max-w-4xl rounded-xl border border-neutral-800 bg-neutral-950 shadow-[0_0_30px_-5px] shadow-brand-500/10',
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
        {/* Request Panel */}
        <div className="min-w-0">
          <div className="flex items-center border-b border-neutral-800 px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Request
            </span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
            <code>
              <span className="text-accent-400">curl</span>
              <span className="text-neutral-300"> -X POST </span>
              <span className="text-emerald-400">
                https://api.rockethooks.com/v1/monitors
              </span>
              <span className="text-neutral-300"> \</span>
              {'\n'}
              <span className="text-neutral-300">{'  '}-H </span>
              <span className="text-emerald-400">
                &quot;Authorization: Bearer rh_live_...&quot;
              </span>
              <span className="text-neutral-300"> \</span>
              {'\n'}
              <span className="text-neutral-300">{'  '}-d </span>
              <span className="text-emerald-400">&apos;{'{'}</span>
              {'\n'}
              <span className="text-brand-400">{'    '}&quot;url&quot;</span>
              <span className="text-neutral-300">: </span>
              <span className="text-emerald-400">
                &quot;https://api.crm.com/contacts&quot;
              </span>
              <span className="text-neutral-300">,</span>
              {'\n'}
              <span className="text-brand-400">
                {'    '}&quot;interval&quot;
              </span>
              <span className="text-neutral-300">: </span>
              <span className="text-emerald-400">&quot;30s&quot;</span>
              <span className="text-neutral-300">,</span>
              {'\n'}
              <span className="text-brand-400">{'    '}&quot;notify&quot;</span>
              <span className="text-neutral-300">: </span>
              <span className="text-neutral-300">[</span>
              <span className="text-emerald-400">&quot;webhook&quot;</span>
              <span className="text-neutral-300">, </span>
              <span className="text-emerald-400">&quot;slack&quot;</span>
              <span className="text-neutral-300">]</span>
              {'\n'}
              <span className="text-emerald-400">{'  }'}&apos;</span>
              <span className="animate-blink ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] bg-brand-400" />
            </code>
          </pre>
        </div>

        {/* Arrow Separator */}
        <div className="hidden items-center px-2 lg:flex">
          <ChevronRight
            className="h-5 w-5 text-brand-500"
            aria-hidden="true"
          />
        </div>
        <div className="flex items-center justify-center border-y border-neutral-800 py-2 lg:hidden">
          <ChevronRight
            className="h-5 w-5 rotate-90 text-brand-500"
            aria-hidden="true"
          />
        </div>

        {/* Response Panel */}
        <div className="min-w-0">
          <div className="flex items-center border-b border-neutral-800 px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Webhook Delivered
            </span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
            <code>
              <span className="text-neutral-300">{'{'}</span>
              {'\n'}
              <span className="text-brand-400">
                {'  '}&quot;event&quot;
              </span>
              <span className="text-neutral-300">: </span>
              <span className="text-emerald-400">
                &quot;contact.updated&quot;
              </span>
              <span className="text-neutral-300">,</span>
              {'\n'}
              <span className="text-brand-400">
                {'  '}&quot;monitor_id&quot;
              </span>
              <span className="text-neutral-300">: </span>
              <span className="text-emerald-400">
                &quot;mon_abc123&quot;
              </span>
              <span className="text-neutral-300">,</span>
              {'\n'}
              <span className="text-brand-400">
                {'  '}&quot;changes&quot;
              </span>
              <span className="text-neutral-300">: {'{'}</span>
              {'\n'}
              <span className="text-brand-400">
                {'    '}&quot;email&quot;
              </span>
              <span className="text-neutral-300">: </span>
              <span className="text-emerald-400">
                &quot;new@example.com&quot;
              </span>
              <span className="text-neutral-300">,</span>
              {'\n'}
              <span className="text-brand-400">
                {'    '}&quot;status&quot;
              </span>
              <span className="text-neutral-300">: </span>
              <span className="text-emerald-400">&quot;active&quot;</span>
              {'\n'}
              <span className="text-neutral-300">{'  }'}</span>
              <span className="text-neutral-300">,</span>
              {'\n'}
              <span className="text-brand-400">
                {'  '}&quot;delivered_at&quot;
              </span>
              <span className="text-neutral-300">: </span>
              <span className="text-accent-400">
                &quot;2024-03-15T10:30:00Z&quot;
              </span>
              {'\n'}
              <span className="text-neutral-300">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export { HeroCodeDemo };
export type { HeroCodeDemoProps };
