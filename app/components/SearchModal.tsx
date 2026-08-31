'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import type { SearchResult } from '@/app/lib/search';

export default function SearchModal({ data }: { data: SearchResult[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        includeScore: true,
        threshold: 0.4,
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'excerpt', weight: 0.3 },
          { name: 'tags', weight: 0.2 },
        ],
      }),
    [data]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse
      .search(query.trim())
      .map((r) => r.item)
      .slice(0, 8);
  }, [fuse, query]);

  useEffect(() => {
    const OPEN_EVENT = 'oneai:open-search';

    const onOpen = () => {
      setOpen(true);
      setQuery('');
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === '/' && !open) {
        const target = e.target as HTMLElement | null;
        const isTyping =
          target &&
          (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
        if (!isTyping) {
          e.preventDefault();
          onOpen();
        }
      }
    };

    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-24"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl card"
        style={{ background: 'var(--bg-raised)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: 'var(--text-muted)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles & knowledge base…"
            className="w-full bg-transparent outline-none font-body text-lg"
            style={{ color: 'var(--text-primary)' }}
          />
          <kbd
            className="px-1.5 py-0.5 font-mono text-[0.65rem] rounded border"
            style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
          >
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {query.trim() && results.length === 0 && (
            <p className="px-4 py-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              No results for &ldquo;{query}&rdquo;.
            </p>
          )}

          {results.map((r) => (
            <Link
              key={`${r.type}-${r.url}`}
              href={r.url}
              className="block px-4 py-3 transition-colors"
              onClick={() => setOpen(false)}
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-sunken)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider rounded"
                  style={{
                    color: r.type === 'article' ? 'var(--accent)' : 'var(--signal)',
                    background:
                      r.type === 'article' ? 'var(--accent-muted)' : 'var(--signal-muted)',
                  }}
                >
                  {r.type === 'article' ? 'Article' : 'KB'}
                </span>
                {r.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
              <h3
                className="font-heading font-semibold text-base mb-0.5"
                style={{ color: 'var(--text-primary)' }}
              >
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed line-clamp-2">{r.excerpt}</p>
            </Link>
          ))}

          {!query.trim() && (
            <p className="px-4 py-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              Press <kbd className="font-mono">/</kbd> anywhere, or type to search titles, excerpts,
              and tags.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
