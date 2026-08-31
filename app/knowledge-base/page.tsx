import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllKBItems, getAllCategories } from '@/app/lib/knowledge-base';
import KnowledgeBaseView from '@/app/components/KnowledgeBaseView';

export const metadata: Metadata = {
  title: 'Knowledge Base — one.ai.in',
  description:
    'Curated resources on AI governance frameworks, regulatory guidance, and enterprise AI tools.',
};

export default function KnowledgeBasePage() {
  const allItems = getAllKBItems();
  const categories = getAllCategories();

  return (
    <section className="pt-28 pb-20 md:pt-36">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <div className="section-label mb-4">Knowledge Base</div>
          <h1
            className="font-display text-4xl md:text-5xl mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Curated Resources
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Regulatory guidance, framework comparisons, tool reviews, and reference architectures —
            curated for enterprise AI practitioners.
          </p>
        </div>

        {allItems.length > 0 ? (
          <KnowledgeBaseView allItems={allItems} categories={categories} />
        ) : (
          <div className="card text-center py-14">
            <h3
              className="font-heading font-semibold text-lg mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Knowledge Base Coming Soon
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              We&apos;re curating high-quality resources across all categories. Subscribe to get
              notified.
            </p>
            <Link href="/#newsletter" className="btn-primary inline-flex">
              Subscribe for Updates
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
