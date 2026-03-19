import { notFound } from 'next/navigation';
import { getArticle, getAllSlugs, markdownToHtml } from '@/app/lib/articles';
import Link from 'next/link';

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

  return (
    <section className="pt-28 pb-20 md:pt-36">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" />
          </svg>
          All Articles
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: article.domain === 'BFSI' ? 'var(--accent)' : 'var(--signal)' }}
          />
          <span className="font-mono text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            {article.domain} &middot; {article.date} &middot; {article.readTime}
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
          {article.title}
        </h1>

        <div className="flex items-center gap-2.5 mb-10 pb-8" style={{ borderBottom: '1px solid var(--divider)' }}>
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center font-display text-sm"
            style={{
              background: article.domain === 'BFSI' ? 'var(--accent-muted)' : 'var(--signal-muted)',
              color: article.domain === 'BFSI' ? 'var(--accent)' : 'var(--signal)',
            }}
          >
            {article.author.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{article.author}</span>
        </div>

        <div className="prose-article" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {article.tags.length > 0 && (
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--divider)' }}>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((t: string) => (<span key={t} className="tag">{t}</span>))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
