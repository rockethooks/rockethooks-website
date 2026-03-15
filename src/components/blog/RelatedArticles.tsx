import { cn } from '@lib/utils';
import { SectionHeading } from '@components/shared/SectionHeading';
import { ArticleCard } from './ArticleCard';
import type { ArticleCardProps } from './ArticleCard';

interface RelatedArticlesProps {
  articles: ArticleCardProps[];
  className?: string;
}

function RelatedArticles({ articles, className }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section aria-label="Related articles" className={cn(className)}>
      <SectionHeading title="Related Articles" centered={false} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  );
}

export { RelatedArticles };
export type { RelatedArticlesProps };
