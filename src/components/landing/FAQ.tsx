// Schema (FAQSchema) must be rendered as a sibling in .astro pages, not inside this component.
// This component uses native <details>/<summary> for zero-JS, GEO-friendly accordion behavior.

import { cn } from '@lib/utils';
import { SectionHeading } from '@components/shared/SectionHeading';
import { faqs } from '@data/faqs';
import type { FAQItem } from '@data/types';

interface FAQProps {
  items?: FAQItem[];
  maxItems?: number;
  className?: string;
}

function FAQ({ items, maxItems = 8, className }: FAQProps) {
  const displayedFaqs = (items ?? faqs).slice(0, maxItems);

  return (
    <section className={cn('animate-section bg-neutral-50 py-16 sm:py-24', className)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about RocketHooks. Can't find what you're looking for? Contact us."
        />

        <dl className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-lg border border-neutral-200 bg-white"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-semibold text-neutral-900 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="ml-4 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <dd className="border-t border-neutral-100 px-5 py-4 text-sm leading-relaxed text-neutral-600">
                {faq.answer}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}

export { FAQ };
export type { FAQProps };
