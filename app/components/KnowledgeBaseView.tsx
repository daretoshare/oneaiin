'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import type { KnowledgeBaseMeta } from '@/app/lib/knowledge-base';
import { getCategoryMetadata, getCategoryColor, type KBCategory } from '@/app/lib/kb-categories';
import { applyKBFilters, getAvailableFilterOptions } from '@/app/lib/kb-filters';
import TagFilter from './TagFilter';
import KBFilters from './KBFilters';
import { useTagsParam } from './useTagsParam';
import { useKBFilters } from './useKBFilters';

export default function KnowledgeBaseView({
  allItems,
  categories,
}: {
  allItems: KnowledgeBaseMeta[];
  categories: KBCategory[];
}) {
  const { tags: activeTags, toggleTag, clear } = useTagsParam();
  const { filters, clearFilters } = useKBFilters();

  const allTags = useMemo(
    () => Array.from(new Set(allItems.flatMap((i) => i.tags))).sort(),
    [allItems]
  );

  const tagFiltered = useMemo(() => {
    if (activeTags.length === 0) return allItems;
    return allItems.filter((item) => activeTags.every((tag) => item.tags.includes(tag)));
  }, [allItems, activeTags]);

  const options = useMemo(() => getAvailableFilterOptions(tagFiltered), [tagFiltered]);

  const filtered = useMemo(() => applyKBFilters(tagFiltered, filters), [tagFiltered, filters]);

  const itemsByCategory = useMemo(
    () =>
      categories.reduce(
        (acc, cat) => {
          acc[cat] = filtered.filter((item) => item.category === cat);
          return acc;
        },
        {} as Record<KBCategory, KnowledgeBaseMeta[]>
      ),
    [categories, filtered]
  );

  const hasResults = filtered.length > 0;

  const clearAll = () => {
    clear();
    clearFilters();
  };

  return (
    <>
      <div className="mb-10 space-y-4">
        <KBFilters categories={categories} options={options} />
        <TagFilter tags={allTags} activeTags={activeTags} onToggle={toggleTag} />
      </div>

      {hasResults ? (
        categories.map((category) => {
          const meta = getCategoryMetadata(category);
          const items = itemsByCategory[category];

          if (items.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: getCategoryColor(category) }}
                  />
                  <h2
                    className="font-heading font-semibold text-xl"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {meta.title}
                  </h2>
                </div>
                <Link
                  href={`/knowledge-base/category/${category}`}
                  className="text-xs font-mono uppercase tracking-wider transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <Link key={item.slug} href={`/knowledge-base/item/${item.slug}`}>
                    <div className="card">
                      <div className="flex items-start gap-3">
                        <span
                          className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                          style={{ background: getCategoryColor(category) }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-heading font-semibold text-base mb-1.5"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {item.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed mb-3"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {item.excerpt}
                          </p>
                          <div
                            className="flex items-center gap-3 text-xs font-mono"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            <span>{item.author}</span>
                            <span>•</span>
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.readTime}</span>
                          </div>
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {item.tags.map((tag) => (
                                <span key={tag} className="tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="card text-center py-14">
          <h3
            className="font-heading font-semibold text-lg mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            No resources match
          </h3>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
            No knowledge base items match the selected filters or tags. Try removing a filter.
          </p>
          <button type="button" onClick={clearAll} className="btn-outline inline-flex">
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
