import Link from 'next/link';

export interface RelatedItem {
  title: string;
  excerpt: string;
  url: string;
  label: string;
  color?: string;
}

export default function RelatedItems({ items }: { items: RelatedItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12 pt-8" style={{ borderTop: '1px solid var(--divider)' }}>
      <h2
        className="font-heading font-semibold text-xl mb-5"
        style={{ color: 'var(--text-primary)' }}
      >
        Related Reading
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link key={item.url} href={item.url} className="card p-4 group">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: item.color || 'var(--text-muted)' }}
              />
              <span
                className="font-mono text-[0.6rem] uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.label}
              </span>
            </div>
            <h3
              className="font-heading font-semibold text-sm leading-snug mb-1.5 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {item.title}
            </h3>
            <p
              className="text-xs leading-relaxed line-clamp-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
