import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getKBItem, getAllKBSlugs, getCategoryMetadata, getCategoryColor, markdownToHtml } from '@/app/lib/knowledge-base';

export async function generateStaticParams() {
  return getAllKBSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const item = getKBItem(slug);
  if (!item) return {};
  return { title: `${item.title} — Knowledge Base — one.ai.in`, description: item.excerpt };
}

export default async function KBItemPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const item = getKBItem(slug);
  if (!item) notFound();

  const contentHtml = markdownToHtml(item.content);
  const categoryMeta = getCategoryMetadata(item.category);
  const categoryColor = getCategoryColor(item.category);

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

        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: categoryColor }} />
          <Link
            href={`/knowledge-base/category/${item.category}`}
            className="font-mono text-[0.65rem] uppercase tracking-wider transition-colors"
            style={{ color: categoryColor }}
          >
            {categoryMeta.title}
          </Link>
          <span className="font-mono text-[0.65rem]" style={{ color: 'var(--text-muted)' }}>
            &middot; {item.date} &middot; {item.readTime}
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
          {item.title}
        </h1>

        <div className="flex items-center gap-2.5 mb-10 pb-8" style={{ borderBottom: '1px solid var(--divider)' }}>
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center font-display text-sm"
            style={{
              background: `var(--${categoryMeta.colorVar}-muted)`,
              color: categoryColor,
            }}
          >
            {item.author.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.author}</span>
        </div>

        {/* Template-specific metadata */}
        {item.template === 'regulation' && item.regulation && (
          <div className="mb-8 p-6 rounded-lg" style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}>
            <h3 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Regulation Details
            </h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Jurisdiction
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.regulation.jurisdiction}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Issuer
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.regulation.issuer}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Year
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.regulation.year}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Status
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.regulation.status}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Applies To
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.regulation.applies_to.join(', ')}</dd>
              </div>
            </dl>
          </div>
        )}

        {item.template === 'framework' && item.framework && (
          <div className="mb-8 p-6 rounded-lg" style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}>
            <h3 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Framework Details
            </h3>
            <dl className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Scope
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.framework.scope}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Maturity
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.framework.maturity}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Implementation Effort
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.framework.implementation_effort}</dd>
              </div>
            </dl>
          </div>
        )}

        {item.template === 'tool-evaluation' && item.tool && (
          <div className="mb-8 p-6 rounded-lg" style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}>
            <h3 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Tool Details
            </h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Vendor
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.tool.vendor}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Deployment
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.tool.deployment}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Pricing
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.tool.pricing}</dd>
              </div>
              {item.tool.rating && (
                <div className="col-span-2">
                  <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                    Rating
                  </dt>
                  <dd style={{ color: 'var(--text-primary)' }}>
                    {item.tool.rating}/5.0
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {item.template === 'case-study' && item.case_study && (
          <div className="mb-8 p-6 rounded-lg" style={{ background: 'var(--bg-sunken)', border: '1px solid var(--border)' }}>
            <h3 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Case Study Details
            </h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Industry
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.case_study.industry}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Company Size
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.case_study.company_size}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Geography
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.case_study.geography}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  Year
                </dt>
                <dd style={{ color: 'var(--text-primary)' }}>{item.case_study.year}</dd>
              </div>
            </dl>
          </div>
        )}

        <div className="prose-article" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {item.tags.length > 0 && (
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--divider)' }}>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t: string) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
