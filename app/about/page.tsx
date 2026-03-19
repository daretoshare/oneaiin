import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — one.ai.in',
  description: 'Meet the practitioners behind one.ai.in.',
};

export default function AboutPage() {
  return (
    <section className="pt-28 pb-20 md:pt-36">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16">
          <div className="section-label mb-4">About</div>
          <h1 className="font-display text-4xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
            The Practitioners Behind{' '}
            <span className="italic" style={{ color: 'var(--accent)' }}>one.ai.in</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            one.ai.in is authored by two senior AI and analytics leaders with a combined 45+ years of experience
            across the most regulated industries adopting AI at scale. The platform brings together complementary
            expertise in BFSI and Healthcare to offer practitioner-grade insights on AI governance,
            model risk management, and responsible enterprise AI adoption.
          </p>
        </div>

        <div className="divider mb-16" />

        {/* Dipanjan */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center font-display text-xl"
              style={{ background: 'var(--accent-muted)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
            >
              DD
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>Dipanjan Deb</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Associate Partner, KDN-AI &middot; KPMG</p>
            </div>
          </div>

          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              Dipanjan brings 25+ years of experience across the AI and analytics landscape, with a career
              spanning consulting-led transformation at KPMG and Deloitte, and deep enterprise AI and risk
              model leadership at Wells Fargo. He has led enterprise-wide quantitative analytics, AI/ML
              engineering, and model risk management programs, scaling global teams across model development,
              validation, and quantitative R&amp;D.
            </p>
            <p>
              At Wells Fargo, he established the Decision Science &amp; AI Center of Excellence and
              the Enterprise Model Risk Office, creating SR 11-7 aligned risk oversight frameworks.
              He holds 7 US patents, has published in IEEE TETCI, and serves as a mentor with Niti Aayog
              and IITs. His academic credentials include an Executive MBA from IIM Bangalore and
              a Data Mining &amp; Analytics certification from IIT Roorkee.
            </p>
            <p>
              On one.ai.in, Dipanjan covers BFSI AI governance, model risk management, SR 11-7 frameworks,
              GenAI governance, NLI-based evaluation, and enterprise AI strategy.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {['Enterprise AI', 'SR 11-7', 'Model Risk Management', 'GenAI Governance', 'BFSI', '7 US Patents', 'IIM Bangalore', 'IIT Roorkee'].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="divider mb-16" />

        {/* Jayashree */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center font-display text-xl"
              style={{ background: 'var(--signal-muted)', color: 'var(--signal)', border: '1px solid rgba(52,211,153,0.15)' }}
            >
              JM
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>Jayashree Mishra Deb</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Associate Vice President &amp; Commercial DTAI &middot; Genpact</p>
            </div>
          </div>

          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              Jayashree is an experienced analytics and AI leader in the Life Sciences and Healthcare domain,
              with deep expertise in driving commercial transformation, digital innovation, and business
              growth through advanced analytics, scalable BI solutions, and GenAI applications.
            </p>
            <p>
              She has led global digital transformation initiatives across sales and commercial domains,
              including heading the centralized Commercial Analytics CoE at Novo Nordisk with a global
              remit spanning Zurich, Istanbul, Stockholm, Brisbane, and Montreal. Her work spans GenAI
              and agentic product development for pharma, Omnichannel engagement, Real-World Evidence
              analytics, and building Centers of Excellence.
            </p>
            <p>
              On one.ai.in, Jayashree covers healthcare and pharma AI, commercial analytics transformation,
              GenAI in life sciences, patient-level data analytics, CoE strategy, and the GCC opportunity in India.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {['Healthcare AI', 'Pharma Commercial', 'GenAI Products', 'RWE Analytics', 'Omnichannel', 'CoE Strategy', 'Novo Nordisk', 'Global Experience'].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="divider mb-16" />

        {/* Mission */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl mb-5" style={{ color: 'var(--text-primary)' }}>
            Why one.ai.in?
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              Enterprise AI is moving fast. Governance is struggling to keep up. There&apos;s no shortage of
              vendor pitches and analyst reports, but there&apos;s a real gap in practitioner-led,
              domain-specific knowledge — the kind that comes from actually building, governing,
              and scaling AI in regulated environments.
            </p>
            <p>
              one.ai.in exists to fill that gap. Every article, every knowledge base entry, every video
              reflects real operational experience across banking and healthcare — not theoretical
              frameworks, but lessons from the trenches of model risk offices, analytics CoEs,
              and enterprise AI programs.
            </p>
            <blockquote
              className="my-8 py-2 pl-6 font-display text-xl italic"
              style={{ borderLeft: '2px solid var(--accent)', color: 'var(--text-primary)' }}
            >
              Enterprise AI. Understood.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
