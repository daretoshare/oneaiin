import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--divider)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <span className="font-heading font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                one<span style={{ color: 'var(--accent)' }}>.ai</span>
                <span style={{ color: 'var(--text-muted)' }}>.in</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              A knowledge platform for AI governance, model risk management,
              and responsible AI adoption across regulated industries.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
              Platform
            </h4>
            <div className="space-y-2.5">
              {[
                { href: '/articles', label: 'Articles' },
                { href: '/knowledge-base', label: 'Knowledge Base' },
                { href: '/about', label: 'About' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
              Focus Areas
            </h4>
            <div className="space-y-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p>BFSI AI Governance</p>
              <p>Healthcare &amp; Pharma AI</p>
              <p>Model Risk Management</p>
              <p>Responsible AI</p>
            </div>
          </div>
        </div>

        <div
          className="mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--divider)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} one.ai.in &mdash; Dipanjan Deb &amp; Jayashree Mishra Deb
          </p>
          <p className="text-xs italic text-center md:text-right max-w-md" style={{ color: 'var(--text-muted)' }}>
            Views expressed are personal and do not represent any employer or organization.
            This is a non-commercial educational platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
