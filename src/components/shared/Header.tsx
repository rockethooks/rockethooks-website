import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { cn } from '@lib/utils';
import Logo from './Logo';
import { getAppUrl } from '@utils/urls';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Features', href: '/features' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: 'https://docs.rockethooks.com', external: true },
];

const appUrl = getAppUrl();

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

interface HeaderProps {
  pathname: string;
}

export default function Header({ pathname: initialPathname }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pathname, setPathname] = useState(initialPathname);

  // Re-read pathname after View Transition navigations
  useEffect(() => {
    setPathname(window.location.pathname);

    const handlePageLoad = () => {
      setPathname(window.location.pathname);
      setMobileMenuOpen(false);
    };

    document.addEventListener('astro:page-load', handlePageLoad);
    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="RocketHooks home"
        >
          <Logo size={32} className="text-brand-600" />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-brand-600">Rocket</span>
            <span className="text-neutral-800">Hooks</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive(pathname, item.href)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {item.label}
                {item.external && (
                  <ExternalLink size={14} className="opacity-50" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={appUrl}
            rel="noopener"
            className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Log in
          </a>
          <a
            href={appUrl}
            rel="noopener"
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-700"
          >
            Start Free Trial
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-neutral-200 md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium transition-colors',
                  isActive(pathname, item.href)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {item.label}
                {item.external && (
                  <ExternalLink size={14} className="opacity-50" />
                )}
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-2 border-t border-neutral-200 pt-4">
              <a
                href={appUrl}
                rel="noopener"
                className="rounded-md px-3 py-2.5 text-center text-base font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                Log in
              </a>
              <a
                href={appUrl}
                rel="noopener"
                className="rounded-md bg-brand-600 px-4 py-2.5 text-center text-base font-semibold text-white shadow-xs transition-colors hover:bg-brand-700"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
