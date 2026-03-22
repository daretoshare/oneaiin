import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getKBItemsByCategory,
  getAllCategories,
  getCategoryMetadata,
  getCategoryColor,
  type KBCategory,
} from '@/app/lib/knowledge-base';

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;
  if (!getAllCategories().includes(category as KBCategory)) return {};
  const meta = getCategoryMetadata(category as KBCategory);
  return {
    title: `${meta.title} — Knowledge Base — one.ai.in`,
    description: meta.description,
  };
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;

  if (!getAllCategories().includes(category as KBCategory)) {
    notFound();
  }

  const typedCategory = category as KBCategory;
  const meta = getCategoryMetadata(typedCategory);
  const items = getKBItemsByCategory(typedCategory);

  return (
    <section className="pt-28 pb-20 md:pt-36">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/knowledge-base"
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" />
          </svg>
          Knowledge Base
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: getCategoryColor(typedCategory) }} />
            <div className="font-mono text-xs uppercase tracking-wider" style={{ color: getCategoryColor(typedCategory) }}>
              {meta.title}
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-4" style={{ color: 'var(--text-primary)' }}>
            {meta.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {meta.description}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item) => (
              <Link key={item.slug} href={`/knowledge-base/item/${item.slug}`}>
                <div className="card">
                  <div className="flex items-start gap-3">
                    <span
                      className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                      style={{ background: getCategoryColor(typedCategory) }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-lg mb-1.5" style={{ color: 'var(--text-primary)' }}>
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
        ) : (
          <div className="card text-center py-14">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              No items in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
