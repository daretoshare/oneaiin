import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllKBItems, getAllCategories, getCategoryMetadata, getCategoryColor, type KBCategory } from '@/app/lib/knowledge-base';

export const metadata: Metadata = {
  title: 'Knowledge Base — one.ai.in',
  description: 'Curated resources on AI governance frameworks, regulatory guidance, and enterprise AI tools.',
};

export default function KnowledgeBasePage() {
  const allItems = getAllKBItems();
  const categories = getAllCategories();

  // Group items by category
  const itemsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = allItems.filter((item) => item.category === cat);
    return acc;
  }, {} as Record<KBCategory, typeof allItems>);

  return (
    <section className="pt-28 pb-20 md:pt-36">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-14">
          <div className="section-label mb-4">Knowledge Base</div>
          <h1 className="font-display text-4xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
            Curated Resources
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Regulatory guidance, framework comparisons, tool reviews, and reference architectures — curated for enterprise AI practitioners.
          </p>
        </div>

        {categories.map((category) => {
          const meta = getCategoryMetadata(category);
          const items = itemsByCategory[category];

          if (items.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: getCategoryColor(category) }} />
                  <h2 className="font-heading font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>
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
                          <h3 className="font-heading font-semibold text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
                            {item.title}
                          </h3>
                          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                            {item.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                            <span>{item.author}</span>
                            <span>•</span>
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.readTime}</span>
                          </div>
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {item.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
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
        })}

        {allItems.length === 0 && (
          <div className="card text-center py-14">
            <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
              Knowledge Base Coming Soon
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              We&apos;re curating high-quality resources across all categories. Subscribe to get notified.
            </p>
            <a href="/#newsletter" className="btn-primary inline-flex">Subscribe for Updates</a>
          </div>
        )}
      </div>
    </section>
  );
}
