import { notFound } from 'next/navigation';
import { getArticle, getAllSlugs, getRelatedArticles, markdownToHtml } from '@/app/lib/articles';
import Link from 'next/link';
import JsonLd from '@/app/components/JsonLd';
import RelatedItems from '@/app/components/RelatedItems';
import { SITE_URL, SITE_NAME } from '@/app/lib/site';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: `${article.title} — one.ai.in`, description: article.excerpt };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const contentHtml = markdownToHtml(article.content);

  const related = getRelatedArticles(article, 3).map((r) => ({
    title: r.title,
    excerpt: r.excerpt,
    url: `/articles/${r.slug}`,
    label: r.domain,
    color: r.domain === 'BFSI' ? 'var(--accent)' : 'var(--signal)',
  }));

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    keywords: article.tags.join(', '),
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${article.slug}`,
    },
  };

  return (
    <section className="pt-28 pb-20 md:pt-36">
      <JsonLd data={articleJsonLd} />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 4l-4 4 4 4" />
          </svg>
          All Articles
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: article.domain === 'BFSI' ? 'var(--accent)' : 'var(--signal)' }}
          />
          <span
            className="font-mono text-[0.65rem] uppercase tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            {article.domain} &middot; {article.date} &middot; {article.readTime}
          </span>
        </div>

        <h1
          className="font-display text-3xl md:text-4xl leading-tight mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {article.title}
        </h1>

        <div
          className="flex items-center gap-2.5 mb-10 pb-8"
          style={{ borderBottom: '1px solid var(--divider)' }}
        >
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center font-display text-sm"
            style={{
              background: article.domain === 'BFSI' ? 'var(--accent-muted)' : 'var(--signal-muted)',
              color: article.domain === 'BFSI' ? 'var(--accent)' : 'var(--signal)',
            }}
          >
            {article.author
              .split(' ')
              .map((n: string) => n[0])
              .join('')}
          </div>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {article.author}
          </span>
        </div>

        <div className="prose-article" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {article.tags.length > 0 && (
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--divider)' }}>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((t: string) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <RelatedItems items={related} />
      </div>
    </section>
  );
}
