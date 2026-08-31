'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/articles', label: 'Articles' },
    { href: '/knowledge-base', label: 'Knowledge Base' },
  ];

  const openSearch = () => {
    window.dispatchEvent(new Event('oneai:open-search'));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b' : ''
      }`}
      style={{
        background: scrolled ? 'var(--bg)' : 'transparent',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="font-heading font-bold text-base"
              style={{ color: 'var(--text-primary)' }}
            >
              one<span style={{ color: 'var(--accent)' }}>.ai</span>
              <span style={{ color: 'var(--text-muted)' }}>.in</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 font-heading text-sm font-medium rounded-md transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={openSearch}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{ color: 'var(--text-muted)', background: 'var(--bg-sunken)' }}
              aria-label="Search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{ color: 'var(--text-muted)', background: 'var(--bg-sunken)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Subscribe CTA */}
            <Link
              href="/#newsletter"
              className="hidden md:inline-flex px-4 py-1.5 font-heading text-sm font-semibold rounded-md transition-colors"
              style={{
                color: 'var(--accent)',
                background: 'var(--accent-muted)',
                border: '1px solid var(--accent-border)',
              }}
            >
              Subscribe
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-1"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
        >
          <div className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 font-heading text-sm font-medium rounded-md"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
