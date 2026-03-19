import Link from 'next/link';

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>{value}</div>
      <div className="font-mono text-[0.65rem] uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}

function DomainCard({
  color,
  title,
  description,
  tags,
  lead,
}: {
  color: 'accent' | 'signal';
  title: string;
  description: string;
  tags: string[];
  lead: string;
}) {
  const dotColor = color === 'accent' ? 'var(--accent)' : 'var(--signal)';
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full" style={{ background: dotColor }} />
        <span className="font-heading font-semibold text-base" style={{ color: 'var(--text-primary)' }}>{title}</span>
      </div>
      <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tags.map((t) => (<span key={t} className="tag">{t}</span>))}
      </div>
      <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="font-mono text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Lead — {lead}
        </span>
      </div>
    </div>
  );
}

function AuthorCard({
  initials,
  name,
  title,
  org,
  credentials,
  domains,
  color,
}: {
  initials: string;
  name: string;
  title: string;
  org: string;
  credentials: string[];
  domains: string[];
  color: 'accent' | 'signal';
}) {
  const dotColor = color === 'accent' ? 'var(--accent)' : 'var(--signal)';
  const bgColor = color === 'accent' ? 'var(--accent-muted)' : 'var(--signal-muted)';
  return (
    <div className="card">
      <div className="flex items-start gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 font-display text-lg"
          style={{ background: bgColor, color: dotColor, border: `1px solid ${color === 'accent' ? 'var(--accent-border)' : 'rgba(52,211,153,0.15)'}` }}
        >
          {initials}
        </div>
        <div>
          <p className="font-heading font-semibold text-base" style={{ color: 'var(--text-primary)' }}>{name}</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{title}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{org}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Credentials</p>
        <div className="space-y-1.5">
          {credentials.map((c) => (
            <div key={c} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: dotColor }} />
              {c}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[0.6rem] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Domain Expertise</p>
        <div className="flex flex-wrap gap-1.5">
          {domains.map((d) => (<span key={d} className="tag">{d}</span>))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="section-label mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--signal)' }} />
              Knowledge Platform for Enterprise AI Leaders
            </div>

            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6 animate-fade-up">
              Enterprise AI.{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>Understood.</span>
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed max-w-xl mb-10 animate-fade-up"
              style={{ color: 'var(--text-secondary)', animationDelay: '0.1s' }}
            >
              Practitioner-led insights on AI governance, model risk management,
              and responsible AI adoption across{' '}
              <span style={{ color: 'var(--text-primary)' }}>Banking &amp; Financial Services</span> and{' '}
              <span style={{ color: 'var(--text-primary)' }}>Healthcare &amp; Pharma</span>.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/articles" className="btn-primary">
                Read Articles
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </Link>
              <Link href="/about" className="btn-outline">Meet the Authors</Link>
            </div>
          </div>

          <div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 animate-fade-up"
            style={{ borderTop: '1px solid var(--divider)', animationDelay: '0.3s' }}
          >
            <Stat value="25+" label="Years in AI" />
            <Stat value="7" label="US Patents" />
            <Stat value="$500M+" label="Value Delivered" />
            <Stat value="2" label="Regulated Industries" />
          </div>
        </div>
      </section>

      <div className="divider max-w-6xl mx-auto" />

      {/* ── Domains ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <div className="section-label mb-4">Domain Expertise</div>
            <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
              Two Domains. One Vision.
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              Deep practitioner expertise across the two most heavily regulated industries adopting AI at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <DomainCard
              color="accent"
              title="Banking, Financial Services & Insurance"
              description="Enterprise AI governance, model risk management under SR 11-7, quantitative model development and validation, and responsible AI adoption in regulated financial environments."
              tags={['SR 11-7', 'Model Risk', 'Credit Risk', 'AML/Fraud', 'Stress Testing', 'GenAI Governance']}
              lead="Dipanjan Deb"
            />
            <DomainCard
              color="signal"
              title="Healthcare & Pharmaceutical"
              description="Commercial analytics transformation, GenAI for pharma, Real-World Evidence analytics, patient-level data science, and building analytics Centers of Excellence in life sciences."
              tags={['Pharma AI', 'RWE Analytics', 'Omnichannel', 'HCP 360', 'Commercial Analytics', 'CoE Strategy']}
              lead="Jayashree Mishra Deb"
            />
          </div>
        </div>
      </section>

      <div className="divider max-w-6xl mx-auto" />

      {/* ── Authors ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <div className="section-label mb-4">The Authors</div>
            <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
              Built by Practitioners
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              Not theorists. Leaders who built, governed, and scaled AI in regulated environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <AuthorCard
              initials="DD"
              name="Dipanjan Deb"
              title="Associate Partner, KDN-AI"
              org="KPMG"
              color="accent"
              credentials={[
                'Executive MBA — IIM Bangalore',
                'Data Mining & Analytics — IIT Roorkee',
                '7 US Patents (granted) · IEEE Publication',
                'Mentor, Niti Aayog & IITs',
                'IICA Independent Director Certification',
              ]}
              domains={['Enterprise AI', 'SR 11-7', 'Model Risk', 'GenAI/Agentic AI', 'BFSI Analytics']}
            />
            <AuthorCard
              initials="JM"
              name="Jayashree Mishra Deb"
              title="Lead Sales & Commercial DTAI"
              org="Genpact"
              color="signal"
              credentials={[
                'MBA Finance — ICFAI University',
                'Former Head of Commercial Analytics CoE, Novo Nordisk',
                '~$500M revenue/cost savings delivered',
                'Global experience across 6 countries',
              ]}
              domains={['Pharma AI', 'RWE', 'GenAI Products', 'Omnichannel', 'CoE Strategy']}
            />
          </div>
        </div>
      </section>

      <div className="divider max-w-6xl mx-auto" />

      {/* ── What's Coming ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <div className="section-label mb-4">Coming Soon</div>
            <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
              What We&apos;re Building
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              A comprehensive knowledge ecosystem for enterprise AI leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'Original Articles', desc: 'Monthly deep-dive articles on AI governance, model risk, and responsible AI — written by practitioners, for practitioners.', when: 'Q2 2026' },
              { num: '02', title: 'Curated Knowledge Base', desc: 'Regulatory guidance summaries, framework comparisons, open-source tool reviews, and reference architectures.', when: 'Q2 2026' },
              { num: '03', title: 'Video & Newsletter', desc: 'Monthly YouTube explainers and a curated newsletter covering the most important developments in enterprise AI governance.', when: 'Q3 2026' },
            ].map((item) => (
              <div key={item.num} className="card">
                <span className="font-mono text-xs block mb-3" style={{ color: 'var(--accent)' }}>{item.num}</span>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                <span className="section-label">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--signal)' }} />
                  Launching {item.when}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-6xl mx-auto" />

      {/* ── Newsletter ── */}
      <section id="newsletter" className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="section-label justify-center mb-4">Stay Informed</div>
          <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
            The Enterprise AI Digest
          </h2>
          <p className="text-base mb-10" style={{ color: 'var(--text-secondary)' }}>
            A monthly newsletter distilling the most important developments in AI governance.
            No fluff. Practitioner-grade insight.
          </p>

          <div className="card">
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-sm font-body outline-none transition-colors"
                style={{
                  background: 'var(--bg-sunken)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              />
              <button className="btn-primary whitespace-nowrap">Subscribe</button>
            </div>
            <p className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              Free. Monthly. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
