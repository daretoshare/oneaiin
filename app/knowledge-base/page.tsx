import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knowledge Base — one.ai.in',
  description: 'Curated resources on AI governance frameworks, regulatory guidance, and enterprise AI tools.',
};

export default function KnowledgeBasePage() {
  const categories = [
    {
      title: 'Regulatory Frameworks',
      desc: 'SR 11-7, EU AI Act, RBI/SEBI circulars, FDA AI guidance — summaries and analysis.',
      tags: ['SR 11-7', 'EU AI Act', 'RBI', 'SEBI', 'FDA'],
      color: 'accent' as const,
    },
    {
      title: 'AI Governance Models',
      desc: 'Enterprise AI governance playbooks, model risk management frameworks, and evaluation methodologies.',
      tags: ['Model Risk', 'NLI Evaluation', 'Explainability', 'LLM Governance'],
      color: 'accent' as const,
    },
    {
      title: 'Tools & Platforms',
      desc: 'Reviews and comparisons of open-source and commercial AI governance, MLOps, and evaluation tools.',
      tags: ['MLOps', 'LangChain', 'Evaluation', 'Monitoring'],
      color: 'signal' as const,
    },
    {
      title: 'Industry Case Studies',
      desc: 'Real-world examples of AI governance implementation across BFSI and Healthcare.',
      tags: ['Banking', 'Pharma', 'Insurance', 'GCCs'],
      color: 'signal' as const,
    },
  ];

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

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {categories.map((cat) => (
            <div key={cat.title} className="card">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color === 'accent' ? 'var(--accent)' : 'var(--signal)' }} />
                <h3 className="font-heading font-semibold text-base" style={{ color: 'var(--text-primary)' }}>{cat.title}</h3>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{cat.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
              </div>
            </div>
          ))}
        </div>

        <div className="card text-center py-14">
          <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
            Knowledge Base Launching Q2 2026
          </h3>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
            We&apos;re curating high-quality resources across all categories. Subscribe to get notified.
          </p>
          <a href="/#newsletter" className="btn-primary inline-flex">Subscribe for Updates</a>
        </div>
      </div>
    </section>
  );
}
