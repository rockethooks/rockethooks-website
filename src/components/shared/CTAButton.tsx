import { forwardRef } from 'react';
import { cn } from '@lib/utils';

/**
 * CTA-specific variant and size mappings that mirror the original CTAButton.astro.
 *
 * The shadcn base-nova Button uses different variant names and sizing conventions,
 * so this wrapper provides backward-compatible props (primary/secondary, sm/md/lg)
 * and renders as an `<a>` element when `href` is provided.
 */

type CTAVariant = 'primary' | 'secondary';
type CTASize = 'sm' | 'md' | 'lg';

interface CTAButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href: string;
  variant?: CTAVariant;
  size?: CTASize;
  className?: string;
  children: React.ReactNode;
}

const ctaSizeClasses: Record<CTASize, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-base',
};

const ctaVariantClasses: Record<CTAVariant, string> = {
  primary:
    'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-xs hover:from-brand-700 hover:to-brand-600 focus-visible:ring-brand-500',
  secondary:
    'border border-neutral-300 bg-white text-neutral-700 shadow-xs hover:bg-neutral-50 focus-visible:ring-neutral-400',
};

const CTAButton = forwardRef<HTMLAnchorElement, CTAButtonProps>(
  ({ href, variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2',
          ctaSizeClasses[size],
          ctaVariantClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);

CTAButton.displayName = 'CTAButton';

export { CTAButton };
export type { CTAButtonProps, CTAVariant, CTASize };
