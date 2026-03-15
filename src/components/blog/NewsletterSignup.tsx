import { cn } from '@lib/utils';

interface NewsletterSignupProps {
  className?: string;
}

function NewsletterSignup({ className }: NewsletterSignupProps) {
  return (
    <aside
      className={cn('rounded-lg border border-brand-100 bg-brand-50 p-6 sm:p-8', className)}
      aria-label="Newsletter signup"
    >
      <h3 className="text-lg font-semibold text-neutral-900">
        Get API transformation insights delivered weekly
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        Join developers who stay ahead with practical guides on polling strategies, change
        detection patterns, and real-time event architecture.
      </p>

      <form action="#" method="POST" className="mt-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="article-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="article-newsletter-email"
            name="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            className="min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-700"
          >
            Subscribe
          </button>
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Free, practical content only. No spam. Unsubscribe anytime.
        </p>
      </form>
    </aside>
  );
}

export { NewsletterSignup };
export type { NewsletterSignupProps };
