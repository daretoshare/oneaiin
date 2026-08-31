'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import type { ArticleMeta } from '@/app/lib/articles';
import TagFilter from './TagFilter';
import { useTagsParam } from './useTagsParam';

export default function ArticlesView({ articles }: { articles: ArticleMeta[] }) {
  const { tags: activeTags, toggleTag, clear } = useTagsParam();

  const allTags = useMemo(
    () => Array.from(new Set(articles.flatMap((a) => a.tags))).sort(),
    [articles]
  );

  const filtered = useMemo(
    () =>
      activeTags.length === 0
        ? articles
        : articles.filter((a) => activeTags.every((tag) => a.tags.includes(tag))),
    [articles, activeTags]
  );

  return (
    <>
      <div className="mb-8">
        <TagFilter tags={allTags} activeTags={activeTags} onToggle={toggleTag} />
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="block card group">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: a.domain === 'BFSI' ? 'var(--accent)' : 'var(--signal)' }}
                />
                <span
                  className="font-mono text-[0.65rem] uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {a.domain} &middot; {a.date} &middot; {a.readTime}
                </span>
              </div>
              <h2
                className="font-heading font-semibold text-lg mb-1.5 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                {a.title}
              </h2>
              <p
                className="text-sm leading-relaxed mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {a.excerpt}
              </p>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                By {a.author}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center py-14">
          <h3
            className="font-heading font-semibold text-lg mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            No articles match
          </h3>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
            No articles have all the selected tags. Try removing a filter.
          </p>
          <button type="button" onClick={clear} className="btn-outline inline-flex">
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
