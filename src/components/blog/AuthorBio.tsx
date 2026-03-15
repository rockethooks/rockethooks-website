/**
 * React AuthorBio component.
 *
 * IMPORTANT: This component does NOT render PersonSchema (JSON-LD).
 * When using in .astro pages, render <PersonSchema> as a sibling:
 *
 *   import PersonSchema from '@components/seo/PersonSchema.astro';
 *   import { AuthorBio } from '@components/blog/AuthorBio';
 *
 *   <PersonSchema name={author.name} jobTitle={author.title} ... />
 *   <AuthorBio author={author} />
 */

import { Github, Linkedin, Twitter, User } from 'lucide-react';
import { cn } from '@lib/utils';
import type { AuthorProps } from '../../types/content';

interface AuthorBioProps {
  author: AuthorProps;
  className?: string;
}

interface SocialLink {
  href: string;
  icon: typeof Github;
  label: string;
}

function AuthorBio({ author, className }: AuthorBioProps) {
  const socialLinks: SocialLink[] = [
    author.linkedin ? { href: author.linkedin, icon: Linkedin, label: `${author.name} on LinkedIn` } : null,
    author.github ? { href: author.github, icon: Github, label: `${author.name} on GitHub` } : null,
    author.twitter ? { href: author.twitter, icon: Twitter, label: `${author.name} on Twitter` } : null,
  ].filter((link): link is SocialLink => link !== null);

  return (
    <aside
      className={cn('rounded-lg border-t border-neutral-200 bg-neutral-50 p-6', className)}
      aria-label="About the author"
    >
      <div className="flex items-start gap-4">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            width={64}
            height={64}
            loading="lazy"
            className="size-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
            <User size={28} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-neutral-900">{author.name}</p>
          {author.title && (
            <p className="text-sm text-neutral-500">{author.title}</p>
          )}
          {author.bio && (
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{author.bio}</p>
          )}

          {socialLinks.length > 0 && (
            <div className="mt-3 flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 transition-colors hover:text-neutral-600"
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export { AuthorBio };
export type { AuthorBioProps };
