import { cn } from '@lib/utils';
import { ArticleCard } from './ArticleCard';
import type { ArticleCardProps } from './ArticleCard';

interface ArticleListProps {
  posts: ArticleCardProps[];
  className?: string;
}

function ArticleList({ posts, className }: ArticleListProps) {
  if (posts.length === 0) {
    return <p className="py-12 text-center text-neutral-500">No articles found.</p>;
  }

  return (
    <div className={cn('grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3', className)}>
      {posts.map((post) => (
        <ArticleCard key={post.slug} {...post} />
      ))}
    </div>
  );
}

export { ArticleList };
export type { ArticleListProps };
