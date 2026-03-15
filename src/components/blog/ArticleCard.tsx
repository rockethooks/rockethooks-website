import { cn } from '@lib/utils';
import type { BlogCategory, BlogPostImage } from '../../types/content';

interface ArticleCardProps {
  title: string;
  description: string;
  pubDate: string;
  author: string;
  category: BlogCategory;
  image?: BlogPostImage;
  slug: string;
  className?: string;
}

const categoryColors: Record<BlogCategory, { bg: string; text: string }> = {
  educational: { bg: 'bg-brand-50', text: 'text-brand-700' },
  'problem-aware': { bg: 'bg-accent-50', text: 'text-accent-700' },
  comparison: { bg: 'bg-success-light', text: 'text-success-dark' },
};

const categoryLabels: Record<BlogCategory, string> = {
  educational: 'Educational',
  'problem-aware': 'Problem-Aware',
  comparison: 'Comparison',
};

function ArticleCard({
  title,
  description,
  pubDate,
  author,
  category,
  image,
  slug,
  className,
}: ArticleCardProps) {
  const truncatedDescription =
    description.length > 120 ? `${description.slice(0, 117)}...` : description;

  const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const style = categoryColors[category] ?? categoryColors.educational;

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xs transition-all hover:border-brand-200 hover:shadow-sm',
        className,
      )}
    >
      <a href={`/blog/${slug}`} className="flex flex-1 flex-col">
        {/* Image / Gradient fallback */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {image ? (
            <img
              src={image.src}
              alt={image.alt}
              width={640}
              height={360}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-brand-100 via-brand-50 to-accent-50" />
          )}
          <span
            className={cn(
              'absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-semibold',
              style.bg,
              style.text,
            )}
          >
            {categoryLabels[category]}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold leading-snug text-neutral-900 group-hover:text-brand-700">
            {title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
            {truncatedDescription}
          </p>

          {/* Meta: author + date */}
          <div className="mt-4 flex items-center gap-3 border-t border-neutral-100 pt-3 text-xs text-neutral-500">
            <span className="font-medium text-neutral-700">{author}</span>
            <span aria-hidden="true">&mdash;</span>
            <time dateTime={new Date(pubDate).toISOString()}>{formattedDate}</time>
          </div>
        </div>
      </a>
    </article>
  );
}

export { ArticleCard };
export type { ArticleCardProps };
