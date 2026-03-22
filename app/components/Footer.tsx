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

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-14 mb-8">
          <a
            href="https://www.linkedin.com/in/deb-dipanjan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dipanjan Deb on LinkedIn"
            className="transition-colors hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/mishra-jayashree/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jayashree Mishra Deb on LinkedIn"
            className="transition-colors hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/92577270/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="one.ai.in on LinkedIn"
            className="transition-colors hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <button
            disabled
            aria-label="YouTube channel (coming soon)"
            className="cursor-not-allowed opacity-40"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </button>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
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
