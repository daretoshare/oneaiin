import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/app/lib/articles';
import ArticlesView from '@/app/components/ArticlesView';

export const metadata: Metadata = {
  title: 'Articles — one.ai.in',
  description: 'Practitioner-led articles on AI governance and model risk management.',
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <section className="pt-28 pb-20 md:pt-36">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <div className="section-label mb-4">Articles</div>
          <h1
            className="font-display text-4xl md:text-5xl mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Practitioner Insights
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Deep-dive articles on AI governance, model risk, and responsible AI — from the people
            who build and govern these systems.
          </p>
        </div>

        {articles.length > 0 ? (
          <ArticlesView articles={articles} />
        ) : (
          <div className="card text-center py-14">
            <h3
              className="font-heading font-semibold text-lg mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Articles Coming Soon
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
              Our first articles are in development. Subscribe to be notified.
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
